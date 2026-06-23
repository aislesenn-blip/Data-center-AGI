import { cn } from "@/lib/utils"

interface NetworkLogoProps {
  className?: string
  variant?: "default" | "light"
}

export function NetworkLogo({ className, variant = "default" }: NetworkLogoProps) {
  const isLight = variant === "light"

  return (
    <div className={cn("flex items-center space-x-3 select-none", className)}>
      {/* Abstract Global Payment Rail Identity (Overlapping circles) */}
      <div className="relative flex items-center h-6 w-10">
        <div className={cn(
          "absolute left-0 h-6 w-6 rounded-full mix-blend-multiply opacity-90",
          isLight ? "bg-white" : "bg-navy-blue"
        )} />
        <div className={cn(
          "absolute right-0 h-6 w-6 rounded-full mix-blend-multiply opacity-90",
          isLight ? "bg-stone-gray" : "bg-subtle-gold"
        )} />
      </div>

      <span className={cn(
        "font-bold tracking-tight text-xl leading-none",
        isLight ? "text-white" : "text-navy-blue"
      )}>
        Network
      </span>
    </div>
  )
}
