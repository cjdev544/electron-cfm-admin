import useStatisticsClients from './hook/useStatisticsClients'
import AccordionFluid from './components/AccordionFluid'
import style from './StatisticsClients.module.css'

export default function StatisticsClients() {
  const {
    buyOrAmount,
    arrSortAmountWithClient,
    arrSortBuyWithClient,
    setBuyOrAmount,
  } = useStatisticsClients()

  return (
    <div className={style.settings}>
      <h1>Top de los mejores clientes</h1>
      <div
        className={style.buttonTop}
        onClick={() => setBuyOrAmount(!buyOrAmount)}
      >
        {buyOrAmount
          ? 'Cambiar a mejores clientes por número de compras'
          : 'Cambiar a mejores clientes por Dinero gastado'}
      </div>
      <div className=''></div>
      <AccordionFluid
        buyOrAmount={buyOrAmount}
        data={buyOrAmount ? arrSortAmountWithClient : arrSortBuyWithClient}
      />
    </div>
  )
}
