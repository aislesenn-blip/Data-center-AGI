import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-corporate-green text-white hover:bg-corporate-green-light active:bg-corporate-green-dark shadow-sm",
        outline: "border-2 border-corporate-green text-corporate-green bg-transparent hover:bg-soft-gray",
        ghost: "hover:bg-soft-gray text-charcoal",
        link: "text-corporate-green underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-6 py-4", // Large, touch-friendly tap targets
        sm: "h-10 rounded-md px-3",
        lg: "h-16 rounded-xl px-8 text-lg",
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
    // We'd typically use @radix-ui/react-slot here, but falling back to standard element
    // if not installed to avoid dependency issues for this specific test
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
