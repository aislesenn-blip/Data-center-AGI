"use client"

import { User, ShieldCheck } from "lucide-react"
import { BottomNav } from "@/components/layout/BottomNav"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-soft-gray">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between z-10 sticky top-0 bg-soft-gray/90 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <TrustBadge message="Verified Identity" variant="minimal" className="bg-white border border-border" />
      </header>

      <div className="flex-1 flex flex-col p-6 space-y-6">

        <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-sm border border-border">
          <div className="h-20 w-20 rounded-full bg-corporate-green text-white flex items-center justify-center text-2xl font-bold">
            P
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Parent Account</h2>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <ShieldCheck className="h-4 w-4 text-corporate-green" />
              <p className="text-xs font-semibold text-corporate-green">Identity Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 flex items-center border-b border-border">
            <User className="h-5 w-5 text-charcoal/60 mr-4" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">Account Details</h3>
            </div>
          </div>
          <div className="p-4 flex items-center border-b border-border">
            <ShieldCheck className="h-5 w-5 text-charcoal/60 mr-4" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">Security & Privacy</h3>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
