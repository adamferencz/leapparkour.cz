"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Úvod" },
  { href: "/krouzek", label: "Kroužek" },
  { href: "/tabor", label: "LeapCamp" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-lg">
      <div className="container-site flex h-[72px] items-center justify-between">
        {/* Logo (vlevo) */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.svg"
              alt="Leap Parkour"
              width={140}
              height={44}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Navigace (uprostřed) */}
        <nav className="hidden items-center gap-8 md:flex md:justify-center">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-brand ${
                pathname === item.href ? "text-brand" : "text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA a Mobilní menu (vpravo) */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="/prihlaska"
            className="hidden rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark md:inline-flex"
          >
            Přihlásit dítě
          </Link>

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
