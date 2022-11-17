import { useState } from 'react'
import { Form } from 'semantic-ui-react'

import useRestaurants from '../../../../hooks/useRestaurants'
import useUsers from '../../../../hooks/useUsers'
import DiscountForm from './components/DiscountForm'
import style from './CreateDiscount.module.css'

export default function CreateDiscount() {
  const { restaurants } = useRestaurants()
  const { users } = useUsers()

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
  const { discountFor, restaurant, clientEmail } = formData

  const allRestaurants = restaurants?.map((rest) => ({
    key: rest?.id,
    value: rest?.page,
    text: rest?.name,
  }))

  const optionUsers = users?.map((user) => ({
    key: user.email,
    text: user.email,
    value: user.email,
  }))

  if (!restaurants) return null

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
      {discountFor === 'all' && (
        <DiscountForm formData={formData} setFormData={setFormData} />
      )}
      {discountFor === 'one' && (
        <>
          <Form className='createAndChangeProduct'>
            <Form.Select
              label='Selecciona el restaurante'
              placeholder='Restaurante'
              options={allRestaurants}
              onChange={(_e, option) =>
                setFormData({ ...formData, restaurant: option.value })
              }
            />
          </Form>
          {restaurant && (
            <DiscountForm formData={formData} setFormData={setFormData} />
          )}
        </>
      )}
      {discountFor === 'client' && (
        <>
          <Form className='createAndChangeProduct'>
            <Form.Dropdown
              label='Selecciona el usuario por su email'
              placeholder='Email de usuario'
              fluid
              search
              selection
              options={optionUsers}
              onChange={(_e, option) =>
                setFormData({ ...formData, clientEmail: option.value })
              }
            />
          </Form>
          {clientEmail && (
            <DiscountForm formData={formData} setFormData={setFormData} />
          )}
        </>
      )}
    </div>
  )
}
