import React from 'react';
import { Link } from 'react-router-dom';
import { SuggestionWithDetails, STATUS_CONFIG } from '../types/domain';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ThumbsUp, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  PlusCircle, 
  Layers, 
  Eye 
} from 'lucide-react';

interface LandingPageProps {
  suggestions: SuggestionWithDetails[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ suggestions }) => {
  const featuredSuggestions = suggestions.slice(0, 3);
  const totalSupports = suggestions.reduce((acc, curr) => acc + curr.support_count, 0);

  return (
    <div className="flex-1 flex flex-col">
      
      {/* Hero Civic Gateway Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center my-auto z-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Living 3D Spatial Civic Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Shape Your Municipality in <span className="text-gradient">Living 3D</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
          Share proposals, discover neighborhood priorities, and track real-time council action through a transparent, interactive civic experience.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link to="/suggest" className="btn btn-primary w-full sm:w-auto px-8 py-3 text-base shadow-lg shadow-blue-500/30">
            <PlusCircle className="w-5 h-5" />
            <span>Share an Idea</span>
          </Link>
          <Link to="/explore" className="btn btn-secondary w-full sm:w-auto px-8 py-3 text-base glass-panel">
            <Compass className="w-5 h-5 text-blue-400" />
            <span>Explore 3D Map</span>
          </Link>
        </div>

        {/* Live Impact Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="glass-panel p-4">
            <div className="text-2xl font-bold font-display text-white">{suggestions.length}</div>
            <div className="text-xs text-slate-400">Active Proposals</div>
          </div>
          <div className="glass-panel p-4">
            <div className="text-2xl font-bold font-display text-emerald-400">+{totalSupports}</div>
            <div className="text-xs text-slate-400">Community Votes</div>
          </div>
          <div className="glass-panel p-4">
            <div className="text-2xl font-bold font-display text-blue-400">100%</div>
            <div className="text-xs text-slate-400">Transparent History</div>
          </div>
          <div className="glass-panel p-4">
            <div className="text-2xl font-bold font-display text-cyan-400">WCAG AA</div>
            <div className="text-xs text-slate-400">Accessible & 2D Mode</div>
          </div>
        </div>

      </section>

      {/* Featured Community Proposals Section */}
      <section className="relative z-10 py-16 bg-slate-950/90 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Community Motion</div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Active Resident Suggestions</h2>
            </div>
            <Link to="/explore" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5">
              <span>View all proposals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSuggestions.map((sug) => {
              const statusCfg = STATUS_CONFIG[sug.status] || STATUS_CONFIG.submitted;
              return (
                <div key={sug.id} className="glass-panel glass-panel-interactive p-6 flex flex-col justify-between">
                  <div>
                    {/* Category & Status Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {sug.category?.name || 'Civic'}
                      </span>
                      <span
                        className="badge"
                        style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                      <Link to={`/suggestions/${sug.id}`}>{sug.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {sug.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{sug.support_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{sug.comment_count}</span>
                      </span>
                    </div>
                    <span className="text-slate-500">{sug.neighborhood?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Process & Trust Principles */}
      <section className="relative z-10 py-16 bg-slate-900/50 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-10">How CivicFlow Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 text-left space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-bold text-white">1. Share Your Vision</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Submit an idea in minutes. Choose neighborhood boundaries, privacy levels, and supporting context without bureaucratic friction.
              </p>
            </div>

            <div className="glass-panel p-6 text-left space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-bold text-white">2. Community Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fellow residents support and follow issues. High-support proposals trigger automated alerts for municipal staff review.
              </p>
            </div>

            <div className="glass-panel p-6 text-left space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-lg font-bold text-white">3. Public Lifecycle</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Watch status changes from "Under Review" to "Completed" with official council responses published directly on the proposal.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
