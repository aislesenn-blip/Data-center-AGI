import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-slate-50 text-slate-900 antialiased">
      <body className="w-screen h-screen overflow-hidden overscroll-none select-none touch-manipulation bg-slate-50">
        {children}
      </body>
    </html>
  )
}
