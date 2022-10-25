import useHomePage from '../hooks/useHomePage'
import LoggedLayout from '../layouts/LoggedLayout'
import HomeAdminPage from '../components/HomeAdminPage'

export default function HomeAdmin() {
  const { dataHome } = useHomePage()

  return (
    <LoggedLayout>
      {dataHome ? (
        <HomeAdminPage />
      ) : (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Cargando...
        </p>
      )}
    </LoggedLayout>
  )
}
