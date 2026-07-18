import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Napište nám na leapparkour@seznam.cz nebo nás sledujte na sociálních sítích. Najdete nás v Havlíčkově Brodě.",
  path: "/kontakt",
  image: "/images/2024_08_krouzek.jpg",
  imageAlt: "Kontakt na Leap Parkour v Havlíčkově Brodě",
});

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@leapparkour",
    href: SITE.instagram,
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Leap Parkour",
    href: SITE.facebook,
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-7h2.5l.5-3h-3V9.05c0-.87.24-1.55 1.65-1.55H16.6V4.86c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24V11H7.5v3H10v7h3.5z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    handle: "@LeapParkour",
    href: SITE.youtube,
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function KontaktPage() {
  return (
    <>
      {/* Zeptejte se */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <h1 className="text-center text-4xl font-extrabold md:text-5xl">
              Zeptejte se
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-xl text-center text-steel">
              Napište nám na náš e-mail — rádi vám odpovíme na cokoliv ohledně
              kroužku i tábora.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 text-center">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-block break-all text-2xl font-extrabold text-brand transition-colors hover:text-brand-dark md:text-4xl"
            >
              {SITE.email}
            </a>
          </Reveal>

          <Reveal delay={0.18}>
          <dl className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-center sm:max-w-none sm:flex-row sm:justify-center sm:gap-10">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-steel/70">
                Adresa
              </dt>
              <dd className="mt-1 font-medium text-navy">{SITE.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-steel/70">
                IČO
              </dt>
              <dd className="mt-1 font-medium text-navy">{SITE.ico}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-steel/70">
                Spolek
              </dt>
              <dd className="mt-1 font-medium text-navy">{SITE.legalName}</dd>
            </div>
          </dl>
          </Reveal>

          {/* Sociální sítě */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {SOCIALS.map((social, i) => (
              <Reveal key={social.label} delay={i * 0.06}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-2xl bg-slate-100 p-5 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm">
                  {social.icon}
                </span>
                <span>
                  <span className="block font-bold text-navy group-hover:text-white">
                    {social.label}
                  </span>
                  <span className="block text-sm text-steel group-hover:text-white/80">
                    {social.handle}
                  </span>
                </span>
              </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="pb-16 md:pb-24">
        <div className="container-site">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Kde nás najdete</h2>
            <p className="mt-3 max-w-2xl text-steel">
              Trénujeme v Havlíčkově Brodě — v tělocvičně ZŠ Wolkerova a v létě na
              parkourovém hřišti Plovárenská.
            </p>
          </Reveal>
          <Reveal
            from="none"
            className="mt-8 overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
          >
            <iframe
              src="https://maps.google.com/maps?q=Havl%C3%AD%C4%8Dk%C5%AFv%20Brod&t=m&z=13&output=embed&iwloc=near"
              title="Havlíčkův Brod"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full border-0 md:h-110"
            />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container-site">
          <Reveal className="rounded-3xl bg-navy px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Chcete se přidat?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Přijďte si parkour vyzkoušet na pravidelný kroužek, nebo vyrazte
              v létě na týden plný pohybu a zážitků na Leap Camp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/krouzek"
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
              >
                Parkourový kroužek
              </Link>
              <Link
                href="/tabor"
                className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-navy active:scale-[0.98]"
              >
                Letní tábor Leap Camp
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
