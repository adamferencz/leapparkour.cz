import type { Metadata } from "next";
import Link from "next/link";
import { CAMP, INSURANCE_URL } from "@/lib/config";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Důležité informace o táboře",
  description: `Adresa, příjezd a odjezd, potřebné dokumenty, storno podmínky a doporučený seznam věcí na letní tábor ${CAMP.label}.`,
};

const DOCUMENTS = [
  "Vytisknutá a podepsaná přihláška na tábor",
  "Potvrzení o bezinfekčnosti (ne starší než jeden den, potvrzují rodiče)",
  "Kartička zdravotní pojišťovny (stačí kopie)",
  "Potvrzení dítěte o zdravotní způsobilosti (potvrzuje lékař)",
];

const CANCELLATION_TERMS = [
  "30 a více dnů před začátkem tábora vracíme 100 % z celkové ceny mínus 500 Kč kvůli administrativě a účetnictví.",
  "15–29 dní před začátkem tábora vracíme 100 % z částky mínus 500 Kč v případě, že dítě onemocní nebo se zraní (dokládá se potvrzením lékaře). Při zrušení tábora z jiného důvodu vracíme 50 % z celkové ceny.",
  "14 a méně dní před začátkem tábora již peníze nevracíme (pokud nejde o nemoc či zranění).",
  "Pokud dítě onemocní/zraní se v průběhu tábora, vracíme 750 Kč za každý den, který na táboře být nemohlo.",
];

interface PackingItem {
  label: string;
  emphasized?: boolean;
}

const PACKING_LIST: { title: string; items: PackingItem[] }[] = [
  {
    title: "Hygienické potřeby",
    items: [
      { label: "Zubní kartáček, pasta, hřeben, mýdlo, šampon, opalovací krém, kapesníky" },
      { label: "Ručník, osuška" },
      { label: "Repelent" },
      { label: "Osobní léky (odevzdat zdravotníkovi)" },
    ],
  },
  {
    title: "Oblečení a obuv",
    items: [
      { label: "kvalitní sportovní obuv 2×" },
      { label: "bunda (větrovka) 1×" },
      { label: "dlouhé kalhoty (pohodlné) 1×" },
      { label: "tepláky 2×" },
      { label: "kraťasy" },
      {
        label:
          "trička – podepsané parkour tričko (pokud ho ještě nemáte, je možnost zakoupit)",
      },
      { label: "mikina" },
      { label: "ponožky" },
      { label: "spodní prádlo" },
      { label: "pyžamo" },
      { label: "kšiltovka (šátek)" },
      { label: "pantofle" },
      { label: "plavky" },
    ],
  },
  {
    title: "Ostatní",
    items: [
      { label: "menší batoh (na výlety)", emphasized: true },
      { label: "psací potřeby (pastelky, fixy, pero, lepidlo, nůžky, izolepa)" },
      { label: "sluneční brýle" },
      { label: "láhev na pití", emphasized: true },
      { label: "pláštěnka", emphasized: true },
      { label: "baterka nebo čelovka" },
      { label: "kapesné (cca 500 Kč)" },
      { label: "pytel na špinavé prádlo" },
      { label: "spacák (podepsaný)", emphasized: true },
      { label: "karimatka (podepsaná)", emphasized: true },
    ],
  },
];

const CAMP_RULES = [
  "Účastníci tábora neskáčou parkour, pokud jim to vedoucí nedovolil. (freejump, stanoviště…)",
  "Děti musí vždy uposlechnout pokynu kteréhokoliv z vedoucích.",
  "Všichni účastníci se do chaty přezouvají (pantofle).",
  "Děti nesmí opustit bez souhlasu vedoucích prostor tábora.",
  "Vedoucí můžou skákat i o freejumpu.",
  "Účastníci tábora nevstupují bez souhlasu do jiných pokojů nebo chatek.",
  "Účastníci tábora mají na pokojích a chatkách uklizeno.",
  "Účastníci tábora se navzájem respektují, chovají se k sobě slušně, přátelsky a neužívají sprostá slova.",
  "Program je povinný pro všechny.",
  "Jakýkoli zdravotní problém se musí nahlásit zdravotníkovi tábora. (Nahlásí vše nejdříve vedoucím, teprve poté se případně volá rodičům)",
  "Vlastní natáčení je povolené pouze o freejumpu. (děti nesmí nosit kamery, mobily ani jiné cennosti na program)",
  "Jakékoli cennosti, peníze si můžete nechat u vedoucích.",
  "Polední klid je od slova klidný a táborník v této době odpočívá a nabírá síly na odpolední program.",
  "Používání mobilních telefonů je dovoleno pouze v osobním volnu.",
  "Povinností služby je pomoc s nádobím, úklidem a jiné…",
  "Po večerce jsou všichni účastníci v postelích, tiše si povídají nebo spí.",
  "Pokud probíhá výcvik, děti neopouští stanoviště bez svolení trenéra. Všichni poslouchají trenéra a věnují se programu.",
  "Při porušení táborového řádu nebo výrazné nekázni má právo vedoucí tábora provinilci zabavit mobilní telefon (možnost ho využít pouze pod dozorem pro volání rodičů). Zároveň při nekázni může být dítě vyloučeno z programu na potřebnou dobu.",
  "Za hrubé nebo opakované porušení táborového řádu má vedoucí tábora právo provinilce z tábora vyloučit.",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold md:text-4xl">{children}</h2>;
}

