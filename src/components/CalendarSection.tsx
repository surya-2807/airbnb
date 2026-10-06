import { useState } from 'react'
import { Calendar } from './Calendar'
import { Icon } from './Icon'
import { isBlocked, isBooked, type Booking } from '../hooks/useBooking'
import { formatShort } from '../utils/date'

export function CalendarSection({ booking }: { booking: Booking }) {
  const { checkIn, checkOut, nights } = booking
  const [tip, setTip] = useState(false)
  return (
    <section id="calendar" className="block block--cal" aria-labelledby="cal-h">
      <h2 className="h-md" id="cal-h">
        {nights > 0 ? `${nights} night${nights === 1 ? '' : 's'} in Candolim` : checkIn ? 'Select checkout date' : 'Select check-in date'}
      </h2>
      <p className="muted-14 cal-range">
        {checkIn && checkOut ? `${formatShort(checkIn).replace(/(\d+ \w+) (\d+)/, '$1 $2')} - ${formatShort(checkOut)}` : 'Add your travel dates for exact pricing'}
      </p>
      <Calendar idPrefix="page-cal" checkIn={checkIn} checkOut={checkOut} onSelect={booking.select} isBooked={isBooked} isDisabled={isBlocked} initialMonth={checkIn ?? new Date()} />
      <div className="cal-foot">
        <div className="cal-foot__kbd">
          <button className="icon-plain" aria-label="Keyboard shortcuts" aria-expanded={tip} onClick={() => setTip((t) => !t)}>
            <Icon name="workspace" size={20} strokeWidth={1.4} />
          </button>
          {tip && (
            <div className="tip" role="note">
              Arrow keys move between days. Enter selects a date. Page Up / Page Down change month.
            </div>
          )}
        </div>
        <button className="link-plain" onClick={booking.clear}>Clear dates</button>
      </div>
    </section>
  )
}
