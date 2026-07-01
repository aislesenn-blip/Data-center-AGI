"use client";

import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { SegmentedControl, SegmentContent } from "@/components/ui/SegmentedControl";
import { MapPin, TrendingUp, MonitorSmartphone, CarFront, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState("Targeting");

  const bentoMetrics = [
    { value: "3.2M+", label: "Daily Impressions", icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
    { value: "450+", label: "Connected Rickshaws", icon: <CarFront className="w-5 h-5 text-green-600" /> },
    { value: "100%", label: "Verified Playouts", icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <>
      <Hero
        title={
          <>
            Building the future of <br className="hidden md:block" />
            <span className="text-green-600">
              <TypewriterText words={["mobility networks.", "transit advertising.", "hyper-local reach."]} />
            </span>
          </>
        }
        subtitle="We transform high-traffic urban mobility into powerful, data-driven advertising networks. Connect with audiences at eye-level through our expanding fleet of digital auto-rickshaw screens."
        primaryCta={{ text: "Explore the Fleet", href: "/network" }}
        secondaryCta={{ text: "View Solutions", href: "/services" }}
        imageNode={
          <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
             {/* Simulating a dynamic bento-style image composition */}
             <div className="absolute inset-0 bg-[#0F172A] p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-white text-xs sm:text-sm font-medium">Fleet Active</span>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-lg border border-white/20">
                      <MonitorSmartphone className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                   </div>
                </div>
                <div>
                   <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Dar es Salaam</h3>
                   <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">Real-time geo-targeted campaigns across major transit arteries.</p>
                   <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#0F172A] bg-gray-300"></div>
                      ))}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#0F172A] bg-gray-800 flex items-center justify-center text-white text-xs font-bold">+99</div>
                   </div>
                </div>
             </div>
          </div>
        }
      />

      {/* Trust & Scale - Mobile Optimized Bento */}
      <Section className="border-t border-gray-100" bg="white">
        <SectionHeader
          title="Data-driven impact at street level."
          subtitle="We equip brands with comprehensive visibility into campaign performance across our entire mobility network."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16">
           {bentoMetrics.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.1} className="relative overflow-hidden bg-gray-50 border-none group">
              <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                 {stat.icon}
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 sm:mb-6">
                  {stat.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] mb-1 sm:mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Section>

      {/* Feature Segmented Control */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={<span><span className="text-[#1E3A8A]">Unifying</span> & scaling your campaign management.</span>}
            subtitle="Manage your mobility transit campaigns with the precision of digital marketing."
            align="center"
          />

          <SegmentedControl
            tabs={["Targeting", "Measurement", "Creatives"]}
            activeTab={activeFeature}
            setActiveTab={setActiveFeature}
            className="mb-8 md:mb-12"
          />

          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-100 shadow-xl min-h-[400px]">
             <SegmentContent active={activeFeature === "Targeting"}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                        <MapPin className="text-[#1E3A8A] w-6 h-6" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">Location-Based Triggers</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">Trigger specific ad creatives when auto-rickshaws enter predefined geofenced zones. Serve university-focused ads near campuses, and FMCG ads near major markets.</p>
                      <ul className="space-y-3">
                         {["Custom Geofencing", "Route-based triggering", "Time-of-day parting"].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-[#0F172A] font-medium">
                              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
                      {/* Placeholder for map UI */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E3A8A] via-transparent to-transparent"></div>
                      <MapPin className="w-20 h-20 text-[#1E3A8A]/50 animate-bounce" />
                   </div>
                </div>
             </SegmentContent>

             <SegmentContent active={activeFeature === "Measurement"}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                        <TrendingUp className="text-[#1E3A8A] w-6 h-6" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">Verifiable Proof-of-Play</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">No more guessing. Access comprehensive dashboards showing exactly when, where, and how many times your ad was displayed across the fleet.</p>
                   </div>
                   <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center p-8">
                      <div className="w-full h-full border-b-2 border-l-2 border-gray-300 relative flex items-end justify-between p-4">
                         {[40, 70, 45, 90, 65].map((h, i) => (
                            <div key={i} style={{height: `${h}%`}} className="w-8 sm:w-12 bg-[#1E3A8A] rounded-t-sm"></div>
                         ))}
                      </div>
                   </div>
                </div>
             </SegmentContent>

             <SegmentContent active={activeFeature === "Creatives"}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                        <MonitorSmartphone className="text-[#1E3A8A] w-6 h-6" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">Dynamic Content Management</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">Update your creatives across the entire fleet instantly from our cloud dashboard. Support for full-motion video, HTML5, and static images.</p>
                   </div>
                </div>
             </SegmentContent>
          </div>
        </div>
      </Section>

      <Section bg="dark">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
           <div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Meet the brands growing with [Company Name].</h2>
             <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">From FMCG giants to fast-growing tech unicorns, industry leaders trust our mobility network to deliver unmissable street-level impact.</p>
             <Link href="/contact" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-[17px] transition-colors w-full sm:w-auto min-h-[56px] md:min-h-[48px] touch-manipulation">
                Start your campaign
             </Link>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                 <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 h-24 sm:h-32 rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <span className="text-gray-500 font-bold text-lg">Partner {i}</span>
                 </div>
              ))}
           </div>
        </div>
      </Section>
    </>
  );
}
