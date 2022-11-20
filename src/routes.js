import { createHashRouter } from 'react-router-dom'

import Home from './pages/home'
import NewOrders from './pages/neworders'
import CheckOrders from './pages/checkorders'
import SendOrders from './pages/sendorders'
import CancelOrders from './pages/cancelorders'
import Settings from './pages/settings'
import HomeAdmin from './pages/home-admin'
import ProductsAdmin from './pages/products-admin'
import CategoriesAdmin from './pages/categories-admin'
import ShippingAdmin from './pages/shipping-admin'
import DiscountAdmin from './pages/discount-admin'
import CloseOneRestaurant from './pages/close-one-restaurant'
import Order from './pages/order'
import Statistics from './pages/statistics'

export const privateRoutes = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/neworders',
    element: <NewOrders />,
  },
  {
    path: '/checkorders',
    element: <CheckOrders />,
  },
  {
    path: '/sendorders',
    element: <SendOrders />,
  },
  {
    path: '/cancelorders',
    element: <CancelOrders />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/home-admin',
    element: <HomeAdmin />,
  },
  {
    path: '/products-admin',
    element: <ProductsAdmin />,
  },
  {
    path: '/categories-admin',
    element: <CategoriesAdmin />,
  },
  {
    path: '/shipping-admin',
    element: <ShippingAdmin />,
  },
  {
    path: '/discount-admin',
    element: <DiscountAdmin />,
  },
  {
    path: '/close-one-restaurant',
    element: <CloseOneRestaurant />,
  },
  {
    path: '/statistics',
    element: <Statistics />,
  },
  {
    path: '/order/:id',
    element: <Order />,
  },
])
