import { useState } from 'react'
import UsersContext from './usersContext'

export default function UsersState({ children }) {
  const [users, setUsers] = useState(null)

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}
