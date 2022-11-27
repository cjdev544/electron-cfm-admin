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
  const [optionUsers, setOptionUsers] = useState([])
  const [searchClient, setSearchClient] = useState('')
  const [ordersSearchClient, setOrdersSearchClient] = useState([])

  useEffect(() => {
    if (users?.length) {
      const optionUsers = users?.map((user) => ({
        key: user.uid,
        text: user.username,
        value: user.uid,
      }))
      setOptionUsers(optionUsers)
    }
  }, [users])

  useEffect(() => {
    if (searchClient) {
      let buyUser = {}
      const client = users?.find((user) => user.id === searchClient)
      const ordersClient = allOrders.filter((order) => {
        if (order.usuario === searchClient) return order
      })

      ordersClient.forEach((order) => {
        if (buyUser.buy) {
          buyUser.buy += 1
          buyUser.totalAmount = round(
            buyUser.totalAmount + order.totalCompra,
            2
          )
          buyUser.orders = [
            ...buyUser.orders,
            { createdAt: order.createdAt, pedido: order.pedido },
          ]
        } else {
          buyUser = {
            uid: searchClient,
            buy: 1,
            totalAmount: order.totalCompra,
            orders: [{ createdAt: order.createdAt, pedido: order.pedido }],
            username: client.username,
            email: client.email,
          }
        }
      })
      if (!ordersClient?.length) {
        setOrdersSearchClient({
          username: client.username,
          email: client.email,
        })
      } else {
        setOrdersSearchClient(buyUser)
      }
    }
  }, [searchClient, allOrders, users])

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
    setArrSortBuy(arrSortBuy.slice(0, 99))
    setArrSortAmount(arrSortAmount.slice(0, 99))
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
    optionUsers,
    buyOrAmount,
    arrSortAmountWithClient,
    arrSortBuyWithClient,
    searchClient,
    ordersSearchClient,
    setBuyOrAmount,
    setSearchClient,
  }
}
