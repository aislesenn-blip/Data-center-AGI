import React from 'react';
import { motion } from 'framer-motion';
import { Package, PackageCheck, Truck, ArrowRight } from 'lucide-react';
import { HistoryItem } from '@/lib/types';

interface HistoryTabProps {
  shipments: HistoryItem[];
  onOpenShipment: (item: HistoryItem) => void;
}

export default function HistoryTab({ shipments, onOpenShipment }: HistoryTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-center p-4 shadow-md shrink-0">
        <h2 className="font-bold text-lg tracking-wide">Shipment History</h2>
      </div>

      <div className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col gap-4 overflow-y-auto items-center">
        {shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center max-w-xs mx-auto">
             <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-300 mb-6">
                <Package size={40} />
             </div>
             <h3 className="font-bold text-lg text-bluepost-dark mb-2">No history yet</h3>
             <p className="text-sm text-gray-500">You haven't made any shipments. Your completed and active shipments will appear here.</p>
          </div>
        ) : (
          shipments.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenShipment(item)}
              className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4 border border-gray-100 hover:border-bluepost-primary/30 transition-colors text-left"
            >
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  {item.status === 'DELIVERED' ? (
                     <PackageCheck size={18} className="text-green-500" />
                  ) : (
                     <Truck size={18} className="text-bluepost-primary" />
                  )}
                  <span className="font-black text-sm text-bluepost-dark tracking-wide">{item.id}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  item.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-bluepost-primary'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-xs text-gray-500 mb-1">Route</span>
                   <span className="font-bold text-sm text-gray-800">{item.bookingState.from?.name} → {item.bookingState.to?.name}</span>
                </div>
                <div className="flex flex-col text-right">
                   <span className="text-xs text-gray-500 mb-1">Date</span>
                   <span className="font-bold text-sm text-gray-800">{item.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-bluepost-primary">
                 <span className="text-xs font-bold">View details</span>
                 <ArrowRight size={16} />
              </div>
            </button>
          ))
        )}
      </div>
    </motion.div>
  );
}
