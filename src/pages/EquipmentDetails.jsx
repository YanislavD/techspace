import { useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useEquipmentItem } from '../hooks/useEquipmentItem.js'
import { useDeleteEquipment } from '../hooks/useEquipment.js'
import { useAuth } from '../context/auth-context.js'
import { useAuthModal } from '../context/auth-modal-context.js'
import StatusBadge from '../components/StatusBadge.jsx'

export default function EquipmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading, error } = useEquipmentItem(id)
  const { user } = useAuth()
  const { isOpen: authModalOpen, openModal } = useAuthModal()
  const { onDeleted } = useOutletContext()
  const { deleteEquipment, loading: deleteLoading, error: deleteError } = useDeleteEquipment()
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  let isOwner = false
  if (user && item && item.owner_id === user.id) {
    isOwner = true
  }

  async function confirmDelete() {
    const ok = await deleteEquipment(id)
    if (ok) {
      onDeleted(id)
      navigate('/equipment')
    }
  }

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

                {isOwner && <p className="auth-subtitle">Това е твоя техника.</p>}

                <div className="equipment-details__actions">
                  {item.status === 'available' && !isOwner && !isConfirmingDelete && (
                    <button className="btn-primary" onClick={handleBookClick}>
                      Резервирай
                    </button>
                  )}

                  {isOwner && item.status === 'available' && !isConfirmingDelete && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsConfirmingDelete(true)}
                    >
                      Изтрий техниката
                    </button>
                  )}

                  {isOwner && isConfirmingDelete && (
                    <>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setIsConfirmingDelete(false)}
                      >
                        Отказ
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={confirmDelete}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? 'Изтриване...' : 'Изтрий'}
                      </button>
                    </>
                  )}
                </div>

                {isOwner && isConfirmingDelete && (
                  <p className="auth-subtitle">Сигурен ли си? Това не може да се върне.</p>
                )}
                {isOwner && item.status !== 'available' && (
                  <p className="auth-subtitle">Не можеш да изтриеш техника, докато е резервирана.</p>
                )}
                {deleteError && <p role="alert" className="form-error">{deleteError}</p>}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
