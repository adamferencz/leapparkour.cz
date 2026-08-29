-- Volitelné razítko a podpis na faktuře.

alter table public.invoices
  add column if not exists stamp_signature boolean not null default false;
