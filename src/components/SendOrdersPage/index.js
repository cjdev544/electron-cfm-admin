import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import OrderList from '../../components/OrdersList'
import useOrders from '../../hooks/useOrders'
import style from './SendOrders.module.css'

export default function SendOrdersPage() {
  const [ordersSend, setOrdersSend] = useState(null)
  const { orders } = useOrders()

  useEffect(() => {
    const ordersFilter = orders?.filter(
      (order) => order?.orderSend !== undefined && order?.cancel === undefined
    )
    const ordersToDay = ordersFilter?.filter(
      (order) =>
        format(order.createdAt, 'dd/MM/yy') === format(Date.now(), 'dd/MM/yy')
    )
    setOrdersSend(ordersToDay)
  }, [orders])

  return (
    <div className={style.home}>
      <h1>
        Pedidos enviados hoy: <span>{ordersSend?.length}</span>
      </h1>
      <OrderList orders={ordersSend} />
    </div>
  )
}
