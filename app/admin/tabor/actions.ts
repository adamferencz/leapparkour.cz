"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BILLING,
  addDays,
  addMonths,
  buildInvoiceNumber,
  formatCzk,
  toDateInputValue,
} from "@/lib/billing/config";
import { generateInvoicePdf, type InvoicePdfData } from "@/lib/billing/invoice-pdf";
import { sendCampInvoiceEmail } from "@/lib/email/invoice-email";
import { createClient } from "@/lib/supabase/server";
import { CAMP, SITE } from "@/lib/config";
import { STATUS_LABELS, type CampRegistration, type Invoice, type RegistrationStatus } from "@/lib/types";

function parseCzk(value: FormDataEntryValue | null, fallback: number) {
  const raw = String(value ?? "").replace(/\s/g, "").replace(",", ".");
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.round(parsed);
}

function getInvoiceFormOverrides(reg: CampRegistration, formData?: FormData) {
  const issueDate = new Date();
  const defaultDueDate = toDateInputValue(addDays(issueDate, BILLING.dueInDays));
  const baseAmountCzk = parseCzk(
    formData?.get("base_amount_czk") ?? null,
    reg.base_amount_czk ?? BILLING.baseAmountCzk,
  );
  const discountAmountCzk = Math.min(
    baseAmountCzk,
    parseCzk(formData?.get("discount_amount_czk") ?? null, reg.discount_amount_czk ?? 0),
  );
  const totalAmountCzk = Math.max(0, baseAmountCzk - discountAmountCzk);

  return {
    buyerName:
      String(formData?.get("buyer_name") ?? "").trim() || buildBuyerName(reg),
    buyerAddress:
      String(formData?.get("buyer_address") ?? "").trim() || buildBuyerAddress(reg),
    buyerEmail:
      String(formData?.get("buyer_email") ?? "").trim() || reg.email,
    itemName:
      String(formData?.get("item_name") ?? "").trim() || BILLING.itemName,
    issueDate: toDateInputValue(issueDate),
    dueDate:
      String(formData?.get("due_date") ?? "").trim() || defaultDueDate,
    baseAmountCzk,
    discountCode:
      String(formData?.get("discount_code") ?? "").trim() ||
      reg.discount_code ||
      null,
    discountAmountCzk,
    totalAmountCzk,
  };
}

export async function updateStatus(id: string, formData: FormData) {
  const status = formData.get("status") as RegistrationStatus;
  if (!(status in STATUS_LABELS)) return;

  const supabase = await createClient();
  await supabase
    .from("camp_registrations")
    .update({ status })
    .eq("id", id);

  revalidatePath(`/admin/tabor/${id}`);
  revalidatePath("/admin/tabor");
  revalidatePath("/admin");
}

export async function updateNotes(id: string, formData: FormData) {
  const raw = (formData.get("admin_notes") as string | null) ?? "";
  const admin_notes = raw.trim() === "" ? null : raw;

  const supabase = await createClient();
  await supabase
    .from("camp_registrations")
    .update({ admin_notes })
    .eq("id", id);

  revalidatePath(`/admin/tabor/${id}`);
}

export async function deleteRegistration(id: string) {
  const supabase = await createClient();
  await supabase.from("camp_registrations").delete().eq("id", id);

  revalidatePath("/admin/tabor");
  revalidatePath("/admin");
  redirect("/admin/tabor");
}

function buildBuyerName(reg: CampRegistration) {
  const parents = [reg.billing_name, reg.mother_name, reg.father_name]
    .filter(Boolean)
    .join(" / ");
  return parents || reg.email;
}

