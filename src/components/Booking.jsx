import { Link } from 'react-router-dom'

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

function BookingCard({ booking }) {
  const equipment = booking.equipment
  const state = bookingState(booking)

  return (
    <Link to={`/bookings/${booking.id}`} className="booking-row">
      <div className="booking-row__info">
        <span className="booking-row__code">{equipment.code}</span>
        <h3 className="booking-row__name">{equipment.name}</h3>
        <p className="booking-row__dates">
          Вземане {booking.start_date} · Връщане {booking.end_date}
        </p>
        {booking.purpose && <p className="booking-row__purpose">{booking.purpose}</p>}
      </div>

      <span className="status-badge" data-status={state}>
        {stateLabels[state]}
      </span>
    </Link>
  )
}

export default BookingCard
