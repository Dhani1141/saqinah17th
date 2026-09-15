import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation, Ticket, CheckCircle2 } from 'lucide-react';

function App() {
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  const handleRSVP = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    setRsvpConfirmed(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 hide-scrollbar bg-[#09090b] overflow-hidden">
      
      {/* Noise Texture */}
      <div className="fixed inset-0 noise-bg z-50 mix-blend-overlay"></div>

      {/* Animated Gradient Meshes */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/30 blur-[120px] rounded-full mix-blend-screen animate-float-1 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-cyan-600/20 blur-[130px] rounded-full mix-blend-screen animate-float-2 pointer-events-none" />
      <div className="fixed top-[40%] left-[30%] w-[40vw] h-[40vw] bg-purple-700/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none" />

      {/* Marquee Background Tape */}
      <div className="fixed top-[15%] left-0 w-[200vw] rotate-[-5deg] overflow-hidden whitespace-nowrap opacity-10 pointer-events-none z-0">
        <div className="animate-marquee inline-block text-6xl md:text-8xl font-syne font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px #d946ef' }}>
          VIP ACCESS ONLY • VIP ACCESS ONLY • VIP ACCESS ONLY • VIP ACCESS ONLY • VIP ACCESS ONLY • 
        </div>
      </div>

      <div className="fixed bottom-[20%] left-[-10vw] w-[200vw] rotate-[3deg] overflow-hidden whitespace-nowrap opacity-5 pointer-events-none z-0">
        <div className="animate-marquee inline-block text-6xl md:text-8xl font-syne font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px #06b6d4', animationDirection: 'reverse' }}>
          SAQINAH SWEET 17 • SAQINAH SWEET 17 • SAQINAH SWEET 17 • SAQINAH SWEET 17 • 
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 flex flex-col gap-8 pb-12 pt-8">
        
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center mt-6 mb-2">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full glass-extreme mb-6 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-300">GUEST PASS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-syne font-black tracking-tight uppercase leading-[1.1] text-glow bg-gradient-to-br from-white via-fuchsia-200 to-fuchsia-500 bg-clip-text text-transparent px-2">
            SAQINAH'S<br/>SWEET 17
          </h1>
        </header>

        {/* Live Countdown (No Stiff Boxes) */}
        <section className="flex flex-col items-center gap-6 my-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-900/10 to-transparent blur-xl -z-10"></div>
          
          <div className="flex gap-4 sm:gap-6 w-full justify-center items-end">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center gap-2 group cursor-default">
                <span className="text-5xl sm:text-6xl font-syne font-bold number-glow text-white group-hover:scale-110 transition-transform duration-300">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-fuchsia-400/80 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Event Details (Overlapping Glass Panels) */}
        <section className="relative">
          {/* Decorative element behind */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl opacity-50 rounded-[3rem]"></div>
          
          <div className="glass-extreme rounded-[2rem] p-7 flex flex-col gap-6 relative z-10 hover:border-cyan-400/50 transition-colors duration-500">
            
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/30 group-hover:scale-110 group-hover:bg-fuchsia-500/20 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all duration-300 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-syne font-bold text-lg text-white">September 20, 2026</p>
                <p className="text-sm font-medium text-white/50">Save the Date</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-syne font-bold text-lg text-white">16:30 WITA - Drop</p>
                <p className="text-sm font-medium text-white/50">Main Event</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/30 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 shrink-0 mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-syne font-bold text-lg text-white">Secret Venue</p>
                <p className="text-sm font-medium text-white/50 mb-4">Location Revealed to VIPs</p>
                
                <a 
                  href="https://maps.app.goo.gl/E2p3D1QiZB93nqkJ6" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300 py-2.5 px-5 rounded-full text-sm font-bold tracking-wide text-white group-hover:border-purple-400/50 shadow-lg"
                >
                  <Navigation className="w-4 h-4 text-purple-400 group-hover:-rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  OPEN IN MAPS
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Button */}
        <div className="pt-6 pb-10">
          <button 
            onClick={handleRSVP}
            disabled={rsvpConfirmed}
            className={`relative w-full py-5 rounded-[2rem] font-syne font-bold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden ${
              rsvpConfirmed 
                ? 'bg-[#052e16]/80 text-[#4ade80] border border-[#22c55e]/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                : 'bg-white/10 text-white border border-fuchsia-500/50 hover:bg-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:shadow-[0_0_40px_rgba(217,70,239,0.5)] active:scale-[0.97]'
            }`}
          >
            {/* Glowing effect inside button */}
            {!rsvpConfirmed && (
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/0 via-fuchsia-500/30 to-fuchsia-600/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
            )}

            {rsvpConfirmed ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,1)] scale-125 transition-transform" />
                <span className="drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">SEAT CONFIRMED</span>
              </>
            ) : (
              <>
                <Ticket className="w-6 h-6 text-fuchsia-300" />
                <span>CONFIRM ATTENDANCE</span>
              </>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
