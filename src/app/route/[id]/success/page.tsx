"use client"

import Link from "next/link"
import { CheckCircle2, Clock, MapPin, QrCode } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col min-h-full bg-light-gray pb-[env(safe-area-inset-bottom)]">

      <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50">
        <span className="font-bold text-lg text-rich-black">Booking Confirmed</span>
      </header>

      <div className="flex-1 flex flex-col px-6 pt-2 pb-8">

        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-accent-green/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-accent-green" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-rich-black mb-2">Seat Reserved</h1>
          <p className="text-sm text-charcoal font-medium">Your commute is confirmed and ready.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col mb-auto w-full max-w-sm mx-auto">
          {/* Digital Boarding Pass Header */}
          <div className="p-4 border-b border-dashed border-border flex justify-between items-center bg-soft-white">
             <div className="flex items-center space-x-2 text-rich-black font-bold text-xs uppercase tracking-wider">
               <Clock className="h-3.5 w-3.5" />
               <span>Boarding Pass</span>
             </div>
             <QrCode className="h-6 w-6 text-charcoal/40" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
             <div>
               <p className="text-xs text-charcoal font-semibold uppercase tracking-wider mb-1">Departure Time</p>
               <p className="text-2xl font-bold text-rich-black">Tomorrow, 07:30 AM</p>
             </div>

             <div className="flex items-start">
               <MapPin className="h-5 w-5 text-charcoal shrink-0 mr-3 mt-0.5" />
               <div>
                 <p className="text-[10px] text-charcoal font-semibold uppercase tracking-wider mb-0.5">Pickup Location</p>
                 <p className="font-bold text-base text-rich-black">Kariakoo Market</p>
               </div>
             </div>

             <div className="pt-4 border-t border-border flex justify-between items-center">
               <span className="text-xs text-charcoal font-medium">Driver: John M.</span>
               <span className="text-xs font-bold text-rich-black bg-light-gray px-2 py-1 rounded">T 123 ABC</span>
             </div>
          </div>
        </div>

      </div>

      <div className="px-6 pb-6 pt-4 w-full max-w-sm mx-auto space-y-3">
        <Button asChild size="lg" className="w-full">
          <Link href="/tickets">
            View My Tickets
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>

    </div>
  )
}
