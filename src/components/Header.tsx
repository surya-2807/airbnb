import { useEffect, useRef, useState } from 'react'
import { AirbnbLogo, Icon } from './Icon'
import { Calendar } from './Calendar'
import { GuestsPanel } from './GuestsPanel'
import { guestSummary, isBlocked, isBooked, type Booking } from '../hooks/useBooking'
import { searchDestinations } from '../data/listing'
import { formatShort } from '../utils/date'
import { heroPhotos } from '../data/photos'

type Field = 'where' | 'when' | 'who' | null

export function Header({ booking }: { booking: Booking }) {
  const [open, setOpen] = useState(false)
  const [field, setField] = useState<Field>('where')
  const [where, setWhere] = useState('')
  const [applied, setApplied] = useState(false)
  const [menu, setMenu] = useState(false)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open && !menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setMenu(false)
      }
    }
    const onDown = (e: MouseEvent) => {
      if (menu && !(e.target as HTMLElement).closest('.header__menu-wrap')) setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open, menu])

  const start = (f: Field) => {
    setField(f)
    setOpen(true)
  }

  const whenLabel = applied && booking.checkIn && booking.checkOut
    ? `${formatShort(booking.checkIn).slice(0, 6)} – ${formatShort(booking.checkOut).slice(0, 6)}`
    : 'Anytime'

  return (
    <header className="header" ref={rootRef} role="banner">
      <div className="header__bar">
        <a className="header__logo" href="#/" aria-label="Airbnb home">
          <AirbnbLogo />
        </a>

        {!open && (
          <button className="pill" onClick={() => start('where')} aria-label="Start your search" aria-expanded={open} aria-haspopup="dialog">
            <img className="pill__thumb" src={heroPhotos[1].src} alt="" />
            <span className="pill__seg pill__seg--strong">{applied && where ? where : 'Anywhere'}</span>
            <span className="pill__div" />
            <span className="pill__seg pill__seg--strong">{whenLabel}</span>
            <span className="pill__div" />
            <span className="pill__seg pill__seg--muted">{applied ? guestSummary(booking.guests) : 'Add guests'}</span>
            <span className="pill__go" aria-hidden="true">
              <Icon name="search" size={14} strokeWidth={2.6} />
            </span>
          </button>
        )}

        <nav className="header__right" aria-label="Account">
          <a className="header__host" href="#/">Become a host</a>
          <button className="round-btn" aria-label="Choose a language and currency">
            <Icon name="globe" size={16} strokeWidth={1.8} />
          </button>
          <div className="header__menu-wrap">
            <button className="round-btn" aria-label="Main menu" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <Icon name="menu" size={16} strokeWidth={2} />
            </button>
            {menu && (
              <div className="menu" role="menu">
                {['Help Centre', 'Become a host', 'Refer a Host', 'Find a co-host', 'Gift cards', 'Log in or sign up'].map((t, i) => (
                  <button key={t} role="menuitem" className={`menu__item${i === 2 || i === 5 ? ' menu__item--split' : ''}`} onClick={() => setMenu(false)}>
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {open && (
        <>
          <div className="search-backdrop" onMouseDown={() => setOpen(false)} />
          <div className="search-panel" role="dialog" aria-label="Search stays">
            <div className="search-panel__tabs">
              <span className="search-panel__tab is-active">Stays</span>
            </div>
            <div className="search-bar">
              <div className={`search-bar__field${field === 'where' ? ' is-active' : ''}`} onClick={() => setField('where')}>
                <span className="search-bar__label">Where</span>
                <input
                  className="search-bar__input"
                  placeholder="Search destinations"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  onFocus={() => setField('where')}
                  aria-label="Where"
                  autoFocus
                />
              </div>
              <button className={`search-bar__field${field === 'when' ? ' is-active' : ''}`} onClick={() => setField('when')}>
                <span className="search-bar__label">Check in</span>
                <span className="search-bar__value">{booking.checkIn ? formatShort(booking.checkIn) : 'Add dates'}</span>
              </button>
              <button className={`search-bar__field${field === 'when' ? ' is-active' : ''}`} onClick={() => setField('when')}>
                <span className="search-bar__label">Check out</span>
                <span className="search-bar__value">{booking.checkOut ? formatShort(booking.checkOut) : 'Add dates'}</span>
              </button>
              <button className={`search-bar__field search-bar__field--who${field === 'who' ? ' is-active' : ''}`} onClick={() => setField('who')}>
                <span className="search-bar__label">Who</span>
                <span className="search-bar__value">{guestSummary(booking.guests)}</span>
              </button>
              <button className="search-bar__go" onClick={() => { setApplied(true); setOpen(false) }}>
                <Icon name="search" size={16} strokeWidth={2.6} />
                <span>Search</span>
              </button>
            </div>

            {field === 'where' && (
              <div className="search-drop search-drop--where">
                <div className="search-drop__title">Suggested destinations</div>
                {searchDestinations
                  .filter((d) => d.name.toLowerCase().includes(where.toLowerCase()))
                  .map((d) => (
                    <button key={d.name} className="dest" onClick={() => { setWhere(d.name); setField('when') }}>
                      <span className="dest__icon"><Icon name="map" size={22} /></span>
                      <span>
                        <span className="dest__name">{d.name}</span>
                        <span className="dest__sub">{d.sub}</span>
                      </span>
                    </button>
                  ))}
              </div>
            )}
            {field === 'when' && (
              <div className="search-drop search-drop--when">
                <Calendar
                  idPrefix="search-cal"
                  checkIn={booking.checkIn}
                  checkOut={booking.checkOut}
                  onSelect={booking.select}
                  isBooked={isBooked}
                  isDisabled={isBlocked}
                  initialMonth={booking.checkIn ?? new Date()}
                />
              </div>
            )}
            {field === 'who' && (
              <div className="search-drop search-drop--who">
                <GuestsPanel guests={booking.guests} onChange={booking.setGuests} />
              </div>
            )}
          </div>
        </>
      )}
    </header>
  )
}
