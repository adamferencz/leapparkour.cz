import type { Metadata } from "next";
import Link from "next/link";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Další informace a podmínky",
  description:
    "Pravidla storno poplatků a vrácení uhrazených částek při zrušení účasti na parkourových kroužcích Leap Parkour.",
  path: "/krouzek/informace",
  image: "/images/2024_08_krouzek.jpg",
  imageAlt: "Informace a podmínky parkourových kroužků Leap Parkour",
});

function DocumentIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7.5-4.9-9.5-9.2C1 8.6 3 5.5 6.5 5.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 3.5 0 5.5 3.1 4 6.3C19.5 16.1 12 21 12 21z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KrouzekInformacePage() {
  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 className="text-center text-4xl font-extrabold md:text-5xl">
            Další informace a podmínky
          </h1>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 text-center">
            Rádi bychom Vás informovali o našich pravidlech týkajících se storno
            poplatků a vrácení uhrazených částek v případě zrušení účasti na
            našich parkourových kroužcích. Rádi bychom objasnili, jaký vliv mají
            různé důvody storna na možnost vrácení peněz.
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          <Reveal delay={0.1}>
          <AccordionItem
            title="Obecná pravidla storno poplatků"
            icon={<DocumentIcon />}
            defaultOpen
          >
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                <strong className="text-navy">
                  Storno po zaplacení a do 2 týdnů, kdy jste měli možnost
                  přijít na kroužek.
                </strong>{" "}
                V takovém případě odečteme odchozené tréninky a 10 % na
                účetnictví/administrativu. Zbytek peněz Vám můžeme vrátit.
              </li>
              <li>
                <strong className="text-navy">
                  Storno po zaplacení a od 2 týdnů, kdy jste měli možnost
                  přijít na kroužek
                </strong>{" "}
                — peníze jsou nevratné.
              </li>
            </ol>
          </AccordionItem>
          </Reveal>

          <Reveal delay={0.15}>
          <AccordionItem title="Výjimky" icon={<HeartIcon />}>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-navy">
                  1. Úraz nebo vážné zdravotní důvody
                </p>
                <p className="mt-1">
                  V případě úrazu nebo vážného zdravotního problému, který Vám
                  znemožní účast na kroužku, Vás žádáme o zaslání lékařského
                  potvrzení. V takovém případě zvážíme individuální přístup a
                  možnost částečného vrácení peněz nebo převedení platby na
                  jiný termín.
                </p>
              </div>
              <div>
                <p className="font-semibold text-navy">2. Jiné důvody</p>
                <p className="mt-1">
                  Pokud je důvodem storna jiná situace (např. osobní problémy,
                  změna plánů atd.), platí standardní pravidla storno poplatků
                  uvedená výše. Při stornech z těchto důvodů bude vrácení peněz
                  možné pouze v souladu s těmito pravidly.
                </p>
              </div>
            </div>
          </AccordionItem>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-10 text-center">
            Děkujeme za pochopení a v případě jakýchkoliv dotazů nebo potřeby
            specifických informací nás neváhejte kontaktovat na{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 text-center">
            <Link
              href="/krouzek/prihlaska"
              className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              Zpět na přihlášku
            </Link>
            <p className="mt-4 text-sm text-steel">
              <Link
                href="/krouzek"
                className="inline-block py-3 font-medium text-brand underline-offset-4 hover:underline"
              >
                ← Vše o kroužcích
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
