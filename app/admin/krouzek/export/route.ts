import { createClient } from "@/lib/supabase/server";
import { STATUS_LABELS } from "@/lib/types";
import type { ClubRegistration } from "@/lib/types";
import { buildCsv, csvResponse } from "../../_lib/csv";
import { formatDateTime, termLabels, whatsappLabel } from "../../_lib/format";

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
    .from("club_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as ClubRegistration[];

  const headers = [
    "Přihlášeno",
    "Sezóna",
    "Jméno dítěte",
    "E-mail",
    "Telefon",
    "Termíny",
    "WhatsApp skupina",
    "Zdravotní omezení",
    "Status",
    "Poznámka administrátora",
  ];

  const csvRows = rows.map((r) => [
    formatDateTime(r.created_at),
    r.season,
    r.child_name,
    r.email,
    r.phone,
    termLabels(r.terms),
    whatsappLabel(r),
    r.health_notes,
    STATUS_LABELS[r.status],
    r.admin_notes,
  ]);

  return csvResponse(buildCsv(headers, csvRows), "prihlasky-krouzek.csv");
}
