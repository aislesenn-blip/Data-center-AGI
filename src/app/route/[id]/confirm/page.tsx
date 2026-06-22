"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function BookingConfirmPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirm = () => {
    setIsProcessing(true)
    // Simulate frictionless booking
    setTimeout(() => {
      router.push(`/route/${id}/success`)
    }, 1200)
  }

  return (
    <div className="flex flex-col min-h-full bg-soft-white pb-[env(safe-area-inset-bottom)]">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-soft-white/90 backdrop-blur-md z-50">
        <button
          onClick={() => !isProcessing && router.back()}
          disabled={isProcessing}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-light-gray border border-border text-rich-black hover:bg-border transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-lg tracking-tight">Confirm Booking</span>
        <div className="h-10 w-10" />
      </header>

      <div className="flex-1 flex flex-col pt-4 px-6 justify-center">

        <div className="bg-white border border-border rounded-3xl p-8 shadow-sm text-center max-w-sm mx-auto w-full mb-12">
          <p className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2">Total Price</p>
          <h2 className="text-4xl font-bold text-rich-black mb-6">TZS 1,500</h2>

          <div className="space-y-4">
             <div className="flex justify-between border-b border-border pb-3">
               <span className="text-charcoal font-medium">Seats</span>
               <span className="font-bold text-rich-black">1 Seat</span>
             </div>
             <div className="flex justify-between border-b border-border pb-3">
               <span className="text-charcoal font-medium">Payment</span>
               <span className="font-bold text-rich-black">Pay Driver Directly</span>
             </div>
             <div className="flex justify-between pb-1">
               <span className="text-charcoal font-medium">Status</span>
               <span className="font-bold text-accent-blue">Instant Confirmation</span>
             </div>
          </div>
        </div>

        <div className="mt-auto pt-4 pb-4 max-w-sm mx-auto w-full">
           <Button
             onClick={handleConfirm}
             size="lg"
             className="w-full shadow-lg shadow-rich-black/10 flex items-center justify-center"
             disabled={isProcessing}
           >
             {isProcessing ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-3" />
                  Reserving Seat...
                </>
             ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Confirm Reservation
                </>
             )}
           </Button>
           <p className="text-center text-xs text-charcoal/60 mt-4 font-medium">
             By confirming, you agree to show up at the designated pickup time.
           </p>
        </div>

      </div>
    </div>
  )
}
