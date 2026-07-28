-- Fakturace pro kroužky používá stejnou tabulku faktur jako tábor.

alter table public.club_registrations
  add column if not exists base_amount_czk int not null default 3100,
  add column if not exists total_amount_czk int not null default 3100,
  add column if not exists billing_name text,
  add column if not exists billing_street text,
  add column if not exists billing_city text,
  add column if not exists billing_zip text;

alter table public.invoices
  alter column camp_registration_id drop not null,
  add column if not exists club_registration_id uuid references public.club_registrations(id) on delete cascade;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_one_registration_check'
  ) then
    alter table public.invoices
      add constraint invoices_one_registration_check
      check (
        (camp_registration_id is not null and club_registration_id is null)
        or
        (camp_registration_id is null and club_registration_id is not null)
      );
  end if;
end $$;

create unique index if not exists invoices_club_registration_uidx
  on public.invoices (club_registration_id)
  where club_registration_id is not null;

create index if not exists invoices_club_registration_idx
  on public.invoices (club_registration_id);
