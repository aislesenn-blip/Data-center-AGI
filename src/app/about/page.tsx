import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Globe, Users, Zap, Building } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Infrastructure First", desc: "Building the digital backbone that transforms analog public transport into a connected ecosystem.", icon: <Building className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Technological Edge", desc: "Pioneering API-driven commerce solutions across emerging mobility networks.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Urban Integration", desc: "Enhancing the passenger experience by seamlessly integrating digital services into their daily commute.", icon: <Globe className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Ecosystem Partnerships", desc: "Fostering deep, strategic relationships with governments, telecoms, and financial institutions.", icon: <Users className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Engineering the <span className="text-[#1E3A8A]">operating system</span> for tomorrow&apos;s cities.</>}
        subtitle="We are a technology infrastructure company building the digital layer for modern mobility. We connect commerce, services, and global brands through a network of premium interactive transit screens."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1542204637-e67bc7d41e48?auto=format&fit=crop&q=80&w=1200" alt="Mobility Tech Innovation" className="rounded-3xl shadow-xl aspect-[4/5] object-cover" />
          </div>
          <div>
            <SectionHeader
              title="A vision beyond advertising."
              subtitle="Founded on the belief that public transport should be a premium digital environment, we are rewriting the rules of urban engagement by turning millions of daily commutes into a high-value interaction layer."
            />
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                As cities grow and the digital economy expands, the physical commute remains an untapped frontier. We provide the technology infrastructure—hardware, connectivity, and APIs—that allows banks, fintechs, service providers, and brands to reach people directly during transit.
              </p>
              <p>
                Our network of connected digital screens acts as the platform upon which other companies can deploy their services, enabling the future of urban commerce and building a smarter, more connected city ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-2">2024</p>
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Year Founded</p>
               </div>
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-2">500+</p>
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Active Digital Nodes</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeader
          title="Our Core Values"
          subtitle="The principles that guide our engineering, business development, and operations teams as we build the premier urban operating system."
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{val.title}</h3>
              <p className="text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
