// KrowdGuide Data - Dallas Venues with Four Pillars
// IMPORTANT: All crowd data is HISTORICAL patterns, not real-time

import { Venue, Event, District } from './types';

export const VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Happiest Hour',
    type: 'Rooftop Lounge',
    category: 'rooftop',
    distance: '0.3 mi',
    district: 'Victory Park',
    address: '2616 Olive St, Dallas, TX 75201',
    
    // PILLAR 1: Crowd
    crowdLevel: 90,
    crowdLabel: 'packed',
    
    // PILLAR 2: Parking
    parking: 'limited',
    parkingNotes: 'Street parking available. Garage 2 blocks away on Olive St.',
    parkingCost: '$10-15',
    
    // PILLAR 3: Vibe
    vibe: 'Energetic',
    vibeEmoji: '⚡',
    vibeSource: 'reviews',
    
    // PILLAR 4: Safety
    incidents: 3,
    incidentTypes: ['Car break-in', 'Theft'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80',
    priceRange: '$$$',
    description: 'Multi-level rooftop bar with stunning downtown views. Known for frozen drinks and lively atmosphere.',
    dressCode: 'smart',
    happyHour: '$5 Margaritas & $4 Beers',
    happyHourEnd: '7pm',
    cover: 0,
    accessible: true,
    hearingLoop: false,
    eco: true,
    tags: ['Rooftops', 'Happy Hour', 'Views']
  },
  {
    id: 'v2',
    name: 'Truth & Alibi',
    type: 'Speakeasy',
    category: 'speakeasy',
    distance: '0.4 mi',
    district: 'Deep Ellum',
    address: '2818 Main St, Dallas, TX 75226',
    
    crowdLevel: 75,
    crowdLabel: 'busy',
    
    parking: 'street',
    parkingNotes: 'Street parking only. Paid lots on Commerce St.',
    parkingCost: '$5-10',
    
    vibe: 'Mysterious',
    vibeEmoji: '🎭',
    vibeSource: 'reviews',
    
    incidents: 5,
    incidentTypes: ['Car break-in', 'Theft', 'Assault'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    priceRange: '$$$',
    description: 'Hidden speakeasy behind a candy shop storefront. Craft cocktails and exclusive vibes.',
    dressCode: 'upscale',
    cover: 0,
    accessible: false,
    hearingLoop: false,
    eco: false,
    tags: ['Speakeasies', 'Cocktails', 'Hidden Gems']
  },
  {
    id: 'v3',
    name: 'The Rustic',
    type: 'Live Music Venue',
    category: 'livemusic',
    distance: '0.8 mi',
    district: 'Uptown',
    address: '3656 Howell St, Dallas, TX 75204',
    
    crowdLevel: 55,
    crowdLabel: 'moderate',
    
    parking: 'available',
    parkingNotes: 'Free lot on-site. Valet available on weekends.',
    parkingCost: 'Free / $15 valet',
    
    vibe: 'Lively',
    vibeEmoji: '🎉',
    vibeSource: 'reviews',
    
    incidents: 1,
    incidentTypes: ['Noise complaint'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    priceRange: '$$',
    description: 'Texas-sized patio with live country music, craft beer, and Southern comfort food.',
    dressCode: 'casual',
    happyHour: '1/2 Price Wine & Apps',
    happyHourEnd: '6pm',
    cover: 10,
    accessible: true,
    hearingLoop: true,
    eco: false,
    tags: ['Live Music', 'Patio', 'Country']
  },
  {
    id: 'v4',
    name: 'Stirr',
    type: 'Sports Bar',
    category: 'bar',
    distance: '0.5 mi',
    district: 'Deep Ellum',
    address: '2803 Main St, Dallas, TX 75226',
    
    crowdLevel: 80,
    crowdLabel: 'busy',
    
    parking: 'limited',
    parkingNotes: 'Street parking. Garage on Elm St 1 block away.',
    parkingCost: '$8-12',
    
    vibe: 'Loud',
    vibeEmoji: '🔊',
    vibeSource: 'reviews',
    
    incidents: 4,
    incidentTypes: ['Car break-in', 'Theft'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    priceRange: '$$',
    description: 'Multi-level sports bar with rooftop. Great for watching games and weekend brunch.',
    dressCode: 'casual',
    happyHour: '$4 Draft Beers',
    happyHourEnd: '8pm',
    cover: 0,
    accessible: false,
    hearingLoop: false,
    eco: false,
    tags: ['Sports', 'Rooftop', 'Brunch']
  },
  {
    id: 'v5',
    name: 'Bottled Blonde',
    type: 'Nightclub',
    category: 'club',
    distance: '0.6 mi',
    district: 'Deep Ellum',
    address: '2505 Pacific Ave, Dallas, TX 75226',
    
    crowdLevel: 95,
    crowdLabel: 'packed',
    
    parking: 'valet',
    parkingNotes: 'Valet only on weekends. Street parking weekdays.',
    parkingCost: '$15-20',
    
    vibe: 'Energetic',
    vibeEmoji: '🔥',
    vibeSource: 'reviews',
    
    incidents: 7,
    incidentTypes: ['Car break-in', 'Theft', 'Assault'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80',
    priceRange: '$$$$',
    description: 'High-energy club with DJ sets, bottle service, and late-night dancing.',
    dressCode: 'upscale',
    cover: 20,
    accessible: true,
    hearingLoop: false,
    eco: false,
    tags: ['Clubs', 'Dancing', 'VIP']
  },
  {
    id: 'v6',
    name: 'Katy Trail Ice House',
    type: 'Beer Garden',
    category: 'bar',
    distance: '1.2 mi',
    district: 'Uptown',
    address: '3127 Routh St, Dallas, TX 75201',
    
    crowdLevel: 35,
    crowdLabel: 'chill',
    
    parking: 'available',
    parkingNotes: 'Large free lot on-site. Easy access.',
    parkingCost: 'Free',
    
    vibe: 'Chill',
    vibeEmoji: '😌',
    vibeSource: 'reviews',
    
    incidents: 0,
    incidentTypes: [],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80',
    priceRange: '$$',
    description: 'Casual outdoor beer garden along the Katy Trail. Dog-friendly with great tacos.',
    dressCode: 'casual',
    happyHour: '$3 Tacos & $5 Margs',
    happyHourEnd: '7pm',
    cover: 0,
    accessible: true,
    hearingLoop: true,
    eco: true,
    tags: ['Beer Garden', 'Dog Friendly', 'Casual']
  },
  {
    id: 'v7',
    name: 'Midnight Rambler',
    type: 'Cocktail Bar',
    category: 'speakeasy',
    distance: '0.9 mi',
    district: 'Downtown',
    address: '1530 Main St, Dallas, TX 75201',
    
    crowdLevel: 65,
    crowdLabel: 'moderate',
    
    parking: 'garage',
    parkingNotes: 'Joule Hotel garage. Street parking also available.',
    parkingCost: '$10-15',
    
    vibe: 'Romantic',
    vibeEmoji: '💕',
    vibeSource: 'reviews',
    
    incidents: 1,
    incidentTypes: ['Theft'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    priceRange: '$$$',
    description: 'Subterranean cocktail den in The Joule hotel. Award-winning mixology and intimate vibes.',
    dressCode: 'smart',
    cover: 0,
    accessible: false,
    hearingLoop: false,
    eco: true,
    tags: ['Cocktails', 'Date Night', 'Hotel Bar']
  },
  {
    id: 'v8',
    name: 'Theory Nightclub',
    type: 'Nightclub',
    category: 'club',
    distance: '0.7 mi',
    district: 'Uptown',
    address: '2912 McKinney Ave, Dallas, TX 75204',
    
    crowdLevel: 85,
    crowdLabel: 'busy',
    
    parking: 'valet',
    parkingNotes: 'Valet required on weekends. Limited street parking.',
    parkingCost: '$20-25',
    
    vibe: 'Energetic',
    vibeEmoji: '⚡',
    vibeSource: 'reviews',
    
    incidents: 3,
    incidentTypes: ['Theft', 'Assault'],
    incidentPeriod: '30 days',
    
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
    priceRange: '$$$$',
    description: 'Premier Uptown nightclub with world-class sound system and celebrity DJ appearances.',
    dressCode: 'upscale',
    cover: 25,
    accessible: true,
    hearingLoop: false,
    eco: false,
    tags: ['Clubs', 'EDM', 'VIP']
  }
];

// Events - Using "Tonight" instead of "LIVE NOW" per audit
export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Mavs Watch Party',
    venue: 'Happiest Hour',
    venueId: 'v1',
    district: 'Victory Park',
    date: 'Tonight',
    time: '8:00 PM',
    crowdLevel: 90,
    cover: 0,
    image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=800&q=80',
    tags: ['Sports', 'Watch Party']
  },
  {
    id: 'e2',
    title: 'Live Country Music',
    venue: 'The Rustic',
    venueId: 'v3',
    district: 'Uptown',
    date: 'Tonight',
    time: '9:00 PM',
    crowdLevel: 70,
    cover: 15,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    tags: ['Live Music', 'Country']
  },
  {
    id: 'e3',
    title: 'Trivia Night',
    venue: 'Stirr',
    venueId: 'v4',
    district: 'Deep Ellum',
    date: 'Tonight',
    time: '7:00 PM',
    crowdLevel: 60,
    cover: 0,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    tags: ['Trivia', 'Games']
  },
  {
    id: 'e4',
    title: 'DJ Night: Bass Drop',
    venue: 'Bottled Blonde',
    venueId: 'v5',
    district: 'Deep Ellum',
    date: 'Fri, Jan 24',
    time: '10:00 PM',
    crowdLevel: 95,
    cover: 25,
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
    tags: ['EDM', 'DJ', 'Dancing']
  },
  {
    id: 'e5',
    title: 'Craft Cocktail Class',
    venue: 'Midnight Rambler',
    venueId: 'v7',
    district: 'Downtown',
    date: 'Sat, Jan 25',
    time: '6:00 PM',
    crowdLevel: 45,
    cover: 50,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    tags: ['Cocktails', 'Class']
  }
];

// Districts with map positions
export const DISTRICTS: District[] = [
  { id: 'd1', name: 'UPTOWN', venues: 12, crowdLevel: 'moderate', x: 65, y: 35 },
  { id: 'd2', name: 'DEEP ELLUM', venues: 18, crowdLevel: 'busy', x: 75, y: 60 },
  { id: 'd3', name: 'VICTORY PARK', venues: 5, crowdLevel: 'busy', x: 45, y: 45 },
  { id: 'd4', name: 'DOWNTOWN', venues: 8, crowdLevel: 'moderate', x: 55, y: 55 },
  { id: 'd5', name: 'BISHOP ARTS', venues: 6, crowdLevel: 'chill', x: 30, y: 75 },
  { id: 'd6', name: 'KNOX-HENDERSON', venues: 7, crowdLevel: 'moderate', x: 80, y: 25 }
];

// Categories for filtering
export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'Compass' },
  { id: 'rooftop', name: 'Rooftops', icon: 'Building' },
  { id: 'speakeasy', name: 'Speakeasies', icon: 'Wine' },
  { id: 'bar', name: 'Bars', icon: 'Beer' },
  { id: 'livemusic', name: 'Live Music', icon: 'Music' },
  { id: 'club', name: 'Clubs', icon: 'Users' },
  { id: 'lounge', name: 'Lounges', icon: 'Sofa' }
];

