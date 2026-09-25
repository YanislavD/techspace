import useMyBooking from '../hooks/useMyBooking.js'
import BookingCard from '../components/Booking.jsx'

export default function MyBookings() {
  const { booking, setBooking, loading, error } = useMyBooking()

  if (loading) return <p>Зареждане...</p>
  if (error) return <p role="alert">Грешка: {error}</p>

  function handleDeleted(bookingId) {
    setBooking((current) => current.filter((b) => b.id !== bookingId))
  }

  return (
    <div>
      <h1>Моите резервации</h1>

      {booking.length === 0 ? (
        <p>Нямаш резервации все още.</p>
      ) : (
        <div className="booking-list">
          {booking.map((b) => (
            <BookingCard key={b.id} booking={b} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
