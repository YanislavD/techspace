import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEquipmentItem } from '../hooks/useEquipmentItem.js'
import { useCreateBooking } from '../hooks/useBookings.js'
import StatusBadge from '../components/StatusBadge.jsx'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function NewBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading: itemLoading } = useEquipmentItem(id)
  const { createBooking, loading, error } = useCreateBooking()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [purpose, setPurpose] = useState('')
  const [formError, setFormError] = useState('')

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
    if (startDate < todayISO()) {
      setFormError('Началната дата не може да е в миналото.')
      return
    }

    const ok = await createBooking({ equipmentId: id, startDate, endDate, purpose })
    if (ok) navigate('/my-bookings')
  }

  if (itemLoading) return <p>Зареждане...</p>
  if (!item) return <p>Техниката не е намерена.</p>

  if (item.status !== 'available') {
    return <p>{item.name} не е свободна за резервация в момента.</p>
  }

  let days = 0
  if (startDate && endDate && endDate >= startDate) {
    days = Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1
  }

  return (
    <div>
      <Link to={`/equipment/${id}`}>&larr; Назад</Link>
      <h1 className="booking-title">Резервация</h1>

      <div className="booking-layout">
        <aside className="booking-summary">
          {item.image_url && (
            <img src={item.image_url} alt={item.name} className="booking-summary__image" />
          )}
          <div className="booking-summary__body">
            <span className="booking-summary__code">{item.code}</span>
            <h2 className="booking-summary__name">{item.name}</h2>
            <div className="booking-summary__meta">
              <span>{item.category}</span>
              <StatusBadge status={item.status} />
            </div>
            {item.specs && <p className="booking-summary__specs">{item.specs}</p>}
          </div>
        </aside>

        <form className="booking-form" onSubmit={handleSubmit}>
          <h2 className="booking-form__title">Избери период</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Начална дата</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Крайна дата</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {days > 0 && (
            <p className="booking-duration">
              Общо: <strong>{days} {days === 1 ? 'ден' : 'дни'}</strong>
            </p>
          )}

          <div className="form-group">
            <label htmlFor="purpose">Цел на резервацията (по желание)</label>
            <textarea
              id="purpose"
              rows={4}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          {(formError || error) && <p role="alert" className="form-error">{formError || error}</p>}

          <div className="booking-form__actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Резервиране...' : 'Потвърди резервацията'}
            </button>
            <Link to={`/equipment/${id}`} className="btn-secondary">Отказ</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
