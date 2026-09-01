import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CampRegistration } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";
import { Card } from "@/components/admin/Card";
import ExportButton from "@/components/admin/ExportButton";
import DeleteButton from "@/components/admin/DeleteButton";
import { ActiveSwitch } from "@/components/admin/ActiveSwitch";
import { formatCzk } from "@/lib/billing/config";
import { formatDate, pluralRegistrations } from "../_lib/format";
import { deleteRegistration, setActive } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tábor — přihlášky",
};

type Row = Pick<
  CampRegistration,
  "id" | "created_at" | "child_name" | "child_age" | "phone_mother" | "phone_father" | "active"
>;

function inputClass() {
  return "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default async function TaborListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("camp_registrations")
    .select("id, created_at, child_name, child_age, phone_mother, phone_father, active")
    .order("created_at", { ascending: false });

  const safeQ = q.trim().replace(/[,()]/g, "");
  if (safeQ) {
    const like = `%${safeQ}%`;
    query = query.or(
      `child_name.ilike.${like},mother_name.ilike.${like},father_name.ilike.${like},email.ilike.${like},phone_mother.ilike.${like},phone_father.ilike.${like}`,
    );
  }
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Načtení přihlášek na tábor selhalo:", error);
  }

  const rows = (data ?? []) as Row[];

  const ids = rows.map((row) => row.id);
  const invoiceTotals = new Map<string, number>();
  const invoiceCounts = new Map<string, number>();
  if (ids.length > 0) {
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("camp_registration_id, total_amount_czk")
      .in("camp_registration_id", ids);
    (invoicesData ?? []).forEach((inv) => {
      const key = inv.camp_registration_id as string;
      invoiceTotals.set(key, (invoiceTotals.get(key) ?? 0) + (inv.total_amount_czk as number));
      invoiceCounts.set(key, (invoiceCounts.get(key) ?? 0) + 1);
    });
  }

  const hasFilters = Boolean(q || status);
  const byName = (a: Row, b: Row) => a.child_name.localeCompare(b.child_name, "cs");
  const activeRows = rows.filter((r) => r.active).sort(byName);
  const inactiveRows = rows.filter((r) => !r.active).sort(byName);

  function renderTable(list: Row[], emptyText: string) {
    return (
      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-steel/70">
                <th className="px-5 py-3 font-semibold">Datum</th>
                <th className="px-5 py-3 font-semibold">Dítě</th>
                <th className="px-5 py-3 font-semibold">Telefon na rodiče</th>
                <th className="px-5 py-3 font-semibold">Věk</th>
                <th className="px-5 py-3 font-semibold">Částka faktury</th>
                <th className="px-5 py-3 font-semibold">Aktivní</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-steel/60">
                    {emptyText}
                  </td>
                </tr>
              ) : (
                list.map((row) => {
                  const href = `/admin/tabor/${row.id}`;
                  const phones = [row.phone_mother, row.phone_father]
                    .filter(Boolean)
                    .join(", ");
                  const total = invoiceTotals.get(row.id);
                  const count = invoiceCounts.get(row.id) ?? 0;
                  return (
                    <tr key={row.id} className="transition-colors hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                        <Link href={href} className="block">
                          {formatDate(row.created_at)}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-medium text-navy">
                        <Link href={href} className="block">
                          {row.child_name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                        <Link href={href} className="block">
                          {phones}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-steel/80">
                        <Link href={href} className="block">
                          {row.child_age} let
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-navy">
                        <Link href={href} className="block">
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
                      <td className="whitespace-nowrap px-5 py-3">
                        <ActiveSwitch
                          active={row.active}
                          action={setActive.bind(null, row.id, !row.active)}
                        />
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
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Tábor</h1>
          <p className="mt-1 text-sm text-steel/80">
            {pluralRegistrations(rows.length)} {hasFilters ? "nalezeno" : "celkem"} ·{" "}
            <span className="font-semibold text-emerald-700">{activeRows.length} aktivních</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/tabor/nova"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Přidat přihlášku
          </Link>
          <ExportButton href="/admin/tabor/export" />
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
            href="/admin/tabor"
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
          >
            Zrušit filtry
          </Link>
        )}
      </form>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-steel/70">
        Aktivní ({activeRows.length})
      </h2>
      {renderTable(activeRows, hasFilters ? "Žádná aktivní přihláška neodpovídá filtru." : "Zatím žádné aktivní přihlášky.")}

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-steel/70">
        Neaktivní / odhlášení ({inactiveRows.length})
      </h2>
      {renderTable(inactiveRows, "Žádné odhlášené děti.")}
    </main>
  );
}
