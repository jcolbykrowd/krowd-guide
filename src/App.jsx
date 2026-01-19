import React, { useState } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Flame, Clock, ChevronRight
} from 'lucide-react';

const ACCENT = '#FF2E63';

const VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'ROOFTOP LOUNGE', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, safety: 'high', distance: '0.3m', deal: '$5 Margaritas', dealEnd: '7pm' },
  { id: 'v2', name: 'The Rustic', type: 'LIVE MUSIC VENUE', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.7, safety: 'high', distance: '0.8m', deal: '1/2 Price Wine', dealEnd: '6pm' },
  { id: 'v3', name: 'Stirr', type: 'SPORTS BAR', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.8, safety: 'moderate', distance: '0.5m', deal: '$4 Draft Beers', dealEnd: '8pm' },
  { id: 'v4', name: 'Bottled Blonde', type: 'CLUB', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, safety: 'moderate', distance: '0.6m', deal: null, dealEnd: null },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'BEER GARDEN', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.4, safety: 'high', distance: '1.2m', deal: '$3 Tacos', dealEnd: '7pm' },
];

const DISTRICTS = [
  { name: 'UPTOWN', venues: 12, x: '65%', y: '55%', color: '#4ade80' },
  { name: 'DEEP ELLUM', venues: 8, x: '50%', y: '75%', color: '#facc15' },
  { name: 'VICTORY PARK', venues: 5, x: '60%', y: '40%', color: '#4ade80' },
  { name: 'BISHOP ARTS', venues: 3, x: '55%', y: '35%', color: '#4ade80' },
  { name: 'LOWER GREENVILLE', venues: 6, x: '15%', y: '38%', color: '#c084fc' },
  { name: 'KNOX-HENDERSON', venues: 7, x: '12%', y: '58%', color: '#facc15' },
];

const EVENTS = [
  { id: 'e1', name: 'Mavs Watch Party', venue: 'Happiest Hour', district: 'victory park', time: '8:00' },
  { id: 'e2', name: 'Josh Abbott Band', venue: 'The Rustic', district: 'uptown', time: '9:00' },
  { id: 'e3', name: 'Trivia Night', venue: 'Stirr', district: 'deep ellum', time: '7:00' },
  { id: 'e4', name: 'Salsa Night', venue: 'Vidorra', district: 'bishop arts', time: '10:00' },
];

const CATEGORIES = ['Rooftops', 'Speakeasies', 'Dive Bars', 'Live Music'];

// Components
const Avatar = ({ size = 44 }) => (
  <div 
    className="rounded-full overflow-hidden border-2 border-green-500"
    style={{ width: size, height: size }}
  >
    <img 
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
      alt="Profile" 
      className="w-full h-full object-cover"
    />
  </div>
);

const LoadBadge = ({ load }) => {
  const color = load >= 0.8 ? '#ef4444' : load >= 0.5 ? '#facc15' : '#4ade80';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-white text-xs font-bold">{Math.round(load * 100)}% LOAD</span>
    </div>
  );
};

const SafetyBadge = ({ safety }) => {
  const color = safety === 'high' ? '#4ade80' : '#facc15';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-xs font-bold" style={{ color }}>{safety.toUpperCase()} SAFETY</span>
    </div>
  );
};

