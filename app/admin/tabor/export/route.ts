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
    STATUS_LABELS[r.status],
    r.admin_notes,
  ]);

  return csvResponse(buildCsv(headers, csvRows), "prihlasky-tabor.csv");
}
