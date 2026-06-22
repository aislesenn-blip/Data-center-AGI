"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, ArrowDownToLine, Activity, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  // Do not show bottom nav on onboarding screens
  if (pathname === "/" || pathname.startsWith("/onboarding")) {
    return null
  }

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: CreditCard, label: "Cards", href: "/dashboard#cards" }, // Simplification: route to dashboard section or list view
    { icon: ArrowDownToLine, label: "Deposit", href: "/deposit" },
    { icon: Activity, label: "Activity", href: "/activity" },
    { icon: User, label: "Profile", href: "/profile" },
  ]

  return (
    <nav className="sticky bottom-0 z-50 w-full border-t border-border bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/dashboard#cards" || (item.href === "/dashboard#cards" && pathname === "/cards");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-corporate-green" : "text-charcoal/60 hover:text-charcoal"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
