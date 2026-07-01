"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Network", href: "/network" },
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Company", href: "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-2" : "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group touch-manipulation">
               <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-md group-hover:bg-[#2563EB] transition-colors">
                  <Globe className="text-white w-5 h-5" />
               </div>
               <span className="text-xl font-black text-[#0F172A] tracking-tight">[Company Name]</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-bold text-gray-600 hover:text-[#1E3A8A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-6">
             <Link href="/contact" className="text-[15px] font-bold text-[#1E3A8A] hover:text-[#2563EB] transition-colors">
                Contact Sales
             </Link>
             <Link href="/contact" className="bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-xl text-[15px] font-bold transition-all shadow-md shadow-blue-900/10 flex items-center gap-2">
                Launch Campaign
             </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#0F172A] p-2 -mr-2 touch-manipulation rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="lg:hidden bg-white fixed top-[72px] left-0 right-0 bottom-0 overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col h-full max-w-sm mx-auto">
              <div className="space-y-2 flex-grow">
                {links.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 text-2xl font-bold text-[#0F172A] hover:text-[#2563EB] border-b border-gray-100 flex items-center justify-between"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      <ChevronRight className="w-6 h-6 text-gray-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8 pb-32 flex flex-col gap-4"
              >
                 <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full text-center text-lg font-bold text-[#1E3A8A] py-4 rounded-xl bg-blue-50 border border-blue-100 touch-manipulation">
                    Contact Sales
                 </Link>
                 <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full text-center bg-[#1E3A8A] text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20 touch-manipulation">
                    Launch Campaign
                 </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
