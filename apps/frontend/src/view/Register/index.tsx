import { Link } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { useRegisterController } from "./useRegisterController"

export const Register = () => {
  const { register, errors, handleSubmit } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center text-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Crie a sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já tem uma conta?</span>
          <Link to="/login" className="tracking-[-0.5px] font-medium text-teal-900">Fazer login</Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-[60px]">
        <Input type="text" placeholder="Nome" {...register("name")} errorMessage={errors.name?.message}  />
        <Input type="email" placeholder="E-mail" {...register("email")} errorMessage={errors.email?.message}  />
        <Input type="password" placeholder="Senha" {...register("password")} errorMessage={errors.password?.message} />

        <Button type="submit" className="mt-2">Criar conta</Button>
      </form>
    </>
  )
}
