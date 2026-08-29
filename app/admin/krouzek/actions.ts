"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BILLING,
  CLUB_BILLING,
  addDays,
  addMonths,
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
    .order("created_at", { ascending: true })
    .limit(1)
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

export async function sendIssuedInvoice(id: string, invoiceId?: string) {
  const supabase = await createClient();
  const { data: registrationData, error: registrationError } = await supabase
    .from("club_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (registrationError || !registrationData) {
    console.error("Načtení kroužkové přihlášky pro odeslání faktury selhalo:", registrationError);
    redirect(`/admin/krouzek/${id}?sent=error`);
  }

  let invoice: Invoice | null | undefined;
  if (invoiceId) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();
    if (error || !data) {
      console.error("Načtení kroužkové faktury pro odeslání selhalo:", error);
      redirect(`/admin/krouzek/${id}?sent=error`);
    }
    invoice = data as Invoice;
  } else {
    invoice = await issueInvoiceRecord(id);
  }
  if (!invoice) {
    redirect(`/admin/krouzek/${id}?sent=error`);
  }

  const downloaded = await supabase.storage
    .from("invoices")
    .download(invoice.storage_path);

  if (downloaded.error || !downloaded.data) {
    console.error("Stažení PDF kroužkové faktury pro e-mail selhalo:", downloaded.error);
    redirect(`/admin/krouzek/${id}?sent=error`);
  }

  let sendFailed = false;
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
    sendFailed = true;
  }

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
  redirect(`/admin/krouzek/${id}?sent=${sendFailed ? "error" : "ok"}`);
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

  console.info(
    `Kroužková faktura ${invoice.invoice_number} upravena, nová částka ${formatCzk(baseAmountCzk)}`,
  );
  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
}

export async function splitInvoice(id: string, invoiceId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: invoiceData, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (invoiceError || !invoiceData) {
    console.error("Načtení kroužkové faktury pro rozdělení na splátky selhalo:", invoiceError);
    return;
  }

  const invoice = invoiceData as Invoice;
  const firstAmountCzk = parseCzk(formData.get("first_amount_czk"), 0);
  const monthsUntilSecond = Math.max(
    1,
    Math.round(Number(formData.get("months_until_second") ?? 3)) || 3,
  );
  const remainderCzk = invoice.total_amount_czk - firstAmountCzk;

  if (firstAmountCzk <= 0 || remainderCzk <= 0) {
    console.error(
      "Rozdělení kroužkové faktury selhalo: částka první splátky musí být kladná a menší než celková částka.",
    );
    return;
  }

  const firstItemName = `${invoice.item_name} (1. splátka)`;
  const firstPdfData: InvoicePdfData = {
    ...invoiceDataFromRow(invoice),
    itemName: firstItemName,
    baseAmountCzk: firstAmountCzk,
    discountCode: null,
    discountAmountCzk: 0,
    totalAmountCzk: firstAmountCzk,
  };
  const firstPdf = await generateInvoicePdf(firstPdfData);
  const firstUploaded = await supabase.storage
    .from("invoices")
    .upload(invoice.storage_path, firstPdf, { contentType: "application/pdf", upsert: true });

  if (firstUploaded.error) {
    console.error("Uložení PDF první splátky selhalo:", firstUploaded.error);
    return;
  }

  await supabase
    .from("invoices")
    .update({
      item_name: firstItemName,
      base_amount_czk: firstAmountCzk,
      discount_code: null,
      discount_amount_czk: 0,
      total_amount_czk: firstAmountCzk,
      status: "issued",
      sent_at: null,
    })
    .eq("id", invoice.id);

  const sequence = await supabase.rpc("next_invoice_sequence");
  if (sequence.error || sequence.data === null) {
    console.error("Vygenerování čísla faktury pro druhou splátku selhalo:", sequence.error);
    return;
  }

  const secondInvoiceNumber = buildInvoiceNumber(Number(sequence.data));
  const secondDueDate = toDateInputValue(addMonths(new Date(), monthsUntilSecond));
  const secondItemName = `${invoice.item_name} (2. splátka)`;
  const secondPdfData: InvoicePdfData = {
    invoiceNumber: secondInvoiceNumber,
    variableSymbol: secondInvoiceNumber,
    issueDate: invoice.issue_date,
    dueDate: secondDueDate,
    buyerName: invoice.buyer_name,
    buyerAddress: invoice.buyer_address,
    buyerEmail: invoice.buyer_email,
    itemName: secondItemName,
    baseAmountCzk: remainderCzk,
    discountCode: null,
    discountAmountCzk: 0,
    totalAmountCzk: remainderCzk,
  };
  const secondPdf = await generateInvoicePdf(secondPdfData);
  const secondStoragePath = `invoices/${new Date().getFullYear()}/${secondInvoiceNumber}.pdf`;
  const secondUploaded = await supabase.storage
    .from("invoices")
    .upload(secondStoragePath, secondPdf, { contentType: "application/pdf", upsert: false });

  if (secondUploaded.error) {
    console.error("Uložení PDF druhé splátky selhalo:", secondUploaded.error);
    return;
  }

  const secondInserted = await supabase.from("invoices").insert({
    camp_registration_id: null,
    club_registration_id: id,
    invoice_number: secondInvoiceNumber,
    variable_symbol: secondInvoiceNumber,
    issue_date: invoice.issue_date,
    due_date: secondDueDate,
    supplier_name: invoice.supplier_name,
    supplier_address: invoice.supplier_address,
    supplier_ico: invoice.supplier_ico,
    supplier_registry: invoice.supplier_registry,
    supplier_vat_note: invoice.supplier_vat_note,
    buyer_name: invoice.buyer_name,
    buyer_address: invoice.buyer_address,
    buyer_email: invoice.buyer_email,
    item_name: secondItemName,
    base_amount_czk: remainderCzk,
    discount_code: null,
    discount_amount_czk: 0,
    total_amount_czk: remainderCzk,
    bank_account: invoice.bank_account,
    iban: invoice.iban,
    bic: invoice.bic,
    storage_path: secondStoragePath,
    installment_of: invoice.id,
  });

  if (secondInserted.error) {
    console.error("Uložení druhé splátky do databáze selhalo:", secondInserted.error);
    return;
  }

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
}

