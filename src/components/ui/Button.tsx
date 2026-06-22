import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporate-green disabled:pointer-events-none disabled:opacity-50 h-14 px-8 w-full text-lg"

    const variants = {
      primary: "bg-corporate-green text-white hover:bg-corporate-green-dark shadow-sm",
      secondary: "bg-gray-100 text-charcoal hover:bg-gray-200",
      outline: "border-2 border-gray-200 bg-transparent text-charcoal hover:bg-gray-50",
      ghost: "bg-transparent text-gray-500 hover:text-charcoal hover:bg-gray-50",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"
