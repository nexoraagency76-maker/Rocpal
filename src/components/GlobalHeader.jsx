import { Home } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const GlobalHeader = ({ mode, onHome }) => (
  <header style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(0,0,0,0.92)',
    borderBottom: '1px solid rgba(220,164,59,0.2)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

      {/* Left: logo + brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {mode !== 'landing' && (
          <button
            onClick={onHome}
            className="btn-icon"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa' }}
            title="Home"
          >
            <Home size={17} />
          </button>
        )}

        <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {/* Logo with gold ring */}
          <div style={{
            borderRadius: 14,
            padding: 2,
            background: 'linear-gradient(135deg, rgba(220,164,59,0.5), rgba(220,164,59,0.1))',
            boxShadow: '0 0 18px rgba(220,164,59,0.18)',
            flexShrink: 0,
          }}>
            <div style={{ background: '#000', borderRadius: 12, overflow: 'hidden' }}>
              <img
                src={logoUrl}
                alt="Rocpal logo"
                style={{ height: 56, width: 'auto', objectFit: 'contain', display: 'block',
                         clipPath: 'inset(2px 6px 2px 6px round 8px)' }}
              />
            </div>
          </div>

          {/* Brand text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{
              fontSize: 17, fontWeight: 800, letterSpacing: '0.02em', lineHeight: 1.2,
              background: 'linear-gradient(90deg, #fff 0%, #e8c97d 70%, #dca43b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Rocpal Kitchen &amp; Bath Studio
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(220,164,59,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
              Custom Cabinetry &amp; Millwork
            </span>
          </div>
        </button>
      </div>

      {/* Right: contact pill */}
      <a
        href="tel:9054322066"
        style={{
          display: 'none',
          alignItems: 'center', gap: 8,
          background: 'rgba(220,164,59,0.08)',
          border: '1px solid rgba(220,164,59,0.2)',
          borderRadius: 99, padding: '8px 18px',
          color: '#dca43b', fontSize: 13, fontWeight: 600,
          textDecoration: 'none', transition: 'all 0.2s',
        }}
        className="md:flex"
      >
        (905) 432-2066
      </a>
    </div>
  </header>
);

export default GlobalHeader;
