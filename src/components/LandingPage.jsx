import React from 'react';
import { Calculator, Hammer, Ruler } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Decorative Wood Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-wood-700 via-wood-400 to-wood-600"></div>
      
      <div className="glass-panel p-12 md:p-16 rounded-2xl max-w-3xl w-full text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-900 p-4 rounded-full border border-slate-700 shadow-inner">
            <Calculator size={48} className="text-wood-400" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-wood-300 to-wood-500">Quoting</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">
          Professional cabinetry and stone surface estimations. Built for accuracy, tailored for your shop.
        </p>
        
        <button 
          onClick={onStart}
          className="btn-primary text-lg w-full md:w-auto md:px-12 py-4"
        >
          <Hammer size={20} />
          Get a Quote Now
        </button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-500">
          <div className="flex flex-col items-center">
            <Ruler size={24} className="mb-2 text-slate-400" />
            <span className="text-sm font-medium">Accurate SqFt Math</span>
          </div>
          <div className="flex flex-col items-center">
            <Hammer size={24} className="mb-2 text-slate-400" />
            <span className="text-sm font-medium">Salice Hardware</span>
          </div>
          <div className="flex flex-col items-center">
            <Calculator size={24} className="mb-2 text-slate-400" />
            <span className="text-sm font-medium">Custom Overrides</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
