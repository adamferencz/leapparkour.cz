import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CampRegistration } from "@/lib/types";
import { Card } from "@/components/admin/Card";
import StatusBadge from "@/components/admin/StatusBadge";
import Chips from "@/components/admin/Chips";
import DetailTable, { type DetailItem } from "@/components/admin/DetailTable";
import StatusForm from "@/components/admin/StatusForm";
import NotesForm from "@/components/admin/NotesForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDateTime, formatDate } from "../../_lib/format";
import { updateStatus, updateNotes, deleteRegistration } from "../actions";

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

export default async function TaborDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const reg = data as CampRegistration;

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
    {
      label: "Zdravotní omezení",
      value: reg.health_notes,
      highlight: !!reg.health_notes,
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
