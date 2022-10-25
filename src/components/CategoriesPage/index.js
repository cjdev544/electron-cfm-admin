import useRestaurants from '../../hooks/useRestaurants'
import OptionCarComponent from '../OptionCarComponent'
import style from './CategoriesAdmin.module.css'

export default function CategoriesPage({ options, setComponent }) {
  useRestaurants()

  return (
    <div className={style.settings}>
      <h1>Administrador del categorias</h1>
      <div className={style.flex}>
        {options.map((name) => (
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
