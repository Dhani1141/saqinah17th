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

  // Calculate target date: Replace with actual birthday date, using an example next month
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14); // e.g. 14 days from now
    targetDate.setHours(19, 0, 0, 0);

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
      navigator.vibrate([50]);
    }
    setRsvpConfirmed(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 hide-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black">
      {/* Background ambient light */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container - Mobile First Max-W */}
      <div className="w-full max-w-md relative z-10 flex flex-col gap-6 animate-in fade-in zoom-in duration-700">
        
        {/* VIP Pass Header */}
        <header className="glass-neon rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse" />
          
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full glass mb-4 border-purple-500/50">
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">VIP Access</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent mb-2">
            YOU'RE INVITED
          </h1>
          <p className="text-neutral-400 font-medium tracking-wide">
            ALEX'S 17TH BIRTHDAY
          </p>
        </header>

        {/* Countdown */}
        <section className="glass rounded-3xl p-6 flex flex-col items-center gap-4">
          <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Countdown to Party</h2>
          
          <div className="flex gap-4 w-full justify-center">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-mono font-bold text-blue-100">{value.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Details & Location */}
        <section className="glass rounded-3xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4 text-neutral-300">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Saturday, Oct 28</p>
              <p className="text-sm text-neutral-400">Save the Date</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          <div className="flex items-center gap-4 text-neutral-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">7:00 PM - Late</p>
              <p className="text-sm text-neutral-400">Don't be late</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          <div className="flex items-start gap-4 text-neutral-300">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shrink-0 mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">The Grand Venue</p>
              <p className="text-sm text-neutral-400 mb-3">123 Party Avenue, Jakarta</p>
              
              <a 
                href="https://maps.app.goo.gl/E2p3D1QiZB93nqkJ6" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-colors py-3 px-4 rounded-xl text-sm font-semibold text-white group"
              >
                <Navigation className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
                Open in Maps
              </a>
            </div>
          </div>
        </section>

        {/* RSVP Button */}
        <div className="pt-2">
          <button 
            onClick={handleRSVP}
            disabled={rsvpConfirmed}
            className={`w-full py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
              rsvpConfirmed 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border border-white/20 active:scale-[0.98]'
            }`}
          >
            {rsvpConfirmed ? (
              <>
                <CheckCircle2 className="w-6 h-6 animate-in zoom-in" />
                SEAT CONFIRMED
              </>
            ) : (
              <>
                <Ticket className="w-6 h-6" />
                CONFIRM ATTENDANCE
              </>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
