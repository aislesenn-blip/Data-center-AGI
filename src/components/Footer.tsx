import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-feep-text text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white mb-6 block">
              FEEP
            </Link>
            <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
              A future where no child misses school because of fee timing. We are building the infrastructure for modern education financing in Africa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#solution" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">About</Link></li>
              <li><Link href="#vision" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Mission</Link></li>
              <li><Link href="#contact" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Partners</Link></li>
              <li><Link href="mailto:careers@feep.africa" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="mailto:legal@feep.africa?subject=Privacy Policy Request" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="mailto:legal@feep.africa?subject=Terms of Service Request" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">LinkedIn</Link></li>
              <li><Link href="mailto:hello@feep.africa" className="text-zinc-300 hover:text-feep-primary text-sm transition-colors">Email Us</Link></li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="pt-8 border-t border-white/10 flex justify-center md:justify-start">
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} FEEP. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
