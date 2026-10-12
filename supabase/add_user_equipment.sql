-- TechSpace: потребителите могат да добавят собствена техника.
-- Изпълни целия файл в Supabase SQL Editor (за вече съществуваща база).

-- 1. Собственик на техниката.
--    Nullable, защото seed-натите 15 уреда нямат собственик.
--    Default-ът се задава отделно, за да не се "попълни" със стойност за старите редове.
alter table equipment
  add column owner_id uuid references auth.users(id) on delete set null;

alter table equipment
  alter column owner_id set default auth.uid();


create sequence equipment_code_seq start 100;

alter table equipment
  alter column code set default 'EQ-' || lpad(nextval('equipment_code_seq')::text, 3, '0');

grant usage on sequence equipment_code_seq to authenticated;


create policy "equipment_insert_own" on equipment
  for insert with check (auth.uid() = owner_id);

create policy "equipment_delete_own" on equipment
  for delete using (auth.uid() = owner_id and status = 'available');
