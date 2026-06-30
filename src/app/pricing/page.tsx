import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "SME Local",
      desc: "Perfect for local businesses wanting premium neighborhood visibility.",
      price: "Custom",
      features: [
        "Hyper-local targeting",
        "Flexible daily/weekly buying",
        "Self-service portal access",
        "Standard reporting"
      ]
    },
    {
      name: "Agency Partner",
      desc: "Designed for media buyers and advertising agencies.",
      price: "Programmatic",
      features: [
        "Full API & SSP integration",
        "Volume-based CPM rates",
        "Dynamic creative capabilities",
        "Advanced attribution analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise Global",
      desc: "For multinational brands requiring massive scale and custom executions.",
      price: "Managed",
      features: [
        "Dedicated account director",
        "National network takeovers",
        "Custom experiential builds",
        "Priority premium inventory"
      ]
    }
  ];

  return (
    <>
      <Hero
        title={<>Investment tiers for <span className="text-[#1E3A8A]">every scale.</span></>}
        subtitle="Transparent, flexible commercial models designed to accommodate hyper-local campaigns up to multi-national brand rollouts."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-8 border ${plan.popular ? 'border-[#1E3A8A] shadow-2xl relative' : 'border-gray-200 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-6 min-h-[48px]">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#0F172A]">{plan.price}</span>
                {plan.price !== "Programmatic" && plan.price !== "Managed" && plan.price !== "Custom" && <span className="text-gray-500">/mo</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-[#1E3A8A] text-white hover:bg-[#2563EB]' : 'bg-gray-100 text-[#0F172A] hover:bg-gray-200'}`}>
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}