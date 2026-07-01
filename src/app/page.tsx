"use client";

import { Section } from "@/components/ui/Section";
import { TextRotator } from "@/components/ui/TextRotator";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Target, TrendingUp, MonitorPlay, ArrowRight, ShieldCheck, Map, Activity, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  const tabs = [
    {
      id: "infrastructure",
      label: "Transit Infrastructure",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">The digital layer of public mobility.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">We provide the hardware and connectivity infrastructure required to turn millions of daily commutes into premium, distraction-free digital environments.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><MonitorPlay className="w-5 h-5 text-[#1E3A8A]"/> Interactive Transit Screens</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Globe className="w-5 h-5 text-[#1E3A8A]"/> Always-On Connectivity</li>
             </ul>
          </div>
          <div className="flex-1 w-full relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <img src="https://images.unsplash.com/photo-1593950315186-76a92975b60c?auto=format&fit=crop&q=80&w=800" alt="Screen Delivery" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      )
    },
    {
      id: "commerce",
      label: "Urban Commerce",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Frictionless engagement on the move.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">Transform passenger attention into high-value interactions. Our platform allows banks, fintechs, and retail brands to deploy commerce and service applications directly to commuters.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Target className="w-5 h-5 text-[#1E3A8A]"/> Direct Passenger Engagement</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Activity className="w-5 h-5 text-[#1E3A8A]"/> API-Driven Deployments</li>
             </ul>
          </div>
          <div className="flex-1 w-full relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" alt="Commerce API" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      )
    },
    {
      id: "intelligence",
      label: "City Intelligence",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Data-driven routing and attribution.</h3>
             <p className="text-gray-600 mb-6 leading-relaxed">Leverage geo-fencing and real-time mapping to trigger contextual services and advertisements, providing granular footfall and passenger attribution.</p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><Map className="w-5 h-5 text-[#1E3A8A]"/> Route & Geospatial Mapping</li>
               <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><TrendingUp className="w-5 h-5 text-[#1E3A8A]"/> Real-Time Analytics Dashboard</li>
             </ul>
          </div>
          <div className="flex-1 w-full relative aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Interface" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* 1. Hero Viewport */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-[5rem] font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-8"
          >
            We are building the <br className="hidden md:block"/>
            <span className="text-[#1E3A8A]">
              <TextRotator
                phrases={["operating system", "commerce layer", "digital infrastructure"]}
                interval={4000}
              />
            </span>
            <br/>for the modern city.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed"
          >
            [Company Name] connects mobility, commerce, and global brands through a network of premium interactive transit screens. We are transforming passenger attention into a high-value interaction layer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="bg-[#1E3A8A] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2563EB] transition-colors shadow-lg flex items-center justify-center gap-2 group">
              Partner With Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="bg-white border-2 border-gray-200 text-[#0F172A] px-8 py-4 rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
              Explore the Platform
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Bento Grid & Social Proof */}
      <section className="px-6 sm:px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto">
         <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden mb-20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" alt="Urban Mobility Context" className="w-full h-full object-cover" />

            {/* Overlay Text Area */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl max-w-sm shadow-xl">
               <h3 className="text-xl font-bold text-[#0F172A] mb-2">Deploy at scale</h3>
               <p className="text-gray-600 text-sm mb-4">Telecoms, fintechs, and service providers use our API to reach passengers instantly.</p>
               <Link href="/services" className="text-sm font-bold text-[#1E3A8A] flex items-center gap-1 group">
                 View Enterprise Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         </div>

         {/* Social Proof */}
         <div className="text-center">
           <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-12">Trusted by global leaders in finance, telecom, and mobility</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {["Global Bank", "Leading Telecom", "Fintech Unicorn", "Retail Giant"].map((brand, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-xl md:text-2xl text-[#0F172A]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400"></div>
                  {brand}
                </div>
             ))}
           </div>
         </div>
      </section>

      {/* 3. Segmented Controls / Platform Flow */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6 leading-tight">
              A comprehensive <span className="text-[#1E3A8A]">technology platform</span> for the physical world.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              We provide the hardware, connectivity, and software APIs necessary for enterprises to build and deploy experiences within urban transit networks.
            </p>
          </div>

          <SegmentedControl tabs={tabs} />
        </div>
      </section>

      {/* 4. About Us / Dark Card */}
      <section className="bg-[#F8FAFC] py-32 px-6 sm:px-8 lg:px-12">
         <div className="max-w-[1400px] mx-auto">
            <div className="bg-[#0F172A] rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">

               <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                 <div className="w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
               </div>

               <div className="relative z-10 flex-1">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                   Ready to deploy on the <br className="hidden lg:block"/><span className="text-[#3B82F6]">city&apos;s operating system?</span>
                 </h2>
                 <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
                   Partner with [Company Name] to integrate your digital services into our premium transit network. Build brand presence, acquire users, and drive real-world transactions.
                 </p>
                 <Link href="/contact" className="inline-flex items-center justify-center bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors gap-2 group">
                   Contact Enterprise Sales
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>

               <div className="relative z-10 w-full md:w-auto">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center">
                        <p className="text-4xl font-bold text-white mb-1">500+</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Connected Nodes</p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center">
                        <p className="text-4xl font-bold text-white mb-1">100%</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">API Driven</p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
    </div>
  );
}
