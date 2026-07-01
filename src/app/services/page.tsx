import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Settings, Zap, LineChart, Server } from "lucide-react";

export default function ServicesPage() {
  const solutions = [
    { title: "Enterprise Application Deployment", desc: "For banks, telecoms, and service providers. Deploy your digital services and applications securely across our transit network OS, reaching users directly during their commute.", icon: <Server className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Geo-Fenced Commerce API", desc: "Serve contextually relevant services triggered by the exact location of the transit node—change offerings as the vehicle enters different financial districts or retail zones.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Managed Ecosystem Integration", desc: "End-to-end technical integration for government institutions and enterprise partners, from API adaptation for in-vehicle screens to execution and secure reporting.", icon: <Settings className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Data & Mobility Attribution", desc: "Measure the real-world impact of your deployments by linking geospatial mobility data, route mapping, and subsequent passenger engagement metrics.", icon: <LineChart className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Enterprise solutions for <span className="text-[#1E3A8A]">the modern city.</span></>}
        subtitle="Go beyond traditional advertising. Leverage our mobility OS to deploy secure, dynamic, location-based digital services and commerce applications directly to passengers."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((sol, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1}>
               <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 {sol.icon}
               </div>
               <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{sol.title}</h3>
               <p className="text-gray-600 text-lg leading-relaxed">{sol.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>
    </>
  );
}
