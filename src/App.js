import { ToastContainer } from 'react-toastify'
import './css/globals.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

import RestaurantsState from './context/restaurants/RestaurantsState'
import ProductsState from './context/products/ProductsState'
import OrdersState from './context/orders/OrdersState'
import useAuth from './hooks/useAuth'
import Auth from './components/Auth'

export default function App() {
  const { user } = useAuth()
  console.log(user)
  return (
    <RestaurantsState>
      <ProductsState>
        <OrdersState>
          {user ? <h1>Mi App</h1> : <Auth />}
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
        </OrdersState>
      </ProductsState>
    </RestaurantsState>
  )
}
