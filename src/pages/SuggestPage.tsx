import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEED_CATEGORIES, SEED_NEIGHBORHOODS } from '../types/domain';
import { mockStorage } from '../lib/supabase';
import { 
  Lightbulb, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Send, 
  ShieldCheck 
} from 'lucide-react';

export const SuggestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(SEED_CATEGORIES[0].id);
  const [neighborhoodId, setNeighborhoodId] = useState(SEED_NEIGHBORHOODS[0].id);
  const [address, setAddress] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'staff_only'>('public');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateStep1 = () => {
    if (!title.trim()) {
      setErrorMsg('Please enter a clear title for your proposal.');
      return false;
    }
    if (title.length < 5) {
      setErrorMsg('Title should be at least 5 characters long.');
      return false;
    }
    if (!description.trim() || description.length < 15) {
      setErrorMsg('Please describe your proposal in at least 15 characters.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true);
    try {
      const created = await mockStorage.createSuggestion({
        title,
        description,
        category_id: categoryId,
        neighborhood_id: neighborhoodId,
        visibility,
        is_anonymous: isAnonymous,
        status: isDraft ? 'draft' : 'submitted',
        location: {
          x: (Math.random() - 0.5) * 8,
          y: 0.5,
          z: (Math.random() - 0.5) * 8,
          address: address || 'Neighborhood Center',
        },
      });

      setIsSubmitting(false);
      navigate(`/suggestions/${created.id}`);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('An error occurred while saving your proposal. Please try again.');
    }
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 z-10 flex flex-col gap-6">
      
      {/* Wizard Header */}
      <div className="glass-panel p-6 text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Share a Civic Proposal
        </h1>
        <p className="text-xs text-slate-400">
          Your input helps local governance teams prioritize public improvements.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="glass-panel p-4 flex items-center justify-between">
        {[
          { num: 1, label: 'Idea', icon: Lightbulb },
          { num: 2, label: 'Place', icon: MapPin },
          { num: 3, label: 'Visibility', icon: Eye },
          { num: 4, label: 'Review', icon: CheckCircle2 },
        ].map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <div key={step.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? '✓' : step.num}
              </div>
              <span className={`hidden sm:inline text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Error Message summary */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Form Steps */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: IDEA */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Step 1: Describe Your Proposal</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Proposal Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Solar Canopy & Protected Bike Path on Main Street"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEED_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      categoryId === cat.id
                        ? 'border-blue-500 bg-blue-500/15 text-white shadow'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200 mb-0.5">{cat.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Detailed Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the issue, proposed solution, and benefits to local residents..."
                className="input-field resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2: PLACE */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Step 2: Choose Neighborhood & Location</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Neighborhood *
              </label>
              <select
                value={neighborhoodId}
                onChange={(e) => setNeighborhoodId(e.target.value)}
                className="input-field cursor-pointer"
              >
                {SEED_NEIGHBORHOODS.map((neigh) => (
                  <option key={neigh.id} value={neigh.id}>
                    {neigh.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Specific Location / Street (Optional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Main Street & 4th Avenue intersection"
                className="input-field"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your location will be represented as a generalized privacy-safe node on the community map.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: VISIBILITY */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>Step 3: Privacy & Visibility Choices</span>
            </h2>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  visibility === 'public'
                    ? 'border-blue-500 bg-blue-500/15 text-white shadow'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="font-semibold text-sm text-white mb-1">🌐 Public Proposal</div>
                <div className="text-xs text-slate-400">
                  Visible to all residents on the 3D map. People can upvote, follow updates, and comment.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('staff_only')}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  visibility === 'staff_only'
                    ? 'border-blue-500 bg-blue-500/15 text-white shadow'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="font-semibold text-sm text-white mb-1">🔒 Confidential Staff Submission</div>
                <div className="text-xs text-slate-400">
                  Visible only to municipal governance staff. Recommended for sensitive feedback.
                </div>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="anon" className="text-xs text-slate-300 cursor-pointer">
                Publish anonymously (hide my display name on public view)
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Step 4: Review Your Proposal</span>
            </h2>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Title:</span>
                <span className="text-white font-bold text-base">{title}</span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Category & Locality:</span>
                <span className="text-blue-400 font-medium">
                  {SEED_CATEGORIES.find((c) => c.id === categoryId)?.name} • {SEED_NEIGHBORHOODS.find((n) => n.id === neighborhoodId)?.name}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Description:</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{description}</p>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 pt-2 border-t border-slate-800">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  Visibility: {visibility === 'public' ? 'Public Suggestion' : 'Confidential'} {isAnonymous ? '(Anonymous)' : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button onClick={handleBack} className="btn btn-sm btn-secondary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button onClick={handleNext} className="btn btn-primary">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="btn btn-secondary"
                >
                  <Save className="w-4 h-4 text-slate-400" />
                  <span>Save Draft</span>
                </button>

                <button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Proposal'}</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default SuggestPage;
