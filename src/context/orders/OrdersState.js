import { useState } from 'react'

import OrdersContext from './ordersContext'

export default function OrdersState({ children }) {
  const [orders, setOrders] = useState([])
  const [startAlarm, setStartAlarm] = useState(null)

  return (
    <OrdersContext.Provider
      value={{ orders, startAlarm, setOrders, setStartAlarm }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
