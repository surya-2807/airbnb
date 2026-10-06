import { useRef, useState } from 'react'
import { Icon } from './Icon'
import { Calendar } from './Calendar'
import { GuestsPanel } from './GuestsPanel'
import { ReserveButton } from './ReserveButton'
import { guestSummary, isBlocked, isBooked, type Booking } from '../hooks/useBooking'
import { useOutside } from '../hooks/useOutside'
import { formatShort, formatSlash, inRupees } from '../utils/date'
import { listing } from '../data/listing'

type Panel = 'dates' | 'guests' | null

export function BookingCard({ booking }: { booking: Booking }) {
  const [panel, setPanel] = useState<Panel>(null)
  const [details, setDetails] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useOutside(wrapRef, panel !== null, () => setPanel(null))
  const { checkIn, checkOut, nights, total } = booking

  const cleaning = 1500
  const service = Math.round(total * 0.14)

  const reserve = () => {
    if (!checkIn || !checkOut) {
      setPanel('dates')
      return
    }
    setDetails(true)
  }

  return (
    <aside className="booking" aria-label="Booking">
      <div className="promo">
        <svg className="promo__tag" width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 15.500V6a2 2 0 0 1 2-2h9.500L28 16.500a2 2 0 0 1 0 2.800l-8.700 8.700a2 2 0 0 1-2.800 0z" fill="#3d9a4b" />
          <circle cx="10" cy="10" r="2" fill="#fff" />
        </svg>
        <div className="promo__text">
          Get 10% off your next stay.
          <br />
          <a href="#terms" className="link-strong" onClick={(e) => e.preventDefault()}>Terms apply</a>
        </div>
        <button className="btn-soft">Claim</button>
      </div>

      <div className="card" ref={wrapRef}>
        <div className="card__price">
          {nights > 0 ? (
            <>
              <span className="card__amount">{inRupees(total)}</span>
              <span className="card__for">for {nights} night{nights === 1 ? '' : 's'}</span>
            </>
          ) : (
            <span className="card__amount card__amount--sm">Add dates for prices</span>
          )}
        </div>

        <div className="fields">
          <button className={`fields__cell fields__cell--in${panel === 'dates' ? ' is-open' : ''}`} onClick={() => setPanel(panel === 'dates' ? null : 'dates')} aria-haspopup="dialog" aria-expanded={panel === 'dates'}>
            <span className="fields__label">Check-in</span>
            <span className="fields__value">{checkIn ? formatSlash(checkIn) : 'Add date'}</span>
          </button>
          <button className={`fields__cell fields__cell--out${panel === 'dates' ? ' is-open' : ''}`} onClick={() => setPanel(panel === 'dates' ? null : 'dates')} aria-haspopup="dialog" aria-expanded={panel === 'dates'}>
            <span className="fields__label">Checkout</span>
            <span className="fields__value">{checkOut ? formatSlash(checkOut) : 'Add date'}</span>
          </button>
          <button className={`fields__cell fields__cell--guests${panel === 'guests' ? ' is-open' : ''}`} onClick={() => setPanel(panel === 'guests' ? null : 'guests')} aria-haspopup="dialog" aria-expanded={panel === 'guests'}>
            <span className="fields__label">Guests</span>
            <span className="fields__value">{guestSummary(booking.guests)}</span>
            <span className={`fields__chev${panel === 'guests' ? ' is-flipped' : ''}`}><Icon name="chevron-down" size={16} strokeWidth={2} /></span>
          </button>

          {panel === 'guests' && (
            <div className="popover popover--guests" role="dialog" aria-label="Guests">
              <GuestsPanel guests={booking.guests} onChange={booking.setGuests} />
              <button className="popover__close" onClick={() => setPanel(null)}>Close</button>
            </div>
          )}
        </div>

        {panel === 'dates' && (
          <div className="popover popover--dates" role="dialog" aria-label="Select dates">
            <div className="popover__head">
              <div>
                <div className="popover__title">{nights > 0 ? `${nights} night${nights === 1 ? '' : 's'}` : 'Select dates'}</div>
                <div className="popover__sub">
                  {checkIn && checkOut ? `${formatShort(checkIn)} – ${formatShort(checkOut)}` : 'Add your travel dates for exact pricing'}
                </div>
              </div>
            </div>
            <Calendar idPrefix="card-cal" checkIn={checkIn} checkOut={checkOut} onSelect={booking.select} isBooked={isBooked} isDisabled={isBlocked} initialMonth={checkIn ?? new Date()} />
            <div className="popover__foot">
              <button className="link-plain" onClick={booking.clear}>Clear dates</button>
              <button className="btn-dark" onClick={() => setPanel(null)}>Close</button>
            </div>
          </div>
        )}

        <div className="cancel-note">
          Free cancellation before <strong>17 October</strong>
        </div>

        <ReserveButton onClick={reserve}>{checkIn && checkOut ? 'Reserve' : 'Check availability'}</ReserveButton>
        <p className="card__hint">You won't be charged yet</p>

        {details && nights > 0 && (
          <dl className="breakdown" aria-label="Price details">
            <div><dt><span className="underline">{inRupees(listing.nightly)} x {nights} nights</span></dt><dd>{inRupees(total)}</dd></div>
            <div><dt><span className="underline">Cleaning fee</span></dt><dd>{inRupees(cleaning)}</dd></div>
            <div><dt><span className="underline">Airbnb service fee</span></dt><dd>{inRupees(service)}</dd></div>
            <div className="breakdown__total"><dt>Total before taxes</dt><dd>{inRupees(total + cleaning + service)}</dd></div>
          </dl>
        )}
      </div>

      <button className="report">
        <Icon name="flag" size={14} fill="currentColor" strokeWidth={1.4} />
        <span>Report this listing</span>
      </button>
    </aside>
  )
}
