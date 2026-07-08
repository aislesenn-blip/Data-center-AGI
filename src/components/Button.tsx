"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, children, disabled, ...props }, ref) => {

    const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-xl",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-xl",
    };

    const sizes = {
      default: "h-14 px-8 py-2",
      sm: "h-10 rounded-xl px-4 text-sm",
      lg: "h-16 rounded-2xl px-10 text-lg",
      icon: "h-12 w-12",
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
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
