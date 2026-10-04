-- the-artist-pass3.sql · 3 oct 2026 · pass 3 of the one story · the server
-- paste the whole of this into supabase → SQL editor → Run, once. it is safe to run twice.
-- it only ADDS three tables; it changes nothing that is already there.
--
--   nobody_dreams   one row a step that dreamt: when, the day, the life, which mind, how long (thinking tokens), the
--                   fingerprint of the seal, the summary another mind wrote of it, how long the step took, its effort;
--                   and, on a life's last step, the whole of it (the page, the thinking, the answer) for the child.
--   nobody_frames   one row a step: what the room performed (the set, the place, the hands, the touch, the work, the
--                   fixtures, the fire, the line), so any day can be played again.
--   nobody_airs     one row a death: the genome the life lived by — its air on the box.
--
-- row level security is on and no policy is given: only the server's secret key (nobody-think, nobody.mjs) reaches
-- them; the public key in the pages never does. so the dreams' summaries stay private until he chooses otherwise.

create table if not exists public.nobody_dreams (
  id        bigserial primary key,
  at        timestamptz not null,
  day       date not null,
  life      integer not null,
  mind      text,
  tokens    integer,
  seal      text,
  summary   text,
  took_ms   integer,
  effort    text,
  last      boolean not null default false,
  carried   boolean not null default false,
  block     jsonb
);
create index if not exists nobody_dreams_day  on public.nobody_dreams (day, at);
create index if not exists nobody_dreams_life on public.nobody_dreams (life, last);

create table if not exists public.nobody_frames (
  id     bigserial primary key,
  at     timestamptz not null,
  day    date not null,
  life   integer,
  frame  jsonb
);
create index if not exists nobody_frames_day on public.nobody_frames (day, at);

create table if not exists public.nobody_airs (
  life    integer primary key,
  died    timestamptz not null,
  genome  jsonb
);
create index if not exists nobody_airs_died on public.nobody_airs (died);

alter table public.nobody_dreams enable row level security;
alter table public.nobody_frames enable row level security;
alter table public.nobody_airs   enable row level security;
