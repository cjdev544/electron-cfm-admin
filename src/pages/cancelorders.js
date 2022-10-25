import LoggedLayout from '../layouts/LoggedLayout'
import CancelOrdersPage from '../components/CancelOrdersPage'

export default function Home() {
  return (
    <LoggedLayout>
      <CancelOrdersPage />
    </LoggedLayout>
  )
}
