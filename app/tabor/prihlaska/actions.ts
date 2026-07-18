"use server";

import { redirect } from "next/navigation";
import { CAMP } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export interface CampFormState {
  error: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (
    !childName ||
    !fatherName ||
    !motherName ||
    !phoneMother ||
    !phoneFather ||
    !healthNotes
  ) {
    return { error: "Vyplňte prosím všechna povinná pole." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Zadejte prosím platnou e-mailovou adresu." };
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
    const { error } = await supabase.from("camp_registrations").insert({
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
    });

    if (error) {
      console.error("Uložení přihlášky na tábor selhalo:", error);
      return {
        error:
          "Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na e-mail.",
      };
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
