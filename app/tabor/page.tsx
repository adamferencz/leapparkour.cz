import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CAMP } from "@/lib/config";
import { YouTube } from "@/components/ui/YouTube";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import CampGallery from "@/components/CampGallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `LeapCamp ${CAMP.year}: tábor pro děti ${CAMP.ageRange}`,
  description:
    "Tábor, ze kterého si děti neodvezou jen zážitky. Odvezou si dovednosti, kamarády a větší důvěru v sebe.",
  path: "/tabor",
  image: "/images/camp-fotky/camp-01.webp",
  imageAlt: `LeapCamp ${CAMP.year} - letní parkourový tábor pro děti`,
});

const ctaButton =
  "inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]";

const ctaSecondary =
  "inline-block rounded-full border border-navy/15 bg-white px-6 py-3 font-semibold text-navy transition-[background-color,transform] duration-200 hover:bg-slate-100 active:scale-[0.98]";

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

function IconShield({ className = "mt-0.5 shrink-0 text-brand" }: { className?: string }) {
  return (
    <svg {...iconProps} width="20" height="20" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg {...iconProps} width="20" height="20" className="mt-0.5 shrink-0 text-yellow-300">
      <path d="M12 2v5M12 17v5M4.22 4.22l3.54 3.54M16.24 16.24l3.54 3.54M2 12h5M17 12h5M4.22 19.78l3.54-3.54M16.24 7.76l3.54-3.54" />
    </svg>
  );
}

const HERO_POINTS = [
  { icon: <IconMapPin />, text: CAMP.venue },
  { icon: <IconCalendar />, text: CAMP.dates },
  { icon: <IconUsers />, text: `${CAMP.ageRange}` },
  { icon: <IconCheck />, text: `${CAMP.price}` },
];

const ACTIVITY_ITEMS = [
  "bojové sporty",
  "lukostřelbu",
  "frisbee",
  "míčové hry",
  "natáčení videí",
  "týmové hry",
  "výzvy",
  "NERF",
  "a další aktivity",
];

const EQUIPMENT_ITEMS = [
  "velký AirTrack",
  "trampolíny",
  "bedny",
  "lešení",
  "žíněnky",
  "dopadové plochy",
  "parkourové překážky",
];

const BENEFITS = [
  "týden intenzivního pohybu a parkouru",
  "trénink přizpůsobený úrovni dítěte",
  "možnost naučit se nové triky a pohybové dovednosti",
  "další sporty a aktivity, které si dítě samo pomůže vybrat",
  "velkou celotáborovou hru a příběh",
  "týmové výzvy a soutěže",
  "nové zážitky",
  "nové kamarády",
  "táborové fotografie a video",
  "zkušenost s překonáváním vlastních hranic",
];

const PRICE_INCLUDES = [
  "ubytování na celý pobyt",
  "celodenní strava a pitný režim",
  "kompletní program",
  "parkourové tréninky",
  "využití parkourového vybavení",
  "další sportovní aktivity",
  "celotáborová hra",
  "zdravotník",
  "fotografie z tábora",
  "závěrečné táborové video",
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Moje dítě nikoho nezná. Co když tam bude samo?",
    answer:
      "To vůbec nevadí. Tábor je prostředí, kde se děti velmi rychle seznamují prostřednictvím týmů, her a společných tréninků.",
  },
  {
    question: "Nikdy nedělalo parkour. Nevadí to?",
    answer:
      "Nevadí. LeapCamp je určený začátečníkům i pokročilým a dítě trénuje podle své úrovně.",
  },
  {
    question: "Musí umět salto?",
    answer: "Nemusí. Salta nejsou podmínkou účasti.",
  },
  {
    question: "Co když se bojí některého triku?",
    answer:
      "Do žádného triku dítě nenutíme. Postupuje vlastním tempem a trenér mu pomůže přes jednodušší varianty.",
  },
  {
    question: "Co když je dítě naopak hodně pokročilé?",
    answer:
      "I zkušenější děti dostávají odpovídající výzvy a mohou pracovat na náročnějších dovednostech.",
  },
];

