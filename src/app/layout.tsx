import "./globals.css"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="h-full">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto">
              <div className="py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
