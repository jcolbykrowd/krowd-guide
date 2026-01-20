import React, { useState, useMemo } from 'react';
import { 
  Home, Map as MapIcon, Calendar, User, MapPin, ArrowUpRight,
  Sparkles, Flame, Clock, ChevronRight, X, Heart, Send,
  ChevronLeft, Plus, CheckCircle, Star, Users, Navigation, 
  Wine, Music, Building, Compass, Search, Filter, Leaf,
  Accessibility, Volume2, ChevronDown, ThumbsUp, ThumbsDown,
  Share2, History, TrendingUp, Zap
} from 'lucide-react';

// ============================================================================
// DATA
// ============================================================================

const ACCENT = '#FF2E63';

const INITIAL_VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'ROOFTOP LOUNGE', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, distance: '0.3m', deal: '$5 Margaritas', dealEnd: '7pm', address: '2616 Olive St, Dallas, TX', cover: 0, badge: 'free', dressCode: 'smart', accessible: true, hearingLoop: false, eco: true, category: 'rooftop' },
  { id: 'v2', name: 'The Rustic', type: 'LIVE MUSIC VENUE', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.55, distance: '0.8m', deal: '1/2 Price Wine', dealEnd: '6pm', address: '3656 Howell St, Dallas, TX', cover: 10, badge: null, dressCode: 'casual', accessible: true, hearingLoop: true, eco: false, category: 'livemusic' },
  { id: 'v3', name: 'Stirr', type: 'SPORTS BAR', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.75, distance: '0.5m', deal: '$4 Draft Beers', dealEnd: '8pm', address: '2803 Main St, Dallas, TX', cover: 0, badge: 'hot', dressCode: 'casual', accessible: false, hearingLoop: false, eco: false, category: 'bar' },
  { id: 'v4', name: 'Bottled Blonde', type: 'CLUB', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, distance: '0.6m', deal: null, dealEnd: null, address: '2505 Pacific Ave, Dallas, TX', cover: 20, badge: 'hot', dressCode: 'upscale', accessible: true, hearingLoop: false, eco: false, category: 'club' },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'BEER GARDEN', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.35, distance: '1.2m', deal: '$3 Tacos', dealEnd: '7pm', address: '3127 Routh St, Dallas, TX', cover: 0, badge: 'new', dressCode: 'casual', accessible: true, hearingLoop: true, eco: true, category: 'bar' },
  { id: 'v6', name: 'Midnight Rambler', type: 'SPEAKEASY', district: 'Downtown', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', crowd: 0.65, distance: '0.9m', deal: null, dealEnd: null, address: '1530 Main St, Dallas, TX', cover: 0, badge: null, dressCode: 'smart', accessible: false, hearingLoop: false, eco: true, category: 'speakeasy' },
  { id: 'v7', name: 'The Standard Pour', type: 'COCKTAIL BAR', district: 'Uptown', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', crowd: 0.45, distance: '0.7m', deal: '$8 Old Fashioned', dealEnd: '8pm', address: '2900 McKinney Ave, Dallas, TX', cover: 0, badge: 'free', dressCode: 'smart', accessible: true, hearingLoop: false, eco: false, category: 'bar' },
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
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Compass },
  { id: 'rooftop', name: 'Rooftops', icon: Building },
  { id: 'speakeasy', name: 'Speakeasies', icon: Wine },
  { id: 'bar', name: 'Bars', icon: Music },
  { id: 'livemusic', name: 'Live Music', icon: Music },
  { id: 'club', name: 'Clubs', icon: Zap }
];

const FILTERS = [
  { id: 'accessible', label: 'Wheelchair', icon: Accessibility },
  { id: 'hearingLoop', label: 'Hearing Loop', icon: Volume2 },
  { id: 'eco', label: 'Eco-Friendly', icon: Leaf },
  { id: 'free', label: 'No Cover', icon: null },
  { id: 'happyHour', label: 'Happy Hour', icon: Clock }
];

// ============================================================================
// HELPERS
// ============================================================================

function getVibe(crowd) {
  if (crowd >= 0.85) return { label: 'PACKED', color: '#ef4444' };
  if (crowd >= 0.60) return { label: 'HYPE', color: '#f97316' };
  if (crowd >= 0.40) return { label: 'MODERATE', color: '#3b82f6' };
  return { label: 'CHILL', color: '#22c55e' };
}

