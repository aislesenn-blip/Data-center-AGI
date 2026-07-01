import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const cases = [
    { brand: "Global Beverage Co.", metric: "+42%", result: "Increase in Brand Recall", desc: "Using geo-fenced dynamic creative to trigger ads when rickshaws entered specific market zones.", image: "https://images.unsplash.com/photo-1600320254374-ce2d293c324e?auto=format&fit=crop&q=80&w=800" },
    { brand: "Fintech Startup", metric: "3x", result: "App Downloads", desc: "Combining in-transit DOOH with interactive QR codes to acquire high-value users on their commute.", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800" },
    { brand: "Telecom Provider", metric: "1.2M", result: "Verified Impressions", desc: "A two-week domination campaign across 200 connected auto-rickshaws for a new data plan launch.", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <>
      <Hero
        title={<>Impact you can <span className="text-[#1E3A8A]">measure.</span></>}
        subtitle="Explore how top-tier brands use our transit network to drive real-world business outcomes."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cases.map((study, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="overflow-hidden p-0 flex flex-col">
                <div className="h-40 sm:h-48 overflow-hidden relative bg-gray-200">
                   {/* Simulated image load */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Campaign Visual</div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                   <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">{study.brand}</h3>
                   <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed flex-grow">{study.desc}</p>
                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div>
                         <p className="text-3xl font-black text-[#1E3A8A] tracking-tight">{study.metric}</p>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{study.result}</p>
                      </div>
                   </div>
                   <Link href="/contact" className="text-[#1E3A8A] font-bold hover:text-[#2563EB] flex items-center gap-2 transition-colors touch-manipulation py-2">
                      Read full study <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}
