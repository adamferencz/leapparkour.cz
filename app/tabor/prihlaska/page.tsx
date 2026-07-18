import type { Metadata } from "next";
import { CampForm } from "@/components/forms/CampForm";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { CAMP, INSURANCE_URL } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Přihláška na ${CAMP.label}`,
  description: `Online přihláška na letní parkourový tábor ${CAMP.label} — ${CAMP.dates}, ${CAMP.venue}, pro děti ${CAMP.ageRange}.`,
  path: "/tabor/prihlaska",
  image: "/images/2024_08_TABOROVA2022.jpg",
  imageAlt: `Online přihláška na letní parkourový tábor ${CAMP.label}`,
});

/** Ikonky akordeonů — inline SVG (stroke, 22px). */
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function IconPrice() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg {...iconProps}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function IconStorno() {
  return (
    <svg {...iconProps}>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg {...iconProps}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function TaborPrihlaskaPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-14">
        {/* Levý sloupec — informace o táboře */}
        <div>
          <Reveal>
            <p className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              {CAMP.edition}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
              {CAMP.label}
            </h1>
            <p className="mt-4 max-w-xl text-lg">
              Týden parkouru, her, týmových výzev a vesmírného dobrodružství na
              Vysočině — pro začátečníky i pokročilé.
            </p>
          </Reveal>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {(
              [
                ["Termín", CAMP.dates],
                ["Místo", CAMP.venue],
                ["Věk", CAMP.ageRange],
              ] as const
            ).map(([label, value], i) => (
              <Reveal
                key={label}
                delay={i * 0.06}
                className="h-full rounded-2xl bg-slate-100 px-5 py-4"
              >
                <dt className="text-xs font-semibold tracking-wide text-steel/80 uppercase">
                  {label}
                </dt>
                <dd className="mt-1 font-semibold text-navy">{value}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.08}>
            <div className="mt-6 rounded-2xl bg-brand/5 px-6 py-5">
              <p className="text-xs font-semibold tracking-wide text-steel/80 uppercase">
                Cena tábora
              </p>
              <p className="mt-1 text-4xl font-extrabold text-navy md:text-5xl">
                {CAMP.price}
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10 space-y-3" delay={0.12}>
            <AccordionItem title="Co cena zahrnuje" icon={<IconPrice />} defaultOpen>
              <ul className="list-disc space-y-2 pl-5">
                <li>Strava a pitný režim</li>
                <li>Ubytování</li>
                <li>15 vedoucích + pedagogický dozor a zdravotník</li>
                <li>
                  Základní{" "}
                  <a
                    href={INSURANCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline hover:text-brand-dark"
                  >
                    pojištění ČRDM
                  </a>{" "}
                  (doporučujeme mít i pojištění vlastní)
                </li>
                <li>Táborové video a fotky</li>
                <li>
                  Celotáborová hra a příběh — v roce {CAMP.year} vesmírná mise
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Co tě čeká" icon={<IconStar />}>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Týden plný zábavy a nejlepší příležitost se{" "}
                  <strong>zlepšit v parkouru</strong>.
                </li>
                <li>
                  Spoustu <strong>her a sportů</strong>, které si budeš moct
                  vyzkoušet.
                </li>
                <li>
                  Trenéři, co vedou vlastním příkladem a mají{" "}
                  <strong>více jak 8 let zkušeností</strong>.
                </li>
                <li>
                  <strong>Pedagogický dozor a zdravotník</strong>, co se bude
                  starat o tvou bezpečnost.
                </li>
                <li>
                  Táborové <strong>video a fotky</strong>.
                </li>
                <li>
                  Celotáborový příběh — v roce {CAMP.year} nás čeká{" "}
                  <strong>
                    vesmírná mise inspirovaná světem galaktických hrdinů
                  </strong>
                  .
                </li>
                <li>
                  <strong>Bodování po týmech.</strong>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Dokumenty před odjezdem" icon={<IconDocument />}>
              <ul className="list-disc space-y-2 pl-5">
                <li>Vytisknutá a podepsaná přihláška na tábor</li>
                <li>
                  Potvrzení o bezinfekčnosti (ne starší než jeden den, potvrzují
                  rodiče)
                </li>
                <li>Kartička zdravotní pojišťovny (stačí kopie)</li>
                <li>
                  Potvrzení dítěte o zdravotní způsobilosti (potvrzuje lékař)
                </li>
              </ul>
              <p className="mt-3">
                Bez dokumentů na tábor dítě přijmout nemůžeme — museli byste se
                pro ně vrátit domů. Vzory ke stažení najdete{" "}
                <a
                  href={CAMP.documentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand underline hover:text-brand-dark"
                >
                  ZDE
                </a>
                .
              </p>
            </AccordionItem>

            <AccordionItem title="Storno podmínky" icon={<IconStorno />}>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  30 a více dnů před začátkem tábora vracíme 100 % z celkové
                  ceny mínus 500 Kč kvůli administrativě a účetnictví.
                </li>
                <li>
                  15–29 dní před začátkem tábora vracíme 100 % z částky mínus
                  500 Kč v případě, že dítě onemocní nebo se zraní (dokládá se
                  potvrzením lékaře). Při zrušení tábora z jiného důvodu vracíme
                  50 % z celkové ceny.
                </li>
                <li>
                  14 a méně dní před začátkem tábora již peníze nevracíme
                  (pokud nejde o nemoc či zranění).
                </li>
                <li>
                  Pokud dítě onemocní/zraní se v průběhu tábora, vracíme 750 Kč
                  za každý den, který na táboře být nemohlo.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Kde tábor probíhá" icon={<IconMapPin />}>
              <p>
                {CAMP.venue}
                <br />
                {CAMP.venueAddress} —{" "}
                <a
                  href={CAMP.venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand underline hover:text-brand-dark"
                >
                  otevřít v Google Mapách
                </a>
              </p>
              <p className="mt-3">
                <strong>Přesné časy příjezdu a odjezdu upřesníme před
                táborem</strong>{" "}
                (v minulém ročníku: příjezd v sobotu 16:00–17:00, odjezd
                v sobotu 10:00–11:00). Děti dostanou při odjezdu obědový
                balíček.
              </p>
            </AccordionItem>
          </Reveal>
        </div>

        {/* Pravý sloupec — sticky formulář */}
        <div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg md:p-8 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Přihláška na {CAMP.label}</h2>
            <p className="mt-2 text-sm text-steel">
              Prosíme o vyplnění formuláře. V případě registrace více dětí
              vyplňte formulář zvlášť. Tábor se koná v termínu {CAMP.dates}.
            </p>
            <div className="mt-6">
              <CampForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
