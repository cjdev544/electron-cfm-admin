import useProducts from '../../hooks/useProducts'
import useRestaurants from '../../hooks/useRestaurants'
import OptionCarComponent from '../OptionCarComponent'
import style from './ProductsPage.module.css'

export default function ProductsPage({ productOptions, setComponent }) {
  useRestaurants()
  useProducts()

  return (
    <div className={style.settings}>
      <h1>Administrador productos</h1>
      <div className={style.flex}>
        {productOptions.map((name) => (
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
