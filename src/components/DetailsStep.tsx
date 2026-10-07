import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Mail, Truck, ArrowLeft, RefreshCw, User, MapPin, PackagePlus } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';
import { BookingState, ShipmentDetails } from '@/lib/types';

interface DetailsStepProps {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

type SubStep = 'type' | 'details';

export default function DetailsStep({ bookingState, updateBookingState, onNext, onBack }: DetailsStepProps) {
  const [subStep, setSubStep] = useState<SubStep>('type');

  // Local state for the progressive form to avoid pushing incomplete data to global state until ready
  const [draft, setDraft] = useState<Partial<ShipmentDetails>>(bookingState.shipment || {
    type: '',
    description: '',
    weight: 1,
    sender: { name: '', phone: '' },
    receiver: { name: '', phone: '' }
  });

  const typeOptions = [
    { id: 'Document', icon: <Mail size={24} />, label: 'Document / Small' },
    { id: 'Box', icon: <ShipmentTriangle size="sm" />, label: 'Box / Medium' },
    { id: 'Multiple Boxes', icon: <Box size={24} />, label: 'Multiple Boxes' },
    { id: 'Cargo', icon: <Truck size={24} />, label: 'Large Cargo' },
    { id: 'Other', icon: <PackagePlus size={24} />, label: 'Other' },
  ];

  const handleSelectType = (typeId: string) => {
    setDraft(prev => ({ ...prev, type: typeId }));
    setSubStep('details');
  };

  const handleComplete = () => {
    if (isDetailsValid) {
      updateBookingState({ shipment: draft as ShipmentDetails });
      onNext();
    }
  };

  const isDetailsValid =
    draft.description &&
    draft.weight &&
    draft.sender?.name &&
    draft.sender?.phone &&
    draft.receiver?.name &&
    draft.receiver?.phone;

  const renderHeaderTitle = () => {
    if (subStep === 'type') return "Select Goods Type";
    return "Shipment Details";
  };

  const handleBack = () => {
    if (subStep === 'details') {
      setSubStep('type');
    } else {
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Fixed Top Header */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">{renderHeaderTitle()}</h2>
        <div className="w-8" /> {/* Placeholder for balance */}
      </div>

      <div className="w-full flex-1 pt-6 pb-28 px-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {subStep === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4 items-center"
            >
               {typeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectType(option.id)}
                  className={`w-full max-w-md bg-white rounded-lg shadow-sm h-16 flex items-center px-4 border-2 transition-colors group ${
                    draft.type === option.id ? 'border-bluepost-primary bg-blue-50/20' : 'border-gray-100 hover:border-bluepost-primary/30'
                  }`}
                >
                  <div className={`${draft.type === option.id ? 'text-bluepost-primary' : 'text-gray-400'} group-hover:text-bluepost-primary transition-colors flex-shrink-0 w-8`}>
                    {option.icon}
                  </div>
                  <span className="font-bold text-[15px] text-bluepost-dark flex-1 text-left px-4">
                    {option.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {subStep === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6 items-center w-full max-w-md mx-auto"
            >
              {/* Package Info Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-full">
                <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Box size={16} className="text-bluepost-primary" /> Package Info
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Description of Contents</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., 2 pairs of trousers, 3 shirts and one pair of shoes. Or: Small electronic device packed inside a cardboard box."
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium resize-none"
                      value={draft.description}
                      onChange={(e) => setDraft(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Estimated Weight (kg)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Weight in kg"
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium"
                      value={draft.weight || ''}
                      onChange={(e) => setDraft(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>

              {/* Sender Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-full">
                <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-bluepost-primary" /> Sender Details
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium"
                      value={draft.sender?.name}
                      onChange={(e) => setDraft(prev => ({ ...prev, sender: { ...prev.sender!, name: e.target.value } }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07XXXXXXXX"
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium"
                      value={draft.sender?.phone}
                      onChange={(e) => setDraft(prev => ({ ...prev, sender: { ...prev.sender!, phone: e.target.value } }))}
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-full mb-4">
                <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} className="text-bluepost-primary" /> Receiver Details
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Receiver's Name"
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium"
                      value={draft.receiver?.name}
                      onChange={(e) => setDraft(prev => ({ ...prev, receiver: { ...prev.receiver!, name: e.target.value } }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07XXXXXXXX"
                      className="w-full border border-gray-200 rounded-md p-2.5 outline-none focus:border-bluepost-primary text-sm font-medium"
                      value={draft.receiver?.phone}
                      onChange={(e) => setDraft(prev => ({ ...prev, receiver: { ...prev.receiver!, phone: e.target.value } }))}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                disabled={!isDetailsValid}
                className={`w-full rounded-lg py-4 font-bold text-lg transition-colors flex justify-center items-center shadow-md ${
                  isDetailsValid
                    ? 'bg-bluepost-dark hover:bg-black text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Find Transport
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
