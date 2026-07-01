import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Local Fleet Activation",
      price: "Custom",
      desc: "Perfect for local businesses wanting targeted exposure on a set number of rickshaw screens within a specific zone.",
      features: [
        "Select up to 50 vehicles",
        "Geofenced to specific neighborhoods",
        "Standard static or video creative",
        "Weekly playback reports",
        "Standard support"
      ]
    },
    {
      name: "City Domination",
      price: "Custom",
      desc: "Designed for regional brands aiming for maximum reach across the entire active urban fleet.",
      features: [
        "Full fleet access (500+ vehicles)",
        "City-wide roaming coverage",
        "Dynamic location-based creative",
        "Real-time dashboard access",
        "Dedicated campaign manager"
      ],
      popular: true
    },
    {
      name: "Programmatic Access",
      price: "CPM Based",
      desc: "For agencies and trading desks. Access our mobility inventory via your preferred DSP.",
      features: [
        "Integrates with major SSPs",
        "Real-time passenger targeting",
        "Flexible daily budgets",
        "Granular attribution reporting",
        "API access for live data"
      ]
    }
  ];

  return (
    <>
      <Hero
        title={<>Flexible pricing for <span className="text-[#1E3A8A]">mobility media.</span></>}
        subtitle="Whether you need a targeted local campaign or a city-wide takeover, our pricing models are designed to deliver transparent, measurable ROI."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
             <div key={idx} className={`relative bg-white rounded-3xl p-8 border ${tier.popular ? 'border-[#1E3A8A] shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm'} transition-transform`}>
               {tier.popular && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                   Most Popular
                 </div>
               )}
               <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{tier.name}</h3>
               <p className="text-gray-500 mb-6 min-h-[60px]">{tier.desc}</p>
               <div className="mb-8">
                 <span className="text-4xl font-black text-[#1E3A8A]">{tier.price}</span>
               </div>
               <ul className="space-y-4 mb-8">
                 {tier.features.map((feature, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <Check className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                     <span className="text-gray-600">{feature}</span>
                   </li>
                 ))}
               </ul>
               <Link href="/contact" className={`w-full py-4 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2 ${tier.popular ? 'bg-[#1E3A8A] text-white hover:bg-[#2563EB]' : 'bg-blue-50 text-[#1E3A8A] hover:bg-blue-100'}`}>
                 Get a Quote <ArrowRight className="w-4 h-4" />
               </Link>
             </div>
          ))}
        </div>
      </Section>
    </>
  );
}
