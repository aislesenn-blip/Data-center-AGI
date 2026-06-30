"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Network", href: "/network" },
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Company", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center shadow-md group-hover:bg-[#2563EB] transition-colors">
                  <Globe className="text-white w-5 h-5" />
               </div>
               <span className="text-xl font-bold text-[#0F172A] tracking-tight">Ovation DOOH</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-gray-600 hover:text-[#1E3A8A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
             <Link href="/contact" className="text-[15px] font-medium text-[#1E3A8A] hover:text-[#2563EB] transition-colors">
                Contact Sales
             </Link>
             <Link href="/contact" className="bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors shadow-sm flex items-center gap-2">
                Launch Campaign
             </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-3">
                 <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full text-center text-[15px] font-medium text-[#1E3A8A] py-2 border border-[#1E3A8A]/20 rounded-lg">
                    Contact Sales
                 </Link>
                 <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full text-center bg-[#1E3A8A] text-white py-2.5 rounded-lg text-[15px] font-medium shadow-sm">
                    Launch Campaign
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}