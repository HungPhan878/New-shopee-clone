/* eslint-disable import/no-unresolved */
import useRouteElements from './hooks/useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return <>{routeElements}</>
}

export default App
