import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-rich-black text-white hover:bg-rich-black/90 active:scale-[0.98]",
        secondary: "bg-light-gray text-rich-black hover:bg-light-gray/80 active:scale-[0.98]",
        outline: "border-2 border-border bg-transparent hover:bg-light-gray text-rich-black",
        ghost: "hover:bg-light-gray text-charcoal",
        accent: "bg-accent-blue text-white hover:bg-accent-blue/90 active:scale-[0.98]",
      },
      size: {
        default: "h-14 px-6 py-4", // Generous touch targets
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-16 rounded-2xl px-8 text-lg",
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
