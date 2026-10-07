import React from 'react';
import { motion } from 'framer-motion';
import ShipmentTriangle from './ShipmentTriangle';
import { Home, PackageCheck, Copy } from 'lucide-react';
import { BookingState } from '@/lib/types';

interface TrackingStepProps {
  bookingState: BookingState;
  onReset: () => void;
}

import { useState, useEffect } from 'react';

export default function TrackingStep({ bookingState, onReset }: TrackingStepProps) {
  const { from, to, selectedTransport } = bookingState;

  const [trackingId, setTrackingId] = useState('BP-....');

  useEffect(() => {
    setTrackingId(`BP-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Top Banner indicating success / tracking state */}
      <div className="bg-bluepost-primary text-white w-full flex flex-col items-center pt-8 pb-12 shadow-md shrink-0 relative">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <PackageCheck size={32} />
        </div>
        <h2 className="font-bold text-xl tracking-wide">Shipment Confirmed</h2>
        <p className="text-blue-100 text-sm mt-1">Your goods are ready to move</p>
      </div>

      <div className="w-full flex-1 px-4 -mt-6 flex flex-col gap-4 overflow-y-auto items-center pb-28">
        {/* Tracking ID Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-100 p-4 flex items-center justify-between z-10 relative">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tracking ID</span>
            <span className="font-black text-2xl text-[#0F172A] tracking-widest mt-1">{trackingId}</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-bluepost-primary transition-colors">
            <Copy size={18} />
          </button>
        </div>

        {/* Vertical Timeline Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Status</h3>
            <span className="bg-blue-50 text-bluepost-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              READY TO SHIP
            </span>
          </div>

          <div className="relative pl-6 space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>

            {/* Active Vertical Line */}
            <motion.div
               className="absolute left-[11px] top-2 w-0.5 bg-bluepost-primary z-0"
               initial={{ height: '0%' }}
               animate={{ height: '10%' }}
               transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Step 1: Origin */}
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-bluepost-primary flex items-center justify-center absolute -left-[18px] top-0 border-4 border-white shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">{from?.name || 'Origin'}</span>
                <span className="text-sm text-gray-500">Awaiting Drop-off • {selectedTransport?.departureTime}</span>
              </div>
            </div>

            {/* Step 2: Destination */}
            <div className="relative z-10 flex items-start gap-4 mt-12">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center absolute -left-[18px] top-0 border-4 border-white shadow-sm" />
              <div className="flex flex-col">
                <span className="font-bold text-gray-400">{to?.name || 'Destination'}</span>
                <span className="text-sm text-gray-400">Estimated • {selectedTransport?.arrivalTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-md mt-4">
          <button
            onClick={onReset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-[#0F172A] rounded-lg py-4 font-bold transition-colors flex justify-center items-center gap-2 shadow-sm border border-gray-200"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
