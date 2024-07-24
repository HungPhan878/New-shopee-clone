/* eslint-disable import/no-unresolved */
import { useRoutes } from 'react-router-dom'

// Components
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import MainLayout from '@/layouts/MainLayout'
import ProductList from '@/pages/ProductList'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
