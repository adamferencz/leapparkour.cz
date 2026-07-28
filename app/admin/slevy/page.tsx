import type { Metadata } from "next";
import { Card } from "@/components/admin/Card";
import { formatCzk, type DiscountCode } from "@/lib/billing/config";
import { createClient } from "@/lib/supabase/server";
import {
  createDiscountCode,
  deleteDiscountCode,
  toggleDiscountCode,
  updateDiscountCode,
} from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slevové kódy",
};

function formatDiscount(code: DiscountCode) {
  return code.type === "percent" ? `${code.value} %` : formatCzk(code.value);
}

function formatDate(value: string | null) {
  if (!value) return "bez omezení";
  return new Intl.DateTimeFormat("cs-CZ").format(new Date(value));
}

export default async function DiscountsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("discount_codes")
    .select("*")
    .order("created_at", { ascending: false });
  const codes = (data ?? []) as DiscountCode[];

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Slevové kódy</h1>
        <p className="mt-1 text-sm text-steel/80">
          Kód zadaný v přihlášce na tábor se započítá do finální částky a později
          i do faktury.
        </p>
      </div>

      <Card className="mt-6 p-5">
        <h2 className="text-base font-semibold text-navy">Nový kód</h2>
        <form action={createDiscountCode} className="mt-4 grid gap-4 md:grid-cols-6">
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-navy">Kód</span>
            <input
              name="code"
              required
              placeholder="LEAP10"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-navy">Popisek</span>
            <input
              name="label"
              placeholder="Sourozenecká sleva"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Typ</span>
            <select
              name="type"
              defaultValue="amount"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              <option value="amount">Kč</option>
              <option value="percent">%</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Hodnota</span>
            <input
              name="value"
              required
              type="number"
              min={1}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Od</span>
            <input
              name="valid_from"
              type="date"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Do</span>
            <input
              name="valid_until"
              type="date"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Max použití</span>
            <input
              name="max_uses"
              type="number"
              min={1}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="md:col-span-3">
            <span className="mb-1.5 block text-sm font-medium text-navy">Poznámka</span>
            <input
              name="admin_notes"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <div className="flex items-end md:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Přidat kód
            </button>
          </div>
        </form>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-steel/70">
                <th className="px-5 py-3 font-semibold">Kód</th>
                <th className="px-5 py-3 font-semibold">Sleva</th>
                <th className="px-5 py-3 font-semibold">Platnost</th>
                <th className="px-5 py-3 font-semibold">Použití</th>
                <th className="px-5 py-3 font-semibold">Stav</th>
                <th className="px-5 py-3 font-semibold">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {codes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-steel/60">
                    Zatím žádné slevové kódy.
                  </td>
                </tr>
              ) : (
                codes.map((code) => (
                  <tr key={code.id} className="align-top">
                    <td className="px-5 py-4">
                      <form action={updateDiscountCode.bind(null, code.id)} className="grid gap-2">
                        <input
                          name="code"
                          defaultValue={code.code}
                          className="w-36 rounded-lg border border-slate-200 px-3 py-2 font-semibold text-navy"
                        />
                        <input
                          name="label"
                          defaultValue={code.label ?? ""}
                          placeholder="Popisek"
                          className="w-56 rounded-lg border border-slate-200 px-3 py-2 text-steel"
                        />
                        <input
                          name="admin_notes"
                          defaultValue={code.admin_notes ?? ""}
                          placeholder="Poznámka"
                          className="w-56 rounded-lg border border-slate-200 px-3 py-2 text-steel"
                        />
                        <input type="hidden" name="type" value={code.type} />
                        <input type="hidden" name="value" value={code.value} />
                        <input type="hidden" name="valid_from" value={code.valid_from ?? ""} />
                        <input type="hidden" name="valid_until" value={code.valid_until ?? ""} />
                        <input type="hidden" name="max_uses" value={code.max_uses ?? ""} />
                        <button
                          type="submit"
                          className="w-fit rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
                        >
                          Uložit změny
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-4">
                      <form action={updateDiscountCode.bind(null, code.id)} className="flex gap-2">
                        <select
                          name="type"
                          defaultValue={code.type}
                          className="rounded-lg border border-slate-200 px-3 py-2"
                        >
                          <option value="amount">Kč</option>
                          <option value="percent">%</option>
                        </select>
                        <input
                          type="number"
                          min={1}
                          name="value"
                          defaultValue={code.value}
                          className="w-24 rounded-lg border border-slate-200 px-3 py-2"
                        />
                        <input type="hidden" name="code" value={code.code} />
                        <input type="hidden" name="label" value={code.label ?? ""} />
                        <input type="hidden" name="valid_from" value={code.valid_from ?? ""} />
                        <input type="hidden" name="valid_until" value={code.valid_until ?? ""} />
                        <input type="hidden" name="max_uses" value={code.max_uses ?? ""} />
                        <input type="hidden" name="admin_notes" value={code.admin_notes ?? ""} />
                        <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50">
                          Uložit
                        </button>
                      </form>
                      <p className="mt-2 text-xs text-steel/70">{formatDiscount(code)}</p>
                    </td>
                    <td className="px-5 py-4 text-steel/80">
                      <form action={updateDiscountCode.bind(null, code.id)} className="grid gap-2">
                        <input type="hidden" name="code" value={code.code} />
                        <input type="hidden" name="label" value={code.label ?? ""} />
                        <input type="hidden" name="type" value={code.type} />
                        <input type="hidden" name="value" value={code.value} />
                        <input type="date" name="valid_from" defaultValue={code.valid_from ?? ""} className="rounded-lg border border-slate-200 px-3 py-2" />
                        <input type="date" name="valid_until" defaultValue={code.valid_until ?? ""} className="rounded-lg border border-slate-200 px-3 py-2" />
                        <input type="number" min={1} name="max_uses" defaultValue={code.max_uses ?? ""} placeholder="Max použití" className="rounded-lg border border-slate-200 px-3 py-2" />
                        <input type="hidden" name="admin_notes" value={code.admin_notes ?? ""} />
                        <button className="w-fit rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50">
                          Uložit
                        </button>
                      </form>
                      <p className="mt-2 text-xs">
                        {formatDate(code.valid_from)} - {formatDate(code.valid_until)}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-steel/80">
                      {code.used_count}
                      {code.max_uses ? ` / ${code.max_uses}` : ""}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          code.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-steel"
                        }`}
                      >
                        {code.active ? "Aktivní" : "Vypnutý"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <form action={toggleDiscountCode.bind(null, code.id, code.active)}>
                          <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50">
                            {code.active ? "Vypnout" : "Zapnout"}
                          </button>
                        </form>
                        <form action={deleteDiscountCode.bind(null, code.id)}>
                          <button className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                            Smazat
                          </button>
                        </form>
                      </div>
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
