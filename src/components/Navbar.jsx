import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'

function Navbar() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand" onClick={closeMenu}>
        <span className="navbar__logo">TS</span>
        <span className="navbar__brand-text">
          <span className="navbar__brand-name">TechSpace</span>
          <span className="navbar__brand-subtitle">Университетска техника</span>
        </span>
      </Link>

      <button
        type="button"
        className="navbar__toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'}
        aria-expanded={menuOpen}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      <div className={menuOpen ? 'navbar__menu navbar__menu--open' : 'navbar__menu'}>
        <div className="navbar__links">
          <Link to="/equipment" onClick={closeMenu}>Каталог</Link>
          {user && <Link to="/my-bookings" onClick={closeMenu}>Моите резервации</Link>}
        </div>

        <div className="navbar__auth">
          {user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={() => {
                  signOut()
                  closeMenu()
                }}
              >
                Изход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Вход</Link>
              <Link to="/register" className="navbar__cta" onClick={closeMenu}>Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
