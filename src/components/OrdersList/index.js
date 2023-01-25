import { Grid } from 'semantic-ui-react'

import Order from './components/Order'
import { useEffect, useState } from 'react'

const OrderList = ({ orders }) => {
  const [sortOrders, setSortOrders] = useState([])

  useEffect(() => {
    if (orders?.length) {
      setSortOrders(orders.sort((a, b) => b.createdAt - a.createdAt))
    }
  }, [orders])

  if (!orders?.length || orders.length === 0) return null

  return (
    <Grid>
      {sortOrders?.map((order) => (
        <Grid.Column key={order.id} mobile={16} tablet={8} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default OrderList
