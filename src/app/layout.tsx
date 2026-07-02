import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black text-white antialiased">
      <body className="w-screen h-screen overflow-hidden overscroll-none select-none touch-manipulation">
        {children}
      </body>
    </html>
  )
}
