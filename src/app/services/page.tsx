import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Settings, Zap, LineChart, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const solutions = [
    { title: "Programmatic Transit (pDOOH)", desc: "Buy mobility media with the same precision and flexibility as digital online advertising. API integrations available for large agencies.", icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Dynamic Creative Optimization", desc: "Serve contextually relevant ads triggered by real-time location data, time of day, or weather conditions in specific neighborhoods.", icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Managed Campaign Services", desc: "End-to-end campaign management for enterprise clients, from media planning and route selection to execution and final reporting.", icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Attribution & Measurement", desc: "Measure the real-world impact of your campaigns with robust playout logs and location-based impression multipliers.", icon: <LineChart className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Smart solutions for <span className="text-[#1E3A8A]">mobility media.</span></>}
        subtitle="Go beyond basic broadcasting. Leverage our technological solutions to deliver dynamic, data-driven, and highly measurable advertising across the city."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {solutions.map((sol, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="p-6 sm:p-8 flex flex-col h-full">
               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                 {sol.icon}
               </div>
               <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">{sol.title}</h3>
               <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">{sol.desc}</p>
             </AnimatedCard>
          ))}
        </div>
        <div className="mt-12 text-center">
           <Link href="/contact" className="inline-flex items-center text-[#1E3A8A] font-bold hover:text-[#2563EB] transition-colors gap-2 text-[17px] touch-manipulation py-3 px-4">
              Discuss a custom integration <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </Section>
    </>
  );
}
