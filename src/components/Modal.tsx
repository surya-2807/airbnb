import { useId, useRef, type ReactNode } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { usePresence } from '../hooks/usePresence'
import { useScrollLock } from '../hooks/useScrollLock'
import { Icon } from './Icon'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  /** Hide the visible heading but keep it for screen readers. */
  hideTitle?: boolean
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Modal({ open, onClose, title, hideTitle, size = 'md', children }: ModalProps) {
  const { mounted, closing } = usePresence(open, 220)
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useScrollLock(mounted)
  useFocusTrap(ref, open && mounted, onClose)
  if (!mounted) return null
  return (
    <div className={`modal-root${closing ? ' is-closing' : ''}`}>
      <div className="modal-backdrop" onMouseDown={onClose} />
      <div
        ref={ref}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} strokeWidth={2.2} />
        </button>
        <div className="modal__scroll">
          <h2 id={titleId} className={hideTitle ? 'sr-only' : 'modal__title'}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  )
}
