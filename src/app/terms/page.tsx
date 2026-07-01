import { Section } from "@/components/ui/Section";

export default function TermsPage() {
  return (
    <div className="pt-20">
      <Section bg="white">
        <div className="max-w-3xl mx-auto prose prose-blue prose-lg">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Last updated: October 2023</p>
          <div className="space-y-6 text-gray-700">
             <p>These Terms of Service constitute a legally binding agreement made between you and [Company Name] concerning your access to and use of our website and advertising services.</p>
             <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">1. Acceptance of Terms</h2>
             <p>By accessing the site or utilizing our network, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>
             <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">2. Advertising Content Standards</h2>
             <p>All advertising copy and creative supplied for display on the [Company Name] network is subject to our approval. We reserve the right to reject any creative that violates local laws, community standards, or our internal brand safety guidelines. Advertisers hold full responsibility for the copyright and legality of their submitted materials.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}