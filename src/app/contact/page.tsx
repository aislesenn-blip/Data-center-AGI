import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Mail, Phone, MapPin, ArrowRight, Briefcase } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Hero
        title={<>Let&apos;s build the <span className="text-[#1E3A8A]">future of mobility.</span></>}
        subtitle="Our executive team is ready to discuss strategic partnerships, API integrations, and enterprise deployments on our urban operating system."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-16 max-w-[1200px] mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100">
            <SectionHeader title="Enterprise Enquiries" subtitle="Fill out the form and our strategic partnerships team will contact you within 24 hours." />
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[#0F172A]">First Name</label>
                   <input type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[#0F172A]">Last Name</label>
                   <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-[#0F172A]">Work Email</label>
                 <input type="email" placeholder="john.doe@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-[#0F172A]">Inquiry Type</label>
                 <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all text-gray-700">
                    <option>Strategic Partnership</option>
                    <option>Enterprise Deployment</option>
                    <option>API / Technical Integration</option>
                    <option>Investor Relations</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-[#0F172A]">How can we collaborate?</label>
                 <textarea rows={4} placeholder="Tell us about your objectives..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all"></textarea>
               </div>
               <button type="button" className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group text-lg">
                 Submit Inquiry <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </form>
          </div>
          <div className="space-y-8 flex flex-col justify-center">
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                   <Briefcase className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Partnerships</h3>
                <p className="text-gray-600 mb-4 text-lg">partnerships@[companyname].com</p>
                <p className="text-sm text-gray-500">For banks, telecoms, and mobility networks.</p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                   <MapPin className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Global Headquarters</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                   [Company Name] Technologies Ltd.<br/>
                   Westlands Commercial Center<br/>
                   Nairobi, Kenya
                </p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                   <Phone className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Direct Line</h3>
                <p className="text-gray-600 text-lg">+254 (0) 700 000 000</p>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
