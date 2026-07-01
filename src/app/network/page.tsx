import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { MapPin, Activity, Shield, BarChart3 } from "lucide-react";

export default function NetworkPage() {
  const metrics = [
    { label: "Active Infrastructure Nodes", value: "500+", desc: "High-definition interactive displays moving through the city daily." },
    { label: "Weekly Commerce Interactions", value: "1.2M+", desc: "Captive passenger audience engaged during their commute." },
    { label: "Average Session Dwell Time", value: "18 Min", desc: "Uninterrupted attention span per connected passenger ride." },
    { label: "Urban Penetration", value: "100%", desc: "Reaching deep into commercial zones and financial districts." },
  ];

  return (
    <>
      <Hero
        title={<>Infrastructure built for <span className="text-[#1E3A8A]">urban connectivity.</span></>}
        subtitle="Our expansive fleet of interactive transit screens serves as the physical layer of our operating system, delivering enterprise services directly into the heart of the community."
        primaryCta={{ text: "Download Network Specs", href: "/contact" }}
        imageSrc="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
      />

      <Section bg="gray" className="border-t border-gray-100">
        <SectionHeader
          title="Network Intelligence"
          subtitle="We don't just deploy screens; we build a data-driven mobility commerce endpoint."
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
             <AnimatedCard key={i} delay={i*0.1}>
                <h3 className="text-4xl font-black text-[#1E3A8A] mb-2">{m.value}</h3>
                <p className="font-bold text-[#0F172A] mb-1">{m.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Technology that guarantees delivery."
              subtitle="Our hardware and software stack is built to withstand the rigors of mobility while delivering enterprise-grade reporting and secure commerce transactions."
            />
            <div className="space-y-8">
              {[
                { icon: <Shield className="w-6 h-6 text-[#2563EB]" />, title: "Bank-Grade Security & Verification", desc: "Encrypted, independent GPS-verified playback ensures your services deploy exactly when and where they should." },
                { icon: <Activity className="w-6 h-6 text-[#2563EB]" />, title: "Real-time Node Diagnostics", desc: "24/7 proactive monitoring of all infrastructure nodes ensuring maximum uptime and immediate maintenance dispatch." },
                { icon: <BarChart3 className="w-6 h-6 text-[#2563EB]" />, title: "Geospatial Data Processing", desc: "Integration with mobility routing algorithms to map exact vectors and deliver accurate passenger profiles to our API partners." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0F172A] rounded-[2rem] p-8 shadow-2xl">
             <div className="aspect-[4/5] bg-gray-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-700 backdrop-blur-sm">
                {/* Simulated Data Map Visualization */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                <div className="text-center relative z-10">
                   <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-90" />
                   <p className="text-white font-medium text-lg">Interactive Infrastructure Map</p>
                   <p className="text-gray-400 text-sm mt-2">Live node tracking in enterprise portal</p>
                </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
