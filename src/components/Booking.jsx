import { Link } from 'react-router-dom'
import { useDeleteBooking } from '../hooks/useBookings.js'

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

function BookingCard({ booking, onDeleted }) {
  const equipment = booking.equipment
  const state = bookingState(booking)
  const { deleteBooking, loading } = useDeleteBooking()

  async function handleDelete() {
    const ok = await deleteBooking(booking.id, equipment.id)
    if (ok) onDeleted(booking.id)
  }

  return (
    <div className="booking-row">
      <Link to={`/bookings/${booking.id}`} className="booking-row__info">
        <span className="booking-row__code">{equipment.code}</span>
        <h3 className="booking-row__name">{equipment.name}</h3>
        <p className="booking-row__dates">
          Вземане {booking.start_date} · Връщане {booking.end_date}
        </p>
        {booking.purpose && <p className="booking-row__purpose">{booking.purpose}</p>}
      </Link>

      <div className="booking-row__actions">
        <span className="status-badge" data-status={state}>
          {stateLabels[state]}
        </span>
        <button className="booking-row__delete" onClick={handleDelete} disabled={loading}>
          {loading ? 'Изтриване...' : 'Изтрий'}
        </button>
      </div>
    </div>
  )
}

export default BookingCard
