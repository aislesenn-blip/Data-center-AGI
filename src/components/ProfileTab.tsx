import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Info, HelpCircle, LogOut, ChevronRight, ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';

interface ProfileTabProps {
  onLogout: () => void;
}

type ViewState = 'main' | 'terms' | 'about' | 'support';

export default function ProfileTab({ onLogout }: ProfileTabProps) {
  const [activeView, setActiveView] = useState<ViewState>('main');

  const menuItems: { id: ViewState, icon: React.ReactNode, label: string }[] = [
    { id: 'terms', icon: <FileText size={20} />, label: 'Terms and Conditions' },
    { id: 'about', icon: <Info size={20} />, label: 'About' },
    { id: 'support', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-bluepost-bg absolute top-0 left-0 right-0 bottom-0 z-20"
    >
      <div className="bg-[#0F172A] text-white w-full flex items-center p-4 shadow-md shrink-0 h-[60px]">
        {activeView !== 'main' ? (
          <>
            <button onClick={() => setActiveView('main')} className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors shrink-0 z-10 absolute">
              <ArrowLeft size={24} />
            </button>
            <h2 className="font-bold text-lg tracking-wide w-full text-center flex-1">
              {menuItems.find(i => i.id === activeView)?.label}
            </h2>
          </>
        ) : (
          <h2 className="font-bold text-lg tracking-wide w-full text-center">Profile</h2>
        )}
      </div>

      <div className="w-full flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col gap-6 items-center"
            >
              {/* Menu Items */}
              <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                     <div className="flex items-center gap-3 text-bluepost-dark">
                        <div className="text-gray-400">{item.icon}</div>
                        <span className="font-bold text-sm">{item.label}</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>

              <button
                onClick={onLogout}
                className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-bold text-sm"
              >
                 <LogOut size={18} />
                 Log Out
              </button>
            </motion.div>
          )}

          {activeView === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col items-center"
            >
              <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-bluepost-dark mb-2">1. User Agreement</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    By using BluePost, you agree to these terms. BluePost acts solely as a booking platform for arranging shipments with third-party transport operators.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-bluepost-dark mb-2">2. Liability</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The physical transportation of goods is handled entirely by the selected carrier. BluePost is not liable for lost, delayed, or damaged goods during transit.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-bluepost-dark mb-2">3. Payment</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    All payments are final once a Payment ID is generated. Refunds must be requested directly at the carrier station prior to departure.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex-1 pt-12 pb-28 px-4 flex flex-col items-center"
            >
              <div className="w-full max-w-md flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-bluepost-primary text-white flex items-center justify-center font-bold text-2xl leading-none mb-4 shadow-md">
                  B
                </div>
                <h3 className="font-black text-2xl text-bluepost-dark tracking-tight">BluePost</h3>
                <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Version 1.0.0</span>

                <p className="text-gray-600 text-sm mt-8 max-w-xs leading-relaxed">
                  BluePost moves the logistics transaction to your phone. Arrange your shipment, pay digitally, and drop your goods off at the station with confidence.
                </p>
              </div>
            </motion.div>
          )}

          {activeView === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex-1 pt-6 pb-28 px-4 flex flex-col items-center gap-6"
            >
              <div className="w-full max-w-md">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Contact Us</h3>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center gap-4 w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-bluepost-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-bluepost-primary flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-bluepost-dark">Call Support</span>
                      <span className="text-xs text-gray-500">Available 8am - 6pm</span>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-bluepost-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-bluepost-dark">WhatsApp</span>
                      <span className="text-xs text-gray-500">Chat with an agent</span>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-bluepost-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm text-bluepost-dark">Email</span>
                      <span className="text-xs text-gray-500">support@bluepost.com</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="w-full max-w-md">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Frequently Asked Questions</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-bluepost-dark mb-1">Where do I drop my package?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Take your package and your Payment ID to the station of the carrier you selected during checkout.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-bluepost-dark mb-1">How is the price calculated?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Pricing is determined directly by the carriers based on the route distance and the estimated weight of your goods.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
