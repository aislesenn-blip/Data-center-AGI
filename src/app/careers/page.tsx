import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function CareersPage() {
  const jobs = [
    { title: "Programmatic Sales Director", location: "Nairobi (Hybrid)", type: "Full-time" },
    { title: "Data Scientist (Mobility)", location: "Remote", type: "Full-time" },
    { title: "Creative Technologist", location: "Johannesburg", type: "Full-time" },
  ];

  return (
    <>
      <Hero
        title={<>Build the future of <span className="text-[#1E3A8A]">media.</span></>}
        subtitle="Join the team engineering the most advanced digital out-of-home network in Africa."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <SectionHeader title="Open Positions" subtitle="We are always looking for exceptional talent to join our mission." align="center" />
        <div className="max-w-4xl mx-auto space-y-4">
           {jobs.map((job, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                <div>
                   <h3 className="text-xl font-bold text-[#0F172A] mb-1">{job.title}</h3>
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{job.type}</span>
                   </div>
                </div>
                <button className="mt-4 sm:mt-0 bg-white border border-gray-200 text-[#0F172A] px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Apply Now
                </button>
             </AnimatedCard>
           ))}
        </div>
      </Section>
    </>
  );
}