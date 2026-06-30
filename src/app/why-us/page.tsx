import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShieldCheck, Award, TrendingUp } from "lucide-react";

export default function WhyUsPage() {
  const reasons = [
    { title: "Premium Inventory Only", desc: "We don't do low-quality placements. Every screen is high-definition, meticulously maintained, and situated in a prime location.", icon: <Award className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Absolute Transparency", desc: "No black boxes. You see exactly where and when your ads played with verified third-party proof-of-play reports.", icon: <ShieldCheck className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Data-Led Approach", desc: "We leverage mobility data and audience intelligence to ensure you are buying audiences, not just locations.", icon: <TrendingUp className="w-8 h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Why choose <span className="text-[#1E3A8A]">Ovation DOOH?</span></>}
        subtitle="We are setting a new standard for out-of-home advertising in Africa. Here is why the world's most demanding brands partner with us."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1}>
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 {reason.icon}
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-3">{reason.title}</h3>
               <p className="text-gray-600">{reason.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}