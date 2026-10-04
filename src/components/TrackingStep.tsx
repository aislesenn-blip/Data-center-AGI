import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Printer, Copy } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface TrackingStepProps {
  onReset: () => void;
}

export default function TrackingStep({ onReset }: TrackingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-3xl p-6 w-full max-w-md mx-auto border border-black/5 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
    >
      {/* Success Confetti / Check */}
      <div className="flex flex-col items-center text-center mt-4 mb-6">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-bluepost-primary mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-bluepost-dark tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
          Your digital shipping label is ready.
        </p>
      </div>

      {/* Digital Label Card */}
      <div className="bg-bluepost-dark text-white rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg">
        {/* Abstract background pattern for label */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 pointer-events-none">
          <ShipmentTriangle size="lg" />
        </div>

        <div className="relative z-10">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Shipping Code</p>
          <div className="flex justify-between items-center mb-6">
            <p className="text-4xl font-black tracking-wider">BP-7890</p>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Copy size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
            <div className="flex-1 border-r border-white/20">
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Operator</p>
              <p className="font-bold">Shabiby</p>
            </div>
            <div className="flex-1">
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Departing</p>
              <p className="font-bold">Today 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Explicit Instructions (The Physical Bridge) */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8">
        <h3 className="font-bold text-bluepost-dark text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
          <span className="w-5 h-5 bg-bluepost-primary text-white rounded-full flex items-center justify-center text-[10px]">!</span>
          Next Steps
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 font-medium">
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 mt-0.5">1.</span>
            <span>Write <strong className="text-bluepost-dark">BP-7890</strong> clearly on your package.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 mt-0.5">2.</span>
            <span>Drop it off at the Shabiby terminal in Dar es Salaam before 17:30.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 mt-0.5">3.</span>
            <span>Hand it to the operator. No extra payment required.</span>
          </li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-2xl py-4 font-semibold transition-colors flex justify-center items-center border border-gray-200"
        >
          <Printer size={18} />
        </button>
        <button
          onClick={onReset}
          className="flex-[3] bg-bluepost-primary hover:bg-bluepost-primary-hover text-white rounded-2xl py-4 font-semibold text-lg transition-colors flex justify-center items-center gap-2"
        >
          <Home size={18} />
          Done
        </button>
      </div>
    </motion.div>
  );
}
