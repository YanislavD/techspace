import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'

function PrivateRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
