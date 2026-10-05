import { createContext, useContext } from 'react'

export const AuthModalContext = createContext(null)

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used inside AuthModalProvider')
  return ctx
}
