import { useEffect, useState } from 'react'
import { round } from 'mathjs'

import useUsers from '../../hooks/useUsers'
import useOrders from '../../hooks/useOrders'

export default function StatisticsClients() {
  const { users } = useUsers()
  const { allOrders } = useOrders()
  const [clientBuyAndAmount, setClientBuyAndAmount] = useState()
  const [arrSortBuy, setArrSortBuy] = useState([])
  const [arrSortBuyWithClient, setArrSortBuyWithClient] = useState([])
  const [arrSortAmount, setArrSortAmount] = useState([])
  const [arrSortAmountWithClient, setArrSortAmountWithClient] = useState([])
  const [buyOrAmount, setBuyOrAmount] = useState(true)

  useEffect(() => {
    let buyUser = []
    allOrders.forEach((order) => {
      const clientId = order.usuario
      if (clientId in buyUser) {
        buyUser[clientId].buy += 1
        buyUser[clientId].totalAmount = round(
          buyUser[clientId].totalAmount + order.totalCompra,
          2
        )
        buyUser[clientId].orders = [
          ...buyUser[clientId].orders,
          { createdAt: order.createdAt, pedido: order.pedido },
        ]
      } else {
        buyUser[clientId] = {
          uid: clientId,
          buy: 1,
          totalAmount: order.totalCompra,
          orders: [{ createdAt: order.createdAt, orders: order.pedido }],
        }
      }
    })
    setClientBuyAndAmount(buyUser)
  }, [allOrders])

  useEffect(() => {
    let arr = []
    for (const key in clientBuyAndAmount) {
      arr.push(clientBuyAndAmount[key])
    }
    const arrSortBuy = arr.sort((a, b) => b.buy - a.buy)
    const arrSortAmount = arr.sort((a, b) => b.totalAmount - a.totalAmount)
    setArrSortBuy(arrSortBuy.slice(0, 49))
    setArrSortAmount(arrSortAmount.slice(0, 49))
  }, [clientBuyAndAmount])

  useEffect(() => {
    if (arrSortBuy.length && users.length) {
      const clients = arrSortBuy.map((clientBuy) => {
        const user = users.find((user) => user.uid === clientBuy.uid)
        return { ...user, ...clientBuy }
      })
      const arrSort = clients.sort((a, b) => b.buy - a.buy)
      setArrSortBuyWithClient(arrSort)
    }
  }, [arrSortBuy, users])

  useEffect(() => {
    if (arrSortAmount.length && users.length) {
      const clients = arrSortAmount.map((clientBuy) => {
        const user = users.find((user) => user.uid === clientBuy.uid)
        return { ...user, ...clientBuy }
      })
      const arrSort = clients.sort((a, b) => b.totalAmount - a.totalAmount)
      setArrSortAmountWithClient(arrSort)
    }
  }, [arrSortAmount, users])
  console.log({ arrSortAmountWithClient })
  console.log({ arrSortBuyWithClient })
  return (
    <div>
      <h1>Mejores 50 clientes</h1>
      <div onClick={() => setBuyOrAmount(!buyOrAmount)}>
        {buyOrAmount
          ? 'Mejores clientes por número de compras'
          : 'Mejores clientes por Dinero gastado'}
      </div>
      <div className=''></div>
    </div>
  )
}
