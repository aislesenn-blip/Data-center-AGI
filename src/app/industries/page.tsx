import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShoppingBag, Car, Stethoscope, Landmark } from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    { title: "Retail & FMCG", desc: "Drive footfall to retail locations and increase brand recall at the point of purchase.", icon: <ShoppingBag className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Automotive", desc: "Showcase the latest models in stunning high-definition on high-traffic commuter routes.", icon: <Car className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Healthcare", desc: "Deliver trusted, brand-safe messaging to communities across urban centers.", icon: <Stethoscope className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Financial Services", desc: "Build unshakeable trust and prestige through premium, large-format placements.", icon: <Landmark className="w-8 h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Tailored impact for <span className="text-[#1E3A8A]">every sector.</span></>}
        subtitle="Different industries have different objectives. See how our DOOH network drives specific KPIs across various vertical markets."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="text-center">
               <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 {ind.icon}
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-3">{ind.title}</h3>
               <p className="text-gray-600">{ind.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}