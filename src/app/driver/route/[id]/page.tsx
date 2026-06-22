"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Eye, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { RouteCard } from "@/components/ui/RouteCard"

// Mock new route data
const mockNewRoute = {
  id: "dr-new",
  from: "Mbezi Beach",
  to: "Posta City Center",
  departureTime: "06:30 AM",
  availableSeats: 4,
  price: "TZS 2,000",
  driverName: "John M.",
  vehicleType: "Private Sedan"
}

export default function DriverRoutePresentationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  use(params)

  return (
    <div className="flex flex-col min-h-full pb-[env(safe-area-inset-bottom)] bg-soft-white">

      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-soft-white/90 backdrop-blur-md z-50">
        <button
          onClick={() => router.push("/driver")}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-light-gray border border-border text-rich-black hover:bg-border transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-10 w-10" />
      </header>

      <div className="flex-1 flex flex-col pt-4 px-6">

        <div className="text-center mb-8 flex flex-col items-center">
           <div className="h-16 w-16 bg-accent-green/10 rounded-full flex items-center justify-center mb-4">
             <CheckCircle2 className="h-8 w-8 text-accent-green" />
           </div>
           <h1 className="text-2xl font-bold tracking-tight text-rich-black mb-2">Route Published</h1>
           <p className="text-charcoal leading-relaxed max-w-xs mx-auto">
             Your route is now live on the marketplace. This is exactly how passengers will see it.
           </p>
        </div>

        <div className="mb-10 relative">
          {/* Passenger preview label */}
          <div className="absolute -top-3 -right-2 bg-rich-black text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full z-10 shadow-md flex items-center">
             <Eye className="h-3 w-3 mr-1" /> Preview
          </div>

          <RouteCard
            {...mockNewRoute}
            className="shadow-lg border-rich-black/10 scale-[1.02] transform transition-transform"
          />
        </div>

        <div className="bg-light-gray border border-border rounded-2xl p-5 mb-8">
           <h3 className="font-bold text-rich-black mb-2">What happens next?</h3>
           <ul className="space-y-3">
             <li className="flex items-start text-sm text-charcoal">
               <div className="h-1.5 w-1.5 rounded-full bg-rich-black mt-1.5 mr-2 shrink-0" />
               Passengers browsing Timebus can now reserve seats.
             </li>
             <li className="flex items-start text-sm text-charcoal">
               <div className="h-1.5 w-1.5 rounded-full bg-rich-black mt-1.5 mr-2 shrink-0" />
               You will be notified instantly when a seat is booked.
             </li>
           </ul>
        </div>

        <div className="mt-auto space-y-3 pb-6">
           <Button className="w-full shadow-md flex items-center justify-center gap-2">
             <Share2 className="h-5 w-5" /> Share Route Link
           </Button>
           <Button asChild variant="secondary" className="w-full">
             <Link href="/driver">
               Return to Dashboard
             </Link>
           </Button>
        </div>

      </div>
    </div>
  )
}
