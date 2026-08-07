import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function TermsOfService() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-diaspedia-text-muted space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              These Terms of Service constitute a legally binding agreement made between you and Diaspedia concerning your access to and use of our cross-border logistics coordination platform and website.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, choosing route schedules, and reserving cargo space, you represent and warrant that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree, you are prohibited from using our coordination services and must discontinue use immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">2. Combined Cargo & Prohibited Items</h2>
              <p className="mb-4">
                To maintain standard safety and regulatory clearance, all users joining collective shipping schedules must strictly agree to our packaging guidelines:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must declare the complete, honest contents of any packaging.</li>
                <li>You are strictly prohibited from sending illegal drugs, counterfeit materials, inflammable goods, hazardous materials, or contraband.</li>
                <li>All packages are subject to physical inspection at our designated local drop-off collection hubs prior to airport cargo clearance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">3. Limit of Liability</h2>
              <p>
                Diaspedia is a B2C platform facilitating bulk group cargo rates. While we make every effort to ensure packages arrive on schedule, we are not liable for customs delays, airline rescheduling, or force majeure events. Standard insurance coverage options are provided upon package inspection at our drop-off centers.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any legal or regulatory inquiries regarding these terms, please contact us at <a href="mailto:legal@diaspedia.com" className="text-diaspedia-text font-semibold hover:underline">legal@diaspedia.com</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
