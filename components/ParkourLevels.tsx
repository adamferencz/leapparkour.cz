"use client";

import { useState } from "react";

type ParkourLevel = {
  n: number;
  name: string;
  desc: string;
  cats: Array<[string, string]>;
  reward: string;
};

const HEAT = [
  "#7ea8c4",
  "#63b6b0",
  "#7cb87a",
  "#c9b74e",
  "#e0a341",
  "#e07b3c",
  "#d6503f",
  "#9b4bc9",
];

const LEVELS: ParkourLevel[] = [
  {
    n: 1,
    name: "Nováček",
    desc: "Zde každý začíná svou parkour cestu. Všechny triky se zde naučíš velmi rychle. Stanoviště stačí většinou absolvovat, rozumět jim a můžeš hned postoupit dál.",
    cats: [
      ["Precision", "Standing, plyo, running, z jedné nohy, různé výškové levely, crane, stride, balance."],
      ["Landing", "Parakotoul, ruce na zem, z různé výšky, různé povrchy, do matrací i na tvrdou zem."],
      ["Vaulty", "Vysvětlení splitu, kong vs monkey, two hander, speed, lazy, thief, kash, turn vault, gate vault."],
      ["Frontflip", "Kotoul, diveroll, progres řada na front flip."],
      ["Workout", "Dokáže se zpevnit v kliku, vzporu, železný jezdec, dřep."],
    ],
    reward: "Certifikát Lvl. 1",
  },
  {
    n: 2,
    name: "Průzkumník",
    desc: "Na této úrovni už umíš základy parkouru a je potřeba se v nich ještě zlepšit. Je to opět jednoduché. Stanoviště absolvuj a měl bys umět základní dovednosti.",
    cats: [
      ["Stěna", "Cat leap, tik tak, skok do cat leapu, wall climb, muscle up, cat to cat, cat to precision, préco ve výšce."],
      ["Workout", "1× shyb (holky s gumou), 10× klik (holky 7 kliků), dřep na jedné noze s kolébkou."],
      ["Vaulty", "Dive kong, dash, revers 360, under bar, palmspin o roh."],
      ["Flipy", "Zvládne se přetočit s dopomocí na duchně, pistol roll s výskokem (příprava na sideflip)."],
      ["Stojka", "Umí se sám zpevnit u zdi ve stojce, umí se vykopnout, vydrží ve stojce na hlavě 30 s, frogstand 15 s."],
    ],
    reward: "Certifikát Lvl. 2",
  },
  {
    n: 3,
    name: "Traceur",
    desc: "Nyní se můžeš pustit do učení náročnějších technik. Zde teprve začíná ten pravý parkour. Piluješ salta a techniky, které málokdo z tvého okolí umí. Dovednosti bys měl jakž takž ovládat.",
    cats: [
      ["Tricking", "J-step, cheat gainer, hvězda, rondát, hvězda s jednou rukou, palm spin."],
      ["Kopy", "Round kick, tornado kick, hook, scoot."],
      ["Vaulty", "Double kong, kong do rollu, kong z výšky do pod levelu, shoulder vault."],
      ["Flipy", "Front, side, backflip na airtrack nebo odrazový můstek. Skočit na nohy, klidně na matraci/duchnu."],
      ["Hrazda", "Přetočení, výmyk z kroku, laché do precision, laché otočky, cheat swing gainer."],
    ],
    reward: "Certifikát Lvl. 3 + šátek",
  },
  {
    n: 4,
    name: "Zkušený traceur",
    desc: "Na této úrovni děláš parkour minimálně rok, začínáš posilovat a náročnější dovednosti plně ovládáš. Poprvé máš zodpovědnost splnit všechny dovednosti na 100 %.",
    cats: [
      ["Parkour", "Préco 8 stop, running préco 10 stop, laché do préca 7 stop, kong do préca 4 stopy (všechno stick)."],
      ["Tricking", "Webster z můstku na nohy, kip up na nohy, přemet o hlavu nebo o ruce."],
      ["Tricking 2", "Makako style, klasické makako (klidně stranou), wallspin o mírně nakloněnou stěnu."],
      ["Workout", "1× muscle up na zdi, 5× dřep na jedné noze (možnost kotoulu), výmyk z visu, 8× shyb (holky 4×)."],
      ["Freerun", "Frontflip, backflip, sideflip můstek bez trampolíny, s malou žíněnkou na nohy."],
    ],
    reward: "Certifikát Lvl. 4",
  },
  {
    n: 5,
    name: "Bojovník",
    desc: "V parkouru jsi již pokročilý. Hlavně zařaď posilování a vytrvalost, to tě posune dál. Zde se budeš posouvat pomalu, proto obzvlášť platí heslo být a vytrvat. Schvaluje ještě 1 trenér.",
    cats: [
      ["Parkour", "Préco 8,5 stopy, running préco 11 stop, laché do préca 8 stop, kong do préca 5 stop, laché přetáčení, výskok na tyčku."],
      ["Tricking", "A-kick nebo b-kick nebo frisbee, webster na trávě na nohy, přemet o ruce na nohy."],
      ["Workout", "Běh 10 km."],
      ["Freerun", "Backflip na zemi bez žíněnky, front/side jen na trávě (dopad na nohy), frontflip 180."],
      ["Freerun 2", "Rovné makako nebo přemet dozadu, contact side nebo contact front na trávě, gymnastický nebo silový muscle up."],
      ["Freerun 3", "Wallflip / palm flip / swing gainer, jistota s malou žíněnkou a dát na nohy, pasha roll 360."],
    ],
    reward: "Certifikát Lvl. 5 + triko Bojovníka",
  },
  {
    n: 6,
    name: "Zkušený bojovník",
    desc: "Úroveň RAW. Vše by se mělo skočit na tvrdé podložce ideálně venku a na napnuté nohy. Minimálně 3 roky tréninku. Tuto úroveň a výš musí schválit minimálně 2 lidé.",
    cats: [
      ["Parkour", "Préco 9,5 stopy, running préco 13 stop, laché 10 stop, kong do préca 6,5 stopy, cat to cat (5×), buttswing 5 stop, 11 stop skok do cat leap."],
      ["Tricking", "B-twist / cork / backflip 360 ze scoot, a-twist z výšky, 3 flicky za sebou."],
      ["Workout", "Bring Sally na loktech celou písničku, 10× muscle up na zdi bez pauzy."],
      ["Freerun", "Rondát backflip, hvězda side/front/full, frontflip 540 z trampolíny, double side/back/front na trampolíně."],
      ["Freerun 2", "Front na napnuté nohy na trávě, wall side, wall front, wall spin na příkré zdi, helicopter nebo tunel z výšky na trávu."],
      ["Freerun 3", "Préco 360, 6 stop, backflip layout na zemi nebo gainer nebo back precision."],
    ],
    reward: "Certifikát Lvl. 6",
  },
  {
    n: 7,
    name: "Hrdina",
    desc: "Úroveň pravidelného a důsledného tréninku. Dostat se sem stojí hodně úsilí, energie i času. Řeš i stravu a regeneraci. Stačí splnit 5 z 6. Trénink minimálně 5 let.",
    cats: [
      ["Parkour", "Préco 10 stop, running préco 15 stop, laché do levelu (-2 stopy), kong do préca 8 stop, stridy na tyčkách."],
      ["Tricking", "Arabien, backflip 720 na trampolíně, scoot/rondát double full, 3 flicky a backflip, cody na trampolíně nebo cast flip."],
      ["Workout", "Raw workout requirement lvl. 0."],
      ["Freerun", "Double backflip do vody, double front/side/back venku z výšky na žíněnky."],
      ["Freerun 2", "Swing gainer 360 nebo swing front a swing side na trávu, laché otočka 360 nebo wallflip 360."],
      ["Video", "Minimálně 2 minuty showreel video, všechny skoky na úrovni 7 schválí alespoň 3 lidé."],
    ],
    reward: "Certifikát Lvl. 7 + Leap pohár",
  },
  {
    n: 8,
    name: "Legenda",
    desc: "Úroveň srovnatelná se sportovci na světové parkourové scéně. Triky a dovednosti, které nejsou běžné pro většinu parkouristů. Vyžaduje minimálně 8 let tréninku. Vše je potřeba skočit venku na real spots.",
    cats: [
      ["Parkour", "Running préco 17 stop v 5 m+, laché do levelu (-1 stopa), kong do préca 9 stop ve 2 m+, descent 3 patra."],
      ["Freerun", "Castflip, swingcastflip nebo worm flip venku, double cork nebo scoot to backflip 720 na trávě, giants na hrazdě."],
      ["Freerun 2", "Kong gainer venku nebo swing gainer regrab, dashbomb venku, 2 různé doubleflip venku na trávu."],
      ["Manpower", "Skočit manpower."],
      ["Video", "Minimálně 2 minuty showreel video, všechny skoky na úrovni 8 schválí alespoň 3 lidé."],
    ],
    reward: "Certifikát Lvl. 8 + Leap tajemství",
  },
];

