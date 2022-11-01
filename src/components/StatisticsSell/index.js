import useStatisticsSell from './hook/useStatisticsSell'
import { MONTHS } from '../../helpers/getLabels'
import LineChart from '../Charts/LineChart'
import DoughnutChart from '../Charts/DoughnutChart'
import style from './StatisticsSell.module.css'

export default function StatisticsSell() {
  const {
    payPercentage,
    totalAmount,
    dataWithCar,
    dataWithCash,
    availableYears,
    yearSelected,
    montSelected,
    isShowAmount,
    showMonths,
    scores,
    labels,
    legend,
    allOrders,
    dataWithYearOrMont,
    getOrdersForYear,
    setIsShowAmount,
    setShowMonths,
    getOrdersForMont,
  } = useStatisticsSell()

  return (
    <div className={style.settings}>
      <h1>Estadisticas de ventas en el tiempo</h1>
      <div className={style.flex}>
        {availableYears.length > 0 &&
          availableYears.map((year) => (
            <div
              key={year}
              className={style.button}
              style={
                yearSelected === year
                  ? { borderColor: '#1db954', color: '#1db954' }
                  : { color: '#fff' }
              }
              onClick={() => getOrdersForYear(year)}
            >
              <h4>{year}</h4>
            </div>
          ))}
      </div>
      <div className={style.flexTop}>
        {yearSelected &&
          (isShowAmount ? (
            <div
              className={style.buttonTop}
              onClick={() => setIsShowAmount(false)}
            >
              Cambiar grafico por cantidad de ventas
            </div>
          ) : (
            <div
              className={style.buttonTop}
              onClick={() => setIsShowAmount(true)}
            >
              Cambiar grafico por ganancias en €
            </div>
          ))}
        {yearSelected && !showMonths && (
          <div className={style.buttonTop} onClick={() => setShowMonths(true)}>
            Ver meses
          </div>
        )}
      </div>
      <div className={style.flex}>
        {showMonths &&
          MONTHS.map((mont) => (
            <div
              key={mont}
              className={style.button}
              style={
                montSelected === mont
                  ? { borderColor: '#1db954', color: '#1db954' }
                  : { color: '#fff' }
              }
              onClick={() => getOrdersForMont(mont)}
            >
              <h4>{mont}</h4>
            </div>
          ))}
      </div>
      {!yearSelected && (
        <div className={style.flexChart}>
          <DoughnutChart
            scores={payPercentage}
            legend={['% Pagos Tarjeta', '% Pagos efectivo']}
            bgColor={['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)']}
            borderColor={['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)']}
          />
          <div className={style.totals}>
            <p>
              <span>Pagos totales:</span> {allOrders?.length}
            </p>
            <p>
              <span>Total en ventas:</span> {totalAmount}€
            </p>
            <p>
              <span>Pagos con targeta:</span> {dataWithCar[0]} -{' '}
              {dataWithCar[1]}€
            </p>
            <p>
              <span>Pagos con efectivo:</span> {dataWithCash[0]} -{' '}
              {dataWithCash[1]}€
            </p>
          </div>
        </div>
      )}
      {yearSelected && (
        <>
          <div className={style.totals}>
            <span>Ventas totales: </span> {dataWithYearOrMont[0]} -{' '}
            {dataWithYearOrMont[1]}€
          </div>
          <LineChart scores={scores} labels={labels} legend={legend} />
        </>
      )}
    </div>
  )
}
