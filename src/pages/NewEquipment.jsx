import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { categories } from '../lib/categorySlug.js'
import { useCreateEquipment } from '../hooks/useEquipment.js'

export default function NewEquipment() {
  const navigate = useNavigate()
  const { createEquipment, loading, error } = useCreateEquipment()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [specs, setSpecs] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [formError, setFormError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const cleanName = name.trim()
    const cleanImageUrl = imageUrl.trim()

    if (cleanName.length < 2) {
      setFormError('Името трябва да е поне 2 символа.')
      return
    }
    if (cleanName.length > 80) {
      setFormError('Името може да е най-много 80 символа.')
      return
    }
    if (!category) {
      setFormError('Моля, избери категория.')
      return
    }
    if (specs.length > 300) {
      setFormError('Спецификациите могат да са най-много 300 символа.')
      return
    }
    if (cleanImageUrl && !/^https?:\/\//i.test(cleanImageUrl)) {
      setFormError('Линкът към снимката трябва да започва с http:// или https://')
      return
    }

    const created = await createEquipment({
      name: cleanName,
      category,
      specs: specs.trim(),
      imageUrl: cleanImageUrl,
    })
    if (created) navigate(`/equipment/${created.id}`)
  }

  return (
    <div>
      <Link to="/equipment">&larr; Назад към каталога</Link>
      <h1>Добави техника</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Име</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Избери категория</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specs">Спецификации (по желание)</label>
          <textarea
            id="specs"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Линк към снимка (по желание)</label>
          <input
            id="imageUrl"
            type="text"
            inputMode="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {(formError || error) && <p role="alert" className="form-error">{formError || error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Добавяне...' : 'Добави'}
        </button>
      </form>
    </div>
  )
}
