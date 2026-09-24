-- Добавя реални снимки (Unsplash) към вече съществуващите equipment записи,
-- по една представителна снимка на категория.

update equipment set image_url = 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=60' where category = 'Лаптопи';
update equipment set image_url = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=60' where category = 'Монитори';
update equipment set image_url = 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=60' where category = 'Периферия';
update equipment set image_url = 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=60' where category = 'VR';
update equipment set image_url = 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=60' where category = 'Проектори';
update equipment set image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60' where category = 'Аудио';
update equipment set image_url = 'https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=800&q=60' where category = 'Видео';
update equipment set image_url = 'https://images.unsplash.com/photo-1662893170097-d6563d0093d3?auto=format&fit=crop&w=800&q=60' where category = 'Таблети';
