import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

type AuthGuardProps = {
  isPrivate: boolean
}

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { signedIn } = useAuth();

  if(!signedIn && isPrivate) {
    return <Navigate to='/login' replace />
  }

  if(signedIn && !isPrivate) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
