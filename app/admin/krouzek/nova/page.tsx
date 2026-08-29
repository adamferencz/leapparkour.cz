import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/admin/Card";
import { CLUB_SEASON } from "@/lib/config";
import { createManualRegistration } from "../actions";

export const metadata: Metadata = {
  title: "Přidat přihlášku — kroužek",
};

function inputClass() {
  return "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default function NovaKrouzekPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Link
        href="/admin/krouzek"
        className="text-sm font-medium text-brand hover:text-brand-dark"
      >
        ← Zpět na seznam
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-navy">Přidat přihlášku na kroužek</h1>
      <p className="mt-1 text-sm text-steel/80">
        Ruční přihláška — použijte, pokud dítě přihlašujete sami (např. po telefonu).
        Fakturu pak vystavíte na detailu přihlášky.
      </p>

      <Card className="mt-6 p-5">
        <form action={createManualRegistration} className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Jméno a příjmení dítěte *
            </span>
            <input name="child_name" required className={inputClass()} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Jméno a příjmení rodiče
            </span>
            <input name="parent_name" className={inputClass()} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">E-mail *</span>
            <input name="email" type="email" required className={inputClass()} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Telefon na rodiče
            </span>
            <input name="phone" type="tel" className={inputClass()} />
          </label>

          <label className="md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Odběratel na faktuře
            </span>
            <input name="billing_name" className={inputClass()} />
          </label>
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Ulice a číslo popisné
            </span>
            <input name="billing_street" className={inputClass()} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">PSČ</span>
            <input name="billing_zip" className={inputClass()} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-navy">Město</span>
            <input name="billing_city" className={inputClass()} />
          </label>

          <fieldset className="md:col-span-2">
            <legend className="mb-1.5 text-sm font-medium text-navy">Výběr kroužku</legend>
            <div className="space-y-2">
              {CLUB_SEASON.terms.map((term) => (
                <label
                  key={term.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <input
                    type="checkbox"
                    name="terms"
                    value={term.id}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                  />
                  <span className="text-sm">
                    <span className="font-medium text-navy">{term.label}</span>
                    <span className="mt-0.5 block text-xs text-steel/80">
                      {term.level}, {term.age}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-navy">
              Zdravotní omezení
            </span>
            <textarea name="health_notes" rows={3} className={inputClass()} />
          </label>

          <div className="md:col-span-2">
            <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
              Přidat přihlášku
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
}
