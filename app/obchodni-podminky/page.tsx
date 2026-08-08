import type { Metadata } from "next";
import Link from "next/link";
import { CAMP, CLUB_SEASON, SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Obchodní podmínky",
  description:
    "Obchodní podmínky pro parkourové kroužky a letní tábor LeapCamp pořádané spolkem Leap parkour, z. s.",
  path: "/obchodni-podminky",
  robots: { index: true, follow: true },
});

const provider = [
  `${SITE.legalName}`,
  `IČO: ${SITE.ico}`,
  `Sídlo: ${SITE.address}`,
  `E-mail: ${SITE.email}`,
  SITE.registry,
  SITE.vatNote,
];

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Právní informace
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">
          Obchodní podmínky
        </h1>
        <p className="mt-5 max-w-3xl text-steel">
          Tyto podmínky upravují přihlášení dítěte na parkourový kroužek a
          letní tábor LeapCamp přes web Leap Parkour.
        </p>

        <div className="mt-10 space-y-9 text-sm leading-relaxed text-steel md:text-base">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Pořadatel</h2>
            <ul className="mt-3 space-y-1">
              {provider.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Nabízené služby</h2>
            <p className="mt-3">
              Pořadatel nabízí sportovní a vzdělávací aktivity pro děti, zejména
              pravidelné parkourové kroužky a letní tábor LeapCamp.
            </p>
            <p className="mt-3">
              Aktuální kroužek: {CLUB_SEASON.label}, cena při docházce jednou
              týdně {CLUB_SEASON.priceOnceWeek}, při docházce dvakrát týdně{" "}
              {CLUB_SEASON.priceTwiceWeek}.
            </p>
            <p className="mt-3">
              Aktuální tábor: {CAMP.label}, termín {CAMP.dates}, místo{" "}
              {CAMP.venue}, cena {CAMP.price}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Přihláška a uzavření smlouvy</h2>
            <p className="mt-3">
              Přihláška se odesílá přes webový formulář. Po jejím odeslání
              zašleme potvrzení na e-mail uvedený v přihlášce. Pořadatel si
              vyhrazuje právo přihlášku odmítnout, zejména při naplnění kapacity
              nebo pokud účast dítěte není vhodná z bezpečnostních či
              organizačních důvodů.
            </p>
            <p className="mt-3">
              Rodič nebo zákonný zástupce odpovídá za správnost uvedených údajů
              a za včasné oznámení změn, zejména změn zdravotního stavu dítěte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Cena, faktura a platba</h2>
            <p className="mt-3">
              Po odeslání přihlášky vystavíme fakturu a pošleme ji na e-mail
              rodiče. Faktura obsahuje částku, číslo účtu a variabilní symbol.
              Přihláška je závazně rezervovaná po potvrzení pořadatelem a úhradě
              podle pokynů ve faktuře.
            </p>
            <p className="mt-3">
              Pokud je použit slevový kód, výsledná částka se dopočítá před
              vystavením faktury.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Storno a změny účasti</h2>
            <p className="mt-3">
              Kroužky a tábory jsou služby volného času poskytované v konkrétním
              termínu. Zákonné odstoupení do 14 dnů se na tyto služby zpravidla
              neuplatní; použijí se storno podmínky uvedené u konkrétní služby
              nebo dohodnuté s pořadatelem.
            </p>
            <p className="mt-3">
              Pokud rodič potřebuje účast zrušit nebo změnit, kontaktuje
              pořadatele co nejdříve na e-mailu {SITE.email}. U tábora se
              použijí storno podmínky uvedené na stránce LeapCampu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Bezpečnost, zdravotní informace a pravidla</h2>
            <p className="mt-3">
              Dítě se účastní aktivit pod vedením trenérů a vedoucích. Rodič je
              povinen uvést zdravotní omezení, léky, alergie a další skutečnosti,
              které mohou mít vliv na bezpečnost dítěte.
            </p>
            <p className="mt-3">
              Pořadatel může účast dítěte ukončit, pokud dítě opakovaně porušuje
              bezpečnostní pokyny, ohrožuje sebe nebo ostatní, případně pokud se
              ukáže, že nebyly uvedeny podstatné zdravotní informace.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Táborové dokumenty</h2>
            <p className="mt-3">
              U tábora může být vyžadován posudek o zdravotní způsobilosti,
              potvrzení o bezinfekčnosti, kopie kartičky pojištěnce a další
              dokumenty podle aktuálních pokynů pořadatele a právních povinností.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">8. Fotky a videa</h2>
            <p className="mt-3">
              Fotky a videa dítěte pro web, sociální sítě a propagační materiály
              používáme pouze na základě samostatného souhlasu zákonného
              zástupce. Tento souhlas není podmínkou účasti a lze ho odvolat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">9. Ochrana osobních údajů</h2>
            <p className="mt-3">
              Informace o zpracování osobních údajů jsou uvedeny na samostatné
              stránce{" "}
              <Link href="/ochrana-osobnich-udaju" className="font-semibold text-brand hover:text-brand-dark">
                Ochrana osobních údajů
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">10. Reklamace a řešení sporů</h2>
            <p className="mt-3">
              Pokud je rodič s poskytnutou službou nespokojený, kontaktuje
              pořadatele na e-mailu {SITE.email}. Budeme se snažit věc vyřešit
              dohodou.
            </p>
            <p className="mt-3">
              Pokud vznikne spotřebitelský spor, který se nepodaří vyřešit
              přímo, může spotřebitel podat návrh na mimosoudní řešení sporu u
              České obchodní inspekce, Ústřední inspektorát, oddělení ADR,
              Gorazdova 1969/24, 120 00 Praha 2, e-mail adr@coi.gov.cz, web{" "}
              <a href="https://coi.gov.cz/informace-o-adr/" className="font-semibold text-brand hover:text-brand-dark">
                coi.gov.cz/informace-o-adr/
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 rounded-2xl bg-slate-100 p-5 text-sm text-steel">
          Poslední aktualizace: 8. 8. 2026
        </p>
      </div>
    </section>
  );
}
