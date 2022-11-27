import { Form } from 'semantic-ui-react'

import useStatisticsClients from './hook/useStatisticsClients'
import AccordionFluid from './components/AccordionFluid'
import AccordionSearchClient from './components/AccordionSearchClient'
import style from './StatisticsClients.module.css'

export default function StatisticsClients() {
  const {
    users,
    optionUsers,
    buyOrAmount,
    arrSortAmountWithClient,
    arrSortBuyWithClient,
    searchClient,
    ordersSearchClient,
    setBuyOrAmount,
    setSearchClient,
  } = useStatisticsClients()

  return (
    <div className={style.settings}>
      <h1>Top de los mejores clientes</h1>
      <h4>{users?.length} Clientes registrados</h4>
      <div
        className={style.buttonTop}
        onClick={() => setBuyOrAmount(!buyOrAmount)}
      >
        {buyOrAmount
          ? 'Cambiar a mejores clientes por número de compras'
          : 'Cambiar a mejores clientes por Dinero gastado'}
      </div>
      <div className={style.search}>
        <Form.Dropdown
          label='Selecciona el usuario por su nombre'
          placeholder='Nombre del usuario'
          fluid
          search
          selection
          options={optionUsers}
          onChange={(_e, option) => setSearchClient(option.value)}
        />
      </div>
      {searchClient ? (
        <>
          <div className={style.buttonTop} onClick={() => setSearchClient('')}>
            Ver todos
          </div>
          <AccordionSearchClient data={ordersSearchClient} />
        </>
      ) : (
        <AccordionFluid
          buyOrAmount={buyOrAmount}
          data={buyOrAmount ? arrSortAmountWithClient : arrSortBuyWithClient}
        />
      )}
    </div>
  )
}
