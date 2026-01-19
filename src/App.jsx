import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';
import { 
  Map as MapIcon, Users, Navigation, Share2, 
  Sparkles, Flame, Camera, Ticket, Plus, 
  Search, CheckCircle2, Heart, MessageCircle, 
  Settings, Bell, MoreHorizontal, UserPlus, Volume2
} from 'lucide-react';

const generateUser = (id) => ({
  id,
  name: `User ${id.substr(0,4)}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
  status: Math.random() > 0.5 ? 'online' : 'offline',
});

const VENUES = [
  { id: 'v1', name: 'Happiest Hour', type: 'Rooftop', district: 'Victory Park', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', crowd: 0.9, safety: 'high', lat: 32.7905, lng: -96.8103, tags: ['cocktails', 'view', 'trendy'] },
  { id: 'v2', name: 'The Rustic', type: 'Live Music', district: 'Uptown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', crowd: 0.6, safety: 'high', lat: 32.8034, lng: -96.7996, tags: ['live music', 'outdoor', 'beer'] },
  { id: 'v3', name: 'Stirr', type: 'Sports Bar', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', crowd: 0.8, safety: 'moderate', lat: 32.7844, lng: -96.7816, tags: ['sports', 'food', 'party'] },
  { id: 'v4', name: 'Bottled Blonde', type: 'Club', district: 'Deep Ellum', image: 'https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80', crowd: 0.95, safety: 'low', lat: 32.7850, lng: -96.7820, tags: ['club', 'pizza', 'loud'] },
  { id: 'v5', name: 'Katy Trail Ice House', type: 'Beer Garden', district: 'Uptown', image: 'https://images.unsplash.com/photo-1582234031666-41f237f37299?w=800&q=80', crowd: 0.4, safety: 'high', lat: 32.7990, lng: -96.8050, tags: ['chill', 'patio', 'beer'] },
];

const MOMENTS = [
  { id: 'm1', user: generateUser('u1'), type: 'video', verified: false, likes: 24, content: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=60' },
  { id: 'm2', user: generateUser('u2'), type: 'photo', verified: true, likes: 156, content: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=400&q=60' },
  { id: 'm3', user: generateUser('u3'), type: 'photo', verified: false, likes: 8, content: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=60' },
];

const CENTER = { lat: 32.7767, lng: -96.7970 };
const ACCENT = '#FF2E63';

const useMapGestures = () => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    setTransform(prev => ({
      ...prev,
      x: prev.x + e.clientX - lastPos.current.x,
      y: prev.y + e.clientY - lastPos.current.y
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const reset = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  return { transform, reset, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp } };
};

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [user] = useState({ id: 'me', name: 'Alex', preferences: ['cocktails', 'rooftop'] });

  const venues = useMemo(() => {
    return VENUES.map(v => ({
      ...v,
      matchScore: v.tags.filter(t => user.preferences.includes(t)).length * 30 + Math.random() * 20
    })).sort((a, b) => b.matchScore - a.matchScore);
  }, [user]);

  return (
    <AppContext.Provider value={{ venues, moments: MOMENTS, user, activeTab, setActiveTab, selectedVenue, setSelectedVenue }}>
      {children}
    </AppContext.Provider>
  );
};

const useStore = () => useContext(AppContext);

const Avatar = ({ src, fallback, size = 40, online }) => (
  <div 
    className="relative rounded-full p-0.5 shrink-0"
    style={{ 
      width: size + 4, 
      height: size + 4,
      background: 'linear-gradient(to top right, #a855f7, #ec4899)'
    }}
  >
    <div className="w-full h-full rounded-full bg-black overflow-hidden">
      <img 
        src={src || `https://api.dicebear.com/7.x/initials/svg?seed=${fallback}`} 
        alt="" 
        className="w-full h-full object-cover" 
      />
    </div>
    {online && (
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
    )}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: { background: '#1f2937', color: '#d1d5db' },
    high: { background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' },
    moderate: { background: 'rgba(234,179,8,0.1)', color: '#facc15', border: '1px solid rgba(234,179,8,0.2)' },
    low: { background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }
  };
  return (
    <span 
      className="px-2 py-0.5 rounded text-xs font-bold uppercase"
      style={styles[variant] || styles.default}
    >
      {children}
    </span>
  );
};

const MapView = () => {
  const { venues, selectedVenue, setSelectedVenue } = useStore();
  const { transform, handlers, reset } = useMapGestures();
  const containerRef = useRef(null);
  const [center, setCenter] = useState({ x: 200, y: 300 });

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
    x: (lng - CENTER.lng) * 4000,
    y: -(lat - CENTER.lat) * 4000
  });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing touch-none"
      style={{ background: '#09090b' }}
      {...handlers}
    >
      <div 
        className="absolute opacity-30 pointer-events-none"
        style={{ 
          inset: '-100%',
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translate(${transform.x}px, ${transform.y}px)`
        }} 
      />
      
      <div 
        className="absolute pointer-events-none"
        style={{ 
          left: center.x,
          top: center.y,
          transform: `translate(${transform.x}px, ${transform.y}px)`
        }}
      >
        <div className="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" style={{ boxShadow: '0 0 20px rgba(59,130,246,0.5)' }} />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40" />
        </div>

        {venues.map(v => {
          const pos = project(v.lat, v.lng);
          const isSelected = selectedVenue?.id === v.id;
          
          return (
            <button
              key={v.id}
              onClick={(e) => { e.stopPropagation(); setSelectedVenue(v); }}
              className="absolute pointer-events-auto transition-transform duration-300"
              style={{ 
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.2 : 1})`,
                zIndex: isSelected ? 50 : 20
              }}
            >
              <div className="flex flex-col items-center">
                <div 
                  className="px-3 py-2 rounded-xl border flex items-center gap-2 shadow-xl"
                  style={{
                    background: isSelected ? 'linear-gradient(to bottom right, #dc2626, #db2777)' : 'rgba(17,17,17,0.9)',
                    borderColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    color: isSelected ? 'white' : '#e5e5e5'
                  }}
                >
                  <span className="text-xs font-bold whitespace-nowrap">{v.name}</span>
                  {v.crowd > 0.8 && <Flame size={12} className={isSelected ? 'text-yellow-300' : 'text-orange-500'} />}
                </div>
                <div className="w-0.5 h-4 bg-gray-600" />
                <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute top-24 right-4 flex flex-col gap-2">
        <button 
          onClick={reset}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/10"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <Navigation size={18} />
        </button>
        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/10"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

