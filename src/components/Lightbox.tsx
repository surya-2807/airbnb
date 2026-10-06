import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { photos } from '../data/photos'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { usePresence } from '../hooks/usePresence'

interface Props {
  index: number | null
  onIndex: (i: number) => void
  onClose: () => void
  onShare: () => void
  saved: boolean
  onToggleSave: () => void
}

export function Lightbox({ index, onIndex, onClose, onShare, saved, onToggleSave }: Props) {
  const open = index !== null
  const { mounted, closing } = usePresence(open, 200)
  const ref = useRef<HTMLDivElement>(null)
  const last = useRef(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [loaded, setLoaded] = useState(false)
  if (index !== null) last.current = index
  const cur = index ?? last.current

  useFocusTrap(ref, open && mounted, onClose)

  const go = useCallback(
    (delta: number) => {
      setDir(delta > 0 ? 1 : -1)
      setLoaded(false)
      onIndex((cur + delta + photos.length) % photos.length)
    },
    [cur, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('.modal-root')) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  // Keep the active thumbnail in view.
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('.lb__thumb.is-active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [cur, mounted])

  // Preload neighbours for instant navigation.
  useEffect(() => {
    if (!open) return
    ;[cur - 1, cur + 1].forEach((i) => {
      const img = new Image()
      img.src = photos[(i + photos.length) % photos.length].src
    })
  }, [cur, open])

  if (!mounted) return null
  const photo = photos[cur]

  return (
    <div ref={ref} className={`lb${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={`Photo ${cur + 1} of ${photos.length}`} tabIndex={-1}>
      <div className="lb__bar">
        <button className="lb__btn" onClick={onClose} aria-label="Close photo viewer"><Icon name="close" size={18} strokeWidth={2} /></button>
        <div className="lb__count" aria-live="polite">{cur + 1} / {photos.length}</div>
        <div className="lb__right">
          <button className="lb__btn lb__btn--text" onClick={onShare}><Icon name="share" size={16} strokeWidth={1.8} /><span>Share</span></button>
          <button className="lb__btn lb__btn--text" onClick={onToggleSave} aria-pressed={saved}>
            <span className={`heart${saved ? ' is-saved' : ''}`}><Icon name="heart" size={16} strokeWidth={1.8} fill={saved ? '#ff385c' : 'none'} /></span>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="lb__stage">
        <button className="lb__arrow lb__arrow--prev" onClick={() => go(-1)} aria-label="Previous photo"><Icon name="chevron-left" size={18} strokeWidth={2.4} /></button>
        <figure className="lb__figure">
          <img
            key={photo.id}
            className={`lb__img lb__img--${dir > 0 ? 'next' : 'prev'}${loaded ? ' is-loaded' : ''}`}
            src={photo.src}
            alt={photo.alt}
            onLoad={() => setLoaded(true)}
            draggable={false}
          />
          <figcaption className="lb__caption">{photo.roomName}</figcaption>
        </figure>
        <button className="lb__arrow lb__arrow--next" onClick={() => go(1)} aria-label="Next photo"><Icon name="chevron-right" size={18} strokeWidth={2.4} /></button>
      </div>

      <div className="lb__thumbs" role="tablist" aria-label="All photos">
        {photos.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === cur}
            aria-label={`Go to photo ${i + 1}: ${p.roomName}`}
            className={`lb__thumb${i === cur ? ' is-active' : ''}`}
            onClick={() => {
              setDir(i > cur ? 1 : -1)
              setLoaded(false)
              onIndex(i)
            }}
          >
            <img src={p.src} alt="" draggable={false} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
