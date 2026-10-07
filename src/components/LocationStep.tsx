import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, MapPin, X, ArrowLeft } from 'lucide-react';
import { BookingState, Location } from '@/lib/types';
import { LOCATIONS } from '@/lib/data';

interface LocationStepProps {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  onNext: () => void;
}

// Autocomplete Input Sub-component (Full-screen Overlay approach)
function AutocompleteInput({
  label,
  placeholder,
  value,
  onSelect,
}: {
  label: string;
  placeholder: string;
  value: Location | null;
  onSelect: (loc: Location | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const filteredLocations = LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(query.toLowerCase()) ||
    loc.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col border border-gray-200 rounded-md p-3 px-4 relative z-10 bg-white text-left hover:border-bluepost-primary/50 transition-colors w-full"
      >
        <span className="text-[12px] text-gray-500 font-medium mb-1 block">{label}</span>
        <span className={`w-full text-base truncate pr-12 ${value ? 'font-bold text-bluepost-dark' : 'text-gray-300 font-normal'}`}>
          {value ? value.name : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="bg-[#0F172A] text-white p-4 shadow-md flex items-center gap-3">
               <button onClick={handleClose} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors shrink-0">
                 <ArrowLeft size={24} />
               </button>
               <div className="flex-1 relative">
                 <input
                   ref={inputRef}
                   type="text"
                   placeholder={`Enter ${label.toLowerCase()} location...`}
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   className="w-full bg-white/10 border border-white/20 rounded-md py-2.5 px-4 outline-none focus:border-bluepost-primary text-base font-medium text-white placeholder:text-gray-400"
                 />
                 {query && (
                   <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                     <X size={18} />
                   </button>
                 )}
               </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
               {query.length === 0 ? (
                 <div className="p-8 text-center text-gray-400 text-sm">
                    Start typing to search locations...
                 </div>
               ) : filteredLocations.length > 0 ? (
                 <div className="bg-white border-b border-gray-200">
                    {filteredLocations.map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          onSelect(loc);
                          handleClose();
                        }}
                        className="w-full text-left px-6 py-4 border-b border-gray-100 last:border-0 flex items-center gap-4 hover:bg-blue-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <MapPin size={18} className="text-gray-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-bluepost-dark">{loc.name}</span>
                          <span className="text-sm text-gray-500">{loc.region} Region</span>
                        </div>
                      </button>
                    ))}
                 </div>
               ) : (
                 <div className="p-8 text-center text-gray-500 text-sm">
                    No locations found matching "{query}"
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function LocationStep({ bookingState, updateBookingState, onNext }: LocationStepProps) {
  const isFormValid = bookingState.from !== null && bookingState.to !== null && bookingState.from.id !== bookingState.to.id;

  const handleSwap = () => {
    updateBookingState({
      from: bookingState.to,
      to: bookingState.from
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center w-full pt-12"
    >
      <h1 className="text-xl font-bold mb-8 mt-12 text-white text-center leading-tight max-w-sm px-4">
        Choose where your goods are going &rarr; choose how they should travel &rarr; pay &rarr; receive your shipment code &rarr; hand over your package.
      </h1>

      <div className="bg-white rounded-xl p-4 shadow-md w-[92%] max-w-md mx-auto">
        <div className="relative flex flex-col gap-2">
          {/* Swap Button overlapping the two inputs */}
          <button
            onClick={handleSwap}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-bluepost-primary transition-colors hover:bg-gray-50"
            title="Swap locations"
          >
            <ArrowDownUp size={16} />
          </button>

          <AutocompleteInput
            label="From"
            placeholder="Origin city or region"
            value={bookingState.from}
            onSelect={(loc) => updateBookingState({ from: loc })}
          />

          <AutocompleteInput
            label="To"
            placeholder="Destination"
            value={bookingState.to}
            onSelect={(loc) => updateBookingState({ to: loc })}
          />
        </div>

        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`mt-4 w-full rounded-md py-3.5 font-bold text-lg transition-colors flex justify-center items-center ${
            isFormValid
              ? 'bg-bluepost-dark hover:bg-black text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Search
        </button>
      </div>
    </motion.div>
  );
}
