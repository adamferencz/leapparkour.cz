/**
 * Centrální konfigurace — termíny, ceny a texty, které se mění každý rok.
 * Při otevření nové sezóny stačí upravit tento soubor.
 */

export const SITE = {
  name: "Leap Parkour",
  legalName: "Leap parkour, z. s.",
  ico: "07195320",
  domain: "leapparkour.cz",
  email: "leapparkour@seznam.cz",
  phone: "776 191 962",
  address: "Práčat 1886, 580 01 Havlíčkův Brod",
  registry: "L 12040 vedená u Krajského soudu v Hradci Králové",
  vatNote: "Neplátce DPH",
  instagram: "https://www.instagram.com/leapparkour/",
  facebook: "https://www.facebook.com/share/YG84oj6nvVgR4NvM/",
  youtube: "https://www.youtube.com/@LeapParkour",
} as const;

/** Zvací odkazy do WhatsApp skupin — sdílíme je rodičům na děkovací stránce po přihlášce. */
export const WHATSAPP_LINKS = {
  club: "https://chat.whatsapp.com/IXvXe15W4h24Y1z0W4xZof?s=cl&p=i&mlu=4",
  camp: "https://chat.whatsapp.com/KhseYYrw1WFB2ukgqGP91E?s=cl&p=i&mlu=4",
} as const;

/** Kroužky — sezóna, na kterou se aktuálně přihlašuje */
export const CLUB_SEASON = {
  id: "podzim-2026",
  label: "podzim 2026",
  startNote: "3. září a 4. září",
  venue: "ZŠ Wolkerova (tělocvična), v létě parkourové hřiště Plovárenská, Havlíčkův Brod",
  priceOnceWeek: "3 100 Kč",
  priceTwiceWeek: "4 800 Kč",
  priceOnceWeekCzk: 3100,
  priceTwiceWeekCzk: 4800,
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
  dates: "3. 7. – 10. 7. 2027",
  price: "8 400 Kč",
  priceCzk: 8400,
  venue: "Táborové středisko Radost u Světlé nad Sázavou",
  venueAddress: "Nová Ves u Světlé 103, 582 91 Nová Ves u Světlé",
  venueMapUrl:
    "https://www.google.com/maps/place/RS+RADOST/@49.6419174,15.4519674,619m/data=!3m2!1e3!4b1!4m6!3m5!1s0x470c55f5d60a4a75:0xec23e34210973617!8m2!3d49.641914!4d15.4545423!16s%2Fg%2F11j8klj04_",
  ageRange: "8–16 let",
  infoNote: "Konkrétní informace pošleme 14 dní před konáním tábora.",
  documentsUrl:
    "https://drive.google.com/file/d/1J8n5H-w_rkIZ4TC6Ewi5xOt19a48o7X7/view?usp=sharing",
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