function getDress(code) {
  if (code === 'upscale') return { label: 'Upscale', color: '#a855f7', icon: '🎩' };
  if (code === 'smart') return { label: 'Smart Casual', color: '#3b82f6', icon: '👔' };
  return { label: 'Casual', color: '#22c55e', icon: '👟' };
}

function shareVenue(venue) {
  const text = `Check out ${venue.name} on KrowdGuide! Currently ${getVibe(venue.crowd).label.toLowerCase()} vibes.`;
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
// STYLES
// ============================================================================

const styles = {
  app: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#09090b',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: 'white'
  },
  main: {
    height: '100%',
    overflowY: 'auto',
    paddingBottom: 100
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    border: '1px solid #27272a',
    overflow: 'hidden'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 10px',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    fontSize: 12,
    fontWeight: 700
  },
  btn: {
    backgroundColor: ACCENT,
    color: 'white',
    border: 'none',
    borderRadius: 16,
    padding: '14px 20px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  btnSecondary: {
    backgroundColor: '#27272a',
    color: 'white',
    border: '1px solid #3f3f46',
    borderRadius: 16,
    padding: '14px 20px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: 12,
    padding: '12px 16px',
    marginBottom: 12
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: 15,
    outline: 'none'
  },
  filterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    border: '1px solid #3f3f46',
    backgroundColor: '#18181b',
    color: '#a1a1aa'
  },
  filterChipActive: {
    backgroundColor: ACCENT + '20',
    borderColor: ACCENT,
    color: ACCENT
  },
  nav: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(24,24,27,0.95)',
    borderRadius: 40,
    padding: 8,
    display: 'flex',
    gap: 4,
    border: '1px solid #27272a',
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
    cursor: 'pointer'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};

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
      padding: '5px 10px',
      borderRadius: 8,
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'white',
      backgroundColor: colors[badge]
    }}>
      {badge}
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

