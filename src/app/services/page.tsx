import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Settings, Zap, LineChart, Cpu } from "lucide-react";

export default function ServicesPage() {
  const solutions = [
    { title: "Mobility Programmatic (pDOOH)", desc: "Buy moving digital media with the same precision as online advertising. Integrate seamlessly with major SSPs to target rickshaw passengers in real-time.", icon: <Cpu className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Geo-Fenced Dynamic Creative", desc: "Serve contextually relevant ads triggered by the exact location of the rickshaw—change messaging as the vehicle enters different neighborhoods or commercial zones.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Managed Fleet Campaigns", desc: "End-to-end campaign management for enterprise clients, handling everything from creative adaptation for in-vehicle screens to execution and final reporting.", icon: <Settings className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Passenger Attribution & Measurement", desc: "Measure the real-world impact of your campaigns by linking ride data, route mapping, and subsequent passenger actions.", icon: <LineChart className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Smart solutions for <span className="text-[#1E3A8A]">moving audiences.</span></>}
        subtitle="Go beyond static broadcasting. Leverage our mobility AdTech solutions to deliver dynamic, location-based, and highly measurable advertising directly to passengers."
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
