import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bus, Truck, Box } from 'lucide-react';

interface OptionsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function OptionsStep({ onNext, onBack }: OptionsStepProps) {
  const options = [
    {
      id: 'shabiby',
      operator: 'Shabiby Line',
      icon: <Bus size={20} />,
      departure: 'Today, 18:00',
      arrival: 'Tomorrow, Morning',
      price: 'TSh 15,000 (Base)',
      highlight: true,
    },
    {
      id: 'abood',
      operator: 'Abood Bus',
      icon: <Bus size={20} />,
      departure: 'Tomorrow, 08:00',
      arrival: 'Tomorrow, Evening',
      price: 'TSh 12,000 (Base)',
      highlight: false,
    },
    {
      id: 'bmcoach',
      operator: 'BM Coach',
      icon: <Bus size={20} />,
      departure: 'Tomorrow, 10:00',
      arrival: 'Tomorrow, Night',
      price: 'TSh 14,000 (Base)',
      highlight: false,
    }
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

      <h2 className="text-2xl font-bold mt-12 mb-2 text-bluepost-dark">
        Best ways to move it.
      </h2>
      <p className="text-gray-500 mb-6 text-sm">Dar es Salaam → Dodoma</p>

      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={onNext}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              option.highlight
                ? 'border-bluepost-primary bg-blue-50/20 hover:bg-blue-50/50'
                : 'border-gray-100 hover:border-bluepost-primary/30 hover:bg-gray-50'
            }`}
          >
            {option.highlight && (
              <span className="bg-bluepost-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3 inline-block">
                Recommended
              </span>
            )}

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400">{option.icon}</div>
                <h3 className="font-semibold text-lg">{option.operator}</h3>
              </div>
              <span className="font-bold text-bluepost-dark">{option.price}</span>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>Departing: {option.departure}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block"></span>
                <span>Expected arrival: {option.arrival}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
