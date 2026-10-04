import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const isComplete = description.length > 2 && value.length > 0;

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

      <h2 className="text-2xl font-bold mt-12 mb-6 text-bluepost-dark tracking-tight leading-tight">
        What are you moving?
      </h2>

      <div className="space-y-5">
        {/* What's Inside */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-2">
            Contents description
          </label>
          <input
            type="text"
            placeholder="e.g. 2 Laptops and documents"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-base font-medium outline-none focus:border-bluepost-primary/50 focus:bg-white transition-colors placeholder:font-normal placeholder:text-gray-400"
          />
        </div>

        {/* Category Dropdown Mock */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-2">
            Category
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-base font-medium outline-none focus:border-bluepost-primary/50 focus:bg-white transition-colors text-bluepost-dark">
              <option value="general">General Goods</option>
              <option value="electronics">Electronics</option>
              <option value="documents">Documents</option>
              <option value="perishables">Perishables</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Estimated Value */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-2">
            Estimated Value (TSh)
          </label>
          <input
            type="text"
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-base font-medium outline-none focus:border-bluepost-primary/50 focus:bg-white transition-colors placeholder:font-normal placeholder:text-gray-400"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isComplete}
        className={`mt-8 w-full rounded-2xl py-4 font-semibold text-lg transition-colors flex justify-center items-center ${
          isComplete
            ? 'bg-bluepost-dark hover:bg-black text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        Find Options
      </button>
    </motion.div>
  );
}
