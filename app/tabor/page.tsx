import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CAMP } from "@/lib/config";
import { YouTube } from "@/components/ui/YouTube";

export const metadata: Metadata = {
  title: "LeapCamp — letní parkourový tábor",
  description: `${CAMP.label} — ${CAMP.edition} parkour-herního tábora na Vysočině pro děti ${CAMP.ageRange}. Termín ${CAMP.dates}, ${CAMP.venue}.`,
};

const ctaButton =
  "inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark";

/** Tohle tě čeká — odrážky z původní landing page */
const PROGRAM_ITEMS = [
  "Tréninky parkouru na profi překážkách – bedny, hrazdy, raily a další",
  "Skákání na trampolíně a adrenalinové skoky do vody",
  "Týmové hry v přírodě s bodováním a výzvami",
  "Napínavý táborový příběh, který tě bude provázet celý týden",
  "Netradiční výlety za dobrodružstvím",
  "Vtipný a dobře promyšlený příběh s Asterixem a Obelixem",
  "Soutěže a celotáborové bodování včetně rozdělení do týmů",
  "Vyzkoušení si různých sportů, abys věděl, co tě baví",
];

/** Co tě čeká — seznam u ceny a přihlášky */
const SIGNUP_ITEMS = [
  ["Týden plný zábavy a nejlepší příležitost se ", "zlepšit v parkouru", "."],
  ["Spoustu ", "her a sportů", ", které si budeš moct vyzkoušet."],
  ["Trenéři, co vedou vlastním příkladem a mají ", "více jak 8 let zkušeností", "."],
  ["", "Pedagogický dozor a zdravotník", ", co se bude starat o tvou bezpečnost."],
  ["Táborové ", "video a fotky", "."],
  ["Propracovaný ", "táborový příběh", "."],
  ["", "Bodování po týmech", "."],
] as const;

