import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone, Building2 } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  return (
    <div className="w-full relative h-full flex flex-col">
      {/* Fixed App Header */}
      <div className="fixed top-0 left-0 w-full bg-bluepost-dark h-16 flex items-center justify-center z-50">
        <button onClick={onBack} className="absolute left-4 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="text-white font-bold text-lg">Checkout</span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md mx-auto pt-24 pb-4 px-4 flex flex-col gap-6"
      >
        {/* Total Price Header */}
        <div className="flex flex-col items-center justify-center pt-4 pb-2">
          <span className="text-gray-500 text-sm mb-1 font-medium">Total to Pay</span>
          <h2 className="text-4xl font-black text-bluepost-dark tracking-tight">TSh 15,000</h2>
        </div>

        {/* Structured Summary Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 w-[92%] mx-auto">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-bluepost-primary">
              <Building2 size={20} />
            </div>
            <div>
              <p className="font-bold text-bluepost-dark text-sm">SHABIBY LINE</p>
              <p className="text-xs text-gray-500 font-medium">Standard Box • Dodoma</p>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Departure</span>
              <span className="font-bold text-bluepost-dark text-right">06:00 - Ubungo</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Arrival (Est)</span>
              <span className="font-bold text-bluepost-dark text-right">14:30 - Dodoma</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-[92%] mx-auto flex flex-col gap-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Payment Method</p>

          <div className="flex items-center justify-between p-4 rounded-md border-2 border-bluepost-primary bg-white shadow-sm cursor-pointer relative overflow-hidden">
            {/* Active Indicator Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-bluepost-primary" />

            <div className="flex items-center gap-3 ml-2">
              <div className="w-8 h-8 rounded-full bg-bluepost-bg flex items-center justify-center text-bluepost-primary">
                <Smartphone size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-bluepost-dark">Mobile Money</span>
                <span className="text-[11px] text-gray-500 font-medium">M-Pesa, Tigo Pesa, Airtel</span>
              </div>
            </div>
            <div className="w-5 h-5 rounded-full bg-bluepost-primary flex items-center justify-center text-white shadow-sm">
              <Check size={12} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="w-[92%] mx-auto mt-4">
          <button
            onClick={onNext}
            className="w-full h-14 bg-bluepost-dark hover:bg-black text-white rounded-md font-bold text-lg transition-colors flex justify-center items-center shadow-md"
          >
            Confirm & Pay
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
            Payments are secure and encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
}
