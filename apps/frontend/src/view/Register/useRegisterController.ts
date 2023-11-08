import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { SignupParams, authService } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos oito caracteres')
})

type FormRegisterType = z.infer<typeof schema>

export const useRegisterController = () => {
  const { register, handleSubmit: handleFormSubmit, formState: {errors} } = useForm<FormRegisterType>({resolver: zodResolver(schema)});

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignupParams) => {
      return await authService.signup(data)
    }
  })

  const handleSubmit = handleFormSubmit(async(data) => {
    try {
      await mutateAsync(data);
      toast.success("Conta criada com sucesso! 😃")
    } catch (error) {
      toast.error("Ocorreu um erro ao criar a conta! 😔")
    }
  })

  return {handleSubmit, register, errors, isPending}
}
