import LoggedLayout from '../layouts/LoggedLayout'
import HomePage from '../components/HomePage'

export default function Home() {
  return (
    <LoggedLayout>
      <HomePage />
    </LoggedLayout>
  )
}
