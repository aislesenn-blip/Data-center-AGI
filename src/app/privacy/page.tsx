import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-diaspedia-text-muted space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              At Diaspedia, we are committed to protecting your privacy and ensuring your personal information is handled in a secure and responsible manner. This Privacy Policy describes how we collect, use, and share your information when you use our cross-border shipping coordination services and website.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                To coordinate shared shipping routes, calculate savings, and notify you about shipment updates, we collect personal information that you provide directly to us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Your name, email address, and phone number (such as WhatsApp) to send routing updates.</li>
                <li><strong>Package Details:</strong> The weight, description, and origin/destination countries of items you wish to send.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, calculator, and route booking system.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the collected information for the following professional and operational purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To allocate luggage capacity and coordinate bulk customs cargo.</li>
                <li>To contact you with drop-off instructions and shipping labels.</li>
                <li>To calculate dynamic cost-savings for the community.</li>
                <li>To continuously analyze routes and optimize logistics efficiency.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">3. Information Sharing and Security</h2>
              <p>
                We do not sell, rent, or trade your personal data to third parties. We only share relevant details with verified local collection partners, freight operators, and customs brokers necessary to complete your shipping itinerary. All personal details are stored using secure administrative and electronic measures to prevent unauthorized access.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any privacy-related inquiries, please contact our team at <a href="mailto:legal@diaspedia.com" className="text-diaspedia-text font-semibold hover:underline">legal@diaspedia.com</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
