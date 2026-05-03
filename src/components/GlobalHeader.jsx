import React from 'react';
import { Home, Globe } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const GlobalHeader = ({ mode, onHome }) => (
  <header className="bg-black border-b border-zinc-800 sticky top-0 z-40 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {mode !== 'landing' && (
          <button onClick={onHome} className="text-zinc-400 hover:text-white transition-colors bg-zinc-900 p-2 rounded-xl">
            <Home size={20} />
          </button>
        )}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onHome}>
          <div className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-black p-1 shadow-sm transition-transform group-hover:scale-105">
            <img
              src={logoUrl}
              alt="Rocpal Kitchen & Bath Studio Logo"
              className="h-16 w-auto object-contain"
              style={{ clipPath: 'inset(2px 8px 2px 8px round 8px)' }}
            />
          </div>
          <div className="hidden sm:flex flex-col border-l border-zinc-800 pl-4 py-1">
            <h1 className="text-xl font-extrabold text-white leading-tight tracking-wide">
              Rocpal Kitchen &amp; Bath Studio
            </h1>
            <div className="flex items-center gap-1.5 text-xs font-semibold mt-0.5 text-gold-500">
              <Globe size={12} />
              Custom Cabinetry &amp; Millwork
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default GlobalHeader;
