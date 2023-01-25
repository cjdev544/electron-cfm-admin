import SettingsPage from '../components/SettingsPage'
import LoggedLayout from '../layouts/LoggedLayout'

export default function Settings() {
  const options = [
    'Página de inicio',
    'Productos',
    'Categorías',
    'Costos de envío',
    'Cupones descuento',
    'Estadisticas',
    'Buscar factura',
    'Cierre individual',
  ]

  return (
    <LoggedLayout>
      <SettingsPage options={options} />
    </LoggedLayout>
  )
}
