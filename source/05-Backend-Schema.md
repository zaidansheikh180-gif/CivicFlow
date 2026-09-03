# Digital Suggestion Box for Local Governance

## Backend Schema

## 1. Data model principles

- Use UUID primary keys.
- Store timestamps in UTC.
- Keep user identity separate from public suggestion content.
- Model status history as append-only events rather than overwriting the entire history.
- Use explicit visibility and moderation fields.
- Enforce ownership and role access through Supabase Row Level Security.
- Store file bytes in Supabase Storage and store only metadata and object paths in PostgreSQL.
- Prefer soft deletion or visibility changes for civic records that may need auditability.

## 2. Enumerations

### User roles

- `resident`
- `moderator`
- `staff`
- `admin`

### Suggestion status

- `draft`
- `submitted`
- `under_review`
- `needs_information`
- `planned`
- `in_progress`
- `completed`
- `closed`
- `rejected`

### Visibility

- `public`
- `staff_only`

### Comment status

- `visible`
- `pending_review`
- `hidden`
- `removed`

### Report status

- `open`
- `reviewing`
- `resolved`
- `dismissed`

## 3. Tables

### `profiles`

Application profile linked to Supabase Auth.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key, references `auth.users.id` |
| `display_name` | text | nullable, user-controlled |
| `role` | enum | not null, default `resident` |
| `neighborhood_id` | uuid | nullable, references `neighborhoods.id` |
| `avatar_path` | text | nullable, storage object path |
| `bio` | text | nullable |
| `created_at` | timestamptz | not null |
| `updated_at` | timestamptz | not null |

Do not expose private profile fields in public suggestion queries.

### `neighborhoods`

Privacy-safe civic locations.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `name` | text | not null |
| `slug` | text | unique, not null |
| `geometry` | jsonb | nullable, generalized boundary |
| `is_active` | boolean | not null, default true |
| `created_at` | timestamptz | not null |

Avoid storing precise resident home addresses.

### `categories`

Configurable suggestion categories.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `name` | text | unique, not null |
| `slug` | text | unique, not null |
| `description` | text | nullable |
| `color_token` | text | not null |
| `icon_key` | text | nullable |
| `sort_order` | integer | not null, default 0 |
| `is_active` | boolean | not null, default true |
| `created_at` | timestamptz | not null |

### `suggestions`

The primary civic proposal record.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `author_id` | uuid | nullable, references `profiles.id` |
| `title` | text | not null |
| `description` | text | not null |
| `category_id` | uuid | not null, references `categories.id` |
| `neighborhood_id` | uuid | nullable, references `neighborhoods.id` |
| `location` | jsonb | nullable, generalized point or civic place |
| `status` | enum | not null, default `draft` |
| `visibility` | enum | not null, default `public` |
| `is_anonymous` | boolean | not null, default false |
| `support_count` | integer | not null, default 0 |
| `comment_count` | integer | not null, default 0 |
| `submitted_at` | timestamptz | nullable |
| `published_at` | timestamptz | nullable |
| `closed_at` | timestamptz | nullable |
| `created_at` | timestamptz | not null |
| `updated_at` | timestamptz | not null |

Counts may be denormalized for read performance but must be updated transactionally.

### `suggestion_status_history`

Append-only lifecycle history.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `suggestion_id` | uuid | not null, references `suggestions.id` |
| `from_status` | enum | nullable |
| `to_status` | enum | not null |
| `note` | text | nullable |
| `changed_by` | uuid | nullable, references `profiles.id` |
| `created_at` | timestamptz | not null |

### `suggestion_attachments`

Metadata for files stored in Supabase Storage.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `suggestion_id` | uuid | not null, references `suggestions.id` |
| `uploaded_by` | uuid | not null, references `profiles.id` |
| `storage_path` | text | unique, not null |
| `file_name` | text | not null |
| `mime_type` | text | not null |
| `byte_size` | bigint | not null |
| `scan_status` | text | not null, default `pending` |
| `created_at` | timestamptz | not null |

### `comments`

Resident discussion tied to a public suggestion.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `suggestion_id` | uuid | not null, references `suggestions.id` |
| `author_id` | uuid | not null, references `profiles.id` |
| `body` | text | not null |
| `status` | enum | not null, default `visible` |
| `created_at` | timestamptz | not null |
| `updated_at` | timestamptz | not null |

### `suggestion_supports`

One support per resident per suggestion.

| Column | Type | Constraints |
|---|---|---|
| `suggestion_id` | uuid | primary key part, references `suggestions.id` |
| `user_id` | uuid | primary key part, references `profiles.id` |
| `created_at` | timestamptz | not null |

