import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, MapPin, Search } from 'lucide-react';

interface LocationStepProps {
  onNext: () => void;
}

export default function LocationStep({ onNext }: LocationStepProps) {
  return (
    <div className="w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-white leading-tight">
          Move Goods <br /> Anywhere in Tanzania
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl p-4 shadow-lg w-[92%] max-w-md mx-auto relative z-20"
      >
        <div className="relative flex flex-col">
          {/* Swap Button (Absolute center over the border) */}
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-bluepost-primary hover:bg-gray-50 transition-colors">
            <ArrowDownUp size={18} />
          </button>

          {/* From Input */}
          <div className="flex items-center h-12 border border-gray-200 rounded-t-md border-b-0 px-3 bg-white">
            <div className="w-6 h-6 flex items-center justify-center mr-2 text-bluepost-dark">
              <div className="w-2 h-2 rounded-full bg-bluepost-dark"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <input
                type="text"
                placeholder="From where?"
                className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal"
                defaultValue="Dar es Salaam"
              />
            </div>
          </div>

          {/* To Input */}
          <div className="flex items-center h-12 border border-gray-200 border-b-0 px-3 bg-white">
            <div className="w-6 h-6 flex items-center justify-center mr-2 text-bluepost-primary">
              <MapPin size={16} />
            </div>
            <div className="flex-1 flex flex-col justify-center pr-12">
              <input
                type="text"
                placeholder="To where?"
                className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal"
                defaultValue="Dodoma"
              />
            </div>
          </div>

          {/* Date / Time Input */}
          <div className="flex items-center h-12 border border-gray-200 rounded-b-md px-3 bg-white mb-4">
             <div className="w-6 h-6 flex items-center justify-center mr-2 text-gray-400">
               <Search size={16} />
             </div>
             <div className="flex-1 flex flex-col justify-center">
               <input
                 type="text"
                 placeholder="Select Date"
                 className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal"
                 defaultValue="Today"
                 readOnly
               />
             </div>
          </div>

          <button
            onClick={onNext}
            className="w-full h-12 bg-bluepost-dark hover:bg-black text-white rounded-md font-bold text-[15px] transition-colors flex justify-center items-center"
          >
            Search Routes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
