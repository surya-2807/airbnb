import { useEffect } from 'react'

let locks = 0
/** Prevents the page behind an overlay from scrolling (reference-counted for stacked overlays). */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    locks++
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      locks--
      if (locks === 0) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [active])
}
