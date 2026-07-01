import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function FAQPage() {
  const faqs = [
    { q: "How do you measure DOOH audiences?", a: "We integrate with leading mobile location data providers to track aggregate, anonymized footfall and vehicular traffic around our screens, ensuring accurate impression measurement." },
    { q: "Can I buy your inventory programmatically?", a: "Yes. 100% of our digital inventory is connected to major Supply-Side Platforms (SSPs) like VIOOH and Broadsign, allowing you to purchase via your preferred DSP." },
    { q: "What is the minimum campaign duration?", a: "Programmatic buys have no minimum duration. Direct managed campaigns typically start at one week, but we offer custom packages based on your objectives." },
    { q: "Do you support dynamic creative?", a: "Absolutely. Our CMS supports HTML5 and dynamic data feeds, allowing your creative to change based on weather, time, or live API data." }
  ];

  return (
    <>
      <Hero
        title={<>Frequently Asked <span className="text-[#1E3A8A]">Questions</span></>}
        subtitle="Everything you need to know about planning, executing, and measuring your DOOH campaigns."
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