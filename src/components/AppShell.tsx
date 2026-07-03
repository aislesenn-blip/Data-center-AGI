"use client"

import { useState } from "react"
import { PaymentFlow } from "@/components/PaymentFlow"
import { DiscoverFlow } from "@/components/DiscoverFlow"
import { Wallet, Search } from "lucide-react"

export function AppShell() {
  const [activeTab, setActiveTab] = useState<"pay" | "discover">("pay")

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto relative bg-slate-50 sm:h-auto sm:max-h-[850px] sm:shadow-2xl sm:rounded-[3rem] overflow-hidden border-0 sm:border border-slate-200">

      {/* Global Header */}
      <header className="h-16 flex items-center justify-between px-6 shrink-0 bg-slate-50 z-50">
        <div className="font-extrabold text-2xl tracking-tight">
          <span className="text-blue-600">Pay</span>
          <span className="text-slate-900">Friday</span>
        </div>
        {/* Placeholder for User Profile / Settings Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {activeTab === "pay" ? <PaymentFlow /> : <DiscoverFlow />}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-6 pb-2 shrink-0 z-50">
        <button
          onClick={() => setActiveTab("pay")}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "pay" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Wallet className={`w-6 h-6 ${activeTab === "pay" ? "fill-blue-50" : ""}`} />
          <span className="text-xs font-bold">Pay</span>
        </button>

        <button
          onClick={() => setActiveTab("discover")}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "discover" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Search className={`w-6 h-6 ${activeTab === "discover" ? "stroke-[2.5]" : ""}`} />
          <span className="text-xs font-bold">Discover</span>
        </button>
      </nav>
    </div>
  )
}
