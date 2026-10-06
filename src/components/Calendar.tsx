import { useEffect, useMemo, useRef, useState } from 'react'
import { MONTHS, addDays, daysBetween, key, monthGrid, sameDay, startOfDay } from '../utils/date'
import { Icon } from './Icon'

export interface CalendarProps {
  checkIn: Date | null
  checkOut: Date | null
  onSelect: (d: Date) => void
  isBooked: (d: Date) => boolean
  isDisabled: (d: Date) => boolean
  /** First visible month. */
  initialMonth: Date
  months?: 1 | 2
  idPrefix?: string
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function Calendar({ checkIn, checkOut, onSelect, isBooked, isDisabled, initialMonth, months = 2, idPrefix = 'cal' }: CalendarProps) {
  const [view, setView] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1))
  const [hover, setHover] = useState<Date | null>(null)
  const [focusDate, setFocusDate] = useState<Date>(checkIn ?? initialMonth)
  const gridRef = useRef<HTMLDivElement>(null)
  const shouldFocus = useRef(false)

  const shown = useMemo(
    () => Array.from({ length: months }, (_, i) => new Date(view.getFullYear(), view.getMonth() + i, 1)),
    [view, months],
  )

  const unavailable = (d: Date) => isBooked(d) || isDisabled(d)

  const inRange = (d: Date) => {
    const end = checkOut ?? (checkIn && hover && hover > checkIn ? hover : null)
    return !!checkIn && !!end && d > checkIn && d < end
  }

  const moveFocus = (d: Date) => {
    setFocusDate(d)
    shouldFocus.current = true
    const first = shown[0]
    const last = new Date(shown[shown.length - 1].getFullYear(), shown[shown.length - 1].getMonth() + 1, 0)
    if (d < first) setView(new Date(d.getFullYear(), d.getMonth(), 1))
    else if (d > last) setView(new Date(d.getFullYear(), d.getMonth() - (months - 1), 1))
  }

  useEffect(() => {
    if (!shouldFocus.current) return
    shouldFocus.current = false
    gridRef.current?.querySelector<HTMLElement>(`[data-key="${key(focusDate)}"]`)?.focus()
  })

  const onKeyDown = (e: React.KeyboardEvent, d: Date) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
    if (e.key in map) {
      e.preventDefault()
      moveFocus(addDays(d, map[e.key]))
    } else if (e.key === 'Home') {
      e.preventDefault()
      moveFocus(addDays(d, -d.getDay()))
    } else if (e.key === 'End') {
      e.preventDefault()
      moveFocus(addDays(d, 6 - d.getDay()))
    } else if (e.key === 'PageDown') {
      e.preventDefault()
      moveFocus(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()))
    } else if (e.key === 'PageUp') {
      e.preventDefault()
      moveFocus(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()))
    }
  }

  const today = startOfDay(new Date())
  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <div className="cal" ref={gridRef}>
      <button
        type="button"
        className="cal__nav cal__nav--prev"
        onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
        aria-label="Move backward to switch to the previous month."
        disabled={!canGoBack}
      >
        <Icon name="chevron-left" size={16} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        className="cal__nav cal__nav--next"
        onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
        aria-label="Move forward to switch to the next month."
      >
        <Icon name="chevron-right" size={16} strokeWidth={2.2} />
      </button>
      <div className="cal__months">
        {shown.map((m) => {
          const cells = monthGrid(m.getFullYear(), m.getMonth())
          const labelId = `${idPrefix}-${m.getFullYear()}-${m.getMonth()}`
          return (
            <div className="cal__month" key={labelId} role="grid" aria-labelledby={labelId}>
              <div className="cal__title" id={labelId} aria-live="polite">
                {MONTHS[m.getMonth()]} {m.getFullYear()}
              </div>
              <div className="cal__weekdays" role="row">
                {WEEKDAYS.map((w, i) => (
                  <span key={i} role="columnheader">{w}</span>
                ))}
              </div>
              <div className="cal__days">
                {cells.map((d, i) => {
                  if (!d) return <span key={`b${i}`} className="cal__blank" role="gridcell" />
                  const booked = isBooked(d)
                  const disabled = unavailable(d)
                  const isStart = sameDay(d, checkIn)
                  const isEnd = sameDay(d, checkOut)
                  const range = inRange(d)
                  const cls = [
                    'cal__day',
                    booked ? 'is-booked' : disabled ? 'is-disabled' : '',
                    isStart || isEnd ? 'is-selected' : '',
                    range ? 'is-range' : '',
                    isStart && (checkOut || (hover && checkIn && hover > checkIn)) ? 'is-start' : '',
                    isEnd ? 'is-end' : '',
                    sameDay(d, today) ? 'is-today' : '',
                  ].join(' ')
                  const label = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}${booked ? '. Unavailable' : ''}${isStart ? '. Selected check-in date' : ''}${isEnd ? '. Selected checkout date' : ''}`
                  return (
                    <div key={key(d)} className="cal__cell" role="gridcell" aria-selected={isStart || isEnd || range}>
                      <button
                        type="button"
                        className={cls}
                        data-key={key(d)}
                        aria-label={label}
                        aria-disabled={disabled}
                        tabIndex={sameDay(d, focusDate) ? 0 : -1}
                        onClick={() => !disabled && (setFocusDate(d), onSelect(d))}
                        onMouseEnter={() => setHover(d)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setFocusDate(d)}
                        onKeyDown={(e) => onKeyDown(e, d)}
                      >
                        <span>{d.getDate()}</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function nightsLabel(checkIn: Date | null, checkOut: Date | null) {
  if (!checkIn || !checkOut) return 0
  return daysBetween(checkIn, checkOut)
}
