"use client"

import { useState, useEffect, useCallback } from "react"

type SessionState = 'ATTRACT' | 'ACTIVE' | 'WARNING'

export function useTabletSession() {
  const [sessionState, setSessionState] = useState<SessionState>('ATTRACT')
  // We initialize to 0. The first interaction will set the true Date.now().
  // The timer logic requires lastInteraction to be valid, so we wrap Date.now() in a function that isn't called during initial render.
  const [lastInteraction, setLastInteraction] = useState<number>(() => {
     if (typeof window !== 'undefined') {
       return Date.now();
     }
     return 0;
  });

  // Timers
  const WARNING_TIMEOUT = 45000; // 45 seconds to warning
  const RESET_TIMEOUT = 60000; // 60 seconds total to reset

  const pingInteraction = useCallback(() => {
    setLastInteraction(Date.now())
    if (sessionState === 'ATTRACT' || sessionState === 'WARNING') {
      setSessionState('ACTIVE')
    }
  }, [sessionState])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const idleTime = now - lastInteraction

      if (sessionState === 'ACTIVE' && idleTime > WARNING_TIMEOUT) {
        setSessionState('WARNING')
      } else if ((sessionState === 'WARNING' || sessionState === 'ACTIVE') && idleTime > RESET_TIMEOUT) {
        setSessionState('ATTRACT')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastInteraction, sessionState])

  // Global touch listener
  useEffect(() => {
    const handleTouch = () => pingInteraction()
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('mousedown', handleTouch, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('mousedown', handleTouch)
    }
  }, [pingInteraction])

  const forceReset = () => {
    setLastInteraction(Date.now() - RESET_TIMEOUT - 1000)
    setSessionState('ATTRACT')
  }

  return { sessionState, pingInteraction, forceReset }
}
