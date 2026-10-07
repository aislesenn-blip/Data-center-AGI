import React from 'react';
import { motion } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft, ChevronRight, RefreshCw } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const options = [
    { id: 'envelope', icon: <Mail size={24} />, label: 'Envelope / Small' },
    { id: 'box', icon: <ShipmentTriangle size="sm" />, label: 'Box / Medium' },
    { id: 'boxes', icon: <Box size={24} />, label: 'Multiple Boxes' },
    { id: 'cargo', icon: <Truck size={24} />, label: 'Large Cargo' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Fixed Top Header */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">Select Goods Type</h2>
        <button className="p-2 -mr-2 text-white hover:text-gray-300 transition-colors">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Main List Area */}
      <div className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col gap-4 overflow-y-auto items-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={onNext}
            className="w-full max-w-md bg-white rounded-lg shadow-sm h-14 flex items-center px-4 justify-between border border-gray-100 hover:border-bluepost-primary/30 transition-colors group"
          >
            <div className="text-gray-500 group-hover:text-bluepost-primary transition-colors flex-shrink-0">
              {option.icon}
            </div>
            <span className="font-bold text-[15px] text-bluepost-dark flex-1 text-left px-4">
              {option.label}
            </span>
            <div className="text-gray-400 group-hover:text-bluepost-primary flex-shrink-0">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
