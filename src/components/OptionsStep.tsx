import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bus, Truck, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingState, TransportOption } from '@/lib/types';
import { getTransportOptions } from '@/lib/data';

interface OptionsStepProps {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Helper to generate next 7 days
function generateDates(startDate: Date) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function OptionsStep({ bookingState, updateBookingState, onNext, onBack }: OptionsStepProps) {
  // Use a local state for the scrolling dates view, independent from the selected booking date
  const [dateViewStart, setDateViewStart] = useState(new Date());

  const dates = useMemo(() => generateDates(dateViewStart), [dateViewStart]);

  const options = useMemo(() => {
    return getTransportOptions(
      bookingState.from?.id || '',
      bookingState.to?.id || '',
      bookingState.date,
      bookingState.shipment?.weight || 1
    );
  }, [bookingState.from, bookingState.to, bookingState.date, bookingState.shipment]);

  const handleSelectDate = (date: Date) => {
    updateBookingState({ date });
  };

  const handleSelectTransport = (option: TransportOption) => {
    updateBookingState({ selectedTransport: option });
    onNext();
  };

  const handlePrevDates = () => {
    const d = new Date(dateViewStart);
    d.setDate(d.getDate() - 1);
    setDateViewStart(d);
  };

  const handleNextDates = () => {
    const d = new Date(dateViewStart);
    d.setDate(d.getDate() + 1);
    setDateViewStart(d);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(price).replace('TZS', 'TSh');
  };

  const getVehicleIcon = (type: string) => {
    if (type.includes('Bus')) return <Bus size={18} />;
    if (type.includes('Truck') || type.includes('Cargo')) return <Truck size={18} />;
    return <Box size={18} />;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
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
        <div className="w-8" /> {/* Placeholder for balance */}
      </div>

      {/* Context Banner */}
      <div className="bg-bluepost-primary text-white w-full text-center py-2 text-sm font-bold tracking-wide shadow-sm shrink-0">
        {bookingState.from?.name} → {bookingState.to?.name}
      </div>

      {/* Date Ribbon */}
      <div className="bg-white w-full py-3 px-4 shadow-sm shrink-0 flex items-center justify-between border-b border-gray-100">
        <button onClick={handlePrevDates} className="text-gray-400 hover:text-gray-800"><ChevronLeft size={20} /></button>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-2">
          {dates.map((date) => {
            const isSelected = isSameDay(date, bookingState.date);
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleSelectDate(date)}
                className={`w-10 h-10 rounded-full flex flex-col items-center justify-center shrink-0 border ${
                  isSelected
                    ? 'bg-bluepost-primary text-white border-bluepost-primary'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-bluepost-primary/50'
                }`}
              >
                <span className="font-bold text-[14px] leading-tight">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
        <button onClick={handleNextDates} className="text-gray-400 hover:text-gray-800"><ChevronRight size={20} /></button>
      </div>

      {/* Result Card List */}
      <div className="w-full flex-1 pt-4 pb-28 px-4 flex flex-col gap-4 overflow-y-auto items-center">
        {options.length === 0 ? (
          <div className="text-gray-500 flex flex-col items-center justify-center pt-12">
             <Box size={48} className="text-gray-300 mb-4" />
             <p className="font-bold">No transports found</p>
             <p className="text-sm">Try selecting a different date</p>
          </div>
        ) : (
          options.map((option) => (
            <div
              key={option.id}
              className={`w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border ${option.highlight ? 'border-bluepost-primary/50' : 'border-gray-100'}`}
            >
              {/* Row 1: Title & Capacity */}
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className={`font-bold text-xs tracking-wider ${option.highlight ? 'text-bluepost-primary' : 'text-gray-500'}`}>
                  {option.highlight ? 'RECOMMENDED' : 'STANDARD'}
                </span>
                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                  {option.capacity}
                </span>
              </div>

              {/* Row 2: Vehicle & Price */}
              <div className="flex justify-between items-center">
                <div className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-gray-400">{getVehicleIcon(option.vehicleType)}</span>
                  {option.operator}
                </div>
                <span className="font-black text-lg text-black">{formatPrice(option.price)}</span>
              </div>

              {/* Row 3: Timeline Graphic */}
              <div className="flex items-center justify-between mt-2 mb-2 px-2">
                <div className="text-right flex flex-col">
                  <span className="font-bold text-sm text-gray-800">{option.departureTime}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[60px]">{bookingState.from?.name}</span>
                </div>

                <div className="flex-1 flex items-center justify-center px-4 relative">
                   <div className="absolute w-full h-[2px] bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
                   <div className="w-2 h-2 rounded-full bg-bluepost-primary z-10" />
                   <div className="flex-1" />
                   <div className="bg-white px-2 z-10 text-gray-400">
                      <Clock size={14} />
                   </div>
                   <div className="flex-1" />
                   <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white z-10" />
                </div>

                <div className="text-left flex flex-col">
                  <span className="font-bold text-sm text-gray-800">{option.arrivalTime}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[60px]">{bookingState.to?.name}</span>
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
          ))
        )}
      </div>
    </motion.div>
  );
}
