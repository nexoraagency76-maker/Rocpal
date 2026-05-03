import React from 'react';
import { Calculator } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const LandingPage = ({ onSelectMode }) => (
  <div className="min-h-[calc(100vh-80px)] bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/10 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[100px]"></div>

    <div className="relative z-10 w-full max-w-4xl">
      <div className="text-center mb-16">
        <img
          src={logoUrl}
          alt="Rocpal Logo"
          className="h-40 object-contain mx-auto mb-8"
          style={{ clipPath: 'inset(2px 8px 2px 8px round 8px)' }}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Rocpal Kitchen &amp; Bath Studio
        </h1>
        <p className="text-lg text-zinc-400">Build your custom quote in minutes.</p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onSelectMode('regular')}
          className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:border-gold-500/50 transition-all duration-500 text-left w-full max-w-xl"
        >
          <div className="h-64 overflow-hidden">
            <img
              src="https://lirp.cdn-website.com/7591cd42/dms3rep/multi/opt/CorporalPatterson%2810%29-1920w.jpg"
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              alt="Kitchen"
            />
          </div>
          <div className="p-8 text-center">
            <div className="text-gold-500 mb-4 flex justify-center">
              <Calculator size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Start Your Quote</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Custom cabinets, surfaces, hardware, vanities, built-ins, and complete millwork calculations.
            </p>
            <div className="mt-6 inline-block bg-gold-500 text-black font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-wider">
              Begin Quoting
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default LandingPage;
