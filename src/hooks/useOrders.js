import { useContext, useEffect } from 'react'

import OrdersContext from '../context/orders/ordersContext'
import {
  listenOrdersTodayAndYesterdayServices,
  updateOrderServices,
} from '../services/orders'

export default function useOrders() {
  const { orders, startAlarm, setOrders, setStartAlarm } =
    useContext(OrdersContext)

  useEffect(() => {
    listenOrdersTodayAndYesterdayServices(setOrders, setStartAlarm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateOrder = async (order) => {
    await updateOrderServices(order)
  }

  return {
    orders,
    startAlarm,
    setStartAlarm,
    updateOrder,
  }
}
