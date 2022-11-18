import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'

import useDiscount from '../../../../../hooks/useDiscount'

export default function DiscountForm({ formData, setFormData }) {
  setDefaultLocale(es)
  const navigate = useNavigate()

  const discountTypes = [
    { key: 1, value: 'date', text: 'Por fecha límite' },
    { key: 2, value: 'use', text: 'Por límite de uso' },
  ]
  const { createDiscount } = useDiscount()

  const {
    discountFor,
    expDate,
    type,
    name,
    discount,
    expNumber,
    restaurant,
    clientEmail,
  } = formData

  const [isLoading, setIsLoading] = useState(false)

  const createDate = (date) => {
    const dateFormat = format(date, 'dd/MM/y')
    setFormData({ ...formData, expDate: date, dateFormat })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!name) {
      toast.warning('El nombre del cupon es obligatorio')
      setIsLoading(false)
      return
    }

    if (!discount) {
      toast.warning('Seleciona el porcentaje de descuento')
      setIsLoading(false)
      return
    }

    if (!type) {
      toast.warning('Seleciona como se vencera el cupon')
      setIsLoading(false)
      return
    }

    if (type === 'use') {
      if (!expNumber) {
        toast.warning(
          'Seleciona la cantidad de veces que se puede utilizar el cupon'
        )
        setIsLoading(false)
        return
      }
    }

    if (discountFor === 'one') {
      if (!restaurant) {
        toast.warning('Seleciona el restaurante que se le aplicara el cupon')
        setIsLoading(false)
        return
      }
    }

    if (discountFor === 'cliente') {
      if (!clientEmail) {
        toast.warning('Seleciona el cliente que utilizara el cupon')
        setIsLoading(false)
        return
      }
    }

    createDiscount(formData, setIsLoading)
    navigate('/settings')
  }

  return (
    <Form className='createAndChangeProduct' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          autoFocus
          label='Nombre para el cupon'
          type='text'
          autoComplete='off'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Form.Input
          label='Porcentaje de descueento'
          type='number'
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
        />
      </Form.Group>
      <Form.Select
        label='Como vencera el cupon'
        placeholder='Tipo de expiración del cupon'
        options={discountTypes}
        onChange={(_e, option) =>
          setFormData({ ...formData, type: option.value })
        }
      />
      {type === 'date' && (
        <DatePicker
          dateFormat='dd/MM/yy'
          selected={expDate}
          onChange={(date) => createDate(date)}
          //minDate={new Date()}
          mini
        />
      )}
      {type === 'use' && (
        <Form.Input
          label='Indica cuantas veces puede ser utilizado'
          type='number'
          name='numberDiscount'
          onChange={(e) =>
            setFormData({ ...formData, expNumber: e.target.value })
          }
        />
      )}
      {type && (
        <Button type='submit' loading={isLoading}>
          Crear cupon
        </Button>
      )}
    </Form>
  )
}
