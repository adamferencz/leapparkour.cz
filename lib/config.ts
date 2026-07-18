/**
 * Centrální konfigurace — termíny, ceny a texty, které se mění každý rok.
 * Při otevření nové sezóny stačí upravit tento soubor.
 */

export const SITE = {
  name: "Leap Parkour",
  legalName: "LeapParkour z.s.",
  ico: "07195320",
  domain: "leapparkour.cz",
  email: "leapparkour@seznam.cz",
  address: "Práčat 1886, Havlíčkův Brod",
  instagram: "https://www.instagram.com/leapparkour/",
  facebook: "https://www.facebook.com/share/YG84oj6nvVgR4NvM/",
  youtube: "https://www.youtube.com/@LeapParkour",
} as const;

/** Kroužky — sezóna, na kterou se aktuálně přihlašuje */
export const CLUB_SEASON = {
  id: "jaro-2027",
  label: "jaro 2027",
  /** TODO: upřesnit datum zahájení pololetí 2027 */
  startNote: "Začínáme ve čtvrtek 4. 2. a v pátek 5. 2. 2027",
  venue: "ZŠ Wolkerova (tělocvična), v létě parkourové hřiště Plovárenská, Havlíčkův Brod",
  priceOnceWeek: "2 950 Kč",
  priceTwiceWeek: "4 600 Kč",
  terms: [
    {
      id: "ctvrtek-16",
      label: "Čtvrtek od 16:00",
      level: "začátečníci a středně pokročilí",
      age: "6–12 let",
    },
    {
      id: "ctvrtek-17",
      label: "Čtvrtek od 17:00",
      level: "pokročilí",
      age: "8–16 let",
    },
    {
      id: "patek-16",
      label: "Pátek od 16:00",
      level: "začátečníci a středně pokročilí",
      age: "6–12 let",
    },
  ],
} as const;

/** Tábor — ročník, na který se aktuálně přihlašuje */
export const CAMP = {
  id: "leapcamp-2027",
  year: 2027,
  label: "Leap Camp 2027",
  edition: "10. ročník",
  dates: "2. 7. – 10. 7. 2027",
  price: "7 450 Kč",
  venue: "Táborové středisko Radost u Světlé nad Sázavou",
  venueAddress: "Nová Ves u Světlé 103, 582 91 Nová Ves u Světlé",
  venueMapUrl:
    "https://www.google.com/maps/place/RS+RADOST/@49.6419174,15.4519674,619m/data=!3m2!1e3!4b1!4m6!3m5!1s0x470c55f5d60a4a75:0xec23e34210973617!8m2!3d49.641914!4d15.4545423!16s%2Fg%2F11j8klj04_",
  ageRange: "8–16 let",
  infoNote: "Konkrétní informace pošleme 14 dní před konáním tábora.",
  documentsUrl:
    "https://drive.google.com/file/d/1J8n5H-w_rkIZ4TC6Ewi5xOt19a48o7X7/view?usp=sharing",
  /** TODO: doplnit odkaz na platbu (po odeslání přihlášky) */
  paymentUrl: "",
} as const;

/** Výběr sportů na táboře — pořadí = pořadí ve formuláři */
export const CAMP_SPORTS = [
  "Chci se soustředit hlavně na parkour",
  "NERF zbraně (střílečka v týmech)",
  "Sebeobrana a bojové sporty",
  "Tanec (streetdance)",
  "Crossfit (kombinace síly, rychlosti a vytrvalosti)",
  "Lukostřelba",
  "Natáčení videí (jak točit parkour nebo videa na Instagram/Youtube)",
  "Frisbee (házení a chytání létajícího talíře)",
  "Fotbal",
  "Vybíjená",
  "Ping Pong",
  "Cheerleading",
  "Skákací boty",
  "Zkouška hodu nožem a sekerou (pod dozorem trenéra)",
  "Zipline (jízda po laně)",
  "Slackline (nácvik chůze po laně a balanc)",
  "Volejbal",
  "Paddleboarding (na vodě)",
] as const;

export const WHATSAPP_CHOICES = [
  { value: "add", label: "Chci přidat" },
  { value: "no_add", label: "Nemám WhatsApp" },
] as const;

/** Pojištění ČRDM — v ceně kroužku i tábora */
export const INSURANCE_URL = "https://crdm.cz/clanky/dokumenty/urazove-pojisteni/";
