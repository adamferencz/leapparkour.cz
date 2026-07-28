"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BILLING,
  CLUB_BILLING,
  addDays,
  formatCzk,
  getClubAmountCzk,
  buildInvoiceNumber,
  toDateInputValue,
} from "@/lib/billing/config";
import { generateInvoicePdf, type InvoicePdfData } from "@/lib/billing/invoice-pdf";
import { CLUB_SEASON, SITE } from "@/lib/config";
import { sendClubInvoiceEmail } from "@/lib/email/invoice-email";
import { createClient } from "@/lib/supabase/server";
import {
  STATUS_LABELS,
  type ClubRegistration,
  type Invoice,
  type RegistrationStatus,
} from "@/lib/types";

function parseCzk(value: FormDataEntryValue | null, fallback: number) {
  const raw = String(value ?? "").replace(/\s/g, "").replace(",", ".");
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.round(parsed);
}

function buildBuyerName(reg: ClubRegistration) {
  return reg.billing_name || reg.parent_name || reg.email;
}

function buildBuyerAddress(reg: ClubRegistration) {
  const cityLine = [reg.billing_zip, reg.billing_city].filter(Boolean).join(" ");
  return [reg.billing_street, cityLine].filter(Boolean).join(", ");
}

function invoiceDataFromRow(invoice: Invoice): InvoicePdfData {
  return {
    invoiceNumber: invoice.invoice_number,
    variableSymbol: invoice.variable_symbol,
    issueDate: invoice.issue_date,
    dueDate: invoice.due_date,
    buyerName: invoice.buyer_name,
    buyerAddress: invoice.buyer_address,
    buyerEmail: invoice.buyer_email,
    itemName: invoice.item_name,
    baseAmountCzk: invoice.base_amount_czk,
    discountCode: invoice.discount_code,
    discountAmountCzk: invoice.discount_amount_czk,
    totalAmountCzk: invoice.total_amount_czk,
  };
}

function getInvoiceFormOverrides(reg: ClubRegistration, formData?: FormData) {
  const issueDate = new Date();
  const defaultDueDate = toDateInputValue(addDays(issueDate, BILLING.dueInDays));
  const baseAmountCzk = parseCzk(
    formData?.get("base_amount_czk") ?? null,
    reg.base_amount_czk ?? getClubAmountCzk(reg.terms ?? []),
  );

  return {
    buyerName:
      String(formData?.get("buyer_name") ?? "").trim() || buildBuyerName(reg),
    buyerAddress:
      String(formData?.get("buyer_address") ?? "").trim() || buildBuyerAddress(reg),
    buyerEmail:
      String(formData?.get("buyer_email") ?? "").trim() || reg.email,
    itemName:
      String(formData?.get("item_name") ?? "").trim() ||
      `${CLUB_BILLING.itemName} - ${reg.child_name}`,
    issueDate: toDateInputValue(issueDate),
    dueDate:
      String(formData?.get("due_date") ?? "").trim() || defaultDueDate,
    baseAmountCzk,
    totalAmountCzk: baseAmountCzk,
  };
}

export async function updateStatus(id: string, formData: FormData) {
  const status = formData.get("status") as RegistrationStatus;
  if (!(status in STATUS_LABELS)) return;

  const supabase = await createClient();
  await supabase
    .from("club_registrations")
    .update({ status })
    .eq("id", id);

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
  revalidatePath("/admin");
}

export async function updateNotes(id: string, formData: FormData) {
  const raw = (formData.get("admin_notes") as string | null) ?? "";
  const admin_notes = raw.trim() === "" ? null : raw;

  const supabase = await createClient();
  await supabase
    .from("club_registrations")
    .update({ admin_notes })
    .eq("id", id);

  revalidatePath(`/admin/krouzek/${id}`);
}

export async function deleteRegistration(id: string) {
  const supabase = await createClient();
  await supabase.from("club_registrations").delete().eq("id", id);

  revalidatePath("/admin/krouzek");
  revalidatePath("/admin");
  redirect("/admin/krouzek");
}

