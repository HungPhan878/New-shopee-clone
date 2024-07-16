import Login from '@/pages/Login/Login'
import Register from '@/pages/Register'
import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return routeElements
}
