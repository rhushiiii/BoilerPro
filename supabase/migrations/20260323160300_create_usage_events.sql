-- 4) usage_events
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  api_key_id uuid references public.api_keys (id) on delete set null,
  event_type text not null,
  quantity integer not null default 1 check (quantity > 0),
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists usage_events_user_id_idx on public.usage_events (user_id);
create index if not exists usage_events_event_type_idx on public.usage_events (event_type);
create index if not exists usage_events_occurred_at_idx on public.usage_events (occurred_at desc);

alter table public.usage_events enable row level security;
alter table public.usage_events force row level security;

drop policy if exists "usage_events_select_own" on public.usage_events;
create policy "usage_events_select_own"
on public.usage_events
for select
using (auth.uid() = user_id);

drop policy if exists "usage_events_insert_own" on public.usage_events;
create policy "usage_events_insert_own"
on public.usage_events
for insert
with check (auth.uid() = user_id);

drop policy if exists "usage_events_update_own" on public.usage_events;
create policy "usage_events_update_own"
on public.usage_events
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "usage_events_delete_own" on public.usage_events;
create policy "usage_events_delete_own"
on public.usage_events
for delete
using (auth.uid() = user_id);
