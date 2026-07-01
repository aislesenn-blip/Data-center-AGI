import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Hero
        title={<>Let&apos;s build your <span className="text-[#1E3A8A]">campaign.</span></>}
        subtitle="Our team of media strategists is ready to help you dominate the physical space. Reach out to discuss transit inventory, programmatic integrations, or custom route builds."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <SectionHeader title="Get in touch" subtitle="Fill out the form and our sales team will contact you within 24 hours." />
            <form className="space-y-4 sm:space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#0F172A] ml-1">First Name</label>
                   <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-shadow text-[16px]" placeholder="Jane" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#0F172A] ml-1">Last Name</label>
                   <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-shadow text-[16px]" placeholder="Doe" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-[#0F172A] ml-1">Company Email</label>
                 <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-shadow text-[16px]" placeholder="jane@company.com" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-[#0F172A] ml-1">How can we help?</label>
                 <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-shadow text-[16px]" placeholder="Tell us about your campaign goals..."></textarea>
               </div>
               <button type="button" className="w-full bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 touch-manipulation">
                 Send Message <ArrowRight className="w-5 h-5" />
               </button>
            </form>
          </div>
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
             <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                   <MapPin className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">Global Headquarters</h3>
                <p className="text-gray-600 leading-relaxed">Westlands Commercial Center<br/>Nairobi, Kenya</p>
             </div>
             <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                   <Mail className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">Sales Inquiries</h3>
                <p className="text-gray-600 font-medium">sales@[company].com</p>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
