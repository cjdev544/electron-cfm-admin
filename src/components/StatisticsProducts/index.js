import useStatisticsProducts from './hook/useStatisticsProducts'
import { MONTHS } from '../../helpers/getLabels'
import DoughnutChart from '../Charts/DoughnutChart'
import TableTopProducts from './components/TableTopProducts'
import style from './StatisticsProducts.module.css'

export default function StatisticsProducts() {
  const {
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
  } = useStatisticsProducts()

  return (
    <div className={style.settings}>
      <h1>Estadisticas de productos mas vendidos</h1>
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
      {bgColors && bordersColors && (
        <div className={style.flexChart}>
          <DoughnutChart
            scores={scoreDonuts}
            legend={labelDonuts}
            bgColor={bgColors}
            borderColor={bordersColors}
          />
        </div>
      )}
      <TableTopProducts data={topBuy} />
    </div>
  )
}
