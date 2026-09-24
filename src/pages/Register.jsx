import { useNavigate, Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm.jsx'

export default function Register() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Регистрация</h1>
      <RegisterForm onSuccess={() => navigate('/')} />
      <p>
        Вече имаш акаунт? <Link to="/login">Влез</Link>
      </p>
    </div>
  )
}