const MomentsFeed = () => {
  const { moments } = useStore();
  
  return (
    <div className="pt-28 pb-32 px-4 overflow-y-auto h-full" style={{ background: '#09090b' }}>
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <button 
            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center"
            style={{ background: '#1f2937', color: ACCENT }}
          >
            <Plus size={24} />
          </button>
          <span className="text-xs text-gray-500">Add</span>
        </div>
        {moments.map(m => (
          <div key={m.id} className="flex flex-col items-center gap-2 shrink-0">
            <Avatar src={m.user.avatar} size={56} online={m.user.status === 'online'} />
            <span className="text-xs text-gray-300 max-w-16 truncate">{m.user.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4 px-1 text-white">Trending Moments</h3>
      
      <div className="grid gap-6">
        {moments.map(m => (
          <div key={m.id} className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl" style={{ background: '#18181b' }}>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={m.user.avatar} size={36} />
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
            
            <div className="aspect-square bg-gray-800 relative">
              <img src={m.content} alt="" className="w-full h-full object-cover" />
              {m.type === 'video' && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                  <Volume2 size={14} className="text-white"/>
                </div>
              )}
            </div>

            <div className="p-4 pt-3">
              <div className="flex gap-4 mb-3">
                <button className="text-white"><Heart size={24} /></button>
                <button className="text-white"><MessageCircle size={24} /></button>
                <button className="text-white"><Share2 size={24} /></button>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{m.likes} likes</p>
              <p className="text-sm text-gray-300">
                <span className="font-bold text-white">@{m.user.name}</span> The vibes here are immaculate! 🔥
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VenueSheet = () => {
  const { selectedVenue, setSelectedVenue } = useStore();
  
  if (!selectedVenue) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/60 pointer-events-auto"
        onClick={() => setSelectedVenue(null)}
      />
      <div 
        className="border-t border-white/10 rounded-t-3xl p-6 pb-28 pointer-events-auto max-h-[85vh] overflow-y-auto"
        style={{ background: '#121212' }}
      >
        <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex gap-2 mb-2">
              <Badge variant="high">
                <Sparkles size={10} className="mr-1 inline"/> {Math.round(selectedVenue.matchScore)}% Match
              </Badge>
              <Badge variant={selectedVenue.safety}>Safety: {selectedVenue.safety}</Badge>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{selectedVenue.name}</h2>
            <p className="text-gray-400 text-sm">{selectedVenue.type} • {selectedVenue.district}</p>
          </div>
          
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
            style={{
              background: selectedVenue.crowd > 0.8 ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
              color: selectedVenue.crowd > 0.8 ? '#f87171' : '#4ade80'
            }}
          >
            {Math.round(selectedVenue.crowd * 100)}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            className="py-4 rounded-2xl font-bold text-sm uppercase flex items-center justify-center gap-2 text-white"
            style={{ background: ACCENT }}
          >
            <Ticket size={18} /> Guest List
          </button>
          <button className="py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm uppercase flex items-center justify-center gap-2 text-white">
            <UserPlus size={18} /> Invite
          </button>
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden">
          <img src={selectedVenue.image} alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="px-4 py-2 bg-black/60 rounded-full flex items-center gap-2 text-white text-sm border border-white/20">
              <Camera size={16} /> View Live
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { activeTab, setActiveTab } = useStore();

  const tabs = [
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'discover', icon: Sparkles, label: 'For You' },
    { id: 'events', icon: Ticket, label: 'Events' },
    { id: 'social', icon: Users, label: 'Social' }
  ];

  return (
    <div className="h-screen w-screen text-white overflow-hidden relative" style={{ background: '#09090b' }}>
      
      <div className="absolute top-0 left-0 right-0 z-40 p-4 pt-10 flex justify-between items-center pointer-events-none">
        <div 
          className="pointer-events-auto rounded-full px-4 py-2 flex items-center gap-2 border border-white/10"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-24 text-white placeholder-gray-500" 
          />
        </div>
        <div className="pointer-events-auto flex gap-2">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center relative border border-white/10"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: ACCENT }} />
          </button>
          <Avatar fallback="ME" size={36} online />
        </div>
      </div>

      <main className="absolute inset-0">
        {activeTab === 'map' && <MapView />}
        {activeTab === 'discover' && <MomentsFeed />}
        {activeTab === 'events' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Events coming soon</p>
          </div>
        )}
        {activeTab === 'social' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Social coming soon</p>
          </div>
        )}
      </main>

      <VenueSheet />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4">
        <nav 
          className="rounded-full p-1.5 flex justify-between border border-white/10"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-14 h-11 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all"
                style={{
                  background: isActive ? ACCENT : 'transparent',
                  color: isActive ? 'white' : '#9ca3af',
                  transform: isActive ? 'translateY(-4px)' : 'none'
                }}
              >
                <Icon size={20} />
                {isActive && <span className="text-xs font-bold">{tab.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
