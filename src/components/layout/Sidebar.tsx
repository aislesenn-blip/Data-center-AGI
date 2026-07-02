"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  MonitorPlay,
  MapPin,
  BarChart3,
  Settings,
  CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: MonitorPlay },
  { name: 'Geofencing', href: '/geofencing', icon: MapPin },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-[#0F172A] border-r border-slate-800">
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-[#0EA5E9] rounded-sm" />
          Rikpedia
        </span>
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-4 pt-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
                isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-slate-800 rounded-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 relative z-10",
                  isActive ? "text-[#0EA5E9]" : "text-slate-400 group-hover:text-white"
                )}
                aria-hidden="true"
              />
              <span className="relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium text-sm">
            AE
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Acme Enterprise</span>
            <span className="text-xs text-slate-400">Media Buyer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
