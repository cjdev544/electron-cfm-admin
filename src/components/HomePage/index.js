import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import useOrders from '../../hooks/useOrders'
import OrderList from '../OrdersList'
import style from './Home.module.css'

export default function HomePage() {
  const [allOrdersToday, setAllOrdersToday] = useState(null)
  const { orders } = useOrders()

  useEffect(() => {
    const ordersToDay = orders?.filter(
      (order) =>
        format(order.createdAt, 'dd/MM/yy') === format(Date.now(), 'dd/MM/yy')
    )

    setAllOrdersToday(ordersToDay)
  }, [orders])

  return (
    <div className={style.home}>
      <h1>
        Pedidos del día <span>{allOrdersToday?.length}</span>
      </h1>
      <OrderList orders={allOrdersToday} />
    </div>
  )
}
