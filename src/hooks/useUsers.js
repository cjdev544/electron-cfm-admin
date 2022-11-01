import { useContext, useEffect } from 'react'

import UsersContext from '../context/users/usersContext'
import { getAllUsersServices } from '../services/users'

export default function useUsers() {
  const { users, setUsers } = useContext(UsersContext)

  useEffect(() => {
    if (!users) {
      getUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  const getUsers = async () => {
    const users = await getAllUsersServices()
    setUsers(users)
  }

  return {
    users,
  }
}
