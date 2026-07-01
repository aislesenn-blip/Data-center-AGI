import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { MapPin, Activity, Shield, BarChart3, Navigation2 } from "lucide-react";

export default function NetworkPage() {
  const metrics = [
    { label: "Active Screens", value: "450+", desc: "Installed in premium auto-rickshaws." },
    { label: "Daily Rides", value: "12,000+", desc: "Captive audience sessions." },
    { label: "Uptime", value: "99.8%", desc: "Reliable IoT connectivity." },
    { label: "Data Points", value: "1.2M", desc: "Location pings processed daily." },
  ];

  return (
    <>
      <Hero
        title={<>A network in constant <span className="text-[#1E3A8A]">motion.</span></>}
        subtitle="Unlike static billboards, our network moves with the city. We cover deep residential zones, university campuses, and commercial hubs that traditional OOH cannot reach."
        primaryCta={{ text: "View Coverage Areas", href: "/contact" }}
      />

      <Section bg="gray" className="border-t border-gray-100">
        <SectionHeader
          title="Network Intelligence"
          subtitle="Every vehicle in our fleet acts as a data-gathering node, providing unprecedented insight into urban mobility."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {metrics.map((m, i) => (
             <AnimatedCard key={i} delay={i*0.1} className="p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] mb-1 sm:mb-2">{m.value}</h3>
                <p className="font-bold text-[#0F172A] mb-1 text-sm sm:text-base">{m.label}</p>
                <p className="text-xs sm:text-sm text-gray-500">{m.desc}</p>
             </AnimatedCard>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-[#0F172A] rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl w-full">
               <div className="aspect-square md:aspect-[4/3] lg:aspect-[4/5] bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-700">
                  {/* Simulated Data Map Visualization */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                  <div className="text-center relative z-10 p-4">
                     <Navigation2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-3 sm:mb-4 opacity-80 animate-pulse" />
                     <p className="text-white font-medium text-base sm:text-lg">Live Fleet Tracking</p>
                     <p className="text-gray-400 text-xs sm:text-sm mt-2">Internal dashboard preview</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader
              title="Technology that guarantees delivery."
              subtitle="Our hardware and software stack is built to withstand the rigors of transit while delivering enterprise-grade reporting."
            />
            <div className="space-y-6 sm:space-y-8 mt-8">
              {[
                { icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />, title: "Brand Safety & Verification", desc: "Independent third-party verification ensures your ads play exactly when and where they should." },
                { icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />, title: "Real-time Diagnostics", desc: "Proactive monitoring of screen health, power status, and connectivity to ensure maximum uptime." },
                { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />, title: "Route Analytics", desc: "Understand where your ads are being shown with heatmaps and route density reports." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1 sm:mb-2">{feature.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
