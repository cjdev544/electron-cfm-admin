import { Button, Form } from 'semantic-ui-react'
import { useState } from 'react'
import useOrders from '../../../hooks/useOrders'
import OrderList from '../../OrdersList'
import style from './facture.module.css'

export default function ForName() {
  const { allOrders } = useOrders()

  const [searchFacture, setSearchFacture] = useState('')
  const [facture, setFacture] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const findFacture = allOrders.filter(
      (order) => order.facture === searchFacture
    )

    if (findFacture.length) {
      setFacture(findFacture)
    } else {
      setFacture('not found')
    }
  }

  return (
    <div className={style.container}>
      <h2>Buscar factura por número</h2>
      <Form className={style.form} onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Introduce el número de factura'
          type='number'
          value={searchFacture}
          onChange={(e) => setSearchFacture(e.target.value)}
        />
        <Button type='submit'>Buscar</Button>
        <div className={style.notFound}>
          {facture === 'not found' && <p>Factura no encontrada</p>}
          {facture !== 'not found' && facture !== null && (
            <OrderList orders={facture} />
          )}
        </div>
      </Form>
    </div>
  )
}
