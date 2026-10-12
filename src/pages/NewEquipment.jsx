import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { categories, categorySlug } from '../lib/categorySlug.js'
import { useCreateEquipment } from '../hooks/useEquipment.js'
import StatusBadge from '../components/StatusBadge.jsx'

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

  const previewImage = /^https?:\/\//i.test(imageUrl.trim()) ? imageUrl.trim() : ''

  return (
    <div>
      <Link to="/equipment">&larr; Назад към каталога</Link>
      <h1 className="booking-title">Добави техника</h1>

      <div className="form-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2 className="form-card__title">Данни за техниката</h2>

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
              rows={4}
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
            <span className="form-hint form-hint--right">{specs.length} / 300</span>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Линк към снимка (по желание)</label>
            <input
              id="imageUrl"
              type="text"
              inputMode="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {(formError || error) && <p role="alert" className="form-error">{formError || error}</p>}

          <div className="form-card__actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Добавяне...' : 'Добави техника'}
            </button>
            <Link to="/equipment" className="btn-secondary">Отказ</Link>
          </div>
        </form>

        <aside className="form-aside">
          <span className="form-aside__label">Предварителен изглед</span>

          <div className="equipment-card equipment-card--preview">
            <div className="equipment-card__thumb" data-category={categorySlug(category)}>
              {previewImage && (
                <img
                  key={previewImage}
                  src={previewImage}
                  alt=""
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              )}
            </div>
            <div className="equipment-card__body">
              <div className="equipment-card__code">EQ-… (кодът се генерира сам)</div>
              <h3 style={{ opacity: name.trim() ? 1 : 0.4 }}>{name.trim() || 'Име на техниката'}</h3>
              <p style={{ opacity: category ? 1 : 0.4 }}>{category || 'Категория'}</p>
              <StatusBadge status="available" />
            </div>
          </div>

          <p className="form-aside__hint">
            Така ще изглежда в каталога. Новата техника е веднага на разположение
            и само ти можеш да я изтриеш.
          </p>
        </aside>
      </div>
    </div>
  )
}
