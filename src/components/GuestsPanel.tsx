import { listing } from '../data/listing'
import type { Guests } from '../hooks/useBooking'
import { Icon } from './Icon'

const ROWS: { k: keyof Guests; title: string; sub: string; min: number }[] = [
  { k: 'adults', title: 'Adults', sub: 'Age 13+', min: 1 },
  { k: 'children', title: 'Children', sub: 'Ages 2–12', min: 0 },
  { k: 'infants', title: 'Infants', sub: 'Under 2', min: 0 },
  { k: 'pets', title: 'Pets', sub: 'Pets are allowed', min: 0 },
]

export function GuestsPanel({ guests, onChange }: { guests: Guests; onChange: (g: Guests) => void }) {
  const total = guests.adults + guests.children
  const canAdd = (k: keyof Guests) => {
    if (k === 'adults' || k === 'children') return total < listing.maxGuests
    if (k === 'infants') return guests.infants < 5
    return guests.pets < 2
  }
  const set = (k: keyof Guests, delta: number) => {
    const next = { ...guests, [k]: guests[k] + delta }
    // Adding a child/infant implies at least one adult.
    if ((k === 'children' || k === 'infants') && delta > 0 && next.adults < 1) next.adults = 1
    onChange(next)
  }
  return (
    <div className="guests">
      {ROWS.map((r) => (
        <div className="guests__row" key={r.k}>
          <div>
            <div className="guests__title" id={`g-${r.k}`}>{r.title}</div>
            <div className="guests__sub">{r.sub}</div>
          </div>
          <div className="stepper" role="group" aria-labelledby={`g-${r.k}`}>
            <button className="stepper__btn" onClick={() => set(r.k, -1)} disabled={guests[r.k] <= r.min} aria-label={`Decrease number of ${r.title.toLowerCase()}`}>
              <Icon name="minus" size={14} strokeWidth={2} />
            </button>
            <span className="stepper__val" aria-live="polite">{guests[r.k]}</span>
            <button className="stepper__btn" onClick={() => set(r.k, 1)} disabled={!canAdd(r.k)} aria-label={`Increase number of ${r.title.toLowerCase()}`}>
              <Icon name="plus" size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}
      <p className="guests__note">
        This place has a maximum of {listing.maxGuests} guests, not including infants. If you're bringing more than 2 pets, please let your host know.
      </p>
    </div>
  )
}
