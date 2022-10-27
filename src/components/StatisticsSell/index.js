import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { round } from 'mathjs'

import useOrders from '../../hooks/useOrders'
import style from './StatisticsSell.module.css'
import LineChart from './components/LineChart'
import { DAYS, MONTHS } from '../../helpers/getLabels'

export default function StatisticsSell() {
  const { allOrders } = useOrders()

  const [availableYears, setAvailableYears] = useState([])
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
    if (!montSelected) {
      getOrdersForYear(yearSelected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [montSelected, isShowAmount])

  const ordersForYear = (year) => {
    const orders = allOrders.filter(
      (order) => format(order.createdAt, 'y') === year
    )
    return orders
  }

  const setScoresYear = (amountArray, sellsArray) => {
    if (isShowAmount) {
      setScores(amountArray)
      setLabels(MONTHS)
      setLegend('Ventas en €')
    } else {
      setScores(sellsArray)
      setLabels(MONTHS)
      setLegend('Número de ventas')
    }
  }

  const getOrdersForYear = (year) => {
    setYearSelected(year)
    setShowMonths(false)

    const orders = ordersForYear(year)

    const amountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const sellsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    orders.forEach((order) => {
      const mont = Number(format(order.createdAt, 'M'))
      amountArray[mont - 1] += round(order.totalCompra, 2)
      sellsArray[mont - 1] += 1
    })
    setScoresYear(amountArray, sellsArray)
  }

  return (
    <div className={style.settings}>
      <h1>Estadisticas de ventas en el tiempo</h1>
      <div className={style.flex}>
        {availableYears.length > 0 &&
          availableYears.map((year) => (
            <div
              key={year}
              className={style.button}
              onClick={() => getOrdersForYear(year)}
            >
              <h3>{year}</h3>
            </div>
          ))}
      </div>
      <div>
        {yearSelected &&
          (isShowAmount ? (
            <p onClick={() => setIsShowAmount(false)}>
              Cambiar grafico por cantidad de ventas
            </p>
          ) : (
            <p onClick={() => setIsShowAmount(true)}>
              Cambiar grafico por ganancias en €
            </p>
          ))}
        {yearSelected && <p onClick={() => setShowMonths(true)}>Ver meces</p>}
      </div>
      <div className={style.flex}>
        {showMonths &&
          MONTHS.map((mont) => (
            <div key={mont} className={style.button}>
              <h3>{mont}</h3>
            </div>
          ))}
      </div>
      {yearSelected && (
        <LineChart scores={scores} labels={labels} legend={legend} />
      )}
    </div>
  )
}
