import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cookies",
  description:
    "Informace o používání cookies a podobných technologií na webu Leap Parkour.",
  path: "/cookies",
  robots: { index: true, follow: true },
});

export default function CookiesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Právní informace
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">
          Cookies
        </h1>
        <div className="mt-8 space-y-7 text-sm leading-relaxed text-steel md:text-base">
          <section>
            <h2 className="text-xl font-bold text-navy">Co jsou cookies</h2>
            <p className="mt-3">
              Cookies jsou malé soubory nebo podobné technologie, které web
              ukládá do prohlížeče. Některé jsou potřebné pro běžné fungování
              webu, jiné mohou sloužit pro měření návštěvnosti nebo marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">Jaké cookies používáme</h2>
            <p className="mt-3">
              Web může používat technické cookies nezbytné pro provoz stránek,
              bezpečnost, přihlášení do administrace a odesílání formulářů.
              Tyto cookies nevyžadují souhlas.
            </p>
            <p className="mt-3">
              Pokud bychom na web doplnili analytiku, reklamní nástroje nebo
              podobné netechnické cookies, spustíme je až po vašem souhlasu přes
              cookie lištu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">Jak cookies nastavit</h2>
            <p className="mt-3">
              Cookies můžete omezit nebo smazat v nastavení svého prohlížeče.
              Omezení technických cookies může způsobit, že některé části webu
              nebudou fungovat správně.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">Kontakt</h2>
            <p className="mt-3">
              Dotazy k ochraně soukromí nám můžete poslat na{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-brand hover:text-brand-dark">
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 rounded-2xl bg-slate-100 p-5 text-sm text-steel">
          Více najdete na stránce{" "}
          <Link href="/ochrana-osobnich-udaju" className="font-semibold text-brand hover:text-brand-dark">
            ochrana osobních údajů
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
