import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Clock, ChevronRight, X, Heart, Send,
  ChevronLeft, CheckCircle, Users, Navigation, 
  Wine, Music, Building, Compass, Search, Filter, Leaf,
  Accessibility, Volume2, TrendingUp, Car, AlertTriangle,
  Shield, Settings, FileText, Lock, ExternalLink, Info
} from 'lucide-react';

// ============================================================================
// SPLASH SCREEN WITH ANIMATIONS
// ============================================================================

const splashStyles = `
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes logo-appear {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes text-slide-up {
    0% { transform: translateY(30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes tagline-fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes dot-bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes fade-out {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255,46,99,0.4); }
    50% { box-shadow: 0 0 40px rgba(255,46,99,0.8); }
  }
  
  .splash-container {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%);
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .splash-container.fade-out {
    animation: fade-out 0.5s ease forwards;
  }
  
  .splash-logo-container {
    position: relative;
    margin-bottom: 24px;
  }
  
  .splash-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-left: -60px;
    border-radius: 50%;
    border: 2px solid #FF2E63;
    box-shadow: 0 0 24px rgba(255,46,99,0.5);
    animation: pulse-ring 2s ease-out infinite;
  }
  
  .splash-ring:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  .splash-ring:nth-child(3) {
    animation-delay: 1s;
  }
  
  .splash-logo {
    position: relative;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #FF2E63 0%, #ff5f8a 100%);
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: logo-appear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, glow-pulse 2s ease-in-out infinite;
    box-shadow: 0 20px 60px rgba(255, 46, 99, 0.5);
  }
  
  .splash-logo-letter {
    font-size: 48px;
    font-weight: 800;
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  
  .splash-title {
    font-size: 36px;
    font-weight: 700;
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
    animation: text-slide-up 0.6s ease forwards;
    animation-delay: 0.4s;
    opacity: 0;
    text-shadow: 0 0 30px rgba(255,46,99,0.3);
  }
  
  .splash-title-accent {
    color: #FF2E63;
    text-shadow: 0 0 30px rgba(255,46,99,0.5);
  }
  
  .splash-tagline {
    font-size: 14px;
    color: #71717a;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 8px;
    animation: tagline-fade 0.6s ease forwards;
    animation-delay: 0.8s;
    opacity: 0;
  }
  
  .splash-loader {
    position: absolute;
    bottom: 80px;
    display: flex;
    gap: 8px;
  }
  
  .splash-dot {
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #FF2E63 0%, #ff5f8a 100%);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255,46,99,0.6);
    animation: dot-bounce 1.4s ease-in-out infinite both;
  }
  
  .splash-dot:nth-child(1) { animation-delay: -0.32s; }
  .splash-dot:nth-child(2) { animation-delay: -0.16s; }
  .splash-dot:nth-child(3) { animation-delay: 0s; }
`;

function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete after fade animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <>
      <style>{splashStyles}</style>
      <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
        {/* Animated rings */}
        <div className="splash-logo-container">
          <div className="splash-ring"></div>
          <div className="splash-ring"></div>
          <div className="splash-ring"></div>
          
          {/* Logo */}
          <div className="splash-logo">
            <span className="splash-logo-letter">K</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="splash-title">
          Krowd<span className="splash-title-accent">Guide</span>
        </h1>
        
        {/* Tagline */}
        <p className="splash-tagline">Know Before You Go</p>
        
        {/* Loading dots */}
        <div className="splash-loader">
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// DATA - Updated per audit feedback
// ============================================================================

const ACCENT = '#FF2E63';

// Vibe options (SEPARATE from crowd level per audit)
const VIBE_OPTIONS = ['Energetic', 'Chill', 'Loud', 'Romantic', 'Lively'];

// Crowd terminology (with "Usually" prefix per audit)
const CROWD_LABELS = {
  low: 'Usually Chill',
  mediumLow: 'Usually Moderate', 
  mediumHigh: 'Usually Busy',
  high: 'Usually Packed'
};

const INITIAL_VENUES = [
  { 
    id: 'v1', 
    name: 'Happiest Hour', 
    type: 'ROOFTOP LOUNGE', 
    district: 'Victory Park', 
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', 
    crowdPercent: 90, 
    distance: '0.3m', 
    deal: '$5 Margaritas', 
    dealEnd: '7pm', 
    address: '2616 Olive St, Dallas, TX', 
    cover: 0, 
    dressCode: 'smart', 
    accessible: true, 
    hearingLoop: false, 
    eco: true, 
    category: 'rooftop',
    vibe: 'Energetic', // Separate from crowd
    parking: 'limited', // New: parking info
    parkingNotes: 'Street parking available. Garage 2 blocks away.',
    incidents: 3, // New: safety data
    incidentTypes: ['Car break-in', 'Theft'],
    incidentPeriod: '30 days'
  },
  { 
    id: 'v2', 
    name: 'The Rustic', 
    type: 'LIVE MUSIC VENUE', 
    district: 'Uptown', 
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', 
    crowdPercent: 55, 
    distance: '0.8m', 
    deal: '1/2 Price Wine', 
    dealEnd: '6pm', 
    address: '3656 Howell St, Dallas, TX', 
    cover: 10, 
    dressCode: 'casual', 
    accessible: true, 
    hearingLoop: true, 
    eco: false, 
    category: 'livemusic',
    vibe: 'Lively',
    parking: 'available',
    parkingNotes: 'Free lot on-site. Valet available weekends.',
    incidents: 1,
    incidentTypes: ['Noise complaint'],
    incidentPeriod: '30 days'
  },
  { 
    id: 'v3', 
    name: 'Stirr', 
    type: 'SPORTS BAR', 
    district: 'Deep Ellum', 
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', 
    crowdPercent: 75, 
    distance: '0.5m', 
    deal: '$4 Draft Beers', 
    dealEnd: '8pm', 
    address: '2803 Main St, Dallas, TX', 
    cover: 0, 
    dressCode: 'casual', 
    accessible: false, 
    hearingLoop: false, 
    eco: false, 
    category: 'bar',
    vibe: 'Loud',
    parking: 'limited',
    parkingNotes: 'Street parking only. Paid lots nearby.',
    incidents: 5,
    incidentTypes: ['Car break-in', 'Theft', 'Assault'],
    incidentPeriod: '30 days'
  },
  { 
    id: 'v4', 
    name: 'Bottled Blonde', 
    type: 'CLUB', 
    district: 'Deep Ellum', 
    image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', 
    crowdPercent: 95, 
    distance: '0.6m', 
    deal: null, 
    dealEnd: null, 
    address: '2505 Pacific Ave, Dallas, TX', 
    cover: 20, 
    dressCode: 'upscale', 
    accessible: true, 
    hearingLoop: false, 
    eco: false, 
    category: 'club',
    vibe: 'Energetic',
    parking: 'valet',
    parkingNotes: 'Valet only. $15-20.',
    incidents: 7,
    incidentTypes: ['Car break-in', 'Theft', 'Assault'],
    incidentPeriod: '30 days'
  },
  { 
    id: 'v5', 
    name: 'Katy Trail Ice House', 
    type: 'BEER GARDEN', 
    district: 'Uptown', 
    image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', 
    crowdPercent: 35, 
    distance: '1.2m', 
    deal: '$3 Tacos', 
    dealEnd: '7pm', 
    address: '3127 Routh St, Dallas, TX', 
    cover: 0, 
    dressCode: 'casual', 
    accessible: true, 
    hearingLoop: true, 
    eco: true, 
    category: 'bar',
    vibe: 'Chill',
    parking: 'available',
    parkingNotes: 'Large free lot on-site.',
    incidents: 0,
    incidentTypes: [],
    incidentPeriod: '30 days'
  },
  { 
    id: 'v6', 
    name: 'Midnight Rambler', 
    type: 'SPEAKEASY', 
    district: 'Downtown', 
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', 
    crowdPercent: 65, 
    distance: '0.9m', 
    deal: null, 
    dealEnd: null, 
    address: '1530 Main St, Dallas, TX', 
    cover: 0, 
    dressCode: 'smart', 
    accessible: false, 
    hearingLoop: false, 
    eco: true, 
    category: 'speakeasy',
    vibe: 'Romantic',
    parking: 'garage',
    parkingNotes: 'Hotel garage available. $10-15.',
    incidents: 1,
    incidentTypes: ['Theft'],
    incidentPeriod: '30 days'
  },
];

