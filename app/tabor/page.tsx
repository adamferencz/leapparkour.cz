import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CAMP, INSURANCE_URL } from "@/lib/config";
import { YouTube } from "@/components/ui/YouTube";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: `LeapCamp ${CAMP.year}: parkourový tábor pro děti ${CAMP.ageRange}`,
  description: `Týden pohybu, přátelství a vesmírného dobrodružství na Vysočině. Parkour, hry, týmové výzvy, zkušení trenéři, pedagogický dozor a zdravotník. Termín ${CAMP.dates}, ${CAMP.venue}, cena ${CAMP.price}.`,
};

const ctaButton =
  "inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]";

const ctaSecondary =
  "inline-block rounded-full border border-navy/15 bg-white px-6 py-3 font-semibold text-navy transition-[background-color,transform] duration-200 hover:bg-slate-100 active:scale-[0.98]";

/* ---------- Ikony (inline SVG, stroke) ---------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function IconCheck({ className = "mt-0.5 shrink-0 text-brand" }: { className?: string }) {
  return (
    <svg {...iconProps} width="20" height="20" strokeWidth={2.5} className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-brand">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-brand">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-brand">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-brand">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconShield({ className = "mt-0.5 shrink-0 text-brand" }: { className?: string }) {
  return (
    <svg {...iconProps} width="20" height="20" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconTent() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-brand">
      <path d="M3.5 21 12 4l8.5 17" />
      <path d="M12 13l4 8H8l4-8z" />
      <path d="M2 21h20" />
    </svg>
  );
}

/* ---------- Data sekcí (texty z copywritingu LeapCamp 2027) ---------- */

const HERO_POINTS = [
  { icon: <IconCalendar />, text: CAMP.dates },
  { icon: <IconMapPin />, text: CAMP.venue },
  { icon: <IconUsers />, text: `Pro začátečníky i pokročilé ve věku ${CAMP.ageRange}` },
  { icon: <IconStar />, text: "Parkour, hry, týmové bodování a celotáborový příběh" },
  { icon: <IconShield />, text: "Zkušení trenéři, pedagogický dozor a zdravotník" },
];

const TRUST_BADGES = [
  "Kroužky a tábory od roku 2015",
  `${CAMP.edition} LeapCampu`,
  "Pro začátečníky i pokročilé",
  "Pedagogický dozor a zdravotník",
  "Táborové video a fotky",
];

/** Co děti na táboře zažijí — 8 bodů z copy dokumentu */
const EXPERIENCE_ITEMS = [
  "Parkourové tréninky pro začátečníky i pokročilé",
  "Bezpečný nácvik technik, skoků, přeskoků a dopadů",
  "Parkourový deník pro sledování pokroku",
  "Workshop zaměřený na salto vzad",
  "Velký airtrack, trampolíny, bedny, lešení, žíněnky a další překážky",
  "Týmové bodování a celotáborová hra",
  "Další sporty a pohybové aktivity podle programu",
  "Fotky a táborové video jako vzpomínka na celý týden",
];

/** Bezpečnost a dohled — 7 bodů */
const SAFETY_ITEMS = [
  "Děti trénují pod vedením trenérů",
  "Program probíhá podle táborového řádu",
  "Účastníci neskáčou parkour bez svolení vedoucích",
  "Na táboře je pedagogický dozor",
  "Na táboře je zkušený zdravotník",
  "Děti jsou vedené k respektu, spolupráci a ohleduplnosti",
  "Součástí tábora je základní pojištění od České rady dětí a mládeže",
];

/** Co je v ceně — 10 bodů */
const PRICE_INCLUDES = [
  "Ubytování",
  "Strava po dobu tábora",
  "Parkourový a sportovní program",
  "Práce trenérů a vedoucích",
  "Pedagogický dozor",
  "Zdravotník",
  "Využití parkourového vybavení",
  "Celotáborová hra",
  "Táborové fotky a video",
  "Základní pojištění od České rady dětí a mládeže",
];

const SIGNUP_STEPS = [
  "Vyplníte online přihlášku.",
  "Obdržíte potvrzení a informace k platbě.",
  "Před táborem si připravíte potřebné dokumenty.",
  "V den příjezdu dítě předáte vedoucím v táborovém středisku.",
];

