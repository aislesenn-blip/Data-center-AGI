import React from 'react';
import { motion } from 'framer-motion';
import { Package, Search, ArrowRight, PackageCheck } from 'lucide-react';
import { HistoryItem } from '@/lib/types';
import ShipmentTriangle from './ShipmentTriangle';

interface HomeTabProps {
  onStartShipment: () => void;
  recentShipments: HistoryItem[];
  onOpenShipment: (item: HistoryItem) => void;
}

export default function HomeTab({ onStartShipment, recentShipments, onOpenShipment }: HomeTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full px-4 pt-12 pb-32"
    >
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-12 w-full max-w-md mx-auto relative overflow-hidden border border-gray-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10 z-0"></div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-bluepost-dark leading-tight">
            Send a package
          </h1>

          <button
            onClick={onStartShipment}
            className="w-full bg-bluepost-dark hover:bg-black text-white rounded-lg py-4 font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
          >
            New package <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="font-bold text-lg text-gray-900 drop-shadow-md">Active</h2>
        </div>

        {recentShipments.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-bluepost-primary mb-4">
              <Package size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">No active packages</h3>
            <p className="text-sm text-gray-600 font-medium">When you send or receive goods, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentShipments.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenShipment(item)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between text-left hover:border-bluepost-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <ShipmentTriangle size="sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] text-gray-900">{item.id}</span>
                    <span className="text-xs text-gray-600 font-medium">{item.bookingState.from?.name} to {item.bookingState.to?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-1 border ${
                    item.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-bluepost-primary border-blue-200'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-gray-400 group-hover:text-bluepost-primary transition-colors mt-1">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
