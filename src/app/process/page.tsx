import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";

export default function ProcessPage() {
  const steps = [
    { num: "01", title: "Route & Strategy Planning", desc: "Our data team analyzes your target audience to select the optimal auto-rickshaw routes and times for your campaign, ensuring maximum relevance." },
    { num: "02", title: "Creative Optimization", desc: "We ensure your artwork is optimized for maximum impact in a transit environment, taking viewing distance, dwell time, and screen specs into account." },
    { num: "03", title: "Campaign Activation", desc: "Your campaign goes live seamlessly across the selected fleet. If programmatic, location-based triggers begin executing automatically." },
    { num: "04", title: "Measurement & Reporting", desc: "Receive detailed playout reports, route heatmaps, and attribution data to measure the real-world ROI of your transit investment." },
  ];

  return (
    <>
      <Hero
        title={<>Execution without <span className="text-[#1E3A8A]">friction.</span></>}
        subtitle="We've streamlined the mobility media buying process, making it as simple and transparent as buying online media."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {steps.map((step, idx) => (
             <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
               <div className="flex-shrink-0 text-5xl sm:text-6xl font-black text-[#1E3A8A]/10">{step.num}</div>
               <div className="pt-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{step.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </Section>
    </>
  );
}
