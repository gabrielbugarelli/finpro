import { Outlet } from "react-router-dom"
import dashboardIllustration from '../assets/dashboard_illustration.png'

export const AuthLayout = () => {
  return (
    <section className="flex h-full">
      <section className="h-full w-full flex items-center justify-center flex-col gap-16 lg:w-1/2">
        <label className="font-bold text-teal-900 text-2xl">Finpro</label>

        <section className="w-full max-w-[504px] px-8">
          <Outlet />
        </section>
      </section>

      <section className="relative justify-center items-center h-full w-1/2  p-8 hidden lg:flex">
        <img
          src={dashboardIllustration} alt="Illustration of dashboard"
          className="object-cover h-full w-full max-w-[656px] max-h-[960px] rounded-[32px] select-none"
        />

        <section className="absolute bottom-8 max-w-[656px] mx-4 p-10 bg-white rounded-b-[32px]">
          <label className="font-bold text-teal-900 text-2xl">Finpro</label>
          <p className="text-gray-700 font-medium text-xl mt-4">
            Gerencie suas finanças pessoais de uma forma simples com o Finpro!
          </p>
        </section>
      </section>
    </section>
  )
}
