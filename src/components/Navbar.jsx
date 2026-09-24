import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__logo">TS</span>
        <span className="navbar__brand-text">
          <span className="navbar__brand-name">TechSpace</span>
          <span className="navbar__brand-subtitle">Университетска техника</span>
        </span>
      </Link>

      <div className="navbar__links">
        <Link to="/equipment">Каталог</Link>
        {user && <Link to="/my-bookings">Моите резервации</Link>}
      </div>

      <div className="navbar__auth">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={signOut}>Изход</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register" className="navbar__cta">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
