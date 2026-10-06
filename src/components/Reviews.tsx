import { useRef, useState } from 'react'
import { Icon, Laurel, StarIcon } from './Icon'
import { Avatar } from './Avatar'
import { Modal } from './Modal'
import { categoryScores, listing, ratingBreakdown, reviewTags, reviews, type Review } from '../data/listing'

function Stars() {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} size={9} />)}
    </span>
  )
}

function ReviewItem({ r, expandable = true }: { r: Review; expandable?: boolean }) {
  const [open, setOpen] = useState(false)
  const long = r.text.length > 150
  return (
    <article className="review">
      <header className="review__head">
        <Avatar name={r.name} hue={r.hue} size={40} photo={r.photo} />
        <div>
          <div className="review__name">{r.name}</div>
          <div className="review__since">{r.since}</div>
        </div>
      </header>
      <div className="review__meta">
        <Stars /> <span aria-hidden="true">·</span> <span>{r.when}</span>
        <span className="sr-only">Rated 5 out of 5</span>
      </div>
      <p className={`review__text${long && !open && expandable ? ' is-clamped' : ''}`}>{r.text}</p>
      {long && expandable && (
        <button className="show-more show-more--sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span>{open ? 'Show less' : 'Show more'}</span>
        </button>
      )}
    </article>
  )
}

function Summary() {
  return (
    <div className="metrics" role="group" aria-label="Rating summary">
      <div className="metrics__overall">
        <div className="metrics__label">Overall rating</div>
        <ol className="bars" aria-label="Rating distribution">
          {[5, 4, 3, 2, 1].map((n) => (
            <li key={n}>
              <span>{n}</span>
              <span className="bars__track"><span className="bars__fill" style={{ width: `${ratingBreakdown[n] * 100}%` }} /></span>
            </li>
          ))}
        </ol>
      </div>
      {categoryScores.map((c) => (
        <div className="metrics__cell" key={c.label}>
          <div className="metrics__label">{c.label}</div>
          <div className="metrics__score">{c.score}</div>
          <Icon name={c.icon} size={34} strokeWidth={1.3} />
        </div>
      ))}
    </div>
  )
}

export function Reviews({ modalOpen, setModalOpen }: { modalOpen: boolean; setModalOpen: (o: boolean) => void }) {
  const chipsRef = useRef<HTMLDivElement>(null)
  return (
    <section id="reviews" className="block block--reviews" aria-labelledby="rev-h">
      <h2 className="sr-only" id="rev-h">Reviews</h2>
      <div className="rev-hero">
        <div className="rev-hero__score">
          <Laurel size={64} />
          <span>{listing.rating}</span>
          <Laurel size={64} flip />
        </div>
        <div className="rev-hero__title">Guest favourite</div>
        <p className="rev-hero__copy">This home is a guest favourite based on ratings, reviews and reliability</p>
        <a className="link-strong" href="#how-reviews-work" onClick={(e) => e.preventDefault()}>How reviews work</a>
      </div>

      <Summary />

      <div className="chips" ref={chipsRef} role="list" aria-label="Review topics">
        {reviewTags.map((t) => (
          <button className="chip" role="listitem" key={t.label}>
            <span aria-hidden="true">{t.emoji}</span>
            <strong>{t.label}</strong>
            <span className="chip__n">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="review-grid">
        {reviews.slice(0, 6).map((r) => <ReviewItem key={r.id} r={r} />)}
      </div>
      <button className="btn-outline" onClick={() => setModalOpen(true)} aria-haspopup="dialog">
        Show all {listing.reviewCount} reviews
      </button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${listing.rating} · ${listing.reviewCount} reviews`} size="lg">
        <Summary />
        <div className="review-list">
          {reviews.map((r) => <ReviewItem key={r.id} r={r} />)}
        </div>
      </Modal>
    </section>
  )
}
