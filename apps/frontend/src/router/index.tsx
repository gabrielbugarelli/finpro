import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthGuard } from "./AuthGuard"
import { Login } from "../view/Login"
import { Dashboard } from "../view/Dashboard"
import { Register } from "../view/Register"
import { AuthLayout } from "../Layouts/AuthLayout"

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
