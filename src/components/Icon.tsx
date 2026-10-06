import type { ReactNode } from 'react'

/** Line icons on a 24x24 grid. Stroke-based so they inherit `currentColor`. */
const P: Record<string, ReactNode> = {
  share: <><path d="M12 3v12" /><path d="M8 7l4-4 4 4" /><path d="M5 11v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" /></>,
  heart: <path d="M12 20.5C5 15 3 11.6 3 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 9 2.2c0 2.8-2 6.2-9 11.7z" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  'chevron-left': <path d="M15 5l-7 7 7 7" />,
  'chevron-right': <path d="M9 5l7 7-7 7" />,
  'chevron-down': <path d="M5 9l7 7 7-7" />,
  'chevron-up': <path d="M5 15l7-7 7 7" />,
  close: <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  flag: <path d="M6 21V4M6 4h11l-2.5 4L17 12H6" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  tag: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.2" /></>,
  'calendar-x': <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4M10 13l4 4M14 13l-4 4" /></>,
  'calendar-check': <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4M9.5 15l2 2 3.5-3.5" /></>,
  'key-search': <><circle cx="10" cy="10" r="6" /><path d="M14.5 14.5L20 20M8 10h4" /></>,
  spray: <><path d="M9 21h6a1 1 0 0 0 1-1v-7l-2-3H10l-2 3v7a1 1 0 0 0 1 1z" /><path d="M11 10V6h3M18 5h.01M19 8h.01M17.5 11h.01" /></>,
  'check-circle': <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></>,
  key: <><circle cx="8" cy="9" r="4" /><path d="M11 12l8 8M16 17l2-2M19 20l2-2" /></>,
  chat: <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />,
  map: <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  wifi: <><path d="M3 9a13 13 0 0 1 18 0M6 12.5a8.5 8.5 0 0 1 12 0M9 16a4 4 0 0 1 6 0" /><circle cx="12" cy="19" r=".8" /></>,
  kitchen: <><path d="M6 3v7a2 2 0 0 0 2 2v9M8 3v6M4 3v6" /><path d="M16 3c-2 1-3 4-3 7 0 1.5 1 2 3 2v9" /></>,
  workspace: <><path d="M3 15h18v4H3zM6 15V9h8v6" /><path d="M16 6l2-3 2 3" /></>,
  car: <><path d="M4 16v-4l2-5h12l2 5v4z" /><path d="M4 16v3h3v-3M17 16v3h3v-3M7 12h10" /></>,
  pool: <><path d="M4 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" /><path d="M4 21c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" /><path d="M8 14V6a2 2 0 0 1 4 0M14 14V6a2 2 0 0 1 4 0M8 10h6" /></>,
  hottub: <><path d="M3 11h18l-2 8H5z" /><path d="M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4M16 3c0 2 2 2 2 4" /></>,
  paw: <><circle cx="6" cy="10" r="1.7" /><circle cx="10" cy="6" r="1.7" /><circle cx="14" cy="6" r="1.7" /><circle cx="18" cy="10" r="1.7" /><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 2-4 1-2 1-4 1-4-1z" /></>,
  camera: <><path d="M3 8h13l5-3v10l-5-3H3z" /><path d="M8 15v4h4" /></>,
  'alarm-off': <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 4l16 16M9 9a4 4 0 0 1 6 4" /></>,
  hairdryer: <><path d="M4 8c0-2 2-3 5-3h6l3 3-3 3H9c-3 0-5-1-5-3z" /><path d="M9 11l-1 9h3l1-9" /></>,
  cleaning: <><rect x="5" y="10" width="8" height="11" rx="1.5" /><path d="M8 10V7h2v3M13 12h4v9h-4M9 5h3" /></>,
  bottle: <><path d="M9 3h4v3l1 1v13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V7l1-1z" /><path d="M8 11h6M8 15h6" /></>,
  hotwater: <><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" /><path d="M8 3v5M12 3v5M16 3v5" /></>,
  washer: <><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="13" r="4.5" /><path d="M7 7h.01M10 7h.01" /></>,
  hanger: <path d="M12 8V6a2 2 0 1 1 2 2l7 9a1 1 0 0 1-1 1.5H4A1 1 0 0 1 3 17l9-7" />,
  bed: <><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></>,
  blinds: <><rect x="4" y="4" width="16" height="12" rx="1" /><path d="M8 4v12M12 4v12M16 4v12M12 16v4" /></>,
  iron: <><path d="M3 16h17c0-5-4-8-8-8H8a5 5 0 0 0-5 5z" /><path d="M3 20h17" /></>,
  wardrobe: <><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M12 3v18M9.5 12h.01M14.5 12h.01" /></>,
  cot: <><rect x="4" y="8" width="16" height="9" rx="1" /><path d="M4 8V5M20 8V5M7 8v9M10 8v9M14 8v9M17 8v9M6 20v-3M18 20v-3" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M9 21h6M12 17v4" /></>,
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" />,
  fan: <><circle cx="12" cy="12" r="1.6" /><path d="M12 10.4C10 6 12 3 14.5 4.5c2 1.3 0 4.5-2.3 6M13.6 12c4.400-.5 6.400 2.400 4.500 4.500-1.600 1.900-4.300-.300-5.400-2.500M10.700 13.300C7.500 16.500 4 15.500 4.200 12.500c.2-2.500 3.400-2.300 6-.9" /></>,
  fridge: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M6 10h12M9 5v2M9 13v3" /></>,
  microwave: <><rect x="3" y="5" width="18" height="13" rx="2" /><rect x="6" y="8" width="9" height="7" rx="1" /><path d="M18 9h.01M18 13h.01" /></>,
  cutlery: <><path d="M6 3v7a2 2 0 0 0 2 2v9M8 3v5M4 3v5" /><path d="M17 3c-2 1-3 4-3 7 0 1.500 1 2 3 2v9" /></>,
  kettle: <><path d="M6 10h10l1 9H5z" /><path d="M8 10V7h6v3M17 12h2a2 2 0 0 1 0 4h-1" /></>,
  coffee: <><path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M16 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3" /></>,
  wine: <><path d="M8 3h8l-.5 6a3.500 3.500 0 0 1-7 0z" /><path d="M12 13v7M8.500 21h7" /></>,
  toaster: <><rect x="4" y="8" width="16" height="11" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2M8 13h8" /></>,
  blender: <><path d="M7 3h10l-1.500 11h-7z" /><path d="M9 14v4h6v-4M9 21h6" /></>,
  cooker: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16" /><circle cx="9" cy="6" r=".8" /><circle cx="15" cy="6" r=".8" /><rect x="7" y="12" width="10" height="6" rx="1" /></>,
  door: <><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16" /><circle cx="15" cy="12.500" r=".8" /></>,
  balcony: <><path d="M4 12h16M6 12v8M10 12v8M14 12v8M18 12v8M4 20h16" /><path d="M8 12V6h8v6" /></>,
  dining: <><path d="M4 12h16M6 12v8M18 12v8" /><path d="M8 12V8h8v4" /></>,
  gym: <><path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" /></>,
  balloon: <><path d="M12 3a6 6 0 0 1 6 6c0 4-3.500 7-6 8-2.500-1-6-4-6-8a6 6 0 0 1 6-6z" /><path d="M12 17v4" /></>,
  graduation: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500M22 9v6" /></>,
  home: <><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></>,
  'house-pin': <><path d="M5 11l7-6 7 6v8H5z" /><path d="M10 19v-5h4v5" /></>,
  laurel: <><path d="M9 20C4 18 2 12 4 5c1 2 2 3 4 3-1 3 0 5 3 6-2 0-3 1-2 6z" /><path d="M8 8c-1 2 0 3 2 3M6 12c0 2 1 3 3 3" /></>,
  dots: <>{[6,12,18].flatMap((x)=>[6,12,18].map((y)=><circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="currentColor" stroke="none" />))}</>,
  minusIcon: <path d="M5 12h14" />,
  chevronDown2: <path d="M6 9l6 6 6-6" />,
}

