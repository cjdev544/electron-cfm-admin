import LoggedLayout from '../layouts/LoggedLayout'
import NewOrdersPage from '../components/NewOrdersPage'

export default function Home() {
  return (
    <LoggedLayout>
      <NewOrdersPage />
    </LoggedLayout>
  )
}