async function issueInvoiceRecord(id: string, formData?: FormData) {
  const supabase = await createClient();
  const { data: registrationData, error: registrationError } = await supabase
    .from("club_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (registrationError || !registrationData) {
    console.error("Načtení kroužkové přihlášky pro fakturu selhalo:", registrationError);
    return null;
  }

  const reg = registrationData as ClubRegistration;
  const existing = await supabase
    .from("invoices")
    .select("*")
    .eq("club_registration_id", id)
    .maybeSingle();

  if (existing.data) {
    return existing.data as Invoice;
  }

  const sequence = await supabase.rpc("next_invoice_sequence");
  if (sequence.error || sequence.data === null) {
    console.error("Vygenerování čísla kroužkové faktury selhalo:", sequence.error);
    return null;
  }

  const invoiceNumber = buildInvoiceNumber(Number(sequence.data));
  const overrides = getInvoiceFormOverrides(reg, formData);
  const storagePath = `invoices/${new Date().getFullYear()}/${invoiceNumber}.pdf`;
  const invoiceData: InvoicePdfData = {
    invoiceNumber,
    variableSymbol: invoiceNumber,
    issueDate: overrides.issueDate,
    dueDate: overrides.dueDate,
    buyerName: overrides.buyerName,
    buyerAddress: overrides.buyerAddress,
    buyerEmail: overrides.buyerEmail,
    itemName: overrides.itemName,
    baseAmountCzk: overrides.baseAmountCzk,
    discountCode: null,
    discountAmountCzk: 0,
    totalAmountCzk: overrides.totalAmountCzk,
  };
  const pdf = await generateInvoicePdf(invoiceData);
  const uploaded = await supabase.storage.from("invoices").upload(storagePath, pdf, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (uploaded.error) {
    console.error("Uložení PDF kroužkové faktury selhalo:", uploaded.error);
    return null;
  }

  const inserted = await supabase
    .from("invoices")
    .insert({
      camp_registration_id: null,
      club_registration_id: id,
      invoice_number: invoiceData.invoiceNumber,
      variable_symbol: invoiceData.variableSymbol,
      issue_date: invoiceData.issueDate,
      due_date: invoiceData.dueDate,
      supplier_name: SITE.legalName,
      supplier_address: BILLING.supplier.addressLines.join(", "),
      supplier_ico: SITE.ico,
      supplier_registry: SITE.registry,
      supplier_vat_note: SITE.vatNote,
      buyer_name: invoiceData.buyerName,
      buyer_address: invoiceData.buyerAddress,
      buyer_email: invoiceData.buyerEmail,
      item_name: invoiceData.itemName,
      base_amount_czk: invoiceData.baseAmountCzk,
      discount_code: null,
      discount_amount_czk: 0,
      total_amount_czk: invoiceData.totalAmountCzk,
      bank_account: BILLING.bankAccount,
      iban: BILLING.iban,
      bic: BILLING.bic,
      storage_path: storagePath,
    })
    .select("*")
    .single();

  if (inserted.error || !inserted.data) {
    console.error("Uložení kroužkové faktury do databáze selhalo:", inserted.error);
    return null;
  }

  await supabase
    .from("club_registrations")
    .update({
      base_amount_czk: invoiceData.baseAmountCzk,
      total_amount_czk: invoiceData.totalAmountCzk,
    })
    .eq("id", id);

  return inserted.data as Invoice;
}

export async function issueInvoice(id: string, formData: FormData) {
  await issueInvoiceRecord(id, formData);

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
}

export async function sendIssuedInvoice(id: string) {
  const supabase = await createClient();
  const { data: registrationData, error: registrationError } = await supabase
    .from("club_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (registrationError || !registrationData) {
    console.error("Načtení kroužkové přihlášky pro odeslání faktury selhalo:", registrationError);
    return;
  }

  const invoice = await issueInvoiceRecord(id);
  if (!invoice) return;

  const downloaded = await supabase.storage
    .from("invoices")
    .download(invoice.storage_path);

  if (downloaded.error || !downloaded.data) {
    console.error("Stažení PDF kroužkové faktury pro e-mail selhalo:", downloaded.error);
    return;
  }

  try {
    const reg = registrationData as ClubRegistration;
    await sendClubInvoiceEmail({
      to: invoice.buyer_email,
      childName: reg.child_name,
      seasonLabel: CLUB_SEASON.label,
      invoice: invoiceDataFromRow(invoice),
      pdf: Buffer.from(await downloaded.data.arrayBuffer()),
    });

    await supabase
      .from("invoices")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", invoice.id);
  } catch (error) {
    console.error("Odeslání kroužkové faktury rodiči selhalo:", error);
  }

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
}

export async function updateInvoice(id: string, invoiceId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: invoiceData, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (invoiceError || !invoiceData) {
    console.error("Načtení kroužkové faktury pro úpravu selhalo:", invoiceError);
    return;
  }

  const invoice = invoiceData as Invoice;
  const baseAmountCzk = parseCzk(formData.get("base_amount_czk"), invoice.base_amount_czk);
  const updatedInvoice: InvoicePdfData = {
    invoiceNumber: invoice.invoice_number,
    variableSymbol:
      String(formData.get("variable_symbol") ?? "").trim() || invoice.variable_symbol,
    issueDate: invoice.issue_date,
    dueDate: String(formData.get("due_date") ?? "").trim() || invoice.due_date,
    buyerName:
      String(formData.get("buyer_name") ?? "").trim() || invoice.buyer_name,
    buyerAddress:
      String(formData.get("buyer_address") ?? "").trim() || invoice.buyer_address,
    buyerEmail:
      String(formData.get("buyer_email") ?? "").trim() || invoice.buyer_email,
    itemName: String(formData.get("item_name") ?? "").trim() || invoice.item_name,
    baseAmountCzk,
    discountCode: null,
    discountAmountCzk: 0,
    totalAmountCzk: baseAmountCzk,
  };
  const pdf = await generateInvoicePdf(updatedInvoice);
  const uploaded = await supabase.storage.from("invoices").upload(invoice.storage_path, pdf, {
    contentType: "application/pdf",
    upsert: true,
  });

  if (uploaded.error) {
    console.error("Regenerace kroužkové PDF faktury selhala:", uploaded.error);
    return;
  }

  await supabase
    .from("invoices")
    .update({
      variable_symbol: updatedInvoice.variableSymbol,
      due_date: updatedInvoice.dueDate,
      buyer_name: updatedInvoice.buyerName,
      buyer_address: updatedInvoice.buyerAddress,
      buyer_email: updatedInvoice.buyerEmail,
      item_name: updatedInvoice.itemName,
      base_amount_czk: updatedInvoice.baseAmountCzk,
      discount_code: null,
      discount_amount_czk: 0,
      total_amount_czk: updatedInvoice.totalAmountCzk,
      status: "issued",
      sent_at: null,
    })
    .eq("id", invoice.id);

  await supabase
    .from("club_registrations")
    .update({
      base_amount_czk: updatedInvoice.baseAmountCzk,
      total_amount_czk: updatedInvoice.totalAmountCzk,
    })
    .eq("id", id);

  console.info(
    `Kroužková faktura ${invoice.invoice_number} upravena, nová částka ${formatCzk(baseAmountCzk)}`,
  );
  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
}
