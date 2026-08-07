import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-diaspedia-text-muted space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              This Cookie Policy explains how Diaspedia uses cookies and similar web tracking technologies when you visit our website. It explains what these technologies are, why we use them, and your absolute right to control our use of them.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">1. What are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">2. Why We Use Cookies</h2>
              <p className="mb-4">
                We use first-party and third-party cookies for several critical reasons:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required to support page transitions, preserve route selection state, and calculate interactive package weight savings.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand which shipping schedules and routes are most popular, enabling us to optimize route frequencies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-diaspedia-text mb-4">3. Controlling Cookies</h2>
              <p>
                You have the absolute right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to certain interactive calculators and dashboard features might be limited.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any questions regarding our use of cookies, please contact us at <a href="mailto:legal@diaspedia.com" className="text-diaspedia-text font-semibold hover:underline">legal@diaspedia.com</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
