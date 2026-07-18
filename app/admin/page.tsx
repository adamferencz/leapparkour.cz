import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ClubRegistration, CampRegistration } from "@/lib/types";
import { StatCard, Card } from "@/components/admin/Card";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "./_lib/format";

export const dynamic = "force-dynamic";

type RecentClub = Pick<
  ClubRegistration,
  "id" | "created_at" | "child_name" | "status"
>;
type RecentCamp = Pick<
  CampRegistration,
  "id" | "created_at" | "child_name" | "status"
>;

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    clubTotal,
    clubNew,
    campTotal,
    campNew,
    clubRecent,
    campRecent,
  ] = await Promise.all([
    supabase
      .from("club_registrations")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("club_registrations")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("camp_registrations")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("camp_registrations")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("club_registrations")
      .select("id, created_at, child_name, status")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("camp_registrations")
      .select("id, created_at, child_name, status")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const clubRows = (clubRecent.data ?? []) as RecentClub[];
  const campRows = (campRecent.data ?? []) as RecentCamp[];

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <h1 className="text-2xl font-bold text-navy">Přehled</h1>
      <p className="mt-1 text-sm text-steel/80">
        Souhrn přihlášek do kroužku a na tábor.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Kroužek — přihlášky"
          total={clubTotal.count ?? 0}
          fresh={clubNew.count ?? 0}
          href="/admin/krouzek"
        />
        <StatCard
          label="Tábor — přihlášky"
          total={campTotal.count ?? 0}
          fresh={campNew.count ?? 0}
          href="/admin/tabor"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentList
          title="Poslední přihlášky — kroužek"
          href="/admin/krouzek"
          detailBase="/admin/krouzek"
          rows={clubRows}
        />
        <RecentList
          title="Poslední přihlášky — tábor"
          href="/admin/tabor"
          detailBase="/admin/tabor"
          rows={campRows}
        />
      </div>
    </main>
  );
}

function RecentList({
  title,
  href,
  detailBase,
  rows,
}: {
  title: string;
  href: string;
  detailBase: string;
  rows: (RecentClub | RecentCamp)[];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-navy">{title}</h2>
        <Link
          href={href}
          className="text-sm font-medium text-brand hover:text-brand-dark"
        >
          Zobrazit vše →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-steel/60">
          Zatím žádné přihlášky.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                href={`${detailBase}/${row.id}`}
                className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-slate-50"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-navy">
                    {row.child_name}
                  </span>
                  <span className="block text-xs text-steel/70">
                    {formatDate(row.created_at)}
                  </span>
                </span>
                <StatusBadge status={row.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
