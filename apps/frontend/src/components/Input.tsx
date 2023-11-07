import { ComponentProps, forwardRef } from "react"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { cn } from "../utils/cn"

type InputProps = {
  name: string
  errorMessage?: string
} & ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ id, name, errorMessage, placeholder, className, ...props }, ref) => {
  const inputId = id ?? name;

  return (
    <section className="relative">
      <input
        {...props}
        ref={ref}
        id={inputId}
        name={name}
        placeholder=" "
        className={cn("bg-white w-full pt-4 rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 outline-none transition-all", errorMessage && 'border-red-900 focus:border-red-900', className)}
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      {errorMessage &&
        <span className="flex items-center gap-1 mt-2 text-red-900 font-light text-xs">
          <CrossCircledIcon /> {errorMessage}
        </span>
      }
    </section>
  )
})


Input.displayName = 'Input'
