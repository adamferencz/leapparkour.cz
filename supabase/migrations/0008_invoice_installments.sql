-- Umožní více faktur na jednu přihlášku (rozdělení platby na splátky).

alter table public.invoices drop constraint if exists invoices_camp_registration_id_key;
drop index if exists public.invoices_club_registration_uidx;

alter table public.invoices
  add column if not exists installment_of uuid references public.invoices(id) on delete set null;

create index if not exists invoices_installment_of_idx on public.invoices (installment_of);
