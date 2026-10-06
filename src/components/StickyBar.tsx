import { ReserveButton } from './ReserveButton'
import { StarIcon } from './Icon'
import { inRupees } from '../utils/date'
import { listing } from '../data/listing'
import type { Booking } from '../hooks/useBooking'

export const TABS = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
]

interface Props {
  visible: boolean
  active: string
  booking: Booking
  onNavigate: (id: string) => void
  onReserve: () => void
}

export function StickyBar({ visible, active, booking, onNavigate, onReserve }: Props) {
  return (
    <div className={`sticky-bar${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-bar__inner">
        <nav aria-label="Page sections" className="sticky-bar__tabs">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              tabIndex={visible ? 0 : -1}
              className={`sticky-bar__tab${active === t.id ? ' is-active' : ''}`}
              aria-current={active === t.id ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(t.id)
              }}
            >
              <span>{t.label}</span>
            </a>
          ))}
        </nav>
        <div className="sticky-bar__right">
          <div className="sticky-bar__price">
            {booking.nights > 0 ? (
              <>
                <div><strong>{inRupees(booking.total)}</strong> for {booking.nights} nights</div>
              </>
            ) : (
              <div><strong>Add dates</strong> for prices</div>
            )}
            <div className="sticky-bar__rating">
              <StarIcon size={10} /> {listing.rating} · {listing.reviewCount} reviews
            </div>
          </div>
          <ReserveButton className="reserve--sm" tabIndex={visible ? 0 : -1} onClick={onReserve}>Reserve</ReserveButton>
        </div>
      </div>
    </div>
  )
}
