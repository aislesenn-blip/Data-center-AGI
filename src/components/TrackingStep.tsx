import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Map, CheckCircle2, QrCode } from 'lucide-react';
import { BookingState } from '@/app/page';

interface TrackingStepProps {
  onReset: () => void;
  bookingState: BookingState;
}

export default function TrackingStep({ onReset, bookingState }: TrackingStepProps) {
  // Use a pseudo-random tracking number based on the booking details to keep it pure and stable
  const seed = bookingState.origin ? bookingState.origin.id.length * 123 + (bookingState.destination?.id.length || 0) * 456 + (bookingState.shipmentDetails?.receiverName.length || 0) * 789 : 1234;
  const trackingNumber = "BP-" + (1000 + (seed % 9000)).toString();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-30 overflow-y-auto"
    >
      <div className="w-full bg-bluepost-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-white/10">
          <Package size={150} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 border border-white/30">
             <CheckCircle2 size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black mb-1">Booking Confirmed!</h1>
          <p className="text-blue-100 text-sm mb-6">Your goods are ready for drop-off.</p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full max-w-sm flex flex-col items-center">
            <span className="text-blue-100 text-xs uppercase tracking-widest font-bold mb-1">Tracking Number</span>
            <span className="text-3xl font-black tracking-wider">{trackingNumber}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-4 max-w-md w-full mx-auto pb-12">

        {/* Next Steps / Drop-off instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 text-gray-100">
             <QrCode size={64} />
           </div>
           <div className="w-10 h-10 bg-blue-50 text-bluepost-primary rounded-full flex items-center justify-center shrink-0 z-10">
             <MapPin size={20} />
           </div>
           <div className="z-10">
             <h3 className="font-bold text-gray-800 mb-1">Drop-off at Station</h3>
             <p className="text-sm text-gray-500 leading-relaxed">
               Show this tracking number at the <strong className="text-gray-700">{bookingState.selectedTransport?.vehicle}</strong> office in <strong className="text-gray-700">{bookingState.origin?.name}</strong> to dispatch your goods.
             </p>
           </div>
        </div>

        {/* Timeline representation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-2">
          <h3 className="font-bold text-sm text-gray-800 mb-4 uppercase tracking-wider">Shipment Status</h3>

          <div className="flex flex-col gap-6 relative">
            {/* Connecting line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100 z-0" />

            {/* Step 1: Booked */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-7 h-7 bg-bluepost-primary text-white rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                 <CheckCircle2 size={12} />
              </div>
              <div className="pt-1">
                <div className="font-bold text-sm text-gray-800">Booked & Paid</div>
                <div className="text-xs text-gray-500 mt-0.5">Just now</div>
              </div>
            </div>

            {/* Step 2: Drop off */}
            <div className="flex items-start gap-4 relative z-10 opacity-60">
              <div className="w-7 h-7 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0" />
              <div className="pt-1">
                <div className="font-bold text-sm text-gray-800">Pending Drop-off</div>
                <div className="text-xs text-gray-500 mt-0.5">Waiting for goods at station</div>
              </div>
            </div>

            {/* Step 3: Transit */}
            <div className="flex items-start gap-4 relative z-10 opacity-40">
              <div className="w-7 h-7 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0" />
              <div className="pt-1">
                <div className="font-bold text-sm text-gray-800">In Transit</div>
                <div className="text-xs text-gray-500 mt-0.5">To {bookingState.destination?.name}</div>
              </div>
            </div>

            {/* Step 4: Arrival */}
            <div className="flex items-start gap-4 relative z-10 opacity-40">
              <div className="w-7 h-7 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0" />
              <div className="pt-1">
                <div className="font-bold text-sm text-gray-800">Ready for Pickup</div>
                <div className="text-xs text-gray-500 mt-0.5">{bookingState.shipmentDetails?.receiverName} will be notified</div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="mt-6 w-full bg-[#0F172A] hover:bg-black text-white rounded-md py-4 font-bold text-base transition-colors shadow-sm"
        >
          Send Another Item
        </button>
      </div>
    </motion.div>
  );
}
