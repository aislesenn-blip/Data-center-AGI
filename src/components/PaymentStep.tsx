import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone, Box, ShieldCheck } from 'lucide-react';
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
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Top App Bar */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide flex items-center gap-2">
          <ShieldCheck size={20} className="text-bluepost-primary" />
          Checkout
        </h2>
        <div className="w-8" />
      </div>

      <div className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col gap-6 overflow-y-auto items-center">
        {/* Summary Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-bluepost-primary flex items-center justify-center shrink-0">
                <Box size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-bluepost-dark">Medium Box</span>
                <span className="text-xs text-gray-500">Shabiby Line • Dar to Dom</span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-500">Base Fare</span>
               <span className="font-medium text-gray-800">TSh 14,000</span>
            </div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-500">Platform Fee</span>
               <span className="font-medium text-gray-800">TSh 1,000</span>
            </div>
            <div className="pt-3 mt-1 border-t border-gray-100 flex justify-between items-center">
               <span className="font-bold text-gray-800">Total</span>
               <span className="font-black text-xl text-bluepost-dark">TSh 15,000</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="w-full max-w-md">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Payment Method</p>
          <div className="bg-blue-50/50 border-2 border-bluepost-primary rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-bluepost-primary">
                <Smartphone size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-bluepost-dark text-sm">Mobile Money</span>
                <span className="text-xs text-gray-500">M-Pesa, Tigo Pesa, Airtel</span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-bluepost-primary flex items-center justify-center text-white shadow-sm">
              <Check size={14} strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="mt-auto w-full max-w-md pt-4">
          <button
            onClick={onNext}
            className="w-full bg-[#0F172A] hover:bg-black text-white rounded-lg py-4 font-bold text-lg transition-colors shadow-md flex justify-center items-center gap-2"
          >
            Pay TSh 15,000
          </button>
          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Payments are secure and encrypted
          </p>
        </div>
      </div>
    </motion.div>
  );
}
