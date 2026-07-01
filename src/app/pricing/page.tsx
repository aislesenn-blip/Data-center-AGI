import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Local Fleet",
      desc: "Perfect for local businesses wanting premium visibility in specific neighborhoods.",
      price: "Custom",
      features: [
        "Select specific vehicle routes",
        "Standard static or video creative",
        "Weekly reporting",
        "Self-service dashboard access"
      ]
    },
    {
      name: "Agency Partner",
      desc: "Designed for media buyers requiring scale and flexibility.",
      price: "Programmatic",
      features: [
        "API & programmatic access",
        "Volume-based CPM rates",
        "Dynamic location-based creative",
        "Advanced route analytics"
      ],
      popular: true
    },
    {
      name: "City Domination",
      desc: "For multinational brands requiring maximum share of voice.",
      price: "Managed",
      features: [
        "100% Share of Voice on selected fleet",
        "Dedicated account director",
        "Custom creative optimization",
        "Priority premium inventory"
      ]
    }
  ];

  return (
    <>
      <Hero
        title={<>Investment tiers for <span className="text-[#1E3A8A]">every scale.</span></>}
        subtitle="Transparent, flexible commercial models designed to accommodate hyper-local campaigns up to city-wide brand rollouts."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100 px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-3xl p-6 sm:p-8 border ${plan.popular ? 'border-[#1E3A8A] shadow-2xl relative mt-4 md:mt-0 md:-translate-y-4' : 'border-gray-200 shadow-sm mt-4 md:mt-0'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6 md:min-h-[60px] leading-relaxed">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">{plan.price}</span>
              </div>
              <ul className="space-y-4 mb-8 sm:mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl font-bold transition-colors text-[17px] min-h-[56px] md:min-h-[48px] touch-manipulation ${plan.popular ? 'bg-[#1E3A8A] text-white hover:bg-[#2563EB] shadow-lg shadow-blue-900/20' : 'bg-gray-100 text-[#0F172A] hover:bg-gray-200'}`}>
                Contact Sales <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
