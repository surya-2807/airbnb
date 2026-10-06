import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Overview } from './components/Overview'
import { Amenities } from './components/Amenities'
import { CalendarSection } from './components/CalendarSection'
import { BookingCard } from './components/BookingCard'
import { Reviews } from './components/Reviews'
import { MapSection } from './components/MapSection'
import { HostSection } from './components/HostSection'
import { ThingsToKnow } from './components/ThingsToKnow'
import { NearbyStays } from './components/NearbyStays'
import { StickyBar, TABS } from './components/StickyBar'
import { PhotoTour } from './components/PhotoTour'
import { Lightbox } from './components/Lightbox'
import { ShareModal } from './components/ShareModal'
import { useBooking } from './hooks/useBooking'
import { useScrollSpy } from './hooks/useScrollSpy'
import { photos } from './data/photos'

/** Hash routes: #/ (listing), #/photos (photo tour), #/photos/:n (lightbox on photo n, 1-based). */
function parseRoute(hash: string): { tour: boolean; photo: number | null } {
  const m = hash.match(/^#\/photos(?:\/(\d+))?$/)
  if (!m) return { tour: false, photo: null }
  const n = m[1] ? parseInt(m[1], 10) - 1 : null
  return { tour: true, photo: n !== null && n >= 0 && n < photos.length ? n : null }
}

export default function App() {
  const booking = useBooking()
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  const [saved, setSaved] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [reviewsOpen, setReviewsOpen] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  // History bookkeeping: overlays opened from inside the app are *pushed*, so closing them
  // unwinds one entry (Back button == close button). Deep links have nothing to unwind, so they
  // are closed by replacing the hash instead of leaving the site.
  const pushed = useRef({ tour: false, photo: false })
  const go = useCallback((hash: string, replace: boolean) => {
    if (replace) {
      window.history.replaceState(null, '', hash)
      setRoute(parseRoute(hash))
    } else {
      window.location.hash = hash
    }
  }, [])
  const openTour = useCallback(() => {
    pushed.current.tour = true
    go('#/photos', false)
  }, [go])
  const closeTour = useCallback(() => {
    if (pushed.current.tour) {
      pushed.current.tour = false
      window.history.back()
    } else go('#/', true)
  }, [go])
  const openPhoto = useCallback((i: number) => {
    pushed.current.photo = true
    go(`#/photos/${i + 1}`, false)
  }, [go])
  const closePhoto = useCallback(() => {
    if (pushed.current.photo) {
      pushed.current.photo = false
      window.history.back()
    } else go('#/photos', true)
  }, [go])
  // Replace (not push) while flicking through photos so one Back leaves the viewer.
  const setPhoto = useCallback((i: number) => go(`#/photos/${i + 1}`, true), [go])

  // Show the sticky section bar once the hero grid has scrolled out of view.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const on = () => setShowBar(el.getBoundingClientRect().bottom < -80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const tabIds = useMemo(() => TABS.map((t) => t.id), [])
  const active = useScrollSpy(tabIds, 140)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = id === 'photos' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }

  const overlayOpen = route.tour

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
      <div aria-hidden={overlayOpen} {...(overlayOpen ? { inert: '' as unknown as boolean } : {})}>
        <Header booking={booking} />
        <StickyBar
          visible={showBar}
          active={active}
          booking={booking}
          onNavigate={scrollToSection}
          onReserve={() => scrollToSection('calendar')}
        />
        <main id="main" tabIndex={-1} className="page">
          <Hero ref={heroRef} onOpenTour={openTour} saved={saved} onToggleSave={() => setSaved((s) => !s)} onShare={() => setShareOpen(true)} />
          <div className="layout">
            <div className="layout__main">
              <Overview onOpenReviews={() => { setReviewsOpen(true) }} />
              <Amenities />
              <CalendarSection booking={booking} />
            </div>
            <div className="layout__side">
              <BookingCard booking={booking} />
            </div>
          </div>
          <Reviews modalOpen={reviewsOpen} setModalOpen={setReviewsOpen} />
          <MapSection />
          <HostSection />
          <ThingsToKnow />
          <NearbyStays />
        </main>
      </div>

      <PhotoTour
        open={route.tour}
        onClose={closeTour}
        onOpenPhoto={openPhoto}
        onShare={() => setShareOpen(true)}
        saved={saved}
        onToggleSave={() => setSaved((s) => !s)}
        suspended={route.photo !== null || shareOpen}
      />
      <Lightbox index={route.photo} onIndex={setPhoto} onClose={closePhoto} onShare={() => setShareOpen(true)} saved={saved} onToggleSave={() => setSaved((s) => !s)} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  )
}