const GALLERY = [
  { src: "/images/2025_11_3.jpg", alt: "Fotka z tábora — parkourový trénink" },
  { src: "/images/2025_11_4.jpg", alt: "Fotka z tábora — skoky na překážkách" },
  { src: "/images/2025_11_5.jpg", alt: "Fotka z tábora — táborové hry" },
  { src: "/images/2025_11_6.jpg", alt: "Fotka z tábora — společné aktivity" },
  {
    src: "/images/2025_11_DSC02578-ve-velke-velikosti.jpeg",
    alt: "Fotka z tábora — parkourové překážky",
  },
  { src: "/images/2024_08_spolecna.jpg", alt: "Společná fotka z tábora" },
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

function CheckIcon() {
  return (
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
  );
}

export default function TaborPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              {CAMP.label} · {CAMP.edition}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
              Pojeď s námi na LeapCamp
            </h1>
            <p className="mt-3 text-lg font-semibold text-navy">Parkour | hry | zábava</p>
            <p className="mt-6 leading-relaxed">
              Když jsme před 10 lety začínali jako parta nadšenců do pohybu, nevěděli jsme,
              kam nás to zavede. Chtěli jsme jen dětem předat naše zkušenosti a nadšení.
            </p>
            <p className="mt-4 leading-relaxed">
              Dnes je LeapCamp víc než jen tábor. Je to místo, kde každý vedoucí dává kus
              sebe. Jsme neziskovka, ale hlavně komunita lidí, kteří to dělají po svém a tak,
              aby to byla ta nejlepší akce za celý rok!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/tabor/prihlaska" className={ctaButton}>
                Přihlásit se
              </Link>
              <span className="text-sm text-steel">
                {CAMP.dates} · {CAMP.ageRange}
              </span>
            </div>
          </div>
          <div>
            <YouTube id="4JbXQMijJqk" title={`${CAMP.label} — úvodní video`} />
            <div className="mt-5 flex flex-wrap gap-2">
              {["Sport", "Hry", "Kámoši", "Koupačky"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-steel">
              Věříme, že když se spojí správní lidé, vzniká zážitek, na který se nezapomíná.
              Čeká na tebe již {CAMP.edition} parkour-herního tábora na Vysočině pro děti{" "}
              {CAMP.ageRange}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Táborový příběh */}
      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/2025_11_asterix.png"
              alt="Asterix — ilustrace táborového příběhu"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Táborový příběh
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Skupina Leap Parkour je v obležení
            </h2>
            <p className="mt-6 leading-relaxed">
              Přepadly nás <strong className="text-navy">římské legie</strong> a jediná
              šance, jak se zachránit, je{" "}
              <strong className="text-navy">objevit tajemství kouzelného lektvaru</strong>!
            </p>
            <p className="mt-4 leading-relaxed">Ale budeme potřebovat i tvou pomoc…</p>
            <Link href="/tabor/prihlaska" className={`${ctaButton} mt-8`}>
              Zjistit víc
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Kdy a kde */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Kdy a kde?</h2>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <p className="font-semibold text-navy">Termín</p>
                  <p>{CAMP.dates}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <p className="font-semibold text-navy">Místo</p>
                  <p>{CAMP.venue}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <p className="font-semibold text-navy">Pro koho</p>
                  <p>
                    Tábor je určen pro začátečníky i pokročilé ve věku {CAMP.ageRange}.
                    (minimální věk 8 let)
                  </p>
                </div>
              </li>
            </ul>
            <Link href="/tabor/prihlaska" className={`${ctaButton} mt-8`}>
              Chci jet
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/2025_11_6.jpg"
              alt="Fotka z táborového střediska Radost"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 4. Co tě čeká */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Co zažiješ na tomhle campu?</h2>
            <p className="mt-4 leading-relaxed">
              Učíme pohyb tím nejpřirozenějším způsobem – vlastním příkladem. Naši vedoucí
              parkour žijí. Skáčeme s dětmi, překonáváme výzvy, soutěžíme s nimi. Nejsme
              v roli „dozor“, ale parťáci a vzory.
            </p>
          </div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2024_08_DSC02487-min.jpg"
                alt="Trénink parkouru na táboře"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Tohle tě čeká</h3>
              <ul className="mt-6 space-y-3">
                {PROGRAM_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Parkourový deník + vybavení */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site space-y-16 md:space-y-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2025_11_denik.jpg"
                alt="Parkourový deník"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Dostaneš parkourový deník</h2>
              <p className="mt-6 leading-relaxed">
                S jeho pomocí se naučíš všechny triky a salta rychle. Hlavně tě čeká
                i speciální workshop na „backflip“ (salto vzad).
              </p>
            </div>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/2025_11_vlajka-e1763665867358.jpg"
                  alt="Táborová vlajka"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold md:text-4xl">
                Pokud máš rád parkour, tak si zamiluješ
              </h2>
              <p className="mt-6 leading-relaxed">
                Velký airtrack, 2 trampolíny, bedny, lešení, žíněnky, duchna a spousty
                dalších překážek. (trenéři věnují celý den tomu, aby takové zázemí pro tebe
                připravili)
              </p>
              <Link href="/tabor/prihlaska" className={`${ctaButton} mt-8`}>
                Chci jet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Další sporty */}
      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Vyzkoušíš si i další různé sporty
            </h2>
            <p className="mt-6 leading-relaxed">
              Již to nebude jen o parkouru. Bude to o tom zkusit si co nejvíc, abys zjistil,
              co za sporty tě baví nejvíce.
            </p>
            <p className="mt-4 leading-relaxed">
              Sporty, které chceš vyzkoušet, si nově vybereš{" "}
              <strong className="text-navy">přímo v přihlášce</strong>. Sporty, o které bude
              zájem největší, zařadíme do našeho programu.
            </p>
            <p className="mt-4 leading-relaxed">
              Např.: bojové sporty, lukostřelba, frisbee, natáčení videí, NERF zbraně,
              fotbal a spoustu dalších.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/2025_11_GOPR1033.jpg"
              alt="Zkoušení dalších sportů na táboře"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 7. Fotogalerie */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Fotogalerie</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((photo) => (
              <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Trenéři */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Trenéři</h2>
              <p className="mt-6 leading-relaxed">
                A samozřejmě jako každý rok na tebe bude čekat skvělá parta trenérů. Parta,
                co miluje pohyb a co jde dětem vlastním příkladem. Tohle jsme my…
              </p>
              <p className="mt-4 font-semibold text-navy">
                Parta 15 vedoucích včetně pedagogického dozoru a zkušeného zdravotníka.
              </p>
              <p className="mt-4 leading-relaxed">
                Díky tak velkému týmu se můžeme každému dítěti věnovat naplno. Takže menší
                skupinky a individuální přístup.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/2024_08_32.jpg"
                alt="Parta trenérů LeapCampu"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

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
                aby LEAP CAMP byl pro děti zážitkem, na který jen tak nezapomenou.“
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-bold text-navy">David Pospíchal</p>
                <p className="text-sm text-steel">
                  Vize zakladatele a hlavního vedoucího tábora
                </p>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* 9. Recenze Google */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
              >
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed">
                  {review.text}
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-navy">
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Cena a přihláška */}
      <section id="prihlaska" className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-10 rounded-3xl bg-navy p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Chceš jet s námi na LeapCamp?
              </h2>
              <p className="mt-6 text-lg text-slate-300">
                {CAMP.label} · {CAMP.dates}
              </p>
              <p className="mt-2 text-4xl font-extrabold text-white">
                CENA: {CAMP.price}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link href="/tabor/prihlaska" className={ctaButton}>
                  Přihlásit se
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
              <h3 className="text-xl font-bold text-white">Co tě čeká</h3>
              <ul className="mt-6 space-y-3 text-slate-200">
                {SIGNUP_ITEMS.map(([before, bold, after]) => (
                  <li key={bold} className="flex items-start gap-3">
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
                    <span>
                      {before}
                      <strong className="text-white">{bold}</strong>
                      {after}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Minulé ročníky */}
      <section className="pb-16 md:pb-24">
        <div className="container-site">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Minulé ročníky</h2>
          <p className="mt-4 text-center">
            Podívejte se, jak vypadaly naše předchozí LeapCampy.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAST_VIDEOS.map((video) => (
              <YouTube key={video.id} id={video.id} title={video.title} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
