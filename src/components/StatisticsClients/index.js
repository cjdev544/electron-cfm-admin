import { useEffect } from 'react'
import { round } from 'mathjs'

import useOrders from '../../hooks/useOrders'

export default function StatisticsClients() {
  const { allOrders } = useOrders()

  useEffect(() => {
    let buyUser = []
    allOrders.forEach((order) => {
      const clientId = order.usuario

      if (clientId in buyUser) {
        buyUser[clientId].buy += 1
        buyUser[clientId].totalAmount += round(order.totalCompra, 2)
        buyUser[clientId].orders = [
          ...buyUser[clientId].orders,
          { createdAt: order.createdAt, pedido: order.pedido },
        ]
      } else {
        buyUser[clientId] = {
          buy: 1,
          totalAmount: order.totalCompra,
          orders: [{ createdAt: order.createdAt, orders: order.pedido }],
          username: order.username,
        }
      }
    })
    console.log(buyUser)
  }, [allOrders])

  return (
    <div>
      <h1>StatisticsClients</h1>
    </div>
  )
}
