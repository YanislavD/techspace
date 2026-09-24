import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Вход</h1>
      <LoginForm onSuccess={() => navigate('/')} />
      <p>
        Нямаш акаунт? <Link to="/register">Регистрирай се</Link>
      </p>
    </div>
  )
}
