import React, { useState, useEffect, memo, useCallback } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Flame, Clock, ChevronRight, X, Heart, Send, Lock,
  ChevronLeft, ChevronRight as ChevronRightIcon, Plus, AlertCircle,
  CheckCircle, Star, Users, Navigation, Wine, Music, Building, Compass
} from 'lucide-react';

// ============================================================================
// STYLES - Defined as constant to ensure they're always available
// ============================================================================

const GLOBAL_STYLES = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  * {
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

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

function getVibeFromCrowd(crowd) {
  if (crowd >= 0.85) return { label: 'PACKED', color: '#ef4444', bg: '#ef4444' };
  if (crowd >= 0.60) return { label: 'HYPE', color: '#f97316', bg: '#f97316' };
  if (crowd >= 0.40) return { label: 'MODERATE', color: '#3b82f6', bg: '#3b82f6' };
  return { label: 'CHILL', color: '#22c55e', bg: '#22c55e' };
}

function getDressCodeInfo(code) {
  const codes = {
    casual: { label: 'Casual', color: '#22c55e', icon: '👟' },
    smart: { label: 'Smart Casual', color: '#3b82f6', icon: '👔' },
    upscale: { label: 'Upscale', color: '#a855f7', icon: '🎩' }
  };
  return codes[code] || codes.casual;
}

// ============================================================================
// SPLASH SCREEN
// ============================================================================

function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    const timers = [
      setTimeout(() => mounted && setPhase(1), 300),
      setTimeout(() => mounted && setPhase(2), 600),
      setTimeout(() => mounted && setPhase(3), 1200),
      setTimeout(() => mounted && setPhase(4), 2500),
      setTimeout(() => mounted && onComplete(), 3000),
    ];
    
    return () => {
      mounted = false;
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        opacity: phase >= 4 ? 0 : 1,
        transition: 'opacity 0.5s ease'
      }}
    >
      {/* Background Icons */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03 }}>
        <MapPin style={{ position: 'absolute', top: '10%', left: '10%', color: 'white' }} size={40} />
        <Music style={{ position: 'absolute', top: '15%', right: '15%', color: 'white' }} size={32} />
        <Wine style={{ position: 'absolute', bottom: '25%', left: '15%', color: 'white' }} size={36} />
        <Building style={{ position: 'absolute', bottom: '15%', right: '12%', color: 'white' }} size={28} />
      </div>

      {/* Glow */}
      <div 
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 1s ease'
        }}
      />

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 10 }}>
        <span 
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'white',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)',
            transition: 'all 0.7s ease-out'
          }}
        >
          Krowd
        </span>
        <span 
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: ACCENT,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)',
            transition: 'all 0.7s ease-out'
          }}
        >
          Guide
        </span>
      </div>

      {/* Tagline */}
      <p 
        style={{
          fontSize: 16,
          letterSpacing: '0.1em',
          color: '#a1a1aa',
          textTransform: 'uppercase',
          marginTop: 20,
          position: 'relative',
          zIndex: 10,
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s ease-out'
        }}
      >
        Know Before You Go
      </p>

      {/* Loading Dots */}
      <div 
        style={{ 
          display: 'flex', 
          gap: 10, 
          marginTop: 40,
          opacity: phase >= 3 ? 1 : 0, 
          transition: 'opacity 0.5s ease' 
        }}
      >
        {[0, 1, 2].map(i => (
          <div 
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: ACCENT,
              animation: 'pulseDot 1.4s ease-in-out infinite',
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LOCATION SCREEN - Fixed with proper timeout and skip functionality
// ============================================================================

function LocationScreen({ onContinue }) {
  const [status, setStatus] = useState('prompt');
  const [visible, setVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  function handleEnableLocation() {
    // Check if geolocation exists
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('unsupported');
      return;
    }

    setStatus('requesting');

    // BUG FIX: Add timeout fallback - if browser never responds, show error state
    const fallbackTimer = setTimeout(() => {
      setStatus('timeout');
    }, 12000);

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(fallbackTimer);
          setStatus('granted');
          // Delay before continuing to show success state
          setTimeout(() => onContinue(), 1000);
        },
        (error) => {
          clearTimeout(fallbackTimer);
          console.log('Location error:', error.code, error.message);
          setStatus('denied');
        },
        { 
          enableHighAccuracy: false, 
          timeout: 10000, 
          maximumAge: 300000 
        }
      );
    } catch (err) {
      clearTimeout(fallbackTimer);
      console.log('Geolocation exception:', err);
      setStatus('error');
    }
  }

  function handleSkip() {
    onContinue();
  }

  // Success state
  if (status === 'granted') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        zIndex: 50
      }}>
        <div style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24
        }}>
          <CheckCircle size={56} color="#22c55e" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>You're all set!</h1>
        <p style={{ color: '#a1a1aa', marginTop: 8 }}>Finding venues near you...</p>
      </div>
    );
  }

  const showError = status === 'denied' || status === 'unsupported' || status === 'timeout' || status === 'error';
  const isRequesting = status === 'requesting';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#09090b',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      zIndex: 50,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease'
    }}>
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <path d="M10 30 L30 30 L30 50 L50 50 L50 30 L70 30 L70 60 L90 60" stroke="#fff" strokeWidth="0.4" fill="none" />
          <path d="M20 10 L20 90" stroke="#fff" strokeWidth="0.25" fill="none" />
          <path d="M50 5 L50 95" stroke="#fff" strokeWidth="0.25" fill="none" />
          <circle cx="30" cy="30" r="2.5" fill="#fff" />
          <circle cx="50" cy="50" r="3.5" fill="#fff" />
        </svg>
      </div>

      {/* Icon */}
      <div style={{ position: 'relative', marginBottom: 40 }}>
        <div 
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            background: showError ? 'rgba(249, 115, 22, 0.2)' : `${ACCENT}20`,
            filter: 'blur(30px)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        <div style={{
          position: 'relative',
          width: 112,
          height: 112,
          borderRadius: '50%',
          backgroundColor: '#18181b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #27272a'
        }}>
          {showError ? (
            <AlertCircle size={56} color="#f97316" />
          ) : isRequesting ? (
            <div style={{
              width: 48,
              height: 48,
              border: '4px solid #3f3f46',
              borderTopColor: ACCENT,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          ) : (
            <MapPin size={56} color={ACCENT} />
          )}
        </div>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: 16 }}>
        {status === 'denied' && 'Location Unavailable'}
        {status === 'unsupported' && 'Location Not Supported'}
        {status === 'timeout' && 'Request Timed Out'}
        {status === 'error' && 'Something Went Wrong'}
        {status === 'requesting' && 'Requesting Access...'}
        {status === 'prompt' && 'Enable Location'}
      </h1>

      {/* Description */}
      <p style={{ fontSize: 16, color: '#a1a1aa', textAlign: 'center', maxWidth: 280, marginBottom: 8, lineHeight: 1.6 }}>
        {showError 
          ? 'No worries! You can still browse all venues manually.'
          : isRequesting
          ? 'Please allow location access when prompted by your browser.'
          : 'Krowd Guide uses your location to show nearby venues and personalized recommendations.'}
      </p>

      {/* Buttons */}
      <div style={{ width: '100%', maxWidth: 280, marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {status === 'prompt' && (
          <>
            <button 
              onClick={handleEnableLocation}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 16,
                fontWeight: 700,
                color: 'white',
                backgroundColor: ACCENT,
                border: 'none',
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              Enable Location
            </button>
            <button 
              onClick={handleSkip}
              style={{
                width: '100%',
                padding: 12,
                color: '#a1a1aa',
                fontSize: 14,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Skip for now
            </button>
          </>
        )}

        {isRequesting && (
          <button 
            disabled
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 16,
              fontWeight: 700,
              color: 'white',
              backgroundColor: ACCENT,
              opacity: 0.5,
              border: 'none',
              fontSize: 16
            }}
          >
            Waiting for permission...
          </button>
        )}

        {showError && (
          <>
            <button 
              onClick={handleEnableLocation}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 16,
                fontWeight: 700,
                color: 'white',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <button 
              onClick={handleSkip}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 16,
                fontWeight: 700,
                color: 'white',
                backgroundColor: ACCENT,
                border: 'none',
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              Continue Without Location
            </button>
          </>
        )}
      </div>

      {/* Privacy Note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 32, color: '#a1a1aa' }}>
        <Lock size={16} />
        <span style={{ fontSize: 14 }}>Your location is never shared</span>
      </div>
    </div>
  );
}

// ============================================================================
// BADGE COMPONENTS
// ============================================================================

function VenueBadge({ badge }) {
  if (!badge) return null;
  const colors = { free: '#22c55e', new: ACCENT, hot: '#f97316' };
  return (
    <span style={{
      position: 'absolute',
      top: 12,
      left: 12,
      padding: '6px 10px',
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'white',
      backgroundColor: colors[badge]
    }}>
      {badge}
    </span>
  );
}

function LoadBadge({ load }) {
  const percentage = Math.round(load * 100);
  const color = load >= 0.8 ? '#ef4444' : load >= 0.5 ? '#facc15' : '#22c55e';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      borderRadius: 9999,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
      <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{percentage}%</span>
    </div>
  );
}

function VibeBadge({ crowd }) {
  const vibe = getVibeFromCrowd(crowd);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      borderRadius: 9999,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: vibe.bg }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: vibe.color }}>{vibe.label}</span>
    </div>
  );
}

function DressCodeBadge({ code }) {
  const info = getDressCodeInfo(code);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      borderRadius: 9999,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }}>
      <span style={{ fontSize: 12 }}>{info.icon}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: info.color }}>{info.label}</span>
    </div>
  );
}

function LiveNowBadge() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      borderRadius: 9999,
      backgroundColor: 'rgba(24,24,27,0.9)'
    }}>
      <div style={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%', 
        backgroundColor: '#22c55e',
        animation: 'pulse 2s ease-in-out infinite'
      }} />
      <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>LIVE NOW</span>
    </div>
  );
}

function PriceBadge({ cover }) {
  return (
    <div style={{
      padding: '6px 10px',
      borderRadius: 8,
      backgroundColor: 'rgba(39,39,42,0.9)',
      border: '1px solid #3f3f46'
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: cover === 0 ? '#4ade80' : 'white' }}>
        {cover === 0 ? 'FREE' : `$${cover}`}
      </span>
    </div>
  );
}

// ============================================================================
// ACTION BUTTONS
// ============================================================================

function ActionButtons({ onShare, onFavorite, isFavorited }) {
  const handleShare = (e) => {
    e.stopPropagation();
    onShare();
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onFavorite();
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button 
        onClick={handleShare}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(39,39,42,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #3f3f46',
          cursor: 'pointer'
        }}
      >
        <Send size={18} color="#fff" />
      </button>
      <button 
        onClick={handleFavorite}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(39,39,42,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${isFavorited ? 'rgba(236,72,153,0.5)' : '#3f3f46'}`,
          cursor: 'pointer'
        }}
      >
        <Heart 
          size={18} 
          color={isFavorited ? '#ec4899' : '#fff'}
          fill={isFavorited ? '#ec4899' : 'none'}
        />
      </button>
    </div>
  );
}

// ============================================================================
// VENUE MODAL
// ============================================================================

function VenueModal({ venue, onClose }) {
  const [isFavorited, setIsFavorited] = useState(false);
  
  if (!venue) return null;

  const vibe = getVibeFromCrowd(venue.crowd);
  const dressInfo = getDressCodeInfo(venue.dressCode);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 512,
        backgroundColor: '#18181b',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        maxHeight: '90vh',
        overflowY: 'auto',
        animation: 'slideUp 0.3s ease-out'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#27272a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #3f3f46',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={22} color="#fff" />
        </button>
        
        {/* Handle */}
        <div style={{
          width: 56,
          height: 6,
          backgroundColor: '#3f3f46',
          borderRadius: 9999,
          margin: '0 auto 24px'
        }} />
        
        {/* Image */}
        <div style={{
          position: 'relative',
          height: 224,
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 20
        }}>
          <img 
            src={venue.image} 
            alt={venue.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.backgroundColor = '#27272a'; }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent, transparent)'
          }} />
          
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <LoadBadge load={venue.crowd} />
            <VibeBadge crowd={venue.crowd} />
          </div>
          
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <ActionButtons 
              onShare={() => alert(`Share ${venue.name}`)} 
              onFavorite={() => setIsFavorited(!isFavorited)} 
              isFavorited={isFavorited} 
            />
          </div>
        </div>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', paddingRight: 16 }}>{venue.name}</h2>
          <PriceBadge cover={venue.cover} />
        </div>
        <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 20 }}>{venue.type} • {venue.district}</p>

        {/* Vibe & Dress Code */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#27272a', border: '1px solid #3f3f46' }}>
            <p style={{ color: '#71717a', fontSize: 12, marginBottom: 4 }}>Current Vibe</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: vibe.color }}>{vibe.label}</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#27272a', border: '1px solid #3f3f46' }}>
            <p style={{ color: '#71717a', fontSize: 12, marginBottom: 4 }}>Dress Code</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: dressInfo.color, display: 'flex', alignItems: 'center', gap: 8 }}>
              {dressInfo.icon} {dressInfo.label}
            </p>
          </div>
        </div>
        
        {/* Happy Hour */}
        {venue.deal && (
          <div style={{
            backgroundColor: '#27272a',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            border: '1px solid #3f3f46'
          }}>
            <p style={{ color: '#facc15', fontWeight: 700, fontSize: 14 }}>🍹 Happy Hour: {venue.deal}</p>
            <p style={{ color: '#71717a', fontSize: 12, marginTop: 4 }}>Until {venue.dealEnd}</p>
          </div>
        )}
        
        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a1a1aa', fontSize: 14, marginBottom: 24 }}>
          <MapPin size={16} color="#71717a" />
          {venue.address}
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button 
            onClick={() => alert('Checked in!')}
            style={{
              padding: 16,
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 14,
              color: 'white',
              backgroundColor: ACCENT,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <CheckCircle size={20} /> Check In
          </button>
          <button 
            onClick={() => alert('Opening directions...')}
            style={{
              padding: 16,
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 14,
              color: 'white',
              backgroundColor: '#27272a',
              border: '1px solid #3f3f46',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <Navigation size={20} /> Directions
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DISCOVER MODE
// ============================================================================

function DiscoverMode({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState({});

  const event = EVENTS[currentIndex];
  const venue = event ? VENUES.find(v => v.id === event.venueId) : null;

  if (!event) return null;

  const goNext = () => {
    if (currentIndex < EVENTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleFavorite = () => {
    setFavorites({ ...favorites, [event.id]: !favorites[event.id] });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: 'black'
    }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img 
          src={event.image} 
          alt={event.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, black, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3))'
        }} />
      </div>

      {/* Top Info */}
      <div style={{
        position: 'absolute',
        top: 48,
        left: 20,
        right: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {event.isLive && <LiveNowBadge />}
          {venue && <VibeBadge crowd={venue.crowd} />}
          {venue && <DressCodeBadge code={venue.dressCode} />}
        </div>
        <div style={{
          backgroundColor: 'rgba(24,24,27,0.8)',
          borderRadius: 12,
          padding: '12px 16px',
          textAlign: 'center',
          border: '1px solid #27272a'
        }}>
          <p style={{ color: '#a1a1aa', fontSize: 12, textTransform: 'uppercase', fontWeight: 500 }}>
            {event.date.includes(',') ? event.date.split(',')[0] : 'TODAY'}
          </p>
          <p style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>{event.time}</p>
        </div>
      </div>

      {/* Bottom Content */}
      <div style={{
        position: 'absolute',
        bottom: 144,
        left: 20,
        right: 20,
        zIndex: 10
      }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: 'white', marginBottom: 12, lineHeight: 1.1 }}>{event.name}</h1>
        <p style={{ fontSize: 18, fontWeight: 700, color: ACCENT, marginBottom: 4 }}>{event.date}, {event.time}</p>
        <p style={{ color: '#d4d4d8', fontSize: 18 }}>{event.venue}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
          <PriceBadge cover={event.cover} />
          <ActionButtons 
            onShare={() => alert(`Share ${event.name}`)} 
            onFavorite={toggleFavorite} 
            isFavorited={favorites[event.id]} 
          />
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        zIndex: 10
      }}>
        <button 
          onClick={goPrev}
          disabled={currentIndex === 0}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'rgba(39,39,42,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #3f3f46',
            opacity: currentIndex === 0 ? 0.3 : 1,
            cursor: currentIndex === 0 ? 'default' : 'pointer'
          }}
        >
          <ChevronLeft size={24} color="#fff" />
        </button>
        <button 
          onClick={onClose}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={26} color="#000" />
        </button>
        <button 
          onClick={goNext}
          disabled={currentIndex === EVENTS.length - 1}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'rgba(39,39,42,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #3f3f46',
            opacity: currentIndex === EVENTS.length - 1 ? 0.3 : 1,
            cursor: currentIndex === EVENTS.length - 1 ? 'default' : 'pointer'
          }}
        >
          <ChevronRightIcon size={24} color="#fff" />
        </button>
      </div>

      {/* Progress Dots */}
      <div style={{
        position: 'absolute',
        bottom: 112,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        zIndex: 10
      }}>
        {EVENTS.map((_, i) => (
          <div 
            key={i}
            style={{
              height: 8,
              borderRadius: 9999,
              backgroundColor: i === currentIndex ? ACCENT : '#52525b',
              width: i === currentIndex ? 32 : 8,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// HOME TAB
// ============================================================================

function HomeTab({ onVenueSelect }) {
  const happyHourVenues = VENUES.filter(v => v.deal);
  const trendingVenues = VENUES.filter(v => v.crowd >= 0.5);

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      paddingBottom: 112,
      backgroundColor: '#09090b'
    }}>
      {/* Header */}
      <header style={{
        padding: '48px 20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700 }}>
            <span style={{ color: 'white' }}>Krowd</span>
            <span style={{ color: ACCENT }}>Guide</span>
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: 12, letterSpacing: '0.1em', marginTop: 4 }}>KNOW BEFORE YOU GO</p>
        </div>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #22c55e'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
            alt="Profile" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </header>

      {/* Krowd Intelligence */}
      <section style={{ padding: '0 20px', marginBottom: 32 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 20,
          borderRadius: 16,
          backgroundColor: '#18181b',
          border: '1px solid #27272a'
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'rgba(99,102,241,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={28} color="#818cf8" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: ACCENT, marginBottom: 4 }}>KROWD INTELLIGENCE</p>
            <p style={{ color: 'white', fontSize: 14 }}>Deep Ellum is spiking. 3 venues just hit capacity...</p>
          </div>
        </div>
      </section>

      {/* Happy Hours */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={20} color="#facc15" />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#facc15' }}>Happy Hours Active</h2>
          </div>
          <button style={{ color: '#a1a1aa', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
        </div>
        <div style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          padding: '0 20px 12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {happyHourVenues.map(venue => (
            <button 
              key={venue.id} 
              onClick={() => onVenueSelect(venue)} 
              style={{
                flexShrink: 0,
                width: 176,
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <div style={{
                position: 'relative',
                height: 144,
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 12
              }}>
                <img src={venue.image} alt={venue.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                <VenueBadge badge={venue.badge} />
                <div style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'white',
                  backgroundColor: ACCENT
                }}>
                  Until {venue.dealEnd}
                </div>
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{venue.name}</h3>
              <p style={{ color: '#a1a1aa', fontSize: 12, marginTop: 2 }}>{venue.deal}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Trending</h2>
            <Flame size={22} color="#f97316" />
          </div>
          <button style={{ color: '#a1a1aa', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
        </div>
        <div style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          padding: '0 20px 12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {trendingVenues.map(venue => (
            <button 
              key={venue.id} 
              onClick={() => onVenueSelect(venue)} 
              style={{
                flexShrink: 0,
                width: 256,
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <div style={{
                position: 'relative',
                height: 192,
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 12
              }}>
                <img src={venue.image} alt={venue.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)' }} />
                <VenueBadge badge={venue.badge} />
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <LoadBadge load={venue.crowd} />
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <VibeBadge crowd={venue.crowd} />
                  <DressCodeBadge code={venue.dressCode} />
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                  <PriceBadge cover={venue.cover} />
                </div>
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>{venue.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a1a1aa', fontSize: 12, marginTop: 4 }}>
                <MapPin size={12} />
                <span>{venue.distance}</span>
                <span style={{ color: '#52525b' }}>•</span>
                <span>{venue.type}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.name} 
                onClick={() => alert(`Browse ${cat.name}`)} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: '#27272a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color="#a1a1aa" />
                  </div>
                  <span style={{ color: 'white', fontWeight: 500 }}>{cat.name}</span>
                </div>
                <ArrowUpRight size={18} color="#71717a" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// MAP TAB
// ============================================================================

function MapTab({ onDistrictSelect }) {
  return (
    <div style={{
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#09090b'
    }}>
      {/* Background SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
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

      {/* Header */}
      <header style={{
        position: 'absolute',
        top: 48,
        left: 20,
        right: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: 9999,
          backgroundColor: 'rgba(0,0,0,0.7)',
          border: '1px solid #27272a'
        }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>LIVE NET</span>
        </div>
        <button style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #27272a',
          cursor: 'pointer'
        }}>
          <MapPin size={22} color="#fff" />
        </button>
      </header>

      {/* Districts */}
      {DISTRICTS.map(district => (
        <button 
          key={district.id} 
          onClick={() => onDistrictSelect(district)} 
          style={{
            position: 'absolute',
            left: `${district.x}%`,
            top: `${district.y}%`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            backgroundColor: `${district.color}15`,
            border: `2px solid ${district.color}50`
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: district.color }}>{district.venues}</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#a1a1aa' }}>VENUES</span>
          </div>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '6px 10px',
            borderRadius: 8,
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid #27272a',
            color: district.color
          }}>
            {district.name}
          </span>
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// EVENTS TAB
// ============================================================================

function EventsTab({ onEventSelect, onDiscoverOpen }) {
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (e, eventId) => {
    e.stopPropagation();
    setFavorites({ ...favorites, [eventId]: !favorites[eventId] });
  };

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      paddingBottom: 112,
      paddingTop: 48,
      padding: '48px 20px 112px',
      backgroundColor: '#09090b'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 8 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'white' }}>Tonight's Events</h1>
        <button 
          onClick={onDiscoverOpen}
          style={{
            padding: '12px 20px',
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: 14,
            color: 'white',
            backgroundColor: ACCENT,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Discover
        </button>
      </div>

      {/* Performers */}
      <div style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        paddingBottom: 24,
        marginBottom: 16,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '2px dashed #52525b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#18181b',
            cursor: 'pointer'
          }}>
            <Plus size={24} color="#71717a" />
          </button>
          <span style={{ fontSize: 12, color: '#71717a' }}>Add</span>
        </div>
        {PERFORMERS.map(performer => (
          <button 
            key={performer.id} 
            onClick={() => alert(`${performer.name} at ${performer.venue}`)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                padding: 2,
                background: performer.isLive 
                  ? `linear-gradient(135deg, ${ACCENT}, #a855f7)` 
                  : 'linear-gradient(135deg, #3f3f46, #27272a)'
              }}>
                <img 
                  src={performer.image} 
                  alt={performer.name} 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              {performer.isLive && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  border: '2px solid #09090b'
                }} />
              )}
            </div>
            <span style={{ fontSize: 12, color: '#a1a1aa', maxWidth: 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {performer.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {EVENTS.map(event => {
          const venue = VENUES.find(v => v.id === event.venueId);
          return (
            <button 
              key={event.id} 
              onClick={() => onEventSelect(event)} 
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                borderRadius: 16,
                backgroundColor: '#18181b',
                textAlign: 'left',
                border: '1px solid #27272a',
                cursor: 'pointer'
              }}
            >
              {/* Time Card */}
              <div style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: '#09090b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img src={event.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))' }} />
                <span style={{ color: '#d4d4d8', fontSize: 12, fontWeight: 700, position: 'relative' }}>TODAY</span>
                <span style={{ color: 'white', fontSize: 24, fontWeight: 700, position: 'relative' }}>{event.time}</span>
              </div>
              
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  {event.isLive && <LiveNowBadge />}
                  {venue && <VibeBadge crowd={venue.crowd} />}
                </div>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: 18, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.name}</h3>
                <p style={{ color: ACCENT, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ color: '#a1a1aa', fontSize: 14 }}>{event.district}</span>
                  {venue && <DressCodeBadge code={venue.dressCode} />}
                  <PriceBadge cover={event.cover} />
                </div>
              </div>
              
              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <button 
                  onClick={(e) => handleFavorite(e, event.id)}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#27272a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${favorites[event.id] ? 'rgba(236,72,153,0.5)' : '#3f3f46'}`,
                    cursor: 'pointer'
                  }}
                >
                  <Heart 
                    size={20} 
                    color={favorites[event.id] ? '#ec4899' : '#a1a1aa'}
                    fill={favorites[event.id] ? '#ec4899' : 'none'}
                  />
                </button>
                <ChevronRight size={22} color="#52525b" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE TAB
// ============================================================================

function ProfileTab({ onVenueSelect }) {
  const stats = [
    { label: 'Check-ins', value: 47, Icon: CheckCircle },
    { label: 'Reviews', value: 12, Icon: Star },
    { label: 'Friends', value: 89, Icon: Users },
  ];

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      paddingBottom: 112,
      paddingTop: 48,
      padding: '48px 20px 112px',
      backgroundColor: '#09090b',
      position: 'relative'
    }}>
      {/* Gradient Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 288,
        background: 'linear-gradient(to bottom, rgba(24,24,27,0.6), transparent)',
        pointerEvents: 'none'
      }} />
      
      {/* Profile Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, position: 'relative' }}>
        <div style={{
          width: 112,
          height: 112,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #22c55e',
          marginBottom: 16
        }}>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
            alt="Profile" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Alex Thompson</h1>
        <p style={{ color: '#a1a1aa', marginTop: 4 }}>@alexthompson</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32, position: 'relative' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{
            textAlign: 'center',
            padding: 16,
            borderRadius: 16,
            backgroundColor: '#18181b',
            border: '1px solid #27272a'
          }}>
            <stat.Icon size={22} color="#71717a" style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{stat.value}</p>
            <p style={{ color: '#a1a1aa', fontSize: 12, marginTop: 4 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 16, position: 'relative' }}>Favorite Spots</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
        {VENUES.slice(0, 3).map(venue => (
          <button 
            key={venue.id} 
            onClick={() => onVenueSelect(venue)} 
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 16,
              borderRadius: 12,
              backgroundColor: '#18181b',
              textAlign: 'left',
              border: '1px solid #27272a',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <img src={venue.image} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{venue.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <VibeBadge crowd={venue.crowd} />
                <DressCodeBadge code={venue.dressCode} />
              </div>
              <p style={{ color: '#71717a', fontSize: 12, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={10} /> {venue.distance} away
              </p>
            </div>
            <ChevronRight size={20} color="#52525b" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// BOTTOM NAV
// ============================================================================

const BottomNav = memo(function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', Icon: Home, label: 'Home' },
    { id: 'map', Icon: MapIcon, label: 'Map' },
    { id: 'events', Icon: Calendar, label: 'Events' },
    { id: 'profile', Icon: User, label: 'Profile' },
  ];

  return (
    <nav style={{
      position: 'absolute',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 40,
      width: '100%',
      maxWidth: 320,
      padding: '0 20px'
    }}>
      <div style={{
        borderRadius: 9999,
        padding: 8,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(24,24,27,0.95)',
        border: '1px solid #27272a'
      }}>
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: activeTab === tab.id ? ACCENT : 'transparent',
              color: activeTab === tab.id ? 'white' : '#a1a1aa',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <tab.Icon size={24} />
          </button>
        ))}
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

  const handleSplashComplete = useCallback(() => {
    setAppPhase('location');
  }, []);
  
  const handleLocationContinue = useCallback(() => {
    setAppPhase('ready');
  }, []);

  const handleVenueSelect = useCallback((venue) => {
    setSelectedVenue(venue);
  }, []);

  const handleVenueClose = useCallback(() => {
    setSelectedVenue(null);
  }, []);

  const handleDistrictSelect = useCallback((district) => {
    alert(`${district.name}\n${district.venues} venues available`);
  }, []);

  const handleEventSelect = useCallback((event) => {
    const venue = VENUES.find(v => v.id === event.venueId);
    if (venue) {
      setSelectedVenue(venue);
    }
  }, []);

  const handleDiscoverOpen = useCallback(() => {
    setDiscoverOpen(true);
  }, []);

  const handleDiscoverClose = useCallback(() => {
    setDiscoverOpen(false);
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#09090b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Global Styles */}
      <style>{GLOBAL_STYLES}</style>

      {/* Splash Screen */}
      {appPhase === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Location Screen */}
      {appPhase === 'location' && (
        <LocationScreen onContinue={handleLocationContinue} />
      )}

      {/* Main App */}
      {appPhase === 'ready' && (
        <>
          <main style={{ height: '100%' }}>
            {activeTab === 'home' && <HomeTab onVenueSelect={handleVenueSelect} />}
            {activeTab === 'map' && <MapTab onDistrictSelect={handleDistrictSelect} />}
            {activeTab === 'events' && <EventsTab onEventSelect={handleEventSelect} onDiscoverOpen={handleDiscoverOpen} />}
            {activeTab === 'profile' && <ProfileTab onVenueSelect={handleVenueSelect} />}
          </main>

          {selectedVenue && (
            <VenueModal venue={selectedVenue} onClose={handleVenueClose} />
          )}

          {discoverOpen && (
            <DiscoverMode onClose={handleDiscoverClose} />
          )}

          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}
