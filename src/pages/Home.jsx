import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEquipment } from '../hooks/useEquipment.js'
import { categories, categorySlug } from '../lib/categorySlug.js'

const VISIBLE_COUNT = 3

export default function Home() {
  const { equipment, loading } = useEquipment()
  const [showcaseIndex, setShowcaseIndex] = useState(0)

  const available = equipment.filter((item) => item.status === 'available')
  const diverseFirst = available.filter(
    (item, index) => available.findIndex((i) => i.category === item.category) === index
  )
  const rest = available.filter((item) => !diverseFirst.includes(item))
  const pool = [...diverseFirst, ...rest].slice(0, 5)

  const visibleItems =
    pool.length <= VISIBLE_COUNT
      ? pool
      : Array.from({ length: VISIBLE_COUNT }, (_, i) => pool[(showcaseIndex + i) % pool.length])

  function showPrev() {
    setShowcaseIndex((i) => (i - 1 + pool.length) % pool.length)
  }

  function showNext() {
    setShowcaseIndex((i) => (i + 1) % pool.length)
  }

  return (
    <div>
      <div className="home-hero">
        <div className="home-hero__text">
          <h1>TechSpace</h1>
          <p>
            Резервирай лаптопи, монитори, VR очила и друга техника от
            университетското co-working пространство — онлайн, за минути.
          </p>
        </div>

        {pool.length > 0 && (
          <div className="showcase">
            {pool.length > VISIBLE_COUNT && (
              <button className="icon-btn showcase__arrow" onClick={showPrev} aria-label="Предишни">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="showcase__track">
              {visibleItems.map((item) => (
                <Link key={item.id} to={`/equipment/${item.id}`} className="showcase-card">
                  <div className="showcase-card__thumb" data-category={categorySlug(item.category)}>
                    {item.image_url && <img src={item.image_url} alt={item.name} />}
                  </div>
                  <span className="showcase-card__name">{item.name}</span>
                </Link>
              ))}
            </div>

            {pool.length > VISIBLE_COUNT && (
              <button className="icon-btn showcase__arrow" onClick={showNext} aria-label="Следващи">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <span className="home-stat__num">{loading ? '—' : equipment.length}</span>
          <span className="home-stat__label">артикула</span>
        </div>
        <div className="home-stat">
          <span className="home-stat__num">{categories.length}</span>
          <span className="home-stat__label">категории</span>
        </div>
        <div className="home-stat">
          <span className="home-stat__num">Безплатно</span>
          <span className="home-stat__label">за студенти</span>
        </div>
      </div>

      <div className="how-it-works">
        <h2>Как работи</h2>
        <div className="how-it-works__steps">
          <div className="how-step">
            <span className="how-step__num">1</span>
            <h3>Разгледай</h3>
            <p>Прегледай каталога с техника и намери това, което ти трябва.</p>
          </div>
          <div className="how-step">
            <span className="how-step__num">2</span>
            <h3>Резервирай</h3>
            <p>Избери дати и причина за резервацията — за минути, онлайн.</p>
          </div>
          <div className="how-step">
            <span className="how-step__num">3</span>
            <h3>Вземи техниката</h3>
            <p>Вземи от co-working пространството на избраната от теб дата.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link to="/equipment" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Разгледай каталога →
        </Link>
      </div>
    </div>
  )
}
