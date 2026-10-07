import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShieldCheck, FileText } from 'lucide-react';
import { BookingState } from '@/app/page';
import { calculatePrice, formatPrice } from '@/utils/pricing';

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
  bookingState: BookingState;
}

export default function PaymentStep({ onNext, onBack, bookingState }: PaymentStepProps) {
  const { origin, destination, selectedTransport, shipmentDetails } = bookingState;

  const price = selectedTransport ? calculatePrice(selectedTransport, origin, destination, shipmentDetails) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Header */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">Review & Pay</h2>
        <div className="w-8" />
      </div>

      <div className="w-full flex-1 overflow-y-auto pb-32">
        {/* Total Amount Focus */}
        <div className="w-full bg-white flex flex-col items-center justify-center py-8 shadow-sm mb-4 border-b border-gray-100">
           <span className="text-gray-500 text-sm font-medium mb-1">Total to Pay</span>
           <span className="text-4xl font-black text-bluepost-dark">{formatPrice(price)}</span>
        </div>

        <div className="px-4 flex flex-col gap-4">
          {/* Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-bluepost-primary" /> Shipment Summary
            </h3>

            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-sm">Route</span>
                 <span className="font-bold text-sm text-gray-800">{origin?.name} → {destination?.name}</span>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-sm">Transport</span>
                 <span className="font-bold text-sm text-gray-800">{selectedTransport?.vehicle}</span>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-sm">Date</span>
                 <span className="font-bold text-sm text-gray-800">{bookingState.selectedDate.toLocaleDateString()}</span>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-sm">Contents</span>
                 <span className="font-bold text-sm text-gray-800">{shipmentDetails?.description} ({shipmentDetails?.weight}kg)</span>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-sm">Receiver</span>
                 <span className="font-bold text-sm text-gray-800">{shipmentDetails?.receiverName}</span>
               </div>
            </div>
          </div>

          {/* Payment Methods */}
          <h3 className="font-bold text-sm text-gray-800 px-1 mt-2">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
             <button onClick={onNext} className="bg-white border-2 border-transparent hover:border-bluepost-primary/50 transition-colors rounded-xl p-4 shadow-sm flex items-center gap-4 text-left group">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                   <span className="font-black text-green-600 text-lg">M</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-bluepost-primary transition-colors">M-Pesa</div>
                  <div className="text-xs text-gray-500">Pay directly from your phone</div>
                </div>
             </button>

             <button onClick={onNext} className="bg-white border-2 border-transparent hover:border-bluepost-primary/50 transition-colors rounded-xl p-4 shadow-sm flex items-center gap-4 text-left group">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                   <span className="font-black text-blue-600 text-lg">T</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-bluepost-primary transition-colors">Tigo Pesa</div>
                  <div className="text-xs text-gray-500">Fast and secure mobile payment</div>
                </div>
             </button>

             <button onClick={onNext} className="bg-white border-2 border-transparent hover:border-bluepost-primary/50 transition-colors rounded-xl p-4 shadow-sm flex items-center gap-4 text-left group">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                   <span className="font-black text-red-600 text-lg">A</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-bluepost-primary transition-colors">Airtel Money</div>
                  <div className="text-xs text-gray-500">Secure transaction</div>
                </div>
             </button>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-4 mb-8">
             <ShieldCheck size={16} />
             <span>Payments are secure and encrypted</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
