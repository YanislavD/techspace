import { useNavigate, Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm.jsx'

export default function Register() {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-eyebrow">Достъп за студенти</span>
        <h1 style={{ margin: '0 0 4px' }}>Регистрация</h1>
        <p className="auth-subtitle">Създай профил с университетския си имейл.</p>

        <RegisterForm onSuccess={() => navigate('/')} />

        <p className="auth-switch">
          Вече имаш акаунт? <Link to="/login">Влез</Link>
        </p>
      </div>
    </div>
  )
}
