import React, { useState, memo, useCallback } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Flame, Clock, ChevronRight, X
} from 'lucide-react';

// ============================================================================
// CONSTANTS - Move to separate file (e.g., constants.js) for larger projects
// TODO: Replace hardcoded data with API calls to backend
// API endpoints to implement:
//   GET /api/venues - Fetch all venues
//   GET /api/venues/:id - Fetch venue details
//   GET /api/events - Fetch tonight's events
//   GET /api/districts - Fetch district data with live counts
// ============================================================================

const ACCENT = '#FF2E63';
const BG_PRIMARY = '#09090b';
const BG_CARD = '#18181b';

// TODO: Fetch from GET /api/venues
const VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'ROOFTOP LOUNGE', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, safety: 'high', distance: '0.3m', deal: '$5 Margaritas', dealEnd: '7pm', address: '2616 Olive St, Dallas, TX', phone: '(214) 528-3500' },
  { id: 'v2', name: 'The Rustic', type: 'LIVE MUSIC VENUE', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.7, safety: 'high', distance: '0.8m', deal: '1/2 Price Wine', dealEnd: '6pm', address: '3656 Howell St, Dallas, TX', phone: '(214) 730-0596' },
  { id: 'v3', name: 'Stirr', type: 'SPORTS BAR', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.8, safety: 'moderate', distance: '0.5m', deal: '$4 Draft Beers', dealEnd: '8pm', address: '2803 Main St, Dallas, TX', phone: '(214) 741-4747' },
  { id: 'v4', name: 'Bottled Blonde', type: 'CLUB', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, safety: 'moderate', distance: '0.6m', deal: null, dealEnd: null, address: '2505 Pacific Ave, Dallas, TX', phone: '(214) 749-1916' },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'BEER GARDEN', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.4, safety: 'high', distance: '1.2m', deal: '$3 Tacos', dealEnd: '7pm', address: '3127 Routh St, Dallas, TX', phone: '(214) 468-0600' },
];

// TODO: Fetch from GET /api/districts with real-time venue counts
const DISTRICTS = [
  { id: 'd1', name: 'UPTOWN', venues: 12, x: 65, y: 55, color: '#4ade80' },
  { id: 'd2', name: 'DEEP ELLUM', venues: 8, x: 50, y: 75, color: '#facc15' },
  { id: 'd3', name: 'VICTORY PARK', venues: 5, x: 60, y: 40, color: '#4ade80' },
  { id: 'd4', name: 'BISHOP ARTS', venues: 3, x: 55, y: 32, color: '#4ade80' },
  { id: 'd5', name: 'LOWER GREENVILLE', venues: 6, x: 18, y: 38, color: '#c084fc' },
  { id: 'd6', name: 'KNOX-HENDERSON', venues: 7, x: 15, y: 58, color: '#facc15' },
];

// TODO: Fetch from GET /api/events?date=today
const EVENTS = [
  { id: 'e1', name: 'Mavs Watch Party', venue: 'Happiest Hour', venueId: 'v1', district: 'victory park', time: '8:00' },
  { id: 'e2', name: 'Josh Abbott Band', venue: 'The Rustic', venueId: 'v2', district: 'uptown', time: '9:00' },
  { id: 'e3', name: 'Trivia Night', venue: 'Stirr', venueId: 'v3', district: 'deep ellum', time: '7:00' },
  { id: 'e4', name: 'Salsa Night', venue: 'Vidorra', venueId: 'v5', district: 'bishop arts', time: '10:00' },
];

const CATEGORIES = ['Rooftops', 'Speakeasies', 'Dive Bars', 'Live Music'];

// ============================================================================
// MEMOIZED COMPONENTS - Prevent unnecessary re-renders in lists
// ============================================================================

const Avatar = memo(({ size = 44 }) => (
  <div 
    className="rounded-full overflow-hidden border-2 border-green-500 shrink-0"
    style={{ width: size, height: size }}
  >
    <img 
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
      alt="Your profile picture" 
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </div>
));

const LoadBadge = memo(({ load }) => {
  const percentage = Math.round(load * 100);
  const color = load >= 0.8 ? 'bg-red-500' : load >= 0.5 ? 'bg-yellow-400' : 'bg-green-500';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-white text-xs font-bold">{percentage}% LOAD</span>
    </div>
  );
});

