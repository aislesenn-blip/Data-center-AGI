import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft, ChevronRight, Check } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';
import { BookingState } from '@/app/page';

interface DetailsStepProps {
  onNext: () => void;
  onBack: () => void;
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
}

type SubStep = 'type' | 'details' | 'contacts';

export default function DetailsStep({ onNext, onBack, bookingState, updateBookingState }: DetailsStepProps) {
  const [subStep, setSubStep] = useState<SubStep>('type');

  // Local state to manage form fields before committing them to global state on 'Next'
  const [localDetails, setLocalDetails] = useState({ ...bookingState.shipmentDetails });

  const updateLocalDetails = (field: string, value: string | boolean) => {
    setLocalDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleNextSubStep = () => {
    if (subStep === 'type') {
      setSubStep('details');
    } else if (subStep === 'details') {
      setSubStep('contacts');
    } else {
      // Commit to global state and proceed to next main step
      updateBookingState({ shipmentDetails: localDetails as BookingState['shipmentDetails'] });
      onNext();
    }
  };

  const handleBackSubStep = () => {
    if (subStep === 'contacts') {
      setSubStep('details');
    } else if (subStep === 'details') {
      setSubStep('type');
    } else {
      // Commit whatever progress we have so far
      updateBookingState({ shipmentDetails: localDetails as BookingState['shipmentDetails'] });
      onBack();
    }
  };

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
        <button onClick={handleBackSubStep} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">
          {subStep === 'type' && 'What are you sending?'}
          {subStep === 'details' && 'Package Details'}
          {subStep === 'contacts' && 'Sender & Receiver'}
        </h2>
        <div className="w-8" /> {/* Placeholder for balance */}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-bluepost-primary h-1 transition-all duration-300"
          style={{ width: subStep === 'type' ? '33%' : subStep === 'details' ? '66%' : '100%' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col overflow-y-auto items-center">

        <AnimatePresence mode="wait">
          {subStep === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col gap-4 items-center"
            >
              {options.map((option) => {
                const isSelected = localDetails?.goodsType === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      updateLocalDetails('goodsType', option.id);
                      setTimeout(handleNextSubStep, 150); // slight delay for visual feedback
                    }}
                    className={`w-full max-w-md bg-white rounded-lg shadow-sm h-16 flex items-center px-4 justify-between border-2 transition-colors group ${isSelected ? 'border-bluepost-primary' : 'border-transparent hover:border-bluepost-primary/30'}`}
                  >
                    <div className={`${isSelected ? 'text-bluepost-primary' : 'text-gray-500'} group-hover:text-bluepost-primary transition-colors flex-shrink-0`}>
                      {option.icon}
                    </div>
                    <span className="font-bold text-[15px] text-bluepost-dark flex-1 text-left px-4">
                      {option.label}
                    </span>
                    <div className={`${isSelected ? 'text-bluepost-primary' : 'text-gray-400'} group-hover:text-bluepost-primary flex-shrink-0`}>
                      {isSelected ? <Check size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </button>
                )
              })}
            </motion.div>
          )}

          {subStep === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md flex flex-col gap-4"
            >
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-gray-500 font-medium">Description of Contents</label>
                  <input
                    type="text"
                    placeholder="e.g. Clothes, Documents, Electronics"
                    value={localDetails?.description || ''}
                    onChange={(e) => updateLocalDetails('description', e.target.value)}
                    className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[12px] text-gray-500 font-medium">Approx. Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      value={localDetails?.weight || ''}
                      onChange={(e) => updateLocalDetails('weight', e.target.value)}
                      className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[12px] text-gray-500 font-medium">Declared Value (TSh)</label>
                    <input
                      type="number"
                      placeholder="Optional"
                      value={localDetails?.declaredValue || ''}
                      onChange={(e) => updateLocalDetails('declaredValue', e.target.value)}
                      className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="fragile"
                    checked={localDetails?.isFragile || false}
                    onChange={(e) => updateLocalDetails('isFragile', e.target.checked)}
                    className="w-5 h-5 accent-bluepost-primary"
                  />
                  <label htmlFor="fragile" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Fragile / Special Handling Required
                  </label>
                </div>
              </div>

              <button
                onClick={handleNextSubStep}
                disabled={!localDetails?.description}
                className={`mt-4 w-full rounded-md py-3.5 font-bold text-lg transition-colors flex justify-center items-center ${localDetails?.description ? 'bg-bluepost-dark hover:bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Continue
              </button>
            </motion.div>
          )}

          {subStep === 'contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md flex flex-col gap-4"
            >
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2">Sender Details</h3>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-gray-500 font-medium">Sender Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={localDetails?.senderName || ''}
                    onChange={(e) => updateLocalDetails('senderName', e.target.value)}
                    className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-gray-500 font-medium">Sender Phone Number</label>
                  <input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    value={localDetails?.senderPhone || ''}
                    onChange={(e) => updateLocalDetails('senderPhone', e.target.value)}
                    className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2">Receiver Details</h3>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-gray-500 font-medium">Receiver Name</label>
                  <input
                    type="text"
                    placeholder="Their full name"
                    value={localDetails?.receiverName || ''}
                    onChange={(e) => updateLocalDetails('receiverName', e.target.value)}
                    className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-gray-500 font-medium">Receiver Phone Number</label>
                  <input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    value={localDetails?.receiverPhone || ''}
                    onChange={(e) => updateLocalDetails('receiverPhone', e.target.value)}
                    className="border-b border-gray-200 py-2 outline-none focus:border-bluepost-primary text-bluepost-dark font-medium placeholder:font-normal placeholder:text-gray-300 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleNextSubStep}
                disabled={!localDetails?.senderName || !localDetails?.senderPhone || !localDetails?.receiverName || !localDetails?.receiverPhone}
                className={`mt-4 w-full rounded-md py-3.5 font-bold text-lg transition-colors flex justify-center items-center ${(!localDetails?.senderName || !localDetails?.senderPhone || !localDetails?.receiverName || !localDetails?.receiverPhone) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-bluepost-dark hover:bg-black text-white'}`}
              >
                Find Transports
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
