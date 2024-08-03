/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { createContext, useState } from 'react'

// components
import { getAccessTokenFromLS, getProfileFromLS } from '@/components/utils/auth'
import { User } from '@/type/user.type'

interface InitialValueType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialValue: InitialValueType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const Context = createContext<InitialValueType>(initialValue)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialValue.profile)

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
