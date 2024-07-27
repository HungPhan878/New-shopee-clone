/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// Components
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import MainLayout from '@/layouts/MainLayout'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'

const isAuthentication = false

const ProtectedRoute: () => JSX.Element = () => {
  return isAuthentication ? <Outlet /> : <Navigate to='/login' />
}

const RejectedRoute: () => JSX.Element = () => {
  return !isAuthentication ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
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
        }
      ]
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
