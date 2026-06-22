import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light" | "icon"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isLight = variant === "light"
  const isIcon = variant === "icon"

  return (
    <div className={cn("flex items-center space-x-2.5 select-none", className)}>
      {/*
        Abstract Symbol representing forward movement, time, and structured routes.
        Two parallel geometric shapes intersecting slightly to form a subtle 'T' and an arrow.
      */}
      <div className="relative flex items-center justify-center">
        <div className={cn(
          "w-5 h-5 rounded-[4px] rotate-45 transform origin-center transition-colors duration-300",
          isLight ? "bg-white" : "bg-rich-black"
        )} />
        <div className={cn(
          "absolute -right-2 -top-1 w-5 h-5 rounded-[4px] rotate-45 transform origin-center opacity-80",
          isLight ? "border-[3px] border-white/60" : "border-[3px] border-rich-black/40"
        )} />
      </div>

      {!isIcon && (
        <span className={cn(
          "font-bold tracking-tight text-xl leading-none",
          isLight ? "text-white" : "text-rich-black"
        )}>
          TIMEBUS
        </span>
      )}
    </div>
  )
}
