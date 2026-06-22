import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-sm font-semibold text-rich-black block">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "appearance-none flex h-14 w-full rounded-xl border border-border bg-white px-4 py-2 pr-10 text-base text-rich-black shadow-sm transition-all focus-visible:outline-none focus-visible:border-rich-black focus-visible:ring-1 focus-visible:ring-rich-black disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-accent-orange focus-visible:border-accent-orange focus-visible:ring-accent-orange",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        {error && (
          <p className="text-xs text-accent-orange font-medium">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