function buildBuyerAddress(reg: CampRegistration) {
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

async function issueInvoiceRecord(id: string, formData?: FormData) {
  const supabase = await createClient();

  const { data: registrationData, error: registrationError } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (registrationError || !registrationData) {
    console.error("Načtení přihlášky pro fakturu selhalo:", registrationError);
    return;
  }

  const reg = registrationData as CampRegistration;
  const existing = await supabase
    .from("invoices")
    .select("*")
    .eq("camp_registration_id", id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (existing.data) {
    return existing.data as Invoice;
  }

  const sequence = await supabase.rpc("next_invoice_sequence");
  if (sequence.error || sequence.data === null) {
    console.error("Vygenerování čísla faktury selhalo:", sequence.error);
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
    discountCode: overrides.discountCode,
    discountAmountCzk: overrides.discountAmountCzk,
    totalAmountCzk: overrides.totalAmountCzk,
  };

  const pdf = await generateInvoicePdf(invoiceData);
  const uploaded = await supabase.storage
    .from("invoices")
    .upload(storagePath, pdf, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploaded.error) {
    console.error("Uložení PDF faktury selhalo:", uploaded.error);
    return null;
  }

  const inserted = await supabase
    .from("invoices")
    .insert({
      camp_registration_id: id,
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
      discount_code: invoiceData.discountCode,
      discount_amount_czk: invoiceData.discountAmountCzk,
      total_amount_czk: invoiceData.totalAmountCzk,
      bank_account: BILLING.bankAccount,
      iban: BILLING.iban,
      bic: BILLING.bic,
      storage_path: storagePath,
    })
    .select("*")
    .single();

  if (inserted.error || !inserted.data) {
    console.error("Uložení faktury do databáze selhalo:", inserted.error);
    return null;
  }

  if (reg.discount_code_id) {
    await supabase.rpc("increment_discount_used", {
      discount_id: reg.discount_code_id,
    });
  }

  return inserted.data as Invoice;
}

export async function issueInvoice(id: string, formData: FormData) {
  await issueInvoiceRecord(id, formData);

  revalidatePath(`/admin/tabor/${id}`);
  revalidatePath("/admin/tabor");
  revalidatePath("/admin/slevy");
}

export async function sendIssuedInvoice(id: string, invoiceId?: string) {
  const supabase = await createClient();
  const { data: registrationData, error: registrationError } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (registrationError || !registrationData) {
    console.error("Načtení přihlášky pro odeslání faktury selhalo:", registrationError);
    return;
  }

  let invoice: Invoice | null | undefined;
  if (invoiceId) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();
    if (error || !data) {
      console.error("Načtení faktury pro odeslání selhalo:", error);
      return;
    }
    invoice = data as Invoice;
  } else {
    invoice = await issueInvoiceRecord(id);
  }
  if (!invoice) return;

  const downloaded = await supabase.storage
    .from("invoices")
    .download(invoice.storage_path);

  if (downloaded.error || !downloaded.data) {
    console.error("Stažení PDF pro odeslání faktury selhalo:", downloaded.error);
    return;
  }

  try {
    await sendCampInvoiceEmail({
      to: invoice.buyer_email,
      childName: (registrationData as CampRegistration).child_name,
      invoice: invoiceDataFromRow(invoice),
      pdf: Buffer.from(await downloaded.data.arrayBuffer()),
    });

    await supabase
      .from("invoices")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", invoice.id);
  } catch (error) {
    console.error("Odeslání faktury rodiči selhalo:", error);
  }

  revalidatePath(`/admin/tabor/${id}`);
  revalidatePath("/admin/tabor");
}

export async function updateInvoice(id: string, invoiceId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: registrationData, error: registrationError } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();
  const { data: invoiceData, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (registrationError || invoiceError || !registrationData || !invoiceData) {
    console.error("Načtení dat pro úpravu faktury selhalo:", {
      registrationError,
      invoiceError,
    });
    return;
  }

  const reg = registrationData as CampRegistration;
  const invoice = invoiceData as Invoice;
  const baseAmountCzk = parseCzk(formData.get("base_amount_czk"), invoice.base_amount_czk);
  const discountAmountCzk = Math.min(
    baseAmountCzk,
    parseCzk(formData.get("discount_amount_czk"), invoice.discount_amount_czk),
  );
  const totalAmountCzk = Math.max(0, baseAmountCzk - discountAmountCzk);
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
    discountCode:
      String(formData.get("discount_code") ?? "").trim() ||
      invoice.discount_code ||
      null,
    discountAmountCzk,
    totalAmountCzk,
  };

  const pdf = await generateInvoicePdf(updatedInvoice);
  const uploaded = await supabase.storage
    .from("invoices")
    .upload(invoice.storage_path, pdf, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploaded.error) {
    console.error("Regenerace PDF faktury selhala:", uploaded.error);
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
      discount_code: updatedInvoice.discountCode,
      discount_amount_czk: updatedInvoice.discountAmountCzk,
      total_amount_czk: updatedInvoice.totalAmountCzk,
      status: "issued",
      sent_at: null,
    })
    .eq("id", invoice.id);

  console.info(
    `Faktura ${invoice.invoice_number} upravena, nová částka ${formatCzk(totalAmountCzk)}`,
  );
  revalidatePath(`/admin/tabor/${id}`);
  revalidatePath("/admin/tabor");
}

export async function splitInvoice(id: string, invoiceId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: invoiceData, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (invoiceError || !invoiceData) {
    console.error("Načtení faktury pro rozdělení na splátky selhalo:", invoiceError);
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
      "Rozdělení faktury selhalo: částka první splátky musí být kladná a menší než celková částka.",
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
    camp_registration_id: id,
    club_registration_id: null,
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

  revalidatePath(`/admin/tabor/${id}`);
  revalidatePath("/admin/tabor");
}

export async function createManualRegistration(formData: FormData) {
  const get = (name: string) => String(formData.get(name) ?? "").trim();

  const childName = get("child_name");
  const fatherName = get("father_name");
  const motherName = get("mother_name");
  const email = get("email");
  const childAgeRaw = get("child_age");
  const childBirthdate = get("child_birthdate");
  const phoneMother = get("phone_mother");
  const phoneFather = get("phone_father");
  const healthNotes = get("health_notes");
  const sports = formData
    .getAll("sports")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const sportsOther = get("sports_other");
  const roommates = get("roommates");
  const billingName = get("billing_name");
  const billingStreet = get("billing_street");
  const billingCity = get("billing_city");
  const billingZip = get("billing_zip");
  const childAge = Number(childAgeRaw) || 0;

  if (!childName || !email || !childBirthdate) {
    console.error(
      "Ruční přidání přihlášky na tábor selhalo: chybí jméno dítěte, e-mail nebo datum narození.",
    );
    return;
  }

  const supabase = await createClient();
  const inserted = await supabase
    .from("camp_registrations")
    .insert({
      camp: CAMP.id,
      child_name: childName,
      father_name: fatherName,
      mother_name: motherName,
      email,
      child_age: childAge,
      child_birthdate: childBirthdate,
      phone_mother: phoneMother,
      phone_father: phoneFather,
      health_notes: healthNotes,
      sports,
      sports_other: sportsOther || null,
      roommates: roommates || null,
      base_amount_czk: BILLING.baseAmountCzk,
      discount_code_id: null,
      discount_code: null,
      discount_amount_czk: 0,
      total_amount_czk: BILLING.baseAmountCzk,
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
    console.error("Ruční přidání přihlášky na tábor selhalo:", inserted.error);
    return;
  }

  revalidatePath("/admin/tabor");
  redirect(`/admin/tabor/${inserted.data.id}`);
}
