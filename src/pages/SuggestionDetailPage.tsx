import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SuggestionWithDetails, STATUS_CONFIG } from '../types/domain';
import { UserRole } from '../types/database';
import { mockStorage } from '../lib/supabase';
import { 
  ThumbsUp, 
  Bell, 
  MessageSquare, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Send, 
  Building2 
} from 'lucide-react';

interface SuggestionDetailPageProps {
  currentRole: UserRole;
  onRefreshData?: () => void;
}

export const SuggestionDetailPage: React.FC<SuggestionDetailPageProps> = ({
  currentRole,
  onRefreshData,
}) => {
  const { id } = useParams<{ id: string }>();
  const [suggestion, setSuggestion] = useState<SuggestionWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await mockStorage.getSuggestionById(id);
      setSuggestion(data);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSupport = async () => {
    if (!id || !suggestion) return;
    const updated = await mockStorage.toggleSupport(id);
    if (updated) {
      setSuggestion(updated);
      onRefreshData?.();
    }
  };

  const handleFollow = async () => {
    if (!id || !suggestion) return;
    const updated = await mockStorage.toggleFollow(id);
    if (updated) {
      setSuggestion(updated);
      onRefreshData?.();
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return;
    setIsSubmittingComment(true);
    const updated = await mockStorage.addComment(id, newComment);
    if (updated) {
      setSuggestion(updated);
      setNewComment('');
    }
    setIsSubmittingComment(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mr-3" />
        <span>Loading proposal details...</span>
      </div>
    );
  }

  if (!suggestion) {
    return (
      <div className="flex-1 max-w-3xl mx-auto p-12 text-center text-slate-400 glass-panel my-auto">
        <h2 className="text-xl font-bold text-white mb-2">Proposal Not Found</h2>
        <p className="text-xs mb-4">The requested proposal could not be retrieved.</p>
        <Link to="/explore" className="btn btn-sm btn-primary">
          Back to Explore
        </Link>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[suggestion.status] || STATUS_CONFIG.submitted;
  const lifecycleSteps = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'planned', label: 'Planned' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const currentStepIndex = lifecycleSteps.findIndex((s) => s.key === suggestion.status);

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 z-10">
      
      {/* Top Navigation */}
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors w-max">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Proposals</span>
      </Link>

      {/* Main Header Card */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        
        {/* Category & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {suggestion.category?.name || 'Civic'}
          </span>

          <span className="badge" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}>
            {statusCfg.label}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
          {suggestion.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>By: <strong className="text-slate-200">{suggestion.is_anonymous ? 'Anonymous Resident' : 'Resident'}</strong></span>
          <span>•</span>
          <span>Locality: <strong className="text-blue-400">{suggestion.neighborhood?.name}</strong></span>
          <span>•</span>
          <span>Submitted: {new Date(suggestion.created_at).toLocaleDateString()}</span>
        </div>

        {/* Description */}
        <div className="text-sm text-slate-200 leading-relaxed space-y-2">
          <p className="whitespace-pre-line">{suggestion.description}</p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSupport}
              className={`btn btn-sm ${
                suggestion.is_supported_by_user
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{suggestion.is_supported_by_user ? 'Supported' : 'Support Proposal'}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-xs font-bold">
                {suggestion.support_count}
              </span>
            </button>

            <button
              onClick={handleFollow}
              className={`btn btn-sm ${
                suggestion.is_followed_by_user
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'btn-secondary'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{suggestion.is_followed_by_user ? 'Following Updates' : 'Follow Updates'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>{suggestion.comments?.length || 0} Comments</span>
          </div>
        </div>

      </div>

      {/* Lifecycle Timeline */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Governance Lifecycle Progress</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {lifecycleSteps.map((step, idx) => {
            const isCompleted = currentStepIndex >= idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div
                key={step.key}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-500/15 text-white ring-1 ring-blue-400'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-slate-800 bg-slate-900/40 text-slate-600'
                }`}
              >
                <div className="text-xs font-bold mb-1">{step.label}</div>
                <div className="text-[10px]">
                  {isCurrent ? 'Active Stage' : isCompleted ? 'Passed' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Notes History */}
        {suggestion.status_history && suggestion.status_history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
            <span className="text-slate-400 font-semibold block">Audit & Status History:</span>
            {suggestion.status_history.map((hist) => (
              <div key={hist.id} className="flex items-start gap-2 text-slate-300 bg-slate-900/50 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{hist.to_status}</span>: {hist.note}
                  <span className="text-[10px] text-slate-500 block mt-0.5">{new Date(hist.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Council Responses */}
      <div className="glass-panel p-6 border-l-4 border-blue-500 space-y-4">
        <div className="flex items-center gap-2 text-blue-400 font-bold font-display text-base">
          <Building2 className="w-5 h-5" />
          <span>Official Response from Governance Staff</span>
        </div>

        {suggestion.official_responses && suggestion.official_responses.length > 0 ? (
          suggestion.official_responses.map((resp) => (
            <div key={resp.id} className="bg-blue-950/30 p-4 rounded-xl border border-blue-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs text-blue-300">
                <span className="font-bold text-white">{resp.author_name || 'Municipal Officer'}</span>
                <span>{new Date(resp.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{resp.body}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 italic">
            No official statement has been published yet. The governance team will post official updates here as evaluation progresses.
          </p>
        )}
      </div>

      {/* Resident Comments Section */}
      <div className="glass-panel p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <span>Community Discussion ({suggestion.comments?.length || 0})</span>
        </h3>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Add your feedback or constructive commentary..."
            className="input-field text-xs resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingComment || !newComment.trim()}
              className="btn btn-sm btn-primary"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-2">
          {suggestion.comments && suggestion.comments.length > 0 ? (
            suggestion.comments.map((comment) => (
              <div key={comment.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-200">{comment.author_name || 'Resident'}</span>
                  <span className="text-[10px]">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{comment.body}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 text-center py-4">Be the first resident to join the conversation.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default SuggestionDetailPage;
