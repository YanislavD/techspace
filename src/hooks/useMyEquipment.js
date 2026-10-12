import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/auth-context.js'

export function useMyEquipment() {
  const { user } = useAuth()
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMyEquipment() {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('owner_id', user.id)
        .order('code')

      if (error) setError(error.message)
      else setEquipment(data)

      setLoading(false)
    }

    fetchMyEquipment()
  }, [user.id])

  return { equipment, loading, error }
}
