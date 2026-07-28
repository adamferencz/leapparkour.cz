-- LeapCamp fakturace, slevové kódy a PDF faktury.

alter table public.camp_registrations
  add column if not exists base_amount_czk int not null default 8400,
  add column if not exists discount_code_id uuid,
  add column if not exists discount_code text,
  add column if not exists discount_amount_czk int not null default 0,
  add column if not exists total_amount_czk int not null default 8400,
  add column if not exists billing_name text,
  add column if not exists billing_street text,
  add column if not exists billing_city text,
  add column if not exists billing_zip text;

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  code text not null unique,
  label text,
  type text not null check (type in ('amount', 'percent')),
  value int not null check (value > 0),
  active boolean not null default true,
  max_uses int check (max_uses is null or max_uses > 0),
  used_count int not null default 0 check (used_count >= 0),
  valid_from date,
  valid_until date,
  admin_notes text
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'camp_registrations_discount_code_id_fkey'
  ) then
    alter table public.camp_registrations
      add constraint camp_registrations_discount_code_id_fkey
      foreign key (discount_code_id) references public.discount_codes(id)
      on delete set null;
  end if;
end $$;

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  camp_registration_id uuid not null references public.camp_registrations(id) on delete cascade,
  invoice_number text not null unique,
  variable_symbol text not null unique,
  issue_date date not null,
  due_date date not null,
  supplier_name text not null,
  supplier_address text not null,
  supplier_ico text not null,
  supplier_registry text not null,
  supplier_vat_note text not null,
  buyer_name text not null,
  buyer_address text not null,
  buyer_email text not null,
  item_name text not null,
  base_amount_czk int not null,
  discount_code text,
  discount_amount_czk int not null default 0,
  total_amount_czk int not null,
  bank_account text not null,
  iban text not null,
  bic text not null,
  storage_path text not null,
  sent_at timestamptz,
  status text not null default 'issued' check (status in ('issued', 'sent', 'cancelled')),
  unique (camp_registration_id)
);

alter table public.invoices
  add column if not exists buyer_address text not null default '';

create sequence if not exists public.invoice_number_seq start 1;

create or replace function public.next_invoice_sequence()
returns bigint
language sql
security definer
set search_path = public
as $$
  select nextval('public.invoice_number_seq');
$$;

create or replace function public.increment_discount_used(discount_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.discount_codes
  set used_count = used_count + 1
  where id = discount_id;
$$;

alter table public.discount_codes enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "anon select active discount codes" on public.discount_codes;
drop policy if exists "admin select discount codes" on public.discount_codes;
drop policy if exists "admin insert discount codes" on public.discount_codes;
drop policy if exists "admin update discount codes" on public.discount_codes;
drop policy if exists "admin delete discount codes" on public.discount_codes;
drop policy if exists "admin select invoices" on public.invoices;
drop policy if exists "admin insert invoices" on public.invoices;
drop policy if exists "admin update invoices" on public.invoices;
drop policy if exists "admin delete invoices" on public.invoices;
drop policy if exists "admin read invoice files" on storage.objects;
drop policy if exists "admin upload invoice files" on storage.objects;
drop policy if exists "admin update invoice files" on storage.objects;

create policy "anon select active discount codes" on public.discount_codes
  for select to anon, authenticated
  using (
    active = true
    and (valid_from is null or valid_from <= current_date)
    and (valid_until is null or valid_until >= current_date)
    and (max_uses is null or used_count < max_uses)
  );

create policy "admin select discount codes" on public.discount_codes
  for select to authenticated using (true);

create policy "admin insert discount codes" on public.discount_codes
  for insert to authenticated with check (true);

create policy "admin update discount codes" on public.discount_codes
  for update to authenticated using (true);

create policy "admin delete discount codes" on public.discount_codes
  for delete to authenticated using (true);

create policy "admin select invoices" on public.invoices
  for select to authenticated using (true);

create policy "admin insert invoices" on public.invoices
  for insert to authenticated with check (true);

create policy "admin update invoices" on public.invoices
  for update to authenticated using (true);

create policy "admin delete invoices" on public.invoices
  for delete to authenticated using (true);

insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', false)
on conflict (id) do nothing;

create policy "admin read invoice files" on storage.objects
  for select to authenticated
  using (bucket_id = 'invoices');

create policy "admin upload invoice files" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'invoices');

create policy "admin update invoice files" on storage.objects
  for update to authenticated
  using (bucket_id = 'invoices');

create index if not exists discount_codes_code_idx on public.discount_codes (lower(code));
create index if not exists invoices_registration_idx on public.invoices (camp_registration_id);
create index if not exists invoices_created_idx on public.invoices (created_at desc);
