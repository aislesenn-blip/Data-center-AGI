import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, MapPin, PackageCheck, Zap } from 'lucide-react';

interface OptionsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function OptionsStep({ onNext, onBack }: OptionsStepProps) {
  const options = [
    {
      id: 'shabiby',
      transportName: 'SHABIBY LINE',
      vehicle: 'Passenger Bus',
      capacity: 'Space Available',
      price: 'TSh 15,000',
      depTime: '06:00',
      depLoc: 'Ubungo',
      arrTime: '14:30',
      arrLoc: 'Dodoma',
      duration: '8h 30m',
      highlight: true,
    },
    {
      id: 'abood',
      transportName: 'ABOOD BUS',
      vehicle: 'Passenger Bus',
      capacity: 'Limited Space',
      price: 'TSh 12,000',
      depTime: '08:00',
      depLoc: 'Magufuli',
      arrTime: '17:00',
      arrLoc: 'Dodoma',
      duration: '9h 00m',
      highlight: false,
    },
    {
      id: 'cargostar',
      transportName: 'CARGOSTAR',
      vehicle: 'Dedicated Freight',
      capacity: 'High Capacity',
      price: 'TSh 25,000',
      depTime: '10:00',
      depLoc: 'Tazara',
      arrTime: '22:00',
      arrLoc: 'Dodoma',
      duration: '12h 00m',
      highlight: false,
    }
  ];

  return (
    <div className="w-full relative h-full flex flex-col">
      {/* Fixed App Header */}
      <div className="fixed top-0 left-0 w-full bg-bluepost-dark h-16 flex items-center justify-center z-50">
        <button onClick={onBack} className="absolute left-4 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="text-white font-bold text-lg">Select Transport</span>
      </div>

      {/* Context Banner */}
      <div className="fixed top-16 left-0 w-full bg-bluepost-accent text-white py-2 text-center text-sm font-bold z-40">
        Dar es Salaam → Dodoma
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md mx-auto pt-32 pb-4 px-4 flex flex-col gap-4"
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="w-[92%] mx-auto bg-white rounded-md shadow-md p-4 flex flex-col border border-gray-100"
          >
            {/* Row 1: Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-bluepost-accent tracking-wide text-sm">{option.transportName}</span>
              <span className={`text-xs font-bold ${option.highlight ? 'text-bluepost-success' : 'text-gray-500'}`}>
                {option.capacity}
              </span>
            </div>

            {/* Row 2: Sub-header */}
            <div className="flex justify-between items-end mb-4">
              <span className="text-gray-500 text-sm">{option.vehicle}</span>
              <span className="font-bold text-lg text-black">{option.price}</span>
            </div>

            {/* Row 3: Timeline Graphic */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex flex-col items-end w-1/4">
                <span className="font-bold text-lg leading-none">{option.depTime}</span>
                <span className="text-xs text-gray-500 mt-1">{option.depLoc}</span>
              </div>

              <div className="flex flex-col items-center justify-center w-1/2 relative px-2">
                <div className="w-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full border-2 border-black bg-white z-10" />
                  <div className="flex-1 h-[2px] bg-gray-300" />
                  <Clock size={16} className="text-gray-400 mx-1 z-10 bg-white" />
                  <div className="flex-1 h-[2px] bg-gray-300" />
                  <div className="w-2 h-2 rounded-full border-2 border-black bg-white z-10" />
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-medium">{option.duration}</span>
              </div>

              <div className="flex flex-col items-start w-1/4">
                <span className="font-bold text-lg leading-none">{option.arrTime}</span>
                <span className="text-xs text-gray-500 mt-1 text-bluepost-danger">{option.arrLoc}</span>
              </div>
            </div>

            {/* Row 4: Footer */}
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
              <div className="flex gap-3 text-gray-400">
                <ShieldCheck size={18} />
                <MapPin size={18} />
                <PackageCheck size={18} />
                {option.highlight && <Zap size={18} className="text-bluepost-accent" />}
              </div>
              <button
                onClick={onNext}
                className="bg-bluepost-dark hover:bg-black text-white px-6 py-2 rounded-md font-bold text-sm transition-colors"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
