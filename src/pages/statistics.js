import { useState } from 'react'

import LoggedLayout from '../layouts/LoggedLayout'
import StatisticsPage from '../components/StatisticsPage'

export default function Statistics() {
  const [component, setComponent] = useState(null)

  const options = ['Ventas', 'Clientes', 'Productos']

  return (
    <LoggedLayout>
      {!component ? (
        <StatisticsPage options={options} setComponent={setComponent} />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
