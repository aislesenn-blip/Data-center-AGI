"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, User, LogOut } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { cn } from "@/lib/utils"

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/driver" },
    { icon: PlusCircle, label: "Create Route", href: "/driver/create" },
    { icon: User, label: "Profile", href: "/driver/profile" }, // Stub
  ]

  return (
    <div className="flex flex-col h-full bg-light-gray">
      {/* Driver Header */}
      <header className="px-6 py-4 bg-rich-black text-white flex items-center justify-between z-50 sticky top-0">
        <Logo variant="light" className="scale-90 origin-left" />
        <Link href="/" className="flex items-center text-xs font-semibold text-white/70 hover:text-white transition-colors">
          <LogOut className="h-3 w-3 mr-1.5" /> Passenger View
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Driver Bottom Nav */}
      <nav className="bg-white border-t border-border sticky bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

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
    </div>
  )
}
