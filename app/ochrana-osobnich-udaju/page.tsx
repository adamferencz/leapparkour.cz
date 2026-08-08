import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ochrana osobních údajů",
  description:
    "Informace o tom, jak Leap Parkour zpracovává osobní údaje rodičů a dětí u kroužků, táborů a webu.",
  path: "/ochrana-osobnich-udaju",
  robots: { index: true, follow: true },
});

const sections = [
  {
    title: "Správce osobních údajů",
    body: [
      `${SITE.legalName}, IČO ${SITE.ico}, se sídlem ${SITE.address}, Česká republika.`,
      `Kontakt pro dotazy a uplatnění práv: ${SITE.email}.`,
    ],
  },
  {
    title: "Jaké údaje zpracováváme",
    body: [
      "U přihlášek na kroužek a tábor zpracováváme zejména jméno dítěte, jméno zákonného zástupce, e-mail, telefon, vybraný termín nebo tábor, fakturační údaje a informace potřebné pro bezpečný průběh akce.",
      "U tábora zpracováváme také datum narození, věk dítěte, kontakty na rodiče, informace o zdravotních omezeních, požadavky na program a údaje potřebné pro ubytování.",
      "Zdravotní údaje zpracováváme pouze v rozsahu nezbytném pro bezpečnost dítěte a organizaci akce.",
    ],
  },
  {
    title: "Proč údaje potřebujeme",
    body: [
      "Abychom mohli přijmout a spravovat přihlášku, komunikovat s rodiči, vystavit fakturu, zajistit bezpečný průběh kroužku nebo tábora a splnit zákonné povinnosti.",
      "Fotky a videa používáme pro web, sociální sítě a propagační materiály pouze tehdy, pokud k tomu zákonný zástupce udělí samostatný souhlas.",
    ],
  },
  {
    title: "Právní důvody zpracování",
    body: [
      "Plnění smlouvy a jednání před jejím uzavřením: přihláška, organizace služby, komunikace a platby.",
      "Plnění právních povinností: účetnictví, fakturace a povinnosti spojené se zotavovacími a podobnými akcemi pro děti.",
      "Oprávněný zájem: základní ochrana práv, evidence komunikace a bezpečný provoz aktivit.",
      "Souhlas: použití fotografií a videí dítěte pro propagační účely a případné netechnické cookies.",
    ],
  },
  {
    title: "Komu údaje předáváme",
    body: [
      "Údaje mohou být zpřístupněny trenérům, vedoucím, zdravotníkovi, účetnictví a technickým dodavatelům, kteří nám pomáhají provozovat web, databázi, e-maily a fakturaci.",
      "Používáme zejména služby Supabase, Netlify a Resend. Pokud to vyžaduje zákon nebo bezpečnost účastníků, mohou být vybrané údaje předány příslušným orgánům veřejné moci nebo zdravotnickým službám.",
    ],
  },
  {
    title: "Jak dlouho údaje uchováváme",
    body: [
      "Údaje k přihláškám uchováváme po dobu potřebnou pro organizaci služby, komunikaci s rodiči a ochranu právních nároků.",
      "Účetní a daňové doklady uchováváme po zákonem stanovenou dobu.",
      "Dokumentaci související se zdravotní bezpečností tábora uchováváme podle právních povinností pro zotavovací nebo podobné akce.",
      "Souhlas s fotkami a videi platí do odvolání. Po odvolání přestaneme materiály dále nově používat; již vydané tiskové nebo historické materiály nemusí být vždy možné zpětně odstranit.",
    ],
  },
  {
    title: "Vaše práva",
    body: [
      "Můžete požádat o přístup k údajům, opravu, výmaz, omezení zpracování, přenositelnost nebo vznést námitku, pokud to odpovídá konkrétnímu právnímu důvodu zpracování.",
      "Souhlas s fotkami, videi nebo netechnickými cookies můžete kdykoliv odvolat.",
      "Pokud se domníváte, že s údaji nakládáme nesprávně, můžete se obrátit na Úřad pro ochranu osobních údajů.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Právní informace
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">
          Ochrana osobních údajů
        </h1>
        <p className="mt-5 max-w-3xl text-steel">
          Tady najdete přehled, jak zpracováváme osobní údaje rodičů a dětí u
          parkourových kroužků, LeapCampu a provozu webu.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-navy">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-steel md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-100 p-5 text-sm text-steel">
          <p>
            Související dokumenty:{" "}
            <Link href="/obchodni-podminky" className="font-semibold text-brand hover:text-brand-dark">
              obchodní podmínky
            </Link>{" "}
            a{" "}
            <Link href="/cookies" className="font-semibold text-brand hover:text-brand-dark">
              informace o cookies
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