const DISTRICTS = [
  { id: 'd1', name: 'UPTOWN', venues: 12, x: 65, y: 55, crowdLevel: 'moderate' },
  { id: 'd2', name: 'DEEP ELLUM', venues: 8, x: 50, y: 75, crowdLevel: 'busy' },
  { id: 'd3', name: 'VICTORY PARK', venues: 5, x: 60, y: 40, crowdLevel: 'moderate' },
  { id: 'd4', name: 'BISHOP ARTS', venues: 3, x: 55, y: 32, crowdLevel: 'chill' },
  { id: 'd5', name: 'LOWER GREENVILLE', venues: 6, x: 18, y: 38, crowdLevel: 'busy' },
  { id: 'd6', name: 'KNOX-HENDERSON', venues: 7, x: 15, y: 58, crowdLevel: 'moderate' },
];

// Events - REMOVED "LIVE NOW", changed to "Tonight"
const EVENTS = [
  { id: 'e1', name: 'Mavs Watch Party', venue: 'Happiest Hour', venueId: 'v1', district: 'Victory Park', time: '8:00 PM', date: 'Tonight', cover: 0, image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=800&q=80' },
  { id: 'e2', name: 'Live Country Music', venue: 'The Rustic', venueId: 'v2', district: 'Uptown', time: '9:00 PM', date: 'Tonight', cover: 15, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' },
  { id: 'e3', name: 'Trivia Night', venue: 'Stirr', venueId: 'v3', district: 'Deep Ellum', time: '7:00 PM', date: 'Tonight', cover: 0, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
  { id: 'e4', name: 'DJ Night', venue: 'Bottled Blonde', venueId: 'v4', district: 'Deep Ellum', time: '10:00 PM', date: 'Fri, Jan 24', cover: 25, image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80' },
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Compass },
  { id: 'rooftop', name: 'Rooftops', icon: Building },
  { id: 'speakeasy', name: 'Speakeasies', icon: Wine },
  { id: 'bar', name: 'Bars', icon: Music },
  { id: 'livemusic', name: 'Live Music', icon: Music },
  { id: 'club', name: 'Clubs', icon: Users }
];

const FILTERS = [
  { id: 'accessible', label: 'Wheelchair', icon: Accessibility },
  { id: 'hearingLoop', label: 'Hearing Loop', icon: Volume2 },
  { id: 'eco', label: 'Eco-Friendly', icon: Leaf },
  { id: 'free', label: 'No Cover', icon: null },
  { id: 'happyHour', label: 'Happy Hour', icon: Clock },
  { id: 'goodParking', label: 'Easy Parking', icon: Car }
];

// ============================================================================
// HELPERS - Updated per audit
// ============================================================================

// Get crowd label with "Usually" prefix (per audit requirement)
function getCrowdLabel(percent) {
  if (percent >= 85) return { label: 'Usually Packed', color: '#ef4444', short: 'Packed' };
  if (percent >= 60) return { label: 'Usually Busy', color: '#f97316', short: 'Busy' };
  if (percent >= 40) return { label: 'Usually Moderate', color: '#3b82f6', short: 'Moderate' };
  return { label: 'Usually Chill', color: '#22c55e', short: 'Chill' };
}

// Get vibe color (separate from crowd per audit)
function getVibeInfo(vibe) {
  const vibes = {
    'Energetic': { color: '#f97316', icon: '⚡' },
    'Chill': { color: '#22c55e', icon: '😌' },
    'Loud': { color: '#ef4444', icon: '🔊' },
    'Romantic': { color: '#ec4899', icon: '💕' },
    'Lively': { color: '#8b5cf6', icon: '🎉' }
  };
  return vibes[vibe] || vibes['Chill'];
}

function getDress(code) {
  if (code === 'upscale') return { label: 'Upscale', color: '#a855f7', icon: '🎩' };
  if (code === 'smart') return { label: 'Smart Casual', color: '#3b82f6', icon: '👔' };
  return { label: 'Casual', color: '#22c55e', icon: '👟' };
}

function getParkingInfo(parking) {
  const info = {
    'available': { label: 'Usually Available', color: '#22c55e', icon: '✓' },
    'limited': { label: 'Usually Limited', color: '#f97316', icon: '!' },
    'valet': { label: 'Valet Only', color: '#8b5cf6', icon: '🚗' },
    'garage': { label: 'Garage Nearby', color: '#3b82f6', icon: 'P' }
  };
  return info[parking] || info['limited'];
}

function getIncidentLevel(count) {
  if (count === 0) return { label: 'No recent incidents', color: '#22c55e' };
  if (count <= 2) return { label: `${count} incidents`, color: '#f97316' };
  return { label: `${count} incidents`, color: '#ef4444' };
}

function shareVenue(venue) {
  const text = `Check out ${venue.name} on KrowdGuide! ${getCrowdLabel(venue.crowdPercent).label} on weekend nights.`;
  if (navigator.share) {
    navigator.share({ title: venue.name, text, url: window.location.href });
  } else {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  }
}

function getTimeAgo(date) {
  const mins = Math.floor((Date.now() - date) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ============================================================================
// GLOBAL STYLES CSS
// ============================================================================

const globalStyles = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glow-pulse-subtle {
    0%, 100% { box-shadow: 0 4px 16px rgba(255,46,99,0.4); }
    50% { box-shadow: 0 4px 24px rgba(255,46,99,0.6); }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255,46,99,0.3);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255,46,99,0.5);
  }

  /* Focus states for accessibility */
  button:focus-visible, a:focus-visible {
    outline: 2px solid #FF2E63;
    outline-offset: 2px;
  }
`;

// ============================================================================
// STYLES - Enhanced with glassmorphism, neon glows, and transitions
// ============================================================================

const styles = {
  app: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradient-shift 10s ease infinite',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: 'white',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  },
  main: {
    height: '100%',
    overflowY: 'auto',
    paddingBottom: 120
  },
  card: {
    backgroundColor: 'rgba(24,24,27,0.85)',
    borderRadius: 24,
    border: '1px solid rgba(255,46,99,0.1)',
    overflow: 'hidden',
    boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 32px rgba(255,46,99,0.25)',
    borderColor: 'rgba(255,46,99,0.25)'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    fontSize: 12,
    fontWeight: 600,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  btn: {
    background: 'linear-gradient(135deg, #FF2E63 0%, #ff5f8a 100%)',
    color: 'white',
    border: 'none',
    borderRadius: 20,
    padding: '16px 24px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 4px 20px rgba(255,46,99,0.5)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  btnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 28px rgba(255,46,99,0.6)'
  },
  btnActive: {
    transform: 'scale(0.98)',
    boxShadow: '0 2px 12px rgba(255,46,99,0.4)'
  },
  btnSecondary: {
    backgroundColor: 'rgba(39,39,42,0.8)',
    color: 'white',
    border: '1px solid rgba(63,63,70,0.6)',
    borderRadius: 20,
    padding: '16px 24px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease'
  },
  btnSecondaryHover: {
    borderColor: 'rgba(255,46,99,0.4)',
    boxShadow: '0 4px 16px rgba(255,46,99,0.15)'
  },
  filterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    borderRadius: 24,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    border: '1px solid rgba(63,63,70,0.5)',
    backgroundColor: 'rgba(24,24,27,0.8)',
    color: '#a1a1aa',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease'
  },
  filterChipActive: {
    backgroundColor: 'rgba(255,46,99,0.2)',
    borderColor: ACCENT,
    color: ACCENT,
    boxShadow: '0 0 12px rgba(255,46,99,0.3)'
  },
  nav: {
    position: 'fixed',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(9,9,11,0.75)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: 40,
    padding: 10,
    display: 'flex',
    gap: 6,
    border: '1px solid rgba(255,46,99,0.15)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset',
    zIndex: 100
  },
  navBtn: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  navBtnActive: {
    boxShadow: '0 0 20px rgba(255,46,99,0.5)',
    transform: 'scale(1.05)'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  modalContent: {
    backgroundColor: 'rgba(24,24,27,0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 -8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,46,99,0.1) inset',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)'
  },
  disclaimer: {
    fontSize: 11,
    color: '#71717a',
    fontStyle: 'italic',
    marginTop: 4,
    opacity: 0.8
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(39,39,42,0.7)',
    marginBottom: 14,
    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.03)'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(24,24,27,0.8)',
    border: '1px solid rgba(63,63,70,0.5)',
    borderRadius: 16,
    padding: '14px 18px',
    marginBottom: 12,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  },
  searchBarFocus: {
    borderColor: 'rgba(255,46,99,0.4)',
    boxShadow: '0 0 0 3px rgba(255,46,99,0.1)'
  },
  glowText: {
    textShadow: '0 0 20px rgba(255,46,99,0.4)'
  },
  neonBorder: {
    border: '1px solid rgba(255,46,99,0.3)',
    boxShadow: '0 0 15px rgba(255,46,99,0.2)'
  }
};

// ============================================================================
// INTERACTIVE COMPONENTS WITH HOVER STATES
// ============================================================================

function InteractiveCard({ children, onClick, style = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        ...styles.card,
        ...style,
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 8px 32px rgba(255,46,99,0.2)' : styles.card.boxShadow,
        borderColor: isHovered ? 'rgba(255,46,99,0.2)' : 'rgba(255,46,99,0.1)',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
}

function InteractiveButton({ children, onClick, style = {}, variant = 'primary', disabled = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const baseStyle = variant === 'primary' ? styles.btn : styles.btnSecondary;
  const hoverStyle = variant === 'primary' ? styles.btnHover : styles.btnSecondaryHover;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        ...baseStyle,
        ...style,
        ...(isHovered && !disabled ? hoverStyle : {}),
        ...(isPressed && !disabled ? styles.btnActive : {}),
        opacity: disabled ? 0.5 : 1
      }}
    >
      {children}
    </button>
  );
}

function GlowingBadge({ children, color = ACCENT, style = {} }) {
  return (
    <span style={{
      ...styles.badge,
      ...style,
      boxShadow: `0 2px 12px ${color}40`
    }}>
      {children}
    </span>
  );
}

// ============================================================================
// ONBOARDING SCREEN (New per audit - single screen)
// ============================================================================

function OnboardingScreen({ onContinue }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 10s ease infinite',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      zIndex: 50,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease'
    }}>
      <style>{globalStyles}</style>
      
      {/* Logo */}
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, ...styles.glowText }}>
        <span style={{ color: 'white' }}>Krowd</span>
        <span style={{ color: ACCENT }}>Guide</span>
      </h1>
      
      {/* Tagline per audit */}
      <p style={{ fontSize: 24, fontWeight: 600, color: 'white', marginBottom: 8, textAlign: 'center', textShadow: '0 0 30px rgba(255,255,255,0.1)' }}>
        Is it a good time to go?
      </p>
      
      {/* Subtitle per audit */}
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 40, textAlign: 'center' }}>
        Enable location to find what's near you.
      </p>

      {/* Buttons per audit */}
      <div style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <InteractiveButton 
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                () => onContinue(),
                () => onContinue(),
                { timeout: 5000 }
              );
            } else {
              onContinue();
            }
          }}
        >
          <MapPin size={20} /> Enable Location
        </InteractiveButton>
        <InteractiveButton 
          onClick={onContinue}
          variant="secondary"
          style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
        >
          Skip
        </InteractiveButton>
      </div>

      {/* Privacy note */}
      <p style={{ fontSize: 12, color: '#52525b', marginTop: 40, textAlign: 'center', maxWidth: 280 }}>
        We only track location at venues within Dallas districts. Never your home or work.
      </p>
    </div>
  );
}

// ============================================================================
// BADGE COMPONENTS - Updated per audit
// ============================================================================

// Crowd badge with "Usually" prefix and "based on patterns" disclaimer
function CrowdBadge({ percent, showDisclaimer = false }) {
  const crowd = getCrowdLabel(percent);
  return (
    <div>
      <span style={{ ...styles.badge }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: crowd.color }} />
        <span style={{ color: crowd.color }}>Usually {percent}%</span>
      </span>
      {showDisclaimer && (
        <p style={styles.disclaimer}>Based on patterns</p>
      )}
    </div>
  );
}

// Vibe badge (SEPARATE from crowd per audit)
function VibeBadge({ vibe }) {
  const info = getVibeInfo(vibe);
  return (
    <span style={{ ...styles.badge }}>
      <span>{info.icon}</span>
      <span style={{ color: info.color }}>{vibe}</span>
    </span>
  );
}

// Vibe badge with source (per audit)
function VibeBadgeWithSource({ vibe, hasUserReports = false, reportCount = 0 }) {
  const info = getVibeInfo(vibe);
  return (
    <div>
      <span style={{ ...styles.badge }}>
        <span>{info.icon}</span>
        <span style={{ color: info.color }}>{vibe}</span>
      </span>
      <p style={styles.disclaimer}>
        {hasUserReports 
          ? `Based on ${reportCount} reports`
          : 'Based on reviews'
        }
      </p>
    </div>
  );
}

function DressBadge({ code }) {
  const d = getDress(code);
  return (
    <span style={{ ...styles.badge }}>
      <span>{d.icon}</span>
      <span style={{ color: d.color }}>{d.label}</span>
    </span>
  );
}

function PriceBadge({ cover }) {
  return (
    <span style={{
      ...styles.badge,
      backgroundColor: '#27272a',
      border: '1px solid #3f3f46'
    }}>
      <span style={{ color: cover === 0 ? '#4ade80' : 'white' }}>
        {cover === 0 ? 'FREE' : `$${cover}`}
      </span>
    </span>
  );
}

// Tonight badge (replaces "LIVE NOW" per audit)
function TonightBadge() {
  return (
    <span style={{ ...styles.badge, backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)' }}>
      <Clock size={12} color="#22c55e" />
      <span style={{ color: '#22c55e' }}>Tonight</span>
    </span>
  );
}

function EcoBadge() {
  return (
    <span style={{
      ...styles.badge,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      border: '1px solid rgba(34, 197, 94, 0.5)'
    }}>
      <Leaf size={12} color="#22c55e" />
      <span style={{ color: '#22c55e' }}>Eco</span>
    </span>
  );
}

function AccessibleBadge({ wheelchair, hearing }) {
  if (!wheelchair && !hearing) return null;
  return (
    <span style={{ ...styles.badge, gap: 4 }}>
      {wheelchair && <Accessibility size={14} color="#60a5fa" />}
      {hearing && <Volume2 size={14} color="#c084fc" />}
    </span>
  );
}

// ============================================================================
// PARKING INFO CARD (New per audit - Pillar #2)
// ============================================================================

function ParkingCard({ parking, notes }) {
  const info = getParkingInfo(parking);
  return (
    <div style={styles.infoCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Car size={18} color={info.color} />
        <span style={{ fontWeight: 700, color: info.color }}>Parking: {info.label}</span>
      </div>
      <p style={{ fontSize: 13, color: '#a1a1aa', margin: 0 }}>{notes}</p>
    </div>
  );
}

// ============================================================================
// SAFETY INFO CARD (New per audit - Pillar #4)
// ============================================================================

function SafetyCard({ incidents, types, period }) {
  const level = getIncidentLevel(incidents);
  return (
    <div style={styles.infoCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Shield size={18} color={level.color} />
        <span style={{ fontWeight: 700, color: level.color }}>
          {incidents === 0 ? 'No incidents reported' : `${incidents} incidents in past ${period}`}
        </span>
      </div>
      {types.length > 0 && (
        <p style={{ fontSize: 13, color: '#a1a1aa', margin: '0 0 8px' }}>
          {types.join(', ')}
        </p>
      )}
      <p style={styles.disclaimer}>
        Data from Dallas Police Department via Dallas OpenData. Historical data - conditions may change.
      </p>
    </div>
  );
}

// ============================================================================
// CROWD REPORT MODAL
// ============================================================================

function CrowdReportModal({ venue, onClose, onReport }) {
  const [selected, setSelected] = useState(null);
  
  const levels = [
    { id: 'empty', label: 'Empty', emoji: '🪹', value: 20 },
    { id: 'chill', label: 'Chill', emoji: '😌', value: 35 },
    { id: 'moderate', label: 'Moderate', emoji: '👍', value: 50 },
    { id: 'busy', label: 'Busy', emoji: '🔥', value: 75 },
    { id: 'packed', label: 'Packed', emoji: '🤯', value: 95 }
  ];

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={{ ...styles.modalContent, maxHeight: '50vh' }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 5, backgroundColor: '#3f3f46', borderRadius: 10, margin: '0 auto 20px' }} />
        
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', textAlign: 'center' }}>
          How's {venue.name} right now?
        </h3>
        <p style={{ color: '#71717a', fontSize: 14, margin: '0 0 24px', textAlign: 'center' }}>
          Help others know before they go
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 24 }}>
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelected(level)}
              style={{
                flex: 1,
                padding: '16px 8px',
                borderRadius: 12,
                border: selected?.id === level.id ? `2px solid ${ACCENT}` : '2px solid #27272a',
                backgroundColor: selected?.id === level.id ? ACCENT + '20' : '#27272a',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span style={{ fontSize: 28 }}>{level.emoji}</span>
              <span style={{ fontSize: 11, color: selected?.id === level.id ? ACCENT : '#a1a1aa', fontWeight: 600 }}>
                {level.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => { if (selected) { onReport(venue.id, selected.value); onClose(); } }}
          disabled={!selected}
          style={{ ...styles.btn, width: '100%', opacity: selected ? 1 : 0.5 }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// VENUE MODAL - Updated per audit with all 4 pillars
// ============================================================================

function VenueModal({ venue, onClose, onCheckIn, onReport, checkIns }) {
  const [liked, setLiked] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  if (!venue) return null;
  
  const crowd = getCrowdLabel(venue.crowdPercent);
  const dress = getDress(venue.dressCode);
  const hasCheckedIn = checkIns.some(c => c.venueId === venue.id);

  if (showReport) {
    return <CrowdReportModal venue={venue} onClose={() => setShowReport(false)} onReport={onReport} />;
  }

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16, width: 44, height: 44,
            borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.8)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease'
          }}
        >
          <X size={20} color="white" />
        </button>

        <div style={{ width: 48, height: 5, backgroundColor: 'rgba(63,63,70,0.8)', borderRadius: 10, margin: '0 auto 20px' }} />

        {/* Image with crowd overlay */}
        <div style={{ position: 'relative', height: 220, borderRadius: 24, overflow: 'hidden', marginBottom: 24 }}>
          <img src={venue.image} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)' }} />
          
          {/* Crowd percentage with "Usually" prefix per audit */}
          <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CrowdBadge percent={venue.crowdPercent} />
            {venue.eco && <EcoBadge />}
          </div>
          
          <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 10 }}>
            <button 
              onClick={() => shareVenue(venue)} 
              style={{ 
                width: 46, height: 46, borderRadius: '50%', 
                backgroundColor: 'rgba(39,39,42,0.85)', 
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <Send size={18} color="white" />
            </button>
            <button 
              onClick={() => setLiked(!liked)} 
              style={{ 
                width: 46, height: 46, borderRadius: '50%', 
                backgroundColor: 'rgba(39,39,42,0.85)', 
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: liked ? '2px solid #ec4899' : 'none', 
                boxShadow: liked ? '0 0 20px rgba(236,72,153,0.4)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={18} color={liked ? '#ec4899' : 'white'} fill={liked ? '#ec4899' : 'none'} />
            </button>
          </div>
          
          {(venue.accessible || venue.hearingLoop) && (
            <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
              <AccessibleBadge wheelchair={venue.accessible} hearing={venue.hearingLoop} />
            </div>
          )}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, ...styles.glowText }}>{venue.name}</h2>
          <PriceBadge cover={venue.cover} />
        </div>
        <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 24 }}>{venue.type} • {venue.district}</p>

        {/* PILLAR 1: Crowd Level (with proper terminology per audit) */}
        <div style={styles.infoCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#71717a', fontSize: 12, marginBottom: 6 }}>Crowd Level</p>
              <p style={{ fontWeight: 700, fontSize: 20, color: crowd.color, margin: 0, textShadow: `0 0 20px ${crowd.color}40` }}>{crowd.label}</p>
              <p style={styles.disclaimer}>Based on patterns from past year</p>
            </div>
            <button
              onClick={() => setShowReport(true)}
              style={{
                padding: '10px 14px', borderRadius: 12, border: '1px dashed rgba(255,46,99,0.4)',
                backgroundColor: 'rgba(255,46,99,0.1)', color: ACCENT, fontSize: 12,
                fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s ease'
              }}
            >
              <TrendingUp size={14} /> Report
            </button>
          </div>
        </div>

        {/* PILLAR 3: Vibe/Atmosphere (SEPARATE from crowd per audit) */}
        <div style={styles.infoCard}>
          <p style={{ color: '#71717a', fontSize: 12, marginBottom: 6 }}>Vibe</p>
          <VibeBadgeWithSource vibe={venue.vibe} hasUserReports={false} />
        </div>

        {/* Dress Code */}
        <div style={styles.infoCard}>
          <p style={{ color: '#71717a', fontSize: 12, marginBottom: 6 }}>Dress Code</p>
          <p style={{ fontWeight: 700, fontSize: 20, color: dress.color, margin: 0 }}>{dress.icon} {dress.label}</p>
        </div>

        {/* PILLAR 2: Parking (New per audit) */}
        <ParkingCard parking={venue.parking} notes={venue.parkingNotes} />

        {/* PILLAR 4: Safety (New per audit) */}
        <SafetyCard 
          incidents={venue.incidents} 
          types={venue.incidentTypes} 
          period={venue.incidentPeriod} 
        />

        {/* Happy Hour */}
        {venue.deal && (
          <div style={{ 
            ...styles.infoCard, 
            background: 'linear-gradient(135deg, rgba(250,204,21,0.15) 0%, rgba(250,204,21,0.05) 100%)', 
            border: '1px solid rgba(250,204,21,0.3)',
            boxShadow: '0 0 20px rgba(250,204,21,0.1)'
          }}>
            <p style={{ color: '#facc15', fontWeight: 700, margin: 0, fontSize: 16 }}>🍹 {venue.deal}</p>
            <p style={{ color: '#a1a1aa', fontSize: 12, margin: '6px 0 0' }}>Until {venue.dealEnd}</p>
          </div>
        )}

        {/* Address */}
        <p style={{ color: '#a1a1aa', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <MapPin size={16} color="#71717a" /> {venue.address}
        </p>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <InteractiveButton 
            onClick={() => !hasCheckedIn && onCheckIn(venue)}
            disabled={hasCheckedIn}
            style={{ 
              background: hasCheckedIn 
                ? 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' 
                : 'linear-gradient(135deg, #FF2E63 0%, #ff5f8a 100%)',
              boxShadow: hasCheckedIn 
                ? '0 4px 20px rgba(34,197,94,0.5)' 
                : '0 4px 20px rgba(255,46,99,0.5)'
            }}
          >
            <CheckCircle size={18} /> {hasCheckedIn ? 'Checked In!' : 'Check In'}
          </InteractiveButton>
          <InteractiveButton variant="secondary" onClick={() => alert('Opening directions...')}>
            <Navigation size={18} /> Directions
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DISCOVER MODE - Updated per audit (no "LIVE NOW", use "Tonight")
// ============================================================================

function DiscoverMode({ events, venues, onClose }) {
  const [idx, setIdx] = useState(0);
  const [likes, setLikes] = useState({});
  
  const event = events[idx];
  const venue = venues.find(v => v.id === event?.venueId);
  
  if (!event) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'black', zIndex: 200 }}>
      <img src={event.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)' }} />

      <div style={{ position: 'absolute', top: 48, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {event.date === 'Tonight' && <TonightBadge />}
          {venue && <VibeBadge vibe={venue.vibe} />}
          {venue && <DressBadge code={venue.dressCode} />}
        </div>
        <div style={{ backgroundColor: 'rgba(24,24,27,0.8)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
          <p style={{ color: '#a1a1aa', fontSize: 11, margin: 0 }}>{event.date}</p>
          <p style={{ color: 'white', fontSize: 24, fontWeight: 700, margin: 0 }}>{event.time}</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 140, left: 20, right: 20, zIndex: 10 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 12px' }}>{event.name}</h1>
        <p style={{ color: ACCENT, fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>{event.venue}</p>
        <p style={{ color: '#d4d4d8', fontSize: 16, margin: 0 }}>{event.district}</p>
        {venue && (
          <p style={{ color: '#71717a', fontSize: 14, margin: '8px 0 0' }}>
            {getCrowdLabel(venue.crowdPercent).label} on {event.date === 'Tonight' ? 'weekend nights' : 'this day'}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <PriceBadge cover={event.cover} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => venue && shareVenue(venue)} style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} color="white" />
            </button>
            <button onClick={() => setLikes({ ...likes, [event.id]: !likes[event.id] })} style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={18} color={likes[event.id] ? '#ec4899' : 'white'} fill={likes[event.id] ? '#ec4899' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16, zIndex: 10 }}>
        <button onClick={() => idx > 0 && setIdx(idx - 1)} disabled={idx === 0} style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.8)', border: 'none', cursor: 'pointer', opacity: idx === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="white" />
        </button>
        <button onClick={onClose} style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={24} color="black" />
        </button>
        <button onClick={() => idx < events.length - 1 && setIdx(idx + 1)} disabled={idx === events.length - 1} style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.8)', border: 'none', cursor: 'pointer', opacity: idx === events.length - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={24} color="white" />
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: 112, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8, zIndex: 10 }}>
        {events.map((_, i) => (
          <div key={i} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === idx ? ACCENT : '#52525b', transition: 'width 0.2s' }} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// HOME TAB - Updated per audit
// ============================================================================

function HomeTab({ venues, onVenue, checkIns, recommendations }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => prev.includes(filterId) ? prev.filter(f => f !== filterId) : [...prev, filterId]);
  };

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.district.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'all' && v.category !== category) return false;
      if (activeFilters.includes('accessible') && !v.accessible) return false;
      if (activeFilters.includes('hearingLoop') && !v.hearingLoop) return false;
      if (activeFilters.includes('eco') && !v.eco) return false;
      if (activeFilters.includes('free') && v.cover > 0) return false;
      if (activeFilters.includes('happyHour') && !v.deal) return false;
      if (activeFilters.includes('goodParking') && v.parking !== 'available') return false;
      return true;
    });
  }, [venues, search, category, activeFilters]);

  const happyHour = filteredVenues.filter(v => v.deal);
  const usuallyBusy = filteredVenues.filter(v => v.crowdPercent >= 50);

  return (
    <div style={styles.main}>
      {/* Header */}
      <div style={{ padding: '48px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, ...styles.glowText }}>
            <span>Krowd</span>
            <span style={{ color: ACCENT }}>Guide</span>
          </h1>
        </div>
        <div style={{ 
          width: 48, 
          height: 48, 
          borderRadius: '50%', 
          border: '2px solid #22c55e', 
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(34,197,94,0.3)'
        }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ 
          ...styles.searchBar,
          ...(searchFocused ? styles.searchBarFocus : {})
        }}>
          <Search size={20} color="#71717a" />
          <input
            type="text"
            placeholder="Search venues, districts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: 15, outline: 'none' }}
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={{ 
              background: activeFilters.length > 0 ? `linear-gradient(135deg, ${ACCENT} 0%, #ff5f8a 100%)` : 'rgba(39,39,42,0.8)', 
              border: 'none', 
              borderRadius: 12, 
              padding: '10px 14px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6, 
              cursor: 'pointer',
              boxShadow: activeFilters.length > 0 ? '0 2px 12px rgba(255,46,99,0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Filter size={16} color="white" />
            {activeFilters.length > 0 && <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{activeFilters.length}</span>}
          </button>
        </div>

        {showFilters && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => toggleFilter(f.id)} style={{ ...styles.filterChip, ...(activeFilters.includes(f.id) ? styles.filterChipActive : {}) }}>
                {f.icon && <f.icon size={14} />}
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} style={{ ...styles.filterChip, ...(category === c.id ? styles.filterChipActive : {}) }}>
              <c.icon size={14} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Krowd Intelligence - Updated language per audit */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <InteractiveCard style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, ...styles.neonBorder }}>
          <div style={{ 
            width: 52, 
            height: 52, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.3) 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139,92,246,0.3)'
          }}>
            <Sparkles size={26} color="#a78bfa" />
          </div>
          <div>
            <p style={{ color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, margin: 0 }}>KROWD INTELLIGENCE</p>
            <p style={{ color: 'white', fontSize: 14, margin: '6px 0 0' }}>Deep Ellum is usually busy on Friday nights. Plan ahead!</p>
          </div>
        </InteractiveCard>
      </div>

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} color="#818cf8" />
              <span style={{ color: '#818cf8', fontWeight: 700 }}>For You</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {recommendations.map(v => (
              <InteractiveCard key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 170, padding: 0 }}>
                <div style={{ position: 'relative', height: 110, borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                    <VibeBadge vibe={v.vibe} />
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{v.name}</p>
                  <p style={{ color: '#71717a', fontSize: 12, margin: '4px 0 0' }}>Based on your check-ins</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      )}

      {/* Happy Hours */}
      {happyHour.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="#facc15" />
              <span style={{ color: '#facc15', fontWeight: 700 }}>Happy Hours</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {happyHour.map(v => (
              <InteractiveCard key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 170, padding: 0 }}>
                <div style={{ position: 'relative', height: 140, borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                  {v.eco && <div style={{ position: 'absolute', top: 10, left: 10 }}><EcoBadge /></div>}
                  <span style={{ 
                    position: 'absolute', 
                    bottom: 10, 
                    right: 10, 
                    background: 'linear-gradient(135deg, #FF2E63 0%, #ff5f8a 100%)', 
                    color: 'white', 
                    padding: '5px 10px', 
                    borderRadius: 8, 
                    fontSize: 11, 
                    fontWeight: 700,
                    boxShadow: '0 2px 10px rgba(255,46,99,0.4)'
                  }}>
                    Until {v.dealEnd}
                  </span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{v.name}</p>
                  <p style={{ color: '#facc15', fontSize: 12, margin: '4px 0 0' }}>{v.deal}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      )}

      {/* Usually Busy - Changed from "Trending" per audit */}
      {usuallyBusy.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>Usually Busy</span>
              <Info size={16} color="#71717a" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {usuallyBusy.map(v => {
              const crowd = getCrowdLabel(v.crowdPercent);
              return (
                <InteractiveCard key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 260, padding: 0 }}>
                  <div style={{ position: 'relative', height: 190, borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
                    <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)' }} />
                    
                    {/* Crowd with "Usually" prefix per audit */}
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <CrowdBadge percent={v.crowdPercent} />
                    </div>
                    
                    <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <VibeBadge vibe={v.vibe} />
                      <DressBadge code={v.dressCode} />
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, right: 12 }}><PriceBadge cover={v.cover} /></div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{v.name}</p>
                    <p style={{ color: '#71717a', fontSize: 12, margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={12} /> {v.distance} • {v.type}
                    </p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
            <InteractiveCard key={c.name} onClick={() => setCategory(c.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 12, 
                  background: 'linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(63,63,70,0.5) 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <c.icon size={18} color="#a1a1aa" />
                </div>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
              </div>
              <ArrowUpRight size={16} color="#71717a" />
            </InteractiveCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAP TAB - Updated per audit (REMOVED "LIVE NET", added legend)
// ============================================================================

function MapTab({ onDistrict }) {
  // District colors based on crowd level (with legend per audit)
  const getDistrictColor = (level) => {
    if (level === 'busy') return '#facc15';
    if (level === 'moderate') return '#4ade80';
    return '#22c55e';
  };

  return (
    <div style={{ height: '100%', position: 'relative', background: 'linear-gradient(135deg, #09090b 0%, #0f0f12 100%)' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a3a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>
        </defs>
        <rect fill="url(#g1)" width="100" height="100" />
        {[0,10,20,30,40,50,60,70,80,90,100].map(x => <line key={'v'+x} x1={x} y1="0" x2={x} y2="100" stroke="rgba(255,46,99,0.05)" strokeWidth="0.3" />)}
        {[0,10,20,30,40,50,60,70,80,90,100].map(y => <line key={'h'+y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,46,99,0.05)" strokeWidth="0.3" />)}
      </svg>

      {/* Header - REMOVED "LIVE NET" per audit */}
      <div style={{ position: 'absolute', top: 48, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 10, 
          backgroundColor: 'rgba(0,0,0,0.7)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '10px 16px', 
          borderRadius: 24,
          border: '1px solid rgba(255,46,99,0.15)'
        }}>
          <MapPin size={18} color={ACCENT} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>Dallas Districts</span>
        </div>
        <div style={{ 
          width: 48, 
          height: 48, 
          borderRadius: '50%', 
          backgroundColor: 'rgba(0,0,0,0.7)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Navigation size={20} color="white" />
        </div>
      </div>

      {/* Legend - NEW per audit */}
      <div style={{ 
        position: 'absolute', 
        bottom: 120, 
        left: 20, 
        backgroundColor: 'rgba(0,0,0,0.75)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: 16, 
        borderRadius: 16, 
        zIndex: 10,
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <p style={{ fontSize: 11, color: '#a1a1aa', margin: '0 0 10px', fontWeight: 700, letterSpacing: 1 }}>CROWD LEVELS</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#facc15', boxShadow: '0 0 10px rgba(250,204,21,0.5)' }} />
            <span style={{ fontSize: 13, color: '#d4d4d8' }}>Usually Busy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.5)' }} />
            <span style={{ fontSize: 13, color: '#d4d4d8' }}>Usually Moderate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.5)' }} />
            <span style={{ fontSize: 13, color: '#d4d4d8' }}>Usually Chill</span>
          </div>
        </div>
        <p style={{ fontSize: 10, color: '#52525b', margin: '10px 0 0', fontStyle: 'italic' }}>Based on patterns</p>
      </div>

      {/* Districts */}
      {DISTRICTS.map(d => {
        const color = getDistrictColor(d.crowdLevel);
        return (
          <div 
            key={d.id} 
            onClick={() => onDistrict(d)}
            style={{ 
              position: 'absolute', left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
          >
            <div style={{
              width: 70, 
              height: 70, 
              borderRadius: '50%',
              backgroundColor: color + '15', 
              border: `2px solid ${color}50`,
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 8,
              boxShadow: `0 0 30px ${color}30`,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, color, textShadow: `0 0 20px ${color}` }}>{d.venues}</span>
              <span style={{ fontSize: 9, color: '#a1a1aa', fontWeight: 600 }}>VENUES</span>
            </div>
            <span style={{ 
              fontSize: 10, 
              fontWeight: 700, 
              color, 
              backgroundColor: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '6px 12px', 
              borderRadius: 8,
              border: `1px solid ${color}30`,
              textShadow: `0 0 10px ${color}`
            }}>
              {d.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// EVENTS TAB - Updated per audit (removed artist images, no "LIVE NOW")
// ============================================================================

function EventsTab({ events, venues, onEvent, onDiscover }) {
  const [likes, setLikes] = useState({});

  return (
    <div style={styles.main}>
      <div style={{ padding: '48px 20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, ...styles.glowText }}>Events</h1>
        <InteractiveButton onClick={onDiscover} style={{ padding: '12px 20px', fontSize: 14 }}>
          Discover
        </InteractiveButton>
      </div>

      {/* Events List - NO artist images per audit */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {events.map(e => {
          const v = venues.find(x => x.id === e.venueId);
          return (
            <InteractiveCard key={e.id} onClick={() => onEvent(e)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              {/* Event image instead of artist per audit */}
              <div style={{ 
                width: 76, 
                height: 76, 
                borderRadius: 16, 
                backgroundColor: '#09090b', 
                position: 'relative', 
                overflow: 'hidden', 
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                <img src={e.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#a1a1aa', fontSize: 11, fontWeight: 700 }}>{e.date === 'Tonight' ? 'TODAY' : e.date.split(',')[0]}</span>
                  <span style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{e.time}</span>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  {/* Changed from "LIVE NOW" to "Tonight" per audit */}
                  {e.date === 'Tonight' && <TonightBadge />}
                  {v && <VibeBadge vibe={v.vibe} />}
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</p>
                <p style={{ color: ACCENT, fontWeight: 600, margin: '4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.venue}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                  <span style={{ color: '#71717a', fontSize: 13 }}>{e.district}</span>
                  <PriceBadge cover={e.cover} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <button 
                  onClick={(ev) => { ev.stopPropagation(); setLikes({ ...likes, [e.id]: !likes[e.id] }); }}
                  style={{ 
                    width: 46, 
                    height: 46, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(39,39,42,0.8)', 
                    border: likes[e.id] ? '2px solid #ec4899' : 'none', 
                    boxShadow: likes[e.id] ? '0 0 16px rgba(236,72,153,0.4)' : 'none',
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Heart size={18} color={likes[e.id] ? '#ec4899' : '#71717a'} fill={likes[e.id] ? '#ec4899' : 'none'} />
                </button>
                <ChevronRight size={20} color="#52525b" />
              </div>
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE TAB - Updated per audit (removed Reviews/Friends, added Settings)
// ============================================================================

function ProfileTab({ venues, onVenue, checkIns }) {
  const [showSettings, setShowSettings] = useState(false);
  
  const recentCheckIns = [...checkIns].reverse().slice(0, 10);
  const uniqueVenueIds = [...new Set(checkIns.map(c => c.venueId))];
  const favoriteVenues = uniqueVenueIds.slice(0, 3).map(id => venues.find(v => v.id === id)).filter(Boolean);

  if (showSettings) {
    return (
      <div style={styles.main}>
        <style>{globalStyles}</style>
        <div style={{ padding: '48px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <ChevronLeft size={24} color="white" />
            </button>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Settings</h1>
          </div>

          {/* Settings links per audit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InteractiveCard onClick={() => alert('Privacy Policy')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={20} color="#818cf8" />
                </div>
                <span>Privacy Policy</span>
              </div>
              <ExternalLink size={18} color="#52525b" />
            </InteractiveCard>
            <InteractiveCard onClick={() => alert('Terms of Service')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color="#22c55e" />
                </div>
                <span>Terms of Service</span>
              </div>
              <ExternalLink size={18} color="#52525b" />
            </InteractiveCard>
            <InteractiveCard onClick={() => alert('About KrowdGuide')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,46,99,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Info size={20} color={ACCENT} />
                </div>
                <span>About</span>
              </div>
              <ChevronRight size={18} color="#52525b" />
            </InteractiveCard>
          </div>

          <p style={{ fontSize: 12, color: '#52525b', textAlign: 'center', marginTop: 40 }}>
            KrowdGuide v1.0.0
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.main}>
      {/* Header with settings icon */}
      <div style={{ padding: '48px 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setShowSettings(true)} 
          style={{ 
            background: 'rgba(39,39,42,0.6)', 
            border: 'none', 
            cursor: 'pointer', 
            padding: 12, 
            borderRadius: 12,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
        >
          <Settings size={22} color="#a1a1aa" />
        </button>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          width: 110, 
          height: 110, 
          borderRadius: '50%', 
          border: '4px solid #22c55e', 
          overflow: 'hidden', 
          marginBottom: 18,
          boxShadow: '0 0 30px rgba(34,197,94,0.4)'
        }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, ...styles.glowText }}>Sarah Johnson</h1>
        <p style={{ color: '#71717a', margin: '6px 0 0' }}>@sarahj</p>
      </div>

      {/* Stats - REMOVED Reviews and Friends per audit (features don't exist) */}
      <div style={{ padding: '0 20px', marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          <InteractiveCard style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 14, 
              background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.1) 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <CheckCircle size={24} color="#22c55e" />
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{checkIns.length}</p>
            <p style={{ color: '#71717a', fontSize: 13, margin: '4px 0 0' }}>Check-ins</p>
          </InteractiveCard>
          <InteractiveCard style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 14, 
              background: 'linear-gradient(135deg, rgba(255,46,99,0.2) 0%, rgba(255,46,99,0.1) 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <MapPin size={24} color={ACCENT} />
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{uniqueVenueIds.length}</p>
            <p style={{ color: '#71717a', fontSize: 13, margin: '4px 0 0' }}>Venues</p>
          </InteractiveCard>
        </div>
      </div>

      {/* Check-in History */}
      {recentCheckIns.length > 0 && (
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Check-ins</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentCheckIns.slice(0, 5).map((checkIn, i) => {
              const v = venues.find(x => x.id === checkIn.venueId);
              if (!v) return null;
              return (
                <InteractiveCard key={i} onClick={() => onVenue(v)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</p>
                    <p style={{ color: '#71717a', fontSize: 12, margin: '4px 0 0' }}>{getTimeAgo(checkIn.time)}</p>
                  </div>
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: 10, 
                    backgroundColor: 'rgba(34,197,94,0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <CheckCircle size={18} color="#22c55e" />
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
          {favoriteVenues.length > 0 ? 'Your Spots' : 'Suggested Spots'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(favoriteVenues.length > 0 ? favoriteVenues : venues.slice(0, 3)).map(v => (
            <InteractiveCard key={v.id} onClick={() => onVenue(v)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, margin: '0 0 8px' }}>{v.name}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <VibeBadge vibe={v.vibe} />
                </div>
              </div>
              <ChevronRight size={18} color="#52525b" />
            </InteractiveCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [tab, setTab] = useState('home');
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [venue, setVenue] = useState(null);
  const [discover, setDiscover] = useState(false);
  const [checkIns, setCheckIns] = useState([]);

  const recommendations = useMemo(() => {
    if (checkIns.length === 0) return [];
    const checkedInVenueIds = checkIns.map(c => c.venueId);
    const checkedInVenues = venues.filter(v => checkedInVenueIds.includes(v.id));
    const preferredVibes = [...new Set(checkedInVenues.map(v => v.vibe))];
    return venues
      .filter(v => !checkedInVenueIds.includes(v.id))
      .filter(v => preferredVibes.includes(v.vibe))
      .slice(0, 4);
  }, [venues, checkIns]);

  const handleCheckIn = (v) => {
    setCheckIns(prev => [...prev, { venueId: v.id, time: Date.now() }]);
    setVenue(null);
  };

  const handleCrowdReport = (venueId, crowdLevel) => {
    setVenues(prev => prev.map(v => v.id === venueId ? { ...v, crowdPercent: crowdLevel } : v));
    alert('Thanks for reporting! This helps others know before they go.');
  };

  const handleEvent = (e) => {
    const v = venues.find(x => x.id === e.venueId);
    if (v) setVenue(v);
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => { setShowSplash(false); setShowOnboarding(true); }} />;
  }

  // Then show onboarding
  if (showOnboarding) {
    return <OnboardingScreen onContinue={() => setShowOnboarding(false)} />;
  }

  return (
    <div style={styles.app}>
      {/* Inject global styles */}
      <style>{globalStyles}</style>
      
      {tab === 'home' && <HomeTab venues={venues} onVenue={setVenue} checkIns={checkIns} recommendations={recommendations} />}
      {tab === 'map' && <MapTab onDistrict={d => alert(`${d.name}\nUsually ${d.crowdLevel} on weekends\n${d.venues} venues`)} />}
      {tab === 'events' && <EventsTab events={EVENTS} venues={venues} onEvent={handleEvent} onDiscover={() => setDiscover(true)} />}
      {tab === 'profile' && <ProfileTab venues={venues} onVenue={setVenue} checkIns={checkIns} />}

      {venue && (
        <VenueModal 
          venue={venue} 
          onClose={() => setVenue(null)} 
          onCheckIn={handleCheckIn}
          onReport={handleCrowdReport}
          checkIns={checkIns}
        />
      )}
      {discover && <DiscoverMode events={EVENTS} venues={venues} onClose={() => setDiscover(false)} />}

      <nav style={styles.nav}>
        {[
          { id: 'home', Icon: Home },
          { id: 'map', Icon: MapIcon },
          { id: 'events', Icon: Calendar },
          { id: 'profile', Icon: User }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ 
              ...styles.navBtn, 
              backgroundColor: tab === t.id ? ACCENT : 'transparent', 
              color: tab === t.id ? 'white' : '#71717a',
              ...(tab === t.id ? styles.navBtnActive : {})
            }}
          >
            <t.Icon size={22} />
          </button>
        ))}
      </nav>
    </div>
  );
}
