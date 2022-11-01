import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Table } from 'semantic-ui-react'

export default function TableOrders({ ordersClient }) {
  const [ordersSort, setOrdersSort] = useState([])

  useEffect(() => {
    if (ordersClient) {
      const ordersSort = ordersClient.sort((a, b) => b.createdAt - a.createdAt)
      setOrdersSort(ordersSort)
    }
  }, [ordersClient])

  return (
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell collapsing></Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Pedido</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {ordersSort.map((order, idx) => (
          <Table.Row key={idx}>
            <Table.Cell collapsing>{idx + 1}</Table.Cell>
            <Table.Cell>{format(order.createdAt, 'dd/MM/yy')}</Table.Cell>
            <Table.Cell>
              {order.pedido.map((product) => (
                <span>
                  {`✔ ${product.producto} - Catntidad del Producto: ${product.cantidadDelProducto}`}
                  <br />
                </span>
              ))}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
