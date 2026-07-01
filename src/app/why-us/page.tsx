import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShieldCheck, Award, TrendingUp } from "lucide-react";

export default function WhyUsPage() {
  const reasons = [
    { title: "Captive Audience", desc: "Unlike roadside billboards, our in-rickshaw screens offer an intimate, distraction-free environment where passengers engage for an average of 18 minutes.", icon: <Award className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Absolute Transparency", desc: "No black boxes. You see exactly where and when your ads played with verified GPS-backed proof-of-play reports.", icon: <ShieldCheck className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Data-Led Mobility", desc: "We leverage real-time location data and routing intelligence to ensure you are targeting audiences based on movement, not just static locations.", icon: <TrendingUp className="w-8 h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Why choose <span className="text-[#1E3A8A]">[Company Name]?</span></>}
        subtitle="We are setting a new standard for mobility advertising. Here is why forward-thinking brands partner with us to reach urban audiences."
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
