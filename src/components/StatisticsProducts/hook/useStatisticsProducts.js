import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { round } from 'mathjs'

import useOrders from '../../../hooks/useOrders'
import useProducts from '../../../hooks/useProducts'
import { BGCOLORS, BORDERCOLORS } from '../../../helpers/colorsChart'

export default function useStatisticsProducts() {
  const { allOrders } = useOrders()
  const { products } = useProducts()

  const [orders, setOrders] = useState(null)
  const [ordersFlat, setOrdersFlat] = useState(null)
  const [availableYears, setAvailableYears] = useState([])
  const [yearSelected, setYearSelected] = useState(null)
  const [montSelected, setMontSelected] = useState(null)
  const [showMonths, setShowMonths] = useState(false)
  const [ordersForBuyNumber, setOrdersForBuyNumber] = useState(null)
  const [topBuy, setTopBuy] = useState(null)
  const [scoreDonuts, setScoreDonuts] = useState(null)
  const [labelDonuts, setLabelDonuts] = useState(null)
  const [bgColors, setBgColors] = useState(null)
  const [bordersColors, setBordersColors] = useState(null)

  useEffect(() => {
    setOrders(allOrders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOrders])

  useEffect(() => {
    if (allOrders.length > 0) {
      const years = []

      allOrders.forEach((order) => {
        const orderYear = format(order.createdAt, 'y')
        const yearExist = years.find((element) => element === orderYear)
        if (!yearExist) years.push(orderYear)
      })
      setAvailableYears(years)
    }
  }, [allOrders])

  useEffect(() => {
    if (yearSelected && !montSelected) {
      getOrdersForYear(yearSelected)
    }
    if (montSelected) {
      getOrdersForMont(montSelected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [montSelected, yearSelected])

  useEffect(() => {
    if (orders) {
      let ordersProducts = []
      orders.forEach((order) => {
        const products = order.pedido
        ordersProducts.push(products)
      })
      setOrdersFlat(ordersProducts.flat())
    }
  }, [orders])

  useEffect(() => {
    if (ordersFlat) {
      let ordersForBuyNumber = []
      ordersFlat.forEach((product) => {
        const productId = product.id
        if (productId in ordersForBuyNumber) {
          ordersForBuyNumber[productId].buy = round(
            ordersForBuyNumber[productId].buy + product.cantidadDelProducto,
            2
          )
        } else {
          ordersForBuyNumber[productId] = {
            productId: productId,
            buy: product.cantidadDelProducto,
          }
        }
      })
      setOrdersForBuyNumber(ordersForBuyNumber)
    }
  }, [ordersFlat])

  useEffect(() => {
    if (ordersForBuyNumber) {
      let arr = []
      let buyRest = []
      let scores = []
      let labels = []

      for (const key in ordersForBuyNumber) {
        const product = products.find((product) => product.id === key)
        arr.push({
          ...ordersForBuyNumber[key],
          name: product.nombre,
          restaurant: product.restaurante,
        })
      }
      const arrSortBuy = arr.sort((a, b) => b.buy - a.buy)

      arrSortBuy.forEach((order) => {
        if (order.restaurant in buyRest) {
          buyRest[order.restaurant] += order.buy
        } else {
          buyRest[order.restaurant] = order.buy
        }
      })

      for (const key in buyRest) {
        labels = [...labels, key]
        scores = [...scores, buyRest[key]]
      }
      setLabelDonuts(labels)
      setScoreDonuts(scores)
      setTopBuy(arrSortBuy)
    }
  }, [ordersForBuyNumber, products])

  useEffect(() => {
    if (labelDonuts) {
      const numberLabels = labelDonuts.length
      if (numberLabels === 1) {
        setBgColors([BGCOLORS[0]])
        setBordersColors([BORDERCOLORS[0]])
      } else if (numberLabels === 2) {
        setBgColors(BGCOLORS.slice(0, 2))
        setBordersColors(BORDERCOLORS.slice(0, 2))
      } else if (numberLabels === 3) {
        setBgColors(BGCOLORS.slice(0, 3))
        setBordersColors(BORDERCOLORS.slice(0, 3))
      } else if (numberLabels === 4) {
        setBgColors(BGCOLORS.slice(0, 4))
        setBordersColors(BORDERCOLORS.slice(0, 4))
      } else if (numberLabels === 5) {
        setBgColors(BGCOLORS.slice(0, 5))
        setBordersColors(BORDERCOLORS.slice(0, 5))
      }
    }
  }, [labelDonuts])

  const ordersForYear = (year) => {
    const orders = allOrders.filter(
      (order) => format(order.createdAt, 'y') === year
    )
    return orders
  }

  const ordersForMont = (mont) => {
    const ordersYear = ordersForYear(yearSelected)
    const orders = ordersYear.filter(
      (order) => format(order.createdAt, 'MMMM', { locale: es }) === mont
    )
    return orders
  }

  const getOrdersForYear = (year) => {
    setYearSelected(year)
    setShowMonths(false)
    setMontSelected(null)

    const orders = ordersForYear(year)
    setOrders(orders)
  }

  const getOrdersForMont = (mont) => {
    setMontSelected(mont)

    const ordersMont = ordersForMont(mont)
    setOrders(ordersMont)
  }

  return {
    availableYears,
    yearSelected,
    montSelected,
    showMonths,
    labelDonuts,
    scoreDonuts,
    bgColors,
    bordersColors,
    topBuy,
    getOrdersForYear,
    setShowMonths,
    getOrdersForMont,
  }
}
