import { useEffect, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import useUsers from '../../../hooks/useUsers'
import useOrders from '../../../hooks/useOrders'
import OrderList from '../../OrdersList'
import style from './facture.module.css'

export default function ForName() {
  const { users } = useUsers()
  const { allOrders } = useOrders()

  const [optionUsers, setOptionUsers] = useState([])
  const [searchClient, setSearchClient] = useState('')
  const [searchOrders, setSearchOrders] = useState(null)

  useEffect(() => {
    if (users?.length) {
      const optionUsers = users?.map((user) => ({
        key: user.uid,
        text: user.username,
        value: user.uid,
      }))
      setOptionUsers(optionUsers)
    }
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchClient) {
      toast.warning('Debes seleccionar un cliente')
      return
    }

    const userOrders = allOrders?.filter(
      (order) => order.usuario === searchClient
    )

    if (userOrders.length) {
      setSearchOrders(userOrders)
    } else {
      setSearchOrders('not found')
    }
  }
  return (
    <div className={style.container}>
      <h2>Buscar factura por nombre de cliente</h2>
      <Form className={style.form} onSubmit={handleSubmit}>
        <Form.Dropdown
          placeholder='Nombre del cliente'
          fluid
          search
          selection
          options={optionUsers}
          onChange={(_e, option) => setSearchClient(option.value)}
        />
        <Button type='submit'>Buscar</Button>
        <div className={style.notFound}>
          {searchOrders === 'not found' && (
            <p>El cliente no tiene compras realizadas</p>
          )}
          {searchOrders !== 'not found' && searchOrders !== null && (
            <OrderList orders={searchOrders} />
          )}
        </div>
      </Form>
    </div>
  )
}
