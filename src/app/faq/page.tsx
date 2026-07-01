import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function FAQPage() {
  const faqs = [
    { q: "How do you measure transit audiences?", a: "We utilize on-board IoT sensors combined with aggregated mobile location data to track passenger volume and vehicular traffic around our screens, ensuring accurate impression measurement." },
    { q: "Can I buy your inventory programmatically?", a: "Yes. Our digital inventory is connected to select Supply-Side Platforms (SSPs), allowing you to purchase via your preferred DSP and run location-triggered campaigns." },
    { q: "What is the minimum campaign duration?", a: "Programmatic buys have no minimum duration. Direct managed campaigns typically start at one week, but we offer custom packages based on your specific route objectives." },
    { q: "Do you support dynamic creative?", a: "Absolutely. Our CMS supports dynamic data feeds, allowing your creative to change based on the vehicle's real-time GPS location, time of day, or external API triggers like weather." },
    { q: "How do you ensure the screens stay on?", a: "Our proprietary hardware includes robust power management systems hooked directly into the vehicle, alongside cellular telemetry that alerts our maintenance team instantly if a screen goes offline." }
  ];

  return (
    <>
      <Hero
        title={<>Frequently Asked <span className="text-[#1E3A8A]">Questions</span></>}
        subtitle="Everything you need to know about planning, executing, and measuring your mobility campaigns."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
           {faqs.map((faq, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3 sm:mb-4">{faq.q}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.a}</p>
             </AnimatedCard>
           ))}
        </div>
      </Section>
    </>
  );
}
