-- Souhlasy zákonných zástupců u přihlášek.

alter table public.camp_registrations
  add column if not exists legal_terms_accepted_at timestamptz,
  add column if not exists photo_consent boolean not null default false;

alter table public.club_registrations
  add column if not exists legal_terms_accepted_at timestamptz,
  add column if not exists photo_consent boolean not null default false;
