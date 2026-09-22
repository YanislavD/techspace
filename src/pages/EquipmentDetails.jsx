import { useParams, Link } from 'react-router-dom'
import { useEquipmentItem } from '../hooks/useEquipmentItem.js'
import { useAuth } from '../context/AuthContext.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

function EquipmentDetails() {
  const { id } = useParams()
  const { item, loading, error } = useEquipmentItem(id)
  const { user } = useAuth()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>
  if (!item) return <p>Техниката не е намерена.</p>

  return (
    <div>
      <Link to="/equipment">&larr; Назад към каталога</Link>
      <h1>{item.name}</h1>
      <p>{item.code}</p>
      <p>{item.category}</p>
      <StatusBadge status={item.status} />
      <p>{item.specs}</p>

      {user && item.status === 'available' && (
        <Link to={`/equipment/${id}/book`}>Резервирай</Link>
      )}
      {!user && <p>Влез в профила си, за да резервираш тази техника.</p>}
    </div>
  )
}

export default EquipmentDetails
