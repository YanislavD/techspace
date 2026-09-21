import { Link } from 'react-router-dom'
import { categorySlug } from '../lib/categorySlug'
import StatusBadge from './StatusBadge.jsx'

function EquipmentCard({ item }) {
  return (
    <Link to={`/equipment/${item.id}`} className="equipment-card">
      <div className="equipment-card__thumb" data-category={categorySlug(item.category)} />
      <div className="equipment-card__body">
        <div className="equipment-card__code">{item.code}</div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <StatusBadge status={item.status} />
      </div>
    </Link>
  )
}

export default EquipmentCard
