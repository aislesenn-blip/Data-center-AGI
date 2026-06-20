import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-brand text-brand-foreground hover:bg-brand-hover": variant === "default",
            "border border-surface-600 bg-transparent hover:bg-surface-800 text-foreground": variant === "outline",
            "hover:bg-surface-800 text-foreground": variant === "ghost",
            "bg-surface-800 text-foreground hover:bg-surface-700": variant === "secondary",
            "h-14 px-8": size === "default",
            "h-10 rounded-full px-4": size === "sm",
            "h-16 rounded-full px-10 text-base": size === "lg",
            "h-14 w-14": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }