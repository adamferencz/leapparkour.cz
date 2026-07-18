# Pravidla pro AI agenty

Platí pro všechny AI agenty v tomto repozitáři (Claude Code, Codex, Cursor, Gemini…).
`CLAUDE.md` a `AGENTS.md` mají identický obsah — když upravíš jeden, uprav stejně i druhý.

## Kontext projektu

- Web leapparkour.cz: Next.js 15 (App Router, TypeScript), Tailwind CSS 4, Supabase
  (přihlášky na kroužky/tábory + admin auth), Motion (animace). Jazyk webu: čeština.
- Sezónní údaje (termíny, ceny, ročníky) jsou VŽDY v `lib/config.ts` — nikde je nehardcoduj.
- Schéma databáze: `supabase/migrations/`. Tajemství jsou v `.env.local` — NIKDY je necommituj.
- Před dokončením/mergem práce vždy ověř, že projde `npm run build`
  (rychlá kontrola během práce: `npx tsc --noEmit`).

## Git workflow — dělej automaticky, na nic se neptej

Uživatel je komunikátor, ne programátor. Všechny gitové operace prováděj sám a bez dotazů;
ptej se jen, když hrozí ztráta něčí práce nebo je zadání nejasné. Výsledky shrnuj lidsky
(co je hotové a kde to uvidí), ne gitovým žargonem.

1. **Začátek každé práce = synchronizace.** Vždy nejdřív `git fetch origin` a pak:
   - stojíš-li na `main`: `git pull --rebase origin main`,
   - stojíš-li na feature větvi: `git rebase origin/main`.
   (Pokud remote `origin` ještě neexistuje, synchronizaci přeskoč.)
2. **Nová funkce nebo větší změna = nová větev z čerstvého mainu.**
   Pojmenuj ji sám: `feature/kratky-popis` nebo `fix/kratky-popis` (malá písmena, bez diakritiky).
   Drobnosti (překlep, úprava textu, změna configu) můžeš udělat rovnou na `main`.
3. **Commituj průběžně** — menší commity s výstižnou zprávou v imperativu
   („Přidej FAQ na stránku tábora", „Oprav validaci formuláře").
4. **Hotová funkce = merge do mainu.** Postup:
   - ověř build,
   - `git fetch origin` a rebase větve na `origin/main` (konflikty vyřeš ve své větvi),
   - `git checkout main && git pull && git merge --no-ff feature/... && git push`,
   - je-li nastavený GitHub s `gh` CLI, můžeš místo přímého merge udělat PR a squash-merge,
   - smazanou (mergnutou) větev ukliď lokálně i na originu.
5. **Souběžná práce dvou lidí:** každý pracuje jen ve své větvi; před mergem VŽDY rebase
   na aktuální `origin/main`, aby se práce nepřebíjela. Konflikty se řeší ve feature větvi,
   nikdy v mainu. Do mainu nikdy `push --force`; na vlastní feature větvi je po rebase
   v pořádku `push --force-with-lease`.
6. **Nikdy:** necommituj `.env*` ani jiná tajemství, nemaž cizí větve, nepřepisuj historii mainu.

## Ověřování změn

- **Nespouštěj vizuální kontrolu přes Playwright/prohlížeč, pokud si o to uživatel výslovně neřekne** — zdržuje ho to. K ověření stačí `npx tsc --noEmit` a `npm run build`.
- Playwright/screenshoty/klikací testy dělej jen na explicitní pokyn („zkontroluj to v prohlížeči", „udělej screenshot", apod.).

## Komunikace s uživatelem

- Piš česky, stručně a bez zbytečné techniky: co je hotové, kde to vidí, co se od něj čeká.
- Nenabízej výčty technických variant — zvol rozumný default a proveď ho.
- Když něco nejde (build, konflikt, chybějící přístup), řekni to na rovinu a navrhni řešení.
