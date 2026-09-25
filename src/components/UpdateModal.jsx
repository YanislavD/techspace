import { useState } from 'react'
import { useUpdateBooking } from '../hooks/useBookings.js'

function UpdateModal({ booking, onClose, onUpdated }) {
  const [startDate, setStartDate] = useState(booking.start_date)
  const [endDate, setEndDate] = useState(booking.end_date)
  const [purpose, setPurpose] = useState(booking.purpose ?? '')
  const [formError, setFormError] = useState('')

  const { updateBooking, loading, error } = useUpdateBooking()

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    if (!startDate || !endDate) {
      setFormError('Моля, избери начална и крайна дата.')
      return
    }
    if (endDate < startDate) {
      setFormError('Крайната дата трябва да е след началната.')
      return
    }

    const ok = await updateBooking(booking.id, booking.equipment.id, startDate, endDate, purpose)
    if (ok) {
      onUpdated(booking.id, { start_date: startDate, end_date: endDate, purpose })
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Затвори">
          ✕
        </button>

        <h2 style={{ margin: 0 }}>Промени резервация</h2>
        <p className="auth-subtitle">{booking.equipment.name}</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="editStartDate">Начална дата</label>
            <input
              id="editStartDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="editEndDate">Крайна дата</label>
            <input
              id="editEndDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="editPurpose">Цел на резервацията</label>
            <textarea
              id="editPurpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          {(formError || error) && (
            <p role="alert" className="form-error">
              {formError || error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отказ
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Запазване...' : 'Запази'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateModal
