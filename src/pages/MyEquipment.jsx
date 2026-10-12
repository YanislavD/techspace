import { Link } from 'react-router-dom'
import { useMyEquipment } from '../hooks/useMyEquipment.js'
import EquipmentCard from '../components/EquipmentCard.jsx'

export default function MyEquipment() {
  const { equipment, loading, error } = useMyEquipment()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  return (
    <div>
      <div className="equipment-header" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Моята техника</h1>
        <Link to="/equipment/new" className="btn-primary">+ Добави техника</Link>
      </div>

      {equipment.length === 0 ? (
        <p>Все още не си добавил техника.</p>
      ) : (
        <div className="equipment-grid">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
