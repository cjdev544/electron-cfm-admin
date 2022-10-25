import { useEffect, useState } from 'react'
import useOrders from '../../hooks/useOrders'
import OrderList from '../OrdersList'
import style from './NewOrders.module.css'

export default function NewOrdersPage() {
  const [newOrders, setNewOrders] = useState(null)
  const { orders } = useOrders()

  useEffect(() => {
    const ordersFilter = orders?.filter(
      (order) => !order?.deliveryIn && !order?.cancel
    )
    setNewOrders(ordersFilter)
  }, [orders])

  return (
    <div className={style.home}>
      <h1>
        Nuevos pedidos <span>{newOrders?.length}</span>
      </h1>
      <OrderList orders={newOrders} />
    </div>
  )
}
