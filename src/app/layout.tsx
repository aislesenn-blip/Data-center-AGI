import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BluePost | Simple Parcel Sending for Tanzania",
  description: "Send and track packages across Tanzania using passenger buses. FlixBus-level simplicity for sending parcels.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-slate-100 text-slate-900 min-h-screen flex justify-center items-center sm:p-4">
        {/* Mobile simulator container for desktop view, full screen on mobile */}
        <div className="w-full max-w-md h-[100dvh] sm:h-[840px] sm:max-h-[100dvh] bg-[#F7F8FA] sm:rounded-2xl sm:shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
