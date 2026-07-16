import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-feep-text-muted space-y-8">
            <p className="text-lg leading-relaxed">
              At FEEP, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, email address, and demographic information that you voluntarily give to us when you choose to participate in various activities related to the Site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">2. Use of Your Information</h2>
              <p className="leading-relaxed">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you via the Site to create and manage your account, deliver targeted advertising, and email you regarding your account or order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">3. Security of Your Information</h2>
              <p className="leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any privacy-related inquiries, please contact us at <a href="mailto:legal@feep.africa" className="text-feep-text font-semibold hover:underline">legal@feep.africa</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