function VibeBadge({ crowd }) {
  const v = getVibe(crowd);
  return (
    <span style={{ ...styles.badge }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: v.color }} />
      <span style={{ color: v.color }}>{v.label}</span>
    </span>
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

function LiveBadge() {
  return (
    <span style={{ ...styles.badge, backgroundColor: 'rgba(24,24,27,0.9)' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
      <span style={{ color: 'white' }}>LIVE NOW</span>
    </span>
  );
}

function LoadBadge({ load }) {
  const pct = Math.round(load * 100);
  const color = load >= 0.8 ? '#ef4444' : load >= 0.5 ? '#facc15' : '#22c55e';
  return (
    <span style={{ ...styles.badge }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
      <span style={{ color: 'white' }}>{pct}%</span>
    </span>
  );
}

// ============================================================================
// CROWD REPORT MODAL
// ============================================================================

function CrowdReportModal({ venue, onClose, onReport }) {
  const [selected, setSelected] = useState(null);
  
  const levels = [
    { id: 'empty', label: 'Empty', emoji: '🪹', value: 0.2 },
    { id: 'chill', label: 'Chill', emoji: '😌', value: 0.35 },
    { id: 'moderate', label: 'Moderate', emoji: '👍', value: 0.5 },
    { id: 'busy', label: 'Busy', emoji: '🔥', value: 0.7 },
    { id: 'packed', label: 'Packed', emoji: '🤯', value: 0.95 }
  ];

  const handleSubmit = () => {
    if (selected) {
      onReport(venue.id, selected.value);
      onClose();
    }
  };

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={{ ...styles.modalContent, maxHeight: '50vh' }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 5, backgroundColor: '#3f3f46', borderRadius: 10, margin: '0 auto 20px' }} />
        
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', textAlign: 'center' }}>
          How's {venue.name}?
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
          onClick={handleSubmit}
          disabled={!selected}
          style={{
            ...styles.btn,
            width: '100%',
            opacity: selected ? 1 : 0.5
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// VENUE MODAL
// ============================================================================

function VenueModal({ venue, onClose, onCheckIn, onReport, checkIns }) {
  const [liked, setLiked] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  if (!venue) return null;
  
  const vibe = getVibe(venue.crowd);
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
            position: 'absolute',
            top: 16,
            right: 16,
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#27272a',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} color="white" />
        </button>

        <div style={{ width: 48, height: 5, backgroundColor: '#3f3f46', borderRadius: 10, margin: '0 auto 20px' }} />

        {/* Image */}
        <div style={{ position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
          <img src={venue.image} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <LoadBadge load={venue.crowd} />
            <VibeBadge crowd={venue.crowd} />
            {venue.eco && <EcoBadge />}
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
            <button 
              onClick={() => shareVenue(venue)}
              style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Share2 size={18} color="white" />
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Heart size={18} color={liked ? '#ec4899' : 'white'} fill={liked ? '#ec4899' : 'none'} />
            </button>
          </div>
          {/* Accessibility badges */}
          {(venue.accessible || venue.hearingLoop) && (
            <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
              <AccessibleBadge wheelchair={venue.accessible} hearing={venue.hearingLoop} />
            </div>
          )}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{venue.name}</h2>
          <PriceBadge cover={venue.cover} />
        </div>
        <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 20 }}>{venue.type} • {venue.district}</p>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#27272a' }}>
            <p style={{ color: '#71717a', fontSize: 12, marginBottom: 4 }}>Vibe</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: vibe.color, margin: 0 }}>{vibe.label}</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#27272a' }}>
            <p style={{ color: '#71717a', fontSize: 12, marginBottom: 4 }}>Dress Code</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: dress.color, margin: 0 }}>{dress.icon} {dress.label}</p>
          </div>
        </div>

        {/* Report Crowd Button */}
        <button
          onClick={() => setShowReport(true)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px dashed #3f3f46',
            backgroundColor: 'transparent',
            color: '#a1a1aa',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 20
          }}
        >
          <TrendingUp size={18} />
          Report Current Crowd
        </button>

        {/* Happy Hour */}
        {venue.deal && (
          <div style={{ backgroundColor: '#27272a', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <p style={{ color: '#facc15', fontWeight: 700, margin: 0 }}>🍹 {venue.deal}</p>
            <p style={{ color: '#71717a', fontSize: 12, margin: '4px 0 0' }}>Until {venue.dealEnd}</p>
          </div>
        )}

        {/* Address */}
        <p style={{ color: '#a1a1aa', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <MapPin size={16} color="#71717a" /> {venue.address}
        </p>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button 
            style={{
              ...styles.btn,
              backgroundColor: hasCheckedIn ? '#22c55e' : ACCENT
            }} 
            onClick={() => !hasCheckedIn && onCheckIn(venue)}
          >
            <CheckCircle size={18} /> {hasCheckedIn ? 'Checked In!' : 'Check In'}
          </button>
          <button style={styles.btnSecondary} onClick={() => alert('Opening directions...')}>
            <Navigation size={18} /> Directions
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DISCOVER MODE
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
          {event.isLive && <LiveBadge />}
          {venue && <VibeBadge crowd={venue.crowd} />}
          {venue && <DressBadge code={venue.dressCode} />}
          {venue?.eco && <EcoBadge />}
        </div>
        <div style={{ backgroundColor: 'rgba(24,24,27,0.8)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
          <p style={{ color: '#a1a1aa', fontSize: 11, margin: 0 }}>TODAY</p>
          <p style={{ color: 'white', fontSize: 24, fontWeight: 700, margin: 0 }}>{event.time}</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 140, left: 20, right: 20, zIndex: 10 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 12px' }}>{event.name}</h1>
        <p style={{ color: ACCENT, fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>{event.date}, {event.time}</p>
        <p style={{ color: '#d4d4d8', fontSize: 18, margin: 0 }}>{event.venue}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <PriceBadge cover={event.cover} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => venue && shareVenue(venue)} style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(39,39,42,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Share2 size={18} color="white" />
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
// HOME TAB
// ============================================================================

function HomeTab({ venues, onVenue, checkIns, recommendations }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) ? prev.filter(f => f !== filterId) : [...prev, filterId]
    );
  };

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      // Search
      if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && 
          !v.district.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // Category
      if (category !== 'all' && v.category !== category) return false;
      // Filters
      if (activeFilters.includes('accessible') && !v.accessible) return false;
      if (activeFilters.includes('hearingLoop') && !v.hearingLoop) return false;
      if (activeFilters.includes('eco') && !v.eco) return false;
      if (activeFilters.includes('free') && v.cover > 0) return false;
      if (activeFilters.includes('happyHour') && !v.deal) return false;
      return true;
    });
  }, [venues, search, category, activeFilters]);

  const happyHour = filteredVenues.filter(v => v.deal);
  const trending = filteredVenues.filter(v => v.crowd >= 0.5);

  return (
    <div style={styles.main}>
      {/* Header */}
      <div style={{ padding: '48px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
            <span>Krowd</span>
            <span style={{ color: ACCENT }}>Guide</span>
          </h1>
          <p style={{ color: '#71717a', fontSize: 11, letterSpacing: 2, margin: '4px 0 0' }}>KNOW BEFORE YOU GO</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #22c55e', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={styles.searchBar}>
          <Search size={20} color="#71717a" />
          <input
            type="text"
            placeholder="Search venues, districts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={{ 
              backgroundColor: activeFilters.length > 0 ? ACCENT : '#27272a', 
              border: 'none', 
              borderRadius: 8, 
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <Filter size={16} color="white" />
            {activeFilters.length > 0 && (
              <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{activeFilters.length}</span>
            )}
          </button>
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => toggleFilter(f.id)}
                style={{
                  ...styles.filterChip,
                  ...(activeFilters.includes(f.id) ? styles.filterChipActive : {})
                }}
              >
                {f.icon && <f.icon size={14} />}
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{
                ...styles.filterChip,
                ...(category === c.id ? styles.filterChipActive : {})
              }}
            >
              <c.icon size={14} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations (if has check-ins) */}
      {recommendations.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} color="#818cf8" />
              <span style={{ color: '#818cf8', fontWeight: 700 }}>For You</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {recommendations.map(v => (
              <div key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 160, cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 100, borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
                    <VibeBadge crowd={v.crowd} />
                  </div>
                </div>
                <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{v.name}</p>
                <p style={{ color: '#71717a', fontSize: 12, margin: '2px 0 0' }}>Based on your check-ins</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Happy Hours */}
      {happyHour.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="#facc15" />
              <span style={{ color: '#facc15', fontWeight: 700 }}>Happy Hours Active</span>
            </div>
            <span style={{ color: '#71717a', fontSize: 14 }}>View all</span>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {happyHour.map(v => (
              <div key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 160, cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 130, borderRadius: 16, overflow: 'hidden', marginBottom: 10 }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <VenueBadge badge={v.badge} />
                  {v.eco && <div style={{ position: 'absolute', top: 12, right: 12 }}><EcoBadge /></div>}
                  <span style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: ACCENT, color: 'white', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    Until {v.dealEnd}
                  </span>
                </div>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{v.name}</p>
                <p style={{ color: '#71717a', fontSize: 12, margin: '2px 0 0' }}>{v.deal}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>Trending</span>
              <Flame size={18} color="#f97316" />
            </div>
            <span style={{ color: '#71717a', fontSize: 14 }}>View all</span>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 12px' }}>
            {trending.map(v => (
              <div key={v.id} onClick={() => onVenue(v)} style={{ flexShrink: 0, width: 240, cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 180, borderRadius: 16, overflow: 'hidden', marginBottom: 10 }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)' }} />
                  <VenueBadge badge={v.badge} />
                  <div style={{ position: 'absolute', top: 10, right: 10 }}><LoadBadge load={v.crowd} /></div>
                  <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <VibeBadge crowd={v.crowd} />
                    <DressBadge code={v.dressCode} />
                    {v.eco && <EcoBadge />}
                  </div>
                  <div style={{ position: 'absolute', bottom: 10, right: 10 }}><PriceBadge cover={v.cover} /></div>
                  {(v.accessible || v.hearingLoop) && (
                    <div style={{ position: 'absolute', top: 44, right: 10 }}>
                      <AccessibleBadge wheelchair={v.accessible} hearing={v.hearingLoop} />
                    </div>
                  )}
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{v.name}</p>
                <p style={{ color: '#71717a', fontSize: 12, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={12} /> {v.distance} • {v.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredVenues.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ color: '#71717a', fontSize: 16 }}>No venues match your filters</p>
          <button onClick={() => { setActiveFilters([]); setCategory('all'); setSearch(''); }} style={{ ...styles.btn, margin: '16px auto 0' }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAP TAB
// ============================================================================

function MapTab({ onDistrict }) {
  return (
    <div style={{ height: '100%', position: 'relative', backgroundColor: '#09090b' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a3a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>
        </defs>
        <rect fill="url(#g1)" width="100" height="100" />
        {[0,10,20,30,40,50,60,70,80,90,100].map(x => <line key={'v'+x} x1={x} y1="0" x2={x} y2="100" stroke="#27272a" strokeWidth="0.2" />)}
        {[0,10,20,30,40,50,60,70,80,90,100].map(y => <line key={'h'+y} x1="0" y1={y} x2="100" y2={y} stroke="#27272a" strokeWidth="0.2" />)}
      </svg>

      <div style={{ position: 'absolute', top: 48, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px 14px', borderRadius: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{ fontWeight: 700, fontSize: 13 }}>LIVE NET</span>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapPin size={20} color="white" />
        </div>
      </div>

      {DISTRICTS.map(d => (
        <div 
          key={d.id} 
          onClick={() => onDistrict(d)}
          style={{ 
            position: 'absolute', 
            left: `${d.x}%`, 
            top: `${d.y}%`, 
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: d.color + '20',
            border: `2px solid ${d.color}60`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: d.color }}>{d.venues}</span>
            <span style={{ fontSize: 9, color: '#a1a1aa' }}>VENUES</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: d.color, backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: 6 }}>
            {d.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EVENTS TAB
// ============================================================================

function EventsTab({ events, venues, onEvent, onDiscover }) {
  const [likes, setLikes] = useState({});

  return (
    <div style={styles.main}>
      <div style={{ padding: '48px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Tonight's Events</h1>
        <button onClick={onDiscover} style={{ ...styles.btn, padding: '10px 18px', fontSize: 14 }}>Discover</button>
      </div>

      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px dashed #52525b', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18181b' }}>
            <Plus size={22} color="#71717a" />
          </div>
          <span style={{ fontSize: 11, color: '#71717a' }}>Add</span>
        </div>
        {PERFORMERS.map(p => (
          <div key={p.id} onClick={() => alert(p.name + ' at ' + p.venue)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', padding: 2, background: p.isLive ? `linear-gradient(135deg, ${ACCENT}, #a855f7)` : '#3f3f46' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              {p.isLive && <span style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, backgroundColor: '#22c55e', borderRadius: '50%', border: '2px solid #09090b' }} />}
            </div>
            <span style={{ fontSize: 11, color: '#a1a1aa', maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {events.map(e => {
          const v = venues.find(x => x.id === e.venueId);
          return (
            <div key={e.id} onClick={() => onEvent(e)} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 14, padding: 14, cursor: 'pointer' }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, backgroundColor: '#09090b', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img src={e.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#a1a1aa', fontSize: 11, fontWeight: 700 }}>TODAY</span>
                  <span style={{ color: 'white', fontSize: 22, fontWeight: 700 }}>{e.time}</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  {e.isLive && <LiveBadge />}
                  {v && <VibeBadge crowd={v.crowd} />}
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</p>
                <p style={{ color: ACCENT, fontWeight: 600, margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.venue}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                  <span style={{ color: '#71717a', fontSize: 13 }}>{e.district}</span>
                  {v && <DressBadge code={v.dressCode} />}
                  <PriceBadge cover={e.cover} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <button 
                  onClick={(ev) => { ev.stopPropagation(); setLikes({ ...likes, [e.id]: !likes[e.id] }); }}
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#27272a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Heart size={18} color={likes[e.id] ? '#ec4899' : '#71717a'} fill={likes[e.id] ? '#ec4899' : 'none'} />
                </button>
                <ChevronRight size={20} color="#52525b" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE TAB
// ============================================================================

function ProfileTab({ venues, onVenue, checkIns }) {
  const recentCheckIns = [...checkIns].reverse().slice(0, 10);
  const uniqueVenueIds = [...new Set(checkIns.map(c => c.venueId))];
  const favoriteVenues = uniqueVenueIds.slice(0, 3).map(id => venues.find(v => v.id === id)).filter(Boolean);

  return (
    <div style={styles.main}>
      <div style={{ padding: '48px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #22c55e', overflow: 'hidden', marginBottom: 16 }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Alex Thompson</h1>
        <p style={{ color: '#71717a', margin: '4px 0 0' }}>@alexthompson</p>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px', marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { n: checkIns.length, l: 'Check-ins', I: CheckCircle },
            { n: uniqueVenueIds.length, l: 'Venues', I: MapPin },
            { n: 89, l: 'Friends', I: Users }
          ].map(s => (
            <div key={s.l} style={{ ...styles.card, textAlign: 'center', padding: 16 }}>
              <s.I size={20} color="#71717a" style={{ marginBottom: 8 }} />
              <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{s.n}</p>
              <p style={{ color: '#71717a', fontSize: 12, margin: '4px 0 0' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Check-in History */}
      {recentCheckIns.length > 0 && (
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <History size={18} color="#a1a1aa" />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Recent Check-ins</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentCheckIns.map((checkIn, i) => {
              const v = venues.find(x => x.id === checkIn.venueId);
              if (!v) return null;
              return (
                <div key={i} onClick={() => onVenue(v)} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 12, padding: 12, cursor: 'pointer' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</p>
                    <p style={{ color: '#71717a', fontSize: 12, margin: '2px 0 0' }}>{getTimeAgo(checkIn.time)}</p>
                  </div>
                  <CheckCircle size={18} color="#22c55e" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
          {favoriteVenues.length > 0 ? 'Your Spots' : 'Suggested Spots'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(favoriteVenues.length > 0 ? favoriteVenues : venues.slice(0, 3)).map(v => (
            <div key={v.id} onClick={() => onVenue(v)} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 14, padding: 14, cursor: 'pointer' }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, margin: '0 0 6px' }}>{v.name}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <VibeBadge crowd={v.crowd} />
                  {v.eco && <EcoBadge />}
                </div>
              </div>
              <ChevronRight size={18} color="#52525b" />
            </div>
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
  const [tab, setTab] = useState('home');
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [venue, setVenue] = useState(null);
  const [discover, setDiscover] = useState(false);
  const [checkIns, setCheckIns] = useState([]);

  // Personalized recommendations based on check-in history
  const recommendations = useMemo(() => {
    if (checkIns.length === 0) return [];
    
    // Get categories and dress codes from check-ins
    const checkedInVenueIds = checkIns.map(c => c.venueId);
    const checkedInVenues = venues.filter(v => checkedInVenueIds.includes(v.id));
    
    const preferredCategories = [...new Set(checkedInVenues.map(v => v.category))];
    const preferredDressCodes = [...new Set(checkedInVenues.map(v => v.dressCode))];
    
    // Recommend similar venues not yet visited
    return venues
      .filter(v => !checkedInVenueIds.includes(v.id))
      .filter(v => preferredCategories.includes(v.category) || preferredDressCodes.includes(v.dressCode))
      .slice(0, 4);
  }, [venues, checkIns]);

  const handleCheckIn = (v) => {
    setCheckIns(prev => [...prev, { venueId: v.id, time: Date.now() }]);
    setVenue(null);
  };

  const handleCrowdReport = (venueId, crowdLevel) => {
    setVenues(prev => prev.map(v => 
      v.id === venueId ? { ...v, crowd: crowdLevel } : v
    ));
    alert('Thanks for reporting! Crowd level updated.');
  };

  const handleEvent = (e) => {
    const v = venues.find(x => x.id === e.venueId);
    if (v) setVenue(v);
  };

  return (
    <div style={styles.app}>
      {tab === 'home' && (
        <HomeTab 
          venues={venues} 
          onVenue={setVenue} 
          checkIns={checkIns}
          recommendations={recommendations}
        />
      )}
      {tab === 'map' && <MapTab onDistrict={d => alert(`${d.name}\n${d.venues} venues`)} />}
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
              color: tab === t.id ? 'white' : '#71717a'
            }}
          >
            <t.Icon size={22} />
          </button>
        ))}
      </nav>
    </div>
  );
}
