import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CLUB_SEASON, INSURANCE_URL, SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";
import ParkourLevels from "@/components/ParkourLevels";

export const metadata: Metadata = createPageMetadata({
  title: "Parkour kroužky v Havlíčkově Brodě",
  description:
    "Parkour kroužky pro děti od 6 do 16 let v Havlíčkově Brodě. První trénink zdarma, začátečníci i pokročilí.",
  path: "/krouzek",
  image: "/images/2024_08_krouzek.jpg",
  imageAlt: "Parkourový kroužek Leap Parkour v Havlíčkově Brodě",
});

const WHY_ITEMS = [
  {
    title: "Dítě vidí, že dokáže věci, které mu dříve připadaly nemožné",
    paragraphs: [
      "Na začátku může přijít dítě, které se bojí přeskočit jednoduchou překážku. Za několik týdnů ji přeskočí. Později se naučí nový trik.",
      "A najednou zjistí: „Když na něčem pracuju, dokážu se zlepšit.“",
      "Právě to je podle nás jedna z největších hodnot parkouru. Nejde jen o to naučit dítě salto. Chceme, aby si postupně budovalo důvěru ve své tělo, odvahu zkoušet nové věci a schopnost nevzdat se po prvním neúspěchu.",
    ],
  },
  {
    title: "Parkour není jen pro talentované děti",
    paragraphs: [
      "Začít může prakticky každý. Dítě nemusí před prvním tréninkem umět salto. Nemusí být nejsilnější. Nemusí být nejrychlejší. A nemusí mít žádnou předchozí zkušenost s parkourem.",
      "Každý začíná na jiné úrovni. Někdo se nejdříve učí bezpečně dopadnout. Jiný pracuje na přeskoku přes překážku. Pokročilejší dítě může trénovat salta a složitější kombinace.",
      "Nesrovnáváme děti mezi sebou. Důležité je, aby se každé dítě postupně posouvalo samo vůči sobě.",
    ],
  },
  {
    title: "Nejdřív bezpečný základ. Potom triky.",
    paragraphs: [
      "Když rodič slyší slovo parkour, často si představí skoky ze střech a nebezpečné kousky. Tak parkour neučíme.",
      "Děti vedeme postupně. Nejdříve se učí správně dopadat, pracovat se svým tělem a zvládnout základní pohyby. Teprve potom postupují k náročnějším prvkům.",
      "Trénují pod dohledem zkušených trenérů a obtížnost přizpůsobujeme jejich schopnostem. Nejde o to udělat trik za každou cenu. Jde o to naučit se ho správně a bezpečně.",
    ],
  },
];

const GROUPS = [
  {
    title: "Parkour přípravka",
    times: ["Čtvrtek 16:00–17:00", "Pátek 16:00–17:00"],
    text: [
      "Pro děti, které chtějí objevovat pohyb a parkour bez tlaku na výkon.",
      "Tréninky jsou postavené na hrách, výzvách, pohybu a základních dovednostech. Do žádných triků děti nenutíme.",
      "Pokud dítě samo projeví zájem, začne více trénovat a chce se zlepšovat, může postupně získat možnost přejít do Parkour týmu. Postup není povinnost. Je to možnost.",
    ],
  },
  {
    title: "Parkour tým",
    times: ["Čtvrtek 17:00–18:00"],
    text: [
      "Pro děti, které už mají parkourové základy a chtějí se posouvat dál.",
      "Nestačí ale jen umět triky. Do týmu vybíráme děti, které samy chtějí trénovat a zlepšovat se, mají přibližně úroveň LVL 3 a výš, respektují trenéry i ostatní, podporují ostatní členy, chodí pravidelně a mají dobrý přístup.",
      "Parkour tým není odměna za talent. Je to skupina pro děti, které opravdu chtějí růst. Do týmu děti zvou trenéři podle jejich dlouhodobého přístupu a pokroku.",
    ],
  },
  {
    title: "Parkour Core",
    times: ["Nejvyšší úroveň naší komunity"],
    text: [
      "Core tvoří starší členové, kteří prošli našimi kroužky a stali se součástí celé Leap party.",
      "Už nejde jen o pravidelné tréninky. Přes společnou WhatsApp skupinu pořádáme parkourové tréninky, výlety a akce.",
      "Členové Core už nemusí platit klasické členství v kroužku. Už nejsou jen účastníci. Jsou součástí party.",
    ],
  },
];

