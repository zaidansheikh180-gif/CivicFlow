import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Accessibility, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 z-10">
      
      {/* Page Title */}
      <div className="glass-panel p-8 space-y-3 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>Academic Civic Technology Research</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
          About CivicFlow
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Digital Suggestion Box for Local Governance — turning static forms into a living, transparent 3D civic space.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Privacy & Trust Model</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            CivicFlow protects resident identity. Home addresses are never requested or displayed; location pins are generalized to safe neighborhood nodes. Contact preferences remain strictly confidential to authorized staff.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Accessibility className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Accessibility & 2D Fallback</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built DOM-first to ensure full keyboard navigation, screen reader compatibility, and WCAG AA contrast standards. Respects system <code className="text-cyan-300">prefers-reduced-motion</code> preferences and provides a seamless 2D presentation when WebGL is unavailable.
          </p>
        </div>
      </div>

      {/* Tech Stack Details */}
      <div className="glass-panel p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span>Technology Architecture</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-white block mb-0.5">Frontend</span>
            <span className="text-slate-400">React 18 + TypeScript + Vite</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-white block mb-0.5">3D Layer</span>
            <span className="text-slate-400">Three.js + React Three Fiber</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-white block mb-0.5">Animations</span>
            <span className="text-slate-400">GSAP + CSS Tokens</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-white block mb-0.5">Backend & Auth</span>
            <span className="text-slate-400">Supabase RLS & PostgreSQL</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
