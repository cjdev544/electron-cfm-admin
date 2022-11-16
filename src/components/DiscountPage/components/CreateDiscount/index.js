import { useState } from 'react'

import DiscountForm from './components/DiscountForm'
import style from './CreateDiscount.module.css'

export default function CreateDiscount() {
  const [formData, setFormData] = useState({
    discountFor: 'all',
    name: null,
    discount: null,
    type: null,
    expDate: new Date(),
    expNumber: null,
    restaurant: null,
    clientEmail: null,
  })
  const { discountFor } = formData

  return (
    <div className={style.container}>
      <h1>Crear cupon para:</h1>
      <div className={style.flex}>
        <div
          className={style.button}
          style={
            discountFor === 'all'
              ? { borderColor: '#1db954', color: '#1db954' }
              : { color: '#fff' }
          }
          onClick={() => setFormData({ ...formData, discountFor: 'all' })}
        >
          Todos los restaurantes
        </div>
        <div
          className={style.button}
          style={
            discountFor === 'one'
              ? { borderColor: '#1db954', color: '#1db954' }
              : { color: '#fff' }
          }
          onClick={() => setFormData({ ...formData, discountFor: 'one' })}
        >
          Un solo restaurante
        </div>
        <div
          className={style.button}
          style={
            discountFor === 'client'
              ? { borderColor: '#1db954', color: '#1db954' }
              : { color: '#fff' }
          }
          onClick={() => setFormData({ ...formData, discountFor: 'client' })}
        >
          Un cliente en específico
        </div>
      </div>
      <DiscountForm formData={formData} setFormData={setFormData} />
    </div>
  )
}
