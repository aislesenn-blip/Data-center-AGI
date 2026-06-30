import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function ProcessPage() {
  const steps = [
    { num: "01", title: "Strategic Planning", desc: "Our data team analyzes your audience and objectives to select the optimal screens and times for your campaign." },
    { num: "02", title: "Creative Optimization", desc: "We ensure your artwork is optimized for maximum impact in the physical environment, taking viewing distance and dwell time into account." },
    { num: "03", title: "Campaign Activation", desc: "Your campaign goes live seamlessly across the network. If programmatic, triggers based on live data begin executing." },
    { num: "04", title: "Measurement & Reporting", desc: "Receive detailed playout reports and attribution data to measure the real-world ROI of your DOOH investment." },
  ];

  return (
    <>
      <Hero
        title={<>Execution without <span className="text-[#1E3A8A]">friction.</span></>}
        subtitle="We've streamlined the out-of-home buying process, making it as simple and transparent as buying online media."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, idx) => (
             <div key={idx} className="flex flex-col md:flex-row gap-8 items-start relative">
               <div className="flex-shrink-0 text-6xl font-black text-gray-100">{step.num}</div>
               <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{step.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </Section>
    </>
  );
}