Unique constraint: `(suggestion_id, user_id)`.

### `suggestion_follows`

Residents who want updates.

| Column | Type | Constraints |
|---|---|---|
| `suggestion_id` | uuid | primary key part, references `suggestions.id` |
| `user_id` | uuid | primary key part, references `profiles.id` |
| `created_at` | timestamptz | not null |

Unique constraint: `(suggestion_id, user_id)`.

### `reports`

Moderation reports.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `reporter_id` | uuid | nullable, references `profiles.id` |
| `suggestion_id` | uuid | nullable, references `suggestions.id` |
| `comment_id` | uuid | nullable, references `comments.id` |
| `reason` | text | not null |
| `details` | text | nullable |
| `status` | enum | not null, default `open` |
| `reviewed_by` | uuid | nullable, references `profiles.id` |
| `resolution_note` | text | nullable |
| `created_at` | timestamptz | not null |
| `resolved_at` | timestamptz | nullable |

Constraint: exactly one of `suggestion_id` or `comment_id` should be set.

### `official_responses`

Public responses from governance staff.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `suggestion_id` | uuid | not null, references `suggestions.id` |
| `author_id` | uuid | not null, references `profiles.id` |
| `body` | text | not null |
| `is_published` | boolean | not null, default false |
| `published_at` | timestamptz | nullable |
| `created_at` | timestamptz | not null |
| `updated_at` | timestamptz | not null |

### `notifications`

In-app notification source of truth.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `user_id` | uuid | not null, references `profiles.id` |
| `suggestion_id` | uuid | nullable, references `suggestions.id` |
| `type` | text | not null |
| `title` | text | not null |
| `body` | text | not null |
| `read_at` | timestamptz | nullable |
| `created_at` | timestamptz | not null |

### `notification_preferences`

Resident notification controls.

| Column | Type | Constraints |
|---|---|---|
| `user_id` | uuid | primary key, references `profiles.id` |
| `status_updates` | boolean | not null, default true |
| `official_responses` | boolean | not null, default true |
| `community_activity` | boolean | not null, default false |
| `email_enabled` | boolean | not null, default true |
| `updated_at` | timestamptz | not null |

### `audit_events`

Accountability record for staff and administrative actions.

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | primary key |
| `actor_id` | uuid | nullable, references `profiles.id` |
| `action` | text | not null |
| `entity_type` | text | not null |
| `entity_id` | uuid | not null |
| `metadata` | jsonb | not null, default `{}` |
| `created_at` | timestamptz | not null |

## 4. Views and read models

Consider database views or server-side queries for:

- public suggestion cards;
- suggestion detail with visible timeline;
- resident dashboard summary;
- staff queue with category and status labels;
- category counts;
- status counts;
- recent activity;
- privacy-safe neighborhood aggregation.

Public views must avoid returning author email, private profile data, private locations, or moderation reporter details.

## 5. RLS policy outline

### Profiles

- A resident can read and update their own profile.
- Staff can read the minimum profile fields needed for governance work.
- Public clients cannot read private profile fields.

### Suggestions

- Anyone can read public, published, non-hidden suggestions.
- An authenticated resident can create and update their own drafts.
- A resident can read their own staff-only submissions.
- Staff and moderators can read the records allowed by role.
- Only staff can change public status or publish a suggestion.

### Comments

- Anyone can read visible comments on public suggestions.
- Authenticated residents can create comments.
- Authors can edit their own comments within the allowed policy window.
- Moderators can change comment visibility.

### Supports and follows

- Authenticated residents can create or delete their own rows.
- Residents can read their own follow/support state.
- Aggregate counts can be exposed through safe public queries.

### Reports

- Authenticated residents can create reports.
- Reporters can read only the outcome appropriate to their own report.
- Moderators and staff can read and manage the queue.

## 6. Indexes

Plan indexes for:

- `suggestions(status, published_at)`;
- `suggestions(category_id, status)`;
- `suggestions(neighborhood_id, status)`;
- full-text search over public title and description;
- `suggestion_status_history(suggestion_id, created_at)`;
- `comments(suggestion_id, created_at)`;
- `notifications(user_id, read_at, created_at)`;
- `reports(status, created_at)`.

## 7. Migration and seed guidance

- Apply schema changes through reviewed migrations.
- Seed only fictional or clearly labeled academic demonstration data.
- Do not seed real resident personal information.
- Keep category and status seed values stable so the UI can rely on them.
- Document any test accounts outside the production environment.
