import { useCallback, useMemo, useState } from 'react'
import { addDays, daysBetween, startOfDay } from '../utils/date'
import { listing } from '../data/listing'

export interface Guests {
  adults: number
  children: number
  infants: number
  pets: number
}

const BOOKED = [new Date(2026, 10, 18), new Date(2026, 10, 19), new Date(2026, 10, 20), new Date(2026, 10, 21)]
const BLOCKED = [new Date(2026, 10, 22), new Date(2026, 10, 23), new Date(2026, 10, 29), new Date(2026, 10, 30)]
const same = (a: Date, b: Date) => a.getTime() === b.getTime()

export const isBooked = (d: Date) => BOOKED.some((b) => same(b, d))
export const isBlocked = (d: Date) => d < startOfDay(new Date()) || BLOCKED.some((b) => same(b, d))

export function guestSummary(g: Guests) {
  const total = g.adults + g.children
  const parts = [`${total} guest${total === 1 ? '' : 's'}`]
  if (g.infants) parts.push(`${g.infants} infant${g.infants === 1 ? '' : 's'}`)
  if (g.pets) parts.push(`${g.pets} pet${g.pets === 1 ? '' : 's'}`)
  return parts.join(', ')
}

export function useBooking() {
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18))
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 23))
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, infants: 0, pets: 0 })

  const select = useCallback(
    (d: Date) => {
      if (!checkIn || checkOut) {
        setCheckIn(d)
        setCheckOut(null)
        return
      }
      if (d <= checkIn) {
        setCheckIn(d)
        return
      }
      for (let x = addDays(checkIn, 0); x < d; x = addDays(x, 1)) {
        if (isBooked(x) || (x > checkIn && isBlocked(x))) {
          setCheckIn(d)
          return
        }
      }
      setCheckOut(d)
    },
    [checkIn, checkOut],
  )

  const clear = useCallback(() => {
    setCheckIn(null)
    setCheckOut(null)
  }, [])

  const nights = checkIn && checkOut ? daysBetween(checkIn, checkOut) : 0
  const total = useMemo(() => Math.round(nights * listing.nightly), [nights])

  return { checkIn, checkOut, guests, setGuests, select, clear, nights, total, setRange: (a: Date | null, b: Date | null) => (setCheckIn(a), setCheckOut(b)) }
}

export type Booking = ReturnType<typeof useBooking>
