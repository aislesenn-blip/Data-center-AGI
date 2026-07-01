import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Target, TrendingUp, ShieldCheck, MonitorPlay, ArrowRight, BarChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const stats = [
    { value: "4.2M+", label: "Daily Impressions", icon: <TrendingUp className="w-5 h-5 text-[#2563EB]" /> },
    { value: "500+", label: "Premium Screens", icon: <MonitorPlay className="w-5 h-5 text-[#2563EB]" /> },
    { value: "98%", label: "Viewability Rate", icon: <Target className="w-5 h-5 text-[#2563EB]" /> },
    { value: "Tier 1", label: "Brand Safety", icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" /> },
  ];

  return (
    <>
      <Hero
        title={<>Command attention in the <span className="text-[#1E3A8A]">Active Space.</span></>}
        subtitle="Africa's most premium Digital Out-of-Home infrastructure. Connect your brand with high-value audiences at scale with unblockable, data-driven mass media."
        primaryCta={{ text: "Explore the Network", href: "/network" }}
        secondaryCta={{ text: "View Solutions", href: "/services" }}
        imageSrc="https://images.unsplash.com/photo-1542204637-e67bc7d41e48?auto=format&fit=crop&q=80&w=2000"
      />

      <Section className="border-y border-gray-100 py-12" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
           <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Abstract placeholder logos styled professionally */}
             {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-2 font-bold text-xl text-[#0F172A]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400"></div>
                  Brand {i}
                </div>
             ))}
           </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeader
          title="Unparalleled reach. Pinpoint precision."
          subtitle="We combine the unmissable impact of traditional out-of-home with the agility, targeting, and measurement of programmatic digital media."
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.1} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </AnimatedCard>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              title="Programmatic infrastructure for modern brands."
              subtitle="Access our inventory through your preferred DSP or work directly with our managed services team. Full flexibility, real-time optimization, and comprehensive attribution reporting."
            />
            <ul className="space-y-6">
              {[
                { title: "Dynamic Creative Optimization", desc: "Change messaging based on weather, time of day, or live data feeds." },
                { title: "Audience-Based Buying", desc: "Target specific demographics leveraging aggregated mobility data." },
                { title: "Omnichannel Integration", desc: "Synchronize your DOOH campaigns with mobile and social strategies." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#1E3A8A] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A] mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/services" className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#2563EB] transition-colors group">
                Discover programmatic DOOH
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-2xl transform translate-x-4 translate-y-4"></div>
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data Analytics" className="relative rounded-2xl shadow-xl w-full object-cover aspect-square" />
             <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                   <BarChart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                   <p className="text-sm text-gray-500 font-medium">Campaign Lift</p>
                   <p className="text-2xl font-bold text-[#0F172A]">+42.8%</p>
                </div>
             </div>
          </div>
        </div>
      </Section>

      <Section bg="blue">
        <div className="text-center max-w-3xl mx-auto">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to dominate the skyline?</h2>
           <p className="text-xl text-blue-100 mb-10">Join the world&apos;s leading brands in leveraging the most powerful digital out-of-home network in Africa.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
                Contact Sales Team
              </Link>
              <Link href="/pricing" className="bg-transparent text-white border-2 border-blue-400/50 hover:border-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                View Agency Packages
              </Link>
           </div>
        </div>
      </Section>
    </>
  );
}