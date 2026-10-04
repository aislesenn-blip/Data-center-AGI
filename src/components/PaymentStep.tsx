import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone } from 'lucide-react';

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
      className="bg-white rounded-3xl p-6 w-full max-w-md mx-auto border border-black/5 relative"
    >
      <button onClick={onBack} className="absolute left-6 top-6 text-gray-400 hover:text-bluepost-dark transition-colors">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-bluepost-dark tracking-tight leading-tight">
        Confirm & Pay
      </h2>

      {/* Real-world inspired digital label summary */}
      <div className="bg-gray-50/50 rounded-2xl p-5 mb-8 border border-gray-100">
        <div className="flex justify-between items-end mb-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Operator</p>
            <p className="font-bold text-xl text-bluepost-dark">Shabiby</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total</p>
            <span className="font-bold text-xl text-bluepost-dark">TSh 15,000</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Route</span>
            <span className="font-semibold text-bluepost-dark text-right">Dar es Salaam → Dodoma</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Departing</span>
            <span className="font-semibold text-bluepost-dark text-right">Today 18:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Contents</span>
            <span className="font-semibold text-bluepost-dark text-right">2 Laptops and documents</span>
          </div>
        </div>
      </div>

      {/* Native Payment Method */}
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Pay with Mobile Money</p>
        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-bluepost-primary bg-blue-50/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-bluepost-primary shrink-0">
              <Smartphone size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm text-bluepost-dark">M-Pesa, Tigo Pesa, Airtel</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Quick pay via push USSD</p>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-bluepost-primary flex items-center justify-center text-white shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-bluepost-dark hover:bg-black text-white rounded-2xl py-4 font-semibold text-lg transition-colors flex justify-center items-center"
      >
        Pay TSh 15,000
      </button>
    </motion.div>
  );
}
