import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from './Icon'
import { photos, rooms, photoIndexById, type Photo } from '../data/photos'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { usePresence } from '../hooks/usePresence'
import { useScrollLock } from '../hooks/useScrollLock'
import { useScrollSpy } from '../hooks/useScrollSpy'

interface Props {
  open: boolean
  onClose: () => void
  onOpenPhoto: (index: number) => void
  onShare: () => void
  saved: boolean
  onToggleSave: () => void
  /** Suspend focus trapping while the lightbox (a child overlay) is open. */
  suspended: boolean
}

function Tile({ photo, onClick, className = '' }: { photo: Photo; onClick: () => void; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <button className={`tour-photo ${className}`} onClick={onClick} aria-label={`View photo: ${photo.alt}`}>
      <img src={photo.src} alt="" className={`fade-img${loaded ? ' is-loaded' : ''}`} onLoad={() => setLoaded(true)} loading="lazy" draggable={false} />
    </button>
  )
}

export function PhotoTour({ open, onClose, onOpenPhoto, onShare, saved, onToggleSave, suspended }: Props) {
  const { mounted, closing } = usePresence(open, 240)
  const rootRef = useRef<HTMLDivElement>(null)
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null)
  const ids = useMemo(() => rooms.map((r) => `tour-${r.id}`), [])
  const active = useScrollSpy(ids, 150, scroller)
  const [scrolled, setScrolled] = useState(false)

  useScrollLock(mounted)
  useFocusTrap(rootRef, open && mounted && !suspended, onClose)

  const setScrollRef = useCallback((el: HTMLDivElement | null) => setScroller(el), [])

  useEffect(() => {
    if (!scroller) return
    const on = () => setScrolled(scroller.scrollTop > 4)
    on()
    scroller.addEventListener('scroll', on, { passive: true })
    return () => scroller.removeEventListener('scroll', on)
  }, [scroller])

  if (!mounted) return null

  const goTo = (id: string) => {
    const el = document.getElementById(`tour-${id}`)
    if (!el || !scroller) return
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 110
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div ref={rootRef} className={`tour${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Photo tour" tabIndex={-1}>
      <div className={`tour__bar${scrolled ? ' is-scrolled' : ''}`}>
        <button className="tour__back" onClick={onClose} aria-label="Close photo tour">
          <Icon name="chevron-left" size={16} strokeWidth={2.2} />
        </button>
        <div className="tour__title">Photo tour</div>
        <div className="tour__actions">
          <button className="tour__icon" onClick={onShare} aria-label="Share this place"><Icon name="share" size={18} strokeWidth={1.8} /></button>
          <button className="tour__icon" onClick={onToggleSave} aria-label={saved ? 'Remove from saved' : 'Save to wishlist'} aria-pressed={saved}>
            <span className={`heart${saved ? ' is-saved' : ''}`}><Icon name="heart" size={18} strokeWidth={1.8} fill={saved ? '#ff385c' : 'none'} /></span>
          </button>
        </div>
      </div>

      <div className="tour__scroll" ref={setScrollRef}>
        <div className="tour__inner">
          <nav className="tour__thumbs" aria-label="Rooms">
            {rooms.map((r) => {
              const first = photos[photoIndexById.get(`${r.id}-0`)!]
              return (
                <a
                  key={r.id}
                  href={`#tour-${r.id}`}
                  className={`thumb${active === `tour-${r.id}` && scrolled ? ' is-active' : ''}`}
                  aria-current={active === `tour-${r.id}` ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(r.id)
                  }}
                >
                  <span className="thumb__img"><img src={first.src} alt="" draggable={false} /></span>
                  <span className="thumb__label">{r.name}</span>
                </a>
              )
            })}
          </nav>

          {rooms.map((r) => {
            let cursor = 0
            const roomPhotos = photos.filter((p) => p.roomId === r.id)
            return (
              <section className="tour-room" id={`tour-${r.id}`} key={r.id} aria-labelledby={`tour-h-${r.id}`}>
                <div className="tour-room__text">
                  <h2 id={`tour-h-${r.id}`}>{r.name}</h2>
                  {r.details && <p>{r.details}</p>}
                </div>
                <div className="tour-room__photos">
                  {r.pattern.map((n, rowIdx) => {
                    const row = roomPhotos.slice(cursor, cursor + n)
                    cursor += n
                    return (
                      <div className={`mosaic mosaic--${n}`} key={rowIdx}>
                        {row.map((p) => (
                          <Tile key={p.id} photo={p} onClick={() => onOpenPhoto(photoIndexById.get(p.id)!)} />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
