import { useEquipment } from '../hooks/useEquipment.js'
import EquipmentCard from './EquipmentCard.jsx'

function EquipmentPreview({ count = 6 }) {
  const { equipment, loading, error } = useEquipment()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  const available = equipment.filter((item) => item.status === 'available')

  return (
    <div className="equipment-grid">
      {available.slice(0, count).map((item) => (
        <EquipmentCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default EquipmentPreview
