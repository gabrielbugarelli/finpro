import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos oito caracteres')
})

type FormData = z.infer<typeof schema>

export const useLoginController = () => {
  const { register, formState: {errors}, handleSubmit: hookFormHandleSubmit } = useForm<FormData>({ resolver: zodResolver(schema)});

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data)
  })

  return { handleSubmit, register, errors }
}
