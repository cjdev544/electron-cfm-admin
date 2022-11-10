import { useEffect, useState } from 'react'
import { round } from 'mathjs'

import useOrders from '../../../hooks/useOrders'
import useUsers from '../../../hooks/useUsers'

export default function useStatisticsClients() {
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
          orders: [{ createdAt: order.createdAt, pedido: order.pedido }],
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
    if (arrSortBuy?.length && users?.length) {
      const clients = arrSortBuy.map((clientBuy) => {
        const user = users.find((user) => user.uid === clientBuy.uid)
        return { ...user, ...clientBuy }
      })
      const arrSort = clients.sort((a, b) => b.buy - a.buy)
      setArrSortBuyWithClient(arrSort)
    }
  }, [arrSortBuy, users])

  useEffect(() => {
    if (arrSortAmount?.length && users?.length) {
      const clients = arrSortAmount.map((clientBuy) => {
        const user = users.find((user) => user.uid === clientBuy.uid)
        return { ...user, ...clientBuy }
      })
      const arrSort = clients.sort((a, b) => b.totalAmount - a.totalAmount)
      setArrSortAmountWithClient(arrSort)
    }
  }, [arrSortAmount, users])

  return {
    users,
    buyOrAmount,
    arrSortAmountWithClient,
    arrSortBuyWithClient,
    setBuyOrAmount,
  }
}
