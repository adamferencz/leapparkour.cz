"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import {
  BILLING,
  addDays,
  buildInvoiceNumber,
  calculateDiscountAmount,
  normalizeDiscountCode,
  toDateInputValue,
  type DiscountCode,
} from "@/lib/billing/config";
import { generateInvoicePdf, type InvoicePdfData } from "@/lib/billing/invoice-pdf";
import { CAMP, SITE } from "@/lib/config";
import { sendCampRegistrationEmails } from "@/lib/email/registration-emails";
import { createClient } from "@/lib/supabase/server";

export interface CampFormState {
  error: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isMissingBillingSchema(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.code === "PGRST204" ||
    /discount_codes|base_amount_czk|discount_code|total_amount_czk|billing_name|billing_street|billing_city|billing_zip|legal_terms_accepted_at|photo_consent/i.test(
      error.message ?? "",
    )
  );
}

function registrationPayload({
  childName,
  fatherName,
  motherName,
  email,
  childAge,
  childBirthdate,
  phoneMother,
  phoneFather,
  healthNotes,
  sports,
  sportsOther,
  roommates,
  billingName,
  billingStreet,
  billingCity,
  billingZip,
  legalTermsAcceptedAt,
  photoConsent,
}: {
  childName: string;
  fatherName: string;
  motherName: string;
  email: string;
  childAge: number;
  childBirthdate: string;
  phoneMother: string;
  phoneFather: string;
  healthNotes: string;
  sports: string[];
  sportsOther: string;
  roommates: string;
  billingName: string;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  legalTermsAcceptedAt: string;
  photoConsent: boolean;
}) {
  return {
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
    billing_name: billingName,
    billing_street: billingStreet,
    billing_city: billingCity,
    billing_zip: billingZip,
    legal_terms_accepted_at: legalTermsAcceptedAt,
    photo_consent: photoConsent,
  };
}

type InvoiceAttachment = {
  invoiceId: string;
  filename: string;
  content: string;
};

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

