-- Leads from the "Rezervă-ți un apel gratuit" form. The app also applies this schema automatically on the first
-- lead (src/server/leads.ts ensureSchema), so running it by hand is optional.
create extension if not exists pgcrypto;

create table if not exists call_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 100),
  phone         text not null check (char_length(phone) between 9 and 20),
  link          text check (link is null or char_length(link) <= 200),
  service       text not null,
  form_location text not null default 'apel-gratuit',
  notified_at   timestamptz
);

create index if not exists call_requests_created_at_idx on call_requests (created_at desc);
-- Reconciliation: rows with notified_at is null older than 10 minutes were not e-mailed; re-send them.
create index if not exists call_requests_unnotified_idx on call_requests (created_at) where notified_at is null;
