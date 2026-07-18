import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TimelineBlock } from "@/components/home/TimelineBlock";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Leap Parkour – Parkour komunita na Vysočině" },
  description:
    "Největší parkourová komunita na Vysočině již od roku 2015. Pořádáme parkourové kroužky v Havlíčkově Brodě a letní tábor LeapCamp plný pohybu, her a zážitků.",
};

const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]";
const BTN_SECONDARY =
  "inline-flex items-center justify-center rounded-full border-2 border-brand px-6 py-3 font-semibold text-brand transition-[background-color,color,transform] duration-200 hover:bg-brand hover:text-white active:scale-[0.98]";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal from="bottom">
              <h1 className="text-4xl font-extrabold md:text-5xl">
                Pořádáme parkourové kroužky a&nbsp;tábory
              </h1>
            </Reveal>
            <Reveal from="bottom" delay={0.08}>
              <p className="mt-5 text-lg md:text-xl">
                Největší parkourová komunita na Vysočině již od roku 2015
              </p>
            </Reveal>
            <Reveal from="bottom" delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/krouzek" className={BTN_PRIMARY}>
                  Přidej se na kroužek
                </Link>
                <Link href="/tabor" className={BTN_SECONDARY}>
                  Pojeď na tábor
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Fotka je LCP — jen krátký fade bez posunu a bez zpoždění */}
          <Reveal from="none" className="relative mx-auto w-full max-w-sm md:max-w-md">
            <div
              aria-hidden
              className="absolute -inset-3 rotate-3 rounded-3xl bg-brand/10 md:-inset-4"
            />
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/2024_08_DSC05433.jpg"
                alt="Parkourista při skoku přes překážku"
                fill
                priority
                sizes="(min-width: 768px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── O nás — příběhová timeline ───────────────────────── */}
      {/* overflow-x-clip: boční reveal (±28px) nesmí na mobilu vytvořit vodorovný scroll */}
      <section className="overflow-x-clip py-16 md:py-24">
        <div className="container-site">
          <Reveal from="bottom" className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">O nás</h2>
            <p className="mt-4 text-lg [&_strong]:font-semibold [&_strong]:text-navy">
              V roce <strong>2015</strong> se v <strong>Havlíčkově Brodě</strong> potkala parta
              cílevědomých lidí. Lidí, kteří měli vášeň pro jednu jedinou věc.
            </p>
          </Reveal>

          <ol className="relative mt-16 space-y-20 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-brand/20 md:mt-24 md:space-y-28 md:before:left-1/2">
            <TimelineBlock
              title="Parkour"
              image={{
                src: "/images/2024_08_skok.gif",
                alt: "Animace parkourového skoku",
                unoptimized: true,
              }}
            >
              <p>
                <strong>Láska k pohybu</strong> byla to, co měli společné.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Touha"
              mediaLeft
              image={{ src: "/images/2024_08_zaciname.jpg", alt: "Začátky společných tréninků" }}
            >
              <p>
                Začali společně trénovat. Neustále. Každý den. Jejich touha po tom se zlepšovat,
                stát se silnějšími, být rychlejšími, být vytrvalejšími, byla čím dál tím větší.{" "}
                <strong>Navzájem se motivovali.</strong> <strong>Učili se jeden od druhého</strong>,
                utužovali přátelství a společně rostli.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Filozofie"
              image={{ src: "/images/2024_08_wjtw.jpg", alt: "Trénink v duchu parkourové filozofie" }}
            >
              <p>
                Řídili se parkourovým mottem „<strong>être fort pour être utile</strong>“ – Buď
                silný, abys byl užitečný.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Komunita"
              mediaLeft
              image={{ src: "/images/2024_08_28.png", alt: "Parkourová komunita" }}
            >
              <p>
                Budovali komunitu podobně smýšlejících lidí. Z parkouru se stal{" "}
                <strong>životní styl</strong>. Když se pro něco doopravdy nadchnete,{" "}
                <strong>dokážete neuvěřitelné věci.</strong>
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Jamy"
              image={{ src: "/images/2024_08_27.png", alt: "Parkourový jam" }}
            >
              <p>
                Začali jezdit po celé ČR na parkourové <strong>jamy</strong> (setkání). Tam sbírali
                zkušenosti a poznatky od ostatních <strong>tracerů</strong> (parkouristů).
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Cestování"
              mediaLeft
              image={{ src: "/images/2024_08_a.jpg", alt: "Cestování dodávkou po Evropě" }}
              actions={
                <a
                  href="https://www.youtube.com/watch?v=FUO8em_0ASA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BTN_PRIMARY}
                >
                  Přehrát video
                </a>
              }
            >
              <p>
                Neznali hranic a toužili poznávat a objevovat víc.{" "}
                <strong>Sbírali zážitky a vzpomínky</strong>, kde se jen dalo.
              </p>
              <p>
                Jedna z jejich cest vedla{" "}
                <strong>dodávkou napříč Rakouskem, Švýcarskem a Německem</strong>. Vše dokumentovali
                a vytvořili toto video.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Předávání zkušeností"
              image={{ src: "/images/2024_08_34.jpg", alt: "Předávání zkušeností mladším generacím" }}
            >
              <p>
                <strong>Zájem o parkour se neustále zvětšoval.</strong> Kluci věděli, že nejlepší,
                co můžou udělat, je šířit jejich dobré myšlenky a znalosti dál. Dál k mladším
                generacím.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Kroužky"
              mediaLeft
              image={{ src: "/images/2024_08_krouzek.jpg", alt: "Parkourový kroužek" }}
              actions={
                <Link href="/krouzek" className={BTN_PRIMARY}>
                  Přidej se na kroužek
                </Link>
              }
            >
              <p>
                Tak vznikly <strong>první parkourové kroužky</strong> v Havlíčkově Brodě. Netrvalo
                dlouho a pod rukami trenérů prošly <strong>stovky dětí.</strong>
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Workshopy"
              image={{ src: "/images/2024_08_35.jpg", alt: "Parkourový workshop" }}
            >
              <p>Začali pořádat workshopy po celé ČR.</p>
            </TimelineBlock>

            <TimelineBlock
              title="Šíříme povědomí o parkouru"
              mediaLeft
              image={{ src: "/images/2024_08_25.png", alt: "Parkourové vystoupení na akci" }}
            >
              <p>
                Vystoupení na maturitních plesech, dětských dnech, eventech, menších i větších
                akcích.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Tábory"
              image={{ src: "/images/2024_08_TABOROVA2022.jpg", alt: "Společná táborová fotka LeapCamp" }}
              actions={
                <Link href="/tabor" className={BTN_PRIMARY}>
                  Přidej se k nám
                </Link>
              }
            >
              <p>
                Nejlepším rozhodnutím, které parta kluků mohla udělat, bylo založení parkourových
                táborů. Pojmenovali je <strong>LeapCamp</strong>.
              </p>
              <p>Týden plný zážitků, dobrodružství, her a trénování.</p>
            </TimelineBlock>

            <TimelineBlock
              title="Chceme hřiště v Havlíčkově Brodě"
              mediaLeft
              media={
                <div className="space-y-6">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                    <iframe
                      src="https://player.vimeo.com/video/996673641"
                      title="Projekt parkourového hřiště v Havlíčkově Brodě"
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-md">
                    <Image
                      src="/images/2024_08_H_parkour-20-1024x683-1.jpg"
                      alt="První parkourové hřiště na Vysočině v Havlíčkově Brodě"
                      fill
                      sizes="(min-width: 768px) 34rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              }
            >
              <p>
                Bylo na čase <strong>vybudovat lepší zázemí</strong> pro parkourovou komunitu.
                Vznikl tak nový projekt…
              </p>
              <p>
                Díky jejich snaze, silné vůli a podpoře města HB{" "}
                <strong>vzniklo první parkourové hřiště na Vysočině.</strong> Další sen se stal
                realitou…
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Merch"
              image={{ src: "/images/2024_08_collcet-moments.jpg", alt: "Merch Leap Parkour – Collect moments, not things" }}
              actions={
                <>
                  <a
                    href="https://www.youtube.com/watch?v=hpPxPD0iGQ4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={BTN_PRIMARY}
                  >
                    Be strong to be useful
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=P9FCYGAQTFU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={BTN_SECONDARY}
                  >
                    Collect moments, not things
                  </a>
                </>
              }
            >
              <p>
                Komunita se neustále rozšiřovala a kluci <strong>vytvořili svůj první merch</strong>{" "}
                s jejich myšlenkami, které uznávali. Natáčeli profesionální videa za účelem šíření
                těchto myšlenek:
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Parkourová hala?"
              mediaLeft
              image={{ src: "/images/2024_08_hala.jpg", alt: "Vizualizace parkourové haly" }}
              actions={
                <a
                  href="https://www.idnes.cz/jihlava/zpravy/vysocina-havlickuv-brod-parkour-hala-leap-parkour-centrum.A190522_477346_jihlava-zpravy_epsal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BTN_SECONDARY}
                >
                  Zobrazit článek
                </a>
              }
            >
              <p>
                <strong>Sny se mají plnit!</strong> Ale ne každý sen se má stát skutečností. Někdy
                se zkrátka stane, že se ocitnete na jiné cestě, než byste měli být. Náš plán
                s multifunkční halou nevyšel, za to{" "}
                <strong>nás ale nasměroval na správnou cestu.</strong>
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Muži"
              image={{ src: "/images/2024_08_32.jpg", alt: "Parta Leap Parkour v současnosti" }}
            >
              <p>
                Na začátku této cesty v roce <strong>2015</strong> to byla{" "}
                <strong>parta kluků</strong>. Nyní je to parta <strong>silných</strong>{" "}
                soběstačných mužů, kteří <strong>jsou připraveni čelit všem překážkám</strong>,
                které se jim postaví do cesty.
              </p>
            </TimelineBlock>

            <TimelineBlock
              title="Poslání"
              mediaLeft
              image={{ src: "/images/2024_08_IMG_1583.jpeg", alt: "Společná fotka party Leap Parkour" }}
              actions={
                <>
                  <Link href="/krouzek" className={BTN_PRIMARY}>
                    Kroužek
                  </Link>
                  <Link href="/tabor" className={BTN_PRIMARY}>
                    Tábor
                  </Link>
                </>
              }
            >
              <p>
                A protože každý má ve svém životě jiné poslání, tak se každý vydal svou{" "}
                <strong>vlastní životní cestou…</strong>
              </p>
              <p>Naše parta hrdinů má už teď dvě věci společné.</p>
              <p>
                <strong>1. Historii a zážitky, které jim nikdo nikdy nevezme.</strong>
                <br />
                <strong>2. Lásku pro pohyb</strong>
              </p>
              <p>
                <strong>Tady naše cesta nekončí</strong>, stále jsme tu pro vás a vytváříme aktivní
                parkourovou komunitu. <strong>Pokud i ty se k nám chceš přidat</strong> a být její
                součástí, klikni na jedno z následujících tlačítek.
              </p>
            </TimelineBlock>
          </ol>
        </div>
      </section>

      {/* ── Merch — Collect moments, not things ──────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <Reveal from="bottom">
            <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-slate-100 md:grid-cols-2">
              <div className="relative aspect-video h-full w-full md:aspect-auto md:self-stretch">
                <Image
                  src="/images/2024_08_collcet-moments.jpg"
                  alt="Merch Leap Parkour s nápisem Collect moments, not things"
                  fill
                  sizes="(min-width: 768px) 36rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold md:text-4xl">Collect moments, not things.</h2>
                <p className="mt-4 leading-relaxed">
                  Vyrábíme vlastní parkour oblečení, které prodáváme pouze osobně na táboře anebo
                  na kroužkách. Pro více informací nám prosím napište.
                </p>
                <div className="mt-8">
                  <Link href="/kontakt" className={BTN_PRIMARY}>
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
