import { useState } from 'react'

import LoggedLayout from '../layouts/LoggedLayout'
import ProductsPage from '../components/ProductsPage'

export default function ProductsAdmin() {
  const [component, setComponent] = useState(null)

  const productOptions = [
    'Crear producto',
    'Cambiar producto',
    'Eliminar producto',
  ]

  return (
    <LoggedLayout>
      {!component ? (
        <ProductsPage
          productOptions={productOptions}
          setComponent={setComponent}
        />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
