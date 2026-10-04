import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

interface LocationStepProps {
  onNext: () => void;
}

export default function LocationStep({ onNext }: LocationStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto"
    >
      <h1 className="text-2xl font-bold mb-6 text-bluepost-dark">
        Move something anywhere.
      </h1>

      <div className="space-y-4 relative">
        {/* Decorative timeline line connecting From and To */}
        <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-0"></div>

        {/* From Input */}
        <div className="relative z-10 flex items-center bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 text-bluepost-dark">
            <div className="w-2.5 h-2.5 rounded-full bg-bluepost-dark"></div>
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block mb-1">From</label>
            <input
              type="text"
              placeholder="Origin address or city"
              className="w-full bg-transparent outline-none text-base font-medium placeholder:text-gray-400"
              defaultValue="Dar es Salaam"
            />
          </div>
        </div>

        {/* To Input */}
        <div className="relative z-10 flex items-center bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 text-bluepost-primary">
            <MapPin size={18} className="fill-blue-50" />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block mb-1">To</label>
            <input
              type="text"
              placeholder="Destination"
              className="w-full bg-transparent outline-none text-base font-medium placeholder:text-gray-400"
              defaultValue="Dodoma"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full bg-bluepost-primary hover:bg-bluepost-primary-hover text-white rounded-xl py-4 font-semibold text-lg transition-colors flex justify-center items-center gap-2"
      >
        Continue
      </button>
    </motion.div>
  );
}
