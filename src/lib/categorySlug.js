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

export const categories = Object.keys(slugs)

export function categorySlug(category) {
  return slugs[category] ?? 'default'
}
