import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <section>
      <h1>AuthLayout</h1>

      <Outlet />
    </section>
  )
}
