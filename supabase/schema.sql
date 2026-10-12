-- TechSpace: schema + RLS policies
-- Изпълни целия този файл наведнъж в Supabase SQL Editor.

create sequence equipment_code_seq start 100;

create table equipment (
  id uuid primary key default gen_random_uuid(),
  code text unique not null
    default 'EQ-' || lpad(nextval('equipment_code_seq')::text, 3, '0'),
  name text not null,
  category text not null check (category in
    ('Лаптопи','Монитори','Периферия','VR','Проектори','Аудио','Видео','Таблети')),
  specs text,
  status text not null default 'available'
    check (status in ('available','booked','maintenance')),
  image_url text,
  owner_id uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz default now()
);

grant usage on sequence equipment_code_seq to authenticated;

create table bookings (
  id uuid primary key default gen_random_uuid(),
  equipment_id uuid not null references equipment(id) on delete cascade,
  user_id uuid not null references auth.users(id) default auth.uid(),
  start_date date not null,
  end_date date not null,
  purpose text,
  created_at timestamptz default now(),
  check (end_date >= start_date)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  equipment_id uuid not null references equipment(id) on delete cascade,
  user_id uuid not null references auth.users(id) default auth.uid(),
  text text not null,
  created_at timestamptz default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

-- Автоматично създава profile ред при регистрация на нов потребител
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security

alter table equipment enable row level security;
alter table bookings enable row level security;
alter table comments enable row level security;
alter table profiles enable row level security;

create policy "equipment_read" on equipment
  for select using (true);
create policy "equipment_update_status" on equipment
  for update using (auth.role() = 'authenticated');
create policy "equipment_insert_own" on equipment
  for insert with check (auth.uid() = owner_id);
create policy "equipment_delete_own" on equipment
  for delete using (auth.uid() = owner_id and status = 'available');

create policy "bookings_read" on bookings
  for select using (auth.uid() = user_id);
create policy "bookings_insert_own" on bookings
  for insert with check (auth.uid() = user_id);
create policy "bookings_update_own" on bookings
  for update using (auth.uid() = user_id);
create policy "bookings_delete_own" on bookings
  for delete using (auth.uid() = user_id);

create policy "comments_read" on comments
  for select using (true);
create policy "comments_insert_own" on comments
  for insert with check (auth.uid() = user_id);
create policy "comments_update_own" on comments
  for update using (auth.uid() = user_id);
create policy "comments_delete_own" on comments
  for delete using (auth.uid() = user_id);

create policy "profiles_read" on profiles
  for select using (true);
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);
