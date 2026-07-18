"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Úvod" },
  { href: "/krouzek", label: "Kroužek" },
  { href: "/tabor", label: "LeapCamp" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/2024_08_logo-black-png.png"
            alt="Leap Parkour"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-brand ${
                pathname === item.href ? "text-brand" : "text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/prihlaska"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Přihlásit dítě
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Otevřít menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 font-medium ${
                    pathname === item.href ? "bg-brand/10 text-brand" : "text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/prihlaska"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand px-5 py-3 text-center font-semibold text-white"
              >
                Přihlásit dítě
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
