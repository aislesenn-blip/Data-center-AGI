"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useTabletSession } from "@/hooks/useTabletSession"
import { AttractLoop } from "@/components/tablet/AttractLoop"
import { DestinationSelect } from "@/components/tablet/DestinationSelect"
import { CategoryGrid } from "@/components/tablet/CategoryGrid"
import { SearchResults } from "@/components/tablet/SearchResults"
import { MerchantDetail } from "@/components/tablet/MerchantDetail"
import { WarningModal } from "@/components/tablet/WarningModal"

type ViewState = 'DESTINATION' | 'CATEGORY' | 'RESULTS' | 'DETAIL'

export default function TabletApp() {
  const { sessionState, pingInteraction, forceReset } = useTabletSession()
  const [view, setView] = useState<ViewState>('DESTINATION')
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)

  // Reset internal state when returning to attract loop
  // Instead of using effect, we derive state or reset cleanly on event boundaries if needed.
  // But since we mount/unmount the active session based on sessionState,
  // we can use a key on the active session container to force reset its state.
  // Wait, these are held at the root level, so we just reset them manually when ending session.
  // We'll expose an effect here but we'll use a functional state update or just trust the unmount.
  // Actually, setting state in an effect is fine if it resets the whole tree, but to satisfy the linter,
  // we just handle the reset in forceReset or simply don't worry about it since 'ATTRACT' unmounts the active views anyway,
  // and when they re-mount we want them fresh. Let's initialize state based on sessionState change without an effect.

  if (sessionState === 'ATTRACT' && view !== 'DESTINATION') {
      setView('DESTINATION')
      setSelectedDestination(null)
      setSelectedCategory(null)
      setSelectedMerchant(null)
  }

  const handleDestinationSelect = (dest: string) => {
    setSelectedDestination(dest)
    setView('CATEGORY')
    pingInteraction()
  }

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    setView('RESULTS')
    pingInteraction()
  }

  const handleMerchantSelect = (merchantId: string) => {
    setSelectedMerchant(merchantId)
    setView('DETAIL')
    pingInteraction()
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        {sessionState === 'ATTRACT' && (
          <AttractLoop key="attract" />
        )}

        {sessionState !== 'ATTRACT' && (
          <div key="active-session" className="w-full h-full">
            <AnimatePresence mode="wait">
              {view === 'DESTINATION' && (
                <DestinationSelect
                  key="dest"
                  onSelect={handleDestinationSelect}
                />
              )}
              {view === 'CATEGORY' && (
                <CategoryGrid
                  key="cat"
                  destination={selectedDestination || "Anywhere"}
                  onSelect={handleCategorySelect}
                  onBack={() => setView('DESTINATION')}
                />
              )}
              {view === 'RESULTS' && (
                <SearchResults
                  key="results"
                  destination={selectedDestination || "Anywhere"}
                  category={selectedCategory || "All"}
                  onSelect={handleMerchantSelect}
                  onBack={() => setView('CATEGORY')}
                />
              )}
              {view === 'DETAIL' && selectedMerchant && (
                <MerchantDetail
                  key="detail"
                  merchantId={selectedMerchant}
                  onClose={() => setView('RESULTS')}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sessionState === 'WARNING' && (
          <WarningModal
            key="warning"
            onContinue={pingInteraction}
            onReset={forceReset}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
