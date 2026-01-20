import React, { useState, useEffect, memo, useCallback } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Flame, Clock, ChevronRight, X, Heart, Send, Lock,
  ChevronLeft, ChevronRight as ChevronRightIcon, Plus, AlertCircle,
  CheckCircle, Star, Users, Navigation, Wine, Music, Building, Compass
} from 'lucide-react';

// ============================================================================
// CONSTANTS
// ============================================================================

const ACCENT = '#FF2E63';

const VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'ROOFTOP LOUNGE', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, distance: '0.3m', deal: '$5 Margaritas', dealEnd: '7pm', address: '2616 Olive St, Dallas, TX', cover: 0, badge: 'free', dressCode: 'smart' },
  { id: 'v2', name: 'The Rustic', type: 'LIVE MUSIC VENUE', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.55, distance: '0.8m', deal: '1/2 Price Wine', dealEnd: '6pm', address: '3656 Howell St, Dallas, TX', cover: 10, badge: null, dressCode: 'casual' },
  { id: 'v3', name: 'Stirr', type: 'SPORTS BAR', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.75, distance: '0.5m', deal: '$4 Draft Beers', dealEnd: '8pm', address: '2803 Main St, Dallas, TX', cover: 0, badge: 'hot', dressCode: 'casual' },
  { id: 'v4', name: 'Bottled Blonde', type: 'CLUB', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, distance: '0.6m', deal: null, dealEnd: null, address: '2505 Pacific Ave, Dallas, TX', cover: 20, badge: 'hot', dressCode: 'upscale' },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'BEER GARDEN', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.35, distance: '1.2m', deal: '$3 Tacos', dealEnd: '7pm', address: '3127 Routh St, Dallas, TX', cover: 0, badge: 'new', dressCode: 'casual' },
];

const DISTRICTS = [
  { id: 'd1', name: 'UPTOWN', venues: 12, x: 65, y: 55, color: '#4ade80' },
  { id: 'd2', name: 'DEEP ELLUM', venues: 8, x: 50, y: 75, color: '#facc15' },
  { id: 'd3', name: 'VICTORY PARK', venues: 5, x: 60, y: 40, color: '#4ade80' },
  { id: 'd4', name: 'BISHOP ARTS', venues: 3, x: 55, y: 32, color: '#4ade80' },
  { id: 'd5', name: 'LOWER GREENVILLE', venues: 6, x: 18, y: 38, color: '#c084fc' },
  { id: 'd6', name: 'KNOX-HENDERSON', venues: 7, x: 15, y: 58, color: '#facc15' },
];

