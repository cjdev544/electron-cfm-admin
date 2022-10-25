import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import OrderList from '../../components/OrdersList'
import useOrders from '../../hooks/useOrders'
import style from './CancelOrders.module.css'

const NewOrders = () => {
  const [cancelOrders, setCancelOrders] = useState(null)
  const { orders } = useOrders()

  useEffect(() => {
    const ordersFilter = orders?.filter((order) => order?.cancel !== undefined)

    const ordersToDay = ordersFilter?.filter(
      (order) =>
        format(order.createdAt, 'dd/MM/yy') === format(Date.now(), 'dd/MM/yy')
    )
    setCancelOrders(ordersToDay)
  }, [orders])

  return (
    <div className={style.home}>
      <h1>
        Pedidos cancelados <span>{cancelOrders?.length}</span>
      </h1>
      <OrderList orders={cancelOrders} />
    </div>
  )
}

export default NewOrders
