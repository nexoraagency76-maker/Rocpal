import { memo } from 'react';

const stars = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  top: `${(Math.sin(i * 9301 + 49297) * 0.5 + 0.5) * 100}%`,
  left: `${(Math.sin(i * 2333 + 1234) * 0.5 + 0.5) * 100}%`,
  size: i % 12 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
  opacity: 0.2 + (Math.sin(i * 7919) * 0.5 + 0.5) * 0.6,
  duration: `${3 + (Math.sin(i * 6271) * 0.5 + 0.5) * 5}s`,
  delay: `${(Math.sin(i * 3571) * 0.5 + 0.5) * 6}s`,
}));

const StarBackground = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
    {stars.map(s => (
      <div
        key={s.id}
        className="absolute rounded-full bg-white star-twinkle"
        style={{
          top: s.top,
          left: s.left,
          width: `${s.size}px`,
          height: `${s.size}px`,
          opacity: s.opacity,
          animationDuration: s.duration,
          animationDelay: s.delay,
        }}
      />
    ))}
    {/* Subtle gold nebula glows */}
    <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-gold-500/[0.03] rounded-full blur-[120px]" />
    <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-gold-500/[0.02] rounded-full blur-[100px]" />
    <div className="absolute top-[50%] left-[60%] w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[120px]" />
  </div>
));

export default StarBackground;
