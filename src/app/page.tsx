import { PaymentFlow } from "@/components/PaymentFlow"

export default function Home() {
  return (
    <main className="w-full h-full min-h-[100dvh] bg-slate-100 flex items-center justify-center p-0 sm:p-6 md:p-12">
       {/* Max width mimics a mobile viewport for desktop viewing, but uses full screen on actual mobile devices */}
      <div className="w-full h-[100dvh] sm:h-auto sm:max-h-[850px] sm:max-w-[420px] shadow-2xl sm:rounded-[3rem] overflow-hidden bg-white mx-auto border border-slate-200">
        <PaymentFlow />
      </div>
    </main>
  )
}
