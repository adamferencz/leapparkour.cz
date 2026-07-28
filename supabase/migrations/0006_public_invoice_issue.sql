-- Veřejné přihlášky mohou fakturu pouze založit a nahrát PDF.
-- Čtení, úpravy a mazání zůstává pro administraci.

drop policy if exists "anon insert invoices from registration" on public.invoices;
create policy "anon insert invoices from registration" on public.invoices
  for insert to anon
  with check (
    status = 'issued'
    and (
      (camp_registration_id is not null and club_registration_id is null)
      or
      (camp_registration_id is null and club_registration_id is not null)
    )
  );

drop policy if exists "anon upload invoice files" on storage.objects;
create policy "anon upload invoice files" on storage.objects
  for insert to anon
  with check (
    bucket_id = 'invoices'
    and name like 'invoices/%'
  );

create or replace function public.mark_invoice_sent_public(invoice_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.invoices
  set status = 'sent',
      sent_at = now()
  where id = invoice_id
    and status = 'issued';
$$;