const EVENTS = [
  { id: 'e1', name: 'Mavs Watch Party', venue: 'Happiest Hour', venueId: 'v1', district: 'victory park', time: '8:00', date: 'Tonight', cover: 0, isLive: true, image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=800&q=80' },
  { id: 'e2', name: 'Josh Abbott Band', venue: 'The Rustic', venueId: 'v2', district: 'uptown', time: '9:00', date: 'Tonight', cover: 15, isLive: false, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' },
  { id: 'e3', name: 'Trivia Night', venue: 'Stirr', venueId: 'v3', district: 'deep ellum', time: '7:00', date: 'Tonight', cover: 0, isLive: true, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
  { id: 'e4', name: 'Neon Glow Party', venue: 'Bottled Blonde', venueId: 'v4', district: 'deep ellum', time: '10:00', date: 'Fri, Jan 24', cover: 25, isLive: false, image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80' },
];

const PERFORMERS = [
  { id: 'p1', name: 'DJ Spinz', image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=200&q=80', isLive: true, venue: 'Bottled Blonde' },
  { id: 'p2', name: 'MC Thunder', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80', isLive: true, venue: 'Stirr' },
  { id: 'p3', name: 'Lady Bass', image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=200&q=80', isLive: false, venue: 'The Rustic' },
  { id: 'p4', name: 'Josh Abbott', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80', isLive: false, venue: 'The Rustic' },
  { id: 'p5', name: 'Neon Collective', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&q=80', isLive: false, venue: 'Happiest Hour' },
];

const CATEGORIES = [
  { name: 'Rooftops', icon: Building },
  { name: 'Speakeasies', icon: Wine },
  { name: 'Dive Bars', icon: Music },
  { name: 'Live Music', icon: Compass }
];

// ============================================================================
// HELPERS
// ============================================================================

const getVibeFromCrowd = (crowd) => {
  if (crowd >= 0.85) return { label: 'PACKED', color: '#ef4444', bg: 'bg-red-500' };
  if (crowd >= 0.60) return { label: 'HYPE', color: '#f97316', bg: 'bg-orange-500' };
  if (crowd >= 0.40) return { label: 'MODERATE', color: '#3b82f6', bg: 'bg-blue-500' };
  return { label: 'CHILL', color: '#22c55e', bg: 'bg-green-500' };
};

const getDressCodeInfo = (code) => {
  const codes = {
    casual: { label: 'Casual', color: '#22c55e', icon: '👟' },
    smart: { label: 'Smart Casual', color: '#3b82f6', icon: '👔' },
    upscale: { label: 'Upscale', color: '#a855f7', icon: '🎩' }
  };
  return codes[code] || codes.casual;
};

// ============================================================================
// SPLASH SCREEN
// ============================================================================

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => onComplete(), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${phase >= 4 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 opacity-[0.03] overflow-hidden text-white">
        <MapPin className="absolute top-[10%] left-[10%]" size={40} />
        <Music className="absolute top-[15%] right-[15%]" size={32} />
        <Wine className="absolute bottom-[25%] left-[15%]" size={36} />
        <Building className="absolute bottom-[15%] right-[12%]" size={28} />
      </div>

      <div 
        className={`absolute w-80 h-80 rounded-full transition-opacity duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`, filter: 'blur(60px)' }}
      />

      <div className="flex items-center gap-2 relative z-10">
        <span className={`text-5xl font-black tracking-tight text-white transition-all duration-700 ease-out ${phase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}>
          Krowd
        </span>
        <span className={`text-5xl font-black tracking-tight transition-all duration-700 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`} style={{ color: ACCENT }}>
          Guide
        </span>
      </div>

      <p className={`text-base tracking-widest text-zinc-400 uppercase mt-5 transition-all duration-700 ease-out relative z-10 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Know Before You Go
      </p>

      <div className={`flex gap-2.5 mt-10 transition-opacity duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        {[0, 1, 2].map(i => (
          <div 
            key={i}
            className="w-2.5 h-2.5 rounded-full animate-dot-pulse"
            style={{ animationDelay: `${i * 200}ms` }} 
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LOCATION PERMISSION SCREEN - FIXED with skip option
// ============================================================================

const LocationScreen = ({ onContinue }) => {
  const [status, setStatus] = useState('prompt'); // prompt, requesting, denied, granted, unsupported
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const requestLocation = () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log('[Location] Geolocation not supported');
      setStatus('unsupported');
      return;
    }

    setStatus('requesting');
    console.log('[Location] Requesting permission...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('[Location] Permission granted:', position.coords.latitude, position.coords.longitude);
        setStatus('granted');
        // Small delay to show success state
        setTimeout(() => onContinue(), 800);
      },
      (error) => {
        console.log('[Location] Permission denied or error:', error.message, error.code);
        setStatus('denied');
      },
      { 
        enableHighAccuracy: false, // Less strict for faster response
        timeout: 15000, 
        maximumAge: 300000 // Allow cached position up to 5 min
      }
    );
  };

  const handleSkip = () => {
    console.log('[Location] User skipped location permission');
    onContinue();
  };

  // Success state
  if (status === 'granted') {
    return (
      <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center px-8 z-50">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <CheckCircle size={56} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">You're all set!</h1>
        <p className="text-zinc-400 mt-2">Finding venues near you...</p>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center px-8 z-50 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <path d="M10 30 L30 30 L30 50 L50 50 L50 30 L70 30 L70 60 L90 60" stroke="#fff" strokeWidth="0.4" fill="none" />
          <path d="M20 10 L20 90" stroke="#fff" strokeWidth="0.25" fill="none" />
          <path d="M50 5 L50 95" stroke="#fff" strokeWidth="0.25" fill="none" />
          <circle cx="30" cy="30" r="2.5" fill="#fff" opacity="0.6" />
          <circle cx="50" cy="50" r="3.5" fill="#fff" opacity="0.6" />
        </svg>
      </div>

      {/* Icon */}
      <div className="relative mb-10">
        <div className="absolute -inset-4 rounded-full animate-pulse" style={{ background: `${status === 'denied' ? '#ef4444' : ACCENT}20`, filter: 'blur(30px)' }} />
        <div className="relative w-28 h-28 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
          {status === 'denied' || status === 'unsupported' ? (
            <AlertCircle size={56} className="text-orange-500" />
          ) : status === 'requesting' ? (
            <div className="w-12 h-12 border-4 border-zinc-700 border-t-pink-500 rounded-full animate-spin" />
          ) : (
            <MapPin size={56} style={{ color: ACCENT }} />
          )}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        {status === 'denied' ? 'Location Unavailable' : 
         status === 'unsupported' ? 'Location Not Supported' : 
         status === 'requesting' ? 'Requesting Access...' :
         'Enable Location'}
      </h1>

      {/* Description */}
      <p className="text-base text-zinc-400 text-center max-w-xs mb-2 leading-relaxed">
        {status === 'denied' 
          ? 'We couldn\'t access your location. You can still browse venues manually or try again.'
          : status === 'unsupported'
          ? 'Your browser doesn\'t support location. You can still explore all venues.'
          : status === 'requesting'
          ? 'Please allow location access when prompted by your browser.'
          : 'Krowd Guide uses your location to show nearby venues and personalized recommendations.'}
      </p>

      {/* Buttons */}
      <div className="w-full max-w-xs mt-6 space-y-3">
        {status === 'prompt' && (
          <button 
            onClick={requestLocation}
            className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 min-h-[56px]" 
            style={{ backgroundColor: ACCENT }}
          >
            Enable Location
          </button>
        )}

        {status === 'requesting' && (
          <button 
            disabled
            className="w-full py-4 rounded-2xl font-bold text-white opacity-50 min-h-[56px]" 
            style={{ backgroundColor: ACCENT }}
          >
            Waiting for permission...
          </button>
        )}

        {(status === 'denied' || status === 'unsupported') && (
          <>
            <button 
              onClick={requestLocation}
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 min-h-[56px] bg-zinc-800 border border-zinc-700"
            >
              Try Again
            </button>
            <button 
              onClick={handleSkip}
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 min-h-[56px]" 
              style={{ backgroundColor: ACCENT }}
            >
              Continue Without Location
            </button>
          </>
        )}

        {status === 'prompt' && (
          <button 
            onClick={handleSkip}
            className="w-full py-3 text-zinc-400 text-sm transition-colors hover:text-white"
          >
            Skip for now
          </button>
        )}
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2 mt-8 text-zinc-400">
        <Lock size={16} />
        <span className="text-sm">Your location is never shared</span>
      </div>
    </div>
  );
};

// ============================================================================
// MEMOIZED COMPONENTS
// ============================================================================

const Avatar = memo(({ size = 48 }) => (
  <div className="rounded-full overflow-hidden border-2 border-green-500 shrink-0" style={{ width: size, height: size }}>
    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Profile" loading="lazy" className="w-full h-full object-cover" />
  </div>
));

const VenueBadge = memo(({ badge }) => {
  if (!badge) return null;
  const styles = { free: 'bg-green-500', new: 'bg-pink-600', hot: 'bg-orange-500' };
  return (
    <span className={`absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase text-white ${styles[badge]}`}>
      {badge}
    </span>
  );
});

const LoadBadge = memo(({ load }) => {
  const percentage = Math.round(load * 100);
  const color = load >= 0.8 ? 'bg-red-500' : load >= 0.5 ? 'bg-yellow-400' : 'bg-green-500';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/70">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-white text-xs font-bold">{percentage}%</span>
    </div>
  );
});

const VibeBadge = memo(({ crowd }) => {
  const vibe = getVibeFromCrowd(crowd);
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/70">
      <div className={`w-2 h-2 rounded-full ${vibe.bg}`} />
      <span className="text-xs font-bold" style={{ color: vibe.color }}>{vibe.label}</span>
    </div>
  );
});

const DressCodeBadge = memo(({ code }) => {
  const info = getDressCodeInfo(code);
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/70">
      <span className="text-xs">{info.icon}</span>
      <span className="text-xs font-bold" style={{ color: info.color }}>{info.label}</span>
    </div>
  );
});

const LiveNowBadge = memo(() => (
  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900/90">
    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    <span className="text-white text-xs font-bold">LIVE NOW</span>
  </div>
));

const PriceBadge = memo(({ cover }) => (
  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-800/90 border border-zinc-700">
    <span className={`text-xs font-bold ${cover === 0 ? 'text-green-400' : 'text-white'}`}>
      {cover === 0 ? 'FREE' : `$${cover}`}
    </span>
  </div>
));

const ActionButtons = memo(({ onShare, onFavorite, isFavorited }) => (
  <div className="flex gap-2">
    <button 
      onClick={onShare} 
      className="w-12 h-12 rounded-full bg-zinc-800/90 flex items-center justify-center active:scale-90 transition-transform border border-zinc-700"
    >
      <Send size={18} className="text-white" />
    </button>
    <button 
      onClick={onFavorite} 
      className={`w-12 h-12 rounded-full bg-zinc-800/90 flex items-center justify-center active:scale-90 transition-all border ${isFavorited ? 'border-pink-500/50' : 'border-zinc-700'}`}
    >
      <Heart size={18} className={`transition-all duration-300 ${isFavorited ? 'text-pink-500 fill-pink-500 scale-110' : 'text-white'}`} />
    </button>
  </div>
));

// ============================================================================
// VENUE MODAL
// ============================================================================

const VenueModal = memo(({ venue, onClose }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  if (!venue) return null;

  const vibe = getVibeFromCrowd(venue.crowd);
  const dressInfo = getDressCodeInfo(venue.dressCode);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-t-3xl p-6 pb-10 animate-slide-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <X size={22} className="text-white" />
        </button>
        
        <div className="w-14 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6" />
        
        <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <LoadBadge load={venue.crowd} />
            <VibeBadge crowd={venue.crowd} />
          </div>
          <div className="absolute top-3 right-3">
            <ActionButtons onShare={() => alert(`Share ${venue.name}`)} onFavorite={() => setIsFavorited(!isFavorited)} isFavorited={isFavorited} />
          </div>
        </div>
        
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-2xl font-bold text-white pr-4">{venue.name}</h2>
          <PriceBadge cover={venue.cover} />
        </div>
        <p className="text-zinc-400 text-sm mb-5">{venue.type} • {venue.district}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
            <p className="text-zinc-500 text-xs mb-1">Current Vibe</p>
            <p className="font-bold text-lg" style={{ color: vibe.color }}>{vibe.label}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
            <p className="text-zinc-500 text-xs mb-1">Dress Code</p>
            <p className="font-bold text-lg flex items-center gap-2" style={{ color: dressInfo.color }}>
              {dressInfo.icon} {dressInfo.label}
            </p>
          </div>
        </div>
        
        {venue.deal && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-5 border border-zinc-700">
            <p className="text-yellow-400 font-bold text-sm">🍹 Happy Hour: {venue.deal}</p>
            <p className="text-zinc-500 text-xs mt-1">Until {venue.dealEnd}</p>
          </div>
        )}
        
        <p className="text-zinc-400 text-sm flex items-center gap-2 mb-6">
          <MapPin size={16} className="text-zinc-500" /> {venue.address}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="py-4 rounded-2xl font-bold text-sm text-white active:scale-95 transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: ACCENT }}>
            <CheckCircle size={20} /> Check In
          </button>
          <button className="py-4 rounded-2xl font-bold text-sm text-white bg-zinc-800 border border-zinc-700 active:scale-95 transition-transform flex items-center justify-center gap-2">
            <Navigation size={20} /> Directions
          </button>
        </div>
      </div>
    </div>
  );
});

// ============================================================================
// DISCOVER MODE
// ============================================================================

const DiscoverMode = memo(({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState({});

  const event = EVENTS[currentIndex];
  const venue = VENUES.find(v => v.id === event.venueId);

  const goNext = () => setCurrentIndex(i => Math.min(i + 1, EVENTS.length - 1));
  const goPrev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const toggleFavorite = () => setFavorites(f => ({ ...f, [event.id]: !f[event.id] }));

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="absolute inset-0">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      <div className="absolute top-12 left-5 right-5 flex justify-between items-start z-10">
        <div className="flex flex-col gap-2">
          {event.isLive && <LiveNowBadge />}
          {venue && <VibeBadge crowd={venue.crowd} />}
          {venue && <DressCodeBadge code={venue.dressCode} />}
        </div>
        <div className="bg-zinc-900/80 rounded-xl px-4 py-3 text-center border border-zinc-800">
          <p className="text-zinc-400 text-xs uppercase font-medium">{event.date.split(',')[0] || 'TODAY'}</p>
          <p className="text-white text-2xl font-bold">{event.time}</p>
        </div>
      </div>

      <div className="absolute bottom-36 left-5 right-5 z-10">
        <h1 className="text-4xl font-bold text-white mb-3 leading-tight">{event.name}</h1>
        <p className="text-lg font-bold mb-1" style={{ color: ACCENT }}>{event.date}, {event.time}</p>
        <p className="text-zinc-300 text-lg">{event.venue}</p>
        
        <div className="flex items-center justify-between mt-6">
          <PriceBadge cover={event.cover} />
          <ActionButtons onShare={() => alert(`Share ${event.name}`)} onFavorite={toggleFavorite} isFavorited={favorites[event.id]} />
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <button onClick={goPrev} disabled={currentIndex === 0} className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center disabled:opacity-30 border border-zinc-700">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button onClick={onClose} className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
          <X size={26} className="text-black" />
        </button>
        <button onClick={goNext} disabled={currentIndex === EVENTS.length - 1} className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center disabled:opacity-30 border border-zinc-700">
          <ChevronRightIcon size={24} className="text-white" />
        </button>
      </div>

      <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-2 z-10">
        {EVENTS.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8' : 'w-2'}`}
            style={{ backgroundColor: i === currentIndex ? ACCENT : '#52525b' }}
          />
        ))}
      </div>
    </div>
  );
});

// ============================================================================
// HOME TAB
// ============================================================================

const HomeTab = ({ onVenueSelect }) => {
  const happyHourVenues = VENUES.filter(v => v.deal);
  const trendingVenues = VENUES.filter(v => v.crowd >= 0.5);

  return (
    <div className="h-full overflow-y-auto pb-28 bg-zinc-950">
      <header className="px-5 pt-12 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-white">Krowd</span>
            <span style={{ color: ACCENT }}>Guide</span>
          </h1>
          <p className="text-zinc-400 text-xs tracking-widest mt-1">KNOW BEFORE YOU GO</p>
        </div>
        <Avatar />
      </header>

      <section className="px-5 mb-8">
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles size={28} className="text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-wider mb-1" style={{ color: ACCENT }}>KROWD INTELLIGENCE</p>
            <p className="text-white text-sm">Deep Ellum is spiking. 3 venues just hit capacity...</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-yellow-400" />
            <h2 className="text-lg font-bold text-yellow-400">Happy Hours Active</h2>
          </div>
          <button className="text-zinc-400 text-sm">View all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {happyHourVenues.map(venue => (
            <button key={venue.id} onClick={() => onVenueSelect(venue)} className="shrink-0 w-44 text-left active:scale-95 transition-transform">
              <div className="relative h-36 rounded-2xl overflow-hidden mb-3">
                <img src={venue.image} alt={venue.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <VenueBadge badge={venue.badge} />
                <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>
                  Until {venue.dealEnd}
                </div>
              </div>
              <h3 className="text-white font-bold text-sm">{venue.name}</h3>
              <p className="text-zinc-400 text-xs mt-0.5">{venue.deal}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Trending</h2>
            <Flame size={22} className="text-orange-500" />
          </div>
          <button className="text-zinc-400 text-sm">View all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {trendingVenues.map(venue => (
            <button key={venue.id} onClick={() => onVenueSelect(venue)} className="shrink-0 w-64 text-left active:scale-95 transition-transform">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                <img src={venue.image} alt={venue.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <VenueBadge badge={venue.badge} />
                <div className="absolute top-3 right-3">
                  <LoadBadge load={venue.crowd} />
                </div>
                <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
                  <VibeBadge crowd={venue.crowd} />
                  <DressCodeBadge code={venue.dressCode} />
                </div>
                <div className="absolute bottom-3 right-3">
                  <PriceBadge cover={venue.cover} />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg">{venue.name}</h3>
              <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
                <MapPin size={12} />
                <span>{venue.distance}</span>
                <span className="text-zinc-600">•</span>
                <span>{venue.type}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.name} 
                onClick={() => alert(`Browse ${cat.name}`)} 
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-zinc-800 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                    <Icon size={20} className="text-zinc-400" />
                  </div>
                  <span className="text-white font-medium">{cat.name}</span>
                </div>
                <ArrowUpRight size={18} className="text-zinc-500" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MAP TAB
// ============================================================================

const MapTab = ({ onDistrictSelect }) => {
  return (
    <div className="h-full relative overflow-hidden bg-zinc-950">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a3a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16213e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
          </radialGradient>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.2" opacity="0.6"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mapGlow)" />
        <rect width="100" height="100" fill="url(#grid)" />
        <path d="M 15 58 Q 25 65, 50 75" stroke="#3f3f46" strokeWidth="0.4" fill="none" opacity="0.7" />
        <path d="M 50 75 Q 58 65, 65 55" stroke="#3f3f46" strokeWidth="0.4" fill="none" opacity="0.7" />
        <path d="M 65 55 L 60 40" stroke="#3f3f46" strokeWidth="0.4" fill="none" opacity="0.7" />
        <path d="M 18 38 Q 30 50, 50 75" stroke="#3f3f46" strokeWidth="0.4" fill="none" opacity="0.7" />
      </svg>

      <header className="absolute top-12 left-5 right-5 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/70 border border-zinc-800">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white text-sm font-bold">LIVE NET</span>
        </div>
        <button className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center border border-zinc-800">
          <MapPin size={22} className="text-white" />
        </button>
      </header>

      {DISTRICTS.map(district => (
        <button 
          key={district.id} 
          onClick={() => onDistrictSelect(district)} 
          className="absolute flex flex-col items-center active:scale-110 transition-transform"
          style={{ left: `${district.x}%`, top: `${district.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div 
            className="w-16 h-16 rounded-full flex flex-col items-center justify-center mb-2 border-2"
            style={{ backgroundColor: `${district.color}15`, borderColor: `${district.color}50` }}
          >
            <span className="text-xl font-bold" style={{ color: district.color }}>{district.venues}</span>
            <span className="text-[10px] font-medium text-zinc-400">VENUES</span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-black/80 border border-zinc-800" style={{ color: district.color }}>
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

const EventsTab = ({ onEventSelect, onDiscoverOpen }) => {
  const [favorites, setFavorites] = useState({});

  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5 bg-zinc-950">
      <div className="flex items-center justify-between mb-6 pb-2">
        <h1 className="text-3xl font-bold text-white">Tonight's Events</h1>
        <button onClick={onDiscoverOpen} className="px-5 py-3 rounded-full font-bold text-sm text-white active:scale-95 transition-transform" style={{ backgroundColor: ACCENT }}>
          Discover
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 mb-4 scrollbar-hide">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <button className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center bg-zinc-900">
            <Plus size={24} className="text-zinc-500" />
          </button>
          <span className="text-xs text-zinc-500">Add</span>
        </div>
        {PERFORMERS.map(performer => (
          <button key={performer.id} className="flex flex-col items-center gap-2 shrink-0" onClick={() => alert(`${performer.name} at ${performer.venue}`)}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5" style={{ background: performer.isLive ? `linear-gradient(135deg, ${ACCENT}, #a855f7)` : 'linear-gradient(135deg, #3f3f46, #27272a)' }}>
                <img src={performer.image} alt={performer.name} className="w-full h-full rounded-full object-cover" />
              </div>
              {performer.isLive && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-950" />}
            </div>
            <span className="text-xs text-zinc-400 max-w-16 truncate">{performer.name}</span>
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {EVENTS.map(event => {
          const venue = VENUES.find(v => v.id === event.venueId);
          return (
            <button key={event.id} onClick={() => onEventSelect(event)} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 text-left active:scale-[0.98] transition-transform border border-zinc-800">
              <div className="w-20 h-20 rounded-xl bg-zinc-950 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                <img src={event.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                <span className="text-zinc-300 text-xs font-bold relative">TODAY</span>
                <span className="text-white text-2xl font-bold relative">{event.time}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  {event.isLive && <LiveNowBadge />}
                  {venue && <VibeBadge crowd={venue.crowd} />}
                </div>
                <h3 className="text-white font-bold text-lg truncate">{event.name}</h3>
                <p className="font-bold truncate" style={{ color: ACCENT }}>{event.venue}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-zinc-400 text-sm">{event.district}</span>
                  {venue && <DressCodeBadge code={venue.dressCode} />}
                  <PriceBadge cover={event.cover} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setFavorites(f => ({ ...f, [event.id]: !f[event.id] })); }} 
                  className={`w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border ${favorites[event.id] ? 'border-pink-500/50' : 'border-zinc-700'}`}
                >
                  <Heart size={20} className={`transition-all duration-300 ${favorites[event.id] ? 'text-pink-500 fill-pink-500' : 'text-zinc-400'}`} />
                </button>
                <ChevronRight size={22} className="text-zinc-600" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// PROFILE TAB
// ============================================================================

const ProfileTab = ({ onVenueSelect }) => {
  const stats = [
    { label: 'Check-ins', value: 47, icon: CheckCircle },
    { label: 'Reviews', value: 12, icon: Star },
    { label: 'Friends', value: 89, icon: Users },
  ];

  return (
    <div className="h-full overflow-y-auto pb-28 pt-12 px-5 bg-zinc-950 relative">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-zinc-900/60 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center mb-8 relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 mb-4">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-white">Alex Thompson</h1>
        <p className="text-zinc-400 mt-1">@alexthompson</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 relative">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Icon size={22} className="mx-auto mb-2 text-zinc-500" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-zinc-400 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-white mb-4 relative">Favorite Spots</h2>
      <div className="space-y-3 relative">
        {VENUES.slice(0, 3).map(venue => (
          <button key={venue.id} onClick={() => onVenueSelect(venue)} className="w-full flex items-center gap-4 p-4 rounded-xl bg-zinc-900 text-left active:scale-[0.98] transition-transform border border-zinc-800">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate mb-1">{venue.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <VibeBadge crowd={venue.crowd} />
                <DressCodeBadge code={venue.dressCode} />
              </div>
              <p className="text-zinc-500 text-xs mt-1.5 flex items-center gap-1">
                <MapPin size={10} /> {venue.distance} away
              </p>
            </div>
            <ChevronRight size={20} className="text-zinc-600 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// BOTTOM NAV
// ============================================================================

const BottomNav = memo(({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-5">
      <div className="rounded-full p-2 flex justify-around bg-zinc-900/95 border border-zinc-800">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${isActive ? 'text-white' : 'text-zinc-400'}`}
              style={{ backgroundColor: isActive ? ACCENT : 'transparent' }}
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
  const [appPhase, setAppPhase] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [discoverOpen, setDiscoverOpen] = useState(false);

  const handleSplashComplete = useCallback(() => setAppPhase('location'), []);
  
  // Fixed: onContinue always moves to ready state
  const handleLocationContinue = useCallback(() => {
    console.log('[App] Continuing to main app');
    setAppPhase('ready');
  }, []);

  const handleVenueSelect = useCallback((venue) => setSelectedVenue(venue), []);
  const handleVenueClose = useCallback(() => setSelectedVenue(null), []);
  const handleDistrictSelect = useCallback((district) => alert(`${district.name}\n${district.venues} venues available`), []);
  const handleEventSelect = useCallback((event) => {
    const venue = VENUES.find(v => v.id === event.venueId);
    if (venue) setSelectedVenue(venue);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-zinc-950">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        @keyframes dot-pulse { 
          0%, 100% { opacity: 0.3; transform: scale(0.9); background-color: #52525b; } 
          50% { opacity: 1; transform: scale(1.1); background-color: #FF2E63; } 
        }
        .animate-dot-pulse { animation: dot-pulse 1.4s ease-in-out infinite; }
      `}</style>

      {appPhase === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}
      {appPhase === 'location' && <LocationScreen onContinue={handleLocationContinue} />}

      {appPhase === 'ready' && (
        <>
          <main className="h-full">
            {activeTab === 'home' && <HomeTab onVenueSelect={handleVenueSelect} />}
            {activeTab === 'map' && <MapTab onDistrictSelect={handleDistrictSelect} />}
            {activeTab === 'events' && <EventsTab onEventSelect={handleEventSelect} onDiscoverOpen={() => setDiscoverOpen(true)} />}
            {activeTab === 'profile' && <ProfileTab onVenueSelect={handleVenueSelect} />}
          </main>
          {selectedVenue && <VenueModal venue={selectedVenue} onClose={handleVenueClose} />}
          {discoverOpen && <DiscoverMode onClose={() => setDiscoverOpen(false)} />}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}
