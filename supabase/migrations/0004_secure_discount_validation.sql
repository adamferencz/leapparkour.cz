drop policy if exists "anon select active discount codes" on public.discount_codes;

create or replace function public.validate_discount_code(input_code text)
returns table (
  id uuid,
  code text,
  label text,
  type text,
  value int,
  active boolean,
  max_uses int,
  used_count int,
  valid_from date,
  valid_until date,
  admin_notes text
)
language sql
security definer
set search_path = public
as $$
  select
    d.id,
    d.code,
    d.label,
    d.type,
    d.value,
    d.active,
    d.max_uses,
    d.used_count,
    d.valid_from,
    d.valid_until,
    null::text as admin_notes
  from public.discount_codes d
  where upper(regexp_replace(trim(input_code), '\s+', '', 'g')) = upper(d.code)
    and d.active = true
    and (d.valid_from is null or d.valid_from <= current_date)
    and (d.valid_until is null or d.valid_until >= current_date)
    and (d.max_uses is null or d.used_count < d.max_uses)
  limit 1;
$$;
