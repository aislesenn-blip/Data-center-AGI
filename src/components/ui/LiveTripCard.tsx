import { cn } from "@/lib/utils"
import { MapPin, Users, Navigation } from "lucide-react"

export interface LiveTripCardProps {
  id: string
  driverName: string
  destination: string
  availableSeats: number
  etaMins: number
  distanceKm: number
  onClick?: () => void
  className?: string
}

export function LiveTripCard({
  driverName,
  destination,
  availableSeats,
  etaMins,
  distanceKm,
  onClick,
  className
}: LiveTripCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border-2 border-transparent rounded-2xl p-4 shadow-lg transition-all relative overflow-hidden",
        onClick && "cursor-pointer hover:border-rich-black active:scale-[0.98]",
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-accent-blue/10 text-accent-blue px-2 py-1 rounded-md">
           <Navigation className="h-3.5 w-3.5 fill-current animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Heading Your Way</span>
        </div>

        {/* Driver Name */}
        <div className="text-right">
           <p className="text-xs text-charcoal font-medium">Driver</p>
           <p className="font-bold text-rich-black text-sm">{driverName}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Destination */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-light-gray flex items-center justify-center mr-3 shrink-0">
             <MapPin className="h-4 w-4 text-rich-black" />
          </div>
          <div>
            <p className="text-[10px] text-charcoal font-semibold uppercase tracking-wider mb-0.5">Destination</p>
            <p className="font-bold text-rich-black leading-tight">{destination}</p>
          </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Real-time Metrics */}
        <div className="flex items-center justify-between">
           <div className="flex space-x-4">
             <div>
               <p className="text-[10px] text-charcoal font-semibold uppercase tracking-wider mb-0.5">Pickup In</p>
               <p className="font-bold text-rich-black text-lg">
                 {etaMins} <span className="text-sm font-medium text-charcoal">mins</span>
               </p>
             </div>
             <div>
               <p className="text-[10px] text-charcoal font-semibold uppercase tracking-wider mb-0.5">Distance</p>
               <p className="font-bold text-rich-black text-lg">
                 {distanceKm} <span className="text-sm font-medium text-charcoal">km</span>
               </p>
             </div>
           </div>

           <div className="flex items-center space-x-1.5 bg-light-gray px-3 py-1.5 rounded-full border border-border">
             <Users className="h-4 w-4 text-rich-black" />
             <span className="text-sm font-bold text-rich-black">
               {availableSeats}
             </span>
           </div>
        </div>
      </div>
    </div>
  )
}
