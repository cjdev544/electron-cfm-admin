import { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import TableOrders from './TableOrders'

export default function AccordionFluid({ buyOrAmount, data }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleClick = (_e, { index }) => {
    if (activeIndex === index) {
      setActiveIndex(false)
    } else {
      setActiveIndex(index)
    }
  }
  if (!data) return null

  return (
    <Accordion fluid styled>
      {data.map((client, idx) => (
        <div key={client.id}>
          <Accordion.Title
            active={activeIndex === idx}
            index={idx}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            {idx + 1} -- {client.username} -- {client.email} --{' '}
            {buyOrAmount
              ? `Gastos: ${client.totalAmount}€`
              : `N° de compras: ${client.buy}`}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === idx}>
            <TableOrders ordersClient={client.orders} />
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  )
}
