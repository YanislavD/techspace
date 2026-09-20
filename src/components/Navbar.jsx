import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav>
      <Link to="/">TechSpace</Link>

      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={signOut}>Изход</button>
        </>
      ) : (
        <>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
