import useRestaurants from '../../hooks/useRestaurants'
import useProducts from '../../hooks/useProducts'
import OptionCarPage from '../OptionCarPage'
import style from './Settings.module.css'

export default function SettingsPage({ options }) {
  useRestaurants()
  useProducts()

  return (
    <div className={style.settings}>
      <h1>Administrador del restaurante</h1>
      <div className={style.flex}>
        {options.map((name) => (
          <OptionCarPage key={name} option={name} />
        ))}
      </div>
    </div>
  )
}
