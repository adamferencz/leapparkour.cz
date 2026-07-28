import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CLUB_BILLING, formatCzk, getClubAmountCzk } from "@/lib/billing/config";
import type { ClubRegistration, Invoice } from "@/lib/types";
import { Card } from "@/components/admin/Card";
import StatusBadge from "@/components/admin/StatusBadge";
import DetailTable, { type DetailItem } from "@/components/admin/DetailTable";
import StatusForm from "@/components/admin/StatusForm";
import NotesForm from "@/components/admin/NotesForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDateTime, termLabels, whatsappLabel } from "../../_lib/format";
import {
  updateStatus,
  updateNotes,
  deleteRegistration,
  issueInvoice,
  sendIssuedInvoice,
  updateInvoice,
} from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Detail přihlášky — kroužek",
};

function inputClass() {
  return "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default async function KrouzekDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("club_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const reg = data as ClubRegistration;
  const { data: invoiceData } = await supabase
    .from("invoices")
    .select("*")
    .eq("club_registration_id", id)
    .maybeSingle();
  const invoice = invoiceData as Invoice | null;
  const defaultBuyerAddress = [
    reg.billing_street,
    [reg.billing_zip, reg.billing_city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 14);
  const defaultAmount = reg.total_amount_czk ?? getClubAmountCzk(reg.terms ?? []);
  const invoiceDefaults = {
    buyerName: invoice?.buyer_name ?? reg.billing_name ?? reg.parent_name ?? reg.email,
    buyerAddress: invoice?.buyer_address ?? defaultBuyerAddress,
    buyerEmail: invoice?.buyer_email ?? reg.email,
    itemName:
      invoice?.item_name ??
      `${CLUB_BILLING.itemName} - ${reg.child_name}`,
    baseAmountCzk: invoice?.base_amount_czk ?? defaultAmount,
    variableSymbol: invoice?.variable_symbol ?? "",
    dueDate: invoice?.due_date ?? defaultDueDate.toISOString().slice(0, 10),
  };

  const items: DetailItem[] = [
    { label: "Přihlášeno", value: formatDateTime(reg.created_at) },
    { label: "Sezóna", value: reg.season },
    { label: "Jméno dítěte", value: reg.child_name },
    { label: "Jméno rodiče", value: reg.parent_name },
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
    {
      label: "Telefon na rodiče",
      value: (
        <a
          href={`tel:${reg.phone}`}
          className="text-brand hover:text-brand-dark"
        >
          {reg.phone}
        </a>
      ),
    },
    { label: "Termíny", value: termLabels(reg.terms) },
    { label: "Cena", value: formatCzk(defaultAmount) },
    { label: "Fakturační jméno", value: reg.billing_name },
    {
      label: "Fakturační adresa",
      value: defaultBuyerAddress,
    },
    { label: "WhatsApp skupina", value: whatsappLabel(reg) },
    {
      label: "Zdravotní omezení",
      value: reg.health_notes,
      highlight: !!reg.health_notes,
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-5 py-8">
      <Link
        href="/admin/krouzek"
        className="text-sm font-medium text-brand hover:text-brand-dark"
      >
        ← Zpět na seznam
      </Link>

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
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-navy">Faktura a platba</h2>
            <p className="mt-1 text-sm text-steel/80">
              Částka k úhradě:{" "}
              <strong className="text-navy">{formatCzk(defaultAmount)}</strong>
            </p>
            {invoice ? (
              <div className="mt-3 space-y-1 text-sm text-steel/80">
                <p>
                  Faktura:{" "}
                  <strong className="text-navy">{invoice.invoice_number}</strong>
                </p>
                <p>
                  Variabilní symbol:{" "}
                  <strong className="text-navy">{invoice.variable_symbol}</strong>
                </p>
                <p>
                  Stav:{" "}
                  <strong className="text-navy">
                    {invoice.status === "sent" ? "odeslaná" : "vystavená"}
                  </strong>
                  {invoice.sent_at ? ` (${formatDateTime(invoice.sent_at)})` : ""}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-steel/80">
                Faktura zatím není vystavená. Po kliknutí se vygeneruje PDF,
                uloží k přihlášce a budete ji moct zkontrolovat před odesláním.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {invoice && (
              <Link
                href={`/admin/krouzek/${reg.id}/faktura`}
                target="_blank"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
              >
                Zobrazit fakturu
              </Link>
            )}
          </div>
        </div>

        <form
          action={
            invoice
              ? updateInvoice.bind(null, reg.id, invoice.id)
              : issueInvoice.bind(null, reg.id)
          }
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
          {invoice && (
            <label>
              <span className="mb-1.5 block text-sm font-medium text-navy">
                Variabilní symbol
              </span>
              <input
                name="variable_symbol"
                defaultValue={invoiceDefaults.variableSymbol}
                className={inputClass()}
              />
            </label>
          )}
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
              Cena Kč
            </span>
            <input
              name="base_amount_czk"
              type="number"
              min={0}
              defaultValue={invoiceDefaults.baseAmountCzk}
              className={inputClass()}
            />
          </label>
          <div className="flex items-end justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 md:col-span-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-steel/70">
                Výsledek
              </p>
              <p className="mt-1 text-lg font-bold text-navy">
                {formatCzk(invoiceDefaults.baseAmountCzk)}
              </p>
            </div>
            <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
              {invoice ? "Uložit a regenerovat PDF" : "Vystavit náhled faktury"}
            </button>
          </div>
        </form>

        {invoice && (
          <form action={sendIssuedInvoice.bind(null, reg.id)} className="mt-3">
            <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
              Vystavit a odeslat rodiči
            </button>
          </form>
        )}
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
