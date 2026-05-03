import { ArrowRight, Phone, MapPin } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const HERO = 'https://lirp.cdn-website.com/7591cd42/dms3rep/multi/opt/Dadson%2811%29-1920w.jpg';

const LandingPage = ({ onSelectMode }) => (
  <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>

    {/* ── Hero ── */}
    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${HERO})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.28)',
      }} />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '48px 24px', maxWidth: 720, width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            borderRadius: 20, padding: 3,
            background: 'linear-gradient(135deg, rgba(220,164,59,0.55), rgba(220,164,59,0.1))',
            boxShadow: '0 0 40px rgba(220,164,59,0.25)',
          }}>
            <div style={{ background: 'rgba(0,0,0,0.85)', borderRadius: 18, overflow: 'hidden' }}>
              <img src={logoUrl} alt="Rocpal" style={{ height: 120, width: 'auto', objectFit: 'contain', display: 'block', clipPath: 'inset(2px 8px 2px 8px round 12px)' }} />
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, #dca43b)' }} />
          <span style={{ color: '#dca43b', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Est. Oshawa, ON</span>
          <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, #dca43b, transparent)' }} />
        </div>

        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 8px' }}>
          Rocpal Custom Cabinets
        </h1>
        <p style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 300, color: 'rgba(220,164,59,0.85)', letterSpacing: '0.06em', margin: '0 0 16px' }}>
          Refining the Art of Cabinetry
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 480, margin: '0 auto 40px' }}>
          Build a detailed materials quote for your kitchen, bath, built-ins, wine room, or millwork project — in minutes.
        </p>

        {/* CTA */}
        <button
          onClick={() => onSelectMode('regular')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#dca43b', color: '#000',
            fontWeight: 800, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '16px 40px', borderRadius: 14, border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(220,164,59,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e8c97d'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#dca43b'; e.currentTarget.style.transform = 'none'; }}
        >
          Start Your Quote <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* ── Bottom info bar ── */}
    <div style={{ background: 'rgba(0,0,0,0.9)', borderTop: '1px solid rgba(220,164,59,0.15)', padding: '18px 24px' }}>
      <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <a href="tel:9054322066" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
          <Phone size={14} color="#dca43b" /> (905) 432-2066
        </a>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <a href="mailto:info@rocpal.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
          info@rocpal.com
        </a>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
          <MapPin size={13} color="#dca43b" /> 223 King St W, Oshawa, ON
        </span>
      </div>
    </div>
  </div>
);

export default LandingPage;
