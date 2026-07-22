export type ResourceKind = 'vendors' | 'events' | 'gatherings' | 'businesses' | 'organizations' | 'musicians' | 'listings'

export type ResourceItem = {
  id: string
  slug: string
  type: ResourceKind
  name: string
  subtitle: string
  category: string
  description: string
  location: string
  address?: string
  date?: string
  time?: string
  price?: string
  phone?: string
  website?: string
  organizer?: string
  status: 'open' | 'closed' | 'upcoming' | 'active' | 'draft'
  rating?: number
  reviews?: number
  attendees?: number
  capacity?: number
  members?: number
  favoriteCount: number
  tags: string[]
  highlights: string[]
  image: string
  createdAt: string
  updatedAt: string
}

export type MockUser = { id: string; name: string; email: string; phone: string; neighborhood: string; bio: string; interests: string[] }
export type MockNotification = { id: string; title: string; body: string; type: 'event' | 'message' | 'favorite' | 'system'; read: boolean; createdAt: string }
export type MockMessage = { id: string; sender: 'me' | 'them'; body: string; createdAt: string }
export type MockThread = { id: string; name: string; context: string; unread: number; messages: MockMessage[] }
export type MockPost = { id: string; author: string; content: string; topic: string; likes: number; comments: number; createdAt: string }
export type MockAnnouncement = {
  id: string
  title: string
  body: string
  audience: string
  pinned: boolean
  createdAt: string
}
export type MockReport = {
  id: string
  resourceKey: string
  title: string
  reason: string
  reporter: string
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed'
  createdAt: string
}
export type MockAppState = {
  resources: Record<ResourceKind, ResourceItem[]>
  favorites: string[]
  user: MockUser | null
  notifications: MockNotification[]
  threads: MockThread[]
  posts: MockPost[]
  announcements: MockAnnouncement[]
  reports: MockReport[]
}

export const resourceConfig: Record<ResourceKind, { singular: string; plural: string; path: string; createLabel: string; categories: string[] }> = {
  vendors: { singular: 'Vendor', plural: 'Vendors', path: '/vendors', createLabel: 'Add Vendor', categories: ['Food', 'Poke', 'Crafts', 'Services', 'Wellness'] },
  events: { singular: 'Event', plural: 'Events', path: '/events', createLabel: 'Create Event', categories: ['Social', 'Cultural', 'Service', 'Business', 'Family'] },
  gatherings: { singular: 'Gathering', plural: 'Gatherings', path: '/gatherings', createLabel: 'Create Gathering', categories: ['Meetup', 'Kupuna', 'Families', 'Music', 'Outdoors'] },
  businesses: { singular: 'Business', plural: 'Businesses', path: '/businesses', createLabel: 'Add Business', categories: ['Restaurant', 'Retail', 'Professional', 'Health', 'Creative'] },
  organizations: { singular: 'Organization', plural: 'Organizations', path: '/organizations', createLabel: 'Add Organization', categories: ['Nonprofit', 'Culture', 'Education', 'Mutual Aid', 'Youth'] },
  musicians: { singular: 'Musician', plural: 'Musicians', path: '/musicians', createLabel: 'Add Musician', categories: ['Solo Artist', 'Band', 'DJ', 'Hula Music', 'Lessons'] },
  listings: { singular: 'Listing', plural: 'Marketplace', path: '/marketplace', createLabel: 'Sell Item', categories: ['Handmade', 'Food', 'Services', 'Home', 'Instruments'] },
}

const now = '2026-07-22T09:00:00.000Z'

function item(input: Omit<ResourceItem, 'id' | 'favoriteCount' | 'createdAt' | 'updatedAt'> & { id: string; favoriteCount?: number }): ResourceItem {
  return { ...input, favoriteCount: input.favoriteCount || 0, createdAt: now, updatedAt: now }
}

