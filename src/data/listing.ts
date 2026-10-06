import { placeholderSquare } from './placeholder'

export const listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  facts: '3 guests · 1 bedroom · 1 bed · 1 bathroom',
  maxGuests: 3,
  rating: 4.95,
  reviewCount: 19,
  nightly: 5699.8,
  host: { name: 'Mirashya Homes', tenure: '2 years hosting', reviews: 1463, rating: 4.68, years: 2 },
  location: 'Candolim, Goa, India',
}

export const highlights = [
  { icon: 'pool', title: 'Outdoor entertainment', text: 'The pool and alfresco dining are great for summer trips.' },
  { icon: 'fan', title: 'Designed for staying cool', text: 'Beat the heat with the A/C and ceiling fan.' },
  { icon: 'door', title: 'Self check-in', text: 'You can check in with the building staff.' },
]

export const descriptionTranslated =
  '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. 💗 🌴'

export const descriptionOriginal =
  '🌴 मिराश्या होम्स के अमोर दे गोवा में अपनी आरामदायक छुट्टी की योजना बनाएं! ✨ कैंडोलिम के केंद्र में इस आरामदायक 1BHK में ठहरें, जिसमें एक निजी जकूज़ी 🛁 है। हाई-स्पीड वाईफाई 💻, स्मार्ट टीवी 📺, पालतू जानवरों के अनुकूल सुविधाएं 🐾 और स्टाइलिश इंटीरियर का आनंद लें। कैंडोलिम बीच 🏖️, लोकप्रिय कैफे, रेस्तरां और नाइटलाइफ़ 🍹 से बस कुछ ही मिनट की दूरी पर, यह नॉर्थ गोवा में रोमांस, आराम और थोड़ी विलासिता चाहने वाले जोड़ों के लिए आदर्श है। 💗 🌴'

export const sleeping = [
  { room: 'Bedroom', bed: '1 double bed', photoId: 'bedroom-0' },
  { room: 'Living room', bed: '1 sofa', photoId: 'living-room-1-0' },
]

export interface Amenity {
  name: string
  icon: string
  missing?: boolean
}

export const topAmenities: Amenity[] = [
  { name: 'Kitchen', icon: 'kitchen' },
  { name: 'Wifi', icon: 'wifi' },
  { name: 'Dedicated workspace', icon: 'workspace' },
  { name: 'Free parking on premises', icon: 'car' },
  { name: 'Pool', icon: 'pool' },
  { name: 'Hot tub', icon: 'hottub' },
  { name: 'Pets allowed', icon: 'paw' },
  { name: 'Exterior security cameras on property', icon: 'camera' },
  { name: 'Carbon monoxide alarm', icon: 'alarm-off', missing: true },
  { name: 'Smoke alarm', icon: 'alarm-off', missing: true },
]

export const amenityGroups: { title: string; items: Amenity[] }[] = [
  {
    title: 'Bathroom',
    items: [
      { name: 'Hairdryer', icon: 'hairdryer' },
      { name: 'Cleaning products', icon: 'cleaning' },
      { name: 'Shampoo', icon: 'bottle' },
      { name: 'Hot water', icon: 'hotwater' },
      { name: 'Shower gel', icon: 'bottle' },
    ],
  },
  {
    title: 'Bedroom and laundry',
    items: [
      { name: 'Washing machine', icon: 'washer' },
      { name: 'Hangers', icon: 'hanger' },
      { name: 'Bed linen', icon: 'bed' },
      { name: 'Room-darkening blinds', icon: 'blinds' },
      { name: 'Iron', icon: 'iron' },
      { name: 'Clothes storage', icon: 'wardrobe' },
      { name: 'Cot', icon: 'cot' },
    ],
  },
  { title: 'Entertainment', items: [{ name: 'TV', icon: 'tv' }] },
  { title: 'Family', items: [{ name: 'Cot', icon: 'cot' }] },
  {
    title: 'Heating and cooling',
    items: [
      { name: 'Air conditioning', icon: 'snow' },
      { name: 'Ceiling fan', icon: 'fan' },
    ],
  },
  {
    title: 'Home safety',
    items: [
      { name: 'Exterior security cameras on property', icon: 'camera' },
      { name: 'Carbon monoxide alarm', icon: 'alarm-off', missing: true },
      { name: 'Smoke alarm', icon: 'alarm-off', missing: true },
    ],
  },
  {
    title: 'Internet and office',
    items: [
      { name: 'Wifi', icon: 'wifi' },
      { name: 'Dedicated workspace', icon: 'workspace' },
    ],
  },
  {
    title: 'Kitchen and dining',
    items: [
      { name: 'Kitchen', icon: 'kitchen' },
      { name: 'Fridge', icon: 'fridge' },
      { name: 'Freezer', icon: 'fridge' },
      { name: 'Microwave', icon: 'microwave' },
      { name: 'Cooking basics', icon: 'kitchen' },
      { name: 'Crockery and cutlery', icon: 'cutlery' },
      { name: 'Kettle', icon: 'kettle' },
      { name: 'Coffee', icon: 'coffee' },
      { name: 'Wine glasses', icon: 'wine' },
      { name: 'Toaster', icon: 'toaster' },
      { name: 'Blender', icon: 'blender' },
      { name: 'Cooker', icon: 'cooker' },
    ],
  },
  { title: 'Location features', items: [{ name: 'Private entrance', icon: 'door' }] },
  {
    title: 'Outdoor',
    items: [
      { name: 'Patio or balcony', icon: 'balcony' },
      { name: 'Outdoor dining area', icon: 'dining' },
    ],
  },
  {
    title: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises', icon: 'car' },
      { name: 'Pool', icon: 'pool' },
      { name: 'Hot tub', icon: 'hottub' },
      { name: 'Gym', icon: 'gym' },
    ],
  },
  {
    title: 'Services',
    items: [
      { name: 'Pets allowed', icon: 'paw' },
      { name: 'Cleaning available during stay', icon: 'cleaning' },
      { name: 'Long-term stays allowed', icon: 'calendar-check' },
      { name: 'Self check-in', icon: 'door' },
    ],
  },
]

