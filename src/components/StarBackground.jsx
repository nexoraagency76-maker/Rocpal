import { memo } from 'react';

// Deterministic pseudo-random positions using sine — stable across renders
const STARS = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  top:  ((Math.sin(i * 9301 + 49297) * 0.5 + 0.5) * 100).toFixed(3) + '%',
  left: ((Math.sin(i * 2333 + 1234)  * 0.5 + 0.5) * 100).toFixed(3) + '%',
  size: i % 15 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
  dur:  (3 + (Math.sin(i * 6271) * 0.5 + 0.5) * 5).toFixed(2) + 's',
  delay: ((Math.sin(i * 3571) * 0.5 + 0.5) * 6).toFixed(2) + 's',
  opacity: (0.25 + (Math.sin(i * 7919) * 0.5 + 0.5) * 0.65).toFixed(2),
}));

const StarBackground = memo(() => (
  // z-index: -1 keeps stars permanently behind ALL page content
  <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000', overflow: 'hidden', pointerEvents: 'none' }}>
    {STARS.map(s => (
      <div
        key={s.id}
        className="star"
        style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: '#fff',
          opacity: s.opacity,
          '--dur': s.dur,
          '--delay': s.delay,
        }}
      />
    ))}
    {/* Gold nebula glows */}
    <div style={{ position:'absolute', top:'5%',  left:'15%',  width:700, height:700, background:'radial-gradient(circle, rgba(220,164,59,0.06) 0%, transparent 70%)', borderRadius:'50%' }} />
    <div style={{ position:'absolute', bottom:'10%', right:'10%', width:500, height:500, background:'radial-gradient(circle, rgba(220,164,59,0.04) 0%, transparent 70%)', borderRadius:'50%' }} />
  </div>
));

export default StarBackground;
