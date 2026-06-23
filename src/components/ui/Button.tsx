import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy-blue text-white hover:bg-navy-blue/90 shadow-sm",
        secondary: "bg-stone-gray text-midnight-black hover:bg-border border border-border",
        outline: "border border-border bg-transparent hover:bg-stone-gray text-midnight-black",
        ghost: "hover:bg-stone-gray text-midnight-black",
        gold: "bg-subtle-gold text-midnight-black hover:bg-subtle-gold/90 shadow-sm",
      },
      size: {
        default: "h-14 px-6 py-4",
        sm: "h-10 px-4 text-sm",
        lg: "h-16 px-8 text-lg",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
         <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
