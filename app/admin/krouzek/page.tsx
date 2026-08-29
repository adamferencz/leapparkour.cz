import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ClubRegistration } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";
import { CLUB_SEASON } from "@/lib/config";
import { formatCzk } from "@/lib/billing/config";
import { Card } from "@/components/admin/Card";
import ExportButton from "@/components/admin/ExportButton";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate, termLabels, pluralRegistrations } from "../_lib/format";
import { deleteRegistration } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kroužek — přihlášky",
};

type Row = Pick<
  ClubRegistration,
  "id" | "created_at" | "child_name" | "phone" | "terms"
>;

function inputClass() {
  return "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default async function KrouzekListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; term?: string; status?: string }>;
}) {
  const { q = "", term = "", status = "" } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("club_registrations")
    .select("id, created_at, child_name, phone, terms")
    .order("created_at", { ascending: false });

  const safeQ = q.trim().replace(/[,()]/g, "");
  if (safeQ) {
    const like = `%${safeQ}%`;
    query = query.or(
      `child_name.ilike.${like},parent_name.ilike.${like},email.ilike.${like},phone.ilike.${like}`,
    );
  }
  if (term) {
    query = query.contains("terms", [term]);
  }
  if (status) {
    query = query.eq("status", status);
  }

  const { data } = await query;
  const rows = (data ?? []) as Row[];

  const ids = rows.map((row) => row.id);
  const invoiceTotals = new Map<string, number>();
  const invoiceCounts = new Map<string, number>();
  if (ids.length > 0) {
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("club_registration_id, total_amount_czk")
      .in("club_registration_id", ids);
    (invoicesData ?? []).forEach((inv) => {
      const key = inv.club_registration_id as string;
      invoiceTotals.set(key, (invoiceTotals.get(key) ?? 0) + (inv.total_amount_czk as number));
      invoiceCounts.set(key, (invoiceCounts.get(key) ?? 0) + 1);
    });
  }

  const hasFilters = Boolean(q || term || status);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kroužek</h1>
          <p className="mt-1 text-sm text-steel/80">
            {pluralRegistrations(rows.length)} {hasFilters ? "nalezeno" : "celkem"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/krouzek/nova"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Přidat přihlášku
          </Link>
          <ExportButton href="/admin/krouzek/export" />
        </div>
      </div>

      <form className="mt-6 flex flex-wrap items-end gap-3">
        <label className="flex-1 min-w-[220px]">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel/70">
            Hledat
          </span>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Jméno, e-mail, telefon..."
            className={`w-full ${inputClass()}`}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel/70">
            Termín
          </span>
          <select name="term" defaultValue={term} className={inputClass()}>
            <option value="">Všechny termíny</option>
            {CLUB_SEASON.terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel/70">
            Stav
          </span>
          <select name="status" defaultValue={status} className={inputClass()}>
            <option value="">Všechny stavy</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          Filtrovat
        </button>
        {hasFilters && (
          <Link
            href="/admin/krouzek"
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
          >
            Zrušit filtry
          </Link>
        )}
      </form>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-steel/70">
                <th className="px-5 py-3 font-semibold">Datum</th>
                <th className="px-5 py-3 font-semibold">Dítě</th>
                <th className="px-5 py-3 font-semibold">Telefon na rodiče</th>
                <th className="px-5 py-3 font-semibold">Termín</th>
                <th className="px-5 py-3 font-semibold">Částka faktury</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-steel/60"
                  >
                    {hasFilters ? "Žádná přihláška neodpovídá filtru." : "Zatím žádné přihlášky."}
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const total = invoiceTotals.get(row.id);
                  const count = invoiceCounts.get(row.id) ?? 0;
                  return (
                    <tr
                      key={row.id}
                      className="group cursor-pointer transition-colors hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                        <Link href={`/admin/krouzek/${row.id}`} className="block">
                          {formatDate(row.created_at)}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-medium text-navy">
                        <Link href={`/admin/krouzek/${row.id}`} className="block">
                          {row.child_name}
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
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-navy">
                        <Link href={`/admin/krouzek/${row.id}`} className="block">
                          {total !== undefined ? (
                            <>
                              {formatCzk(total)}
                              {count > 1 && (
                                <span className="ml-1 text-xs font-normal text-steel/60">
                                  ({count} splátky)
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-steel/50">Nevystavena</span>
                          )}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right">
                        <DeleteButton
                          action={deleteRegistration.bind(null, row.id)}
                          label="Smazat"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
