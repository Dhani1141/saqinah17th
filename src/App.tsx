import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom elegant marker for Leaflet
const customMarker = L.divIcon({
  className: 'bg-transparent',
  html: `<div class="w-6 h-6 bg-pink-300 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.8)] border-[3px] border-white animate-pulse-soft flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Component to handle the map animation
function MapAnimator() {
  const map = useMap();
  useEffect(() => {
    // Initial zoom out on Indonesia
    map.setView([-2.5, 118.0], 4);
    
    // Fly to venue after 2 seconds
    const timeout = setTimeout(() => {
      map.flyTo([-0.484000, 117.180722], 17, {
        duration: 3,
        easeLinearity: 0.25
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [map]);
  return null;
}

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    // Splash screen logic
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowMain(true), 500); // Wait for fade out
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    // Target Date: September 20, 2026, 16:30:00 WITA (UTC+8)
    const targetDate = new Date('2026-09-20T16:30:00+08:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSaveToCalendar = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Saqinah's+Sweet+17&dates=20260920T083000Z/20260920T130000Z&details=Don't+be+late!+VIP+Access+Only.&location=https://goo.gl/maps/FB5vcHYFkyEnHPQF8`;
    window.open(calUrl, '_blank');
  };

  // Render Splash Screen
  if (isLoading || !showMain) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center bg-stone-50 transition-opacity duration-700 z-50 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative flex items-center justify-center animate-bloom">
          <div className="absolute w-32 h-32 bg-pink-200/40 rounded-full blur-2xl animate-pulse-soft"></div>
          <h1 className="text-8xl font-serif text-rose-400 italic z-10 drop-shadow-sm">S</h1>
        </div>
        <p className="mt-6 font-serif text-rose-300 text-lg italic tracking-wide animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          Kamu Diundang...
        </p>
      </div>
    );
  }

  // Render Main App
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 hide-scrollbar bg-stone-50 overflow-hidden animate-fade-in-up">
      
      {/* Soft Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-100 blur-[80px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-50 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 flex flex-col gap-8 pb-12 pt-6">
        
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center mt-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 shadow-sm mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] text-pink-400 uppercase">UNDANGAN SPESIAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight uppercase leading-[1.15] text-rose-600 px-2 text-soft-glow">
            SAQINAH'S<br/>SWEET 17
          </h1>
        </header>

        {/* Live Countdown */}
        <section className="flex flex-col items-center gap-4 my-2">
          <div className="flex gap-4 sm:gap-6 w-full justify-center items-end">
            {Object.entries(timeLeft).map(([label, value]) => {
              const translatedLabel = label === 'days' ? 'Hari' : label === 'hours' ? 'Jam' : label === 'minutes' ? 'Menit' : 'Detik';
              return (
                <div key={label} className="flex flex-col items-center gap-1 group">
                  <span className="text-4xl sm:text-5xl font-serif font-medium text-rose-500 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                    {value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-gray-400 uppercase">
                    {translatedLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Save to Calendar Button */}
        <div className="pt-2 pb-2">
          <button 
            onClick={handleSaveToCalendar}
            className="w-full py-4 rounded-full font-sans font-semibold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 bg-pink-300 text-white hover:bg-pink-400 shadow-lg shadow-pink-200 active:scale-[0.98] border border-pink-200"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>SIMPAN KE KALENDER</span>
          </button>
        </div>

        {/* Event Details (Soft Cards) */}
        <section className="relative">
          <div className="soft-glass rounded-[2rem] p-7 flex flex-col gap-6 relative z-10">
            
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 border border-pink-100 group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-300 shrink-0 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-serif font-semibold text-lg text-gray-800">20 September 2026</p>
                <p className="text-sm font-medium text-gray-500">Simpan Tanggalnya</p>
              </div>
            </div>

            <div className="w-full h-px bg-pink-100" />

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 border border-rose-100 group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-300 shrink-0 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-serif font-semibold text-lg text-gray-800">16:30 WITA - Selesai</p>
                <p className="text-sm font-medium text-gray-500">Acara Utama</p>
              </div>
            </div>

            <div className="w-full h-px bg-pink-100" />

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 border border-pink-100 group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-300 shrink-0 mt-1 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-serif font-semibold text-lg text-gray-800">Lokasi Acara</p>
                <p className="text-sm font-medium text-gray-500">Detail Lokasi Terlampir</p>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="w-full h-48 mt-3 rounded-2xl overflow-hidden border border-pink-200 relative shadow-inner">
              <MapContainer 
                center={[-2.5, 118.0]} 
                zoom={4} 
                zoomControl={false} 
                scrollWheelZoom={false}
                attributionControl={false}
                style={{ height: '100%', width: '100%', zIndex: 10 }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[-0.484000, 117.180722]} icon={customMarker} />
                <MapAnimator />
              </MapContainer>
            </div>

            <a 
              href="https://goo.gl/maps/FB5vcHYFkyEnHPQF8" 
              target="_blank" 
              rel="noreferrer"
              className="mt-1 inline-flex w-full items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-pink-200 transition-all duration-300 py-3.5 px-5 rounded-full text-sm font-semibold tracking-wide text-gray-700 group shadow-sm hover:shadow-md"
            >
              <Navigation className="w-4 h-4 text-pink-400 group-hover:-rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              BUKA DI GOOGLE MAPS
            </a>

          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
