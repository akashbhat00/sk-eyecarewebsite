-- Staff accounts that may use the admin area. Rows are created manually by the owner
-- (see SETUP.md); there is no public sign-up.
create table if not exists public.staff_profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  role       text not null check (role in ('owner', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.staff_profiles enable row level security;

-- A signed-in user may read only their own profile (used to resolve their role at login).
create policy "staff read own profile"
  on public.staff_profiles for select
  to authenticated
  using (user_id = auth.uid());

-- security definer so RLS policies on other tables can call it without recursion.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_profiles where user_id = auth.uid()
  );
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;
