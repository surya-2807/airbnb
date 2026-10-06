import { useEffect, useState } from 'react'

/** Returns the id of the section whose top has most recently crossed `offset` px from the viewport top. */
export function useScrollSpy(ids: string[], offset: number, root?: HTMLElement | null) {
  const [active, setActive] = useState<string>(ids[0])
  useEffect(() => {
    const scroller: HTMLElement | Window = root ?? window
    const update = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - (root ? root.getBoundingClientRect().top : 0)
        if (top - offset <= 1) current = id
      }
      setActive(current)
    }
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids.join('|'), offset, root])
  return active
}