/** FAQ pro rodiče — 10 otázek */
const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Musí dítě umět parkour?",
    answer:
      "Nemusí. Tábor je vhodný pro začátečníky i pokročilé. Děti trénují podle své úrovně a pod vedením trenérů.",
  },
  {
    question: "Je tábor vhodný i pro dítě, které se bojí salt?",
    answer:
      "Ano. Dítě nemusí dělat salto. Trénink je postupný a vždy záleží na jeho úrovni, připravenosti a pokynech trenéra.",
  },
  {
    question: "Budou děti skákat samy bez dozoru?",
    answer:
      "Ne. Parkour se trénuje pod dohledem trenérů. Tábor má jasná pravidla a děti neskáčou bez svolení vedoucích.",
  },
  {
    question: "Kdo se o děti stará?",
    answer: "O děti se stará tým trenérů a vedoucích, pedagogický dozor a zdravotník.",
  },
  {
    question: "Jaký je věk účastníků?",
    answer: `Tábor je pro děti ve věku ${CAMP.ageRange}. Minimální věk je 8 let.`,
  },
  {
    question: "Kde tábor probíhá?",
    answer: `${CAMP.venue}, adresa ${CAMP.venueAddress}.`,
  },
  {
    question: "Co když dítě bere léky nebo má zdravotní omezení?",
    answer:
      "Informace o lécích, alergiích nebo zdravotních omezeních je potřeba uvést v přihlášce a předat zdravotníkovi při příjezdu.",
  },
  {
    question: "Mohou mít děti mobil?",
    answer:
      "Používání mobilních telefonů se řídí táborovým řádem. V předchozích letech bylo dovoleno pouze v osobním volnu.",
  },
  {
    question: "Dostanou rodiče fotky nebo video?",
    answer: "Ano, součástí tábora jsou fotky a táborové video.",
  },
  {
    question: "Jak se přihlásit?",
    answer: (
      <>
        Přihlášení probíhá přes{" "}
        <Link
          href="/tabor/prihlaska"
          className="font-medium text-brand underline hover:text-brand-dark"
        >
          online formulář
        </Link>
        . Po přihlášení obdržíte další instrukce k platbě a dokumentům.
      </>
    ),
  },
];

const GALLERY = [
  { src: "/images/2025_11_3.jpg", alt: "Fotka z tábora — parkourový trénink" },
  { src: "/images/2025_11_4.jpg", alt: "Fotka z tábora — skoky na překážkách" },
  { src: "/images/2025_11_5.jpg", alt: "Fotka z tábora — táborové hry" },
  { src: "/images/2025_11_GOPR1033.jpg", alt: "Fotka z tábora — sportovní aktivity" },
  { src: "/images/2025_11_denik.jpg", alt: "Parkourový deník pro sledování pokroku" },
  { src: "/images/2025_11_vlajka-e1763665867358.jpg", alt: "Táborová vlajka" },
];

const REVIEWS = [
  {
    name: "had rychly",
    text: "Kreativní pohyb a spousta zábavy",
  },
  {
    name: "Jitka Klofáčová",
    text: "Příjemní vedoucí, skvělý program, spousta pohybu. Doporučuji všem, kdo se neradi nudí.",
  },
  {
    name: "Danielpk8",
    text: "Úžasný trenéři, děti je milují, díky za ně",
  },
  {
    name: "Magdalena Klofáčová",
    text: "Skvělí vedoucí, parádní program a každý den plný pohybu, her a zábavy. Každý rok si odvezeš nové dovednosti, kamarády a spoustu nezapomenutelných zážitků.",
  },
  {
    name: "Daniel Pospíchal",
    text: "Nejlepší parkourový tým na Vysočině. Vše dělají srdcem a vedou nové generace k pohybu a lásce ke sportu obecně.",
  },
];

