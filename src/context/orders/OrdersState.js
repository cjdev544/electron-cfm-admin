import { useState } from 'react'

import OrdersContext from './ordersContext'

export default function OrdersState({ children }) {
  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [startAlarm, setStartAlarm] = useState(null)

  return (
    <OrdersContext.Provider
      value={{
        orders,
        allOrders,
        startAlarm,
        setOrders,
        setAllOrders,
        setStartAlarm,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
