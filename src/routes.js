import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/home'
import NewOrders from './pages/neworders'
import CheckOrders from './pages/checkorders'
import SendOrders from './pages/sendorders'
import CancelOrders from './pages/cancelorders'
import Settings from './pages/settings'
import HomeAdmin from './pages/home-admin'

export const privateRoutes = createBrowserRouter([
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
])
