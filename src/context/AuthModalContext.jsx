import { useState } from 'react'
import { AuthModalContext } from './auth-modal-context.js'

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