const TRAINING_ITEMS = [
  "základním parkourovým technikám",
  "přeskokům přes překážky",
  "bezpečným dopadům",
  "lezení",
  "rovnováze",
  "síle a koordinaci",
  "saltům a akrobacii podle úrovně dítěte",
  "pohybovým výzvám",
  "hrám",
  "vlastnímu kreativnímu pohybu",
];

const INCLUDED = [
  "pravidelný trénink pod vedením trenérů",
  "parkour tabulka levelů (LVL 1–5)",
  "možnost postupovat podle vlastní úrovně",
  "členství v naší parkourové komunitě",
  "základní pojištění od České rady dětí a mládeže",
];

const FAQ = [
  ["Moje dítě nikdy parkour nedělalo. Může přijít?", "Ano. Začátečníci jsou vítáni a učíme je postupně od základů."],
  ["Musí umět salto?", "Ne. Salto rozhodně není podmínkou."],
  ["Co když se dítě bojí?", "To je normální. Do žádného prvku dítě nenutíme. Každý postupuje vlastním tempem."],
  ["Je parkour bezpečný?", "Parkour stejně jako každý sport obsahuje určité riziko. Právě proto děti učíme správnou techniku, bezpečné dopady a postupný progres pod dohledem trenérů."],
  ["Co když je moje dítě už pokročilé?", "Máme samostatnou skupinu pro pokročilejší děti a možnost postupně se dostat také do Parkour týmu."],
  ["Musí chodit 2× týdně?", "Nemusí. Je možné chodit 1× týdně. Pokud se ale dítě chce výrazně zlepšovat, doporučujeme 2× týdně."],
];

