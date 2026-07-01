import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { MapPin, Activity, Shield, BarChart3 } from "lucide-react";

export default function NetworkPage() {
  const metrics = [
    { label: "Active Rickshaw Screens", value: "500+", desc: "High-definition displays moving through the city daily." },
    { label: "Weekly Passengers Reach", value: "1.2M+", desc: "Captive audience exposed to our network during their commute." },
    { label: "Average Dwell Time", value: "18 Min", desc: "Uninterrupted attention span per passenger ride." },
    { label: "City-wide Coverage", value: "100%", desc: "Reaching deep into neighborhoods and commercial zones." },
  ];

  return (
    <>
      <Hero
        title={<>A mobility network built for <span className="text-[#1E3A8A]">urban penetration.</span></>}
        subtitle="Our expansive fleet of digital screens inside auto-rickshaws goes where static billboards can't, delivering your message directly into the heart of the community."
        primaryCta={{ text: "Download Coverage Map", href: "/contact" }}
        imageSrc="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" // Generic map/city mobility image
      />

      <Section bg="gray" className="border-t border-gray-100">
        <SectionHeader
          title="Network Intelligence"
          subtitle="We don't just put screens in vehicles; we build a data-driven mobility media endpoint."
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
              subtitle="Our hardware and software stack is built to withstand the rigors of mobility while delivering enterprise-grade reporting."
            />
            <div className="space-y-8">
              {[
                { icon: <Shield className="w-6 h-6 text-[#2563EB]" />, title: "Brand Safety & Verification", desc: "Independent GPS-verified playback ensures your ads play exactly when and where they should." },
                { icon: <Activity className="w-6 h-6 text-[#2563EB]" />, title: "Real-time Diagnostics", desc: "24/7 proactive monitoring of all screens ensuring maximum uptime and immediate maintenance dispatch for our fleet." },
                { icon: <BarChart3 className="w-6 h-6 text-[#2563EB]" />, title: "Route-Based Measurement", desc: "Integration with mobility data to map exact routes and deliver accurate passenger profiles." }
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
                   <p className="text-white font-medium text-lg">Interactive Mobility Coverage</p>
                   <p className="text-gray-400 text-sm mt-2">Live vehicle tracking in client portal</p>
                </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
