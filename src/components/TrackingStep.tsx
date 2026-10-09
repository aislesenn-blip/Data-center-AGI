import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, CheckCircle2, Copy } from 'lucide-react';
import { BookingState } from '@/lib/types';

interface TrackingStepProps {
  bookingState: BookingState;
  onReset: () => void;
}

export default function TrackingStep({ bookingState, onReset }: TrackingStepProps) {
  const { from, to, selectedTransport, id } = bookingState;

  const [paymentId, setPaymentId] = useState(id || 'BP-....');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
       setPaymentId(`BP-${Math.floor(1000 + Math.random() * 9000)}`);
    } else {
       setPaymentId(id);
    }
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Top Banner indicating success */}
      <div className="bg-bluepost-primary text-white w-full flex flex-col items-center pt-10 pb-12 shadow-md shrink-0 relative">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={36} className="text-white" />
        </div>
        <h2 className="font-bold text-2xl tracking-wide">Payment Successful</h2>
        <p className="text-blue-100 text-sm mt-1">Your transaction is complete.</p>
      </div>

      <div className="w-full flex-1 px-4 -mt-6 flex flex-col gap-4 overflow-y-auto items-center pb-28">
        {/* Payment ID Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center z-10 relative">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Payment ID</span>
          <div className="flex items-center gap-3">
             <span className="font-black text-3xl text-[#0F172A] tracking-widest">{paymentId}</span>
             <button
                onClick={handleCopy}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${copied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-bluepost-primary hover:border-bluepost-primary/30'}`}
                title="Copy Payment ID"
             >
               {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
             </button>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center max-w-xs">Write this code on your package and drop it off at the {selectedTransport?.operator} station.</p>
        </div>

        {/* Summary Details */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-50 pb-3">Transaction Details</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Route</span>
              <span className="text-sm font-bold text-gray-900">{from?.name} &rarr; {to?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Carrier</span>
              <span className="text-sm font-bold text-gray-900">{selectedTransport?.operator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Amount Paid</span>
              <span className="text-sm font-bold text-gray-900">TSh {selectedTransport?.price.toLocaleString()}</span>
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
