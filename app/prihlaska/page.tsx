import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CAMP, CLUB_SEASON } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Přihláška",
  description:
    "Přihlaste své dítě na parkourový kroužek nebo letní tábor Leap Camp.",
  path: "/prihlaska",
  image: "/images/2024_08_krouzek.jpg",
  imageAlt: "Přihláška na parkourový kroužek nebo LeapCamp",
});

export default function PrihlaskaPage() {
  return (
    <div className="container-site py-16">
      <Reveal>
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          Kam chcete své dítě přihlásit?
        </h1>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mx-auto mt-4 max-w-xl text-center text-steel">
          Vyberte si, jestli chcete přihlásit dítě na pravidelný parkourový
          kroužek, nebo na letní tábor {CAMP.label}.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Reveal>
          <Link
            href="/krouzek/prihlaska"
            className="group block h-full overflow-hidden rounded-3xl border border-slate-100 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/images/2024_08_krouzek.jpg"
                alt="Parkourový kroužek"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <h2 className="text-xl font-bold">Kroužek — {CLUB_SEASON.label}</h2>
              <p className="mt-2 text-sm text-steel">
                Pravidelné tréninky parkouru v Havlíčkově Brodě pod vedením
                zkušených trenérů. Čtvrtky a pátky.
              </p>
              <span className="mt-4 inline-block font-semibold text-brand group-hover:underline">
                Přihlásit na kroužek →
              </span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/tabor/prihlaska"
            className="group block h-full overflow-hidden rounded-3xl border border-slate-100 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/images/2024_08_TABOROVA2022.jpg"
                alt="Leap Camp — letní tábor"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <h2 className="text-xl font-bold">{CAMP.label}</h2>
              <p className="mt-2 text-sm text-steel">
                Týden plný parkouru, sportů a zážitků. Termín {CAMP.dates}.
              </p>
              <span className="mt-4 inline-block font-semibold text-brand group-hover:underline">
                Přihlásit na tábor →
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