type DiscountValidationRow = {
  id: string;
  code: string;
  label: string | null;
  type: DiscountCode["type"];
  value: number;
  active: boolean;
  max_uses: number | null;
  used_count: number;
  valid_from: string | null;
  valid_until: string | null;
  admin_notes: string | null;
};

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
  discount,
  discountAmountCzk,
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
  discount: DiscountCode | null;
  discountAmountCzk: number;
  totalAmountCzk: number;
}): Promise<InvoiceAttachment | null> {
  const sequence = await supabase.rpc("next_invoice_sequence");

  if (sequence.error || sequence.data === null) {
    console.error("Automatické vystavení faktury po přihlášce selhalo:", sequence.error);
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
    itemName: BILLING.itemName,
    baseAmountCzk: BILLING.baseAmountCzk,
    discountCode: discount?.code ?? null,
    discountAmountCzk,
    totalAmountCzk,
  };
  const pdf = await generateInvoicePdf(invoiceData);
  const storagePath = `invoices/${new Date().getFullYear()}/${invoiceNumber}.pdf`;
  const uploaded = await supabase.storage.from("invoices").upload(storagePath, pdf, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (uploaded.error) {
    console.error("Uložení automatické faktury do Supabase Storage selhalo:", uploaded.error);
    return null;
  }

  const inserted = await supabase
    .from("invoices")
    .insert({
      id: invoiceId,
      camp_registration_id: registrationId,
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
    });

  if (inserted.error) {
    console.error("Uložení automatické faktury do databáze selhalo:", inserted.error);
    return null;
  }

  if (discount?.id) {
    const incremented = await supabase.rpc("increment_discount_used", {
      discount_id: discount.id,
    });

    if (incremented.error) {
      console.error("Započítání použití slevového kódu selhalo:", incremented.error);
    }
  }

  return {
    invoiceId,
    filename: `faktura-${invoiceNumber}.pdf`,
    content: pdf.toString("base64"),
  };
}

export async function submitCampRegistration(
  _prevState: CampFormState | null,
  formData: FormData
): Promise<CampFormState | null> {
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
  const discountCode = normalizeDiscountCode(get("discount_code"));
  const legalAcceptance = formData.get("legal_acceptance") === "on";
  const photoConsent = formData.get("photo_consent") === "on";

  if (
    !childName ||
    !fatherName ||
    !motherName ||
    !phoneMother ||
    !phoneFather ||
    !healthNotes ||
    !billingName ||
    !billingStreet ||
    !billingCity ||
    !billingZip
  ) {
    return { error: "Vyplňte prosím všechna povinná pole." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Zadejte prosím platnou e-mailovou adresu." };
  }

  if (!legalAcceptance) {
    return {
      error:
        "Potvrďte prosím, že souhlasíte s obchodními podmínkami a berete na vědomí zpracování osobních údajů.",
    };
  }

  const childAge = Number(childAgeRaw);
  if (!childAgeRaw || !Number.isInteger(childAge) || childAge < 5 || childAge > 18) {
    return { error: "Zadejte prosím věk dítěte jako číslo v rozmezí 5–18 let." };
  }

  if (!childBirthdate || Number.isNaN(new Date(childBirthdate).getTime())) {
    return { error: "Zadejte prosím platné datum narození dítěte." };
  }

  if (sports.length === 0 && !sportsOther) {
    return {
      error: "Vyberte prosím alespoň jeden sport, nebo vyplňte kolonku Jiné.",
    };
  }

  try {
    const supabase = await createClient();
    let discount: DiscountCode | null = null;
    let discountAmountCzk = 0;

    if (discountCode) {
      const { data: discountData, error: discountError } = await supabase
        .rpc("validate_discount_code", { input_code: discountCode })
        .maybeSingle<DiscountValidationRow>();

      if (discountError) {
        console.error("Ověření slevového kódu selhalo:", discountError);
        if (!isMissingBillingSchema(discountError)) {
          return {
            error:
              "Slevový kód se nepodařilo ověřit. Zkuste to prosím znovu, nebo pole nechte prázdné.",
          };
        }
      }

      if (discountData) {
        discount = discountData;
        discountAmountCzk = calculateDiscountAmount(discount, BILLING.baseAmountCzk);
      } else {
        return { error: "Zadaný slevový kód není platný." };
      }
    }

    const totalAmountCzk = BILLING.baseAmountCzk - discountAmountCzk;
    const legalTermsAcceptedAt = new Date().toISOString();
    const basePayload = registrationPayload({
      childName,
      fatherName,
      motherName,
      email,
      childAge,
      childBirthdate,
      phoneMother,
      phoneFather,
      healthNotes,
      sports,
      sportsOther,
      roommates,
      billingName,
      billingStreet,
      billingCity,
      billingZip,
      legalTermsAcceptedAt,
      photoConsent,
    });
    let registrationId: string | null = randomUUID();
    let billingSchemaAvailable = true;
    const inserted = await supabase
      .from("camp_registrations")
      .insert({
        id: registrationId,
        ...basePayload,
        base_amount_czk: BILLING.baseAmountCzk,
        discount_code_id: discount?.id ?? null,
        discount_code: discount?.code ?? null,
        discount_amount_czk: discountAmountCzk,
        total_amount_czk: totalAmountCzk,
      });

    if (inserted.error) {
      if (isMissingBillingSchema(inserted.error)) {
        billingSchemaAvailable = false;
        console.warn(
          "Fakturační sloupce zatím nejsou v Supabase, ukládám přihlášku ve starém formátu.",
          inserted.error,
        );
        registrationId = randomUUID();
        const fallback = await supabase
          .from("camp_registrations")
          .insert({
            id: registrationId,
            camp: basePayload.camp,
            child_name: basePayload.child_name,
            father_name: basePayload.father_name,
            mother_name: basePayload.mother_name,
            email: basePayload.email,
            child_age: basePayload.child_age,
            child_birthdate: basePayload.child_birthdate,
            phone_mother: basePayload.phone_mother,
            phone_father: basePayload.phone_father,
            health_notes: basePayload.health_notes,
            sports: basePayload.sports,
            sports_other: basePayload.sports_other,
            roommates: basePayload.roommates,
            admin_notes: [
              "Fakturační údaje z přihlášky:",
              basePayload.billing_name,
              basePayload.billing_street,
              `${basePayload.billing_zip} ${basePayload.billing_city}`,
              "",
              `Souhlas s podmínkami a GDPR: ${legalTermsAcceptedAt}`,
              `Souhlas s fotkami a videem: ${photoConsent ? "ano" : "ne"}`,
            ].join("\n"),
          });

        if (fallback.error) {
          console.error("Uložení přihlášky na tábor selhalo:", fallback.error);
          return {
            error:
              "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.",
          };
        }

      } else {
        console.error("Uložení přihlášky na tábor selhalo:", inserted.error);
        return {
          error:
            "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.",
        };
      }
    }

    try {
      const invoiceAttachment =
        billingSchemaAvailable && registrationId
          ? await createInitialInvoiceAttachment({
              supabase,
              registrationId,
              childName,
              email,
              billingName,
              billingStreet,
              billingCity,
              billingZip,
              discount,
              discountAmountCzk,
              totalAmountCzk,
            })
          : null;
      const emailResults = await sendCampRegistrationEmails({
        childName,
        fatherName,
        motherName,
        email,
        childAge,
        childBirthdate,
        phoneMother,
        phoneFather,
        healthNotes,
        sports,
        sportsOther,
        roommates,
        baseAmountCzk: BILLING.baseAmountCzk,
        discountCode: discount?.code ?? null,
        discountAmountCzk,
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
      console.error("Odeslání e-mailu po přihlášce na tábor selhalo:", emailError);
    }
  } catch (err) {
    console.error("Odeslání přihlášky na tábor selhalo:", err);
    return {
      error:
        "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.",
    };
  }

  redirect("/tabor/prihlaska/dekujeme");
}
