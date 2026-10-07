import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bus, Truck, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import ShipmentTriangle from './ShipmentTriangle';

interface OptionsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function OptionsStep({ onNext, onBack }: OptionsStepProps) {
  const options = [
    {
      id: 'fastest',
      title: 'FASTEST',
      vehicle: 'Shabiby Line (Passenger)',
      icon: <Bus size={18} />,
      capacity: 'Small goods',
      price: 'TSh 15,000',
      departure: '10:00 AM',
      arrival: '4:00 PM',
      highlight: true,
    },
    {
      id: 'capacity',
      title: 'STANDARD',
      vehicle: 'Abood Logistics',
      icon: <Box size={18} />,
      capacity: 'Medium goods',
      price: 'TSh 25,000',
      departure: '2:00 PM',
      arrival: '8:00 PM',
      highlight: false,
    },
    {
      id: 'large',
      title: 'LARGE LOAD',
      vehicle: 'BM Coach Cargo',
      icon: <Truck size={18} />,
      capacity: 'Large capacity',
      price: 'TSh 45,000',
      departure: '11:00 AM',
      arrival: '6:00 PM',
      highlight: false,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      {/* Top App Bar */}
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-between p-4 shadow-md shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg tracking-wide">Select Transport</h2>
        <div className="w-8" /> {/* Placeholder for balance */}
      </div>

      {/* Context Banner */}
      <div className="bg-bluepost-primary text-white w-full text-center py-2 text-sm font-bold tracking-wide shadow-sm shrink-0">
        Dar es Salaam → Dodoma
      </div>

      {/* Date Ribbon */}
      <div className="bg-white w-full py-3 px-4 shadow-sm shrink-0 flex items-center justify-between border-b border-gray-100">
        <button className="text-gray-400 hover:text-gray-800"><ChevronLeft size={20} /></button>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-2">
          {['12', '13', '14', '15', '16'].map((date, i) => (
            <div key={date} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${i === 2 ? 'bg-bluepost-primary text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
              {date}
            </div>
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-800"><ChevronRight size={20} /></button>
      </div>

      {/* Result Card List */}
      <div className="w-full flex-1 pt-4 pb-28 px-4 flex flex-col gap-4 overflow-y-auto items-center">
        {options.map((option) => (
          <div
            key={option.id}
            className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border border-gray-100"
          >
            {/* Row 1: Title & Capacity */}
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className={`font-bold text-xs tracking-wider ${option.highlight ? 'text-bluepost-primary' : 'text-gray-500'}`}>
                {option.title}
              </span>
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                {option.capacity}
              </span>
            </div>

            {/* Row 2: Vehicle & Price */}
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-gray-400">{option.icon}</span>
                {option.vehicle}
              </div>
              <span className="font-black text-lg text-black">{option.price}</span>
            </div>

            {/* Row 3: Timeline Graphic */}
            <div className="flex items-center justify-between mt-2 mb-2 px-2">
              <div className="text-right flex flex-col">
                <span className="font-bold text-sm text-gray-800">{option.departure}</span>
                <span className="text-xs text-gray-500">Dar</span>
              </div>

              <div className="flex-1 flex items-center justify-center px-4 relative">
                 <div className="absolute w-full h-[2px] bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
                 <div className="w-2 h-2 rounded-full bg-bluepost-primary z-10" />
                 <div className="flex-1" />
                 <div className="bg-white px-2 z-10 text-gray-400">
                    <Clock size={14} />
                 </div>
                 <div className="flex-1" />
                 <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white z-10" />
              </div>

              <div className="text-left flex flex-col">
                <span className="font-bold text-sm text-gray-800">{option.arrival}</span>
                <span className="text-xs text-gray-500">Dodoma</span>
              </div>
            </div>

            {/* Row 4: Action */}
            <div className="flex justify-end pt-2 border-t border-gray-50">
              <button
                onClick={onNext}
                className="bg-[#0F172A] hover:bg-black text-white rounded-md px-6 py-2.5 font-bold text-sm transition-colors shadow-sm"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