export default function TaborInformacePage() {
  return (
    <div className="container-site py-16 md:py-24">
      {/* Hlavička */}
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            {CAMP.label} · {CAMP.dates}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Důležité informace o táboře
          </h1>
          <p className="mt-4 text-steel">{CAMP.infoNote}</p>
        </div>
      </Reveal>

      {/* Adresa + příjezd/odjezd */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal from="left">
          <div className="h-full rounded-3xl bg-slate-100 p-8">
            <h2 className="text-xl font-bold">Adresa tábora</h2>
            <p className="mt-4 font-semibold text-navy">{CAMP.venue}</p>
            <p className="mt-1">{CAMP.venueAddress}</p>
            <a
              href={CAMP.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              Otevřít v Google Mapách
            </a>
          </div>
        </Reveal>
        <Reveal from="right">
          <div className="h-full rounded-3xl bg-slate-100 p-8">
            <h2 className="text-xl font-bold">Příjezd a odjezd</h2>
            <p className="mt-4">
              <strong className="text-navy">
                Přesné časy příjezdu a odjezdu upřesníme před táborem
              </strong>{" "}
              v organizačních pokynech (v minulém ročníku: příjezd v sobotu 16:00–17:00,
              odjezd v sobotu 10:00–11:00).
            </p>
            <p className="mt-3">
              Prosíme, nejezděte na místo dříve, než bude uvedeno v pokynech — kvůli
              probíhajícím přípravám. Děti dostanou při odjezdu obědový balíček.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Dokumenty */}
      <section className="mt-16 md:mt-24">
        <Reveal>
          <SectionTitle>Na co určitě nezapomenout</SectionTitle>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <p className="font-semibold">
              Prosíme o kontrolu, jestli máte všechny dokumenty — bez nich na tábor dítě
              přijmout nemůžeme!! (Museli byste se pro ně vrátit domů)
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {DOCUMENTS.map((doc) => (
              <li key={doc} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="mt-0.5 shrink-0 text-brand"
                  aria-hidden
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6">Seznam dokumentů a vzory ke stažení naleznete zde:</p>
          <a
            href={CAMP.documentsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
          >
            Dokumenty ke stažení (Google Drive)
          </a>
        </Reveal>
      </section>

      {/* Storno podmínky a pojištění */}
      <section className="mt-16 md:mt-24">
        <Reveal>
          <SectionTitle>Storno podmínky tábora</SectionTitle>
        </Reveal>
        <ul className="mt-8 space-y-4">
          {CANCELLATION_TERMS.map((term, i) => (
            <li key={term}>
              <Reveal delay={Math.min(i * 0.06, 0.18)}>
                <p className="rounded-2xl bg-slate-100 px-6 py-5 leading-relaxed">{term}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold">Pojištění</h3>
          <p className="mt-3 leading-relaxed">
            Součástí tábora je základní pojištění od{" "}
            <strong className="text-navy">České rady dětí a mládeže</strong>. Více
            informací o něm najdete na{" "}
            <a
              href={INSURANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              crdm.cz
            </a>
            . Doporučujeme mít i pojištění vlastní.
          </p>
        </div>
      </section>

      {/* Doporučený seznam věcí */}
      <section className="mt-16 md:mt-24">
        <Reveal>
          <SectionTitle>Doporučený seznam věcí na tábor</SectionTitle>
        </Reveal>
        <div className="mt-8 space-y-4">
          {PACKING_LIST.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <AccordionItem title={category.title} defaultOpen={index === 0}>
                <ul className="list-disc space-y-1.5 pl-5">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      {item.emphasized ? (
                        <strong className="text-navy">{item.label}</strong>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 font-semibold text-navy">
            Doporučujeme rodičům, aby věci svých (mladších) dětí podepsali, například
            iniciálami.
          </p>
          <p className="mt-2 font-semibold text-navy">
            Cenné věci pouze na vlastní zodpovědnost dítěte! Za cennosti neručíme! Ostré
            předměty na tábor NE.
          </p>
        </Reveal>
      </section>

      {/* Táborový řád */}
      <section className="mt-16 md:mt-24">
        <Reveal>
          <SectionTitle>Táborový řád</SectionTitle>
          <div className="mt-8">
            <AccordionItem title="Zobrazit táborový řád">
              <ol className="list-decimal space-y-2 pl-5">
                {CAMP_RULES.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </AccordionItem>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mt-16 md:mt-24">
        <Reveal>
          <div className="rounded-3xl bg-navy p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Chcete přihlásit dítě na LeapCamp?
            </h2>
            <p className="mt-3 text-slate-300">
              {CAMP.dates} · {CAMP.venue} · cena {CAMP.price}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/tabor/prihlaska"
                className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
              >
                Přihlásit dítě na tábor
              </Link>
              <Link
                href="/tabor"
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                Zpět na stránku tábora
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
