import { Link } from 'react-router-dom'

import style from './OptionCar.module.css'

export default function OptionCar({ option }) {
  const options = {
    'Página de inicio': '/home-admin',
    Productos: '/products-admin',
    Categorías: '/categories-admin',
    'Costos de envío': '/shipping-admin',
    'Cupones descuento': '/discount-admin',
    Estadisticas: '/statistics',
    'Primera compra': '/first-buy',
    'Cierre individual': '/close-one-restaurant',
  }

  const goToPage = options[option] || '/'

  return (
    <Link to={goToPage} className={style.car}>
      <h3>{option}</h3>
    </Link>
  )
}
