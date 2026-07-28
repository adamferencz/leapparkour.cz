alter table public.club_registrations
  add column if not exists parent_name text;
