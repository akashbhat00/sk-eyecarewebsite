-- Appointment / enquiry requests from the website booking form.
-- Constraints mirror src/domain/inquiry/inquiry.schema.js and inquiry.constants.js.
create table if not exists public.inquiries (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null check (char_length(name) between 2 and 100),
  phone          text not null check (phone ~ '^[6-9][0-9]{9}$'),
  service        text not null check (service in (
                   'Eye Test', 'New Spectacles', 'Sunglasses', 'Contact Lenses',
                   'Frame Repair', 'Lens Replacement', 'Other')),
  preferred_date date,
  preferred_time text check (preferred_time in ('Morning (10–12)', 'Afternoon (12–4)', 'Evening (4–8)')),
  message        text check (char_length(message) <= 1000),
  status         text not null default 'new' check (status in ('new', 'contacted', 'done'))
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;

-- Visitors may submit new enquiries only. The date rule lives here rather than in a CHECK
-- so that later status updates on old enquiries are not rejected.
create policy "public can submit enquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (
    status = 'new'
    and (preferred_date is null or preferred_date >= current_date)
  );

create policy "staff can read enquiries"
  on public.inquiries for select
  to authenticated
  using (public.is_staff());

create policy "staff can update enquiries"
  on public.inquiries for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- No delete policy: enquiries are kept as a record.

-- Supabase grants every table to anon/authenticated by default; narrow that to the columns
-- each role actually needs (visitors cannot set id/status/created_at, staff can only change status).
revoke all on public.inquiries from anon, authenticated;
grant insert (name, phone, service, preferred_date, preferred_time, message) on public.inquiries to anon;
grant insert (name, phone, service, preferred_date, preferred_time, message) on public.inquiries to authenticated;
grant select, update (status) on public.inquiries to authenticated;
