import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustBadgeProps {
  message?: string
  className?: string
  variant?: "default" | "minimal" | "hero"
}

export function TrustBadge({
  message = "Bank-Grade Security",
  className,
  variant = "default"
}: TrustBadgeProps) {

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green/10">
          <ShieldCheck className="h-8 w-8 text-corporate-green" />
        </div>
        <p className="text-sm font-medium text-corporate-green">{message}</p>
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-center space-x-1.5 rounded-full bg-corporate-green/5 px-3 py-1.5", className)}>
      <ShieldCheck className="h-4 w-4 text-corporate-green" />
      <span className="text-xs font-semibold text-corporate-green">{message}</span>
    </div>
  )
}