export default function ParkourLevels() {
  const [openLevel, setOpenLevel] = useState(1);

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white px-4 py-8 text-navy shadow-sm sm:px-6 md:px-8 md:py-12 lg:px-10">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          Progress system
        </p>
        <h3 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
          Parkour cesta<br />od nováčka k <em className="font-normal">legendě</em>
        </h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-steel lg:justify-self-end">
          Osm úrovní. Každou odemkneš, když zvládneš dané dovednosti. Rozklikni
          level a uvidíš, co v jaké kategorii musíš splnit.
        </p>
      </div>

      <div className="border-t border-slate-200">
        {LEVELS.map((level) => {
          const heat = HEAT[level.n - 1];
          const isOpen = openLevel === level.n;

          return (
            <div key={level.n} className="border-b border-slate-200">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenLevel(isOpen ? 0 : level.n)}
                className="grid w-full grid-cols-[28px_1fr_auto] items-center gap-3 px-1 py-5 text-left transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-brand sm:grid-cols-[40px_1fr_auto] md:gap-5 md:px-4 md:py-6"
              >
                <span
                  className="relative text-lg font-extrabold tabular-nums md:text-xl"
                  style={{ color: heat }}
                >
                  <span
                    className="absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: heat }}
                  />
                  {String(level.n).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: heat }}
                  >
                    Level {level.n}
                  </span>
                  <span className="mt-1 block break-words text-xl font-bold leading-tight md:text-2xl">
                    {level.name}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden max-w-36 text-right text-xs leading-5 text-[#76736c] sm:block">
                    {level.reward}
                  </span>
                  <svg
                    className={`h-5 w-5 text-[#a8a49c] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="pb-8 pl-3 sm:pl-8 md:pl-16">
                  <div className="border-l-2 py-1 pl-4 sm:pl-5" style={{ borderColor: heat }}>
                    <p className="max-w-3xl text-sm leading-7 text-steel">
                      {level.desc}
                    </p>
                    <div className="mt-6 grid overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-3">
                      {level.cats.map(([name, req]) => (
                        <div key={`${level.n}-${name}`} className="min-w-0 bg-white p-5">
                          <p
                            className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                            style={{ color: heat }}
                          >
                            {name}
                          </p>
                          <p className="mt-2 break-words text-sm leading-6 text-steel">{req}</p>
                        </div>
                      ))}
                      <div className="min-w-0 p-5 sm:col-span-2 xl:col-span-3" style={{ backgroundColor: `${heat}18` }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a8a49c]">
                          Odměna
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6">{level.reward}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
