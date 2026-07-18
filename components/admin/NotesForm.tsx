export default function NotesForm({
  action,
  current,
}: {
  action: (formData: FormData) => void;
  current: string | null;
}) {
  return (
    <form action={action} className="space-y-3">
      <div>
        <label
          htmlFor="admin_notes"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Poznámka administrátora
        </label>
        <textarea
          id="admin_notes"
          name="admin_notes"
          rows={4}
          defaultValue={current ?? ""}
          placeholder="Interní poznámka (nevidí ji přihlašující)…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Uložit poznámku
      </button>
    </form>
  );
}