function CheckIcon({ className = "text-brand" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`mt-0.5 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrimaryCta({ children }: { children: string }) {
  return (
    <Link
      href="/krouzek/prihlaska"
      className="inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}

export default function KrouzekPage() {
  return (
    <>
      <section className="overflow-hidden bg-slate-50 py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Parkour kroužky v Havlíčkově Brodě
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
                Kroužek, kde se děti neučí jen skákat přes překážky.
              </h1>
              <p className="mt-5 text-xl font-semibold text-navy">
                Učí se překonávat samy sebe.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-steel">
                <p>
                  Parkour není jen o saltech a tricích. Je to pohyb, díky
                  kterému děti získávají odvahu, učí se nevzdávat po prvním
                  neúspěchu, podporovat ostatní a postupně objevovat, co
                  všechno jejich tělo dokáže.
                </p>
                <p>A přesně takové prostředí chceme na našich trénincích vytvářet.</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-navy">
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">Pro děti od 6 do 16 let</span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">Havlíčkův Brod</span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">Začátečníci i pokročilí</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryCta>Chci si parkour vyzkoušet zdarma</PrimaryCta>
                <span className="font-semibold text-navy">První trénink je zdarma.</span>
              </div>
            </Reveal>
          </div>
          <Reveal from="right" className="relative min-h-[430px]">
            <div className="absolute left-0 top-0 aspect-[4/3] w-[82%] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/2024_08_1.jpeg"
                alt="Dítě při parkourovém tréninku"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 82vw"
              />
            </div>
            <div className="absolute bottom-0 right-0 aspect-[4/3] w-[48%] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <Image
                src="/images/leapcamp-selected/leapcamp-hero-balance.webp"
                alt="Parkourový trénink rovnováhy"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24vw, 48vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Proč Leap Parkour?</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {WHY_ITEMS.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className="rounded-3xl bg-slate-50 p-7"
              >
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <div className="mt-5 space-y-4 leading-relaxed text-steel">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <div>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Každé dítě vidí svůj vlastní progres
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-steel">
                <p>
                  Pro děti máme připravenou tabulku levelů LVL 1 až po LVL 5.
                  Dítě tak nemusí přemýšlet: „Jsem v parkouru dobrý?“
                </p>
                <p>
                  Může se podívat zpět a vidět: „Tohle jsem před měsícem
                  neuměl. A dneska to zvládnu.“
                </p>
                <p>
                  Parkour se tak promění v dlouhodobou cestu, na které dítě
                  jasně vidí svůj vlastní pokrok.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <ParkourLevels />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">3 úrovně Leap Parkour</h2>
            <p className="mt-5 leading-relaxed text-steel">
              Každé dítě může začít tam, kde právě je, a postupně se posouvat
              dál: Parkour přípravka → Parkour tým → Parkour Core.
            </p>
            <p className="mt-4 leading-relaxed text-steel">
              Nejde jen o dovednosti. Čím dál dítě postupuje, tím důležitější
              je jeho vlastní zájem, přístup a fungování v partě.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {GROUPS.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 0.06}
                className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-navy">{group.title}</h3>
                <div className="mt-4 space-y-2">
                  {group.times.map((time) => (
                    <p key={time} className="rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
                      {time}
                    </p>
                  ))}
                </div>
                <div className="mt-5 space-y-4 leading-relaxed text-steel">
                  {group.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <h2 className="text-3xl font-bold !text-white md:text-4xl">
              Parta je stejně důležitá jako samotný parkour
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-100">
              <p>
                Parkour jsme sami nezačali dělat proto, že bychom chtěli jednou
                získat medaili. Začali jsme jednoduše trénovat s kamarády.
              </p>
              <p>
                Navzájem jsme se učili nové věci, podporovali se, cestovali na
                parkourové akce a postupně kolem sebe vytvořili komunitu.
                Právě to chceme předávat dál.
              </p>
              <p>
                Na tréninku proto dítě není jen někdo, kdo čeká, až mu trenér
                ukáže další cvik. Je součástí party.
              </p>
              <p>
                Když někdo poprvé zvládne nový trik, ostatní mu fandí. Když se
                něco nepovede, zkusíme to znovu. A když někdo něco umí lépe,
                může pomoci ostatním.
              </p>
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/leapcamp-selected/leapcamp-group-listening.webp"
                alt="Parta dětí na tréninku Leap Parkour"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2024_08_krouzek.jpg"
                alt="Parkourový kroužek v Havlíčkově Brodě"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal from="right">
            <h2 className="text-3xl font-bold md:text-4xl">
              Proč jsme kroužky vůbec založili?
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-steel">
              <p>
                V roce 2015 se v Havlíčkově Brodě dala dohromady parta lidí,
                které spojovala jedna věc. Parkour.
              </p>
              <p>
                Začali jsme společně trénovat. Jezdili jsme na parkourové jamy
                po celé České republice. Cestovali. Učili se od dalších
                parkouristů. Natáčeli videa. Pořádali workshopy.
              </p>
              <p>
                A postupně jsme zjistili, že nejlepší, co můžeme se svými
                zkušenostmi udělat, je předávat je dál mladší generaci. Tak
                vznikly první parkourové kroužky v Havlíčkově Brodě.
              </p>
              <p>
                Od té doby prošly našimi tréninky stovky dětí. Dnes chceme
                pořád dělat stejnou věc: vytvářet prostředí, ve kterém děti
                spojuje pohyb, progres a dobrá parta.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal from="left">
            <h2 className="text-3xl font-bold md:text-4xl">Jak vypadá běžný trénink?</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-steel">
              <p>Každý trénink je trochu jiný.</p>
              <p>Děti se ale postupně věnují například:</p>
            </div>
            <p className="mt-6 leading-relaxed text-steel">
              Nejde nám o to, aby děti hodinu stály v řadě a čekaly na svůj
              pokus. Chceme, aby se hýbaly, zkoušely, objevovaly a bavily se.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {TRAINING_ITEMS.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.03}
                className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
              >
                <CheckIcon />
                <span className="font-medium text-navy">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-slate-50 p-8 md:p-10">
            <h2 className="text-3xl font-bold md:text-4xl">Kdy trénujeme?</h2>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand">Čtvrtek</p>
                <p className="mt-2 font-semibold text-navy">16:00–17:00 Parkour přípravka 6–12 let</p>
                <p className="mt-1 font-semibold text-navy">17:00–18:00 Parkour tým 8–16 let</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand">Pátek</p>
                <p className="mt-2 font-semibold text-navy">16:00–17:00 Parkour přípravka 6–12 let</p>
              </div>
              <p className="leading-relaxed text-steel">
                Pokud se chce dítě v parkouru výrazněji posouvat, doporučujeme
                trénink 2× týdně.
              </p>
              <p className="rounded-2xl bg-white px-5 py-4 font-semibold text-navy shadow-sm">
                Začínáme {CLUB_SEASON.startNote}.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-slate-50 p-8 md:p-10">
            <h2 className="text-3xl font-bold md:text-4xl">Kde trénujeme?</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-steel">
              <p>Během školního roku trénujeme v tělocvičně:</p>
              <p className="font-semibold text-navy">ZŠ Wolkerova, Havlíčkův Brod</p>
              <p>Když počasí dovolí a přijde léto, přesouváme část tréninků ven na:</p>
              <p className="font-semibold text-navy">Parkourové hřiště Plovárenská, Havlíčkův Brod</p>
              <p>
                Děti tak během roku poznají parkour jak v bezpečném prostředí
                tělocvičny, tak venku na skutečných parkourových překážkách.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pridat" className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Kolik kroužek stojí?</h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="font-semibold text-navy">1× týdně</p>
              <p className="mt-3 text-4xl font-extrabold text-brand">
                {CLUB_SEASON.priceOnceWeek}
              </p>
              <p className="mt-2 text-sm text-steel">/ pololetí</p>
              <p className="mt-5 leading-relaxed text-steel">
                Pro děti, které chtějí mít parkour jako jednu ze svých
                pravidelných aktivit.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="relative rounded-3xl border-2 border-brand bg-white p-8 shadow-sm">
              <span className="absolute -top-3 rounded-full bg-brand px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Doporučujeme
              </span>
              <p className="font-semibold text-navy">2× týdně</p>
              <p className="mt-3 text-4xl font-extrabold text-brand">
                {CLUB_SEASON.priceTwiceWeek}
              </p>
              <p className="mt-2 text-sm text-steel">/ pololetí</p>
              <p className="mt-5 leading-relaxed text-steel">
                Pro děti, které parkour opravdu baví a chtějí se výrazněji
                zlepšovat.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-navy">V ceně je:</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-steel">
              Více informací o pojištění najdete{" "}
              <a href={INSURANCE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
                zde
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pořád nevíte, jestli bude parkour dítě bavit?
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-steel">
              <p>Nemusíte se rozhodovat naslepo. Přijďte si první trénink jednoduše vyzkoušet.</p>
              <p>Dítě pozná trenéry. Vyzkouší si parkour. Uvidí ostatní děti. A vy zjistíte, jestli mu naše prostředí sedí.</p>
            </div>
            <p className="mt-6 text-xl font-extrabold uppercase text-navy">
              První trénink je zdarma
            </p>
            <div className="mt-8">
              <PrimaryCta>Chci rezervovat zkušební trénink</PrimaryCta>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Nejčastější otázky rodičů
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-3xl bg-white px-6 shadow-sm">
            {FAQ.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none font-semibold text-navy">
                  {question}
                </summary>
                <p className="mt-3 leading-relaxed text-steel">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold !text-white md:text-4xl">
              Možná se dítě přijde jen naučit první trik.
            </h2>
            <div className="mt-6 space-y-3 text-lg leading-relaxed text-slate-100">
              <p>A možná tu najde něco mnohem většího.</p>
              <p>Novou vášeň. Partu kamarádů. Pohyb, který ho bude opravdu bavit.</p>
              <p>
                A zkušenost, že když něco nejde napoprvé, neznamená to, že to
                nejde vůbec.
              </p>
              <p>Přijďte si Leap Parkour vyzkoušet. První trénink je zdarma.</p>
            </div>
            <div className="mt-8">
              <PrimaryCta>Chci přihlásit dítě na zkušební trénink</PrimaryCta>
            </div>
            <p className="mt-8 text-slate-200">
              Máte otázku?{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-white underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