// Home Tab
const HomeTab = () => {
  const happyHourVenues = VENUES.filter(v => v.deal);
  const trendingVenues = VENUES.filter(v => v.crowd >= 0.7);

  return (
    <div className="h-full overflow-y-auto pb-28" style={{ background: '#09090b' }}>
      {/* Header */}
      <div className="p-5 pt-12 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-white">Dallas</span>
            <span style={{ color: ACCENT }}>.Live</span>
          </h1>
          <p className="text-gray-500 text-xs tracking-widest mt-1">NIGHTLIFE NETWORK</p>
        </div>
        <Avatar />
      </div>

      {/* Krowd Intelligence Alert */}
      <div className="mx-5 mb-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10" style={{ background: '#18181b' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <Sparkles size={24} className="text-indigo-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold tracking-wider" style={{ color: ACCENT }}>KROWD INTELLIGENCE</p>
            <p className="text-white text-sm">Deep Ellum is spiking. 3 venues just hit ...</p>
          </div>
        </div>
      </div>

      {/* Happy Hours Active */}
      <div className="mb-6">
        <div className="flex items-center gap-2 px-5 mb-4">
          <Clock size={18} style={{ color: '#facc15' }} />
          <h2 className="text-lg font-bold" style={{ color: '#facc15' }}>Happy Hours Active</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2" style={{ scrollbarWidth: 'none' }}>
          {happyHourVenues.map(venue => (
            <div key={venue.id} className="shrink-0 w-44">
              <div className="relative h-32 rounded-2xl overflow-hidden mb-2">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: ACCENT }}>
                  Until {venue.dealEnd}
                </div>
              </div>
              <h3 className="text-white font-bold text-sm">{venue.name}</h3>
              <p className="text-gray-400 text-xs">{venue.deal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="mb-6">
        <div className="flex items-center gap-2 px-5 mb-4">
          <h2 className="text-xl font-bold text-white">Trending</h2>
          <Flame size={20} className="text-orange-500" />
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2" style={{ scrollbarWidth: 'none' }}>
          {trendingVenues.map(venue => (
            <div key={venue.id} className="shrink-0 w-72">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <LoadBadge load={venue.crowd} />
                  <SafetyBadge safety={venue.safety} />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg">{venue.name}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MapPin size={12} />
                <span>{venue.distance}</span>
                <span className="text-gray-600">//</span>
                <span>{venue.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className="flex items-center justify-between p-4 rounded-2xl border border-white/10"
            style={{ background: '#18181b' }}
          >
            <span className="text-white font-medium">{cat}</span>
            <ArrowUpRight size={18} className="text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Map Tab
const MapTab = () => {
  return (
    <div 
      className="h-full relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #1a4a3a 50%, #2d3a1a 75%, #3a2a1a 100%)'
      }}
    >
      {/* Header */}
      <div className="absolute top-12 left-5 right-5 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white text-sm font-bold">LIVE NET</span>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <MapPin size={20} className="text-white" />
        </button>
      </div>

      {/* District Bubbles */}
      {DISTRICTS.map(district => (
        <div
          key={district.name}
          className="absolute flex flex-col items-center"
          style={{ left: district.x, top: district.y, transform: 'translate(-50%, -50%)' }}
        >
          <div 
            className="w-16 h-16 rounded-full flex flex-col items-center justify-center mb-1"
            style={{ 
              background: `${district.color}20`,
              border: `2px solid ${district.color}40`
            }}
          >
            <span className="text-xl font-bold" style={{ color: district.color }}>{district.venues}</span>
            <span className="text-xs" style={{ color: district.color }}>VENUES</span>
          </div>
          <span 
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ 
              background: 'rgba(0,0,0,0.6)',
              color: district.color
            }}
          >
            {district.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Events Tab
const EventsTab = () => {
  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5" style={{ background: '#09090b' }}>
      <h1 className="text-3xl font-bold text-white mb-6">Tonight's Events</h1>
      
      <div className="space-y-4">
        {EVENTS.map(event => (
          <div 
            key={event.id}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: '#18181b' }}
          >
            <div className="w-20 h-20 rounded-xl flex flex-col items-center justify-center" style={{ background: '#09090b' }}>
              <span className="text-gray-400 text-xs font-bold">TODAY</span>
              <span className="text-white text-2xl font-bold">{event.time}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{event.name}</h3>
              <p className="font-bold" style={{ color: ACCENT }}>{event.venue}</p>
              <p className="text-gray-500 text-sm">{event.district}</p>
            </div>
            <ChevronRight size={24} className="text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Tab
const ProfileTab = () => {
  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5" style={{ background: '#09090b' }}>
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Alex Thompson</h1>
        <p className="text-gray-400">@alexthompson</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-2xl" style={{ background: '#18181b' }}>
          <p className="text-2xl font-bold text-white">47</p>
          <p className="text-gray-400 text-xs">Check-ins</p>
        </div>
        <div className="text-center p-4 rounded-2xl" style={{ background: '#18181b' }}>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-gray-400 text-xs">Reviews</p>
        </div>
        <div className="text-center p-4 rounded-2xl" style={{ background: '#18181b' }}>
          <p className="text-2xl font-bold text-white">89</p>
          <p className="text-gray-400 text-xs">Friends</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-4">Favorite Spots</h2>
      <div className="space-y-3">
        {VENUES.slice(0, 3).map(venue => (
          <div 
            key={venue.id}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: '#18181b' }}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold">{venue.name}</h3>
              <p className="text-gray-400 text-xs">{venue.district}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: '#09090b' }}>
      {/* Content */}
      <main className="h-full">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'map' && <MapTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      {/* Bottom Nav */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4">
        <nav 
          className="rounded-full p-2 flex justify-around"
          style={{ background: 'rgba(30,30,30,0.95)' }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isActive ? ACCENT : 'transparent',
                  color: isActive ? 'white' : '#6b7280'
                }}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
