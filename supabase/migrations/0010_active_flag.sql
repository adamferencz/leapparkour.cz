-- Označení, jestli dítě aktuálně chodí (kroužek) / jede (tábor), nebo je odhlášené.

alter table public.club_registrations
  add column if not exists active boolean not null default true;

alter table public.camp_registrations
  add column if not exists active boolean not null default true;

create index if not exists club_registrations_active_idx on public.club_registrations (active);
create index if not exists camp_registrations_active_idx on public.camp_registrations (active);
