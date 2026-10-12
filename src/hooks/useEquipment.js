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

export function useCreateEquipment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function createEquipment({ name, category, specs, imageUrl }) {
    setLoading(true)
    setError('')

    const { data, error: insertError } = await supabase
      .from('equipment')
      .insert({
        name,
        category,
        specs: specs || null,
        image_url: imageUrl || null,
      })
      .select()
      .single()

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return null
    }

    return data
  }

  return { createEquipment, loading, error }
}
