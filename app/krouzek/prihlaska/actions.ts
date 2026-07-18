"use server";

import { redirect } from "next/navigation";
import { CLUB_SEASON } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export type ClubFormState = { error: string } | null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WHATSAPP_VALUES = ["add", "no_add", "cannot", "other"] as const;
type WhatsappChoice = (typeof WHATSAPP_VALUES)[number];

const GENERIC_ERROR =
  "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.";

export async function submitClubRegistration(
  _prevState: ClubFormState,
  formData: FormData
): Promise<ClubFormState> {
  const childName = String(formData.get("child_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const whatsappChoice = String(formData.get("whatsapp_choice") ?? "");
  const whatsappOther = String(formData.get("whatsapp_other") ?? "").trim();
  const healthNotes = String(formData.get("health_notes") ?? "").trim();

  const validTermIds: string[] = CLUB_SEASON.terms.map((t) => t.id);
  const terms = formData
    .getAll("terms")
    .map(String)
    .filter((t) => validTermIds.includes(t));

  if (!childName) {
    return { error: "Vyplňte prosím jméno a příjmení dítěte." };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: "Vyplňte prosím platnou e-mailovou adresu." };
  }
  if (!phone) {
    return { error: "Vyplňte prosím telefonní číslo." };
  }
  if (!WHATSAPP_VALUES.includes(whatsappChoice as WhatsappChoice)) {
    return { error: "Vyberte prosím jednu z možností u WhatsApp skupiny." };
  }
  if (whatsappChoice === "other" && !whatsappOther) {
    return { error: "U možnosti „Jiné“ prosím doplňte upřesnění." };
  }
  if (terms.length === 0) {
    return { error: "Vyberte prosím alespoň jeden termín kroužku." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("club_registrations").insert({
      child_name: childName,
      email,
      phone,
      whatsapp_choice: whatsappChoice,
      whatsapp_other: whatsappChoice === "other" ? whatsappOther : null,
      terms,
      health_notes: healthNotes || null,
      season: CLUB_SEASON.id,
    });

    if (error) {
      console.error("club_registrations insert failed:", error.message);
      return { error: GENERIC_ERROR };
    }
  } catch (err) {
    console.error("club_registrations insert failed:", err);
    return { error: GENERIC_ERROR };
  }

  redirect("/krouzek/prihlaska/dekujeme");
}
