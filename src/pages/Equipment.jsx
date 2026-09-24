import { useEquipment } from '../hooks/useEquipment.js'
import EquipmentCard from '../components/EquipmentCard.jsx'

export default function Equipment() {
  const { equipment, loading, error } = useEquipment()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  return (
    <div>
      <h1>Каталог с техника</h1>
      <div className="equipment-grid">
        {equipment.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

