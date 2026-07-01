import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Billboards", href: "/products" },
        { name: "Street Furniture", href: "/products" },
        { name: "Transit Networks", href: "/products" },
        { name: "Programmatic DOOH", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Network", href: "/network" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Pricing", href: "/pricing" },
        { name: "Campaign Process", href: "/process" },
        { name: "FAQ", href: "/faq" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
               <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center shadow-md">
                  <Globe className="text-white w-4 h-4" />
               </div>
               <span className="text-lg font-bold text-[#0F172A] tracking-tight">[Company Name]</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
              Africa&apos;s premier digital out-of-home advertising network. Connecting global brands with high-value audiences through world-class screen infrastructure.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors flex items-center gap-1 group">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} [Company Name] Networks. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Global Headquarters</span>
             <span className="w-1 h-1 rounded-full bg-gray-300"></span>
             <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
