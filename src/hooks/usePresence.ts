import { useEffect, useState } from 'react'

/**
 * Keeps an element mounted for `ms` after `open` becomes false so exit animations can play.
 * Respects prefers-reduced-motion (unmounts immediately).
 */
export function usePresence(open: boolean, ms = 200) {
  const [mounted, setMounted] = useState(open)
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    if (open) {
      setMounted(true)
      setClosing(false)
      return
    }
    if (!mounted) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setMounted(false)
      return
    }
    setClosing(true)
    const t = window.setTimeout(() => {
      setMounted(false)
      setClosing(false)
    }, ms)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  return { mounted, closing }
}
