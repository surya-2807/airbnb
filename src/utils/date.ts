export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
export const sameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && key(a) === key(b)
export const daysBetween = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000)
export const formatSlash = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
export const formatShort = (d: Date) => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
export const inRupees = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

export interface DayCell {
  date: Date
}
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const total = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = Array(first.getDay()).fill(null)
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))
  return cells
}
