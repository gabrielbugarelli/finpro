import { createContext } from "react";


type AuthContextValue = {
  signedIn: boolean
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthContext.Provider value={{signedIn: false}}>
      { children }
    </AuthContext.Provider>
  )
}
