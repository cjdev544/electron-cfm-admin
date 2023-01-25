import { useState } from 'react'
import { Form } from 'semantic-ui-react'

import useUsers from '../../../../hooks/useUsers'
import DiscountForm from './components/DiscountForm'
import style from './CreateDiscount.module.css'

export default function CreateDiscount() {
  const { users } = useUsers()

  const [formData, setFormData] = useState({
    discountFor: 'all',
    name: null,
    discount: null,
    type: null,
    expDate: new Date(),
    expNumber: null,
    clientEmail: null,
    use: 0,
  })
  const { discountFor, clientEmail } = formData

  const optionUsers = users?.map((user) => ({
    key: user.uid,
    text: user.email,
    value: user.email,
  }))

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
          Para todos los Clientes
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
