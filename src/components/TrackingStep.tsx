import React from 'react';
import { motion } from 'framer-motion';
import ShipmentTriangle from './ShipmentTriangle';
import { Home, ArrowLeft } from 'lucide-react';

interface TrackingStepProps {
  onReset: () => void;
}

export default function TrackingStep({ onReset }: TrackingStepProps) {
  return (
    <div className="w-full relative h-full flex flex-col">
      {/* Fixed App Header */}
      <div className="fixed top-0 left-0 w-full bg-bluepost-dark h-16 flex items-center justify-center z-50">
        <button onClick={onReset} className="absolute left-4 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="text-white font-bold text-lg">Tracking</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md mx-auto pt-24 pb-4 px-4 flex flex-col gap-6"
      >
        {/* Core Status Header */}
        <div className="text-center flex flex-col items-center">
          <span className="inline-block bg-bluepost-success/10 text-bluepost-success px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3 border border-bluepost-success/20">
            In Transit
          </span>
          <h2 className="text-xl font-bold text-gray-500 mb-1">
            Tracking ID
          </h2>
          <p className="text-4xl font-black text-bluepost-dark tracking-tight">BP-7890</p>
        </div>

        {/* Tracking Card */}
        <div className="w-[92%] mx-auto bg-white rounded-md shadow-md p-6 border border-gray-100">

          <div className="flex justify-between items-center mb-10 text-sm font-bold">
             <span className="text-bluepost-dark">Dar es Salaam</span>
             <span className="text-gray-400">Dodoma</span>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-200 -translate-y-1/2 rounded-full" />
            <motion.div
              className="absolute top-1/2 left-0 h-[3px] bg-bluepost-accent -translate-y-1/2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '45%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Origin */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-bluepost-accent rounded-full z-10" />

            {/* Current Position Marker */}
            <div className="absolute left-[45%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <ShipmentTriangle size="sm" animated />
              </div>
            </div>

            {/* Destination */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-gray-300 rounded-full z-10" />
          </div>

          <div className="flex flex-col items-center pt-4 border-t border-gray-100">
             <span className="text-xs text-gray-500 font-medium mb-1">Estimated Arrival</span>
             <span className="font-bold text-lg text-bluepost-dark">Today, 14:30 PM</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-[92%] mx-auto mt-2">
          <button
            onClick={onReset}
            className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-bluepost-dark rounded-md font-bold text-sm transition-colors flex justify-center items-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
