import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function RegisterForm({ onSuccess }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfoMessage('')

    if (password.length < 6) {
      setError('Паролата трябва да е поне 6 символа.')
      return
    }
    if (password !== confirmPassword) {
      setError('Паролите не съвпадат.')
      return
    }

    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      onSuccess()
    } else {
      setInfoMessage('Регистрацията е успешна. Провери имейла си, за да потвърдиш акаунта.')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName">Име</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Имейл</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Парола</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Потвърди парола</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p role="alert" className="form-error">{error}</p>}
      {infoMessage && <p className="form-info">{infoMessage}</p>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Регистрация...' : 'Регистрирай се'}
      </button>
    </form>
  )
}
