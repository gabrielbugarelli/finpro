import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { httpClient } from "../../services/HttpClient"

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos oito caracteres')
})

type FormData = z.infer<typeof schema>

export const useLoginController = () => {
  const { register, formState: {errors}, handleSubmit: hookFormHandleSubmit } = useForm<FormData>({ resolver: zodResolver(schema)});

  const handleSubmit = hookFormHandleSubmit(async(data) => {
    const response = await httpClient.post('auth/signin', data)

    console.log(response.data);

  })

  return { handleSubmit, register, errors }
}
