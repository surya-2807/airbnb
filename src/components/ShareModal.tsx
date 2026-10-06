import { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { Icon } from './Icon'
import { listing } from '../data/listing'
import { heroPhotos } from '../data/photos'

export function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + window.location.pathname)
    } catch {
      /* clipboard may be unavailable (insecure context); still show feedback */
    }
    setCopied(true)
  }
  return (
    <Modal open={open} onClose={onClose} title="Share this place" size="sm">
      <div className="share-preview">
        <img src={heroPhotos[0].src} alt="" />
        <div>
          <div className="share-preview__t">{listing.title}</div>
          <div className="muted-14">{listing.subtitle} · 1 bedroom · 1 bed · 1 bathroom</div>
        </div>
      </div>
      <div className="share-actions">
        <button className="share-action" onClick={copy}><Icon name="share" size={22} strokeWidth={1.6} /><span>{copied ? 'Link copied' : 'Copy link'}</span></button>
        <button className="share-action" onClick={onClose}><Icon name="chat" size={22} strokeWidth={1.6} /><span>Messages</span></button>
        <button className="share-action" onClick={onClose}><Icon name="user" size={22} strokeWidth={1.6} /><span>Email</span></button>
      </div>
      <div className="sr-only" role="status">{copied ? 'Link copied to clipboard' : ''}</div>
    </Modal>
  )
}
