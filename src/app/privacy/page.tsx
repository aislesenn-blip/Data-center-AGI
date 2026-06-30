import { Section } from "@/components/ui/Section";

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <Section bg="white">
        <div className="max-w-3xl mx-auto prose prose-blue prose-lg">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: October 2023</p>
          <div className="space-y-6 text-gray-700">
             <p>At Ovation DOOH, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our advertising services.</p>
             <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">1. Information We Collect</h2>
             <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use.</p>
             <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">2. Mobility Data & Audience Measurement</h2>
             <p>For our out-of-home audience measurement, we do not collect personally identifiable information. We rely on aggregated, anonymized mobility data provided by third-party telecom and location intelligence partners to estimate footfall and vehicular traffic near our digital assets.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}