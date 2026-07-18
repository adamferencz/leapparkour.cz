"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/config";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Leap Parkour</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Pořádáme parkourové kroužky a tábory. Parkour komunita na Vysočině
            — Havlíčkův Brod.
          </p>
        </div>

        <div>
          <p className="font-semibold">Rychlé odkazy</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link href="/krouzek" className="hover:text-white">Kroužek</Link></li>
            <li><Link href="/tabor" className="hover:text-white">LeapCamp</Link></li>
            <li><Link href="/prihlaska" className="hover:text-white">Přihláška</Link></li>
            <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
            <li><Link href="/admin" className="hover:text-white">Administrace</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Sledujte nás</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                YouTube
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site py-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Leap Parkour · leapparkour.cz
        </div>
      </div>
    </footer>
  );
}
