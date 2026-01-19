import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';
import { 
  MapPin, Users, Shield, X, Music, Car, Volume2, Timer, 
  Home, Map as MapIcon, User, Wine, Navigation, Share2, 
  Sparkles, Flame, Bookmark, Camera, Grid, Ticket, Plus, 
  Search, Eye, EyeOff, CheckCircle2, Heart, MessageCircle, 
  Settings, Bell, Zap, MoreHorizontal, ArrowRight, UserPlus
} from 'lucide-react';

// ==========================================
// 1. CONFIG & DATA
// ==========================================

const generateUser = (id) => ({
  id,
  name: `User ${id.substr(0,4)}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
  status: Math.random() > 0.5 ? 'online' : 'offline',
  lastSeen: `${Math.floor(Math.random() * 59)}m ago`
});

const INITIAL_VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'Rooftop', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, safety: 'high', lat: 32.7905, lng: -96.8103, tags: ['cocktails', 'view', 'trendy'] },
  { id: 'v2', name: 'The Rustic', type: 'Live Music', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.6, safety: 'high', lat: 32.8034, lng: -96.7996, tags: ['live music', 'outdoor', 'beer'] },
  { id: 'v3', name: 'Stirr', type: 'Sports Bar', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.8, safety: 'moderate', lat: 32.7844, lng: -96.7816, tags: ['sports', 'food', 'party'] },
  { id: 'v4', name: 'Bottled Blonde', type: 'Club', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, safety: 'low', lat: 32.7850, lng: -96.7820, tags: ['club', 'pizza', 'loud'] },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'Beer Garden', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.4, safety: 'high', lat: 32.7990, lng: -96.8050, tags: ['chill', 'patio', 'beer'] },
];

const INITIAL_MOMENTS = [
  { id: 'm1', user: generateUser('u1'), type: 'video', verified: false, likes: 24, content: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=60' },
  { id: 'm2', user: generateUser('u2'), type: 'photo', verified: true, likes: 156, content: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=400&q=60' },
  { id: 'm3', user: generateUser('u3'), type: 'photo', verified: false, likes: 8, content: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=60' },
];

const DEFAULT_LOCATION = { lat: 32.7767, lng: -96.7970 };

// ==========================================
// 2. HOOKS
// ==========================================

const useGeolocation = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  
  return { location, error };
};

const useMapGestures = (initialScale = 1) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: initialScale });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);
  
  const onWheel = useCallback((e) => {
    const scaleChange = -e.deltaY * 0.001;
    setTransform(prev => ({ 
      ...prev, 
      scale: Math.max(0.5, Math.min(4, prev.scale + scaleChange)) 
    }));
  }, []);

  const reset = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: initialScale });
  }, [initialScale]);

  return { 
    transform, 
    reset,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, onWheel } 
  };
};

// ==========================================
// 3. STATE STORE
// ==========================================

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [venues] = useState(INITIAL_VENUES);
  const [moments] = useState(INITIAL_MOMENTS);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const u = { id: 'me', name: 'Alex', premium: true, preferences: ['cocktails', 'rooftop'] };
    setUser(u);
  }, []);

  const recommendedVenues = useMemo(() => {
    if (!user) return venues;
    return venues.map(v => ({
      ...v,
      matchScore: v.tags.filter(t => user.preferences.includes(t)).length * 30 + Math.random() * 20
    })).sort((a, b) => b.matchScore - a.matchScore);
  }, [venues, user]);

  return (
    <AppContext.Provider value={{ 
      venues, recommendedVenues, moments, user, 
      activeTab, setActiveTab, selectedVenue, setSelectedVenue
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useStore = () => useContext(AppContext);

// ==========================================
// 4. UI COMPONENTS
// ==========================================

const Avatar = ({ src, fallback, size = "w-10 h-10", online }) => (
  <div className={`relative rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-pink-500 ${size}`}>
    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
      <img 
        src={src || `https://api.dicebear.com/7.x/initials/svg?seed=${fallback}`} 
        alt="" 
        className="w-full h-full object-cover" 
      />
    </div>
    {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-gray-800 text-gray-300",
    verified: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    high: "bg-green-500/10 text-green-400 border border-green-500/20",
    moderate: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    low: "bg-red-500/10 text-red-400 border border-red-500/20",
    packed: "bg-red-500/10 text-red-400 border border-red-500/20"
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

// ==========================================
// 5. MAP VIEW
// ==========================================

const MapView = () => {
  const { venues, selectedVenue, setSelectedVenue } = useStore();
  const { transform, handlers, reset } = useMapGestures();
  const { location } = useGeolocation();
  const containerRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCenter({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  const project = (lat, lng) => ({
    x: (lng - location.lng) * 4000, 
    y: -(lat - location.lat) * 4000
  });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 bg-[#09090b] overflow-hidden cursor-grab active:cursor-grabbing touch-none" 
      {...handlers}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-[-100%] opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#222 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` 
        }} 
      />
      
      {/* Map Content Layer */}
      <div 
        className="absolute pointer-events-none transition-transform duration-75"
        style={{ 
          left: center.x,
          top: center.y,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` 
        }}
      >
        {/* User Location Pulse */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 relative border-2 border-white" />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
        </div>

        {/* Venue Markers */}
        {venues.map(v => {
          const pos = project(v.lat, v.lng);
          const isSelected = selectedVenue?.id === v.id;
          
          return (
            <button
              key={v.id}
              onClick={(e) => { e.stopPropagation(); setSelectedVenue(v); }}
              className={`absolute pointer-events-auto transition-all duration-300 group ${isSelected ? 'z-50' : 'z-20 hover:scale-110'}`}
              style={{ 
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.25 : 1})`
              }}
            >
              <div className="flex flex-col items-center">
                <div className={`relative px-3 py-2 rounded-xl backdrop-blur-md border shadow-2xl flex items-center gap-2 transition-colors ${
                  isSelected 
                    ? 'bg-gradient-to-br from-red-600 to-pink-600 border-white/20 text-white' 
                    : 'bg-gray-900/80 border-white/10 text-gray-200 group-hover:bg-gray-800'
                }`}>
                   <span className="text-[10px] font-bold whitespace-nowrap">{v.name}</span>
                   {v.crowd > 0.8 && <Flame size={12} className={isSelected ? 'text-yellow-300' : 'text-orange-500'} />}
                </div>
                <div className="w-0.5 h-4 bg-gradient-to-b from-gray-500 to-transparent" />
                <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
              </div>
            </button>
          );
        })}
      </div>
      
      {/* HUD Controls */}
      <div className="absolute top-24 right-4 flex flex-col gap-2">
         <button 
           onClick={reset}
           className="w-10 h-10 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
         >
           <Navigation size={18} />
         </button>
         <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform">
           <Settings size={18} />
         </button>
      </div>
    </div>
  );
};

