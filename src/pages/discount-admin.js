import { useState } from 'react'

import LoggedLayout from '../layouts/LoggedLayout'
import DiscountPage from '../components/DiscountPage'

export default function DiscountAdmin() {
  const [component, setComponent] = useState(null)

  const categoriesOptions = ['Cupones activos', 'Crear cupon', 'Eliminar cupon']

  return (
    <LoggedLayout>
      {!component ? (
        <DiscountPage options={categoriesOptions} setComponent={setComponent} />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
