import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'

function GuestRoute() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default GuestRoute
