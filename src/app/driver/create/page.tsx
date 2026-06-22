"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"

export default function CreateRoutePage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPublishing(true)
    // Simulate API call and redirect to the newly created route presentation
    setTimeout(() => {
      router.push("/driver/route/dr-new")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-light-gray/90 backdrop-blur-md z-50">
        <button
          onClick={() => !isPublishing && router.back()}
          disabled={isPublishing}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-rich-black hover:bg-soft-white transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-lg tracking-tight text-rich-black">Publish Route</span>
        <div className="h-10 w-10" />
      </header>

      <form onSubmit={handlePublish} className="flex-1 flex flex-col pt-2 px-6">

        <div className="space-y-6 flex-1">
          {/* Route Section */}
          <section className="space-y-4">
             <h3 className="font-bold text-rich-black text-sm uppercase tracking-wider">The Route</h3>

             <div className="bg-white p-5 rounded-2xl border border-border space-y-4 relative">
               <Input
                 label="Starting Area"
                 placeholder="e.g. Kariakoo Market"
                 required
               />

               {/* Visual connector */}
               <div className="absolute left-[35px] top-[75px] h-[50px] w-0.5 bg-border z-0 hidden sm:block" />

               <Input
                 label="Destination Area"
                 placeholder="e.g. Masaki Terminal"
                 required
               />
             </div>
          </section>

          {/* Schedule Section */}
          <section className="space-y-4">
             <h3 className="font-bold text-rich-black text-sm uppercase tracking-wider">Schedule</h3>

             <div className="bg-white p-5 rounded-2xl border border-border grid grid-cols-2 gap-4">
               <Select label="Date" required>
                 <option value="tomorrow">Tomorrow</option>
                 <option value="today">Today</option>
                 <option value="monday">Monday</option>
               </Select>

               <Input
                 type="time"
                 label="Departure Time"
                 required
               />
             </div>
          </section>

          {/* Details Section */}
          <section className="space-y-4">
             <h3 className="font-bold text-rich-black text-sm uppercase tracking-wider">Capacity & Pricing</h3>

             <div className="bg-white p-5 rounded-2xl border border-border space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <Input
                   type="number"
                   label="Available Seats"
                   placeholder="e.g. 4"
                   min="1"
                   max="30"
                   required
                 />
                 <Input
                   type="text"
                   label="Price Per Seat"
                   placeholder="e.g. 1500"
                   required
                 />
               </div>

               <Select label="Vehicle Type" required>
                 <option value="Toyota Hiace">Toyota Hiace</option>
                 <option value="Toyota Coaster">Toyota Coaster</option>
                 <option value="Nissan Caravan">Nissan Caravan</option>
                 <option value="Private Car">Private Sedan</option>
               </Select>
             </div>
          </section>

          {/* Pickup Details */}
          <section className="space-y-4">
             <h3 className="font-bold text-rich-black text-sm uppercase tracking-wider">Passenger Instructions</h3>

             <div className="bg-white p-5 rounded-2xl border border-border space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-rich-black block">Specific Pickup Location</label>
                 <textarea
                   className="flex w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-rich-black shadow-sm transition-all focus-visible:outline-none focus-visible:border-rich-black focus-visible:ring-1 focus-visible:ring-rich-black min-h-[100px] resize-none"
                   placeholder="Exactly where should passengers wait? e.g. Outside the main Post Office entrance."
                   required
                 />
               </div>
             </div>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-border sticky bottom-[calc(env(safe-area-inset-bottom)+80px)] bg-light-gray pb-4 z-40">
           <Button
             type="submit"
             size="lg"
             className="w-full shadow-lg shadow-rich-black/10 flex items-center justify-center"
             disabled={isPublishing}
           >
             {isPublishing ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-3" />
                  Publishing Route...
                </>
             ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Publish Route
                </>
             )}
           </Button>
        </div>

      </form>
    </div>
  )
}
