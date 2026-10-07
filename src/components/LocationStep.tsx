import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, MapPin } from 'lucide-react';
import { BookingState, Location } from '@/lib/types';
import { LOCATIONS } from '@/lib/data';

interface LocationStepProps {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  onNext: () => void;
}

// Autocomplete Input Sub-component
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
  const [query, setQuery] = useState(value ? value.name : '');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync state if it changes externally (like when swap happens)
  useEffect(() => {
    setQuery(value ? value.name : '');
  }, [value]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset query if they didn't select a valid location
        if (!value) {
          setQuery('');
        } else {
          setQuery(value.name);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef, value]);

  const filteredLocations = LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(query.toLowerCase()) ||
    loc.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="flex flex-col border border-gray-200 rounded-md p-3 px-4 relative z-10 bg-white">
      <label className="text-[12px] text-gray-500 font-medium mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          onSelect(null); // Clear selected location when typing starts
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full bg-transparent outline-none text-base font-bold text-bluepost-dark placeholder:text-gray-300 placeholder:font-normal pr-12"
      />

      <AnimatePresence>
        {isOpen && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-48 overflow-y-auto"
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelect(loc);
                    setQuery(loc.name);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-50 last:border-0 flex items-center gap-3 transition-colors"
                >
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <div className="font-bold text-sm text-bluepost-dark">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.region} Region</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">No locations found.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
