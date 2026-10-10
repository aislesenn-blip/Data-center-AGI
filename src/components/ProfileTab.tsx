import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Info, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function ProfileTab() {
  const menuItems = [
    { icon: <FileText size={20} />, label: 'Terms and Conditions' },
    { icon: <Info size={20} />, label: 'About' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      <div className="bg-[#0F172A] text-white w-full flex items-center justify-center p-4 shadow-md shrink-0">
        <h2 className="font-bold text-lg tracking-wide">Profile</h2>
      </div>

      <div className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col gap-6 overflow-y-auto items-center">
        {/* Menu Items */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3 text-bluepost-dark">
                  <div className="text-gray-400">{item.icon}</div>
                  <span className="font-bold text-sm">{item.label}</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>

        <button className="w-full max-w-md mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-bold text-sm">
           <LogOut size={18} />
           Log Out
        </button>
      </div>
    </motion.div>
  );
}
