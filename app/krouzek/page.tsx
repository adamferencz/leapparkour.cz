import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { YouTube } from "@/components/ui/YouTube";
import { Reveal } from "@/components/ui/Reveal";
import { CLUB_SEASON, SITE, INSURANCE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kroužky",
  description:
    "Parkourové kroužky v Havlíčkově Brodě pro děti 6–16 let. Tréninky pod dohledem zkušených trenérů, první trénink zdarma.",
};

const GEAR_LIST = [
  "Čistá voda na pití (pokud možno ne sladké limonády)",
  "Oblečení dle počasí, pevná obuv",
  "Do tělocvičny doporučujeme přezuvky (příp. je možnost trénovat naboso na vlastní zodpovědnost)",
];

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
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KrouzekPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h1 className="text-4xl font-extrabold md:text-5xl">Kroužky</h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-lg text-steel md:text-xl">
                Parkourové kroužky v Havlíčkově Brodě pro děti 6–16 let.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8">
                <Link
                  href="/krouzek/prihlaska"
                  className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
                >
                  Přihlásit se na kroužek
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.24} className="mx-auto mt-12 max-w-3xl">
            <YouTube id="S73hmD_kbgA" title="Parkourový kroužek Leap Parkour" />
          </Reveal>
        </div>
      </section>

      {/* Kdy se trénuje? */}
      <section className="overflow-x-clip py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal from="left">
                <h2 className="text-3xl font-bold md:text-4xl">Kdy se trénuje?</h2>
                <p className="mt-5 font-semibold text-navy">
                  Pojď trénovat správným a bezpečným způsobem pod dohledem
                  zkušených trenérů.
                </p>
                <p className="mt-4">
                  Tréninky probíhají každý{" "}
                  <strong className="text-navy">
                    čtvrtek od 16:00 do 18:00 a pátek od 16:00 do 17:00
                  </strong>
                  . V případě, že se chcete zlepšit, výrazně doporučujeme chodit
                  2× týdně.
                </p>
                <div className="mt-6 rounded-2xl bg-brand/10 px-6 py-5">
                  <p className="text-navy">
                    Váháte, jestli je parkour pro vás? Přijďte si to vyzkoušet —{" "}
                    <strong className="font-bold text-brand">
                      první trénink máte ZDARMA!
                    </strong>
                  </p>
                </div>
              </Reveal>

              <Reveal from="left" delay={0.08}>
                <h3 className="mt-10 text-xl font-bold">
                  Kroužek je rozdělen na skupiny:
                </h3>
                <ul className="mt-4 space-y-3">
                  {CLUB_SEASON.terms.map((term) => (
                    <li
                      key={term.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-100 px-6 py-4"
                    >
                      <div>
                        <p className="font-semibold text-navy">{term.label}</p>
                        <p className="text-sm text-steel first-letter:uppercase">
                          {term.level}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand">
                        {term.age}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal
              from="right"
              delay={0.08}
              className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/2024_08_1.jpeg"
                alt="Trénink parkouru na kroužku"
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kde trénujeme */}
      <section className="overflow-x-clip bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal
              from="left"
              className="relative order-last aspect-video w-full overflow-hidden rounded-3xl lg:order-first"
            >
              <Image
                src="/images/2024_08_WOLKEROVA.jpg"
                alt="Tělocvična ZŠ Wolkerova v Havlíčkově Brodě"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal from="right" delay={0.08}>
              <h2 className="text-3xl font-bold md:text-4xl">Kde trénujeme</h2>
              <p className="mt-5">
                <strong className="text-navy">{CLUB_SEASON.startNote}</strong> v
                tělocvičně. V létě se přesouváme ven na parkourové hřiště.
              </p>
              <div className="mt-6 flex items-start gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-brand"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <p className="font-medium text-navy">{CLUB_SEASON.venue}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Co si vzít s sebou? */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center text-3xl font-bold md:text-4xl">
                Co si vzít s sebou?
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {GEAR_LIST.map((item, i) => (
                <li key={item}>
                  <Reveal
                    delay={i * 0.06}
                    className="flex items-start gap-3 rounded-2xl bg-slate-100 px-6 py-4"
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.18}>
              <p className="mt-6 text-center">
                Další informace a podmínky najdete{" "}
                <Link
                  href="/krouzek/informace"
                  className="font-semibold text-brand underline-offset-4 hover:underline"
                >
                  ZDE
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Jak to u nás na kroužku funguje? */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Jak to u nás na kroužku funguje?
            </h2>
            <p className="mt-5 font-semibold text-navy">
              Každý účastník kroužku od nás dostane ZDARMA i parkour deník, kde
              má možnost si splnit lvl.1 – lvl.5 dle naší tabulky.
            </p>
            <p className="mt-4">
              Pro splnění je třeba prokázat, že účastník umí určité dovednosti
              a techniky, jak je vidět v tabulce.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-white p-2 shadow-sm md:p-4">
            <Image
              src="/images/2024_08_Snimek-obrazovky-2024-08-15-v-22.16.54.png"
              alt="Tabulka úrovní lvl.1 – lvl.5 parkour deníku"
              width={1694}
              height={1248}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto w-full rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Kolik stojí kroužky? */}
      <section id="pridat" className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Kolik stojí kroužky?
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
            <Reveal className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-navy">Trénování 1× týdně</p>
              <p className="mt-3 text-4xl font-extrabold text-brand">
                {CLUB_SEASON.priceOnceWeek}
              </p>
              <p className="mt-2 text-sm text-steel">cena za pololetí</p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="relative flex flex-col items-center rounded-3xl border-2 border-brand bg-white p-8 text-center shadow-sm"
            >
              <span className="absolute -top-3 rounded-full bg-brand px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Doporučujeme
              </span>
              <p className="font-semibold text-navy">Trénování 2× týdně</p>
              <p className="mt-3 text-4xl font-extrabold text-brand">
                {CLUB_SEASON.priceTwiceWeek}
              </p>
              <p className="mt-2 text-sm text-steel">cena za pololetí</p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-10 text-center">
              <Link
                href="/krouzek/prihlaska"
                className="inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
              >
                Přihlásit se na kroužek
              </Link>
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl bg-slate-100 px-6 py-6 text-center md:px-10">
            <p>
              V ceně kroužku mají děti základní pojištění od České rady dětí a
              mládeže. Více informací o pojištění{" "}
              <a
                href={INSURANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                ZDE
              </a>
              . Doporučeno je mít i pojištění vlastní.
            </p>
            <p className="mt-4">
              V případě jakýchkoli dotazů se nás můžete na cokoliv zeptat zde:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
