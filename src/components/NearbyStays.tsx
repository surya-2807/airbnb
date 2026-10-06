import { useState } from 'react'
import { Icon, StarIcon } from './Icon'
import { nearbyImage, nearbyStays } from '../data/listing'

const PER_PAGE = 5

export function NearbyStays() {
  const pages = Math.ceil(nearbyStays.length / PER_PAGE)
  const [page, setPage] = useState(0)
  return (
    <section className="block block--nearby" aria-labelledby="near-h">
      <div className="nearby__head">
        <h2 className="h-md" id="near-h">More stays nearby</h2>
        <div className="nearby__pager">
          <span aria-live="polite">{page + 1} / {pages}</span>
          <button className="circle-btn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous stays">
            <Icon name="chevron-left" size={12} strokeWidth={2.6} />
          </button>
          <button className="circle-btn" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page === pages - 1} aria-label="Next stays">
            <Icon name="chevron-right" size={12} strokeWidth={2.6} />
          </button>
        </div>
      </div>
      <div className="nearby__viewport">
        <div className="nearby__track" style={{ transform: `translateX(calc(${-page * 100}% - ${page * 16}px))` }}>
          {nearbyStays.map((s, i) => (
            <a className="stay" href="#/" key={s.id} onClick={(e) => e.preventDefault()} tabIndex={Math.floor(i / PER_PAGE) === page ? 0 : -1}>
              <div className="stay__img"><img src={nearbyImage(s)} alt="" /></div>
              <div className="stay__title">{s.title}</div>
              <div className="stay__meta">{s.price} <span className="stay__star"><StarIcon size={10} /> {s.rating}</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