// Filters
export const FILTERS = [
  { id: 'accessible', label: 'Wheelchair', icon: 'Accessibility' },
  { id: 'hearingLoop', label: 'Hearing Loop', icon: 'Volume2' },
  { id: 'eco', label: 'Eco-Friendly', icon: 'Leaf' },
  { id: 'free', label: 'No Cover', icon: 'DollarSign' },
  { id: 'happyHour', label: 'Happy Hour', icon: 'Clock' },
  { id: 'goodParking', label: 'Easy Parking', icon: 'Car' }
];

// Helper: Get crowd label with "Usually" prefix (per audit)
export function getCrowdLabel(percent: number): { label: string; color: string; short: string } {
  if (percent >= 85) return { label: 'Usually Packed', color: '#ef4444', short: 'Packed' };
  if (percent >= 60) return { label: 'Usually Busy', color: '#f97316', short: 'Busy' };
  if (percent >= 40) return { label: 'Usually Moderate', color: '#3b82f6', short: 'Moderate' };
  return { label: 'Usually Chill', color: '#22c55e', short: 'Chill' };
}

// Helper: Get parking info
export function getParkingLabel(type: string): { label: string; color: string } {
  const parking: Record<string, { label: string; color: string }> = {
    available: { label: 'Usually Available', color: '#22c55e' },
    limited: { label: 'Usually Limited', color: '#f97316' },
    valet: { label: 'Valet Only', color: '#a855f7' },
    garage: { label: 'Garage Nearby', color: '#3b82f6' },
    street: { label: 'Street Only', color: '#f97316' }
  };
  return parking[type] || parking.limited;
}

// Helper: Get incident level (never say "safe" per audit)
export function getIncidentLabel(count: number): { label: string; color: string } {
  if (count === 0) return { label: 'No recent incidents', color: '#22c55e' };
  if (count <= 2) return { label: `${count} incidents`, color: '#f97316' };
  return { label: `${count} incidents`, color: '#ef4444' };
}

// Helper: Get vibe info
export function getVibeInfo(vibe: string): { color: string; icon: string } {
  const vibes: Record<string, { color: string; icon: string }> = {
    Energetic: { color: '#f97316', icon: '⚡' },
    Chill: { color: '#22c55e', icon: '😌' },
    Loud: { color: '#ef4444', icon: '🔊' },
    Romantic: { color: '#ec4899', icon: '💕' },
    Lively: { color: '#8b5cf6', icon: '🎉' },
    Mysterious: { color: '#6366f1', icon: '🎭' }
  };
  return vibes[vibe] || vibes.Chill;
}
