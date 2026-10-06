import { useState } from 'react'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { amenityGroups, topAmenities } from '../data/listing'

export function Amenities() {
  const [open, setOpen] = useState(false)
  return (
    <section id="amenities" className="block block--amen" aria-labelledby="amen-h">
      <h2 className="h-md" id="amen-h">What this place offers</h2>
      <ul className="amen-grid">
        {topAmenities.map((a) => (
          <li key={a.name} className={`amen${a.missing ? ' is-missing' : ''}`}>
            <Icon name={a.icon} size={26} strokeWidth={1.5} />
            <span>{a.name}</span>
            {a.missing && <span className="sr-only"> — not included</span>}
          </li>
        ))}
      </ul>
      <button className="btn-outline" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Show all 50 amenities
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="What this place offers" size="lg">
        {amenityGroups.map((g) => (
          <section className="amod" key={g.title}>
            <h3 className="amod__h">{g.title}</h3>
            <ul>
              {g.items.map((a) => (
                <li key={g.title + a.name} className={`amod__item${a.missing ? ' is-missing' : ''}`}>
                  <Icon name={a.icon} size={24} strokeWidth={1.5} />
                  <span>{a.name}</span>
                  {a.missing && <span className="sr-only"> — not included</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Modal>
    </section>
  )
}
