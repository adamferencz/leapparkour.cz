export function ActiveSwitch({
  active,
  action,
}: {
  active: boolean;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="inline-flex items-center gap-2">
      <button
        type="submit"
        aria-pressed={active}
        title={active ? "Označit jako neaktivní" : "Označit jako aktivní"}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          active ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className={`text-xs font-medium ${active ? "text-emerald-700" : "text-steel/60"}`}>
        {active ? "Aktivní" : "Neaktivní"}
      </span>
    </form>
  );
}
