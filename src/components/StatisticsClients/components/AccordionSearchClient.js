import { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import TableOrders from './TableOrders'

export default function AccordionSearchClient({ data }) {
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
      <div key={data.uid}>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          {data.username} -- {data.email} --
          {data.buy
            ? `N° de compras: ${data.buy} -- Gastos: ${data.totalAmount}€`
            : ` NO HA REALIZADO COMPRAS`}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <TableOrders ordersClient={data.orders} />
        </Accordion.Content>
      </div>
    </Accordion>
  )
}
