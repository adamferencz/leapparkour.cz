"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import {
  BILLING,
  CLUB_BILLING,
  addDays,
  buildInvoiceNumber,
  getClubAmountCzk,
  toDateInputValue,
} from "@/lib/billing/config";
import { generateInvoicePdf, type InvoicePdfData } from "@/lib/billing/invoice-pdf";
import { CLUB_SEASON } from "@/lib/config";
import { sendClubRegistrationEmails } from "@/lib/email/registration-emails";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/config";

export type ClubFormState = { error: string } | null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WHATSAPP_VALUES = ["add", "no_add"] as const;
type WhatsappChoice = (typeof WHATSAPP_VALUES)[number];

const GENERIC_ERROR =
  "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function isMissingLegalSchema(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST204" ||
    /legal_terms_accepted_at|photo_consent/i.test(error.message ?? "")
  );
}

function buildBuyerAddress({
  billingStreet,
  billingCity,
  billingZip,
}: {
  billingStreet: string;
  billingCity: string;
  billingZip: string;
}) {
  return [billingStreet, [billingZip, billingCity].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

async function createInitialInvoiceAttachment({
  supabase,
  registrationId,
  childName,
  email,
  billingName,
  billingStreet,
  billingCity,
  billingZip,
  totalAmountCzk,
}: {
  supabase: SupabaseServerClient;
  registrationId: string;
  childName: string;
  email: string;
  billingName: string;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  totalAmountCzk: number;
}) {
  const sequence = await supabase.rpc("next_invoice_sequence");

  if (sequence.error || sequence.data === null) {
    console.error("Automatické vystavení faktury ke kroužku selhalo:", sequence.error);
    return null;
  }

  const invoiceNumber = buildInvoiceNumber(Number(sequence.data));
  const invoiceId = randomUUID();
  const issueDate = new Date();
  const invoiceData: InvoicePdfData = {
    invoiceNumber,
    variableSymbol: invoiceNumber,
    issueDate: toDateInputValue(issueDate),
    dueDate: toDateInputValue(addDays(issueDate, BILLING.dueInDays)),
    buyerName: billingName || email,
    buyerAddress: buildBuyerAddress({ billingStreet, billingCity, billingZip }),
    buyerEmail: email,
    itemName: `${CLUB_BILLING.itemName} - ${childName}`,
    baseAmountCzk: totalAmountCzk,
    discountCode: null,
    discountAmountCzk: 0,
    totalAmountCzk,
  };
  const pdf = await generateInvoicePdf(invoiceData);
  const storagePath = `invoices/${new Date().getFullYear()}/${invoiceNumber}.pdf`;
  const uploaded = await supabase.storage.from("invoices").upload(storagePath, pdf, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (uploaded.error) {
    console.error("Uložení automatické faktury ke kroužku do Storage selhalo:", uploaded.error);
    return null;
  }

  const inserted = await supabase
    .from("invoices")
    .insert({
      id: invoiceId,
      camp_registration_id: null,
      club_registration_id: registrationId,
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
    });

  if (inserted.error) {
    console.error("Uložení automatické faktury ke kroužku do databáze selhalo:", inserted.error);
    return null;
  }

  return {
    invoiceId,
    filename: `faktura-${invoiceNumber}.pdf`,
    content: pdf.toString("base64"),
  };
}

export async function submitClubRegistration(
  _prevState: ClubFormState,
  formData: FormData
): Promise<ClubFormState> {
  const childName = String(formData.get("child_name") ?? "").trim();
  const parentName = String(formData.get("parent_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const whatsappChoice = String(formData.get("whatsapp_choice") ?? "");
  const healthNotes = String(formData.get("health_notes") ?? "").trim();
  const billingName = String(formData.get("billing_name") ?? "").trim();
  const billingStreet = String(formData.get("billing_street") ?? "").trim();
  const billingCity = String(formData.get("billing_city") ?? "").trim();
  const billingZip = String(formData.get("billing_zip") ?? "").trim();
  const legalAcceptance = formData.get("legal_acceptance") === "on";
  const photoConsent = formData.get("photo_consent") === "on";

  const validTermIds: string[] = CLUB_SEASON.terms.map((t) => t.id);
  const terms = formData
    .getAll("terms")
    .map(String)
    .filter((t) => validTermIds.includes(t));

  if (!childName) {
    return { error: "Vyplňte prosím jméno a příjmení dítěte." };
  }
  if (!parentName) {
    return { error: "Vyplňte prosím jméno a příjmení rodiče." };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: "Vyplňte prosím platnou e-mailovou adresu." };
  }
  if (!phone) {
    return { error: "Vyplňte prosím telefonní číslo." };
  }
  if (!billingName || !billingStreet || !billingCity || !billingZip) {
    return { error: "Vyplňte prosím fakturační údaje." };
  }
  if (!legalAcceptance) {
    return {
      error:
        "Potvrďte prosím, že souhlasíte s obchodními podmínkami a berete na vědomí zpracování osobních údajů.",
    };
  }
  if (!WHATSAPP_VALUES.includes(whatsappChoice as WhatsappChoice)) {
    return { error: "Vyberte prosím jednu z možností u WhatsApp skupiny." };
  }
  if (terms.length === 0) {
    return { error: "Vyberte prosím alespoň jeden termín kroužku." };
  }

  try {
    const supabase = await createClient();
    const totalAmountCzk = getClubAmountCzk(terms);
    const registrationId = randomUUID();
    const legalTermsAcceptedAt = new Date().toISOString();
    const { error } = await supabase.from("club_registrations").insert({
      id: registrationId,
      child_name: childName,
      parent_name: parentName,
      email,
      phone,
      whatsapp_choice: whatsappChoice,
      whatsapp_other: null,
      terms,
      health_notes: healthNotes || null,
      season: CLUB_SEASON.id,
      base_amount_czk: totalAmountCzk,
      total_amount_czk: totalAmountCzk,
      billing_name: billingName,
      billing_street: billingStreet,
      billing_city: billingCity,
      billing_zip: billingZip,
      legal_terms_accepted_at: legalTermsAcceptedAt,
      photo_consent: photoConsent,
    });

    if (error) {
      if (isMissingLegalSchema(error)) {
        console.warn(
          "Právní sloupce zatím nejsou v Supabase, ukládám přihlášku bez nich.",
          error,
        );
        const fallback = await supabase.from("club_registrations").insert({
          id: registrationId,
          child_name: childName,
          parent_name: parentName,
          email,
          phone,
          whatsapp_choice: whatsappChoice,
          whatsapp_other: null,
          terms,
          health_notes: healthNotes || null,
          season: CLUB_SEASON.id,
          base_amount_czk: totalAmountCzk,
          total_amount_czk: totalAmountCzk,
          billing_name: billingName,
          billing_street: billingStreet,
          billing_city: billingCity,
          billing_zip: billingZip,
          admin_notes: [
            `Souhlas s podmínkami a GDPR: ${legalTermsAcceptedAt}`,
            `Souhlas s fotkami a videem: ${photoConsent ? "ano" : "ne"}`,
          ].join("\n"),
        });

        if (fallback.error) {
          console.error("club_registrations fallback insert failed:", fallback.error?.message);
          return { error: GENERIC_ERROR };
        }
      } else {
        console.error("club_registrations insert failed:", error?.message);
        return { error: GENERIC_ERROR };
      }
    }

    try {
      const invoiceAttachment = await createInitialInvoiceAttachment({
        supabase,
        registrationId,
        childName,
        email,
        billingName,
        billingStreet,
        billingCity,
        billingZip,
        totalAmountCzk,
      });
      const emailResults = await sendClubRegistrationEmails({
        childName,
        parentName,
        email,
        phone,
        whatsappChoice,
        terms,
        healthNotes,
        totalAmountCzk,
        invoiceAttachment: invoiceAttachment
          ? {
              filename: invoiceAttachment.filename,
              content: invoiceAttachment.content,
            }
          : null,
      });
      if (invoiceAttachment && emailResults[0]?.status === "fulfilled") {
        await supabase.rpc("mark_invoice_sent_public", {
          invoice_id: invoiceAttachment.invoiceId,
        });
      }
    } catch (emailError) {
      console.error("club registration e-mail failed:", emailError);
    }
  } catch (err) {
    console.error("club_registrations insert failed:", err);
    return { error: GENERIC_ERROR };
  }

  redirect("/krouzek/prihlaska/dekujeme");
}
