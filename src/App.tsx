/* eslint-disable import/no-unresolved */
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
