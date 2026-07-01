import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "In-Transit Displays", href: "/products" },
        { name: "Geo-Fenced Campaigns", href: "/products" },
        { name: "Programmatic Transit", href: "/services" },
        { name: "Dynamic Creative", href: "/services" },
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
    <footer className="bg-white border-t border-gray-200 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">

          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group touch-manipulation inline-flex">
               <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-md">
                  <Globe className="text-white w-5 h-5" />
               </div>
               <span className="text-xl font-black text-[#0F172A] tracking-tight">[Company Name]</span>
            </Link>
            <p className="text-gray-500 text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
              An innovative AdTech platform building the future of urban advertising through connected transit screens.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title} className="col-span-1">
              <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-wider mb-5 sm:mb-6">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm sm:text-base text-gray-500 hover:text-[#2563EB] transition-colors font-medium touch-manipulation inline-block py-1">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} [Company Name] AdTech. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
             <span>Global Headquarters</span>
             <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
             <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
