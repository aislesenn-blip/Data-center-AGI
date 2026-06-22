import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock, Users, Car } from "lucide-react"

export interface RouteCardProps {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  availableSeats: number;
  price: string;
  driverName: string;
  vehicleType: string;
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function RouteCard({
  from,
  to,
  departureTime,
  availableSeats,
  price,
  driverName,
  vehicleType,
  onClick,
  className,
  isCompact = false
}: RouteCardProps) {

  const hasSeats = availableSeats > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-border rounded-2xl p-5 shadow-sm transition-all relative overflow-hidden",
        onClick && "cursor-pointer hover:border-rich-black hover:shadow-md active:scale-[0.99]",
        !hasSeats && "opacity-75 grayscale-[0.2]",
        className
      )}
    >
      {/* Visual connection line */}
      <div className="absolute left-[35px] top-[48px] bottom-[90px] w-0.5 bg-border z-0 hidden sm:block" />

      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="space-y-4 flex-1">
          {/* Origin */}
          <div className="flex items-start">
            <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-rich-black flex items-center justify-center shrink-0">
               <div className="h-1.5 w-1.5 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-xs text-charcoal font-medium mb-0.5">Leaving from</p>
              <p className="font-bold text-rich-black text-lg leading-tight">{from}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start">
            <div className="mt-1 mr-3 h-5 w-5 rounded-sm bg-rich-black flex items-center justify-center shrink-0">
               <div className="h-1.5 w-1.5 bg-white rounded-sm" />
            </div>
            <div>
              <p className="text-xs text-charcoal font-medium mb-0.5">Going to</p>
              <p className="font-bold text-rich-black text-lg leading-tight">{to}</p>
            </div>
          </div>
        </div>

        {/* Price & Time Badge */}
        <div className="text-right ml-4 shrink-0">
          <p className="text-2xl font-bold text-rich-black">{price}</p>
          <div className="inline-flex items-center space-x-1 bg-light-gray px-2 py-1 rounded-md mt-1">
            <Clock className="h-3.5 w-3.5 text-charcoal" />
            <span className="text-sm font-semibold text-rich-black">{departureTime}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-border w-full my-4" />

      {/* Footer details */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center space-x-4">
          {!isCompact && (
             <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-light-gray flex items-center justify-center text-charcoal font-bold text-sm border border-border">
                 {driverName.charAt(0)}
               </div>
               <div className="hidden sm:block">
                 <p className="text-xs font-medium text-rich-black">{driverName}</p>
                 <p className="text-[10px] text-charcoal flex items-center mt-0.5">
                   <Car className="h-3 w-3 mr-1" /> {vehicleType}
                 </p>
               </div>
             </div>
          )}
        </div>

        <div className={cn(
          "flex items-center space-x-1.5 px-3 py-1.5 rounded-full border",
          hasSeats ? "bg-accent-blue/10 border-accent-blue/20 text-accent-blue" : "bg-light-gray border-border text-charcoal"
        )}>
           <Users className="h-4 w-4" />
           <span className="text-sm font-bold">
             {hasSeats ? `${availableSeats} seats left` : 'Full'}
           </span>
        </div>
      </div>
    </div>
  )
}
