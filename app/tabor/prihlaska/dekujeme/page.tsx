import type { Metadata } from "next";
import Link from "next/link";
import { CAMP } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Děkujeme za přihlášku na tábor",
  description: `Přihlášku na ${CAMP.label} jsme přijali — další kroky k platbě a dokumentům.`,
  path: "/tabor/prihlaska/dekujeme",
  image: "/images/2024_08_TABOROVA2022.jpg",
  imageAlt: `Děkujeme za přihlášku na ${CAMP.label}`,
  robots: { index: false, follow: false },
});

export default function TaborDekujemePage() {
  // as const dělá z paymentUrl literál "" — rozšíříme na string, ať jde větvit.
  const paymentUrl: string = CAMP.paymentUrl;

  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          Děkujeme za přihlášku!
        </h1>
        <p className="mt-4 text-lg">
          Vaši přihlášku na {CAMP.label} ({CAMP.dates}) jsme v pořádku přijali.
        </p>
        </Reveal>

        <Reveal delay={0.1}>
        {paymentUrl ? (
          <div className="mt-10 rounded-3xl border-2 border-brand bg-brand/5 p-8">
            <h2 className="text-2xl font-bold">Důležité: dokončete platbu</h2>
            <p className="mt-3 text-steel">
              Na tlačítko níže je nutné kliknout! Jinak by tábor nebylo možné
              zaplatit.
            </p>
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-brand px-10 py-4 text-lg font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              Přejít k platbě
            </a>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-bold">Jak zaplatit?</h2>
            <p className="mt-3 text-steel">
              Platební údaje vám pošleme na e-mail uvedený v přihlášce.
            </p>
          </div>
        )}

        <p className="mt-8 text-steel">
          {CAMP.infoNote} Před odjezdem si prosím projděte důležité informace o
          táboře — najdete tam i seznam dokumentů, bez kterých dítě na tábor
          přijmout nemůžeme.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/tabor/informace"
            className="rounded-full bg-navy px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-navy/90 active:scale-[0.98]"
          >
            Důležité informace a dokumenty
          </Link>
          <Link
            href="/"
            className="font-semibold text-brand hover:underline"
          >
            Zpět na úvodní stránku →
          </Link>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
