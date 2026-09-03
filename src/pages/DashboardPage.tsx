import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SuggestionWithDetails, STATUS_CONFIG } from '../types/domain';
import { UserRole } from '../types/database';
import { 
  User, 
  FileText, 
  Bell, 
  PlusCircle, 
  ThumbsUp, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

interface DashboardPageProps {
  suggestions: SuggestionWithDetails[];
  currentRole: UserRole;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ suggestions }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'followed' | 'notifications'>('submissions');

  const followedSuggestions = suggestions.filter((s) => s.is_followed_by_user);
  const mySubmissions = suggestions.slice(0, 3); // Simulated user submissions

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 z-10">
      
      {/* Resident Profile Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/25">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-white">Resident Portal</h1>
            <p className="text-xs text-slate-400">Neighborhood: <strong className="text-blue-400">Downtown Core</strong></p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Verified Resident
              </span>
            </div>
          </div>
        </div>

        <Link to="/suggest" className="btn btn-primary">
          <PlusCircle className="w-4 h-4" />
          <span>New Proposal</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'submissions'
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Submissions ({mySubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('followed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'followed'
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Followed Proposals ({followedSuggestions.length})</span>
        </button>
      </div>

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {mySubmissions.map((sug) => {
            const statusCfg = STATUS_CONFIG[sug.status] || STATUS_CONFIG.submitted;
            return (
              <div key={sug.id} className="glass-panel glass-panel-interactive p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="badge" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}>
                      {statusCfg.label}
                    </span>
                    <span className="text-xs text-slate-400">{sug.category?.name}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    <Link to={`/suggestions/${sug.id}`}>{sug.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{sug.description}</p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{sug.support_count}</span>
                  </span>
                  <Link to={`/suggestions/${sug.id}`} className="btn btn-sm btn-secondary">
                    <span>View Detail</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Followed Tab */}
      {activeTab === 'followed' && (
        <div className="space-y-4">
          {followedSuggestions.length > 0 ? (
            followedSuggestions.map((sug) => {
              const statusCfg = STATUS_CONFIG[sug.status] || STATUS_CONFIG.submitted;
              return (
                <div key={sug.id} className="glass-panel p-5 flex items-center justify-between">
                  <div>
                    <span className="badge mb-1" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}>
                      {statusCfg.label}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      <Link to={`/suggestions/${sug.id}`}>{sug.title}</Link>
                    </h3>
                  </div>
                  <Link to={`/suggestions/${sug.id}`} className="btn btn-sm btn-secondary">
                    View
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="glass-panel p-8 text-center text-xs text-slate-400">
              You are not following any proposals yet. Click "Follow Updates" on any suggestion detail page to track progress!
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