const SafetyBadge = memo(({ safety }) => {
  const isHigh = safety === 'high';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60">
      <div className={`w-2 h-2 rounded-full ${isHigh ? 'bg-green-500' : 'bg-yellow-400'}`} />
      <span className={`text-xs font-bold ${isHigh ? 'text-green-400' : 'text-yellow-400'}`}>
        {safety.toUpperCase()} SAFETY
      </span>
    </div>
  );
});

// ============================================================================
// VENUE DETAIL MODAL
// ============================================================================

const VenueModal = memo(({ venue, onClose }) => {
  if (!venue) return null;
  
  // TODO: Track view event - POST /api/analytics/venue-view
  console.log('[Analytics] Venue viewed:', venue.id, venue.name);
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close venue details"
      />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-t-3xl p-6 pb-10 animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={20} className="text-white" />
        </button>
        
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6" />
        
        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
          <img 
            src={venue.image} 
            alt={`${venue.name} venue`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <LoadBadge load={venue.crowd} />
            <SafetyBadge safety={venue.safety} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-1">{venue.name}</h2>
        <p className="text-zinc-400 text-sm mb-4">{venue.type} • {venue.district}</p>
        
        {venue.deal && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-4">
            <p className="text-yellow-400 font-bold text-sm">🍹 Happy Hour: {venue.deal}</p>
            <p className="text-zinc-500 text-xs">Until {venue.dealEnd}</p>
          </div>
        )}
        
        <div className="space-y-2 mb-6">
          <p className="text-zinc-400 text-sm flex items-center gap-2">
            <MapPin size={14} /> {venue.address}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="py-4 rounded-2xl font-bold text-sm text-white bg-pink-600 active:scale-95 transition-transform"
            onClick={() => {
              // TODO: POST /api/checkin { venueId: venue.id }
              console.log('[Action] Check in:', venue.id);
              alert(`Checking in to ${venue.name}!`);
            }}
          >
            Check In
          </button>
          <button 
            className="py-4 rounded-2xl font-bold text-sm text-white bg-zinc-800 border border-zinc-700 active:scale-95 transition-transform"
            onClick={() => {
              // TODO: Open directions in maps app
              console.log('[Action] Get directions:', venue.address);
              alert(`Directions to ${venue.address}`);
            }}
          >
            Directions
          </button>
        </div>
      </div>
    </div>
  );
});

// ============================================================================
// HOME TAB
// ============================================================================

