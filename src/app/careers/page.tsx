import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function CareersPage() {
  const jobs = [
    { title: "Programmatic Sales Director", location: "Nairobi (Hybrid)", type: "Full-time" },
    { title: "Data Scientist (Mobility)", location: "Remote", type: "Full-time" },
    { title: "Embedded Systems Engineer", location: "Dar es Salaam", type: "Full-time" },
    { title: "Hardware Operations Manager", location: "Kampala", type: "Full-time" },
  ];

  return (
    <>
      <Hero
        title={<>Build the future of <span className="text-[#1E3A8A]">mobility media.</span></>}
        subtitle="Join the team engineering the most advanced transit advertising network in Africa."
        align="center"
      />
      <Section bg="white" className="border-t border-gray-100">
        <SectionHeader title="Open Positions" subtitle="We are always looking for exceptional engineering, hardware, and sales talent to join our mission." align="center" />
        <div className="max-w-4xl mx-auto space-y-4">
           {jobs.map((job, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8">
                <div className="mb-4 sm:mb-0">
                   <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">{job.title}</h3>
                   <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{job.type}</span>
                   </div>
                </div>
                <button className="w-full sm:w-auto bg-white border border-gray-200 text-[#0F172A] px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm touch-manipulation">
                  Apply Now
                </button>
             </AnimatedCard>
           ))}
        </div>
      </Section>
    </>
  );
}
