import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEquipmentItem } from '../hooks/useEquipmentItem.js'
import { useCreateBooking } from '../hooks/useBookings.js'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function NewBooking() {
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

  return (
    <div>
      <Link to={`/equipment/${id}`}>&larr; Назад</Link>
      <h1>Резервация: {item.name}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Начална дата</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate">Крайна дата</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="purpose">Цел на резервацията</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        {(formError || error) && <p role="alert">{formError || error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Резервиране...' : 'Резервирай'}
        </button>
      </form>
    </div>
  )
}

export default NewBooking
