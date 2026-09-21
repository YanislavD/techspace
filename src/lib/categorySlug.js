const slugs = {
  'Лаптопи': 'laptops',
  'Монитори': 'monitors',
  'VR': 'vr',
  'Проектори': 'projectors',
  'Таблети': 'tablets',
  'Аудио': 'audio',
  'Видео': 'video',
  'Периферия': 'peripherals',
}

export function categorySlug(category) {
  return slugs[category] ?? 'default'
}