interface IconProps {
  name: string
  size?: number
  strokeWidth?: number
  className?: string
  fill?: string
}

export function Icon({ name, size = 24, strokeWidth = 1.6, className, fill = 'none' }: IconProps) {
  const body = P[name] ?? P.home
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {body}
    </svg>
  )
}

export function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M15.1 1.6l3.8 9.200 9.900.8c.800.100 1.100 1.100.500 1.600l-7.500 6.500 2.300 9.700c.200.800-.700 1.400-1.400 1l-8.500-5.200-8.500 5.200c-.700.400-1.600-.200-1.400-1l2.300-9.700-7.500-6.500c-.600-.500-.300-1.500.500-1.600l9.900-.8 3.800-9.200c.300-.800 1.400-.800 1.700 0z" />
    </svg>
  )
}

export function AirbnbLogo() {
  // Original wordmark-style mark (not the official logo artwork).
  return (
    <svg width="106" height="32" viewBox="0 0 106 32" aria-label="Airbnb home" role="img" fill="#ff385c">
      <path d="M16 2.500c-1.800 0-3.200 1-4.200 3.100L4.300 21.500c-1.800 3.900.800 7.300 4.300 7.300 2.200 0 3.900-1.300 7.400-4.700 3.500 3.400 5.200 4.700 7.400 4.700 3.500 0 6.100-3.400 4.300-7.300L20.200 5.600C19.200 3.500 17.800 2.500 16 2.500zm0 3.400c.500 0 .900.400 1.400 1.400l6.400 13.700c.700 1.500-.300 3-1.800 3-1.100 0-2.400-.900-6-4.300 1.500-2 2.300-3.700 2.300-5.100 0-2.300-1.100-3.600-2.300-3.600s-2.300 1.300-2.300 3.600c0 1.400.800 3.100 2.300 5.100-3.600 3.400-4.900 4.300-6 4.300-1.500 0-2.500-1.500-1.800-3l6.400-13.700c.500-1 .900-1.400 1.400-1.400zm0 7.200c.400 0 .700.600.700 1.500 0 .900-.300 1.900-.700 2.700-.400-.800-.700-1.800-.700-2.700 0-.900.300-1.500.700-1.500z" />
      <text x="34" y="23" fontFamily="'Figtree Variable',-apple-system,'Segoe UI',Roboto,sans-serif" fontSize="25" fontWeight="600" letterSpacing="-.4">airbnb</text>
    </svg>
  )
}

