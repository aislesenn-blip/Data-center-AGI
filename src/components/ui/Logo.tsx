import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isLight = variant === "light"

  return (
    <div className={cn("flex items-center select-none space-x-0.5", className)}>
      <span className={cn(
        "font-bold tracking-tight text-xl leading-none",
        isLight ? "text-white" : "text-rich-black"
      )}>
        Time
      </span>
      <span className={cn(
        "font-black tracking-tighter text-xl leading-none relative",
        isLight ? "text-white" : "text-rich-black"
      )}>
        bus
        {/* Subtle motion/transport cue integrated into the wordmark */}
        <div className={cn(
          "absolute -bottom-1 left-0 right-0 h-[3px] rounded-full opacity-80",
          isLight ? "bg-white" : "bg-rich-black"
        )} />
      </span>
    </div>
  )
}
