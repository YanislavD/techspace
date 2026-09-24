import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-eyebrow">Достъп за студенти</span>
        <h1 style={{ margin: '0 0 4px' }}>Вход</h1>
        <p className="auth-subtitle">Влез, за да видиш резервациите си.</p>

        <LoginForm onSuccess={() => navigate('/')} />

        <p className="auth-switch">
          Нямаш акаунт? <Link to="/register">Регистрирай се</Link>
        </p>
      </div>
    </div>
  )
}
