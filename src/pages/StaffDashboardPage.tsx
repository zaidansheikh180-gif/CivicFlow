import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SuggestionWithDetails, STATUS_CONFIG } from '../types/domain';
import { mockStorage } from '../lib/supabase';
import { 
  Building2, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Edit3, 
  MessageSquare, 
  Send 
} from 'lucide-react';

interface StaffDashboardPageProps {
  suggestions: SuggestionWithDetails[];
  onRefreshData?: () => void;
}

export const StaffDashboardPage: React.FC<StaffDashboardPageProps> = ({
  suggestions,
  onRefreshData,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [editingSuggestion, setEditingSuggestion] = useState<SuggestionWithDetails | null>(null);
  const [newStatus, setNewStatus] = useState<string>('under_review');
  const [statusNote, setStatusNote] = useState('');
  const [officialResponseBody, setOfficialResponseBody] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = suggestions.filter(
    (s) => selectedStatusFilter === 'all' || s.status === selectedStatusFilter
  );

  const handleSaveStatusUpdate = async () => {
    if (!editingSuggestion) return;
    setIsUpdating(true);
    
    // Update status
    await mockStorage.updateStatus(editingSuggestion.id, newStatus as any, statusNote);
    
    // Add official response if provided
    if (officialResponseBody.trim()) {
      await mockStorage.addOfficialResponse(editingSuggestion.id, officialResponseBody, 'Municipal Operations Team');
    }

    setIsUpdating(false);
    setEditingSuggestion(null);
    setOfficialResponseBody('');
    setStatusNote('');
    onRefreshData?.();
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 z-10">
      
      {/* Staff Portal Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-purple-500">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Governance Staff Triage Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Municipal Management Queue
          </h1>
          <p className="text-xs text-slate-400">
            Review incoming resident proposals, transition lifecycle statuses, and publish official responses.
          </p>
        </div>
      </div>

      {/* Triage Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4">
          <div className="text-2xl font-bold text-blue-400">
            {suggestions.filter((s) => s.status === 'submitted').length}
          </div>
          <div className="text-xs text-slate-400">Pending Triage</div>
        </div>

        <div className="glass-panel p-4">
          <div className="text-2xl font-bold text-purple-400">
            {suggestions.filter((s) => s.status === 'under_review').length}
          </div>
          <div className="text-xs text-slate-400">Under Review</div>
        </div>

        <div className="glass-panel p-4">
          <div className="text-2xl font-bold text-cyan-400">
            {suggestions.filter((s) => s.status === 'in_progress').length}
          </div>
          <div className="text-xs text-slate-400">In Progress</div>
        </div>

        <div className="glass-panel p-4">
          <div className="text-2xl font-bold text-emerald-400">
            {suggestions.filter((s) => s.status === 'completed').length}
          </div>
          <div className="text-xs text-slate-400">Completed</div>
        </div>
      </div>

      {/* Queue Filter */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <span>Filter Triage Queue:</span>
        </span>
        <select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          className="input-field w-56 text-xs cursor-pointer py-1.5"
        >
          <option value="all">All Proposals</option>
          <option value="submitted">Submitted Only</option>
          <option value="under_review">Under Review Only</option>
          <option value="planned">Planned Only</option>
          <option value="in_progress">In Progress Only</option>
          <option value="completed">Completed Only</option>
        </select>
      </div>

      {/* Proposals Queue Table / List */}
      <div className="space-y-3">
        {filtered.map((sug) => {
          const statusCfg = STATUS_CONFIG[sug.status] || STATUS_CONFIG.submitted;
          return (
            <div key={sug.id} className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="badge" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}>
                    {statusCfg.label}
                  </span>
                  <span className="text-xs text-slate-400">{sug.category?.name}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-blue-400">{sug.neighborhood?.name}</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  <Link to={`/suggestions/${sug.id}`}>{sug.title}</Link>
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">{sug.description}</p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  👍 {sug.support_count}
                </span>

                <button
                  onClick={() => {
                    setEditingSuggestion(sug);
                    setNewStatus(sug.status);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Status</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Update Modal Drawer */}
      {editingSuggestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-xl w-full p-6 space-y-5 bg-slate-900 border-slate-700 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span>Update Proposal Status & Response</span>
            </h2>

            <div className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-lg">
              <span className="font-semibold text-white block mb-0.5">{editingSuggestion.title}</span>
              <span className="text-slate-400">Current status: {editingSuggestion.status}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="input-field text-xs cursor-pointer"
              >
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="needs_information">Needs Information</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
                <option value="rejected">Not Actionable</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Audit Log Reason / Note</label>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="e.g. Budget approved in Q3 committee review."
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Publish Official Response (Publicly Visible)
              </label>
              <textarea
                value={officialResponseBody}
                onChange={(e) => setOfficialResponseBody(e.target.value)}
                rows={3}
                placeholder="Official statement from municipal board..."
                className="input-field text-xs resize-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingSuggestion(null)}
                className="btn btn-sm btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatusUpdate}
                disabled={isUpdating}
                className="btn btn-sm btn-primary"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isUpdating ? 'Saving...' : 'Save & Publish'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StaffDashboardPage;
