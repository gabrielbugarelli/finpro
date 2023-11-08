import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { authService } from "../../services/authService"

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos oito caracteres')
})

type FormData = z.infer<typeof schema>

export const useLoginController = () => {
  const { register, formState: {errors}, handleSubmit: hookFormHandleSubmit } = useForm<FormData>({ resolver: zodResolver(schema)});

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: {email: string, password: string}) => {
      return await authService.signin(data)
    }
  })

  const handleSubmit = hookFormHandleSubmit(async(data) => {
    try {
      await mutateAsync( data );
    } catch (error) {
      toast.error("Credenciais inválidas! 😕")
    }
  })

  return { handleSubmit, register, errors, isPending }
}
