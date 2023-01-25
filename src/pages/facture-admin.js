import { useState } from 'react'

import LoggedLayout from '../layouts/LoggedLayout'
import FacturePage from '../components/FacturePage'

export default function FactureAdmin() {
  const [component, setComponent] = useState(null)

  const factureOptions = ['Por número', 'Por nombre']

  return (
    <LoggedLayout>
      {!component ? (
        <FacturePage
          factureOptions={factureOptions}
          setComponent={setComponent}
        />
      ) : (
        component
      )}
    </LoggedLayout>
  )
}
