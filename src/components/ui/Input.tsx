import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-sm font-semibold text-rich-black block">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-14 w-full rounded-xl border border-border bg-white px-4 py-2 text-base text-rich-black shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-charcoal/40 focus-visible:outline-none focus-visible:border-rich-black focus-visible:ring-1 focus-visible:ring-rich-black disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-12",
              error && "border-accent-orange focus-visible:border-accent-orange focus-visible:ring-accent-orange",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-accent-orange font-medium">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
