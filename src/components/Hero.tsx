import { forwardRef, useState } from 'react'
import { Icon } from './Icon'
import { heroPhotos } from '../data/photos'
import { listing } from '../data/listing'

interface HeroProps {
  onOpenTour: () => void
  saved: boolean
  onToggleSave: () => void
  onShare: () => void
}

function Img({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  return <img src={src} alt={alt} className={`fade-img${loaded ? ' is-loaded' : ''}`} onLoad={() => setLoaded(true)} draggable={false} />
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(function Hero({ onOpenTour, saved, onToggleSave, onShare }, ref) {
  return (
    <section id="photos" aria-label="Photos" ref={ref}>
      <div className="title-row">
        <h1 className="title-row__title">{listing.title}</h1>
        <div className="title-row__actions">
          <button className="text-action" onClick={onShare}>
            <Icon name="share" size={16} strokeWidth={1.8} />
            <span>Share</span>
          </button>
          <button className="text-action" onClick={onToggleSave} aria-pressed={saved}>
            <span className={`heart${saved ? ' is-saved' : ''}`}>
              <Icon name="heart" size={16} strokeWidth={1.8} fill={saved ? '#ff385c' : 'none'} />
            </span>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
      <div className="hero">
        {heroPhotos.map((p, i) => (
          <button key={p.id} className={`hero__cell hero__cell--${i}`} onClick={onOpenTour} aria-label={`Open photo tour: ${p.alt}`}>
            <Img src={p.src} alt={p.alt} />
            <span className="hero__shade" />
          </button>
        ))}
        <button className="hero__all" onClick={onOpenTour}>
          <Icon name="dots" size={16} />
          <span>Show all photos</span>
        </button>
      </div>
    </section>
  )
})
