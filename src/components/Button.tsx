"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, children, disabled, ...props }, ref) => {

    const variants = {
      primary: "bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] shadow-sm",
      secondary: "bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#EBEBEB]",
      outline: "border border-[#E5E5E5] bg-transparent text-[#0A0A0A] hover:bg-[#F5F5F5]",
      ghost: "bg-transparent text-[#0A0A0A] hover:bg-[#F5F5F5]",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 rounded-md px-4 text-sm",
      lg: "h-14 rounded-xl px-8 text-lg font-semibold",
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
