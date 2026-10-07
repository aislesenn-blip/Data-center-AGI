import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp } from 'lucide-react';

interface LocationStepProps {
  onNext: () => void;
}

export default function LocationStep({ onNext }: LocationStepProps) {
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
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-bluepost-primary transition-colors">
            <ArrowDownUp size={16} />
          </button>

          {/* From Input */}
          <div className="flex flex-col border border-gray-200 rounded-md p-3 px-4 relative z-10 bg-white">
            <label className="text-[12px] text-gray-500 font-medium mb-1">From</label>
            <input
              type="text"
              placeholder="Origin address or city"
              className="w-full bg-transparent outline-none text-base font-bold text-bluepost-dark placeholder:text-gray-300 placeholder:font-normal pr-12"
              defaultValue="Dar es Salaam"
            />
          </div>

          {/* To Input */}
          <div className="flex flex-col border border-gray-200 rounded-md p-3 px-4 relative z-10 bg-white">
            <label className="text-[12px] text-gray-500 font-medium mb-1">To</label>
            <input
              type="text"
              placeholder="Destination"
              className="w-full bg-transparent outline-none text-base font-bold text-bluepost-dark placeholder:text-gray-300 placeholder:font-normal pr-12"
              defaultValue="Dodoma"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          className="mt-4 w-full bg-bluepost-dark hover:bg-black text-white rounded-md py-3.5 font-bold text-lg transition-colors flex justify-center items-center"
        >
          Search
        </button>
      </div>
    </motion.div>
  );
}
