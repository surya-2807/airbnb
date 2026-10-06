import type { ButtonHTMLAttributes } from 'react'

/** Reserve CTA with the pointer-tracking gradient used on the reference. */
export function ReserveButton({ className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`reserve ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      }}
    >
      <span>{children}</span>
    </button>
  )
}
