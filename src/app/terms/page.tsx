import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function TermsOfService() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-feep-text-muted space-y-8">
            <p className="text-lg leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you and FEEP concerning your access to and use of the feep.africa website as well as any other media form, media channel, or mobile website related, linked, or otherwise connected thereto.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">2. Intellectual Property Rights</h2>
              <p className="leading-relaxed">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us or licensed to us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">3. User Representations</h2>
              <p className="leading-relaxed">
                By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete; you will maintain the accuracy of such information and promptly update such registration information as necessary.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any legal inquiries regarding these terms, please contact us at <a href="mailto:legal@feep.africa" className="text-feep-text font-semibold hover:underline">legal@feep.africa</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
