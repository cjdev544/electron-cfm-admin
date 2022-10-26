import { useContext, useEffect } from 'react'

import OrdersContext from '../context/orders/ordersContext'
import {
  listenOrdersTodayAndYesterdayServices,
  getAllOrdersServices,
  updateOrderServices,
} from '../services/orders'

export default function useOrders() {
  const {
    orders,
    allOrders,
    startAlarm,
    setOrders,
    setAllOrders,
    setStartAlarm,
  } = useContext(OrdersContext)

  useEffect(() => {
    listenOrdersTodayAndYesterdayServices(setOrders, setStartAlarm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  const getOrders = async () => {
    if (allOrders.length === 0) {
      const allOrders = await getAllOrdersServices()
      const orders = allOrders?.filter((order) => order.cancel === null)
      setAllOrders(orders)
    }
  }

  const updateOrder = async (order) => {
    await updateOrderServices(order)
  }

  return {
    orders,
    allOrders,
    startAlarm,
    setStartAlarm,
    updateOrder,
  }
}
