// KrowdGuide - Dallas Nightlife Discovery App
// Updated with Audit Compliance: Four Pillars, Proper Terminology, Disclaimers

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home as HomeIcon, 
  Map as MapIcon, 
  Calendar, 
  User, 
  Search, 
  Zap, 
  MapPin, 
  Clock, 
  Shield, 
  ChevronRight,
  TrendingUp,
  Settings,
  Heart,
  Share2,
  X,
  Car,
  Filter,
  Leaf,
  Accessibility,
  Volume2,
  CheckCircle,
  Navigation,
  ArrowRight,
  Info,
  Lock,
  FileText,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { TabType, Venue, CheckIn } from './types';
import { GlassCard } from './components/GlassCard';
import { NeonButton } from './components/NeonButton';
import { VENUES, EVENTS, DISTRICTS, getCrowdLabel, getParkingLabel, getIncidentLabel, getVibeInfo } from './data';

// ============================================================================
// SPLASH SCREEN
// ============================================================================

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(onFinish, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 bg-[#09090b] flex flex-col items-center justify-center z-[100] overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#09090b] bg-[length:200%_200%] animate-[gradient_10s_ease_infinite]"></div>
      
      {/* Pulsing rings */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#FF2E63] blur-[80px] opacity-20 animate-pulse scale-150"></div>
        <div className="absolute -inset-8 border-2 border-[#FF2E63]/30 rounded-full animate-[ping_2s_linear_infinite]"></div>
        <div className="absolute -inset-16 border border-[#FF2E63]/20 rounded-full animate-[ping_2.5s_linear_infinite]"></div>
        <div className="absolute -inset-24 border border-[#FF2E63]/10 rounded-full animate-[ping_3s_linear_infinite]"></div>
        
        {/* Logo */}
        <div className="relative w-28 h-28 bg-gradient-to-br from-[#FF2E63] to-[#ff5f8a] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(255,46,99,0.5)] animate-[bounce-in_0.8s_ease-out]">
          <span className="text-5xl font-black text-white">K</span>
        </div>
      </div>
      
      {/* Title */}
      <div className="mt-10 text-center animate-[slide-up_0.6s_ease-out_0.4s_both]">
        <h1 className="text-5xl font-black tracking-tighter">
          <span className="text-white">Krowd</span>
          <span className="text-[#FF2E63] drop-shadow-[0_0_20px_rgba(255,46,99,0.6)]">Guide</span>
        </h1>
      </div>
      
      {/* Tagline */}
      <div className="mt-4 flex items-center gap-3 animate-[fade-in_0.6s_ease-out_0.8s_both]">
        <span className="h-px w-8 bg-zinc-700"></span>
        <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-xs">Know Before You Go</p>
        <span className="h-px w-8 bg-zinc-700"></span>
      </div>
      
      {/* Loading dots */}
      <div className="absolute bottom-20 flex gap-2">
        <div className="w-2 h-2 bg-[#FF2E63] rounded-full animate-[bounce_1.4s_ease-in-out_infinite]"></div>
        <div className="w-2 h-2 bg-[#FF2E63] rounded-full animate-[bounce_1.4s_ease-in-out_infinite_0.16s]"></div>
        <div className="w-2 h-2 bg-[#FF2E63] rounded-full animate-[bounce_1.4s_ease-in-out_infinite_0.32s]"></div>
      </div>
    </div>
  );
};

// ============================================================================
// ONBOARDING SCREEN (Single screen per audit)
// ============================================================================

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [requesting, setRequesting] = useState(false);

  const handleLocation = () => {
    setRequesting(true);
    // Simulate location request
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#09090b] z-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FF2E63] blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-md w-full text-center relative z-10">
        {/* Logo */}
        <h1 className="text-4xl font-black mb-6">
          <span className="text-white">Krowd</span>
          <span className="text-[#FF2E63]">Guide</span>
        </h1>
        
        {/* Tagline per audit */}
        <p className="text-3xl font-bold text-white mb-2">Is it a good time to go?</p>
        <p className="text-zinc-400 text-lg mb-10">Enable location to find what's near you.</p>
        
        {/* Location icon */}
        <div className="w-20 h-20 bg-[#FF2E63]/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-[#FF2E63]/30">
          <MapPin className="text-[#FF2E63]" size={40} />
        </div>
        
        {/* Buttons per audit */}
        <NeonButton 
          fullWidth 
          onClick={handleLocation} 
          disabled={requesting}
          className="h-14 text-base mb-4"
        >
          {requesting ? (
            <>CONNECTING...</>
          ) : (
            <><MapPin size={20} /> ENABLE LOCATION</>
          )}
        </NeonButton>
        
        <button 
          onClick={onComplete}
          className="w-full py-4 text-zinc-500 font-bold hover:text-white transition-colors"
        >
          Skip
        </button>
        
        {/* Privacy note per audit */}
        <p className="mt-10 text-zinc-600 text-xs leading-relaxed">
          We only track location at venues within Dallas districts.<br/>
          Never your home or work.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// VENUE MODAL - Updated with Four Pillars
// ============================================================================

const VenueModal = ({ 
  venue, 
  onClose, 
  onCheckIn,
  hasCheckedIn 
}: { 
  venue: Venue; 
  onClose: () => void;
  onCheckIn: () => void;
  hasCheckedIn: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const crowd = getCrowdLabel(venue.crowdLevel);
  const parking = getParkingLabel(venue.parking);
  const incidents = getIncidentLabel(venue.incidents);
  const vibeInfo = getVibeInfo(venue.vibe);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex items-end md:items-center justify-center">
      <GlassCard className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl animate-[slide-up_0.3s_ease-out]">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-[#FF2E63] transition-all border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Handle bar (mobile) */}
        <div className="w-12 h-1 bg-zinc-600 rounded-full mx-auto mt-3 mb-2 md:hidden"></div>

        {/* Hero image */}
        <div className="relative h-56">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent"></div>
          
          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: crowd.color }}></span>
              Usually {venue.crowdLevel}%
            </span>
            {venue.eco && (
              <span className="px-3 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <Leaf size={12} className="inline mr-1" /> Eco
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-16 flex gap-2">
            <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all">
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border transition-all ${
                liked ? 'bg-pink-500/20 border-pink-500/50' : 'bg-black/50 border-white/10 hover:bg-white/10'
              }`}
            >
              <Heart size={18} className={liked ? 'fill-pink-500 text-pink-500' : ''} />
            </button>
          </div>
          
          {/* Accessibility badges */}
          {(venue.accessible || venue.hearingLoop) && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {venue.accessible && (
                <span className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <Accessibility size={16} className="text-blue-400" />
                </span>
              )}
              {venue.hearingLoop && (
                <span className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <Volume2 size={16} className="text-purple-400" />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-2xl font-black">{venue.name}</h2>
            <span className="px-3 py-1 bg-zinc-800 rounded-lg text-sm font-bold">
              {venue.cover === 0 ? 'FREE' : `$${venue.cover}`}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mb-6">{venue.type} • {venue.district}</p>

          {/* PILLAR 1: Crowd Level */}
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 mb-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <TrendingUp size={14} className="text-[#FF2E63]" /> Crowd Level
                </div>
                <p className="text-xl font-black" style={{ color: crowd.color }}>{crowd.label}</p>
                <p className="text-xs text-zinc-600 mt-1 italic">Based on patterns from past year</p>
              </div>
              <button className="px-3 py-2 border border-dashed border-[#FF2E63]/40 rounded-lg text-xs font-bold text-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all">
                Report
              </button>
            </div>
          </div>

          {/* PILLAR 3: Vibe (Separate from crowd per audit) */}
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 mb-3">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-[#FF2E63]" /> Vibe
            </div>
            <p className="text-xl font-black">
              <span style={{ color: vibeInfo.color }}>{venue.vibeEmoji} {venue.vibe}</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1 italic">Based on reviews</p>
          </div>

          {/* Dress Code */}
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 mb-3">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              Dress Code
            </div>
            <p className="text-lg font-bold capitalize">{venue.dressCode}</p>
          </div>

          {/* PILLAR 2: Parking */}
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 mb-3">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Car size={14} className="text-[#FF2E63]" /> Parking
            </div>
            <p className="text-lg font-bold" style={{ color: parking.color }}>{parking.label}</p>
            <p className="text-xs text-zinc-400 mt-1">{venue.parkingNotes}</p>
            {venue.parkingCost && (
              <p className="text-xs text-zinc-500 mt-1">Est. cost: {venue.parkingCost}</p>
            )}
          </div>

          {/* PILLAR 4: Safety (Never say "safe" per audit) */}
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 mb-3">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Shield size={14} className="text-[#FF2E63]" /> Nearby Incidents
            </div>
            <p className="text-lg font-bold" style={{ color: incidents.color }}>
              {venue.incidents === 0 ? 'No incidents reported' : `${venue.incidents} incidents in past ${venue.incidentPeriod}`}
            </p>
            {venue.incidentTypes.length > 0 && (
              <p className="text-xs text-zinc-400 mt-1">{venue.incidentTypes.join(', ')}</p>
            )}
            <p className="text-xs text-zinc-600 mt-2 italic">
              Data from Dallas Police Department via Dallas OpenData. Historical data - conditions may change.
            </p>
          </div>

          {/* Happy Hour */}
          {venue.happyHour && (
            <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/30 mb-3">
              <p className="text-yellow-400 font-bold">🍹 {venue.happyHour}</p>
              <p className="text-xs text-zinc-400 mt-1">Until {venue.happyHourEnd}</p>
            </div>
          )}

          {/* Address */}
          <p className="text-zinc-400 text-sm flex items-center gap-2 mb-6">
            <MapPin size={16} /> {venue.address}
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <NeonButton 
              onClick={onCheckIn}
              disabled={hasCheckedIn}
              className={hasCheckedIn ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : ''}
            >
              <CheckCircle size={18} /> {hasCheckedIn ? 'Checked In!' : 'Check In'}
            </NeonButton>
            <NeonButton variant="secondary">
              <Navigation size={18} /> Directions
            </NeonButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ============================================================================
// SETTINGS SCREEN
// ============================================================================

const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-black">Settings</h2>
      </div>

      <div className="space-y-4">
        <GlassCard hoverable className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Lock size={20} className="text-purple-400" />
            </div>
            <span className="font-bold">Privacy Policy</span>
          </div>
          <ChevronRight size={18} className="text-zinc-600" />
        </GlassCard>

        <GlassCard hoverable className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-emerald-400" />
            </div>
            <span className="font-bold">Terms of Service</span>
          </div>
          <ChevronRight size={18} className="text-zinc-600" />
        </GlassCard>

        <GlassCard hoverable className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF2E63]/20 rounded-xl flex items-center justify-center">
              <Info size={20} className="text-[#FF2E63]" />
            </div>
            <span className="font-bold">About KrowdGuide</span>
          </div>
          <ChevronRight size={18} className="text-zinc-600" />
        </GlassCard>
      </div>

      <p className="text-center text-zinc-600 text-xs mt-10">KrowdGuide v1.0.0</p>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // Filtered venues
  const filteredVenues = useMemo(() => {
    return VENUES.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           v.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Happy hour venues
  const happyHourVenues = filteredVenues.filter(v => v.happyHour);

  // Check if venue has been checked into
  const hasCheckedIn = (venueId: string) => checkIns.some(c => c.venueId === venueId);

  // Handle check-in
  const handleCheckIn = (venue: Venue) => {
    if (!hasCheckedIn(venue.id)) {
      setCheckIns(prev => [...prev, { venueId: venue.id, time: Date.now() }]);
    }
  };

  // Splash screen
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;
  
  // Onboarding
  if (!isOnboarded) return <Onboarding onComplete={() => setIsOnboarded(true)} />;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-zinc-950/80 backdrop-blur-xl border-r border-white/5 flex-col p-6 fixed inset-y-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF2E63] to-[#ff5f8a] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,46,99,0.4)]">
            <Zap size={24} className="fill-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight">KrowdGuide</h1>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1">
          {[
            { id: 'home', icon: HomeIcon, label: 'Discover' },
            { id: 'map', icon: MapIcon, label: 'Districts' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as TabType); setShowSettings(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === item.id 
                ? 'bg-[#FF2E63] text-white shadow-[0_4px_20px_rgba(255,46,99,0.3)]' 
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Profile card */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border-2 border-emerald-500 object-cover" 
            />
            <div>
              <p className="text-sm font-bold">Sarah Johnson</p>
              <p className="text-xs text-[#FF2E63] font-bold">@sarahj</p>
            </div>
          </div>
        </GlassCard>
      </aside>

      {/* Main Content */}
      <main className="md:ml-72 p-4 md:p-8 pb-24 min-h-screen">
        
        {/* HOME TAB */}
        {activeTab === 'home' && !showSettings && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Search */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                <input 
                  type="text"
                  placeholder="Search venues, districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#FF2E63]/40 transition-all"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'rooftop', 'speakeasy', 'bar', 'club'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                      activeCategory === cat 
                      ? 'bg-[#FF2E63] text-white border-[#FF2E63]' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Krowd Intelligence - Updated language per audit */}
            <GlassCard className="p-6 border-[#FF2E63]/20 bg-gradient-to-r from-[#FF2E63]/10 to-transparent">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#FF2E63]/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="text-[#FF2E63]" size={28} />
                </div>
                <div>
                  <p className="text-[#FF2E63] text-xs font-black uppercase tracking-wider mb-1">Krowd Intelligence</p>
                  <p className="font-bold">Deep Ellum is usually busy on Friday nights. Plan ahead!</p>
                </div>
              </div>
            </GlassCard>

            {/* Happy Hours */}
            {happyHourVenues.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-yellow-400" />
                  <h2 className="text-lg font-black text-yellow-400">Happy Hours</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {happyHourVenues.slice(0, 3).map((venue) => (
                    <GlassCard 
                      key={venue.id} 
                      hoverable 
                      onClick={() => setSelectedVenue(venue)}
                      className="overflow-hidden"
                    >
                      <div className="h-32 relative">
                        <img src={venue.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
                        <span className="absolute bottom-3 right-3 px-2 py-1 bg-[#FF2E63] text-white text-xs font-bold rounded-lg">
                          Until {venue.happyHourEnd}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{venue.name}</h3>
                        <p className="text-yellow-400 text-sm">{venue.happyHour}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            )}

            {/* Usually Busy - Changed from "Trending" per audit */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black">Usually Busy</h2>
                <button className="text-zinc-500 text-sm hover:text-[#FF2E63] transition-colors flex items-center gap-1">
                  <Info size={14} /> Why this section?
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredVenues.filter(v => v.crowdLevel >= 50).map((venue) => {
                  const crowd = getCrowdLabel(venue.crowdLevel);
                  return (
                    <GlassCard 
                      key={venue.id} 
                      hoverable 
                      onClick={() => setSelectedVenue(venue)}
                      className="group overflow-hidden"
                    >
                      <div className="h-48 relative">
                        <img src={venue.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent"></div>
                        
                        {/* Crowd badge with "Usually" prefix per audit */}
                        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg border border-white/10">
                          <span className="text-xs font-bold">Usually {venue.crowdLevel}%</span>
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold" style={{ color: getVibeInfo(venue.vibe).color }}>
                            {venue.vibeEmoji} {venue.vibe}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold">
                            {venue.cover === 0 ? 'FREE' : `$${venue.cover}`}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold group-hover:text-[#FF2E63] transition-colors">{venue.name}</h3>
                        <p className="text-zinc-500 text-sm flex items-center gap-1">
                          <MapPin size={12} /> {venue.distance} • {venue.type}
                        </p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === 'map' && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-2xl font-black mb-6">Dallas Districts</h2>
            
            <div className="h-[60vh] bg-zinc-900/30 rounded-3xl border border-white/5 relative overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(rgba(255,46,99,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* District bubbles */}
              {DISTRICTS.map((district) => {
                const color = district.crowdLevel === 'busy' || district.crowdLevel === 'packed' 
                  ? '#FF2E63' 
                  : district.crowdLevel === 'moderate' 
                    ? '#f97316' 
                    : '#22c55e';
                return (
                  <div 
                    key={district.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${district.x}%`, top: `${district.y}%` }}
                  >
                    <div 
                      className="w-24 h-24 rounded-full flex flex-col items-center justify-center backdrop-blur-md group-hover:scale-110 transition-all duration-300"
                      style={{ 
                        backgroundColor: `${color}10`,
                        border: `2px solid ${color}40`,
                        boxShadow: `0 0 30px ${color}20`
                      }}
                    >
                      <span className="text-2xl font-black">{district.venues}</span>
                      <span className="text-xs text-zinc-400">venues</span>
                    </div>
                    <span 
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {district.name}
                    </span>
                  </div>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 p-4 bg-zinc-950/80 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Crowd Levels</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#FF2E63] rounded-full shadow-[0_0_8px_#FF2E63]"></span>
                    <span className="text-xs text-zinc-400">Usually Busy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    <span className="text-xs text-zinc-400">Usually Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    <span className="text-xs text-zinc-400">Usually Chill</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 mt-3 italic">Based on patterns</p>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black">Events</h2>
            
            {EVENTS.map((event) => {
              const venue = VENUES.find(v => v.id === event.venueId);
              return (
                <GlassCard key={event.id} hoverable className="p-5">
                  <div className="flex gap-5">
                    <div className="w-20 h-20 bg-zinc-900 rounded-xl flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                      <img src={event.image} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      <span className="relative text-xs font-bold text-zinc-400">
                        {event.date === 'Tonight' ? 'TODAY' : event.date.split(',')[0]}
                      </span>
                      <span className="relative text-lg font-black">{event.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-2">
                        {event.date === 'Tonight' && (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                            Tonight
                          </span>
                        )}
                        {venue && (
                          <span className="px-2 py-1 bg-zinc-800 text-xs font-bold rounded-lg" style={{ color: getVibeInfo(venue.vibe).color }}>
                            {venue.vibeEmoji} {venue.vibe}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-[#FF2E63] font-bold text-sm">{event.venue}</p>
                      <div className="flex gap-4 mt-2 text-zinc-500 text-xs">
                        <span>{event.district}</span>
                        <span>{event.cover === 0 ? 'Free' : `$${event.cover}`}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-[#FF2E63] transition-all">
                        <Heart size={18} />
                      </button>
                      <ChevronRight size={18} className="text-zinc-600" />
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            {showSettings ? (
              <SettingsScreen onBack={() => setShowSettings(false)} />
            ) : (
              <>
                {/* Settings button */}
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="p-3 bg-zinc-900/50 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Settings size={20} className="text-zinc-400" />
                  </button>
                </div>

                {/* Profile header */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <div className="absolute -inset-2 bg-emerald-500 blur-xl opacity-30 animate-pulse rounded-full"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" 
                      className="relative w-28 h-28 rounded-full border-4 border-emerald-500 object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-black">Sarah Johnson</h2>
                  <p className="text-zinc-500">@sarahj</p>
                </div>

                {/* Stats - Removed Reviews/Friends per audit */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <GlassCard className="p-5 text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle size={24} className="text-emerald-400" />
                    </div>
                    <p className="text-2xl font-black">{checkIns.length}</p>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Check-ins</p>
                  </GlassCard>
                  <GlassCard className="p-5 text-center">
                    <div className="w-12 h-12 bg-[#FF2E63]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin size={24} className="text-[#FF2E63]" />
                    </div>
                    <p className="text-2xl font-black">{new Set(checkIns.map(c => c.venueId)).size}</p>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Venues</p>
                  </GlassCard>
                </div>

                {/* Favorite spots */}
                <section>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Heart className="text-[#FF2E63]" size={18} /> Suggested Spots
                  </h3>
                  <div className="space-y-3">
                    {VENUES.slice(0, 3).map((venue) => (
                      <GlassCard 
                        key={venue.id} 
                        hoverable 
                        onClick={() => setSelectedVenue(venue)}
                        className="p-4 flex items-center gap-4"
                      >
                        <img src={venue.image} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-bold">{venue.name}</p>
                          <p className="text-xs text-zinc-500">{venue.district}</p>
                        </div>
                        <ChevronRight size={18} className="text-zinc-600" />
                      </GlassCard>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        )}

        {/* Footer disclaimer */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-700 uppercase tracking-wider">
            Based on historical patterns • Data sources: Outscraper, Dallas OpenData • Drink responsibly
          </p>
        </footer>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50">
        {[
          { id: 'home', icon: HomeIcon },
          { id: 'map', icon: MapIcon },
          { id: 'events', icon: Calendar },
          { id: 'profile', icon: User }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id as TabType); setShowSettings(false); }}
            className={`p-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'text-[#FF2E63] bg-[#FF2E63]/10' 
                : 'text-zinc-500'
            }`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>

      {/* Venue Modal */}
      {selectedVenue && (
        <VenueModal 
          venue={selectedVenue} 
          onClose={() => setSelectedVenue(null)}
          onCheckIn={() => handleCheckIn(selectedVenue)}
          hasCheckedIn={hasCheckedIn(selectedVenue.id)}
        />
      )}
    </div>
  );
}
