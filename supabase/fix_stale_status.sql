-- Поправка на "заклещени" статуси от стария бъг (equipment.id липсваше в join
-- select-а, затова revert-ът на статуса при delete на резервация не минаваше).
-- Намира ВСЯКА техника маркирана 'booked', която няма реална активна
-- резервация в bookings таблицата, и я връща на 'available'.

update equipment
set status = 'available'
where status = 'booked'
  and id not in (select equipment_id from bookings);
