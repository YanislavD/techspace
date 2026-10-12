import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useEquipment } from '../hooks/useEquipment.js'
import { useAuth } from '../context/auth-context.js'
import { useAuthModal } from '../context/auth-modal-context.js'
import { categories } from '../lib/categorySlug.js'
import EquipmentCard from '../components/EquipmentCard.jsx'

const sortOptions = [
  { value: 'code', label: 'По код' },
  { value: 'available', label: 'Първо на разположение' },
  { value: 'booked', label: 'Първо резервирани' },
  { value: 'maintenance', label: 'Първо в поддръжка' },
]

export default function Equipment() {
  const { equipment, setEquipment, loading, error } = useEquipment()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('code')
  const { user } = useAuth()
  const { openModal } = useAuthModal()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  const filtered =
    activeCategory === 'all'
      ? equipment
      : equipment.filter((item) => item.category === activeCategory)

  // Списъкът идва подреден по код. sort() е стабилен, така че елементите със
  // избрания статус отиват отпред, а редът по код вътре във всяка група се пази.
  let visible = filtered
  if (sortBy !== 'code') {
    visible = [...filtered].sort(
      (a, b) => (a.status === sortBy ? 0 : 1) - (b.status === sortBy ? 0 : 1)
    )
  }

  const availableCount = equipment.filter((item) => item.status === 'available').length
  const bookedCount = equipment.filter((item) => item.status === 'booked').length

  function handleDeleted(id) {
    setEquipment((current) => current.filter((item) => item.id !== id))
  }

  return (
      <>
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
               {user ? (
                 <Link to="/equipment/new" className="btn-primary">+ Добави техника</Link>
               ) : (
                 <button className="btn-primary" onClick={() => openModal('login')}>
                   + Добави техника
                 </button>
               )}
             </div>

             <div className="equipment-toolbar">
               <label htmlFor="sortBy">Подреди:</label>
               <select
                 id="sortBy"
                 className="sort-select"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 {sortOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.label}
                   </option>
                 ))}
               </select>
             </div>

             <div className="equipment-grid">
               {visible.map((item) => (
                 <EquipmentCard key={item.id} item={item} />
               ))}
             </div>
           </div>
         </div>
        <Outlet context={{ onDeleted: handleDeleted }} />
      </>
  )
}
