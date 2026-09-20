-- TechSpace: примерни данни за equipment каталога
-- Изпълни в Supabase SQL Editor, след schema.sql

insert into equipment (code, name, category, specs, status, image_url) values
  ('EQ-001', 'MacBook Pro 14"', 'Лаптопи', 'M3 Pro, 18GB RAM, 512GB SSD', 'available', null),
  ('EQ-002', 'Dell XPS 15', 'Лаптопи', 'i7-13700H, 32GB RAM, 1TB SSD', 'available', null),
  ('EQ-003', 'Lenovo ThinkPad X1', 'Лаптопи', 'i5-1335U, 16GB RAM, 512GB SSD', 'maintenance', null),
  ('EQ-004', 'Dell UltraSharp 27"', 'Монитори', '4K UHD, USB-C, 60Hz', 'available', null),
  ('EQ-005', 'LG UltraGear 27"', 'Монитори', 'QHD, 165Hz, IPS', 'available', null),
  ('EQ-006', 'Logitech MX Master 3S', 'Периферия', 'Безжична мишка, Bluetooth + USB dongle', 'available', null),
  ('EQ-007', 'Keychron K8', 'Периферия', 'Механична клавиатура, hot-swap', 'available', null),
  ('EQ-008', 'Meta Quest 3', 'VR', '128GB, mixed reality', 'available', null),
  ('EQ-009', 'HTC Vive Pro 2', 'VR', 'PC VR headset, 5K resolution', 'booked', null),
  ('EQ-010', 'Epson EB-2250U', 'Проектори', 'Full HD, 5000 lumens', 'available', null),
  ('EQ-011', 'Sony WH-1000XM5', 'Аудио', 'Noise cancelling, Bluetooth', 'available', null),
  ('EQ-012', 'Rode NT-USB Mini', 'Аудио', 'USB кондензаторен микрофон', 'available', null),
  ('EQ-013', 'Sony ZV-1', 'Видео', 'Компактна камера за streaming', 'available', null),
  ('EQ-014', 'iPad Pro 12.9"', 'Таблети', 'M2, 256GB, WiFi', 'available', null),
  ('EQ-015', 'Samsung Galaxy Tab S9', 'Таблети', '128GB, WiFi, S Pen included', 'available', null);
