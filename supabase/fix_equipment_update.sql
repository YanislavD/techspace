-- Липсваща policy: логнатите потребители трябва да могат да update-ват
-- equipment.status при create/delete на резервация (клиентска логика).

create policy "equipment_update_status" on equipment
  for update using (auth.role() = 'authenticated');
