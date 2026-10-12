-- TechSpace: логнатите потребители могат да сменят само статуса на техника.
-- Преди това политиката equipment_update_status позволяваше на всеки логнат
-- потребител да променя ВСИЧКИ колони (име, спецификации, снимка, собственик)
-- на чужда техника. Приложението обновява само `status` (при резервация и
-- при отмяна), затова правото за промяна се ограничава до тази колона.
-- Изпълни в Supabase SQL Editor (за вече съществуваща база).

revoke update on equipment from anon, authenticated;
grant update (status) on equipment to authenticated;

-- Връщане към стария вид, ако нещо не е наред:
--   grant update on equipment to authenticated;
