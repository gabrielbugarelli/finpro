import { useForm } from "react-hook-form"

export const useLoginController = () => {
  const { register, handleSubmit: hookFormHandleSubmit } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({data})
  })

  return { handleSubmit, register }
}
