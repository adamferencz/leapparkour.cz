import Link from "next/link";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function ActiveStatCard({
  label,
  count,
  href,
  caption = "aktuálně aktivní",
}: {
  label: string;
  count: number;
  href: string;
  caption?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-sm font-medium text-emerald-800/80">{label}</p>
      <p className="mt-2 text-4xl font-bold text-emerald-700">{count}</p>
      <p className="mt-1 text-sm text-emerald-700/70">{caption}</p>
    </Link>
  );
}

export function StatCard({
  label,
  total,
  fresh,
  href,
}: {
  label: string;
  total: number;
  fresh: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-sm font-medium text-steel/80">{label}</p>
      <p className="mt-2 text-4xl font-bold text-navy">{total}</p>
      <p className="mt-1 text-sm">
        {fresh > 0 ? (
          <span className="font-medium text-brand">{fresh} nových</span>
        ) : (
          <span className="text-steel/60">žádné nové</span>
        )}
      </p>
    </Link>
  );
}
