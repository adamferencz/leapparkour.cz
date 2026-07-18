"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/_lib/auth-actions";

const LINKS = [
  { href: "/admin", label: "Přehled", exact: true },
  { href: "/admin/krouzek", label: "Kroužek", exact: false },
  { href: "/admin/tabor", label: "Tábor", exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();

  // Na přihlašovací stránce se lišta nezobrazuje
  if (pathname === "/admin/login") return null;

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-lg font-bold text-navy"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-extrabold text-white">
              L
            </span>
            Leap Admin
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive(link.href, link.exact)
                    ? "bg-brand/10 text-brand"
                    : "text-steel hover:bg-slate-100 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-steel transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Odhlásit
          </button>
        </form>
      </div>

      {/* Mobilní navigace */}
      <nav className="flex items-center gap-1 border-t border-slate-100 px-5 py-2 sm:hidden">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive(link.href, link.exact)
                ? "bg-brand/10 text-brand"
                : "text-steel hover:bg-slate-100 hover:text-navy"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
