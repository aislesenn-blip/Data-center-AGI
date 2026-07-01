import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShieldCheck, Award, TrendingUp, Cpu, MonitorSmartphone } from "lucide-react";

export default function WhyUsPage() {
  const reasons = [
    { title: "Premium Transit Inventory", desc: "We don't do low-quality placements. Every screen is high-definition, meticulously maintained, and situated inside premium auto-rickshaws.", icon: <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Absolute Transparency", desc: "No black boxes. You see exactly where and when your ads played with verified proof-of-play reports and route maps.", icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Data-Led Approach", desc: "We leverage location data to ensure you are buying audiences and context, not just static inventory.", icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Hardware Resilience", desc: "Our custom enclosures and IoT systems are built to withstand the physical demands of continuous urban transit.", icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
    { title: "Dynamic Capabilities", desc: "Update campaigns instantly over-the-air, reacting to market conditions faster than traditional OOH allows.", icon: <MonitorSmartphone className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Why choose <span className="text-[#1E3A8A]">[Company Name]?</span></>}
        subtitle="We are setting a new standard for mobility advertising. Here is why the world's most demanding brands partner with us to reach urban audiences."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="p-6 sm:p-8">
               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                 {reason.icon}
               </div>
               <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2 sm:mb-3">{reason.title}</h3>
               <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{reason.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}