const GALLERY = Array.from({ length: 41 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/images/camp-fotky/camp-${number}.webp`,
    alt: `Fotka z LeapCampu ${CAMP.year} - moment ${index + 1}`,
  };
});

const REVIEWS = [
  {
    name: "had rychly",
    text: "Kreativní pohyb a spousta zábavy",
    avatar: "/images/camp-fotky/camp-14.webp",
  },
  {
    name: "Jitka Klofáčová",
    text: "Příjemní vedoucí, skvělý program, spousta pohybu. Doporučuji všem, kdo se neradi nudí.",
    avatar: "/images/camp-fotky/camp-10.webp",
  },
  {
    name: "Danielpk8",
    text: "Úžasný trenéři, děti je milují, díky za ně",
    avatar: "/images/camp-fotky/camp-17.webp",
  },
  {
    name: "Magdalena Klofáčová",
    text: "Skvělí vedoucí, parádní program a každý den plný pohybu, her a zábavy. Každý rok si odvezeš nové dovednosti, kamarády a spoustu nezapomenutelných zážitků.",
    avatar: "/images/camp-fotky/camp-21.webp",
  },
  {
    name: "Daniel Pospíchal",
    text: "Nejlepší parkourový tým na Vysočině. Vše dělají srdcem a vedou nové generace k pohybu a lásce ke sportu obecně.",
    avatar: "/images/camp-fotky/camp-31.webp",
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

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {children && <div className="mt-5 leading-relaxed text-steel">{children}</div>}
    </div>
  );
}

export default function TaborPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase text-brand">
                Letní parkourový tábor
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-navy md:text-6xl">
                LeapCamp {CAMP.year}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel">
                Tábor, ze kterého si děti neodvezou jen zážitky. Odvezou si
                dovednosti, kamarády a větší důvěru v sebe. Týden plný
                parkouru, pohybu, her, dobrodružství a výzev pro děti od 8 do
                16 let.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-steel">
                Ať už tvoje dítě parkour nikdy nezkusilo, nebo už trénuje
                několik let, na LeapCampu dostane prostor posunout se z místa,
                na kterém právě je.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {HERO_POINTS.map((point) => (
                  <li key={point.text} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                    {point.icon}
                    <span className="font-medium text-navy">{point.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/tabor/prihlaska" className={ctaButton}>
                  Chci jet na Leap Camp
                </Link>
                <Link href="/tabor/informace" className={ctaSecondary}>
                  Informace pro rodiče
                </Link>
              </div>
              <p className="mt-5 max-w-md text-sm text-steel">
                Počet míst je omezený kapacitou tábora.
              </p>
            </Reveal>
          </div>

          <div>
            <div className="relative min-h-[430px]">
              <div className="absolute left-0 top-8 aspect-[4/3] w-[72%] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-hero-game.webp"
                  alt="Táborová hra při západu slunce na LeapCampu"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 72vw"
                />
              </div>
              <div className="absolute right-0 top-0 aspect-[3/4] w-[40%] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-hero-flip.webp"
                  alt="Dítě dělá salto na trampolíně na LeapCampu"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 40vw"
                />
              </div>
              <div className="absolute bottom-0 right-8 aspect-[4/3] w-[46%] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-hero-balance.webp"
                  alt="Dítě trénuje rovnováhu na překážce na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
              </div>
              <p className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
                LeapCamp pořádáme od roku 2018
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <Image
          src="/images/camp-fotky/camp-04.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/55 to-brand/45" />
        <div className="container-site relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase text-blue-100">
                Proč to dává smysl
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Proč Leap Camp?
              </h2>
              <p className="mt-5 leading-relaxed text-blue-50">
                Neučíme děti jen salta. Učíme je překonávat sebe samé. Na
                začátku může dítě stát před překážkou a říkat: „Tohle nedám.“
                Pak to zkusí, nepovede se to, zkusí to znovu a nakonec přijde
                moment: „Já jsem to fakt zvládl!“
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Krok za krokem",
                text: "Parkour učí děti nevzdávat se po prvním neúspěchu, postupovat postupně a věřit, že se mohou zlepšit.",
                image: "/images/camp-fotky/camp-23.webp",
                alt: "Parkourový trénink krok za krokem",
              },
              {
                title: "Strach se dá zvládnout",
                text: "Dítě nemusí hned skočit největší překážku. Učí se rozumět svému tělu, tempu a bezpečné cestě vpřed.",
                image: "/images/camp-fotky/camp-10.webp",
                alt: "Dítě překonává překážku s podporou trenérů",
              },
              {
                title: "Dovednosti i pro život",
                text: "Sebedůvěra, trpělivost a schopnost zkoušet věci znovu se hodí mnohem déle než jen během jednoho týdne.",
                image: "/images/camp-fotky/camp-14.webp",
                alt: "Radost po zvládnuté výzvě na LeapCampu",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="h-full overflow-hidden rounded-2xl bg-white/92 shadow-xl shadow-navy/20 backdrop-blur">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, 90vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-steel">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Program
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              50 % parkour. 50 % program, který pomáhají vybírat samotné děti.
            </h2>
            <p className="mt-6 leading-relaxed">
              Nechceme vytvořit tábor podle toho, co baví nás. Chceme vytvořit
              tábor, který bude bavit děti. Proto přibližně polovinu programu
              tvoří parkour a pohybové aktivity. Druhou polovinu si děti
              pomáhají sestavit samy.
            </p>
            <p className="mt-4 leading-relaxed">
              Už před táborem dostanou dotazník, ve kterém nám řeknou, co by
              chtěly během týdne zažít. Dítě tak není jen účastníkem tábora.
              Částečně si svůj tábor vytváří samo.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {ACTIVITY_ITEMS.map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-navy shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="relative min-h-[420px]">
              <div className="absolute left-0 top-0 aspect-[4/3] w-[72%] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/leapcamp-selected/leapcamp-foam-game.webp"
                  alt="Děti při pěnové táborové hře na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 72vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-[4/3] w-[50%] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-group-listening.webp"
                  alt="Děti v areálu tábora při společném programu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <div className="relative min-h-[420px]">
              <div className="absolute left-0 top-0 aspect-[4/3] w-[82%] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-first-jump.webp"
                  alt="Dítě skáče přes parkourovou překážku na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 82vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-[4/3] w-[48%] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <Image
                  src="/images/leapcamp-selected/leapcamp-confidence.webp"
                  alt="Dítě po zvládnuté výzvě na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24vw, 48vw"
                />
              </div>
            </div>
          </Reveal>
          <Reveal from="right">
            <h2 className="text-3xl font-bold md:text-4xl">
              „Ale moje dítě parkour neumí…“
            </h2>
            <p className="mt-6 leading-relaxed">
              To vůbec nevadí. Na LeapCamp jezdí začátečníci i pokročilí.
              Nemusíš umět salto, přemet ani před táborem chodit na parkourový
              kroužek.
            </p>
            <p className="mt-4 leading-relaxed">
              Každé dítě začíná na své úrovni. Někdo se během týdne naučí svůj
              první bezpečný parkourový skok. Jiný pracuje na saltu vzad. A
              zkušenější parkourista může trénovat pokročilé kombinace.
            </p>
            <p className="mt-4 font-semibold text-navy">
              Nesrovnáváme děti mezi sebou. Chceme, aby každý překonal
              především sám sebe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white md:py-24">
        <Image
          src="/images/camp-fotky/camp-03.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/72 to-brand/42" />
        <div className="container-site relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <Reveal from="left">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                Zázemí
              </p>
              <h2 className="mt-3 text-3xl font-bold !text-white md:text-4xl">
                Parkourové hřiště, které si přivezeme s sebou
              </h2>
              <p className="mt-6 leading-relaxed text-slate-100">
                Na tábor každý rok přivážíme vybavení, díky kterému můžeme
                vytvořit velké tréninkové zázemí přímo v areálu. Trenéři
                věnují přípravě zázemí celý den ještě před příjezdem dětí.
              </p>
              <p className="mt-4 leading-relaxed text-slate-100">
                Protože když máme děti něco učit, chceme pro to vytvořit co
                nejlepší podmínky.
              </p>
            </Reveal>
            <Reveal from="right">
              <div className="grid gap-3 sm:grid-cols-2">
                {EQUIPMENT_ITEMS.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/14 px-4 py-3 shadow-sm backdrop-blur">
                    <IconCheck className="mt-0.5 shrink-0 text-blue-200" />
                    <span className="font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal from="left">
              <h2 className="text-3xl font-bold md:text-4xl">
                Proč tento tábor vůbec děláme?
              </h2>
              <p className="mt-6 leading-relaxed">
                Protože přesně takhle začal náš vlastní příběh. V roce 2014
                jsme byli obyčejní kluci a holky ze základní školy. Spojovala
                nás vášeň pro pohyb a parkour.
              </p>
              <p className="mt-4 leading-relaxed">
                Parkour nás naučil nevzdávat se, překonávat strach, podporovat
                jeden druhého, pracovat na sobě a dělat věci, které nám
                zpočátku připadaly nemožné.
              </p>
              <p className="mt-4 leading-relaxed">
                Dnes jsme dospělí a tyhle principy používáme pořád. A právě
                proto se jednou za rok znovu sejdeme a pořádáme LeapCamp.
              </p>
            </Reveal>
            <Reveal from="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/camp-fotky/camp-02.webp"
                  alt="Parta trenérů a účastníků LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <Reveal from="left">
            <article className="h-full overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/camp-fotky/camp-08.webp"
                  alt="Trenéři ukazují parkourové triky na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Dítě nepotřebuje jen trenéra. Potřebuje také vzory.
                </h2>
                <p className="mt-6 leading-relaxed">
                  Každé dítě se postupně hledá. Zjišťuje, co ho baví, v čem je
                  dobré a kým chce jednou být. Proto chceme, aby kolem sebe na
                  LeapCampu vidělo lidi, kteří sami sportují, učí se nové věci
                  a překonávají své hranice.
                </p>
                <p className="mt-4 leading-relaxed">
                  Děti nás mohou vidět dělat salta a triky, které jim dnes
                  připadají nemožné. Ale zároveň vidí, že ani my jsme je
                  neuměli odjakživa.
                </p>
              </div>
            </article>
          </Reveal>
          <Reveal from="right">
            <article className="h-full overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/camp-fotky/camp-25.webp"
                  alt="Parta dětí při společném programu na LeapCampu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-bold md:text-4xl">
                  A možná to nejdůležitější: parta
                </h2>
                <p className="mt-6 leading-relaxed">
                  Salto se může dítě naučit i jinde. Ale vzpomínka na partu
                  lidí, se kterými ho poprvé zvládlo, může zůstat celý život.
                </p>
                <p className="mt-4 leading-relaxed">
                  LeapCamp chceme vytvářet jako místo, kde si děti navzájem
                  fandí, kde zkušenější pomáhají začátečníkům a kde může dítě
                  potkat kamarády, se kterými se bude vídat ještě dlouho po
                  skončení tábora.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/camp-fotky/camp-28.webp"
                alt="Bezpečný parkourový trénink na LeapCampu"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal from="right">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Bezpečnost
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Bezpečný progres před bezhlavým riskováním
            </h2>
            <p className="mt-6 leading-relaxed">
              Když rodič slyší „parkour“ a „salta“, je naprosto pochopitelné,
              že začne přemýšlet o bezpečnosti. Proto děti neučíme: „Prostě tam
              skoč.“
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Nejdříve základní pohyb.",
                "Potom jednodušší varianta.",
                "A teprve když je dítě připravené, postupuje dál.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-100 px-4 py-3">
                  <IconShield />
                  <span className="font-medium text-navy">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 leading-relaxed">
              Každé dítě má jiné schopnosti a jiné tempo. Do žádného triku ho
              netlačíme. Na táboře je navíc zkušený tým vedoucích a zdravotník.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050816] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#050816_0%,#0f172a_52%,#111827_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal from="left">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              Téma LeapCampu {CAMP.year}
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-wide text-yellow-300 md:text-6xl">
              Star Wars
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-100">
              <p>
                Byla objevena tajemná Hvězdná brána, která dokáže otevřít cestu
                na vzdálené planety.
              </p>
              <p>
                Děti se stanou členy průzkumné jednotky a každý den budou
                cestovat do nového světa, plnit výzvy a objevovat neznámé
                civilizace.
              </p>
              <p>
                Postupně ale zjistí, že brána nebyla aktivována náhodou. Ve
                vesmíru se probouzí síla, která může ohrozit všechny světy, a
                jen společně ji mohou zastavit.
              </p>
            </div>
            <p className="mt-6 font-semibold text-white">
              Parkour, hry a jednotlivé výzvy se tak stanou součástí jednoho
              velkého dobrodružství, jehož konec budou mít děti ve vlastních
              rukou.
            </p>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-950 shadow-[0_0_45px_rgba(34,211,238,0.22)]">
              <Image
                src="/images/camp-fotky/camp-29.webp"
                alt="Táborová výzva jako součást příběhu LeapCampu"
                fill
                className="object-cover opacity-70"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,8,22,0.12),rgba(5,8,22,0.82))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur">
                <div className="flex items-start gap-3">
                  <IconSpark />
                  <p className="text-sm leading-relaxed text-slate-100">
                    Každý den nový svět, týmová mise a další část příběhu.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <SectionIntro title="Co dítě během LeapCampu získá?">
              <p>
                Kromě programu a zážitků si odveze hlavně pocit, že dokáže víc,
                než si předtím myslelo.
              </p>
            </SectionIntro>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-slate-100 px-5 py-4">
                  <IconCheck />
                  <span className="font-medium text-navy">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <SectionIntro
              eyebrow="Aftermovie"
              title="Podívejte se, jak LeapCamp opravdu vypadá"
            >
              <p>
                Fotky jsou fajn. Ale nejlepší způsob, jak pochopit atmosféru
                LeapCampu, je podívat se přímo na děti, trenéry, hry, parkour a
                celý tábor v akci.
              </p>
            </SectionIntro>
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

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <SectionIntro title="Fotogalerie">
              <p>
                Parkourové momenty, táborová atmosféra a hry. Fotku otevřete
                kliknutím a můžete mezi nimi listovat.
              </p>
            </SectionIntro>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1800px] px-5 lg:px-8">
          <Reveal delay={0.08}>
            <CampGallery photos={GALLERY} />
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Co říkají rodiče a děti
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Stars />
                <p className="font-semibold text-navy">VYNIKAJÍCÍ</p>
              </div>
              <p className="mt-2 text-sm text-steel">
                Na základě 5 hodnocení (zdroj: Google)
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="review-carousel-mask mt-12 overflow-hidden">
              <div className="review-carousel-track flex w-max gap-6">
                {[...REVIEWS, ...REVIEWS].map((review, i) => (
                  <figure
                    key={`${review.name}-${i}`}
                    className="flex w-[82vw] max-w-[360px] shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:w-[340px] lg:w-[352px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm">
                        <Image
                          src={review.avatar}
                          alt={`Profilová fotka recenze: ${review.name}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption>
                        <p className="text-sm font-semibold text-navy">{review.name}</p>
                        <p className="mt-0.5 text-xs text-steel/70">Google recenze</p>
                      </figcaption>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Stars />
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        5.0
                      </span>
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-steel">
                      {review.text}
                    </blockquote>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <SectionIntro title="Co když…" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-12 max-w-3xl space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={item.question} title={item.question} defaultOpen={i === 0}>
                  <p>{item.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy">
              <Image
                src="/images/camp-fotky/camp-08.webp"
                alt={`Parkour na LeapCampu ${CAMP.year}`}
                fill
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,36,75,0.58)_0%,rgba(28,36,75,0.70)_42%,rgba(28,36,75,0.98)_58%,#1c244b_100%)]" />
              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex min-h-[320px] flex-col justify-center">
                  <h2 className="text-3xl font-bold !text-white md:text-4xl">
                    Co je zahrnuto v ceně?
                  </h2>
                  <p className="mt-6 text-lg text-slate-100">
                    Cena LeapCampu {CAMP.year} je
                  </p>
                  <p className="mt-1 text-5xl font-extrabold text-white">{CAMP.price}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Link href="/tabor/prihlaska" className={ctaButton}>
                      Přihlásit dítě
                    </Link>
                    <Link
                      href="/tabor/informace"
                      className="font-semibold text-white underline-offset-4 hover:underline"
                    >
                      Další informace a podmínky
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <ul className="grid gap-x-6 gap-y-3 text-slate-100 sm:grid-cols-2">
                    {PRICE_INCLUDES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <IconCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-center md:p-12">
              <Image
                src="/images/camp-fotky/camp-35.webp"
                alt="Táborová atmosféra na LeapCampu"
                fill
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(28,36,75,0.94),rgba(47,99,212,0.66))]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                  LeapCamp {CAMP.year}
                </p>
                <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold !text-white md:text-4xl">
                  Jednou za rok se naše původní parta znovu sejde.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-slate-100">
                  A na jeden týden vytvoříme místo, které bychom sami chtěli
                  zažít, když nám bylo 10, 12 nebo 15 let. Místo plné pohybu,
                  výzev, kamarádů, dobrodružství a momentů, na které se
                  nezapomíná.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/tabor/prihlaska" className={ctaButton}>
                    Chci přihlásit dítě na Leap Camp
                  </Link>
                  <a
                    href="mailto:leapparkour@seznam.cz"
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Máte otázku? Napište nám
                  </a>
                </div>
                <p className="mt-6 text-sm text-slate-200/80">
                  {CAMP.dates} · {CAMP.venue} · {CAMP.ageRange} · {CAMP.price}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
