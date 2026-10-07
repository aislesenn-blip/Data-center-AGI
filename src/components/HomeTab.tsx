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
      {/* Brand / Logo */}
      <div className="bg-white rounded-full px-6 py-2 flex items-center gap-2 mb-8 shadow-sm w-fit mx-auto">
        <div className="w-6 h-6 rounded-full bg-bluepost-primary text-white flex items-center justify-center font-bold text-xs leading-none">
          B
        </div>
        <span className="font-bold text-lg text-bluepost-dark tracking-tight">BluePost</span>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-md mx-auto relative overflow-hidden border border-gray-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10 z-0"></div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2 text-bluepost-dark leading-tight">
            Send cargo<br />across Tanzania.
          </h1>
          <p className="text-gray-500 text-sm mb-6 max-w-[200px]">
            Fast, secure, and reliable transport for your goods.
          </p>

          <button
            onClick={onStartShipment}
            className="w-full bg-bluepost-dark hover:bg-black text-white rounded-lg py-4 font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
          >
            Start New Shipment <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-white drop-shadow-md">Active Shipments</h2>
        </div>

        {recentShipments.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-bluepost-primary mb-4">
              <Package size={32} />
            </div>
            <h3 className="font-bold text-bluepost-dark mb-1">No active shipments</h3>
            <p className="text-sm text-gray-500">When you send or receive goods, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentShipments.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenShipment(item)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between text-left hover:border-bluepost-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <ShipmentTriangle size="sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-bluepost-dark">{item.id}</span>
                    <span className="text-xs text-gray-500">{item.bookingState.from?.name} to {item.bookingState.to?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-1 ${
                    item.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-bluepost-primary'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-gray-400 group-hover:text-bluepost-primary transition-colors">
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
