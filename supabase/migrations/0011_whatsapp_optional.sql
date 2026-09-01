-- WhatsApp skupina se už neřeší přes formulář (nahrazeno přímým zvacím odkazem
-- na děkovací stránce), takže sloupec už není povinný. Historická data necháváme.

alter table public.club_registrations
  alter column whatsapp_choice drop not null;

alter table public.club_registrations
  drop constraint if exists club_registrations_whatsapp_choice_check;

alter table public.club_registrations
  add constraint club_registrations_whatsapp_choice_check
    check (whatsapp_choice is null or whatsapp_choice in ('add', 'no_add', 'cannot', 'other'));
