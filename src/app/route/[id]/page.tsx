"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Car, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { RouteCard } from "@/components/ui/RouteCard"

// Mock route data
const mockRoute = {
  id: "r1",
  from: "Kariakoo Market",
  to: "Masaki Terminal",
  departureTime: "07:30 AM",
  availableSeats: 3,
  price: "TZS 1,500",
  driverName: "John M.",
  vehicleType: "Toyota Hiace",
  vehicleColor: "White",
  plateNumber: "T 123 ABC",
  pickupInstructions: "Wait outside the main Kariakoo post office entrance. Please arrive 5 minutes early."
}

export default function RouteReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  use(params) // Unwrap just to satisfy Next.js 15+ constraints

  return (
    <div className="flex flex-col min-h-full bg-soft-white pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-soft-white/90 backdrop-blur-md z-50">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-light-gray border border-border text-rich-black hover:bg-border transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-lg tracking-tight">Review Route</span>
        <div className="h-10 w-10" />
      </header>

      <div className="flex-1 flex flex-col pt-2 px-6">

        <div className="mb-6">
          <RouteCard
            {...mockRoute}
            className="shadow-md border-rich-black/10"
          />
        </div>

        <div className="space-y-6">
          <section className="bg-white border border-border rounded-2xl p-5">
             <h3 className="font-bold text-rich-black mb-3">Pickup Instructions</h3>
             <p className="text-charcoal leading-relaxed text-sm">
               {mockRoute.pickupInstructions}
             </p>
          </section>

          <section className="bg-white border border-border rounded-2xl p-5">
             <h3 className="font-bold text-rich-black mb-4">Vehicle Details</h3>
             <div className="flex items-center space-x-4">
               <div className="h-12 w-12 rounded-full bg-light-gray flex items-center justify-center">
                 <Car className="h-6 w-6 text-charcoal" />
               </div>
               <div>
                 <p className="font-bold text-rich-black">{mockRoute.vehicleType}</p>
                 <p className="text-sm text-charcoal">{mockRoute.vehicleColor} • {mockRoute.plateNumber}</p>
               </div>
             </div>
          </section>

          <div className="flex items-center justify-center space-x-2 text-charcoal/80 bg-light-gray p-3 rounded-xl border border-border">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-medium">Verified Driver on Timebus Network</span>
          </div>
        </div>

        <div className="mt-auto pt-8 pb-4">
           <Button asChild size="lg" className="w-full shadow-lg shadow-rich-black/10">
             <Link href={`/route/${mockRoute.id}/confirm`}>
               Continue to Book Seat
             </Link>
           </Button>
        </div>

      </div>
    </div>
  )
}
