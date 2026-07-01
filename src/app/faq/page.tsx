import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function FAQPage() {
  const faqs = [
    { q: "How do you measure audiences in a moving vehicle?", a: "We utilize our proprietary connected fleet OS which logs every ride's duration, exact routing via GPS, and time-of-day. This allows us to accurately calculate impressions based on passenger volume and dwell time." },
    { q: "Can I buy your mobility inventory programmatically?", a: "Yes. 100% of our digital rickshaw inventory is connected to major Supply-Side Platforms (SSPs), allowing you to purchase via your preferred DSP just like online ads." },
    { q: "What is the minimum fleet size for a campaign?", a: "Programmatic buys have no minimums. Direct managed campaigns typically start at 50 vehicles for targeted local activations, ensuring sufficient frequency." },
    { q: "Do you support location-triggered creative?", a: "Absolutely. Our system allows your creative to change based on the vehicle entering a specific geofenced area, passing near a point-of-interest, or based on time/weather triggers." }
  ];

  return (
    <>
      <Hero
        title={<>Frequently Asked <span className="text-[#1E3A8A]">Questions</span></>}
        subtitle="Everything you need to know about planning, executing, and measuring your mobility campaigns."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
           {faqs.map((faq, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1}>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
             </AnimatedCard>
           ))}
        </div>
      </Section>
    </>
  );
}
