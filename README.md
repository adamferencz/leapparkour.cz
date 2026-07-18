# leapparkour.cz — nový web

Custom web pro Leap Parkour: prezentace + přihlašování na kroužky a tábory + administrace.

## Stack

- **Next.js 15** (App Router, TypeScript, React 19) — hosting ideálně Vercel
- **Tailwind CSS 4** — styly
- **Supabase** — databáze přihlášek + přihlašování adminů (Auth)
- **Motion** — animace

## Spuštění lokálně

```bash
npm install
npm run dev
```

Web běží na http://localhost:3000. Přístupy k Supabase jsou v `.env.local` (viz `.env.example`).

## Nastavení Supabase (jednorázově)

1. **Databáze:** V Supabase dashboardu → SQL Editor → vložte a spusťte obsah souboru
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   Vytvoří tabulky `club_registrations` a `camp_registrations` včetně RLS pravidel
   (kdokoliv smí odeslat přihlášku, číst a upravovat je smí jen přihlášený admin).
2. **Admin účet:** Dashboard → Authentication → Users → **Add user** → e-mail + heslo
   (doporučeně „Auto confirm"). Tímto účtem se pak přihlásíte na `/admin/login`.

## Roční údržba obsahu

Termíny, ceny a ročníky jsou centrálně v [`lib/config.ts`](lib/config.ts) — při otevření
nové sezóny stačí upravit tento soubor (CLUB_SEASON, CAMP). TODO položky tam označují,
co je potřeba doplnit pro rok 2027 (přesný termín tábora, datum zahájení kroužku,
platební odkaz `CAMP.paymentUrl` pro stránku po odeslání přihlášky na tábor).

## Struktura

- `app/` — stránky: `/` (příběh), `/krouzek(+/informace,/prihlaska)`, `/tabor(+/informace,/prihlaska)`, `/kontakt`, `/prihlaska`, `/admin/*`
- `components/` — Header, Footer, UI (akordeon, YouTube embed, Reveal animace), formuláře, admin
- `lib/` — config sezóny, Supabase klienti, typy
- `supabase/migrations/` — SQL schéma
- `scraped/` — kompletní podklady ze starého webu (HTML, texty v Markdownu, všech 148 fotek z knihovny médií, YouTube odkazy) — **neverzovat do produkce, jen podklady**

## Admin

`/admin` — přehled přihlášek, `/admin/krouzek` a `/admin/tabor` — tabulky s detailem,
změnou statusu (nová → potvrzená → zaplacená / zrušená), poznámkami a exportem do CSV
(otevře se v českém Excelu).
