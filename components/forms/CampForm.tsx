"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  submitCampRegistration,
  type CampFormState,
} from "@/app/tabor/prihlaska/actions";
import {
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { CAMP, CAMP_SPORTS } from "@/lib/config";

export function CampForm() {
  const [state, formAction, pending] = useActionState<CampFormState | null, FormData>(
    submitCampRegistration,
    null
  );
  const [sportsOpen, setSportsOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  function handleSportsChange(e: ChangeEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    if (target.name !== "sports") return;

    setSelectedSports((current) =>
      target.checked
        ? [...current, target.value]
        : current.filter((sport) => sport !== target.value)
    );
  }

  const sportsSummary =
    selectedSports.length === 0
      ? "Vyberte sporty a aktivity"
      : `${selectedSports.length} vybráno`;

  return (
    <form action={formAction} className="space-y-5">
      <TextField
        label="Jméno a příjmení dítěte, které se zúčastní tábora"
        name="child_name"
        required
        autoComplete="off"
      />
      <TextField label="Jméno a příjmení otce" name="father_name" required />
      <TextField label="Jméno a příjmení matky" name="mother_name" required />
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        hint={CAMP.infoNote}
        autoComplete="email"
      />
      <TextField
        label="Věk dítěte (kolik mu/jí bude na táboře)"
        name="child_age"
        type="number"
        min={5}
        max={18}
        required
      />
      <TextField
        label="Datum narození dítěte"
        name="child_birthdate"
        type="date"
        required
      />
      <TextField label="Telefon na matku" name="phone_mother" type="tel" required />
      <TextField label="Telefon na otce" name="phone_father" type="tel" required />
      <TextAreaField
        label="Zdravotní omezení"
        name="health_notes"
        required
        hint="Pro jistotu více než méně. Informace jsou pro zdravotníka tábora."
      />

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-navy">
          Výběr sportů <span className="text-brand">*</span>
        </legend>
        <p className="mb-3 text-xs text-steel/80">
          NOVINKA: Zde si můžete zvolit, které sporty nebo aktivity byste si rádi
          zkusili na LEAP campu. Podle odpovědí přizpůsobíme program — vybereme
          ty, o které bude největší zájem. Pokud máte nápad, co byste na táboře
          chtěli, využijte kolonku Jiné.
        </p>
        <div className="relative" onChange={handleSportsChange}>
          <button
            type="button"
            aria-expanded={sportsOpen}
            aria-controls="camp-sports-options"
            onClick={() => setSportsOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-navy outline-none transition-colors hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <span>{sportsSummary}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className={`h-5 w-5 shrink-0 text-brand transition-transform ${
                sportsOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M5 7.5 10 12.5 15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {selectedSports.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSports.map((sport) => (
                <span
                  key={sport}
                  className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-navy"
                >
                  {sport}
                </span>
              ))}
            </div>
          )}

          {sportsOpen && (
            <div
              id="camp-sports-options"
              className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
            >
              {CAMP_SPORTS.map((sport) => {
                const checked = selectedSports.includes(sport);

                return (
                  <label
                    key={sport}
                    className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-slate-50 has-checked:bg-brand/5"
                  >
                    <input
                      type="checkbox"
                      name="sports"
                      value={sport}
                      checked={checked}
                      onChange={() => undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                    />
                    <span className="min-w-0 flex-1 font-medium text-navy">
                      {sport}
                    </span>
                    {checked && (
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-base font-bold leading-5 text-brand"
                      >
                        ✓
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-3">
          <TextField
            label="Jiné:"
            name="sports_other"
            placeholder="Vlastní nápad na sport nebo aktivitu"
          />
        </div>
      </fieldset>

      <TextField label="S kým chcete být v chatce/pokoji?" name="roommates" />

      {state?.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      )}

      <div>
        <SubmitButton label="Odeslat přihlášku" pending={pending} />
        <p className="mt-3 text-center text-xs text-steel/80">
          Po odeslání vás přesměrujeme na stránku s dalšími kroky k platbě.
        </p>
      </div>
    </form>
  );
}
