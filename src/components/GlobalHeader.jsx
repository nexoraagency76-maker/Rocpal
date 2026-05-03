import { Home, Globe } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const GlobalHeader = ({ mode, onHome }) => (
  <header className="sticky top-0 z-40" style={{
    background: 'linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(0,0,0,0.95) 100%)',
    borderBottom: '1px solid rgba(220,164,59,0.15)',
    boxShadow: '0 4px 40px -4px rgba(0,0,0,0.8), 0 1px 0 rgba(220,164,59,0.1)',
    backdropFilter: 'blur(20px)',
  }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
      <div className="flex items-center gap-5">
        {mode !== 'landing' && (
          <button
            onClick={onHome}
            className="text-zinc-400 hover:text-gold-400 transition-colors bg-zinc-900/80 border border-zinc-800 hover:border-gold-500/40 p-2.5 rounded-xl"
          >
            <Home size={18} />
          </button>
        )}

        <div className="flex items-center gap-4 cursor-pointer group" onClick={onHome}>
          {/* Logo box with gold glow */}
          <div
            className="relative flex-shrink-0 transition-all duration-300 group-hover:scale-105"
            style={{
              borderRadius: '14px',
              padding: '3px',
              background: 'linear-gradient(135deg, rgba(220,164,59,0.4), rgba(220,164,59,0.05))',
              boxShadow: '0 0 20px rgba(220,164,59,0.15)',
            }}
          >
            <div className="bg-black rounded-xl overflow-hidden">
              <img
                src={logoUrl}
                alt="Rocpal Kitchen & Bath Studio Logo"
                className="h-16 w-auto object-contain"
                style={{ clipPath: 'inset(2px 6px 2px 6px round 8px)' }}
              />
            </div>
          </div>

          {/* Brand text */}
          <div className="hidden sm:flex flex-col">
            <div
              className="text-xl font-extrabold leading-tight tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e8c97d 60%, #dca43b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Rocpal Kitchen &amp; Bath Studio
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-px flex-1 max-w-[200px]" style={{
                background: 'linear-gradient(90deg, rgba(220,164,59,0.6), transparent)',
              }} />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gold-500/80 mt-0.5 tracking-widest uppercase">
              <Globe size={10} />
              Custom Cabinetry &amp; Millwork
            </div>
          </div>
        </div>
      </div>

      {/* Right side accent */}
      <div className="hidden md:flex items-center gap-2 text-zinc-600 text-xs tracking-widest uppercase">
        <div className="w-1 h-1 rounded-full bg-gold-500/50" />
        <span>Oshawa, ON</span>
        <div className="w-1 h-1 rounded-full bg-gold-500/50" />
      </div>
    </div>
  </header>
);

export default GlobalHeader;
