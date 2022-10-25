import LoggedLayout from '../layouts/LoggedLayout'
import SendOrdersPage from '../components/SendOrdersPage'

export default function Home() {
  return (
    <LoggedLayout>
      <SendOrdersPage />
    </LoggedLayout>
  )
}
