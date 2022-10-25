import LoggedLayout from '../layouts/LoggedLayout'
import CheckOrdersPage from '../components/CheckOrdersPage'

export default function Home() {
  return (
    <LoggedLayout>
      <CheckOrdersPage />
    </LoggedLayout>
  )
}
