import { ComponentProps } from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  isLoading?: boolean
} & ComponentProps<'button'>

export const Button: React.FC<ButtonProps> = ({children, className, isLoading, disabled, ...props}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn("h-12 font-medium rounded-lg text-gray-100 bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all active:bg-teal-900", className)}
    >
      {children}
    </button>
  )
}
