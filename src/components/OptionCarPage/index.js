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
    'Productos promoción': '/promotion-products',
    'Productos populares': '/popular-products',
    'Top productos': '/top-products',
    'Top clientes': '/top-clients',
    'Total ventas': '/total-sells',
    'Crear cupon': '/new-coupon',
    'Cambiar cupon': '/change-coupon',
    'Eliminar cupon': '/delete-coupon',
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
