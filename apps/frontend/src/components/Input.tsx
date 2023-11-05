import type { ComponentProps } from "react"

type InputProps = {
  name: string
} & ComponentProps<'input'>

export const Input: React.FC<InputProps> = ({ id, name, placeholder, ...props }) => {
  const inputId = id ?? name;

  return (
    <section className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        placeholder=" "
        className="bg-white w-full pt-4 rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 outline-none transition-all"
      />

      <label
        htmlFor={inputId}
        // className="absolute left-[13px] top-3.5 pointer-events-none text-gray-700"
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </section>
  )
}
