import { useState } from 'react'
import AuthContext from './authContext'

export default function AuthState({ children }) {
  const [user, setUser] = useState(undefined)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
