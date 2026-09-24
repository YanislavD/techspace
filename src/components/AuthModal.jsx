import { useAuthModal } from '../context/AuthModalContext.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

export default function AuthModal() {
  const { isOpen, tab, closeModal, switchTab } = useAuthModal()

  if (!isOpen) return null

  const isLogin = tab === 'login'

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="modal-close" onClick={closeModal} aria-label="Затвори">
          ✕
        </button>

        <div className="auth-tabs">
          <button
            className={isLogin ? 'auth-tab auth-tab-active' : 'auth-tab'}
            onClick={() => switchTab('login')}
          >
            Вход
          </button>
          <button
            className={!isLogin ? 'auth-tab auth-tab-active' : 'auth-tab'}
            onClick={() => switchTab('register')}
          >
            Регистрация
          </button>
        </div>

        {isLogin ? (
          <LoginForm onSuccess={closeModal} />
        ) : (
          <RegisterForm onSuccess={closeModal} />
        )}
      </div>
    </div>
  )
}