export const ratingBreakdown = { 5: 0.94, 4: 0.06, 3: 0, 2: 0, 1: 0 } as Record<number, number>

export const categoryScores = [
  { label: 'Cleanliness', score: '5.0', icon: 'spray' },
  { label: 'Accuracy', score: '5.0', icon: 'check-circle' },
  { label: 'Check-in', score: '5.0', icon: 'key' },
  { label: 'Communication', score: '5.0', icon: 'chat' },
  { label: 'Location', score: '4.8', icon: 'map' },
  { label: 'Value', score: '4.8', icon: 'tag' },
]

export const reviewTags = [
  { label: 'Comfort', count: 6, emoji: '🛋️' },
  { label: 'Accuracy', count: 5, emoji: '✅' },
  { label: 'Hot tub', count: 5, emoji: '🛁' },
  { label: 'Condition', count: 4, emoji: '🧾' },
  { label: 'Hospitality', count: 8, emoji: '🎁' },
  { label: 'Cleanliness', count: 4, emoji: '🧴' },
  { label: 'Amenities', count: 2, emoji: '📦' },
  { label: 'Location', count: 3, emoji: '📍' },
]

export interface Review {
  id: number
  name: string
  since: string
  when: string
  text: string
  hue: number
  photo?: boolean
}

const R = (id: number, name: string, since: string, when: string, text: string, hue: number, photo = false): Review => ({
  id, name, since, when, text, hue, photo,
})

