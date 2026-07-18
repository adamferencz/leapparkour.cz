"use client";

import { useActionState } from "react";
import {
  submitCampRegistration,
  type CampFormState,
} from "@/app/tabor/prihlaska/actions";
import {
  OptionRow,
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
        <div className="space-y-2">
          {CAMP_SPORTS.map((sport) => (
            <OptionRow
              key={sport}
              type="checkbox"
              name="sports"
              value={sport}
              label={sport}
            />
          ))}
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
