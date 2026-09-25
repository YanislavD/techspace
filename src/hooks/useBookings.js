import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCreateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function createBooking({ equipmentId, startDate, endDate, purpose }) {
    setLoading(true)
    setError('')

    const { error: insertError } = await supabase.from('bookings').insert({
      equipment_id: equipmentId,
      start_date: startDate,
      end_date: endDate,
      purpose,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return false
    }

    const { error: updateError } = await supabase
      .from('equipment')
      .update({ status: 'booked' })
      .eq('id', equipmentId)

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return false
    }

    return true
  }

  return { createBooking, loading, error }
}

export function useDeleteBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const deleteBooking = async (bookingId, equipmentId) => {
    setLoading(true)
    setError('')

    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)

    if (deleteError) {
      setError(deleteError.message)
      setLoading(false)
      return false
    }

    const { error: updateError } = await supabase
      .from('equipment')
      .update({ status: 'available' })
      .eq('id', equipmentId)

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return false
    }

    return true
  }

 return  { deleteBooking, loading, error }
}

export function useUpdateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateBooking = async (bookingId, equipmentId, startDate, endDate, purpose) => {
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase
      .from('bookings')
      .update({ start_date: startDate, end_date: endDate, purpose })
      .eq('id', bookingId)

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return false
    }

    return true
  }

  return { updateBooking, loading, error }
}
