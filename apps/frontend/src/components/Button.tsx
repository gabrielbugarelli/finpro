import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'>;

export const Button: React.FC<ButtonProps> = ({children, ...props}) => {
  return (
    <button
      {...props}
      className="h-12 font-medium rounded-lg text-gray-100 bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all active:bg-teal-900"
    >
      {children}
    </button>
  )
}
