import { useEffect, useState } from 'react'

import OrderList from '../../components/OrdersList'
import useOrders from '../../hooks/useOrders'
import style from './CheckOrders.module.css'

export default function NewOrders() {
  const [ordersChecked, setOrdersChecked] = useState(null)
  const { orders } = useOrders()

  useEffect(() => {
    const ordersFilter = orders?.filter(
      (order) =>
        order?.deliveryIn !== undefined &&
        order?.orderSend === undefined &&
        order
    )
    setOrdersChecked(ordersFilter)
  }, [orders])

  return (
    <div className={style.home}>
      <h1>
        Pedidos confirmados sin enviar: <span>{ordersChecked?.length}</span>
      </h1>
      <OrderList orders={ordersChecked} />
    </div>
  )
}
