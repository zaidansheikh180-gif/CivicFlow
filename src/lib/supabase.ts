import { createClient } from '@supabase/supabase-js';
import { SEED_SUGGESTIONS, SEED_CATEGORIES, SEED_NEIGHBORHOODS, SuggestionWithDetails } from '../types/domain';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-civicflow.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In-memory mock store for local interactive demonstration
let localSuggestions: SuggestionWithDetails[] = [...SEED_SUGGESTIONS];

export const mockStorage = {
  getSuggestions: async (): Promise<SuggestionWithDetails[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...localSuggestions]), 200);
    });
  },
  getSuggestionById: async (id: string): Promise<SuggestionWithDetails | null> => {
    return new Promise((resolve) => {
      const match = localSuggestions.find((s) => s.id === id);
      resolve(match ? { ...match } : null);
    });
  },
  createSuggestion: async (newSug: Partial<SuggestionWithDetails>): Promise<SuggestionWithDetails> => {
    return new Promise((resolve) => {
      const created: SuggestionWithDetails = {
        id: `sug-${Date.now()}`,
        author_id: newSug.author_id || 'usr-current',
        title: newSug.title || 'Untitled Proposal',
        description: newSug.description || '',
        category_id: newSug.category_id || SEED_CATEGORIES[0].id,
        neighborhood_id: newSug.neighborhood_id || SEED_NEIGHBORHOODS[0].id,
        category: SEED_CATEGORIES.find((c) => c.id === newSug.category_id) || SEED_CATEGORIES[0],
        neighborhood: SEED_NEIGHBORHOODS.find((n) => n.id === newSug.neighborhood_id) || SEED_NEIGHBORHOODS[0],
        location: newSug.location || { x: (Math.random() - 0.5) * 8, y: 0.5, z: (Math.random() - 0.5) * 8, address: 'Local Civic Area' },
        status: newSug.status || 'submitted',
        visibility: newSug.visibility || 'public',
        is_anonymous: newSug.is_anonymous || false,
        support_count: 1,
        comment_count: 0,
        submitted_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        closed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        official_responses: [],
        status_history: [
          {
            id: `hist-${Date.now()}`,
            suggestion_id: `sug-${Date.now()}`,
            from_status: null,
            to_status: newSug.status || 'submitted',
            note: 'Initial submission created by resident.',
            changed_by: 'usr-current',
            created_at: new Date().toISOString(),
          },
        ],
        comments: [],
      };
      localSuggestions.unshift(created);
      setTimeout(() => resolve(created), 300);
    });
  },
  toggleSupport: async (id: string, userId: string = 'usr-current'): Promise<SuggestionWithDetails | null> => {
    const item = localSuggestions.find((s) => s.id === id);
    if (!item) return null;
    item.is_supported_by_user = !item.is_supported_by_user;
    item.support_count += item.is_supported_by_user ? 1 : -1;
    return { ...item };
  },
  toggleFollow: async (id: string, userId: string = 'usr-current'): Promise<SuggestionWithDetails | null> => {
    const item = localSuggestions.find((s) => s.id === id);
    if (!item) return null;
    item.is_followed_by_user = !item.is_followed_by_user;
    return { ...item };
  },
  updateStatus: async (id: string, newStatus: any, note?: string): Promise<SuggestionWithDetails | null> => {
    const item = localSuggestions.find((s) => s.id === id);
    if (!item) return null;
    const oldStatus = item.status;
    item.status = newStatus;
    item.updated_at = new Date().toISOString();
    if (!item.status_history) item.status_history = [];
    item.status_history.push({
      id: `hist-${Date.now()}`,
      suggestion_id: item.id,
      from_status: oldStatus,
      to_status: newStatus,
      note: note || `Status changed from ${oldStatus} to ${newStatus}`,
      changed_by: 'staff-current',
      created_at: new Date().toISOString(),
    });
    return { ...item };
  },
  addOfficialResponse: async (id: string, body: string, authorName: string = 'Governance Officer'): Promise<SuggestionWithDetails | null> => {
    const item = localSuggestions.find((s) => s.id === id);
    if (!item) return null;
    if (!item.official_responses) item.official_responses = [];
    item.official_responses.push({
      id: `resp-${Date.now()}`,
      suggestion_id: item.id,
      author_id: 'staff-current',
      author_name: authorName,
      body,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return { ...item };
  },
  addComment: async (id: string, body: string, authorName: string = 'Resident'): Promise<SuggestionWithDetails | null> => {
    const item = localSuggestions.find((s) => s.id === id);
    if (!item) return null;
    if (!item.comments) item.comments = [];
    item.comments.push({
      id: `c-${Date.now()}`,
      suggestion_id: item.id,
      author_id: 'usr-current',
      author_name: authorName,
      body,
      status: 'visible',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    item.comment_count += 1;
    return { ...item };
  },
};
