-- Поправка: equipment/comments/profiles трябва да са публично четими
-- (guest потребители виждат каталога и детайлите, само функционалностите са заключени)

drop policy "equipment_read" on equipment;
create policy "equipment_read" on equipment
  for select using (true);

drop policy "comments_read" on comments;
create policy "comments_read" on comments
  for select using (true);

drop policy "profiles_read" on profiles;
create policy "profiles_read" on profiles
  for select using (true);