export async function createManualRegistration(formData: FormData) {
  const childName = String(formData.get("child_name") ?? "").trim();
  const parentName = String(formData.get("parent_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const whatsappChoice = String(formData.get("whatsapp_choice") ?? "no_add");
  const healthNotes = String(formData.get("health_notes") ?? "").trim();
  const billingName = String(formData.get("billing_name") ?? "").trim();
  const billingStreet = String(formData.get("billing_street") ?? "").trim();
  const billingCity = String(formData.get("billing_city") ?? "").trim();
  const billingZip = String(formData.get("billing_zip") ?? "").trim();

  const validTermIds: string[] = CLUB_SEASON.terms.map((t) => t.id);
  const terms = formData
    .getAll("terms")
    .map(String)
    .filter((t) => validTermIds.includes(t));

  if (!childName || !email) {
    console.error("Ruční přidání přihlášky na kroužek selhalo: chybí jméno dítěte nebo e-mail.");
    return;
  }

  const totalAmountCzk = getClubAmountCzk(terms);
  const supabase = await createClient();
  const inserted = await supabase
    .from("club_registrations")
    .insert({
      child_name: childName,
      parent_name: parentName || null,
      email,
      phone,
      whatsapp_choice: whatsappChoice,
      whatsapp_other: null,
      terms,
      health_notes: healthNotes || null,
      season: CLUB_SEASON.id,
      base_amount_czk: totalAmountCzk,
      total_amount_czk: totalAmountCzk,
      billing_name: billingName || null,
      billing_street: billingStreet || null,
      billing_city: billingCity || null,
      billing_zip: billingZip || null,
      legal_terms_accepted_at: new Date().toISOString(),
      photo_consent: false,
      status: "confirmed",
      admin_notes: "Přidáno ručně v administraci.",
    })
    .select("id")
    .single();

  if (inserted.error || !inserted.data) {
    console.error("Ruční přidání přihlášky na kroužek selhalo:", inserted.error);
    return;
  }

  revalidatePath("/admin/krouzek");
  redirect(`/admin/krouzek/${inserted.data.id}`);
}
