import { placeholderPhoto } from './placeholder'

export interface Room {
  id: string
  name: string
  details: string
  /** Row pattern for the photo-tour mosaic: 1 = one large photo, 2 = two small photos side by side. */
  pattern: number[]
}

export interface Photo {
  id: string
  roomId: string
  roomName: string
  src: string
  alt: string
}

export const rooms: Room[] = [
  { id: 'living-room-1', name: 'Living room 1', details: 'Sofa · Air conditioning · Ceiling fan · TV', pattern: [1, 2] },
  { id: 'living-room-2', name: 'Living room 2', details: 'Ceiling fan · Hot tub', pattern: [1, 2, 1] },
  {
    id: 'full-kitchen',
    name: 'Full kitchen',
    details:
      'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
    pattern: [1, 2],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    details:
      'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    pattern: [1, 2, 1],
  },
  { id: 'full-bathroom', name: 'Full bathroom', details: 'Hairdryer · Hot water · Shampoo · Shower gel', pattern: [1] },
  { id: 'gym', name: 'Gym', details: 'Air conditioning · Gym · Exercise equipment · Ceiling fan', pattern: [1, 2, 2] },
  { id: 'exterior', name: 'Exterior', details: '', pattern: [1, 2, 1, 2] },
  { id: 'pool', name: 'Pool', details: 'Pool', pattern: [1, 2, 1] },
  { id: 'additional-photos', name: 'Additional photos', details: '', pattern: [1, 2, 1, 2, 1] },
]

export const photos: Photo[] = rooms.flatMap((room) => {
  const count = room.pattern.reduce((a, b) => a + b, 0)
  return Array.from({ length: count }, (_, i) => ({
    id: `${room.id}-${i}`,
    roomId: room.id,
    roomName: room.name,
    src: placeholderPhoto(room.name, i, count),
    alt: `${room.name}, photo ${i + 1} of ${count}`,
  }))
})

export const photoIndexById = new Map(photos.map((p, i) => [p.id, i]))

/** Five photos shown in the hero grid (large one first). */
export const heroPhotoIds = [
  'additional-photos-0',
  'living-room-2-0',
  'living-room-2-1',
  'bedroom-0',
  'exterior-0',
]
export const heroPhotos = heroPhotoIds.map((id) => photos[photoIndexById.get(id)!])
