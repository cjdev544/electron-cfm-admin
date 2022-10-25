import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'

import useAuth from '../../../hooks/useAuth'
import DefaultUserImage from '../../../assets/png/user.png'
import style from './TopBar.module.css'

const TopBar = () => {
  const { logout } = useAuth()

  return (
    <div className={style.topBar}>
      <div className={style.right}>
        <Link href='/settings'>
          <Image src={DefaultUserImage} alt='Image avatar' />
          Administrador
        </Link>
        <div className={style.close} onClick={logout}>
          <Icon name='power off' />
          Cerrar sesión
        </div>
      </div>
    </div>
  )
}

export default TopBar
