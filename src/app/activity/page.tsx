"use client"

import { Activity as ActivityIcon } from "lucide-react"
import { BottomNav } from "@/components/layout/BottomNav"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function ActivityPage() {
  return (
    <div className="flex flex-col h-full bg-soft-gray">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between z-10 sticky top-0 bg-soft-gray/90 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-foreground">Activity</h1>
        <TrustBadge message="Encrypted Ledger" variant="minimal" className="bg-white border border-border" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-corporate-green/5 flex items-center justify-center mb-4">
          <ActivityIcon className="h-8 w-8 text-corporate-green/50" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Activity Hub</h2>
        <p className="text-sm text-charcoal/60 max-w-xs">
          A comprehensive, encrypted ledger of all interactions and value additions across your family&apos;s Digital Cards.
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
