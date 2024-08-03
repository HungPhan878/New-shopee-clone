/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'

// Components
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import MainLayout from '@/layouts/MainLayout'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'
import { Context } from '@/contexts/app.context'
import { path } from '@/constants/path'

const ProtectedRoute: () => JSX.Element = () => {
  const { isAuthenticated } = useContext(Context)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute: () => JSX.Element = () => {
  const { isAuthenticated } = useContext(Context)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
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
