"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Ticket } from "lucide-react"
import { cn } from "@/lib/utils"

export function PassengerNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Compass, label: "Explore", href: "/" },
    { icon: Ticket, label: "My Tickets", href: "/tickets" },
  ]

  return (
    <nav className="bg-white border-t border-border sticky bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-rich-black" : "text-charcoal/50 hover:text-rich-black"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
