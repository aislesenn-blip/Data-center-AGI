"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NetworkLogo } from "@/components/ui/NetworkLogo"
import { LayoutGrid, ScanLine, LogOut } from "lucide-react"

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-full bg-stone-gray">

      {/* Merchant Nav */}
      <header className="px-6 py-5 flex items-center justify-between bg-midnight-black sticky top-0 z-50">
        <NetworkLogo variant="light" className="scale-90 origin-left" />
        <Link href="/" className="text-xs font-bold text-slate hover:text-white uppercase tracking-wider flex items-center transition-colors">
          <LogOut className="h-3.5 w-3.5 mr-1.5" /> Exit Node
        </Link>
      </header>

      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {/* Structured Bottom Nav */}
      <nav className="bg-electric-white border-t border-border sticky bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-16">
           <Link
             href="/merchant"
             className={`flex-1 flex items-center justify-center space-x-2 border-r border-border transition-colors ${pathname === '/merchant' ? 'bg-stone-gray text-navy-blue' : 'text-slate hover:bg-stone-gray/50'}`}
           >
             <LayoutGrid className="h-5 w-5" />
             <span className="text-xs font-bold uppercase tracking-wider">Dashboard</span>
           </Link>
           <Link
             href="/merchant/accept"
             className={`flex-1 flex items-center justify-center space-x-2 transition-colors ${pathname === '/merchant/accept' ? 'bg-navy-blue text-electric-white' : 'text-slate hover:bg-stone-gray/50'}`}
           >
             <ScanLine className="h-5 w-5" />
             <span className="text-xs font-bold uppercase tracking-wider">Accept</span>
           </Link>
        </div>
      </nav>

    </div>
  )
}
