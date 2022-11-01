import { Table } from 'semantic-ui-react'

export default function TableTopProducts({ data }) {
  if (!data) return null

  return (
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell collapsing></Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Restaurante</Table.HeaderCell>
          <Table.HeaderCell>N° de ventas</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((product, idx) => (
          <Table.Row key={product.productId}>
            <Table.Cell collapsing>{idx + 1}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.restaurant}</Table.Cell>
            <Table.Cell>{product.buy}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
