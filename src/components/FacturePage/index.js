import useProducts from '../../hooks/useProducts'
import useRestaurants from '../../hooks/useRestaurants'
import OptionCarComponent from '../OptionCarComponent'
import style from './FacturePage.module.css'

export default function FacturePage({ factureOptions, setComponent }) {
  useRestaurants()
  useProducts()

  return (
    <div className={style.settings}>
      <h1>Buscar Factura</h1>
      <div className={style.flex}>
        {factureOptions.map((name) => (
          <OptionCarComponent
            key={name}
            option={name}
            setComponent={setComponent}
          />
        ))}
      </div>
    </div>
  )
}
