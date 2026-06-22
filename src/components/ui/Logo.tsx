import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isLight = variant === "light"

  return (
    <div className={cn("flex items-center select-none", className)}>
      <span className={cn(
        "font-black tracking-tighter text-2xl leading-none uppercase",
        isLight ? "text-white" : "text-rich-black"
      )}>
        Timebus
      </span>
    </div>
  )
}
