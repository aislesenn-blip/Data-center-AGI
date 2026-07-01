import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Settings, Zap, LineChart, Cpu } from "lucide-react";

export default function ServicesPage() {
  const solutions = [
    { title: "Programmatic DOOH (pDOOH)", desc: "Buy out-of-home media with the same precision and flexibility as digital online advertising. Integrate with major SSPs/DSPs.", icon: <Cpu className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Dynamic Creative Optimization", desc: "Serve contextually relevant ads triggered by real-time data such as weather, traffic conditions, or live sports scores.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Managed Campaign Services", desc: "End-to-end campaign management for enterprise clients, from media planning to execution and final reporting.", icon: <Settings className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Attribution & Measurement", desc: "Measure the real-world impact of your campaigns with footfall attribution and mobile retargeting integrations.", icon: <LineChart className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Smart solutions for <span className="text-[#1E3A8A]">complex campaigns.</span></>}
        subtitle="Go beyond basic broadcasting. Leverage our technological solutions to deliver dynamic, data-driven, and highly measurable advertising."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((sol, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1}>
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                 {sol.icon}
               </div>
               <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{sol.title}</h3>
               <p className="text-gray-600 leading-relaxed">{sol.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}