-- TechSpace: примерни данни за equipment каталога
-- Изпълни в Supabase SQL Editor, след schema.sql

insert into equipment (code, name, category, specs, status, image_url) values
  ('EQ-001', 'MacBook Pro 14"', 'Лаптопи', 'M3 Pro, 18GB RAM, 512GB SSD', 'available', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=60'),
  ('EQ-002', 'Dell XPS 15', 'Лаптопи', 'i7-13700H, 32GB RAM, 1TB SSD', 'available', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=60'),
  ('EQ-003', 'Lenovo ThinkPad X1', 'Лаптопи', 'i5-1335U, 16GB RAM, 512GB SSD', 'maintenance', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=60'),
  ('EQ-004', 'Dell UltraSharp 27"', 'Монитори', '4K UHD, USB-C, 60Hz', 'available', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=60'),
  ('EQ-005', 'LG UltraGear 27"', 'Монитори', 'QHD, 165Hz, IPS', 'available', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=60'),
  ('EQ-006', 'Logitech MX Master 3S', 'Периферия', 'Безжична мишка, Bluetooth + USB dongle', 'available', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=60'),
  ('EQ-007', 'Keychron K8', 'Периферия', 'Механична клавиатура, hot-swap', 'available', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=60'),
  ('EQ-008', 'Meta Quest 3', 'VR', '128GB, mixed reality', 'available', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=60'),
  ('EQ-009', 'HTC Vive Pro 2', 'VR', 'PC VR headset, 5K resolution', 'booked', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=60'),
  ('EQ-010', 'Epson EB-2250U', 'Проектори', 'Full HD, 5000 lumens', 'available', 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=60'),
  ('EQ-011', 'Sony WH-1000XM5', 'Аудио', 'Noise cancelling, Bluetooth', 'available', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60'),
  ('EQ-012', 'Rode NT-USB Mini', 'Аудио', 'USB кондензаторен микрофон', 'available', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60'),
  ('EQ-013', 'Sony ZV-1', 'Видео', 'Компактна камера за streaming', 'available', 'https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=800&q=60'),
  ('EQ-014', 'iPad Pro 12.9"', 'Таблети', 'M2, 256GB, WiFi', 'available', 'https://images.unsplash.com/photo-1662893170097-d6563d0093d3?auto=format&fit=crop&w=800&q=60'),
  ('EQ-015', 'Samsung Galaxy Tab S9', 'Таблети', '128GB, WiFi, S Pen included', 'available', 'https://images.unsplash.com/photo-1662893170097-d6563d0093d3?auto=format&fit=crop&w=800&q=60');