export const reviews: Review[] = [
  R(1, 'Amit', '2 months on Airbnb', '1 week ago', 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.', 30),
  R(2, 'Aheesh', '3 years on Airbnb', '2 weeks ago', 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again again.', 20, true),
  R(3, 'Samiksha', '8 months on Airbnb', 'May 2026', 'the host nitish was really great help', 40, true),
  R(4, 'Vedant', '4 years on Airbnb', 'May 2026', 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The jacuzzi was a highlight of the trip.', 260),
  R(5, 'Vaibhav S', '3 years on Airbnb', 'May 2026', 'Great great experience living out there , can’t expect more , will always look for it in the future and will recommend my friends too.', 8, true),
  R(6, 'Mohd', '5 years on Airbnb', 'May 2026', 'Great place. Exactly as described in the listing.', 24, true),
  R(7, 'Riya', '1 year on Airbnb', 'April 2026', 'Loved the private jacuzzi. Perfect for a romantic getaway and the location is super close to the beach.', 330),
  R(8, 'Karan', '2 years on Airbnb', 'April 2026', 'Clean, spacious and very well located. Self check-in was smooth and the staff were friendly.', 200),
  R(9, 'Neha', '6 months on Airbnb', 'April 2026', 'Beautiful interiors and a very comfortable bed. Would stay again.', 350),
  R(10, 'Rohan', '4 years on Airbnb', 'March 2026', 'Great value for money. The gym and pool in the building were a bonus.', 150),
  R(11, 'Priya', '3 years on Airbnb', 'March 2026', 'Everything was as described. Host replied within minutes whenever we needed anything.', 300),
  R(12, 'Arjun', '7 months on Airbnb', 'March 2026', 'Lovely stay, quiet at night and close to the cafés.', 90),
  R(13, 'Sneha', '2 years on Airbnb', 'February 2026', 'The jacuzzi terrace is beautiful. Highly recommended for couples.', 10),
  R(14, 'Dev', '1 year on Airbnb', 'February 2026', 'Kitchen had everything we needed. Air conditioning worked really well.', 210),
  R(15, 'Ishita', '5 years on Airbnb', 'February 2026', 'Wonderful host and a spotless apartment. Will book again on our next Goa trip.', 320),
  R(16, 'Manish', '3 years on Airbnb', 'January 2026', 'Peaceful and clean. Parking was easy.', 60),
  R(17, 'Tanvi', '8 months on Airbnb', 'January 2026', 'Perfect for a short getaway. The photos are accurate.', 280),
  R(18, 'Kabir', '2 years on Airbnb', 'December 2025', 'Comfortable, modern and very well kept.', 170),
  R(19, 'Zoya', '1 year on Airbnb', 'December 2025', 'Absolutely loved our stay, thank you Mirashya Homes!', 340),
]

export const coHosts = [
  'Sharath', 'Aman Dev Pahwa', 'Maria Karen Priyanka',
  'Simran', 'Pallavi', 'Sanyukta',
  'Shruti', 'Amisha',
]

export const thingsToKnow = [
  {
    icon: 'calendar-x',
    title: 'Cancellation policy',
    lines: ['Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.', 'Review this host’s full policy for details.'],
    modalTitle: 'Cancellation policy',
    modalBody: 'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. After that, the reservation is non-refundable. Service fees are refunded only if you cancel before check-in and within 48 hours of booking.',
  },
  {
    icon: 'key-search',
    title: 'House rules',
    lines: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'],
    modalTitle: 'House rules',
    modalBody: 'Check-in after 2:00 pm. Checkout before 11:00 am. 3 guests maximum. Pets are allowed. No parties or events. Please respect quiet hours and the building’s common areas.',
  },
  {
    icon: 'shield',
    title: 'Safety & property',
    lines: ['Carbon monoxide alarm not reported', 'Smoke alarm not reported', 'Exterior security cameras on property'],
    modalTitle: 'Safety & property',
    modalBody: 'Carbon monoxide alarm not reported. Smoke alarm not reported. Exterior security cameras on property. Some property features may not be listed here; ask the host if you have questions.',
  },
]

export interface NearbyStay {
  id: string
  title: string
  price: string
  rating: string
  hue: number
}

export const nearbyStays: NearbyStay[] = [
  { id: 'n1', title: 'Beautiful Studio with a view to die for', price: '₹23,600', rating: '4.91', hue: 35 },
  { id: 'n2', title: 'NAQAB - 1bhk with private pool', price: '₹42,218', rating: '4.95', hue: 190 },
  { id: 'n3', title: 'Greentique Luxury Flat with plunge pool, Calangute', price: '₹44,506', rating: '4.94', hue: 165 },
  { id: 'n4', title: 'The Tropical Studio | 5 mins to Beach', price: '₹22,824', rating: '4.96', hue: 175 },
  { id: 'n5', title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: '₹39,942', rating: '4.95', hue: 100 },
  { id: 'n6', title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: '₹39,942', rating: '4.95', hue: 95 },
  { id: 'n7', title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool', price: '₹45,648', rating: '5.0', hue: 45 },
  { id: 'n8', title: 'Luxury Apt | Private Pool | 6 Mins from Beach', price: '₹48,786', rating: '4.93', hue: 20 },
  { id: 'n9', title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.', price: '₹22,824', rating: '4.92', hue: 140 },
  { id: 'n10', title: 'The Tropical Studio | 5 mins to Beach', price: '₹22,824', rating: '4.96', hue: 180 },
]

export const nearbyImage = (s: NearbyStay) => placeholderSquare(s.title, s.hue)

export const neighbourhoodText =
  'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.'

export const searchDestinations = [
  { name: 'Nearby', sub: 'Find what’s around you' },
  { name: 'Candolim, Goa', sub: 'Beach town · Popular with couples' },
  { name: 'Calangute, Goa', sub: 'Close to Candolim' },
  { name: 'Panaji, Goa', sub: 'Capital city' },
  { name: 'Anjuna, Goa', sub: 'Flea markets and cafés' },
]
