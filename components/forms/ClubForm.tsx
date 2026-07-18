"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  submitClubRegistration,
  type ClubFormState,
} from "@/app/krouzek/prihlaska/actions";
import {
  OptionRow,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { CLUB_SEASON, WHATSAPP_CHOICES } from "@/lib/config";

const initialState: ClubFormState = null;

export function ClubForm() {
  const [state, formAction, pending] = useActionState(
    submitClubRegistration,
    initialState
  );
  const [whatsappChoice, setWhatsappChoice] = useState("");
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  function handleWhatsappChange(e: ChangeEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    if (target.name === "whatsapp_choice") {
      setWhatsappChoice(target.value);
    }
  }

  function handleTermsChange(e: ChangeEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    if (target.name !== "terms") return;
    setSelectedTerms((prev) =>
      target.checked
        ? [...prev, target.value]
        : prev.filter((v) => v !== target.value)
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <TextField
        label="Jméno a příjmení dítěte"
        name="child_name"
        type="text"
        required
        autoComplete="name"
        placeholder="Např. Jan Novák"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="vas@email.cz"
      />

      <TextField
        label="Telefon"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        placeholder="+420 123 456 789"
      />

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-navy">
          WhatsApp skupina <span className="text-brand">*</span>
        </legend>
        <p className="mb-2 text-xs text-steel/80">
          V této skupině se dozvíte o změnách kroužku (zrušení v případě
          deštivého počasí apod.) a o dalších akcích. Do skupiny přidáme číslo
          zákonného zástupce, příp. napište, že chcete přidat jiné.
        </p>
        <div className="space-y-2" onChange={handleWhatsappChange}>
          {WHATSAPP_CHOICES.map((choice) => (
            <OptionRow
              key={choice.value}
              type="radio"
              name="whatsapp_choice"
              value={choice.value}
              label={choice.label}
              required
            />
          ))}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors has-checked:border-brand has-checked:bg-brand/5">
            <input
              type="radio"
              name="whatsapp_choice"
              value="other"
              required
              className="h-4 w-4 shrink-0 accent-brand"
            />
            <span className="text-sm font-medium text-navy">Jiné:</span>
            <input
              type="text"
              name="whatsapp_other"
              aria-label="Jiné — upřesnění"
              required={whatsappChoice === "other"}
              placeholder="Napište nám podrobnosti"
              className="w-full min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-navy placeholder:text-slate-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-navy">
          Výběr kroužku <span className="text-brand">*</span>
        </legend>
        <p className="mb-2 text-xs text-steel/80">
          Pokud budete chodit 2x týdně (což doporučujeme), zaškrtněte oba
          termíny.
        </p>
        <div className="space-y-2" onChange={handleTermsChange}>
          {CLUB_SEASON.terms.map((term) => (
            <OptionRow
              key={term.id}
              type="checkbox"
              name="terms"
              value={term.id}
              label={term.label}
              sublabel={`${term.level}, ${term.age}`}
              required={selectedTerms.length === 0}
            />
          ))}
        </div>
      </fieldset>

      <TextAreaField
        label="Zdravotní omezení"
        name="health_notes"
        hint="V případě, že má vaše dítě jakékoliv zdravotní omezení, napište nám to prosím zde."
      />

      {state?.error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {state.error}
        </p>
      )}

      <p className="text-xs text-steel/80">
        Odesláním formuláře berete na vědomí, že uvedené údaje zpracujeme
        pouze pro účely přihlášky na kroužek.
      </p>

      <SubmitButton label="Odeslat přihlášku" pending={pending} />
    </form>
  );
}
