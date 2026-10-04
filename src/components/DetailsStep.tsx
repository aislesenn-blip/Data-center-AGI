import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

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
      className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto relative"
    >
      <button onClick={onBack} className="absolute left-6 top-6 text-gray-400 hover:text-gray-800 transition-colors">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-bluepost-dark">
        What are you moving?
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all ${
              selected === option.id
                ? 'border-bluepost-primary bg-blue-50/50 text-bluepost-primary'
                : 'border-gray-100 hover:border-gray-200 text-gray-600'
            }`}
          >
            <div className={`${selected === option.id ? 'text-bluepost-primary' : 'text-gray-400'}`}>
              {option.icon}
            </div>
            <span className="font-medium text-sm text-center">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className={`mt-8 w-full rounded-xl py-4 font-semibold text-lg transition-colors flex justify-center items-center gap-2 ${
          selected
            ? 'bg-bluepost-primary hover:bg-bluepost-primary-hover text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        Find Transport
      </button>
    </motion.div>
  );
}
