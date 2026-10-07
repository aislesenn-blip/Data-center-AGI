import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bus, Truck, Box, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { BookingState } from '@/app/page';
import { getTransportsForRoute, TransportOption } from '@/data/transports';
import { calculatePrice, formatPrice } from '@/utils/pricing';

interface OptionsStepProps {
  onNext: () => void;
  onBack: () => void;
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
}

export default function OptionsStep({ onNext, onBack, bookingState, updateBookingState }: OptionsStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(bookingState.selectedDate || new Date());
  const [availableTransports, setAvailableTransports] = useState<TransportOption[]>([]);

  useEffect(() => {
    // Generate dates starting from today
    updateBookingState({ selectedDate });

    if (bookingState.origin && bookingState.destination) {
      const options = getTransportsForRoute(bookingState.origin.id, bookingState.destination.id, selectedDate);
      setAvailableTransports(options);
    }
  }, [selectedDate, bookingState.origin, bookingState.destination]);

  // Generate an array of 7 days starting from selectedDate (or today if we want to anchor it)
  // To keep it simple, we'll anchor to today and allow scrolling
  const today = new Date();
  today.setHours(0,0,0,0);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    if (prev >= today) {
      setSelectedDate(prev);
    }
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const getDatesArray = () => {
    const dates = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - 2); // Show 2 days before

    for (let i = 0; i < 5; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const datesToDisplay = getDatesArray();

  const handleSelectTransport = (transport: TransportOption) => {
    updateBookingState({ selectedTransport: transport });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Top App Bar */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">Select Transport</h2>
        <div className="w-8" />
      </div>

      {/* Context Banner */}
      <div className="bg-bluepost-primary text-white w-full text-center py-2 text-sm font-bold tracking-wide shadow-sm shrink-0">
        {bookingState.origin?.name} → {bookingState.destination?.name}
      </div>

      {/* Date Ribbon */}
      <div className="bg-white w-full py-3 px-4 shadow-sm shrink-0 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={handlePrevDay}
          disabled={selectedDate.getTime() === today.getTime()}
          className={`transition-colors ${selectedDate.getTime() === today.getTime() ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-gray-800'}`}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-2">
          {datesToDisplay.map((date, i) => {
            const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
            const isPast = date < today;
            return (
              <button
                key={i}
                onClick={() => !isPast && setSelectedDate(date)}
                disabled={isPast}
                className={`w-10 h-10 rounded-full flex flex-col items-center justify-center shrink-0 transition-colors
                  ${isSelected ? 'bg-bluepost-primary text-white shadow-sm' :
                    isPast ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-800 hover:border-bluepost-primary'}`}
              >
                <span className="text-[10px] uppercase font-medium leading-none mb-0.5">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="font-bold text-sm leading-none">{date.getDate()}</span>
              </button>
            )
          })}
        </div>
        <button onClick={handleNextDay} className="text-gray-400 hover:text-gray-800">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Result Card List */}
      <div className="w-full flex-1 pt-4 pb-28 px-4 flex flex-col gap-4 overflow-y-auto items-center">
        {availableTransports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
              <AlertCircle size={32} />
            </div>
            <h3 className="font-bold text-lg text-bluepost-dark">No Transports Found</h3>
            <p className="text-sm text-gray-500">We couldn't find any transports for this route on the selected date. Try changing the date or locations.</p>
          </div>
        ) : (
          availableTransports.map((option) => {
            const computedPrice = calculatePrice(option, bookingState.origin, bookingState.destination, bookingState.shipmentDetails);

            return (
              <div
                key={option.id}
                className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border border-gray-100"
              >
                {/* Row 1: Title & Capacity */}
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className={`font-bold text-xs tracking-wider ${option.highlight ? 'text-bluepost-primary' : 'text-gray-500'}`}>
                    {option.title}
                  </span>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                    {option.capacity}
                  </span>
                </div>

                {/* Row 2: Vehicle & Price */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-gray-400">
                      {option.iconType === 'bus' && <Bus size={18} />}
                      {option.iconType === 'truck' && <Truck size={18} />}
                      {option.iconType === 'box' && <Box size={18} />}
                    </span>
                    {option.vehicle}
                  </div>
                  <span className="font-black text-lg text-black">{formatPrice(computedPrice)}</span>
                </div>

                {/* Row 3: Timeline Graphic */}
                <div className="flex items-center justify-between mt-2 mb-2 px-2">
                  <div className="text-right flex flex-col">
                    <span className="font-bold text-sm text-gray-800">{option.departureTime}</span>
                    <span className="text-xs text-gray-500">{bookingState.origin?.name.split(' ')[0]}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-4 relative">
                     <div className="absolute w-full h-[2px] bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
                     <div className="w-2 h-2 rounded-full bg-bluepost-primary z-10" />
                     <div className="flex-1" />
                     <div className="bg-white px-2 z-10 text-gray-400 flex flex-col items-center gap-1">
                        <Clock size={14} />
                        <span className="text-[10px] font-medium">{option.durationHours}h</span>
                     </div>
                     <div className="flex-1" />
                     <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white z-10" />
                  </div>

                  <div className="text-left flex flex-col">
                    <span className="font-bold text-sm text-gray-800">{option.arrivalTime}</span>
                    <span className="text-xs text-gray-500">{bookingState.destination?.name.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Row 4: Action */}
                <div className="flex justify-end pt-2 border-t border-gray-50">
                  <button
                    onClick={() => handleSelectTransport(option)}
                    className="bg-[#0F172A] hover:bg-black text-white rounded-md px-6 py-2.5 font-bold text-sm transition-colors shadow-sm"
                  >
                    Select
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </motion.div>
  );
}
