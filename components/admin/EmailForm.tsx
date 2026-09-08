export default function EmailForm({
  action,
  current,
}: {
  action: (formData: FormData) => void;
  current: string;
}) {
  return (
    <form key={current} action={action} className="flex flex-wrap items-end gap-3">
      <label className="flex-1 min-w-[220px]">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Kontaktní e-mail rodiče
        </span>
        <input
          type="email"
          name="email"
          defaultValue={current}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
      >
        Uložit e-mail
      </button>
    </form>
  );
}
