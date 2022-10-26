import { useEffect, useState } from 'react'
import useOrders from '../../hooks/useOrders'

export default function StatisticsSell() {
  const { allOrders } = useOrders()
  const [orders, setOrders] = useState([])
  console.log(orders)

  useEffect(() => {
    if (allOrders) {
      const ordersFilter = allOrders.map((order) => {
        return {
          createdAt: order.createdAt,
          totalCompra: order.totalCompra,
        }
      })
      setOrders(ordersFilter)
    }
  }, [allOrders])

  return (
    <div>
      <h1>StatisticsSell</h1>
    </div>
  )
}
