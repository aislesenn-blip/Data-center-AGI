import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('parcel');
  const [value, setValue] = useState('');

  const isFormValid = description.trim().length > 0 && value.trim().length > 0;

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
        Package Details
      </h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">What is inside?</label>
          <input
            type="text"
            placeholder="e.g. Clothes and shoes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-bluepost-primary transition-colors placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Type of Item</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-bluepost-primary transition-colors appearance-none"
          >
            <option value="parcel">Parcel / Box</option>
            <option value="documents">Documents</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Estimated Value (TSh)</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-bluepost-primary transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isFormValid}
        className={`mt-8 w-full rounded-xl py-4 font-semibold text-lg transition-colors flex justify-center items-center gap-2 ${
          isFormValid
            ? 'bg-bluepost-primary hover:bg-bluepost-primary-hover text-white shadow-sm'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        Calculate Price
      </button>
    </motion.div>
  );
}
