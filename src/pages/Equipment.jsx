import { useState } from 'react'
import { useEquipment } from '../hooks/useEquipment.js'
import { categories } from '../lib/categorySlug.js'
import EquipmentCard from '../components/EquipmentCard.jsx'

export default function Equipment() {
  const { equipment, loading, error } = useEquipment()
  const [activeCategory, setActiveCategory] = useState('all')

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  const visible =
    activeCategory === 'all'
      ? equipment
      : equipment.filter((item) => item.category === activeCategory)

  const availableCount = equipment.filter((item) => item.status === 'available').length
  const bookedCount = equipment.filter((item) => item.status === 'booked').length

  return (
    <div className="equipment-layout">
      <aside className="equipment-sidebar">
        <span className="equipment-sidebar-title">Категории</span>
        <button
          className={activeCategory === 'all' ? 'category-filter-btn active' : 'category-filter-btn'}
          onClick={() => setActiveCategory('all')}
        >
          Всичко
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'category-filter-btn active' : 'category-filter-btn'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </aside>

      <div className="equipment-main">
        <div className="equipment-header">
          <h1 style={{ margin: 0 }}>Каталог с техника</h1>
          <div className="equipment-stats">
            <span className="stat-pill stat-pill--available">{availableCount} свободни</span>
            <span className="stat-pill stat-pill--booked">{bookedCount} резервирани</span>
          </div>
        </div>

        <div className="equipment-grid">
          {visible.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
