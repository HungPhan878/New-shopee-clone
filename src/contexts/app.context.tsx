/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { createContext, useState } from 'react'

// components
import { getAccessTokenToLS } from '@/components/utils/auth'

interface InitialValueType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValue: InitialValueType = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null
}

export const Context = createContext<InitialValueType>(initialValue)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated)

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</Context.Provider>
  )
}

export default ContextProvider
