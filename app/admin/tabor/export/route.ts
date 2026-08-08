import { createClient } from "@/lib/supabase/server";
import { STATUS_LABELS } from "@/lib/types";
import type { CampRegistration } from "@/lib/types";
import { buildCsv, csvResponse } from "../../_lib/csv";
import { formatDateTime, formatDate } from "../../_lib/format";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data } = await supabase
    .from("camp_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as CampRegistration[];

  const headers = [
    "Přihlášeno",
    "Ročník tábora",
    "Jméno dítěte",
    "Věk",
    "Datum narození",
    "Jméno matky",
    "Jméno otce",
    "E-mail",
    "Telefon matka",
    "Telefon otec",
    "Vybrané sporty",
    "Jiné sporty",
    "Spolubydlící",
    "Zdravotní omezení",
    "Cena",
    "Slevový kód",
    "Sleva",
    "K úhradě",
    "Souhlas s podmínkami a GDPR",
    "Souhlas s fotkami a videem",
    "Status",
    "Poznámka administrátora",
  ];

  const csvRows = rows.map((r) => [
    formatDateTime(r.created_at),
    r.camp,
    r.child_name,
    r.child_age,
    r.child_birthdate ? formatDate(r.child_birthdate) : "",
    r.mother_name,
    r.father_name,
    r.email,
    r.phone_mother,
    r.phone_father,
    (r.sports ?? []).join(", "),
    r.sports_other,
    r.roommates,
    r.health_notes,
    r.base_amount_czk,
    r.discount_code,
    r.discount_amount_czk,
    r.total_amount_czk,
    r.legal_terms_accepted_at ? formatDateTime(r.legal_terms_accepted_at) : "",
    r.photo_consent ? "Ano" : "Ne",
    STATUS_LABELS[r.status],
    r.admin_notes,
  ]);

  return csvResponse(buildCsv(headers, csvRows), "prihlasky-tabor.csv");
}
