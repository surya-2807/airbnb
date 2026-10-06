import { Icon } from './Icon'
import { Avatar } from './Avatar'
import { coHosts, listing } from '../data/listing'

const HUES = [340, 25, 45, 10, 35, 50, 340, 220]

export function HostSection() {
  const h = listing.host
  return (
    <section className="block block--hostsec" aria-labelledby="host-h">
      <h2 className="h-md" id="host-h">Meet your host</h2>
      <div className="host-grid">
        <div>
          <div className="host-card">
            <div className="host-card__who">
              <div className="avatar avatar--host avatar--lg"><span>MIRASHYA</span>
                <span className="verified" aria-label="Identity verified">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.500 8.500l3 3 6-6.500" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <div className="host-card__name">{h.name}</div>
              <div className="host-card__role">Host</div>
            </div>
            <dl className="host-card__stats">
              <div><dd>{h.reviews.toLocaleString('en-IN')}</dd><dt>Reviews</dt></div>
              <div><dd>{h.rating}★</dd><dt>Rating</dt></div>
              <div><dd>{h.years}</dd><dt>Years hosting</dt></div>
            </dl>
          </div>
          <ul className="host-facts">
            <li><Icon name="balloon" size={24} strokeWidth={1.4} /> Born in the 80s</li>
            <li><Icon name="graduation" size={24} strokeWidth={1.4} /> Where I went to school: NICMAR GOA</li>
          </ul>
        </div>
        <div>
          <h3 className="h-sm">Co-Hosts</h3>
          <ul className="cohosts">
            {coHosts.map((c, i) => (
              <li key={c}><Avatar name={c} hue={HUES[i]} size={36} photo={i < 6} /><span>{c}</span></li>
            ))}
          </ul>
          <h3 className="h-sm h-sm--gap">Host details</h3>
          <p className="host-details">Response rate: 100%<br />Responds within an hour</p>
          <button className="btn-soft btn-soft--lg">Message host</button>
          <p className="protect"><Icon name="shield" size={22} strokeWidth={1.4} /> To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
        </div>
      </div>
    </section>
  )
}
