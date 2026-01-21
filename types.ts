// KrowdGuide Types - Updated with Four Pillars

export type TabType = 'home' | 'map' | 'events' | 'profile';

export type CrowdLevel = 'chill' | 'moderate' | 'busy' | 'packed';
export type VibeType = 'Energetic' | 'Chill' | 'Loud' | 'Romantic' | 'Lively' | 'Mysterious';
export type ParkingType = 'available' | 'limited' | 'valet' | 'garage' | 'street';
export type DressCode = 'casual' | 'smart' | 'upscale' | 'club';

export interface Venue {
  id: string;
  name: string;
  type: string;
  category: 'bar' | 'club' | 'rooftop' | 'speakeasy' | 'lounge' | 'livemusic';
  distance: string;
  district: string;
  address: string;
  
  // PILLAR 1: Crowd (Historical patterns, NOT real-time)
  crowdLevel: number; // 0-100
  crowdLabel: CrowdLevel;
  
  // PILLAR 2: Parking
  parking: ParkingType;
  parkingNotes: string;
  parkingCost?: string;
  
  // PILLAR 3: Vibe/Atmosphere (Separate from crowd per audit)
  vibe: VibeType;
  vibeEmoji: string;
  vibeSource: 'reviews' | 'reports';
  vibeReportCount?: number;
  
  // PILLAR 4: Safety (Dallas PD data, NOT "safe/unsafe")
  incidents: number;
  incidentTypes: string[];
  incidentPeriod: string;
  
  // Other details
  image: string;
  priceRange: string;
  description: string;
  dressCode: DressCode;
  
  // Optional features
  happyHour?: string;
  happyHourEnd?: string;
  cover: number;
  accessible: boolean;
  hearingLoop: boolean;
  eco: boolean;
  
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  venueId: string;
  district: string;
  date: string; // "Tonight" or "Fri, Jan 24"
  time: string;
  crowdLevel: number;
  image: string;
  cover: number;
  tags: string[];
}

export interface District {
  id: string;
  name: string;
  venues: number;
  crowdLevel: CrowdLevel;
  x: number; // Map position %
  y: number;
}

export interface CheckIn {
  venueId: string;
  time: number;
}

export interface CrowdReport {
  venueId: string;
  level: number;
  time: number;
}
