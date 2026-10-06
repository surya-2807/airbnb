import { useEffect, type RefObject } from 'react'

/** Calls `cb` when a mousedown happens outside `ref` or Escape is pressed. */
export function useOutside(ref: RefObject<HTMLElement>, active: boolean, cb: () => void) {
  useEffect(() => {
    if (!active) return
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb()
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cb()
    }
    document.addEventListener('mousedown', down)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('mousedown', down)
      document.removeEventListener('keydown', key)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}