/** Filled laurel branch (left side); `flip` mirrors it for the right side of the award. */
export function Laurel({ size = 34, flip = false }: { size?: number; flip?: boolean }) {
  const pts: { x: number; y: number; a: number }[] = []
  // Cubic bezier stem running bottom -> top along the left of the badge.
  const [p0, p1, p2, p3] = [{ x: 28, y: 46 }, { x: 4, y: 38 }, { x: 2, y: 16 }, { x: 16, y: 3 }]
  for (let i = 0; i < 7; i++) {
    const t = 0.08 + i * 0.14
    const u = 1 - t
    const x = u ** 3 * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t ** 3 * p3.x
    const y = u ** 3 * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t ** 3 * p3.y
    const dx = 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x)
    const dy = 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y)
    pts.push({ x, y, a: (Math.atan2(dy, dx) * 180) / Math.PI })
  }
  return (
    <svg width={size} height={(size * 48) / 34} viewBox="0 0 34 48" aria-hidden="true" focusable="false" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M28 46C4 38 2 16 16 3" fill="none" stroke="#222" strokeWidth="1.4" strokeLinecap="round" />
      {pts.map((q, i) => (
        <g key={i}>
          <ellipse cx={q.x - 3} cy={q.y} rx="2.6" ry="5.6" transform={`rotate(${q.a - 90 - 38} ${q.x - 3} ${q.y})`} fill="#222" />
          <ellipse cx={q.x + 3} cy={q.y} rx="2.6" ry="5.6" transform={`rotate(${q.a - 90 + 38} ${q.x + 3} ${q.y})`} fill="#222" />
        </g>
      ))}
    </svg>
  )
}
