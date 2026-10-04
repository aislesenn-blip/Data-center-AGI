import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto relative"
    >
      <button onClick={onBack} className="absolute left-6 top-6 text-gray-400 hover:text-gray-800 transition-colors">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-bluepost-dark">
        Confirm & Pay
      </h2>

      {/* Summary Card */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShipmentTriangle size="sm" />
            <div>
              <p className="font-semibold text-sm">Box / Medium</p>
              <p className="text-xs text-gray-500">Passenger Bus</p>
            </div>
          </div>
          <span className="font-bold text-lg">TSh 15,000</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">From</span>
            <span className="font-medium text-right">Dar es Salaam</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">To</span>
            <span className="font-medium text-right">Dodoma</span>
          </div>
        </div>
      </div>

      {/* Payment Method - simplified for native feel */}
      <div className="mb-8">
        <p className="text-sm font-semibold mb-3 text-gray-700">Payment Method</p>
        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-bluepost-primary bg-blue-50/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-bluepost-primary">
              <Smartphone size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm">Mobile Money</p>
              <p className="text-xs text-gray-500">M-Pesa, Tigo Pesa, Airtel Money</p>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-bluepost-primary flex items-center justify-center text-white">
            <Check size={12} />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-bluepost-dark hover:bg-black text-white rounded-xl py-4 font-semibold text-lg transition-colors flex justify-center items-center gap-2"
      >
        Pay TSh 15,000
      </button>
    </motion.div>
  );
}
