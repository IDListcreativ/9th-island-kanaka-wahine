export type Vendor = {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  location: string
  status: 'open' | 'closed'
  description: string
  hours: string
  phone: string
  tags: string[]
}

export type Event = {
  id: string
  name: string
  date: string
  time: string
  location: string
  attendees: number
  category: string
  description: string
  host: string
  rsvpOpen: boolean
}

export type Listing = {
  id: string
  title: string
  price: string
  category: string
  seller: string
  location: string
  description: string
  condition: string
}

export const currentProfile = {
  name: 'Leilani K.',
  role: 'Community member',
  location: 'Henderson, NV',
  joined: 'Member since 2024',
  interests: ['hula', 'plate lunch', 'small business', 'volunteering'],
}

export const vendors: Vendor[] = [
  {
    id: 'ono-hawaiian-plate-lunch',
    name: 'Ono Hawaiian Plate Lunch',
    category: 'Food',
    rating: 4.8,
    reviews: 142,
    location: 'Downtown Las Vegas',
    status: 'open',
    description: 'Family-style plate lunches, kalua pork, chicken katsu, and rotating island specials for pickup or catering.',
    hours: 'Mon-Sat, 10 AM - 8 PM',
    phone: '(702) 555-0199',
    tags: ['catering', 'takeout', 'local favorite'],
  },
  {
    id: 'kailua-poke-sushi',
    name: 'Kailua Poke & Sushi',
    category: 'Poke',
    rating: 4.6,
    reviews: 89,
    location: 'Arts District',
    status: 'open',
    description: 'Fresh poke bowls, sushi rolls, and spam musubi with weekly chef specials inspired by Kailua flavors.',
    hours: 'Tue-Sun, 11 AM - 9 PM',
    phone: '(702) 555-0144',
    tags: ['fresh fish', 'lunch', 'dinner'],
  },
  {
    id: 'malolo-handmade-crafts',
    name: 'Malolo Handmade Crafts',
    category: 'Crafts',
    rating: 4.9,
    reviews: 56,
    location: 'Local Market',
    status: 'closed',
    description: 'Handmade lei, shell jewelry, quilts, and keepsakes from local Pacific Islander makers.',
    hours: 'Sat-Sun market pop-ups',
    phone: '(702) 555-0112',
    tags: ['handmade', 'gifts', 'pop-up'],
  },
  {
    id: 'aloha-mobile-mechanics',
    name: 'Aloha Mobile Mechanics',
    category: 'Services',
    rating: 4.7,
    reviews: 34,
    location: 'West Las Vegas',
    status: 'open',
    description: 'Mobile maintenance and emergency repair help from a trusted neighborhood crew.',
    hours: 'Daily, 8 AM - 6 PM',
    phone: '(702) 555-0177',
    tags: ['mobile', 'auto', 'family owned'],
  },
]

export const events: Event[] = [
  {
    id: 'community-bbq-networking',
    name: 'Community BBQ & Networking',
    date: 'Aug 15, 2026',
    time: '5:00 PM',
    location: 'Downtown Park',
    attendees: 45,
    category: 'Social',
    description: 'Meet neighbors, share food, and connect with local business owners and community organizers.',
    host: '9th Island Community Council',
    rsvpOpen: true,
  },
  {
    id: 'hawaiian-cultural-night',
    name: 'Hawaiian Cultural Night',
    date: 'Aug 22, 2026',
    time: '6:30 PM',
    location: 'Arts District',
    attendees: 120,
    category: 'Cultural',
    description: 'An evening of music, hula, storytelling, and cultural workshops for the whole ʻohana.',
    host: 'Nā Leo Vegas',
    rsvpOpen: true,
  },
  {
    id: 'lake-las-vegas-cleanup-picnic',
    name: 'Lake Cleanup & Picnic',
    date: 'Aug 29, 2026',
    time: '8:00 AM',
    location: 'Lake Las Vegas',
    attendees: 78,
    category: 'Service',
    description: 'Volunteer cleanup followed by a potluck picnic and keiki games near the water.',
    host: 'Island Service Crew',
    rsvpOpen: false,
  },
]

export const listings: Listing[] = [
  {
    id: 'traditional-hawaiian-quilts',
    title: 'Traditional Hawaiian Quilts',
    price: '$450',
    category: 'Handmade',
    seller: 'Kumu Arts',
    location: 'Summerlin',
    description: 'Queen-size hand-stitched quilt with breadfruit pattern and matching pillow shams.',
    condition: 'New',
  },
  {
    id: 'fresh-local-honey',
    title: 'Fresh Local Honey',
    price: '$25',
    category: 'Food',
    seller: 'Island Bees',
    location: 'Henderson',
    description: 'Small-batch desert wildflower honey bottled this month. Pickup available on weekends.',
    condition: 'Fresh',
  },
  {
    id: 'ukulele-lessons-set',
    title: 'Ukulele Lessons Set',
    price: '$200',
    category: 'Services',
    seller: 'Music Ohana',
    location: 'North Las Vegas',
    description: 'Four beginner ukulele lessons with loaner instrument and song packet included.',
    condition: 'Booking',
  },
]

export const feedPosts = [
  { id: '1', author: 'Malia', text: 'Mahalo to everyone who helped pack pantry boxes this weekend!', likes: 28 },
  { id: '2', author: 'Keoni', text: 'Looking for a hula teacher for a birthday party in September. Any referrals?', likes: 12 },
  { id: '3', author: 'Aunty Rose', text: 'Fresh malasadas will be at the Saturday market booth by 9 AM.', likes: 43 },
]

export const notifications = [
  'Your RSVP for Hawaiian Cultural Night is confirmed.',
  'Ono Hawaiian Plate Lunch posted a new catering special.',
  'Malia replied to your referral request.',
]

export const messages = [
  { id: '1', from: 'Kumu Arts', preview: 'Yes, the quilt can be held through Friday.' },
  { id: '2', from: 'Island Service Crew', preview: 'Bring gloves and a reusable water bottle for cleanup day.' },
]
