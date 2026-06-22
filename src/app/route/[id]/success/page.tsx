"use client"

import Link from "next/link"
import { CheckCircle2, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Logo } from "@/components/ui/Logo"

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col min-h-full bg-rich-black text-white pb-[env(safe-area-inset-bottom)] selection:bg-white/20">

      <header className="px-6 py-5 flex items-center justify-center">
        <Logo variant="light" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8">

        <div className="relative">
          <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-xl animate-pulse" />
          <div className="relative h-24 w-24 rounded-full bg-accent-green flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Seat Reserved</h1>
          <p className="text-lg text-white/80 max-w-[280px] mx-auto leading-relaxed">
            Your daily commute is secured. We look forward to seeing you tomorrow.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-sm text-left backdrop-blur-sm mt-4">
           <div className="flex items-start mb-4">
             <Clock className="h-5 w-5 text-accent-green mr-3 mt-0.5" />
             <div>
               <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">Departure</p>
               <p className="font-bold text-lg">Tomorrow, 07:30 AM</p>
             </div>
           </div>

           <div className="h-px bg-white/10 w-full my-4" />

           <div className="flex items-start">
             <MapPin className="h-5 w-5 text-white/60 mr-3 mt-0.5" />
             <div>
               <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">Pickup</p>
               <p className="font-bold">Kariakoo Market</p>
               <p className="text-sm text-white/80 mt-1">Wait outside the main post office entrance.</p>
             </div>
           </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-8 w-full max-w-sm mx-auto">
        <Button asChild variant="secondary" size="lg" className="w-full">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>

    </div>
  )
}
