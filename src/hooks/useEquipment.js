import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useEquipment() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchEquipment() {
      setLoading(true)
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('code')

      if (error) setError(error.message)
      else setEquipment(data)

      setLoading(false)
    }

    fetchEquipment()
  }, [])

  return { equipment, loading, error }
}