export const initialState: MockAppState = {
  favorites: ['vendors:ono-hawaiian-plate-lunch', 'events:hawaiian-cultural-night'],
  user: { id: 'user-1', name: 'Leilani Carter', email: 'leilani@example.com', phone: '(702) 555-0199', neighborhood: 'Spring Valley', bio: 'Community member helping connect island families, vendors, and cultural groups across Las Vegas.', interests: ['Food', 'Cultural events', 'Family gatherings'] },
  notifications: [
    { id: 'n-1', title: 'RSVP reminder', body: 'Hawaiian Cultural Night starts Friday at 6:30 PM.', type: 'event', read: false, createdAt: now },
    { id: 'n-2', title: 'New vendor saved', body: 'Kailua Poke & Sushi was added to your favorites.', type: 'favorite', read: false, createdAt: '2026-07-21T18:00:00.000Z' },
    { id: 'n-3', title: 'Message from Aloha Resource Center', body: 'They replied with volunteer details for this weekend.', type: 'message', read: true, createdAt: '2026-07-20T18:00:00.000Z' },
  ],
  threads: [
    { id: 'thread-1', name: 'Aloha Resource Center', context: 'Volunteer coordination', unread: 1, messages: [{ id: 'm-1', sender: 'them', body: 'Mahalo for reaching out. We still need help at the welcome table this Saturday.', createdAt: '2026-07-20T18:00:00.000Z' }, { id: 'm-2', sender: 'me', body: 'I can do the morning shift and bring printed flyers.', createdAt: '2026-07-20T19:00:00.000Z' }] },
    { id: 'thread-2', name: 'Ono Hawaiian Plate Lunch', context: 'Catering request', unread: 0, messages: [{ id: 'm-3', sender: 'them', body: 'We can prepare 40 plates with pickup at 4 PM.', createdAt: '2026-07-19T16:00:00.000Z' }] },
  ],
  posts: [
    { id: 'post-1', author: 'Malia K.', content: 'Looking for a hula teacher for a youth workshop in Henderson next month. Any recommendations?', topic: 'Recommendations', likes: 18, comments: 6, createdAt: '2026-07-22T07:00:00.000Z' },
    { id: 'post-2', author: 'Noah P.', content: 'We have extra tables available for Sunday market vendors. Message me if your booth needs one.', topic: 'Marketplace', likes: 11, comments: 3, createdAt: '2026-07-21T15:00:00.000Z' },
  ],
  announcements: [
    {
      id: 'announcement-1',
      title: 'Vendor interest form closes Friday',
      body: 'Community vendors interested in the August cultural night should submit booth details before Friday evening so organizers can finalize the floor plan.',
      audience: 'Vendors',
      pinned: true,
      createdAt: now,
    },
    {
      id: 'announcement-2',
      title: 'School supply drive drop-off',
      body: 'Aloha Resource Center is collecting notebooks, backpacks, and hygiene kits this weekend in Central Las Vegas.',
      audience: 'Families',
      pinned: false,
      createdAt: '2026-07-21T10:00:00.000Z',
    },
  ],
  reports: [
    {
      id: 'report-1',
      resourceKey: 'listings:fresh-local-honey',
      title: 'Fresh Local Honey',
      reason: 'Seller asked to verify pickup instructions before public sharing.',
      reporter: 'Noah P.',
      status: 'open',
      createdAt: '2026-07-21T20:00:00.000Z',
    },
    {
      id: 'report-2',
      resourceKey: 'events:hawaiian-cultural-night',
      title: 'Hawaiian Cultural Night',
      reason: 'Capacity count may need an update after venue confirmation.',
      reporter: 'PCA Committee',
      status: 'reviewing',
      createdAt: '2026-07-21T12:00:00.000Z',
    },
  ],
  resources: {
    vendors: [
      item({ id: 'vendor-1', slug: 'ono-hawaiian-plate-lunch', type: 'vendors', name: 'Ono Hawaiian Plate Lunch', subtitle: 'Plate lunches, catering, and island comfort food', category: 'Food', description: 'Family-run kitchen serving kalua pork, shoyu chicken, mac salad, and weekend catering trays for community events.', location: 'Downtown Las Vegas', address: '201 S 4th St, Las Vegas, NV', phone: '(702) 555-0120', website: 'https://example.com/ono', organizer: 'Keoni Silva', status: 'open', rating: 4.8, reviews: 142, favoriteCount: 86, tags: ['Catering', 'Lunch', 'Family-owned'], highlights: ['Accepts catering requests', 'Weekend specials', 'Pickup available'], image: 'from-ocean-600 via-island-teal to-sand-300' }),
      item({ id: 'vendor-2', slug: 'kailua-poke-and-sushi', type: 'vendors', name: 'Kailua Poke & Sushi', subtitle: 'Fresh poke bowls near the Arts District', category: 'Poke', description: 'Casual counter-service spot focused on fresh fish, tofu bowls, furikake fries, and catering platters.', location: 'Arts District', address: '1415 Main St, Las Vegas, NV', phone: '(702) 555-0188', website: 'https://example.com/kailua', organizer: 'Tiare Nakamura', status: 'open', rating: 4.6, reviews: 89, favoriteCount: 61, tags: ['Poke', 'Quick lunch', 'Catering'], highlights: ['Online ordering', 'Vegetarian options', 'Local artist wall'], image: 'from-cyan-600 via-ocean-500 to-emerald-400' }),
      item({ id: 'vendor-3', slug: 'malolo-handmade-crafts', type: 'vendors', name: 'Malolo Handmade Crafts', subtitle: 'Lei, quilts, jewelry, and handmade gifts', category: 'Crafts', description: 'Small-batch craft vendor specializing in lei po o, lauhala-inspired accessories, quilts, and custom gifts.', location: 'Sunday Market', address: 'Downtown Summerlin, Las Vegas, NV', phone: '(702) 555-0144', organizer: 'Anela Reyes', status: 'open', rating: 4.9, reviews: 56, favoriteCount: 44, tags: ['Handmade', 'Gifts', 'Market booth'], highlights: ['Custom orders', 'Market pickup', 'Workshop kits'], image: 'from-emerald-500 via-teal-500 to-yellow-300' }),
    ],
    events: [
      item({ id: 'event-1', slug: 'community-bbq-and-networking', type: 'events', name: 'Community BBQ & Networking', subtitle: 'Food, introductions, and vendor networking', category: 'Social', description: 'An easy evening for families, vendors, and new Las Vegas arrivals to connect over food and shared resources.', location: 'Downtown Park', address: '200 Lewis Ave, Las Vegas, NV', date: '2026-08-15', time: '5:00 PM', organizer: '9th Island Community Team', status: 'upcoming', attendees: 45, capacity: 90, favoriteCount: 38, tags: ['Families', 'Networking', 'Food'], highlights: ['Bring a chair', 'Vendor introductions', 'Kid-friendly'], image: 'from-sky-600 via-teal-500 to-yellow-300' }),
      item({ id: 'event-2', slug: 'hawaiian-cultural-night', type: 'events', name: 'Hawaiian Cultural Night', subtitle: 'Music, hula, food, and storytelling', category: 'Cultural', description: 'A community evening centered on cultural practitioners, music, hula, food vendors, and stories from island families.', location: 'Arts District Community Hall', address: '1025 S 1st St, Las Vegas, NV', date: '2026-08-22', time: '6:30 PM', organizer: 'Pacific Cultural Alliance', status: 'upcoming', attendees: 120, capacity: 180, favoriteCount: 102, tags: ['Hula', 'Music', 'Food vendors'], highlights: ['Doors open at 6 PM', 'Vendor pop-ups', 'Family seating'], image: 'from-indigo-700 via-ocean-600 to-emerald-400' }),
    ],
    gatherings: [
      item({ id: 'gathering-1', slug: 'kupuna-coffee-hour', type: 'gatherings', name: 'Kupuna Coffee Hour', subtitle: 'Weekly talk story for elders and caregivers', category: 'Kupuna', description: 'A recurring morning meetup for kupuna, caregivers, and neighbors to share resources, coffee, and conversation.', location: 'Henderson Library Cafe', date: '2026-07-28', time: '9:00 AM', organizer: 'Aunty Nani', status: 'active', members: 34, favoriteCount: 29, tags: ['Weekly', 'Coffee', 'Caregivers'], highlights: ['Every Tuesday', 'Quiet indoor space', 'Resource sharing'], image: 'from-amber-400 via-teal-500 to-ocean-600' }),
      item({ id: 'gathering-2', slug: 'ohana-park-playdate', type: 'gatherings', name: 'Ohana Park Playdate', subtitle: 'Saturday meetup for families with young kids', category: 'Families', description: 'Low-pressure park meetup for parents, keiki, and caregivers looking for community and outdoor time.', location: 'Sunset Park', date: '2026-08-01', time: '10:00 AM', organizer: 'Malia K.', status: 'active', members: 58, favoriteCount: 41, tags: ['Kids', 'Outdoor', 'Monthly'], highlights: ['Shade ramada', 'Bring snacks', 'Splash pad nearby'], image: 'from-rose-400 via-yellow-300 to-teal-500' }),
    ],
    businesses: [
      item({ id: 'business-1', slug: 'mana-tax-and-notary', type: 'businesses', name: 'Mana Tax & Notary', subtitle: 'Tax prep, mobile notary, and small business setup', category: 'Professional', description: 'Bilingual tax and notary support for families, sole proprietors, and new local businesses.', location: 'Spring Valley', phone: '(702) 555-0177', website: 'https://example.com/mana-tax', organizer: 'Lina Mateo', status: 'open', rating: 4.7, reviews: 33, favoriteCount: 25, tags: ['Tax prep', 'Mobile notary', 'Small business'], highlights: ['Evening appointments', 'Mobile service', 'Business setup checklists'], image: 'from-slate-700 via-ocean-600 to-emerald-400' }),
      item({ id: 'business-2', slug: 'pacific-wellness-collective', type: 'businesses', name: 'Pacific Wellness Collective', subtitle: 'Massage, movement classes, and wellness workshops', category: 'Health', description: 'Community-centered wellness studio offering bodywork, movement classes, and seasonal health workshops.', location: 'Southwest Las Vegas', phone: '(702) 555-0166', website: 'https://example.com/pacific-wellness', organizer: 'Kiana Toa', status: 'open', rating: 4.9, reviews: 48, favoriteCount: 39, tags: ['Massage', 'Classes', 'Workshops'], highlights: ['Sliding-scale community class', 'Online booking', 'Small group sessions'], image: 'from-emerald-600 via-teal-500 to-sky-400' }),
    ],
    organizations: [
      item({ id: 'org-1', slug: 'aloha-resource-center', type: 'organizations', name: 'Aloha Resource Center', subtitle: 'Mutual aid, referrals, and community navigation', category: 'Mutual Aid', description: 'Volunteer-led organization helping community members find food support, school supplies, emergency aid, and trusted referrals.', location: 'Central Las Vegas', phone: '(702) 555-0101', website: 'https://example.com/aloha-resource', organizer: 'Community board', status: 'active', members: 210, favoriteCount: 77, tags: ['Mutual aid', 'Volunteer', 'Referrals'], highlights: ['Volunteer intake open', 'Resource directory', 'Donation drop-offs'], image: 'from-ocean-700 via-teal-600 to-lime-300' }),
      item({ id: 'org-2', slug: 'pacific-cultural-alliance', type: 'organizations', name: 'Pacific Cultural Alliance', subtitle: 'Cultural education, performances, and youth programming', category: 'Culture', description: 'A network of practitioners, teachers, and volunteers creating cultural education opportunities in Southern Nevada.', location: 'Las Vegas Valley', website: 'https://example.com/pacific-cultural', organizer: 'PCA Committee', status: 'active', members: 148, favoriteCount: 64, tags: ['Culture', 'Youth', 'Classes'], highlights: ['Youth workshops', 'Performer directory', 'School partnerships'], image: 'from-purple-700 via-ocean-600 to-sand-300' }),
    ],
    musicians: [
      item({ id: 'musician-1', slug: 'kai-nalu-trio', type: 'musicians', name: 'Kai Nalu Trio', subtitle: 'Acoustic island music for events and private gatherings', category: 'Band', description: 'Three-piece group playing Hawaiian classics, contemporary island music, and mellow dinner sets for family celebrations, cultural nights, and vendor markets.', location: 'Las Vegas Valley', phone: '(702) 555-0133', website: 'https://example.com/kai-nalu', organizer: 'Makoa Reed', status: 'active', rating: 4.9, reviews: 27, favoriteCount: 36, tags: ['Live music', 'Private events', 'Acoustic'], highlights: ['Two-hour and full-evening sets', 'Sound system available', 'Family-friendly song list'], image: 'from-orange-500 via-ocean-600 to-teal-500' }),
      item({ id: 'musician-2', slug: 'dj-aloha-vegas', type: 'musicians', name: 'DJ Aloha Vegas', subtitle: 'Island, reggae, old school, and family party sets', category: 'DJ', description: 'Mobile DJ for graduations, birthdays, fundraisers, and cultural events with clean edits, emcee support, and flexible setup options.', location: 'North Las Vegas', phone: '(702) 555-0155', organizer: 'Sione T.', status: 'active', rating: 4.8, reviews: 19, favoriteCount: 28, tags: ['DJ', 'Parties', 'Emcee'], highlights: ['Clean family playlists', 'Wireless microphones', 'Indoor and outdoor setup'], image: 'from-fuchsia-600 via-ocean-700 to-sand-300' }),
    ],
    listings: [
      item({ id: 'listing-1', slug: 'traditional-hawaiian-quilt', type: 'listings', name: 'Traditional Hawaiian Quilt', subtitle: 'Queen size, handmade, green and white', category: 'Handmade', description: 'Hand-stitched quilt made locally. Buyer can pick up near Summerlin or arrange market pickup.', location: 'Summerlin', price: '$450', organizer: 'Kumu Arts', status: 'active', favoriteCount: 18, tags: ['Quilt', 'Handmade', 'Pickup'], highlights: ['Queen size', 'Excellent condition', 'Cash or Venmo'], image: 'from-emerald-700 via-green-500 to-white' }),
      item({ id: 'listing-2', slug: 'fresh-local-honey', type: 'listings', name: 'Fresh Local Honey', subtitle: 'Small-batch jars from west valley hives', category: 'Food', description: 'Raw local honey in 12 oz jars. Available for pickup at Sunday market while supplies last.', location: 'Sunday Market', price: '$25', organizer: 'Island Bees', status: 'active', favoriteCount: 31, tags: ['Honey', 'Local food', 'Market pickup'], highlights: ['Raw honey', 'Limited batch', 'Great gifts'], image: 'from-yellow-400 via-amber-500 to-ocean-600' }),
    ],
  },
}
