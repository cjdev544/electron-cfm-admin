import { useContext, useEffect } from 'react'

import AuthContext from '../context/auth/authContext'
import {
  checkUserServices,
  loginServices,
  logoutServices,
} from '../services/auth'

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    checkUserServices(setUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = (setIsLoading, handleErrors, email, password) => {
    loginServices(setIsLoading, handleErrors, email, password)
  }

  const logout = () => logoutServices()

  return {
    user,
    login,
    logout,
  }
}
