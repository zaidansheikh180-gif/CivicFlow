import React from 'react';
import { SuggestionWithDetails, SEED_CATEGORIES, SEED_NEIGHBORHOODS, STATUS_CONFIG } from '../types/domain';
import { BarChart3, PieChart, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';

interface InsightsPageProps {
  suggestions: SuggestionWithDetails[];
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ suggestions }) => {
  const totalProposals = suggestions.length;
  const totalVotes = suggestions.reduce((acc, curr) => acc + curr.support_count, 0);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 z-10">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Aggregate Civic Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Community Priorities & Insights
        </h1>
        <p className="text-xs text-slate-400">
          Privacy-safe aggregate data demonstrating municipal engagement, category demand, and progress rates.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">
            📊
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white">{totalProposals}</div>
            <div className="text-xs text-slate-400">Total Active Proposals</div>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
            👍
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-emerald-400">+{totalVotes}</div>
            <div className="text-xs text-slate-400">Total Resident Votes</div>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
            ⚡
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-cyan-400">
              {Math.round((suggestions.filter((s) => ['planned', 'in_progress', 'completed'].includes(s.status)).length / (totalProposals || 1)) * 100)}%
            </div>
            <div className="text-xs text-slate-400">Action Rate (Approved/Active)</div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            <span>Proposals by Category</span>
          </h3>

          <div className="space-y-3 pt-2">
            {SEED_CATEGORIES.map((cat) => {
              const count = suggestions.filter((s) => s.category_id === cat.id).length;
              const percentage = Math.round((count / (totalProposals || 1)) * 100);

              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="text-slate-400">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: cat.color_token }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Lifecycle Status Breakdown</span>
          </h3>

          <div className="space-y-3 pt-2">
            {['submitted', 'under_review', 'planned', 'in_progress', 'completed'].map((statusKey) => {
              const cfg = STATUS_CONFIG[statusKey];
              const count = suggestions.filter((s) => s.status === statusKey).length;
              const percentage = Math.round((count / (totalProposals || 1)) * 100);

              return (
                <div key={statusKey} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cfg.label}</span>
                    <span className="text-slate-400">{count} proposals</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: cfg.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Neighborhood Heatmap Table */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>Privacy-Safe Locality Distribution</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {SEED_NEIGHBORHOODS.map((neigh) => {
            const count = suggestions.filter((s) => s.neighborhood_id === neigh.id).length;
            return (
              <div key={neigh.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{neigh.name}</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                  {count} proposals
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default InsightsPage;
