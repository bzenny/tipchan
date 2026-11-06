-- TipCHAN v0.1 initial schema. Applied to Supabase as tipchan_initial_schema.
-- All application writes require a future authenticated, verified server workflow.
create table public.creators (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null unique references auth.users(id) on delete cascade,
 handle text not null unique check (handle ~ '^[a-z0-9_-]{3,32}$'),
 display_name text not null,
 wallet_address text not null check (wallet_address ~ '^0x[0-9a-fA-F]{40}$'),
 wallet_verified_at timestamptz,
 created_at timestamptz not null default now()
);
create table public.payment_intents (
 id uuid primary key default gen_random_uuid(),
 creator_id uuid not null references public.creators(id),
 chain_id integer not null,
 token_address text not null check (token_address ~ '^0x[0-9a-fA-F]{40}$'),
 amount_atomic numeric(78,0) not null check(amount_atomic > 0),
 sender_address text,
 tx_hash text unique,
 status text not null default 'pending' check(status in ('pending','confirmed','failed','expired')),
 created_at timestamptz not null default now(),
 confirmed_at timestamptz
);
alter table public.creators enable row level security;
alter table public.payment_intents enable row level security;
revoke all on public.creators from anon, authenticated;
revoke all on public.payment_intents from anon, authenticated;
grant select on public.creators to anon, authenticated;
create policy "Public creator directory" on public.creators
 for select to anon, authenticated using (true);
-- No payment_intents policy intentionally: browser roles have no access.
