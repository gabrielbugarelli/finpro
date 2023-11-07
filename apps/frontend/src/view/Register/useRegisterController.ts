import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos oito caracteres')
})

type FormRegisterType = z.infer<typeof schema>

export const useRegisterController = () => {
  const { register, handleSubmit: handleFormSubmit, formState: {errors} } = useForm<FormRegisterType>({resolver: zodResolver(schema)});

  const handleSubmit = handleFormSubmit((data) => {
    console.log(data)
  })

  return {handleSubmit, register, errors}
}
