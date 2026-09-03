export type UserRole = 'resident' | 'moderator' | 'staff' | 'admin';

export type SuggestionStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'needs_information'
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'closed'
  | 'rejected';

export type Visibility = 'public' | 'staff_only';

export type CommentStatus = 'visible' | 'pending_review' | 'hidden' | 'removed';

export type ReportStatus = 'open' | 'reviewing' | 'resolved' | 'dismissed';

export interface Profile {
  id: string;
  display_name: string | null;
  role: UserRole;
  neighborhood_id: string | null;
  avatar_path: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  geometry: {
    type: string;
    coordinates: number[][][] | number[];
  } | null;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color_token: string;
  icon_key: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Suggestion {
  id: string;
  author_id: string | null;
  title: string;
  description: string;
  category_id: string;
  neighborhood_id: string | null;
  location: {
    x?: number;
    y?: number;
    z?: number;
    address?: string;
    neighborhood_name?: string;
  } | null;
  status: SuggestionStatus;
  visibility: Visibility;
  is_anonymous: boolean;
  support_count: number;
  comment_count: number;
  submitted_at: string | null;
  published_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SuggestionStatusHistory {
  id: string;
  suggestion_id: string;
  from_status: SuggestionStatus | null;
  to_status: SuggestionStatus;
  note: string | null;
  changed_by: string | null;
  created_at: string;
}

export interface Comment {
  id: string;
  suggestion_id: string;
  author_id: string;
  body: string;
  status: CommentStatus;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

export interface SuggestionSupport {
  suggestion_id: string;
  user_id: string;
  created_at: string;
}

export interface SuggestionFollow {
  suggestion_id: string;
  user_id: string;
  created_at: string;
}

export interface OfficialResponse {
  id: string;
  suggestion_id: string;
  author_id: string;
  author_name?: string;
  body: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  suggestion_id: string | null;
  type: string;
  title: string;
  body: string;
  read_at: string | null;
  created_at: string;
}
