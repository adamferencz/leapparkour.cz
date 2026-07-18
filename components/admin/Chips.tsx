export default function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="text-steel/40">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
