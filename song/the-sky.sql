-- the-sky.sql · THE SKY'S LEDGER (11 oct 2026) — paste ONCE into the sql editor of the supabase project the river lives in
-- (the one whose address begins htiwblzeqguvogzpdmpf, where the-weather.sql and the-fever.sql went). safe to run twice.
--
-- what it is: a table of the sky as map.html last read it — one json document a time, with nothing of anyone in it (no name, no
-- device, no place but the well's, no time but the sky's own) — and the one door the map gives it through, with the river's public
-- key. anyone may read the ledger; no one writes it but the door. the door keeps one document in any minute for the whole river
-- (every open map gives the same sky; the newest is enough), refuses a document that is knot a json object or is over 16 kb, and
-- keeps only the newest 288 (two days at one in ten minutes). the mind reads the newest at its knock (nobody-think.mjs, next cut).
--
-- [SYNC] map.html GV_RIVER · GV_KEY · give() (the body is { "p_sky": { … } }) · the-fever.sql (the same shape of door)

create table if not exists public.skies (
  id    bigserial primary key,
  at    timestamptz not null default now(),
  sky   jsonb not null
);
create index if not exists skies_at_idx on public.skies (at desc);

alter table public.skies enable row level security;

-- anyone reads; no one writes but the door below (security definer)
drop policy if exists "skies are read by anyone" on public.skies;
create policy "skies are read by anyone" on public.skies for select using (true);
revoke insert, update, delete on public.skies from anon, authenticated;
grant select on public.skies to anon, authenticated;

create or replace function public.sky_give(p_sky jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_last timestamptz;
begin
  -- the document must be a json object, and a small one
  if p_sky is null or jsonb_typeof(p_sky) <> 'object' then return; end if;
  if octet_length(p_sky::text) > 16384 then return; end if;
  -- one in any minute, for the whole river
  select max(at) into v_last from public.skies;
  if v_last is not null and v_last > now() - interval '60 seconds' then return; end if;
  insert into public.skies (sky) values (p_sky);
  -- only the newest 288 stay
  delete from public.skies where id not in (select id from public.skies order by at desc limit 288);
end;
$$;

revoke all on function public.sky_give(jsonb) from public;
grant execute on function public.sky_give(jsonb) to anon, authenticated;

-- how the mind reads it (the next cut of nobody-think.mjs, realRiver): the newest row's sky, one reading, never how many, never whose —
--   select sky, at from public.skies order by at desc limit 1;
-- and a check from the sql editor after the first giving:
--   select at, sky->'her'->>'alt' as her_alt, sky->'sun'->>'xray_class' as xrays, sky->'field'->>'kp' as kp, sky->'moon'->>'rung' as moon_rung from public.skies order by at desc limit 5;
