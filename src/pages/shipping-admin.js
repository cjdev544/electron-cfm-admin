import { useState } from 'react'

import ShippingPage from '../components/ShippingPage'
import LoggedLayout from '../layouts/LoggedLayout'

export default function ShippingAdmin() {
  const [component, setComponent] = useState(null)

  const shippingAdmin = ['0 a 2 km', '2 a 6 km', '6 a 10 km']

  return (
    <LoggedLayout>
      {!component ? (
        <ShippingPage options={shippingAdmin} setComponent={setComponent} />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
