import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";

export default function ClientsPage() {
  return (
    <>
      <Hero
        title={<>Trusted by the <span className="text-[#1E3A8A]">world&apos;s best.</span></>}
        subtitle="From Fortune 500 multinationals to fast-growing tech unicorns, industry leaders rely on our network to command the physical space."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white h-32 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0">
                 <div className="flex items-center gap-2 font-bold text-xl text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300"></div>
                  Client {i}
                </div>
              </div>
           ))}
        </div>
      </Section>
    </>
  );
}