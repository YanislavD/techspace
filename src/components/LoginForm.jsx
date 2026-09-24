import {supabase} from "../lib/supabaseClient.js";
import {useState} from "react";

export default function LoginForm({ onSuccess }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)

        if (signInError) {
            setError(signInError.message)
            return
        }

        onSuccess()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
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

            {error && <p role="alert" className="form-error">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Влизане...' : 'Влез'}
            </button>
        </form>
    )
}