import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Globe, Users, Zap, Building } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Mobility First", desc: "Building infrastructure specifically designed for the unique dynamics of emerging market transit.", icon: <Globe className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Technological Edge", desc: "Pioneering IoT and data-driven ad delivery within auto-rickshaw networks.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Urban Integration", desc: "Enhancing cityscapes while providing brands unparalleled street-level visibility.", icon: <Building className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Partnership First", desc: "Fostering deep relationships with fleet owners, drivers, and advertising agencies.", icon: <Users className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Shaping the future of <span className="text-[#1E3A8A]">mobility media.</span></>}
        subtitle="We are an innovative AdTech company redefining urban advertising. By transforming auto-rickshaws into connected digital endpoints, we connect global brands with dynamic audiences."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-full aspect-square md:aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200">
               {/* Placeholder for corporate/team image */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">Team/Context Image</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader
              title="A vision for the modern cityscape."
              subtitle="Founded on the belief that transit advertising should be as accountable, dynamic, and data-driven as online media, [Company Name] is rewriting the rules of engagement."
            />
            <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
              <p>
                As the media landscape fragments and consumers experience digital fatigue, the physical world remains the ultimate unblockable canvas. We provide brands with a trusted platform to deliver high-impact messaging exactly where people live, work, and commute.
              </p>
              <p>
                Starting with our pioneering network of connected auto-rickshaw screens, we are building a vast, scalable hardware and software ecosystem. We are not just selling ad space; we are building smart city infrastructure.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeader
          title="Talent Density"
          subtitle="We're a melting-pot of global futurists, engineers, and media experts."
          align="center"
        />
        <div className="max-w-4xl mx-auto text-center">
           <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600 font-medium">
             Our team brings together experience from world-class technology and finance organizations. We come from <span className="font-bold text-[#0F172A]">Google, Salesforce, Deloitte, Safaricom, Cellulant, and top-tier global advertising agencies.</span> This concentration of talent ensures our infrastructure meets the highest international standards.
           </p>
        </div>
      </Section>

      <Section bg="dark">
        <SectionHeader
          title="Our Core Values"
          subtitle="The principles guiding our engineering and operations."
          align="center"
          light={true}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                {val.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{val.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
