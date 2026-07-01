import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Hero
        title={<>Let&apos;s build your <span className="text-[#1E3A8A]">mobility campaign.</span></>}
        subtitle="Our team of media strategists is ready to help you dominate the physical space. Reach out to discuss fleet inventory, programmatic integrations, or custom builds."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <SectionHeader title="Get in touch" subtitle="Fill out the form and our sales team will contact you within 24 hours." />
            <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-[#0F172A]">First Name</label>
                   <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-[#0F172A]">Last Name</label>
                   <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-[#0F172A]">Company Email</label>
                 <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-[#0F172A]">How can we help?</label>
                 <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"></textarea>
               </div>
               <button type="button" className="w-full bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                 Send Message <ArrowRight className="w-5 h-5" />
               </button>
            </form>
          </div>
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                   <MapPin className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Global Headquarters</h3>
                <p className="text-gray-600">Westlands Commercial Center<br/>Nairobi, Kenya</p>
             </div>
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                   <Mail className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Sales Inquiries</h3>
                <p className="text-gray-600">sales@[companyname].com</p>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
