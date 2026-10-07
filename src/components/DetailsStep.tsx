import React from 'react';
import { motion } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft, ChevronRight } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const options = [
    { id: 'envelope', icon: <Mail size={24} />, label: 'Envelope / Small Document' },
    { id: 'box', icon: <ShipmentTriangle size="sm" />, label: 'Standard Box' },
    { id: 'boxes', icon: <Box size={24} />, label: 'Multiple Boxes' },
    { id: 'cargo', icon: <Truck size={24} />, label: 'Large Cargo' },
  ];

  return (
    <div className="w-full relative h-full flex flex-col">
      {/* Fixed App Header */}
      <div className="fixed top-0 left-0 w-full bg-bluepost-dark h-16 flex items-center justify-center z-50">
        <button onClick={onBack} className="absolute left-4 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="text-white font-bold text-lg">Select Shipment Type</span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md mx-auto pt-24 pb-4 px-4 flex flex-col gap-4"
      >
        {options.map((option) => (
          <button
            key={option.id}
            onClick={onNext}
            className="w-[92%] mx-auto h-16 bg-white rounded-md shadow-sm border border-gray-100 flex items-center px-4 justify-between transition-colors hover:bg-gray-50 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="text-bluepost-primary">
                {option.icon}
              </div>
              <span className="font-bold text-[15px] text-bluepost-dark">{option.label}</span>
            </div>
            <div className="text-gray-400">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
