import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocationStepProps {
  onNext: () => void;
}

export default function LocationStep({ onNext }: LocationStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-6 w-full max-w-md mx-auto border border-black/5"
    >
      <h1 className="text-3xl font-bold mb-8 text-bluepost-dark tracking-tight leading-tight">
        Where are you moving something?
      </h1>

      <div className="space-y-4 relative mb-10">
        {/* Minimal Timeline Line */}
        <div className="absolute left-[1.35rem] top-10 bottom-10 w-[2px] bg-gray-100 z-0"></div>

        {/* From Input */}
        <div className="relative z-10 flex items-center bg-gray-50/50 rounded-2xl p-2 border border-gray-100 transition-colors focus-within:border-bluepost-primary/50 focus-within:bg-white">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center mr-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-bluepost-dark"></div>
          </div>
          <div className="flex-1 pb-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">From</label>
            <input
              type="text"
              placeholder="Origin address or city"
              className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-gray-400 placeholder:font-normal text-bluepost-dark"
              defaultValue="Dar es Salaam"
            />
          </div>
        </div>

        {/* To Input */}
        <div className="relative z-10 flex items-center bg-gray-50/50 rounded-2xl p-2 border border-gray-100 transition-colors focus-within:border-bluepost-primary/50 focus-within:bg-white">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mr-3 shrink-0 text-bluepost-primary">
            <MapPin size={18} strokeWidth={2.5} />
          </div>
          <div className="flex-1 pb-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">To</label>
            <input
              type="text"
              placeholder="Destination"
              className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-gray-400 placeholder:font-normal text-bluepost-dark"
              defaultValue="Dodoma"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-bluepost-dark hover:bg-black text-white rounded-2xl py-4 font-semibold text-lg transition-colors flex justify-center items-center"
      >
        Continue
      </button>
    </motion.div>
  );
}
