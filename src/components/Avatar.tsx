export function Avatar({ name, hue, size = 40, photo }: { name: string; hue: number; size?: number; photo?: boolean }) {
  const initial = name.trim()[0]?.toUpperCase() ?? '?'
  // "photo" avatars get a filled gradient; others get the pastel initial style used by the reference.
  const style = photo
    ? { background: `linear-gradient(135deg, hsl(${hue},45%,62%), hsl(${(hue + 40) % 360},45%,34%))`, color: '#fff' }
    : { background: `hsl(${hue},70%,92%)`, color: `hsl(${hue},55%,38%)` }
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.4, ...style }} aria-hidden="true">
      {initial}
    </span>
  )
}
