import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Globe, Users, Zap, Building } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Global Ambition", desc: "Building infrastructure that meets and exceeds international standards.", icon: <Globe className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Technological Edge", desc: "Pioneering data-driven DOOH solutions across emerging markets.", icon: <Zap className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Urban Integration", desc: "Enhancing cityscapes while providing brands unparalleled visibility.", icon: <Building className="w-6 h-6 text-[#1E3A8A]" /> },
    { title: "Partnership First", desc: "Fostering deep relationships with agencies, brands, and real estate owners.", icon: <Users className="w-6 h-6 text-[#1E3A8A]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Shaping the future of <span className="text-[#1E3A8A]">urban media.</span></>}
        subtitle="We are Africa's premier digital out-of-home advertising network. Our mission is to build the digital infrastructure that connects global brands with the continent's most dynamic urban audiences."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" alt="Corporate Headquarters" className="rounded-2xl shadow-xl aspect-[4/5] object-cover" />
          </div>
          <div>
            <SectionHeader
              title="A vision for the modern cityscape."
              subtitle="Founded on the belief that outdoor advertising should be as accountable, dynamic, and beautiful as digital media, Ovation DOOH is rewriting the rules of engagement in the physical world."
            />
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                As the media landscape fragments and consumers experience digital fatigue, the physical world remains the ultimate unblockable canvas. We provide brands with a trusted platform to deliver high-impact, brand-safe messaging at scale.
              </p>
              <p>
                Our network of premium digital screens is strategically located in high-dwell, high-traffic environments, ensuring that your message is seen by the right people, at the right time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
               <div>
                 <p className="text-4xl font-bold text-[#0F172A] mb-2">2023</p>
                 <p className="text-sm font-medium text-gray-500 uppercase">Year Founded</p>
               </div>
               <div>
                 <p className="text-4xl font-bold text-[#0F172A] mb-2">15+</p>
                 <p className="text-sm font-medium text-gray-500 uppercase">Major Cities</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeader
          title="Our Core Values"
          subtitle="The principles that guide our engineering, sales, and operations teams as we build the premier media network."
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