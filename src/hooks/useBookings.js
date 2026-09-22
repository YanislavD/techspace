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
