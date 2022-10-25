import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import useAuth from '../../../hooks/useAuth'
import style from './TopBar.module.css'

const TopBar = () => {
  const { logout } = useAuth()

  return (
    <div className={style.topBar}>
      <div className={style.right}>
        <NavLink to='/settings' className={style.link}>
          <Icon name='user circle outline' />
          Administrador
        </NavLink>
        <div className={style.close} onClick={logout}>
          <Icon name='power off' />
          Cerrar sesión
        </div>
      </div>
    </div>
  )
}

export default TopBar
