import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ClubRegistration } from "@/lib/types";
import { Card } from "@/components/admin/Card";
import StatusBadge from "@/components/admin/StatusBadge";
import ExportButton from "@/components/admin/ExportButton";
import { formatDate, termLabels, pluralRegistrations } from "../_lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kroužek — přihlášky",
};

type Row = Pick<
  ClubRegistration,
  "id" | "created_at" | "child_name" | "email" | "phone" | "terms" | "status"
>;

export default async function KrouzekListPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("club_registrations")
    .select("id, created_at, child_name, email, phone, terms, status")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as Row[];

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kroužek</h1>
          <p className="mt-1 text-sm text-steel/80">
            {pluralRegistrations(rows.length)} celkem
          </p>
        </div>
        <ExportButton href="/admin/krouzek/export" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-steel/70">
                <th className="px-5 py-3 font-semibold">Datum</th>
                <th className="px-5 py-3 font-semibold">Dítě</th>
                <th className="px-5 py-3 font-semibold">E-mail</th>
                <th className="px-5 py-3 font-semibold">Telefon</th>
                <th className="px-5 py-3 font-semibold">Termíny</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-steel/60"
                  >
                    Zatím žádné přihlášky.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group cursor-pointer transition-colors hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                      <Link
                        href={`/admin/krouzek/${row.id}`}
                        className="block"
                      >
                        {formatDate(row.created_at)}
                      </Link>
                    </td>
                    <td className="px-5 py-3 font-medium text-navy">
                      <Link href={`/admin/krouzek/${row.id}`} className="block">
                        {row.child_name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-steel/80">
                      <Link href={`/admin/krouzek/${row.id}`} className="block">
                        {row.email}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                      <Link href={`/admin/krouzek/${row.id}`} className="block">
                        {row.phone}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-steel/80">
                      <Link href={`/admin/krouzek/${row.id}`} className="block">
                        {termLabels(row.terms)}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/krouzek/${row.id}`} className="block">
                        <StatusBadge status={row.status} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
