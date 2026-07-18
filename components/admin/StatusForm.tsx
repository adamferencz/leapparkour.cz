import { STATUS_LABELS, type RegistrationStatus } from "@/lib/types";

export default function StatusForm({
  action,
  current,
}: {
  action: (formData: FormData) => void;
  current: RegistrationStatus;
}) {
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="grow">
        <label
          htmlFor="status"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Status přihlášky
        </label>
        <select
          id="status"
          name="status"
          defaultValue={current}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {(Object.keys(STATUS_LABELS) as RegistrationStatus[]).map((key) => (
            <option key={key} value={key}>
              {STATUS_LABELS[key]}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Uložit
      </button>
    </form>
  );
}
