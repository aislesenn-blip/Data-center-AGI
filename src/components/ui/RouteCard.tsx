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
  isLeavingSoon?: boolean;
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
  isCompact = false,
  isLeavingSoon = false
}: RouteCardProps) {

  const hasSeats = availableSeats > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-border rounded-xl p-4 shadow-sm transition-all relative overflow-hidden",
        onClick && "cursor-pointer hover:border-rich-black hover:shadow-md active:scale-[0.99]",
        !hasSeats && "opacity-75 grayscale-[0.2]",
        className
      )}
    >
      {/* Visual connection line */}
      <div className="absolute left-[26px] top-[40px] bottom-[75px] w-0.5 bg-border z-0 hidden sm:block" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="space-y-3 flex-1">
          {/* Origin */}
          <div className="flex items-start">
            <div className="mt-1 mr-3 h-4 w-4 rounded-full bg-rich-black flex items-center justify-center shrink-0">
               <div className="h-1 w-1 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-[10px] text-charcoal font-medium uppercase tracking-wider mb-0.5">Leaving from</p>
              <p className="font-bold text-rich-black text-base leading-tight">{from}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start">
            <div className="mt-1 mr-3 h-4 w-4 rounded-sm bg-rich-black flex items-center justify-center shrink-0">
               <div className="h-1 w-1 bg-white rounded-sm" />
            </div>
            <div>
              <p className="text-[10px] text-charcoal font-medium uppercase tracking-wider mb-0.5">Going to</p>
              <p className="font-bold text-rich-black text-base leading-tight">{to}</p>
            </div>
          </div>
        </div>

        {/* Price & Time Badge */}
        <div className="text-right ml-3 shrink-0">
          <p className="text-lg font-bold text-rich-black">{price}</p>
          <div className="inline-flex flex-col items-end mt-1">
            <div className="inline-flex items-center space-x-1 bg-light-gray px-1.5 py-0.5 rounded mt-0.5">
              <Clock className="h-3 w-3 text-charcoal" />
              <span className="text-xs font-semibold text-rich-black">{departureTime}</span>
            </div>
            {isLeavingSoon && (
              <p className="text-[9px] text-accent-orange font-bold uppercase tracking-wider mt-1 animate-pulse">
                Leaving Soon
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-border w-full my-3" />

      {/* Footer details */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-3">
          {!isCompact && (
             <div className="flex items-center space-x-2">
               <div className="h-6 w-6 rounded-full bg-light-gray flex items-center justify-center text-charcoal font-bold text-xs border border-border">
                 {driverName.charAt(0)}
               </div>
               <div className="hidden sm:block">
                 <p className="text-xs font-semibold text-rich-black">{driverName}</p>
                 <p className="text-[10px] text-charcoal flex items-center">
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
