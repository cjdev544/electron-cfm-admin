import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './css/globals.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

import RestaurantsState from './context/restaurants/RestaurantsState'
import ProductsState from './context/products/ProductsState'
import OrdersState from './context/orders/OrdersState'
import UsersState from './context/users/UsersState'
import useAuth from './hooks/useAuth'
import Auth from './components/Auth'
import { privateRoutes } from './routes'

export default function App() {
  const { user } = useAuth()

  return (
    <RestaurantsState>
      <ProductsState>
        <OrdersState>
          <UsersState>
            {user ? <RouterProvider router={privateRoutes} /> : <Auth />}
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover={false}
            />
          </UsersState>
        </OrdersState>
      </ProductsState>
    </RestaurantsState>
  )
}
