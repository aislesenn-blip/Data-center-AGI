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
          Your shipment is ready to drop off.
        </h2>
        <p className="text-gray-600 mb-6">Write this code clearly on your package and hand it to the Shabiby operator at the station.</p>

        <div className="inline-block bg-gray-100 border-2 border-bluepost-primary rounded-xl px-8 py-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">Shipping Code</p>
          <p className="text-4xl font-black text-bluepost-dark tracking-wider">BP-7890</p>
        </div>
      </div>

      <div className="py-5 px-5 bg-blue-50/50 rounded-2xl border border-blue-100 mb-8 text-left">
        <p className="text-sm text-bluepost-dark font-medium">
          <strong>Next step:</strong> Head to the Shabiby Line office before 18:00 today to drop off your package. You're all paid up!
        </p>
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
