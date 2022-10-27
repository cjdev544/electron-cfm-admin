import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { round } from 'mathjs'

import useOrders from '../../../hooks/useOrders'
import { DAYS, MONTHS } from '../../../helpers/getLabels'

export default function useStatisticsSell() {
  const { allOrders } = useOrders()

  const [availableYears, setAvailableYears] = useState([])
  const [payPercentage, setPayPercentage] = useState([])
  const [yearSelected, setYearSelected] = useState(null)
  const [montSelected, setMontSelected] = useState(null)
  const [showMonths, setShowMonths] = useState(false)
  const [scores, setScores] = useState([])
  const [labels, setLabels] = useState([])
  const [legend, setLegend] = useState('')
  const [isShowAmount, setIsShowAmount] = useState(true)

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
    const totalOrders = allOrders.length
    const payWithCar = allOrders.filter((order) => order.idPago)
    const ordersPayWithCar = payWithCar.length
    const ordersPayWithCashPercentage = round(
      ((totalOrders - ordersPayWithCar) * 100) / totalOrders,
      2
    )
    const ordersPayWithCarPercentage = round(
      100 - ordersPayWithCashPercentage,
      2
    )
    setPayPercentage([ordersPayWithCarPercentage, ordersPayWithCashPercentage])
  }, [allOrders])

  useEffect(() => {
    if (!montSelected) {
      getOrdersForYear(yearSelected)
    } else {
      getOrdersForMont(montSelected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [montSelected, isShowAmount])

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

  const setScoresYearAmdMont = (amountArray, sellsArray) => {
    if (isShowAmount) {
      setScores(amountArray)
      setLegend('Ventas en €')
    } else {
      setScores(sellsArray)
      setLegend('Número de ventas')
    }
  }

  const getOrdersForYear = (year) => {
    setYearSelected(year)
    setShowMonths(false)
    setMontSelected(null)

    const orders = ordersForYear(year)

    const amountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const sellsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    orders.forEach((order) => {
      const mont = Number(format(order.createdAt, 'M'))
      amountArray[mont - 1] += round(order.totalCompra, 2)
      sellsArray[mont - 1] += 1
    })
    setLabels(MONTHS)
    setScoresYearAmdMont(amountArray, sellsArray)
  }

  const getOrdersForMont = (mont) => {
    setMontSelected(mont)

    const ordersMont = ordersForMont(mont)

    const amountArray = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ]
    const sellsArray = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ]
    ordersMont.forEach((order) => {
      const day = Number(format(order.createdAt, 'd'))
      amountArray[day] += round(order.totalCompra, 2)
      sellsArray[day] += 1
    })
    setLabels(DAYS)
    setScoresYearAmdMont(amountArray, sellsArray)
  }

  return {
    payPercentage,
    availableYears,
    yearSelected,
    montSelected,
    isShowAmount,
    showMonths,
    scores,
    labels,
    legend,
    getOrdersForYear,
    setIsShowAmount,
    setShowMonths,
    getOrdersForMont,
  }
}
