import { useState } from 'react'
import { useDeleteBooking } from '../hooks/useBookings.js'
import UpdateModal from './UpdateModal.jsx'

function bookingState(booking) {
  const today = new Date().toISOString().slice(0, 10)
  if (today < booking.start_date) return 'upcoming'
  if (today > booking.end_date) return 'completed'
  return 'active'
}

const stateLabels = {
  upcoming: 'Предстояща',
  active: 'Активна',
  completed: 'Приключена',
}

function BookingCard({ booking, onDeleted, onUpdated }) {
  const equipment = booking.equipment
  const state = bookingState(booking)
  const { deleteBooking, loading: deleteLoading } = useDeleteBooking()
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  async function confirmDelete() {
    const ok = await deleteBooking(booking.id, equipment.id)
    setIsConfirmingDelete(false)
    if (ok) onDeleted(booking.id)
  }

  function handleUpdate() {
    setIsEditing(true)
  }

  return (
    <div className="booking-row">
      <div className="booking-row__info">
        <span className="booking-row__code">{equipment.code}</span>
        <h3 className="booking-row__name">{equipment.name}</h3>
        <p className="booking-row__dates">
          Вземане {booking.start_date} · Връщане {booking.end_date}
        </p>
        {booking.purpose && <p className="booking-row__purpose">{booking.purpose}</p>}
      </div>

      <div className="booking-row__actions">
        <span className="status-badge" data-status={state}>
          {stateLabels[state]}
        </span>
        <div className="booking-row__buttons">
          <button className="icon-btn icon-btn--edit" onClick={handleUpdate} aria-label="Промени резервацията">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </button>
          <button
            className="icon-btn icon-btn--delete"
            onClick={() => setIsConfirmingDelete(true)}
            disabled={deleteLoading}
            aria-label="Изтрий резервацията"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {isEditing && (
        <UpdateModal
          booking={booking}
          onClose={() => setIsEditing(false)}
          onUpdated={(bookingId, changes) => {
            onUpdated(bookingId, changes)
            setIsEditing(false)
          }}
        />
      )}

      {isConfirmingDelete && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 style={{ margin: 0 }}>Сигурен ли си?</h2>
            <p className="auth-subtitle">
              Резервацията за {equipment.name} ще бъде изтрита завинаги.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsConfirmingDelete(false)}
              >
                Отказ
              </button>
              <button type="button" className="btn-danger" onClick={confirmDelete} disabled={deleteLoading}>
                {deleteLoading ? 'Изтриване...' : 'Изтрий'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingCard
