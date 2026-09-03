import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Accessibility, Eye, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-display text-lg">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span>CivicFlow</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            An academic civic-technology 3D platform connecting residents and local governance through transparent proposal tracking.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-max border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy-First Governance</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Explore & Participate</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/explore" className="hover:text-blue-400 transition-colors">Browse All Proposals</Link></li>
            <li><Link to="/suggest" className="hover:text-blue-400 transition-colors">Submit New Idea</Link></li>
            <li><Link to="/insights" className="hover:text-blue-400 transition-colors">Community Analytics</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Resident Dashboard</Link></li>
          </ul>
        </div>

        {/* Governance & Process */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Trust & Process</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">Lifecycle Timeline Explanation</Link></li>
            <li><Link to="/about#privacy" className="hover:text-blue-400 transition-colors">Data & Location Privacy</Link></li>
            <li><Link to="/about#accessibility" className="hover:text-blue-400 transition-colors">2D / WebGL Fallback Mode</Link></li>
            <li><Link to="/staff" className="hover:text-blue-400 transition-colors">Staff Triage Portal</Link></li>
          </ul>
        </div>

        {/* Academic Notice */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">3D & Accessibility</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built with React, Three.js, React Three Fiber, GSAP, and Supabase. Supports full keyboard navigation and reduced-motion standards.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-xs"><Accessibility className="w-3.5 h-3.5 text-blue-400" /> WCAG AA</span>
            <span className="flex items-center gap-1 text-xs"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> R3F WebGL</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 CivicFlow — Academic Civic Technology Project.</div>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-slate-400">Terms of Transparency</Link>
          <span>•</span>
          <Link to="/about" className="hover:text-slate-400">Privacy Safe</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
