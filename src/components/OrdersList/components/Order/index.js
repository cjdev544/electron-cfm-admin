import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceStrict } from 'date-fns'
import { round } from 'mathjs'

import { getColorAlert } from '../../../../helpers/getColorAlert'
import style from './Order.module.css'

export default function Order({ order }) {
  const [colorAlert, setColorAlert] = useState('')

  useEffect(() => {
    getColorAlert(setColorAlert, order)
  }, [order])

  const timeAgo = formatDistanceStrict(new Date(), order?.createdAt, {
    unit: 'minute',
  })

  return (
    <Link to={`/order/${order.id}`} className='link'>
      <div className={style.order}>
        <div
          className={style.header}
          style={{ backgroundColor: `${colorAlert}` }}
        >
          <p>
            Realizado: <span>{timeAgo}</span>
          </p>
          <p>
            Pedido: <span>{order.id}</span>
          </p>
        </div>
        {!order?.idPago ? (
          <div className={style.noPay}>
            <p>PEDIDO POR PAGAR</p>
            <p>Pagara: {order.cash}€</p>
            <p>Cambio: {round(Number(order.cash) - order.totalCompra, 2)}€</p>
          </div>
        ) : (
          <div className={style.noPay}>
            <p>PEDIDO YA PAGADO</p>
          </div>
        )}
        {order?.cancel && (
          <h2 style={{ color: '#000', textAlign: 'center' }}>
            PEDIDO CANCELADO
          </h2>
        )}
        <div className={style.delivery}>
          <p>
            Fecha de entrega: <span>{order.fechaEntrega}</span>
          </p>
          <p>
            Hora de entrega: <span>{order.horaEntrega}</span>
          </p>
        </div>
        <div className={style.address}>
          {order.direccionEnvio === 'Recogida el en local' &&
          order.direccionEnvio === 'Recogida en el local' ? (
            <p>Recojida en el local</p>
          ) : (
            <p>Entrega a domicilio</p>
          )}
        </div>
        <div className={style.body}>
          {order.pedido.map((product) => (
            <div key={product.id} className={style.product}>
              {product.cantidadDelProducto} x {product.producto}
            </div>
          ))}
        </div>
        {order?.idPago ? (
          <p className={style.total}>Total pagado: {order.totalCompra}€</p>
        ) : (
          <p className={style.total}>Total por pagar: {order.totalCompra}€</p>
        )}
      </div>
    </Link>
  )
}
