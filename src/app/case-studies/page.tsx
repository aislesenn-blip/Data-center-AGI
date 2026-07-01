import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const cases = [
    { brand: "FMCG Brand", metric: "+42%", result: "Sales Lift in Geofenced Areas", desc: "Using dynamic creative to trigger specific product ads as rickshaws entered key retail neighborhoods.", image: "https://images.unsplash.com/photo-1600320254374-ce2d293c324e?auto=format&fit=crop&q=80&w=800" },
    { brand: "Telecom Provider", metric: "2.1M", result: "Verified Passenger Impressions", desc: "A two-week full fleet domination campaign to launch a new data package to daily commuters.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
    { brand: "Fintech App", metric: "3x", result: "Increase in App Installs", desc: "Combining in-rickshaw QR codes and screen ads to capture a highly captive, distraction-free audience.", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <>
      <Hero
        title={<>Impact you can <span className="text-[#1E3A8A]">measure.</span></>}
        subtitle="Explore how top-tier brands use our mobility network to drive real-world business outcomes."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((study, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="overflow-hidden p-0">
                <div className="h-48 overflow-hidden relative">
                   <img src={study.image} alt={study.brand} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-[#0F172A] mb-1">{study.brand}</h3>
                   <p className="text-gray-500 mb-6 text-sm">{study.desc}</p>
                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div>
                         <p className="text-2xl font-black text-[#1E3A8A]">{study.metric}</p>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{study.result}</p>
                      </div>
                   </div>
                   <Link href="/contact" className="text-[#1E3A8A] font-medium hover:text-[#2563EB] flex items-center gap-2 transition-colors">
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
