import "./globals.css"

export const metadata = {
  title: "PayFriday",
  description: "Pay smarter. Save instantly.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-slate-50 text-slate-900 antialiased">
      <body className="w-full h-full min-h-[100dvh] bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overscroll-none touch-manipulation">
        {children}
      </body>
    </html>
  )
}
