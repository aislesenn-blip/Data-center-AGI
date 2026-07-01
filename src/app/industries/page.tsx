import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShoppingBag, Landmark, Utensils, GraduationCap } from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    { title: "FMCG & Retail", desc: "Drive immediate footfall by triggering ads when vehicles enter specific commercial districts.", icon: <ShoppingBag className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Financial Services", desc: "Build trust and brand presence across diverse neighborhoods with targeted messaging.", icon: <Landmark className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Food & Beverage", desc: "Run time-of-day specific campaigns, such as lunch specials when vehicles are near office parks.", icon: <Utensils className="w-8 h-8 text-[#1E3A8A]" /> },
    { title: "Education", desc: "Target university campuses and surrounding student housing areas with high precision.", icon: <GraduationCap className="w-8 h-8 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Tailored impact for <span className="text-[#1E3A8A]">every sector.</span></>}
        subtitle="Different industries have different mobility objectives. See how our transit network drives specific KPIs across various vertical markets."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {industries.map((ind, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="text-center p-6 sm:p-8">
               <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                 {ind.icon}
               </div>
               <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2 sm:mb-3">{ind.title}</h3>
               <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{ind.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}
