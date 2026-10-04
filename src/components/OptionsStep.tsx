import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface OptionsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function OptionsStep({ onNext, onBack }: OptionsStepProps) {
  const operators = [
    {
      id: 'shabiby',
      name: 'Shabiby',
      departing: 'Today 18:00',
      arrival: 'Tomorrow morning',
      price: 'TSh 15,000',
      highlight: true,
    },
    {
      id: 'abood',
      name: 'Abood',
      departing: 'Tomorrow 08:00',
      arrival: 'Tomorrow evening',
      price: 'TSh 12,000',
      highlight: false,
    },
    {
      id: 'bmcoach',
      name: 'BM Coach',
      departing: 'Tomorrow 10:00',
      arrival: 'Tomorrow night',
      price: 'TSh 14,000',
      highlight: false,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl p-6 w-full max-w-md mx-auto border border-black/5 relative"
    >
      <button onClick={onBack} className="absolute left-6 top-6 text-gray-400 hover:text-bluepost-dark transition-colors">
        <ArrowLeft size={24} />
      </button>

      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-bluepost-dark tracking-tight leading-tight mb-1">
          Select Operator
        </h2>
        <p className="text-gray-500 text-sm font-medium">Dar es Salaam → Dodoma</p>
      </div>

      <div className="space-y-3">
        {operators.map((operator) => (
          <div
            key={operator.id}
            onClick={onNext}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              operator.highlight
                ? 'border-bluepost-primary bg-blue-50/20'
                : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-bluepost-dark">{operator.name}</h3>
                {operator.highlight && (
                  <span className="text-[10px] font-bold text-bluepost-primary uppercase tracking-wider mt-0.5 block">
                    Fastest
                  </span>
                )}
              </div>
              <span className="font-bold text-bluepost-dark text-lg">{operator.price}</span>
            </div>

            <div className="flex flex-col gap-1.5 pt-3 border-t border-gray-100/60">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Departing</span>
                <span className="font-semibold text-bluepost-dark text-right">{operator.departing}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Expected arrival</span>
                <span className="font-semibold text-bluepost-dark text-right">{operator.arrival}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