const HomeTab = ({ onVenueSelect }) => {
  const happyHourVenues = VENUES.filter(v => v.deal);
  const trendingVenues = VENUES.filter(v => v.crowd >= 0.7);

  const handleCategoryClick = useCallback((category) => {
    // TODO: Navigate to category list - GET /api/venues?category={category}
    console.log('[Navigation] Category selected:', category);
    alert(`Showing ${category} venues`);
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-28 bg-zinc-950">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-white">Dallas</span>
            <span className="text-pink-500">.Live</span>
          </h1>
          <p className="text-zinc-500 text-xs tracking-widest mt-1">NIGHTLIFE NETWORK</p>
        </div>
        <Avatar />
      </header>

      {/* Krowd Intelligence Alert */}
      <section className="px-5 mb-6" aria-label="Krowd Intelligence">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-wider text-pink-500">KROWD INTELLIGENCE</p>
            <p className="text-white text-sm truncate">Deep Ellum is spiking. 3 venues just hit capacity...</p>
          </div>
        </div>
      </section>

      {/* Happy Hours Active */}
      <section className="mb-6" aria-label="Happy Hours">
        <div className="flex items-center gap-2 px-5 mb-4">
          <Clock size={18} className="text-yellow-400" />
          <h2 className="text-lg font-bold text-yellow-400">Happy Hours Active</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {happyHourVenues.map(venue => (
            <button 
              key={venue.id} 
              className="shrink-0 w-44 text-left active:scale-95 transition-transform"
              onClick={() => onVenueSelect(venue)}
              aria-label={`View ${venue.name} details`}
            >
              <div className="relative h-32 rounded-2xl overflow-hidden mb-2">
                <img 
                  src={venue.image} 
                  alt={`${venue.name} venue`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-xs font-bold text-white bg-pink-600">
                  Until {venue.dealEnd}
                </div>
              </div>
              <h3 className="text-white font-bold text-sm">{venue.name}</h3>
              <p className="text-zinc-400 text-xs">{venue.deal}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mb-6" aria-label="Trending venues">
        <div className="flex items-center gap-2 px-5 mb-4">
          <h2 className="text-xl font-bold text-white">Trending</h2>
          <Flame size={20} className="text-orange-500" />
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {trendingVenues.map(venue => (
            <button 
              key={venue.id} 
              className="shrink-0 w-72 text-left active:scale-95 transition-transform"
              onClick={() => onVenueSelect(venue)}
              aria-label={`View ${venue.name} details`}
            >
              <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                <img 
                  src={venue.image} 
                  alt={`${venue.name} venue`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <LoadBadge load={venue.crowd} />
                  <SafetyBadge safety={venue.safety} />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg">{venue.name}</h3>
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <MapPin size={12} />
                <span>{venue.distance}</span>
                <span className="text-zinc-600">//</span>
                <span>{venue.type}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-5" aria-label="Venue categories">
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-zinc-800 active:scale-95 transition-transform min-h-[56px]"
              aria-label={`Browse ${cat}`}
            >
              <span className="text-white font-medium">{cat}</span>
              <ArrowUpRight size={18} className="text-zinc-500" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MAP TAB - TODO: Integrate with Mapbox or Google Maps API
// ============================================================================

const MapTab = ({ onDistrictSelect }) => {
  return (
    <div className="h-full relative overflow-hidden bg-zinc-950">
      {/* SVG Map Background - Placeholder for real map integration */}
      {/* TODO: Replace with Mapbox GL JS or Google Maps API */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a3a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16213e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
          </radialGradient>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.2" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mapGlow)" />
        <rect width="100" height="100" fill="url(#grid)" />
        {/* Stylized road lines */}
        <path d="M 0 50 Q 30 45, 50 50 T 100 55" stroke="#2d3748" strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M 50 0 Q 55 30, 50 50 T 45 100" stroke="#2d3748" strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M 20 0 L 30 100" stroke="#2d3748" strokeWidth="0.3" fill="none" opacity="0.3"/>
        <path d="M 70 0 L 80 100" stroke="#2d3748" strokeWidth="0.3" fill="none" opacity="0.3"/>
      </svg>

      {/* Header */}
      <header className="absolute top-12 left-5 right-5 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white text-sm font-bold">LIVE NET</span>
        </div>
        <button 
          className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Center map on your location"
          onClick={() => {
            // TODO: Center map on user location
            console.log('[Map] Center on user location');
          }}
        >
          <MapPin size={20} className="text-white" />
        </button>
      </header>

      {/* District Bubbles */}
      {DISTRICTS.map(district => (
        <button
          key={district.id}
          onClick={() => {
            // TODO: Zoom to district and show venues
            console.log('[Map] District selected:', district.name);
            onDistrictSelect(district);
          }}
          className="absolute flex flex-col items-center active:scale-110 transition-transform"
          style={{ left: `${district.x}%`, top: `${district.y}%`, transform: 'translate(-50%, -50%)' }}
          aria-label={`${district.name}: ${district.venues} venues`}
        >
          <div 
            className="w-16 h-16 rounded-full flex flex-col items-center justify-center mb-1 border-2"
            style={{ 
              backgroundColor: `${district.color}20`,
              borderColor: `${district.color}40`
            }}
          >
            <span className="text-xl font-bold" style={{ color: district.color }}>{district.venues}</span>
            <span className="text-[10px] font-medium" style={{ color: district.color }}>VENUES</span>
          </div>
          <span 
            className="text-[10px] font-bold px-2 py-1 rounded bg-black/70"
            style={{ color: district.color }}
          >
            {district.name}
          </span>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// EVENTS TAB
// ============================================================================

const EventsTab = ({ onEventSelect }) => {
  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5 bg-zinc-950">
      <h1 className="text-3xl font-bold text-white mb-6">Tonight's Events</h1>
      
      <div className="space-y-4">
        {EVENTS.map(event => (
          <button 
            key={event.id}
            onClick={() => {
              // TODO: Navigate to event details - GET /api/events/{event.id}
              console.log('[Navigation] Event selected:', event.id);
              onEventSelect(event);
            }}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 text-left active:scale-[0.98] transition-transform"
            aria-label={`${event.name} at ${event.venue}, ${event.time}`}
          >
            <div className="w-20 h-20 rounded-xl bg-zinc-950 flex flex-col items-center justify-center shrink-0">
              <span className="text-zinc-400 text-xs font-bold">TODAY</span>
              <span className="text-white text-2xl font-bold">{event.time}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg truncate">{event.name}</h3>
              <p className="text-pink-500 font-bold truncate">{event.venue}</p>
              <p className="text-zinc-500 text-sm">{event.district}</p>
            </div>
            <ChevronRight size={24} className="text-zinc-600 shrink-0" />
          </button>
        ))}
      </div>
      
      {/* TODO: Add "Load More" button for pagination */}
      <div className="mt-6 text-center">
        <p className="text-zinc-600 text-sm">More events coming soon</p>
      </div>
    </div>
  );
};

// ============================================================================
// PROFILE TAB
// ============================================================================

const ProfileTab = ({ onVenueSelect }) => {
  // TODO: Fetch from GET /api/user/profile
  const userStats = { checkins: 47, reviews: 12, friends: 89 };
  
  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5 bg-zinc-950">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
            alt="Your profile picture" 
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Alex Thompson</h1>
        <p className="text-zinc-400">@alexthompson</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Check-ins', value: userStats.checkins },
          { label: 'Reviews', value: userStats.reviews },
          { label: 'Friends', value: userStats.friends },
        ].map(stat => (
          <div key={stat.label} className="text-center p-4 rounded-2xl bg-zinc-900">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-zinc-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-white mb-4">Favorite Spots</h2>
      <div className="space-y-3">
        {VENUES.slice(0, 3).map(venue => (
          <button 
            key={venue.id}
            onClick={() => onVenueSelect(venue)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-left active:scale-[0.98] transition-transform"
            aria-label={`View ${venue.name} details`}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img 
                src={venue.image} 
                alt={`${venue.name} venue`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate">{venue.name}</h3>
              <p className="text-zinc-400 text-xs">{venue.district}</p>
            </div>
            <ChevronRight size={18} className="text-zinc-600 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// BOTTOM NAVIGATION
// ============================================================================

const BottomNav = memo(({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-5"
      aria-label="Main navigation"
    >
      <div className="rounded-full p-2 flex justify-around bg-zinc-900/95 border border-zinc-800">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                isActive ? 'bg-pink-600 text-white' : 'text-zinc-500'
              }`}
              aria-label={`Switch to ${tab.label} tab`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
    </nav>
  );
});

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleVenueSelect = useCallback((venue) => {
    console.log('[App] Venue selected:', venue.id);
    setSelectedVenue(venue);
  }, []);

  const handleVenueClose = useCallback(() => {
    setSelectedVenue(null);
  }, []);

  const handleDistrictSelect = useCallback((district) => {
    // TODO: Show district venues in a list or zoom map
    alert(`${district.name}\n${district.venues} venues available`);
  }, []);

  const handleEventSelect = useCallback((event) => {
    // Find the venue and show details
    const venue = VENUES.find(v => v.id === event.venueId);
    if (venue) {
      setSelectedVenue(venue);
    } else {
      alert(`${event.name}\nat ${event.venue}\n${event.time} today`);
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-zinc-950">
      {/* Inline styles for animations and scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      {/* Tab Content */}
      <main className="h-full">
        {activeTab === 'home' && <HomeTab onVenueSelect={handleVenueSelect} />}
        {activeTab === 'map' && <MapTab onDistrictSelect={handleDistrictSelect} />}
        {activeTab === 'events' && <EventsTab onEventSelect={handleEventSelect} />}
        {activeTab === 'profile' && <ProfileTab onVenueSelect={handleVenueSelect} />}
      </main>

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <VenueModal venue={selectedVenue} onClose={handleVenueClose} />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
