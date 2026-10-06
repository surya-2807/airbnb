import { useRef, useState } from 'react'
import { Icon } from './Icon'
import { listing, neighbourhoodText } from '../data/listing'

/** Stylised, non-tiled map (exact location is hidden until booking): pan by dragging or arrow keys, zoom via buttons or +/-. */
export function MapSection() {
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [more, setMore] = useState(false)
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

  const clamp = (v: number, z: number) => Math.max(-260 * (z - 1) - 60, Math.min(260 * (z - 1) + 60, v))
  const zoomTo = (z: number) => {
    const nz = Math.max(1, Math.min(3, z))
    setZoom(nz)
    setPos((p) => ({ x: clamp(p.x, nz), y: clamp(p.y, nz) }))
  }

  const onKey = (e: React.KeyboardEvent) => {
    const step = 40
    if (e.key === 'ArrowLeft') setPos((p) => ({ ...p, x: clamp(p.x + step, zoom) }))
    else if (e.key === 'ArrowRight') setPos((p) => ({ ...p, x: clamp(p.x - step, zoom) }))
    else if (e.key === 'ArrowUp') setPos((p) => ({ ...p, y: clamp(p.y + step, zoom) }))
    else if (e.key === 'ArrowDown') setPos((p) => ({ ...p, y: clamp(p.y - step, zoom) }))
    else if (e.key === '+' || e.key === '=') zoomTo(zoom + 0.5)
    else if (e.key === '-') zoomTo(zoom - 0.5)
    else return
    e.preventDefault()
  }

  const grid: JSX.Element[] = []
  for (let i = -10; i <= 30; i++) {
    grid.push(<line key={`v${i}`} x1={i * 60} y1={-400} x2={i * 60} y2={1000} />)
    grid.push(<line key={`h${i}`} x1={-400} y1={i * 60} x2={1600} y2={i * 60} />)
  }

  return (
    <section id="location" className="block block--map" aria-labelledby="loc-h">
      <h2 className="h-md" id="loc-h">Where you'll be</h2>
      <p className="muted-14 map-place">{listing.location}</p>
      <div
        className={`map${drag.current ? ' is-dragging' : ''}`}
        tabIndex={0}
        role="application"
        aria-label="Map showing the approximate area of the listing. Use arrow keys to pan and plus or minus to zoom."
        onKeyDown={onKey}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('.map__ctl')) return
          e.currentTarget.setPointerCapture(e.pointerId)
          drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          setPos({ x: clamp(drag.current.px + e.clientX - drag.current.x, zoom), y: clamp(drag.current.py + e.clientY - drag.current.y, zoom) })
        }}
        onPointerUp={() => (drag.current = null)}
      >
        <div className="map__layer" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})` }}>
          <svg viewBox="0 0 1120 480" preserveAspectRatio="none" aria-hidden="true">
            <rect x="-400" y="-400" width="2000" height="1400" fill="#e9f0e1" />
            <g stroke="#dfe8d4" strokeWidth="2">{grid}</g>
            <polygon points="-400,-400 448,-400 235,880 -400,880" fill="#a9d3ec" />
            <circle cx="280" cy="190" r="50" fill="#d4e6c3" />
            <circle cx="784" cy="300" r="67" fill="#d4e6c3" />
          </svg>
          <div className="map__pin"><Icon name="house-pin" size={26} strokeWidth={1.8} /></div>
        </div>
        <button className="map__ctl map__ctl--search" aria-label="Search this area"><Icon name="search" size={14} strokeWidth={2.2} /></button>
        <div className="map__ctl map__ctl--zoom">
          <button onClick={() => zoomTo(zoom + 0.5)} disabled={zoom >= 3} aria-label="Zoom in"><Icon name="plus" size={16} strokeWidth={2} /></button>
          <button onClick={() => zoomTo(zoom - 0.5)} disabled={zoom <= 1} aria-label="Zoom out"><Icon name="minus" size={16} strokeWidth={2} /></button>
        </div>
      </div>
      <p className="map__note">Exact location will be provided after booking.</p>
      <h3 className="h-sm">Neighbourhood highlights</h3>
      <p className={`desc desc--nb${more ? ' is-open' : ''}`}>
        {neighbourhoodText}
        {more && ' Candolim Beach is a short drive away, with plenty of casual dining and evening entertainment nearby.'}
      </p>
      <button className="show-more" onClick={() => setMore((m) => !m)} aria-expanded={more}>
        <span>{more ? 'Show less' : 'Show more'}</span>
        <Icon name="chevron-right" size={12} strokeWidth={2.4} />
      </button>
    </section>
  )
}
