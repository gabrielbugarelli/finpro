import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export const Register = () => {
  return (
    <>
      <header className="flex flex-col items-center text-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Crie a sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já tem uma conta?</span>
          <Link to="/login" className="tracking-[-0.5px] font-medium text-teal-900">Fazer login</Link>
        </p>
      </header>

      <form className="flex flex-col gap-4 mt-[60px]">
        <Input type="text" name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="E-mail"/>
        <Input type="password" name="password" placeholder="Senha"/>

        <Button type="submit" className="mt-2">Criar conta</Button>
      </form>
    </>
  )
}
