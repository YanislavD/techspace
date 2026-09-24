import { useParams, useNavigate } from 'react-router-dom'
import { useEquipmentItem } from '../hooks/useEquipmentItem.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useAuthModal } from '../context/AuthModalContext.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Equipment from './Equipment.jsx'

export default function EquipmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading, error } = useEquipmentItem(id)
  const { user } = useAuth()
  const { isOpen: authModalOpen, openModal } = useAuthModal()

  function handleBookClick() {
    if (user) {
      navigate(`/equipment/${id}/book`)
    } else {
      openModal('login')
    }
  }

  function closeModal() {
    navigate('/equipment')
  }

  return (
    <>
      <Equipment />

      {!authModalOpen && (
        <div className="modal-backdrop equipment-modal-backdrop">
          <div className="modal-card equipment-modal">
            <button className="modal-close" onClick={closeModal} aria-label="Затвори">
              ✕
            </button>

            {loading && <p>Зареждане...</p>}
            {error && <p role="alert">Грешка: {error}</p>}
            {!loading && !item && <p>Техниката не е намерена.</p>}

            {item && (
              <>
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="equipment-details__image" />
                )}
                <h1 style={{ margin: 0 }}>{item.name}</h1>
                <p className="equipment-details__code">{item.code}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span>{item.category}</span>
                  <StatusBadge status={item.status} />
                </div>
                <p>{item.specs}</p>

                {item.status === 'available' && (
                  <button className="btn-primary" onClick={handleBookClick}>
                    Резервирай
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
