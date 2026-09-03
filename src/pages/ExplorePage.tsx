import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SuggestionWithDetails, STATUS_CONFIG, SEED_CATEGORIES } from '../types/domain';
import { Card3D } from '../components/ui/Card3D';
import { Search, Grid, Map, ThumbsUp, MessageSquare, PlusCircle } from 'lucide-react';

interface ExplorePageProps {
  suggestions: SuggestionWithDetails[];
  selectedId: string | null;
  onSelectSuggestion: (sug: SuggestionWithDetails) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  suggestions,
  selectedId,
  onSelectSuggestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'spatial'>('grid');

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((sug) => {
      const matchesSearch =
        sug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.neighborhood?.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || sug.category_id === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || sug.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [suggestions, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 z-10">
      
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
            Explore Civic Proposals
          </h1>
          <p className="text-xs text-slate-400">
            Browse public suggestions across categories, neighborhoods, and official status stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => setViewMode('spatial')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'spatial'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>3D Spatial View</span>
            </button>
          </div>

          <Link to="/suggest" className="btn btn-sm btn-primary">
            <PlusCircle className="w-4 h-4" />
            <span>New Idea</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search proposals by keyword, street, or neighborhood..."
            className="input-field pl-10"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field cursor-pointer text-xs"
          >
            <option value="all">All Categories</option>
            {SEED_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field cursor-pointer text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredSuggestions.length}</strong> proposals
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid View Content */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((sug) => {
              const statusCfg = STATUS_CONFIG[sug.status] || STATUS_CONFIG.submitted;
              const isSelected = selectedId === sug.id;

              return (
                <Card3D
                  key={sug.id}
                  onClick={() => onSelectSuggestion(sug)}
                  className={`glass-panel p-6 flex flex-col justify-between h-full ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-950/30' : ''
                  }`}
                >
                  <div>
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

                    <h3 className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                      <Link to={`/suggestions/${sug.id}`}>{sug.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {sug.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{sug.support_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                        <span>{sug.comment_count}</span>
                      </span>
                    </div>
                    <span className="text-slate-500 font-medium">{sug.neighborhood?.name}</span>
                  </div>
                </Card3D>
              );
            })
          ) : (
            <div className="col-span-full glass-panel p-12 text-center text-slate-400">
              <p className="text-base font-semibold text-white mb-1">No matching proposals found</p>
              <p className="text-xs mb-4">Try adjusting your search query or filter selections.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="btn btn-sm btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Spatial 3D Overlay View Notice */}
      {viewMode === 'spatial' && (
        <Card3D className="glass-panel p-8 text-center space-y-3">
          <p className="text-sm font-bold text-blue-400">
            3D Spatial View Active
          </p>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Interact directly with the floating 3D crystals on the canvas. Hover over any node to preview proposal metadata or click to navigate directly into its lifecycle timeline.
          </p>
        </Card3D>
      )}

    </div>
  );
};

export default ExplorePage;
