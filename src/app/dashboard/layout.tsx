"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Monitor, PlusCircle, BarChart3, Settings, Bell, Search, Activity } from "lucide-react";
import LinkComponent from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: PlusCircle },
    { name: "Screens", href: "/dashboard/screens", icon: Monitor },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
                <Activity className="text-white w-4 h-4" />
             </div>
             <span className="font-bold text-lg tracking-tight">DOOH Ads</span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <LinkComponent
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#111827] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.name}
              </LinkComponent>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <LinkComponent
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-400" />
            Settings
          </LinkComponent>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
           <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md hidden sm:block">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-gray-400" />
               </div>
               <input
                 type="text"
                 placeholder="Search campaigns, screens..."
                 className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#111827] outline-none bg-gray-50/50 focus:bg-white transition-all"
               />
             </div>
           </div>

           <div className="flex items-center gap-4">
             <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-sm border-2 border-white cursor-pointer"></div>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
