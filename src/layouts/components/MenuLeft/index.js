import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

export default function MenuLeft() {
  return (
    <Menu className='menu-left' vertical>
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
