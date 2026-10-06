/**
 * Placeholder photo generator.
 * The original listing photos were not supplied, so each photo is a labelled SVG
 * (3:2). To use real photos, replace `src` on the entries in `photos.ts`.
 */
interface Palette {
  top: string
  bottom: string
  accent: string
}

const PALETTES: Record<string, Palette> = {
  'Living room 1': { top: '#f2dfc0', bottom: '#b8641f', accent: '#7a3b12' },
  'Living room 2': { top: '#9a9a94', bottom: '#4c4c4a', accent: '#d9b98a' },
  'Full kitchen': { top: '#f0d9a8', bottom: '#9a4b1c', accent: '#2b2b2b' },
  Bedroom: { top: '#f4e8d2', bottom: '#8a4a26', accent: '#c9a06a' },
  'Full bathroom': { top: '#b9aa96', bottom: '#5b4d40', accent: '#e8ded0' },
  Gym: { top: '#d9d9d6', bottom: '#5a4a3c', accent: '#2c2c2c' },
  Exterior: { top: '#a9c8e0', bottom: '#5d8a44', accent: '#d9603b' },
  Pool: { top: '#e9e4dc', bottom: '#3aa0d8', accent: '#c9b8a2' },
  'Additional photos': { top: '#8f8f8a', bottom: '#4a4038', accent: '#e0c08a' },
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, v + amt))
  const r = c((n >> 16) & 255)
  const g = c((n >> 8) & 255)
  const b = c(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

export function placeholderPhoto(room: string, index: number, total: number, w = 900, h = 600): string {
  const p = PALETTES[room] ?? PALETTES['Living room 1']
  const jitter = (index * 17) % 40 - 20
  const top = shade(p.top, jitter)
  const bottom = shade(p.bottom, -jitter)
  const horizon = 0.52 + ((index * 7) % 10) / 100
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect y="${h * horizon}" width="${w}" height="${h * (1 - horizon)}" fill="${bottom}" opacity=".55"/>
<rect x="${w * (0.1 + (index % 3) * 0.08)}" y="${h * 0.12}" width="${w * 0.22}" height="${h * 0.34}" rx="6" fill="${p.accent}" opacity=".28"/>
<rect x="${w * 0.42}" y="${h * 0.5}" width="${w * 0.4}" height="${h * 0.18}" rx="14" fill="${p.accent}" opacity=".42"/>
<text x="50%" y="${h * 0.9}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#fff" fill-opacity=".85">${room} · ${index + 1}/${total}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function placeholderSquare(seed: string, hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},35%,72%)"/><stop offset="1" stop-color="hsl(${(hue + 30) % 360},40%,38%)"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><rect x="60" y="230" width="280" height="90" rx="14" fill="#fff" opacity=".35"/><rect x="250" y="60" width="90" height="120" rx="6" fill="#fff" opacity=".22"/><title>${seed}</title></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
