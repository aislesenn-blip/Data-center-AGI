import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Globe, Users, Zap, Car } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Mobility Focus", desc: "Building the infrastructure that transforms everyday auto-rickshaws into digital media assets.", icon: <Car className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Technological Edge", desc: "Pioneering data-driven AdTech solutions across emerging mobility markets.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Urban Integration", desc: "Enhancing the passenger experience while providing brands unprecedented, distraction-free visibility.", icon: <Globe className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Partnership First", desc: "Fostering deep relationships with agencies, brands, and fleet operators.", icon: <Users className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Engineering the future of <span className="text-[#1E3A8A]">mobility advertising.</span></>}
        subtitle="We are an innovative AdTech company building the first digital advertising network powered by auto-rickshaws. We connect global brands with high-value audiences on the move."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1542204637-e67bc7d41e48?auto=format&fit=crop&q=80&w=1200" alt="Mobility Tech Innovation" className="rounded-2xl shadow-xl aspect-[4/5] object-cover" />
          </div>
          <div>
            <SectionHeader
              title="A vision for moving media."
              subtitle="Founded on the belief that advertising should integrate seamlessly with daily urban life, we are rewriting the rules of engagement by turning millions of daily commutes into premium digital experiences."
            />
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                As traditional advertising channels become saturated and consumers experience digital fatigue, the daily commute remains a highly engaging, distraction-free window. We provide brands with a technology platform to deliver high-impact messaging directly inside auto-rickshaws.
              </p>
              <p>
                Our network of connected digital screens is engineered for mobility, ensuring that your message reaches passengers exactly where they are, utilizing real-time location data to make every impression count.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
               <div>
                 <p className="text-4xl font-bold text-[#0F172A] mb-2">2024</p>
                 <p className="text-sm font-medium text-gray-500 uppercase">Year Founded</p>
               </div>
               <div>
                 <p className="text-4xl font-bold text-[#0F172A] mb-2">500+</p>
                 <p className="text-sm font-medium text-gray-500 uppercase">Connected Vehicles</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeader
          title="Our Core Values"
          subtitle="The principles that guide our engineering, sales, and operations teams as we build the premier mobility media network."
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