// ==========================================
// 6. MOMENTS FEED
// ==========================================

const MomentsFeed = () => {
  const { moments } = useStore();
  
  return (
    <div className="pt-28 pb-32 px-4 overflow-y-auto h-full hide-scroll bg-[#09090b]">
       {/* Story Rings */}
       <div className="flex gap-4 mb-8 overflow-x-auto hide-scroll pb-2">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center bg-gray-900 text-[#FF2E63] hover:border-[#FF2E63] transition-colors">
              <Plus size={24} />
            </button>
            <span className="text-xs text-gray-500">Add</span>
          </div>
          {moments.map(m => (
            <div key={m.id} className="flex flex-col items-center gap-2 shrink-0">
               <Avatar src={m.user.avatar} size="w-16 h-16" online={m.user.status === 'online'} />
               <span className="text-xs text-gray-300 max-w-[64px] truncate">{m.user.name}</span>
            </div>
          ))}
       </div>

       {/* Feed Items */}
       <h3 className="text-xl font-bold mb-4 px-1">Trending Moments</h3>
       <div className="grid gap-6">
         {moments.map(m => (
           <div key={m.id} className="bg-[#18181b] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Avatar src={m.user.avatar} fallback={m.user.name} />
                   <div>
                     <p className="text-sm font-bold text-white flex items-center gap-1">
                       {m.user.name}
                       {m.verified && <CheckCircle2 size={12} className="text-blue-400" />}
                     </p>
                     <p className="text-xs text-gray-500">Deep Ellum • 2m ago</p>
                   </div>
                </div>
                <button className="text-gray-400"><MoreHorizontal size={20}/></button>
              </div>
              
              <div className="aspect-[4/5] bg-gray-800 relative group cursor-pointer">
                <img src={m.content} alt="" className="w-full h-full object-cover" />
                {m.type === 'video' && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center">
                    <Volume2 size={14} className="text-white"/>
                  </div>
                )}
                {/* Quick Reactions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                   <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                         <button className="p-2 bg-white/10 rounded-full backdrop-blur hover:bg-white/20 text-white"><Heart size={20} /></button>
                         <button className="p-2 bg-white/10 rounded-full backdrop-blur hover:bg-white/20 text-white"><MessageCircle size={20} /></button>
                         <button className="p-2 bg-white/10 rounded-full backdrop-blur hover:bg-white/20 text-white"><Share2 size={20} /></button>
                      </div>
                      <button className="px-4 py-2 bg-[#FF2E63] rounded-full text-xs font-bold text-white">Join</button>
                   </div>
                </div>
              </div>

              <div className="p-4 pt-3">
                 <p className="text-sm text-gray-300"><span className="font-bold text-white">@alex_k</span> The vibes here are immaculate tonight! 🔥</p>
                 <button className="text-xs text-gray-500 mt-2">View all 12 comments</button>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
};

// ==========================================
// 7. VENUE SHEET
// ==========================================

const VenueSheet = () => {
  const { selectedVenue, setSelectedVenue } = useStore();
  
  if (!selectedVenue) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={() => setSelectedVenue(null)}
      />
      <div className="bg-[#121212] border-t border-white/10 rounded-t-[40px] p-6 pb-24 pointer-events-auto animate-slide-up max-h-[85vh] overflow-y-auto">
         {/* Drag Handle */}
         <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-8" />
         
         {/* Header */}
         <div className="flex justify-between items-start mb-6">
           <div>
             <div className="flex gap-2 mb-2">
               {selectedVenue.matchScore > 80 && (
                 <Badge variant="high"><Sparkles size={10} className="mr-1 inline"/> 98% Match</Badge>
               )}
               <Badge variant={selectedVenue.safety}>Safety: {selectedVenue.safety}</Badge>
             </div>
             <h2 className="text-3xl font-bold leading-none mb-2">{selectedVenue.name}</h2>
             <p className="text-gray-400 text-sm">{selectedVenue.type} • {selectedVenue.district} • 0.3mi</p>
           </div>
           
           <div className="flex flex-col items-center gap-1">
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border border-white/5 shadow-lg ${
               selectedVenue.crowd > 0.8 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
             }`}>
               {Math.round(selectedVenue.crowd * 100)}%
             </div>
             <span className="text-[10px] text-gray-500 uppercase font-bold">Cap</span>
           </div>
         </div>

         {/* Actions */}
         <div className="grid grid-cols-2 gap-3 mb-8">
            <button className="py-4 bg-[#FF2E63] rounded-2xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-95 transition-transform">
              <Ticket size={18} /> Guest List
            </button>
            <button className="py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <UserPlus size={18} /> Invite Crew
            </button>
         </div>

         {/* Friends Here */}
         <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-300">Friends Here (3)</h3>
              <button className="text-xs text-[#FF2E63]">View</button>
            </div>
            <div className="flex items-center gap-3">
               <Avatar fallback="JD" />
               <Avatar fallback="MK" />
               <Avatar fallback="AL" />
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">+2</div>
            </div>
         </div>

         {/* Live Cam Preview */}
         <div className="relative h-40 rounded-2xl overflow-hidden mb-6 group cursor-pointer">
            <img src={selectedVenue.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
               <button className="px-4 py-2 bg-black/60 backdrop-blur rounded-full flex items-center gap-2 border border-white/20 text-white">
                 <Camera size={16} /> Tap to View Live
               </button>
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1 items-center">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-bold">LIVE FEED</span>
            </div>
         </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. MAIN LAYOUT
// ==========================================

const AppContent = () => {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="h-full w-full bg-[#09090b] text-white font-sans overflow-hidden relative">
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 pt-12 flex justify-between items-start pointer-events-none">
         <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for vibes..." 
              className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-gray-500" 
            />
         </div>
         <div className="pointer-events-auto flex gap-3">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center relative">
               <Bell size={18} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF2E63] rounded-full border border-black" />
            </button>
            <Avatar fallback="ME" online />
         </div>
      </div>

      {/* Main Viewport */}
      <main className="absolute inset-0 z-0">
         <div className={`w-full h-full transition-opacity duration-300 ${activeTab === 'map' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <MapView />
         </div>
         {activeTab === 'discover' && (
            <div className="absolute inset-0 z-20 animate-fade">
               <MomentsFeed />
            </div>
         )}
         {activeTab === 'events' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
               <p className="text-gray-500">Events coming soon</p>
            </div>
         )}
         {activeTab === 'social' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
               <p className="text-gray-500">Social coming soon</p>
            </div>
         )}
      </main>

      {/* Detail Overlay */}
      <VenueSheet />

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-[320px]">
        <nav className="mx-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 flex justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
           {[
             { id: 'map', icon: MapIcon, label: 'Map' },
             { id: 'discover', icon: Sparkles, label: 'For You' },
             { id: 'events', icon: Ticket, label: 'Events' },
             { id: 'social', icon: Users, label: 'Social' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`relative w-16 h-12 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                 activeTab === tab.id 
                   ? 'bg-[#FF2E63] text-white shadow-lg shadow-red-500/20 -translate-y-1' 
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
               }`}
             >
               <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
               {activeTab === tab.id && <span className="text-[9px] font-bold leading-none">{tab.label}</span>}
             </button>
           ))}
        </nav>
      </div>
    </div>
  );
};

// ==========================================
// 9. APP EXPORT
// ==========================================

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
