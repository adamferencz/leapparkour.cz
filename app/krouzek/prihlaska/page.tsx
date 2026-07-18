import type { Metadata } from "next";
import { ClubForm } from "@/components/forms/ClubForm";
import { AccordionItem } from "@/components/ui/Accordion";
import { CLUB_SEASON, INSURANCE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Přihláška na kroužek",
  description:
    "Přihlaste své dítě na parkourový kroužek v Havlíčkově Brodě. Tréninky ve čtvrtek a pátek pro děti 6–16 let, první trénink zdarma.",
};

function IconCheck() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function IconBackpack() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5V4a3 3 0 0 1 6 0v1" />
      <rect x="5" y="5" width="14" height="16" rx="3" />
      <path d="M8 13h8M8 17h8" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z" />
    </svg>
  );
}

export default function KrouzekPrihlaskaPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16">
        {/* Levý sloupec — informace o kroužku */}
        <div>
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Parkourový kroužek v Havlíčkově Brodě
          </h1>
          <p className="mt-5 text-lg">
            Pravidelné tréninky parkouru pro děti od 6 do 16 let pod vedením
            zkušených trenérů. Trénujeme každý čtvrtek a pátek.{" "}
            {CLUB_SEASON.startNote}.
          </p>

          <ul className="mt-6 space-y-2.5">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
              <span>Pro děti od 6 do 16 let</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
              <span>Tréninky ve čtvrtek a pátek</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
              <span>{CLUB_SEASON.venue}</span>
            </li>
          </ul>

          {/* Ceník */}
          <h2 className="mt-12 text-3xl font-bold md:text-4xl">Ceník</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-sm font-medium text-steel">1x týdně</p>
              <p className="mt-1 text-2xl font-bold text-navy">
                {CLUB_SEASON.priceOnceWeek}
              </p>
              <p className="mt-1 text-sm text-steel">za pololetí</p>
            </div>
            <div className="relative rounded-2xl bg-slate-100 p-6">
              <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                Doporučujeme
              </span>
              <p className="text-sm font-medium text-steel">2x týdně</p>
              <p className="mt-1 text-2xl font-bold text-navy">
                {CLUB_SEASON.priceTwiceWeek}
              </p>
              <p className="mt-1 text-sm text-steel">za pololetí</p>
            </div>
          </div>

          {/* Akordeony */}
          <div className="mt-10 space-y-3">
            <AccordionItem title="Co cena zahrnuje" icon={<IconCheck />}>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Tréninky pod vedením zkušených trenérů</li>
                <li>Parkour deník zdarma</li>
                <li>
                  Základní{" "}
                  <a
                    href={INSURANCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand hover:underline"
                  >
                    pojištění ČRDM
                  </a>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Co si vzít s sebou" icon={<IconBackpack />}>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Vodu</li>
                <li>Oblečení dle počasí</li>
                <li>Pevnou obuv</li>
                <li>Přezuvky do tělocvičny</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Storno podmínky" icon={<IconDocument />}>
              <div className="space-y-3">
                <p>
                  Rádi bychom Vás informovali o našich pravidlech týkajících se
                  storno poplatků a vrácení uhrazených částek v případě zrušení
                  účasti na našich parkour kroužcích. Rádi bychom objasnili,
                  jaký vliv mají různé důvody storna na možnost vrácení peněz.
                </p>
                <p className="font-semibold text-navy">
                  Obecná pravidla storno poplatků
                </p>
                <ol className="list-decimal space-y-2 pl-5 font-semibold text-navy">
                  <li>
                    Storno po zaplacení a do 2 týdnů, kdy jste měli možnost
                    přijít na kroužek. V takovém případě odečteme odchozené
                    tréninky a 10 % na účetnictví/administrativu. Zbytek peněz
                    Vám můžeme vrátit.
                  </li>
                  <li>
                    Storno po zaplacení a od 2 týdnů, kdy jste měli možnost
                    přijít na kroužek, jsou peníze nevratné.
                  </li>
                </ol>
                <p className="font-semibold text-navy">Výjimky</p>
                <p>
                  <strong className="text-navy">
                    1. Úraz nebo vážné zdravotní důvody:
                  </strong>
                  <br />V případě úrazu nebo vážného zdravotního problému, který
                  Vám znemožní účast na kroužku, Vás žádáme o zaslání lékařského
                  potvrzení. V takovém případě zvážíme individuální přístup a
                  možnost částečného vrácení peněz nebo převedení platby na jiný
                  termín.
                </p>
                <p>
                  <strong className="text-navy">2. Jiné důvody:</strong>
                  <br />
                  Pokud je důvodem storna jiná situace (např. osobní problémy,
                  změna plánů atd.), platí standardní pravidla storno poplatků
                  uvedená výše. Při stornech z těchto důvodů bude vrácení peněz
                  možné pouze v souladu s těmito pravidly.
                </p>
                <p>
                  Děkujeme za pochopení a v případě jakýchkoliv dotazů nebo
                  potřeby specifických informací nás neváhejte kontaktovat.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="První trénink zdarma" icon={<IconStar />}>
              <p>
                Nevíte, jestli bude parkour vaše dítě bavit? První trénink je u
                nás zdarma a nezávazně. Přijďte si to vyzkoušet — stačí vyplnit
                přihlášku a na prvním tréninku se uvidíme. Platbu řešíme až
                poté, co se rozhodnete pokračovat.
              </p>
            </AccordionItem>
          </div>
        </div>

        {/* Pravý sloupec — sticky formulář */}
        <div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg md:p-8 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">
              Přihláška na kroužek — {CLUB_SEASON.label}
            </h2>
            <p className="mt-2 text-sm text-steel">
              Prosíme o vyplnění formuláře. V případě registrace více dětí
              vyplňte formulář zvlášť.
            </p>
            <div className="mt-6">
              <ClubForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
