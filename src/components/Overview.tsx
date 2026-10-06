import { useState } from 'react'
import { Icon, Laurel, StarIcon } from './Icon'
import { descriptionOriginal, descriptionTranslated, highlights, listing, sleeping } from '../data/listing'
import { photos, photoIndexById } from '../data/photos'

export function Overview({ onOpenReviews }: { onOpenReviews: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [original, setOriginal] = useState(false)
  return (
    <>
      <div className="block block--head">
        <h2 className="h-lg">{listing.subtitle}</h2>
        <p className="muted-16">{listing.facts}</p>
      </div>

      <div className="badge" role="group" aria-label="Guest favourite">
        <div className="badge__award">
          <Laurel size={26} />
          <span className="badge__award-text">Guest<br />favourite</span>
          <Laurel size={26} flip />
        </div>
        <p className="badge__copy">One of the most loved homes on Airbnb, according to guests</p>
        <div className="badge__stat">
          <strong>{listing.rating}</strong>
          <span className="badge__stars" aria-label={`${listing.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} size={8} />)}
          </span>
        </div>
        <button className="badge__stat badge__stat--btn" onClick={onOpenReviews} aria-label={`${listing.reviewCount} reviews`}>
          <strong>{listing.reviewCount}</strong>
          <span>Reviews</span>
        </button>
      </div>

      <div className="block block--host">
        <div className="avatar avatar--host" aria-hidden="true"><span>MIRASHYA</span></div>
        <div>
          <div className="host-line">Hosted by {listing.host.name}</div>
          <div className="muted-14">{listing.host.tenure}</div>
        </div>
      </div>

      <div className="block block--rows">
        {highlights.map((h) => (
          <div className="feature" key={h.title}>
            <Icon name={h.icon} size={26} strokeWidth={1.5} />
            <div>
              <div className="feature__title">{h.title}</div>
              <div className="feature__text">{h.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="block block--desc">
        <div className="translate-note">
          {original ? 'Showing original.' : 'Some info has been automatically translated.'}{' '}
          <button className="link-strong" onClick={() => setOriginal((o) => !o)}>{original ? 'Show translation' : 'Show original'}</button>
        </div>
        <p className={`desc${expanded ? ' is-open' : ''}`} id="desc-text" lang={original ? 'hi' : 'en'}>
          {original ? descriptionOriginal : descriptionTranslated}
        </p>
        <button className="show-more" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded} aria-controls="desc-text">
          <span>{expanded ? 'Show less' : 'Show more'}</span>
          <Icon name="chevron-right" size={12} strokeWidth={2.4} />
        </button>
      </div>

      <div className="block block--sleep">
        <h2 className="h-md">Where you'll sleep</h2>
        <div className="sleep">
          {sleeping.map((s) => (
            <div className="sleep__card" key={s.room}>
              <img src={photos[photoIndexById.get(s.photoId)!].src} alt={`${s.room}`} />
              <div className="sleep__room">{s.room}</div>
              <div className="sleep__bed">{s.bed}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
