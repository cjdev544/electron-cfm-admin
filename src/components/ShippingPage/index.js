import OptionCarComponent from '../OptionCarComponent'
import style from './ShippingPage.module.css'

export default function ShippingPage({ options, setComponent }) {
  return (
    <div className={style.container}>
      <h2>Cambiar costos de envio por distancia</h2>
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
