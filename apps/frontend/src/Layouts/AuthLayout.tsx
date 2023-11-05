import { Outlet } from "react-router-dom"
import dashboardIllustration from '../assets/dashboard_illustration.png'

export const AuthLayout = () => {
  return (
    <section className="flex flex-row-reverse h-full">

      <section className="flex relative justify-center items-center h-full w-1/2  p-8">
        <img
          src={dashboardIllustration} alt="Illustration of dashboard"
          className="object-cover h-full w-full max-w-[656px] max-h-[960px] rounded-[32px] select-none"
        />

        <section className="absolute bottom-8 w-[656px] p-10 bg-white rounded-b-[32px]">
          <label className="font-bold text-teal-900 text-2xl">Finpro</label>
          <p className="text-gray-700 font-medium text-xl mt-4">
            Gerencie suas finanças pessoais de uma forma simples com o Finpro!
          </p>
        </section>
      </section>

      <section className="h-full w-1/2">
        <Outlet />
      </section>
    </section>
  )
}