const PAST_VIDEOS = [
  { id: "4JbXQMijJqk", title: "LeapCamp — video z minulého ročníku" },
  { id: "O3EM_bFs9fQ", title: "LeapCamp — video z předchozího ročníku" },
  { id: "e62WhbJx5YA", title: "LeapCamp — video ze staršího ročníku" },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 z 5 hvězdiček">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.94 6.26 6.56 1.01-4.75 4.38L17.9 20 12 16.6 6.1 20l1.15-6.35L2.5 9.27l6.56-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TaborPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Letní parkourový tábor · {CAMP.edition}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                LeapCamp {CAMP.year}: parkourový tábor pro děti {CAMP.ageRange}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed">
                Týden pohybu, přátelství a vesmírného dobrodružství na Vysočině. Děti čeká
                parkour, hry, týmové výzvy, zkušení trenéři, pedagogický dozor a zdravotník
                po celou dobu tábora.
              </p>
              <ul className="mt-6 space-y-2.5">
                {HERO_POINTS.map((point) => (
                  <li key={point.text} className="flex items-start gap-3">
                    {point.icon}
                    <span className="font-medium text-navy">{point.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/tabor/prihlaska" className={ctaButton}>
                  Přihlásit dítě na tábor
                </Link>
                <Link href="/tabor/informace" className={ctaSecondary}>
                  Zobrazit informace pro rodiče
                </Link>
              </div>
              <p className="mt-5 max-w-md text-sm text-steel">
                Kapacita tábora je omezená. Po odeslání přihlášky vám pošleme všechny
                důležité informace k platbě, dokumentům a příjezdu.
              </p>
            </Reveal>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2024_08_spolecna.jpg"
                alt="Společná fotka dětí a trenérů z LeapCampu"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-navy">
                Tábory pořádáme od roku 2015
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Důvěryhodnost */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">
                Tábor od parkourové komunity, která vede děti k pohybu od roku 2015
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 leading-relaxed">
                LeapParkour vznikl v Havlíčkově Brodě jako parta lidí, kteří milovali pohyb,
                trénování a překonávání vlastních limitů. Postupně z toho vyrostly
                parkourové kroužky, workshopy, komunita a letní LeapCamp.
              </p>
              <p className="mt-4 leading-relaxed">
                Na táboře dětem nepředáváme jen triky. Učíme je trénovat bezpečně,
                spolupracovat, překonávat strach, respektovat ostatní a zažít radost
                z pohybu.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TRUST_BADGES.map((badge, i) => (
              <Reveal key={badge} delay={i * 0.05}>
                <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
                  {badge}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pro koho je tábor vhodný */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pro děti, které chtějí skákat, hýbat se a zažít pořádný tábor
            </h2>
            <p className="mt-6 leading-relaxed">
              LeapCamp je určený pro děti ve věku {CAMP.ageRange}. Přijet mohou
              začátečníci, kteří s parkourem teprve začínají, i pokročilejší děti, které už
              trénují a chtějí se během týdne posunout dál.
            </p>
            <p className="mt-4 leading-relaxed">
              Program vedeme tak, aby si každé dítě našlo svoji úroveň. Nikdo nemusí umět
              salto ani žádný konkrétní trik předem. Důležité je, aby mělo chuť hýbat se,
              zkoušet nové věci a fungovat v partě.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/20 bg-white px-5 py-4">
              <IconShield />
              <p className="text-sm leading-relaxed">
                <strong className="text-navy">Pro rodiče:</strong> tréninky probíhají pod
                dohledem trenérů. Děti neskáčou parkour samy bez svolení vedoucích a během
                programu poslouchají pokyny trenéra.
              </p>
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2024_08_DSC02487-min.jpg"
                alt="Děti při parkourovém tréninku na táboře"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Téma 2027 — vesmírná mise */}
      <section className="bg-navy py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Téma {CAMP.year} · táborový příběh
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              V roce {CAMP.year} nás čeká vesmírná mise
            </h2>
            <p className="mt-6 leading-relaxed text-slate-300">
              LeapCamp {CAMP.year} se ponese v duchu{" "}
              <strong className="text-white">
                vesmírného dobrodružství inspirovaného světem galaktických hrdinů
              </strong>
              . Děti se zapojí do celotáborové hry, budou plnit týmové mise, sbírat body
              a postupně odkrývat příběh, ve kterém rozhoduje odvaha, spolupráce
              a schopnost překonat překážky.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              Parkour se do tohoto světa hodí přirozeně. Každý skok, přeskok, výlez nebo
              salto je další krok na cestě mladého hrdiny. Nejde ale o výkon za každou
              cenu. Jde o postupný trénink, bezpečné zlepšování a radost z toho, že dítě
              zvládne něco, co pro něj ještě před chvílí vypadalo nemožně.
            </p>
            <Link href="/tabor/prihlaska" className={`${ctaButton} mt-8`}>
              Chci přihlásit dítě
            </Link>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2025_11_DSC02578-ve-velke-velikosti.jpeg"
                alt="Parkourové překážky a trénink na LeapCampu"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Co děti na táboře zažijí */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">
                Parkour, hry, týmové výzvy a zážitky od rána do večera
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 leading-relaxed">
                Během týdne děti čeká pestrý program, který kombinuje parkourový trénink,
                sportovní aktivity, táborové hry a celotáborový příběh.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {EXPERIENCE_ITEMS.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-slate-100 px-5 py-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <IconCheck />
                  <span className="font-medium text-navy">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed">
              Program není jen o parkouru. Děti si vyzkouší více pohybových aktivit, naučí
              se spolupracovat v týmu a zažijí klasickou táborovou atmosféru. Sporty, které
              chce dítě vyzkoušet, si navíc vybere přímo v přihlášce.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. Bezpečnost a dohled */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal from="left">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Pro rodiče
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Bezpečnost bereme stejně vážně jako zábavu
              </h2>
              <p className="mt-6 leading-relaxed">
                Rozumíme tomu, že u parkourového tábora je bezpečnost pro rodiče jedna
                z nejdůležitějších otázek. Proto děti trénují pod vedením zkušených
                trenérů, program má jasná pravidla a po celou dobu tábora je zajištěný
                dohled.
              </p>
              <blockquote className="mt-6 border-l-4 border-brand pl-5 leading-relaxed">
                Naším cílem není tlačit děti do výkonů, na které nejsou připravené.
                Chceme, aby se zlepšovaly postupně, zdravě a s radostí. Každé dítě má
                jinou úroveň a podle toho s ním pracujeme.
              </blockquote>
              <Link
                href="/tabor/informace"
                className="mt-6 inline-block font-semibold text-brand underline-offset-4 hover:underline"
              >
                Všechny informace pro rodiče →
              </Link>
            </Reveal>
            <Reveal from="right">
              <ul className="space-y-3 rounded-3xl bg-white p-6 shadow-sm md:p-8">
                {SAFETY_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconShield />
                    <span className="font-medium text-navy">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <IconCheck />
                  <span className="text-sm">
                    Více o pojištění najdete na webu{" "}
                    <a
                      href={INSURANCE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline-offset-4 hover:underline"
                    >
                      České rady dětí a mládeže
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Trenéři */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal from="left">
              <h2 className="text-3xl font-bold md:text-4xl">
                Parta trenérů, která jde dětem vlastním příkladem
              </h2>
              <p className="mt-6 leading-relaxed">
                Na LeapCampu se o děti stará tým vedoucích, trenérů, pedagogického dozoru
                a zdravotníka. Jsou to lidé, kteří mají rádi pohyb, pracují s dětmi a vědí,
                jak vytvořit prostředí, ve kterém se děti cítí dobře, bezpečně a zároveň
                mají chuť překonávat samy sebe.
              </p>
              <p className="mt-4 leading-relaxed">
                LeapParkour vznikl z opravdové lásky k pohybu. Stejnou energii se snažíme
                předávat i dětem na kroužcích a táborech.
              </p>
            </Reveal>
            <Reveal from="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/2024_08_32.jpg"
                  alt="Parta trenérů LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <figure className="mt-16 grid items-center gap-10 rounded-3xl bg-slate-100 p-8 md:p-12 lg:grid-cols-[2fr_3fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/2024_08_zaciname.jpg"
                  alt="David Pospíchal — zakladatel a hlavní vedoucí tábora"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <div>
                <blockquote className="text-lg font-medium leading-relaxed text-navy">
                  „Také jsem jezdil jako dítě na letní tábory. Bylo to super a nikdy na ně
                  nezapomenu. Jsou to pro mě zážitky na celý život a přesně o to se snažím,
                  aby LeapCamp byl pro děti zážitkem, na který jen tak nezapomenou.“
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-bold text-navy">David Pospíchal</p>
                  <p className="text-sm text-steel">Zakladatel a hlavní vedoucí tábora</p>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 8. Kdy a kde */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2025_11_6.jpg"
                alt="Fotka z táborového střediska Radost"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal from="right">
            <h2 className="text-3xl font-bold md:text-4xl">Termín a místo konání</h2>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <IconCalendar />
                <div>
                  <p className="font-semibold text-navy">Termín</p>
                  <p>{CAMP.dates}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <IconMapPin />
                <div>
                  <p className="font-semibold text-navy">Místo</p>
                  <p>{CAMP.venue}</p>
                  <p className="text-sm text-steel">
                    {CAMP.venueAddress} —{" "}
                    <a
                      href={CAMP.venueMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline-offset-4 hover:underline"
                    >
                      otevřít v Google Mapách
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <IconUsers />
                <div>
                  <p className="font-semibold text-navy">Věk</p>
                  <p>{CAMP.ageRange} — začátečníci i pokročilí</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <IconTent />
                <div>
                  <p className="font-semibold text-navy">Typ tábora</p>
                  <p>Pobytový parkour-herní tábor</p>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm text-steel">
              Přesné časy příjezdu a odjezdu upřesníme před táborem (v minulém ročníku:
              příjezd v sobotu 16:00–17:00, odjezd v sobotu 10:00–11:00).
            </p>
            <Link href="/tabor/prihlaska" className={`${ctaButton} mt-8`}>
              Přihlásit dítě na tábor
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 9. Cena */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-10 rounded-3xl bg-navy p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white md:text-4xl">Cena tábora</h2>
                <p className="mt-6 text-lg text-slate-300">
                  Cena LeapCampu {CAMP.year} je
                </p>
                <p className="mt-1 text-5xl font-extrabold text-white">{CAMP.price}</p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link href="/tabor/prihlaska" className={ctaButton}>
                    Přihlásit dítě na tábor
                  </Link>
                  <Link
                    href="/tabor/informace"
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Další informace a podmínky
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Co je v ceně</h3>
                <ul className="mt-6 grid gap-x-6 gap-y-3 text-slate-200 sm:grid-cols-2">
                  {PRICE_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Jak dítě přihlásit */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">Jak dítě přihlásit</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 leading-relaxed">
                Přihlášení probíhá přes online formulář. Po vyplnění přihlášky vám pošleme
                další informace k platbě, potřebným dokumentům a organizaci příjezdu.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNUP_STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <p className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
                    {i + 1}
                  </p>
                  <p className="mt-4 font-medium text-navy">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <Link href="/tabor/prihlaska" className={ctaButton}>
                Přihlásit dítě na LeapCamp {CAMP.year}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. FAQ pro rodiče */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-center text-sm font-semibold uppercase tracking-wider text-brand">
                FAQ
              </p>
              <h2 className="mt-3 text-center text-3xl font-bold md:text-4xl">
                Časté otázky rodičů
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-12 space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={item.question} title={item.question} defaultOpen={i === 0}>
                    <p>{item.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 12. Fotogalerie */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Fotogalerie</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((photo, i) => (
              <Reveal key={photo.src} delay={(i % 3) * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Minulé ročníky — videa */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Minulé ročníky</h2>
            <p className="mt-4 text-center">
              Podívejte se, jak vypadaly naše předchozí LeapCampy.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAST_VIDEOS.map((video, i) => (
              <Reveal key={video.id} delay={i * 0.06}>
                <YouTube id={video.id} title={video.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Recenze Google */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Hodnocení Google</h2>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Stars />
                <p className="font-semibold text-navy">VYNIKAJÍCÍ</p>
              </div>
              <p className="mt-2 text-sm text-steel">
                Na základě 5 hodnocení (zdroj: Google)
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name} delay={(i % 3) * 0.06} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <Stars />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-navy">
                    {review.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Závěrečná prodejní sekce */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="rounded-3xl bg-navy p-8 text-center md:p-12">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold text-white md:text-4xl">
                Pošlete dítě na týden, kde bude růst, hýbat se a sbírat zážitky
              </h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-slate-300">
                LeapCamp není jen sportovní tábor. Je to týden, ve kterém děti trénují,
                hrají, spolupracují, překonávají strach a zažívají příběh společně s partou
                vrstevníků.
              </p>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-300">
                V roce {CAMP.year} je čeká vesmírná mise, ale hlavní zůstává stejné:
                bezpečný pohyb, dobrá parta, zkušení trenéři a zážitky, které si děti
                odvezou domů.
              </p>
              <div className="mt-8">
                <Link href="/tabor/prihlaska" className={ctaButton}>
                  Přihlásit dítě na LeapCamp {CAMP.year}
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Termín: {CAMP.dates} · Věk: {CAMP.ageRange} · Místo: {CAMP.venue}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
