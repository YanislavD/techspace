import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useEquipmentItem(id) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchItem() {
      setLoading(true)
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('id', id)
        .single()

      if (error) setError(error.message)
      else setItem(data)

      setLoading(false)
    }

    fetchItem()
  }, [id])

  return { item, loading, error }
}
