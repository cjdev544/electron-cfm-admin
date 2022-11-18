import { NavLink } from 'react-router-dom'
import { Menu, Icon, Image } from 'semantic-ui-react'

import Logo from '../../../assets/png/logo.png'

export default function MenuLeft() {
  return (
    <Menu className='menu-left' vertical>
      <div className='logo'>
        <Image src={Logo} width={100} alt='Logo' />
        <h5>
          Administrador y gestor de pedidos <span>CentralFood Málaga</span>
        </h5>
      </div>
      <div className='top'>
        <Menu.Item as={NavLink} to='/' end>
          <Icon name='home' />
          Inicio
        </Menu.Item>
        <Menu.Item as={NavLink} to='/neworders'>
          <Icon name='clipboard list' />
          Nuevos
        </Menu.Item>
        <Menu.Item as={NavLink} to='/checkorders'>
          <Icon name='calendar check' />
          Confirmados
        </Menu.Item>
        <Menu.Item as={NavLink} to='/sendorders'>
          <Icon name='send' />
          Enviados
        </Menu.Item>
        <Menu.Item as={NavLink} to='/cancelorders'>
          <Icon name='cancel' />
          Cancelados
        </Menu.Item>
      </div>
    </Menu>
  )
}
