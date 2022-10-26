import OptionCarComponent from '../OptionCarComponent'
import style from './StatisticsPage.module.css'

export default function StatisticsPage({ options, setComponent }) {
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
