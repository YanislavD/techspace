import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext(null)

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState('login')

  const value = {
    isOpen,
    tab,
    openModal: (initialTab = 'login') => {
      setTab(initialTab)
      setIsOpen(true)
    },
    closeModal: () => setIsOpen(false),
    switchTab: (nextTab) => setTab(nextTab),
  }

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used inside AuthModalProvider')
  return ctx
}
