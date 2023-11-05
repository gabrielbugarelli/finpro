import { Link } from "react-router-dom"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export const Login = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <Link to="/register" className="tracking-[-0.5px] font-medium text-teal-900">Crie uma conta</Link>
        </p>
      </header>

      <form className="flex flex-col gap-4 mt-[60px]">
        <Input type="email" name="email" placeholder="E-mail"/>
        <Input type="password" name="password" placeholder="Senha"/>

        <Button type="submit" className="mt-2">Entrar</Button>
      </form>
    </>
  )
}
