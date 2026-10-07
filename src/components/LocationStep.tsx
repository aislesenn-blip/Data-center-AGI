import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, MapPin } from 'lucide-react';
import { BookingState } from '@/app/page';
import { Location, searchLocations } from '@/data/locations';

interface LocationStepProps {
  onNext: () => void;
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
}

export default function LocationStep({ onNext, bookingState, updateBookingState }: LocationStepProps) {
  const [fromQuery, setFromQuery] = useState(bookingState.origin?.name || '');
  const [toQuery, setToQuery] = useState(bookingState.destination?.name || '');
  const [fromSuggestions, setFromSuggestions] = useState<Location[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Location[]>([]);
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFromQuery(val);
    setActiveField('from');
    setFromSuggestions(searchLocations(val));
    if (bookingState.origin && val !== bookingState.origin.name) {
      updateBookingState({ origin: null });
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setToQuery(val);
    setActiveField('to');
    setToSuggestions(searchLocations(val));
    if (bookingState.destination && val !== bookingState.destination.name) {
      updateBookingState({ destination: null });
    }
  };

  const selectFrom = (loc: Location) => {
    setFromQuery(loc.name);
    updateBookingState({ origin: loc });
    setFromSuggestions([]);
    setActiveField(null);
  };

  const selectTo = (loc: Location) => {
    setToQuery(loc.name);
    updateBookingState({ destination: loc });
    setToSuggestions([]);
    setActiveField(null);
  };

  const swapLocations = () => {
    const tempOrigin = bookingState.origin;
    const tempDest = bookingState.destination;
    const tempFromQuery = fromQuery;
    const tempToQuery = toQuery;

    updateBookingState({ origin: tempDest, destination: tempOrigin });
    setFromQuery(tempToQuery);
    setToQuery(tempFromQuery);
  };

  const canProceed = bookingState.origin !== null && bookingState.destination !== null && bookingState.origin.id !== bookingState.destination.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center w-full pt-12"
    >
      {/* Brand / Logo Pill */}
      <div className="bg-white rounded-full px-6 py-2 flex items-center gap-2 mb-8 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-bluepost-primary text-white flex items-center justify-center font-bold text-xs leading-none">
          B
        </div>
        <span className="font-bold text-lg text-bluepost-dark tracking-tight">BluePost</span>
      </div>

      <h1 className="text-2xl font-bold mb-8 text-white text-center leading-tight">
        Move something <br /> anywhere.
      </h1>

      <div className="bg-white rounded-xl p-4 shadow-md w-[92%] max-w-md mx-auto" ref={wrapperRef}>
        <div className="relative flex flex-col gap-2">
          {/* Swap Button overlapping the two inputs */}
          <button
            onClick={swapLocations}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-bluepost-primary transition-colors"
          >
            <ArrowDownUp size={16} />
          </button>

          {/* From Input */}
          <div className={`flex flex-col border rounded-md p-3 px-4 relative z-10 bg-white transition-colors ${activeField === 'from' ? 'border-bluepost-primary ring-1 ring-bluepost-primary/30' : 'border-gray-200'}`}>
            <label className="text-[12px] text-gray-500 font-medium mb-1">From</label>
            <input
              type="text"
              placeholder="Origin region or city"
              value={fromQuery}
              onChange={handleFromChange}
              onFocus={() => {
                setActiveField('from');
                if (fromQuery) setFromSuggestions(searchLocations(fromQuery));
              }}
              className="w-full bg-transparent outline-none text-base font-bold text-bluepost-dark placeholder:text-gray-300 placeholder:font-normal pr-12"
            />
            {/* From Suggestions */}
            <AnimatePresence>
              {activeField === 'from' && fromSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-100 max-h-48 overflow-y-auto z-30"
                >
                  {fromSuggestions.map(loc => (
                    <div
                      key={loc.id}
                      onClick={() => selectFrom(loc)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-3"
                    >
                      <MapPin size={16} className="text-gray-400" />
                      <div>
                        <div className="font-bold text-sm text-bluepost-dark">{loc.name}</div>
                        <div className="text-xs text-gray-500">{loc.region} • {loc.type}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* To Input */}
          <div className={`flex flex-col border rounded-md p-3 px-4 relative z-10 bg-white transition-colors ${activeField === 'to' ? 'border-bluepost-primary ring-1 ring-bluepost-primary/30' : 'border-gray-200'}`}>
            <label className="text-[12px] text-gray-500 font-medium mb-1">To</label>
            <input
              type="text"
              placeholder="Destination"
              value={toQuery}
              onChange={handleToChange}
              onFocus={() => {
                setActiveField('to');
                if (toQuery) setToSuggestions(searchLocations(toQuery));
              }}
              className="w-full bg-transparent outline-none text-base font-bold text-bluepost-dark placeholder:text-gray-300 placeholder:font-normal pr-12"
            />
            {/* To Suggestions */}
            <AnimatePresence>
              {activeField === 'to' && toSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-100 max-h-48 overflow-y-auto z-30"
                >
                  {toSuggestions.map(loc => (
                    <div
                      key={loc.id}
                      onClick={() => selectTo(loc)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-3"
                    >
                      <MapPin size={16} className="text-gray-400" />
                      <div>
                        <div className="font-bold text-sm text-bluepost-dark">{loc.name}</div>
                        <div className="text-xs text-gray-500">{loc.region} • {loc.type}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`mt-4 w-full rounded-md py-3.5 font-bold text-lg transition-colors flex justify-center items-center ${canProceed ? 'bg-bluepost-dark hover:bg-black text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          Search Options
        </button>
      </div>
    </motion.div>
  );
}
