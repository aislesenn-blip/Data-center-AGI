import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { MapPin, Activity, Shield, BarChart3 } from "lucide-react";

export default function NetworkPage() {
  const metrics = [
    { label: "Total Digital Screens", value: "542", desc: "Strategically placed high-def displays." },
    { label: "Weekly Reach", value: "28M+", desc: "Unique individuals exposed to our network." },
    { label: "Uptime Guarantee", value: "99.9%", desc: "Enterprise-grade reliability and maintenance." },
    { label: "Programmatic Readiness", value: "100%", desc: "Every screen is SSP integrated." },
  ];

  return (
    <>
      <Hero
        title={<>A network built for <span className="text-[#1E3A8A]">scale.</span></>}
        subtitle="Our expansive digital screen network is engineered to deliver maximum audience reach with absolute precision. Explore our coverage and technical capabilities."
        primaryCta={{ text: "Download Coverage Map", href: "/contact" }}
        imageSrc="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
      />

      <Section bg="gray" className="border-t border-gray-100">
        <SectionHeader
          title="Network Intelligence"
          subtitle="We don't just build screens; we build data-driven media endpoints."
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
             <AnimatedCard key={i} delay={i*0.1}>
                <h3 className="text-4xl font-black text-[#1E3A8A] mb-2">{m.value}</h3>
                <p className="font-bold text-[#0F172A] mb-1">{m.label}</p>
                <p className="text-sm text-gray-500">{m.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Technology that guarantees delivery."
              subtitle="Our hardware and software stack is built to meet the rigorous demands of global enterprise advertisers."
            />
            <div className="space-y-8">
              {[
                { icon: <Shield className="w-6 h-6 text-[#2563EB]" />, title: "Brand Safety & Verification", desc: "Independent third-party verification ensures your ads play exactly when and where they should." },
                { icon: <Activity className="w-6 h-6 text-[#2563EB]" />, title: "Real-time Diagnostics", desc: "24/7 proactive monitoring of all screens ensuring maximum uptime and immediate maintenance dispatch." },
                { icon: <BarChart3 className="w-6 h-6 text-[#2563EB]" />, title: "Advanced Audience Measurement", desc: "Integration with top mobile location data providers to deliver accurate impression multipliers and audience profiles." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0F172A] rounded-2xl p-8 shadow-2xl">
             <div className="aspect-[4/5] bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-700">
                {/* Simulated Data Map Visualization */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                <div className="text-center relative z-10">
                   <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-80" />
                   <p className="text-white font-medium text-lg">Interactive Coverage Map</p>
                   <p className="text-gray-400 text-sm mt-2">Available in client portal</p>
                </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}