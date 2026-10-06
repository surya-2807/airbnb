import { useState } from 'react'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { thingsToKnow } from '../data/listing'

export function ThingsToKnow() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="block block--know" aria-labelledby="know-h">
      <h2 className="h-md" id="know-h">Things to know</h2>
      <div className="know">
        {thingsToKnow.map((t, i) => (
          <div key={t.title}>
            <Icon name={t.icon} size={26} strokeWidth={1.4} />
            <h3 className="know__h">{t.title}</h3>
            {t.lines.map((l) => <p className="know__p" key={l}>{l}</p>)}
            <button className="link-strong link-strong--sm" onClick={() => setOpen(i)} aria-haspopup="dialog">Learn more</button>
          </div>
        ))}
      </div>
      <Modal open={open !== null} onClose={() => setOpen(null)} title={open !== null ? thingsToKnow[open].modalTitle : ''} size="sm">
        <p className="modal__text">{open !== null ? thingsToKnow[open].modalBody : ''}</p>
      </Modal>
    </section>
  )
}
