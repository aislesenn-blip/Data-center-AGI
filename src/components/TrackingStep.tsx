import React from 'react';
import { motion } from 'framer-motion';
import ShipmentTriangle from './ShipmentTriangle';
import { Home } from 'lucide-react';

interface TrackingStepProps {
  onReset: () => void;
}

export default function TrackingStep({ onReset }: TrackingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-bluepost-dark mb-2">
          Your shipment is on its way.
        </h2>
        <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 mt-2">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Tracking ID</p>
          <p className="text-2xl font-black text-bluepost-primary tracking-wider">BP-7890</p>
        </div>
      </div>

      {/* Visual Tracking Representation */}
      <div className="py-8 px-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6 relative">

          {/* Track Background */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>

          {/* Active Track */}
          <motion.div
            className="absolute top-1/2 left-4 h-1 bg-bluepost-primary -translate-y-1/2 z-0 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '40%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>

          {/* Origin Point */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-bluepost-dark border-4 border-white shadow-sm"></div>
            <span className="text-xs font-semibold mt-2 absolute top-full">Dar</span>
          </div>

          {/* Moving Shipment Marker */}
          <div className="absolute top-1/2 left-[40%] -translate-y-1/2 -translate-x-1/2 z-20">
            <ShipmentTriangle size="sm" animated />
          </div>

          {/* Destination Point */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gray-300 border-4 border-white shadow-sm"></div>
            <span className="text-xs font-medium text-gray-500 mt-2 absolute top-full">Dodoma</span>
          </div>
        </div>

        <div className="text-center mt-10">
          <span className="inline-block bg-blue-50 text-bluepost-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            On the way
          </span>
          <p className="text-sm text-gray-600 mt-2 font-medium">Estimated arrival: Today, 4:00 PM</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl py-4 font-semibold transition-colors flex justify-center items-center gap-2"
      >
        <Home size={18} />
        Back to Home
      </button>
    </motion.div>
  );
}
