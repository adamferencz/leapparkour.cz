import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatCzk } from "@/lib/billing/config";
import type { CampRegistration, Invoice } from "@/lib/types";
import { Card } from "@/components/admin/Card";
import StatusBadge from "@/components/admin/StatusBadge";
import Chips from "@/components/admin/Chips";
import DetailTable, { type DetailItem } from "@/components/admin/DetailTable";
import StatusForm from "@/components/admin/StatusForm";
import NotesForm from "@/components/admin/NotesForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDateTime, formatDate } from "../../_lib/format";
import {
  updateStatus,
  updateNotes,
  deleteRegistration,
  issueInvoice,
  sendIssuedInvoice,
  updateInvoice,
  splitInvoice,
} from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Detail přihlášky — tábor",
};

function phoneLink(phone: string | null | undefined) {
  if (!phone) return null;
  return (
    <a href={`tel:${phone}`} className="text-brand hover:text-brand-dark">
      {phone}
    </a>
  );
}

function inputClass() {
  return "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default async function TaborDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sent?: string }>;
}) {
  const { id } = await params;
  const { sent } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const reg = data as CampRegistration;
  const { data: invoicesData } = await supabase
    .from("invoices")
    .select("*")
    .eq("camp_registration_id", id)
    .order("created_at", { ascending: true });
  const invoices = (invoicesData ?? []) as Invoice[];
  const invoice = invoices[0] ?? null;
  const canSplit = invoices.length === 1 && !invoice?.installment_of;

  function invoiceLabel(inv: Invoice) {
    if (inv.installment_of) return "Faktura — 2. splátka";
    if (invoices.some((other) => other.installment_of === inv.id)) return "Faktura — 1. splátka";
    return "Faktura";
  }
  const defaultBuyerName = [reg.billing_name, reg.mother_name, reg.father_name]
    .filter(Boolean)
    .join(" / ");
  const defaultBuyerAddress = [
    reg.billing_street,
    [reg.billing_zip, reg.billing_city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 14);
  const invoiceDefaults = {
    buyerName: invoice?.buyer_name ?? defaultBuyerName,
    buyerAddress: invoice?.buyer_address ?? defaultBuyerAddress,
    buyerEmail: invoice?.buyer_email ?? reg.email,
    itemName:
      invoice?.item_name ??
      "Členský příspěvek na LEAP camp 2027 v termínu 3.7.-10.7.2027",
    baseAmountCzk: invoice?.base_amount_czk ?? reg.base_amount_czk ?? 8400,
    discountCode: invoice?.discount_code ?? reg.discount_code ?? "",
    discountAmountCzk:
      invoice?.discount_amount_czk ?? reg.discount_amount_czk ?? 0,
    variableSymbol: invoice?.variable_symbol ?? "",
    dueDate:
      invoice?.due_date ?? defaultDueDate.toISOString().slice(0, 10),
  };

  const items: DetailItem[] = [
    { label: "Přihlášeno", value: formatDateTime(reg.created_at) },
    { label: "Ročník tábora", value: reg.camp },
    { label: "Jméno dítěte", value: reg.child_name },
    { label: "Věk dítěte", value: `${reg.child_age} let` },
    {
      label: "Datum narození",
      value: reg.child_birthdate ? formatDate(reg.child_birthdate) : null,
    },
    { label: "Jméno matky", value: reg.mother_name },
    { label: "Jméno otce", value: reg.father_name },
    { label: "Fakturační jméno", value: reg.billing_name },
    {
      label: "Fakturační adresa",
      value: [reg.billing_street, [reg.billing_zip, reg.billing_city].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", "),
    },
    {
      label: "E-mail",
      value: (
        <a
          href={`mailto:${reg.email}`}
          className="text-brand hover:text-brand-dark"
        >
          {reg.email}
        </a>
      ),
    },
    { label: "Telefon matka", value: phoneLink(reg.phone_mother) },
    { label: "Telefon otec", value: phoneLink(reg.phone_father) },
    { label: "Vybrané sporty", value: <Chips items={reg.sports ?? []} /> },
    { label: "Jiné sporty", value: reg.sports_other },
    { label: "Spolubydlící", value: reg.roommates },
    { label: "Cena tábora", value: formatCzk(reg.base_amount_czk ?? 8400) },
    {
      label: "Slevový kód",
      value:
        reg.discount_amount_czk > 0
          ? `${reg.discount_code} (-${formatCzk(reg.discount_amount_czk)})`
          : null,
    },
    { label: "K úhradě", value: formatCzk(reg.total_amount_czk ?? 8400) },
    {
      label: "Zdravotní omezení",
      value: reg.health_notes,
      highlight: !!reg.health_notes,
    },
    {
      label: "Souhlas s podmínkami a GDPR",
      value: reg.legal_terms_accepted_at
        ? formatDateTime(reg.legal_terms_accepted_at)
        : "Neuloženo",
    },
    {
      label: "Souhlas s fotkami a videem",
      value: reg.photo_consent ? "Ano" : "Ne",
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-5 py-8">
      <Link
        href="/admin/tabor"
        className="text-sm font-medium text-brand hover:text-brand-dark"
      >
        ← Zpět na seznam
      </Link>

      {sent === "ok" && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Faktura byla úspěšně odeslána rodiči na e-mail.
        </p>
      )}
      {sent === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          Odeslání faktury se nepodařilo. Zkuste to prosím znovu, nebo zkontrolujte
          nastavení e-mailu.
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy">{reg.child_name}</h1>
        <StatusBadge status={reg.status} />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-3">
          <h2 className="text-base font-semibold text-navy">
            Údaje z přihlášky
          </h2>
        </div>
        <DetailTable items={items} />
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-base font-semibold text-navy">Faktura a platba</h2>
        <p className="mt-1 text-sm text-steel/80">
          Cena tábora:{" "}
          <strong className="text-navy">{formatCzk(reg.total_amount_czk ?? 8400)}</strong>
        </p>

        {invoices.length === 0 && (
          <>
            <p className="mt-3 text-sm text-steel/80">
              Faktura zatím není vystavená. Po kliknutí se vygeneruje PDF,
              uloží k přihlášce a budete ji moct zkontrolovat před odesláním.
            </p>
            <form
              action={issueInvoice.bind(null, reg.id)}
              className="mt-5 grid gap-4 md:grid-cols-2"
            >
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Odběratel
                </span>
                <input
                  name="buyer_name"
                  defaultValue={invoiceDefaults.buyerName}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  E-mail pro fakturu
                </span>
                <input
                  name="buyer_email"
                  type="email"
                  defaultValue={invoiceDefaults.buyerEmail}
                  className={inputClass()}
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Fakturační adresa odběratele
                </span>
                <input
                  name="buyer_address"
                  defaultValue={invoiceDefaults.buyerAddress}
                  placeholder="Ulice a číslo, PSČ město"
                  className={inputClass()}
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Název položky na faktuře
                </span>
                <input
                  name="item_name"
                  defaultValue={invoiceDefaults.itemName}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Datum splatnosti
                </span>
                <input
                  name="due_date"
                  type="date"
                  defaultValue={invoiceDefaults.dueDate}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Základní cena Kč
                </span>
                <input
                  name="base_amount_czk"
                  type="number"
                  min={0}
                  defaultValue={invoiceDefaults.baseAmountCzk}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Slevový kód na faktuře
                </span>
                <input
                  name="discount_code"
                  defaultValue={invoiceDefaults.discountCode}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Sleva Kč
                </span>
                <input
                  name="discount_amount_czk"
                  type="number"
                  min={0}
                  defaultValue={invoiceDefaults.discountAmountCzk}
                  className={inputClass()}
                />
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-navy md:col-span-2">
                <input
                  type="checkbox"
                  name="stamp_signature"
                  className="h-4 w-4 accent-brand"
                />
                Přidat razítko a podpis
              </label>
              <div className="flex items-end justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 md:col-span-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-steel/70">
                    Výsledek
                  </p>
                  <p className="mt-1 text-lg font-bold text-navy">
                    {formatCzk(
                      Math.max(
                        0,
                        invoiceDefaults.baseAmountCzk - invoiceDefaults.discountAmountCzk,
                      ),
                    )}
                  </p>
                </div>
                <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                  Vystavit náhled faktury
                </button>
              </div>
            </form>
          </>
        )}

        {invoices.map((inv, index) => (
          <div
            key={inv.id}
            className={index === 0 ? "mt-5" : "mt-6 border-t border-slate-100 pt-6"}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-navy">{invoiceLabel(inv)}</h3>
                <div className="mt-2 space-y-1 text-sm text-steel/80">
                  <p>
                    Číslo: <strong className="text-navy">{inv.invoice_number}</strong>
                  </p>
                  <p>
                    Variabilní symbol:{" "}
                    <strong className="text-navy">{inv.variable_symbol}</strong>
                  </p>
                  <p>
                    Částka: <strong className="text-navy">{formatCzk(inv.total_amount_czk)}</strong>
                  </p>
                  <p>
                    Stav:{" "}
                    <strong className="text-navy">
                      {inv.status === "sent" ? "odeslaná" : "vystavená"}
                    </strong>
                    {inv.sent_at ? ` (${formatDateTime(inv.sent_at)})` : ""}
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/tabor/${reg.id}/faktura?invoice=${inv.id}`}
                target="_blank"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
              >
                Zobrazit fakturu
              </Link>
            </div>

            <form
              key={`${inv.id}:${inv.base_amount_czk}:${inv.discount_amount_czk}:${inv.due_date}:${inv.item_name}:${inv.variable_symbol}:${inv.buyer_name}:${inv.buyer_email}:${inv.buyer_address}:${inv.stamp_signature}`}
              action={updateInvoice.bind(null, reg.id, inv.id)}
              className="mt-4 grid gap-4 md:grid-cols-2"
            >
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Odběratel
                </span>
                <input name="buyer_name" defaultValue={inv.buyer_name} className={inputClass()} />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  E-mail pro fakturu
                </span>
                <input
                  name="buyer_email"
                  type="email"
                  defaultValue={inv.buyer_email}
                  className={inputClass()}
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Fakturační adresa odběratele
                </span>
                <input
                  name="buyer_address"
                  defaultValue={inv.buyer_address}
                  placeholder="Ulice a číslo, PSČ město"
                  className={inputClass()}
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Název položky na faktuře
                </span>
                <input name="item_name" defaultValue={inv.item_name} className={inputClass()} />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Variabilní symbol
                </span>
                <input
                  name="variable_symbol"
                  defaultValue={inv.variable_symbol}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Datum splatnosti
                </span>
                <input
                  name="due_date"
                  type="date"
                  defaultValue={inv.due_date}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Základní cena Kč
                </span>
                <input
                  name="base_amount_czk"
                  type="number"
                  min={0}
                  defaultValue={inv.base_amount_czk}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Slevový kód na faktuře
                </span>
                <input
                  name="discount_code"
                  defaultValue={inv.discount_code ?? ""}
                  className={inputClass()}
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Sleva Kč
                </span>
                <input
                  name="discount_amount_czk"
                  type="number"
                  min={0}
                  defaultValue={inv.discount_amount_czk}
                  className={inputClass()}
                />
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-navy md:col-span-2">
                <input
                  type="checkbox"
                  name="stamp_signature"
                  defaultChecked={inv.stamp_signature}
                  className="h-4 w-4 accent-brand"
                />
                Přidat razítko a podpis
              </label>
              <div className="flex items-end justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 md:col-span-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-steel/70">
                    Výsledek
                  </p>
                  <p className="mt-1 text-lg font-bold text-navy">
                    {formatCzk(inv.total_amount_czk)}
                  </p>
                </div>
                <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                  Uložit a regenerovat PDF
                </button>
              </div>
            </form>

            <form
              action={sendIssuedInvoice.bind(null, reg.id, inv.id)}
              className="mt-3 inline-block"
            >
              <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                Vystavit a odeslat rodiči
              </button>
            </form>

            {canSplit && index === 0 && (
              <details className="mt-4 rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-navy">
                  Rozdělit fakturu na 2 splátky
                </summary>
                <p className="mt-2 text-xs text-steel/80">
                  Tato faktura se sníží na zadanou částku. Na zbytek se rovnou vystaví
                  druhá faktura se splatností za zvolený počet měsíců.
                </p>
                <form
                  action={splitInvoice.bind(null, reg.id, inv.id)}
                  className="mt-3 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
                >
                  <label>
                    <span className="mb-1.5 block text-sm font-medium text-navy">
                      Částka první splátky (Kč)
                    </span>
                    <input
                      name="first_amount_czk"
                      type="number"
                      min={1}
                      max={inv.total_amount_czk - 1}
                      required
                      className={inputClass()}
                    />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-sm font-medium text-navy">
                      Zbytek zaplatit za (měsíců)
                    </span>
                    <input
                      name="months_until_second"
                      type="number"
                      min={1}
                      max={12}
                      defaultValue={3}
                      className={inputClass()}
                    />
                  </label>
                  <button className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90">
                    Rozdělit fakturu
                  </button>
                </form>
              </details>
            )}
          </div>
        ))}
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 text-base font-semibold text-navy">
            Změna statusu
          </h2>
          <StatusForm
            action={updateStatus.bind(null, reg.id)}
            current={reg.status}
          />
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-base font-semibold text-navy">Poznámka</h2>
          <NotesForm
            action={updateNotes.bind(null, reg.id)}
            current={reg.admin_notes}
          />
        </Card>
      </div>

      <Card className="mt-6 border-red-100 p-5">
        <h2 className="text-base font-semibold text-navy">Nebezpečná zóna</h2>
        <p className="mt-1 mb-4 text-sm text-steel/80">
          Smazání přihlášky je trvalé a nelze jej vrátit zpět.
        </p>
        <DeleteButton action={deleteRegistration.bind(null, reg.id)} />
      </Card>
    </main>
  );
}
