import useStatisticsSell from './hook/useStatisticsSell'
import { MONTHS } from '../../helpers/getLabels'
import LineChart from './components/LineChart'
import DoughnutChart from './components/DoughnutChart'
import style from './StatisticsSell.module.css'

export default function StatisticsSell() {
  const {
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
            Ver meces
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
      {!yearSelected && <DoughnutChart scores={payPercentage} />}
      {yearSelected && (
        <LineChart scores={scores} labels={labels} legend={legend} />
      )}
    </div>
  )
}
