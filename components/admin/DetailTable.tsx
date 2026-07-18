export interface DetailItem {
  label: string;
  value: React.ReactNode;
  /** Zvýraznit řádek (např. zdravotní omezení) */
  highlight?: boolean;
}

export default function DetailTable({ items }: { items: DetailItem[] }) {
  return (
    <dl className="divide-y divide-slate-100">
      {items.map((item, i) => (
        <div
          key={i}
          className={`grid gap-1 px-5 py-3 sm:grid-cols-3 sm:gap-4 ${
            item.highlight ? "bg-amber-50" : ""
          }`}
        >
          <dt
            className={`text-sm font-medium ${
              item.highlight ? "text-amber-800" : "text-steel/70"
            }`}
          >
            {item.label}
          </dt>
          <dd
            className={`text-sm sm:col-span-2 ${
              item.highlight
                ? "font-medium text-amber-900"
                : "text-navy"
            }`}
          >
            {item.value || <span className="text-steel/40">—</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
