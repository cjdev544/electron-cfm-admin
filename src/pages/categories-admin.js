import { useState } from 'react'

import LoggedLayout from '../layouts/LoggedLayout'
import CategoriesPage from '../components/CategoriesPage'

export default function CategoriesAdmin() {
  const [component, setComponent] = useState(null)

  const categoriesOptions = [
    'Crear categoría',
    'Cambiar categoría',
    'Eliminar categoría',
  ]

  return (
    <LoggedLayout>
      {!component ? (
        <CategoriesPage
          options={categoriesOptions}
          setComponent={setComponent}
        />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
