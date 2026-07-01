"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  imageSrc?: string;
  align?: "left" | "center";
}

export function Hero({ title, subtitle, primaryCta, secondaryCta, imageSrc, align = "left" }: HeroProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAFC] to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-8 items-center ${align === "center" ? "text-center lg:flex-col" : ""}`}>

          <div className={`flex-1 ${align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-4 sm:mb-6"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className={`flex flex-col sm:flex-row gap-4 ${align === "center" ? "justify-center" : ""}`}
              >
                {primaryCta && (
                  <Link href={primaryCta.href} className="bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group text-lg">
                    {primaryCta.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="bg-white hover:bg-gray-50 text-[#0F172A] border border-gray-200 px-8 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center text-lg">
                    {secondaryCta.text}
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {imageSrc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className={`flex-1 w-full ${align === "center" ? "mt-12" : ""}`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] lg:aspect-[3/2] bg-gray-100">
                <img src={imageSrc} alt="DOOH Network Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}