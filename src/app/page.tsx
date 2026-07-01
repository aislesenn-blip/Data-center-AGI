"use client";

import { Section } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Target, TrendingUp, MonitorPlay, ArrowRight, ShieldCheck, Map, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {

  const tabs = [
    {
      id: "procurement",
      label: "Target",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Target passengers by real-world movement.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">Leverage geo-fencing and route mapping to display ads only when auto-rickshaws enter specific high-value neighborhoods or commercial zones.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><ShieldCheck className="w-5 h-5 text-[#00C800]"/> 100% Verified Playback</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Map className="w-5 h-5 text-[#00C800]"/> Hyper-local Geofencing</li>
             </ul>
          </div>
          <div className="flex-1 relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Interface" className="opacity-80 rounded-xl max-w-[80%] max-h-[80%] object-cover shadow-2xl rotate-2" />
          </div>
        </div>
      )
    },
    {
      id: "inventory",
      label: "Deliver",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Captive, distraction-free environments.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">Unlike roadside billboards, our in-rickshaw screens offer an intimate, distraction-free environment where passengers engage for an average of 18 minutes.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><MonitorPlay className="w-5 h-5 text-[#00C800]"/> High Definition Screens</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Activity className="w-5 h-5 text-[#00C800]"/> Dynamic Creative Triggers</li>
             </ul>
          </div>
          <div className="flex-1 relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <img src="https://images.unsplash.com/photo-1593950315186-76a92975b60c?auto=format&fit=crop&q=80&w=800" alt="Screen Delivery" className="opacity-80 rounded-xl max-w-[80%] max-h-[80%] object-cover shadow-2xl -rotate-2" />
          </div>
        </div>
      )
    },
    {
      id: "financing",
      label: "Measure",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Real-time attribution and reporting.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">We provide granular, real-time reporting via our proprietary API. Track impressions, exact playback locations, and campaign lift with absolute transparency.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><TrendingUp className="w-5 h-5 text-[#00C800]"/> Live Campaign Dashboards</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Target className="w-5 h-5 text-[#00C800]"/> Footfall Attribution</li>
             </ul>
          </div>
          <div className="flex-1 relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Analytics Dashboard" className="opacity-80 rounded-xl max-w-[80%] max-h-[80%] object-cover shadow-2xl rotate-1" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">

      {/* 1. Hero Viewport */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-[#000000] tracking-tight leading-[1.1] mb-8">
            We&apos;re building a <br className="hidden md:block"/>
            <span className="text-[#00C800]">
              <TypewriterText
                phrases={["mobility ad network", "connected vehicle OS", "smarter transit experience"]}
                typingSpeed={70}
                deletingSpeed={30}
              />
            </span>
            <br/>for Africa&apos;s active space.
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] mb-10 max-w-2xl leading-relaxed">
            [Company Name] brings visibility & structure to urban advertising by providing <strong>geo-fenced, dynamic digital screens</strong> inside auto-rickshaws for targeted mass media campaigns.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-[#00C800] text-white px-8 py-4 rounded-full font-medium text-lg shadow-sm hover:shadow-md transition-all"
          >
            Learn more
          </motion.button>
        </div>
      </section>

      {/* 2. Bento Grid & Social Proof */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
         <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" alt="Rickshaw Mobility Context" className="w-full h-full object-cover" />

            {/* Overlay Text Area (Financing equivalent) */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl max-w-sm shadow-xl">
               <h3 className="text-xl font-bold text-black mb-2">Engage audiences on the move</h3>
               <p className="text-gray-600 text-sm mb-4">Target passengers in distraction-free environments with our connected fleet.</p>
               <span className="text-xs font-bold text-[#00C800] uppercase tracking-wide">Programmatic API Live*</span>
            </div>

            {/* Floating Interaction Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-6 right-6 md:top-12 md:right-12 bg-white p-6 rounded-2xl shadow-xl w-64 border border-gray-100 hidden sm:block"
            >
               <h4 className="font-bold text-black mb-1">Track your campaign</h4>
               <p className="text-xs text-gray-500 mb-4">Know exactly where your ads are playing across the city, in real-time.</p>
               <div className="flex justify-end gap-2">
                 <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <ArrowRight className="w-4 h-4 text-black rotate-180" />
                 </button>
                 <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <ArrowRight className="w-4 h-4 text-black" />
                 </button>
               </div>
            </motion.div>
         </div>

         {/* Social Proof */}
         <div className="text-center">
           <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Trusted by exceptional businesses</p>
           <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-2 font-bold text-xl text-[#0F172A]">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  Brand {i}
                </div>
             ))}
           </div>
         </div>
      </section>

      {/* 3. Segmented Controls / Platform Flow */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
              <span className="text-[#00C800]">Unifying</span> & <span className="text-[#00C800]">scaling</span> the mobility ad network.
            </h2>
            <p className="text-lg text-gray-600">
              [Company Name]&apos;s software equips brands with comprehensive & real-time data to execute moving campaigns flawlessly.
            </p>
          </div>

          <SegmentedControl tabs={tabs} />
        </div>
      </section>

      {/* 4. About Us / Talent Density & Dark Card */}
      <section className="bg-[#F8F9FA] py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-3xl">
               <h2 className="text-4xl font-bold text-black mb-6">
                 We&apos;re a melting-pot of <span className="text-[#00C800]">global futurists.</span>
               </h2>
               <p className="text-xl text-[#4A4A4A] leading-relaxed">
                 Our team merges deep mobility expertise with world-class engineering. We come from global tech unicorns, top-tier automotive companies, and leading media agencies to build the infrastructure of tomorrow.
               </p>
            </div>

            <div className="bg-[#0F172A] rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
               {/* Subtle background geometry */}
               <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                 <div className="w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
               </div>

               <div className="relative z-10 max-w-2xl mx-auto">
                 <h3 className="text-3xl font-bold text-white mb-4">
                   Meet a few of the leading businesses <span className="text-[#00C800]">growing with [Company Name].</span>
                 </h3>
                 <p className="text-gray-400 mb-10">We partner with forward-thinking agencies and mobility platforms to execute world-class campaigns.</p>

                 <div className="flex flex-wrap justify-center gap-8 opacity-70">
                   {/* Dark mode friendly logos */}
                   {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-2 font-bold text-xl text-white">
                        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                        Partner {i}
                      </div>
                   ))}
                 </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
