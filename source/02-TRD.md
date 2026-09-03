# Digital Suggestion Box for Local Governance

## Technical Requirements Document

## 1. Technical direction

The application is planned as a full-site 3D animated civic web application built with:

- React
- TypeScript
- Three.js
- React Three Fiber
- GSAP
- Supabase

The codebase should separate civic domain logic from rendering, animation, and layout so that the 3D layer can evolve without coupling every feature to a scene implementation.

## 2. Proposed architecture

### Client

- React for application composition and route-level screens.
- TypeScript for domain models, component contracts, and safe API boundaries.
- React Three Fiber for declarative Three.js scenes.
- Three.js for cameras, lights, meshes, materials, loaders, and low-level scene controls.
- GSAP for coordinated timelines, route transitions, scroll-linked sequences, and deliberate micro-interactions.
- A lightweight client state layer for session-aware UI state, filters, modal state, and scene state.
- Supabase client libraries for authentication, database access, storage, and realtime subscriptions.

### Supabase

- Supabase Auth for residents, staff, moderators, and administrators.
- PostgreSQL for civic domain data.
- Row Level Security for public, resident-owned, and staff-only access rules.
- Supabase Storage for attachments and other persistent files.
- Realtime for suggestion status, official responses, notifications, and selected dashboard updates.
- Edge Functions where server-side orchestration or protected third-party calls are needed.

### Rendering layers

The frontend should treat a page as three coordinated layers:

1. Semantic application UI for content, forms, navigation, and accessibility.
2. A 3D scene for spatial context, visual storytelling, and ambient civic motion.
3. An animation orchestration layer that controls transitions between UI and scene states.

The application must still render useful content if WebGL is unavailable or reduced motion is enabled.

## 3. Technical requirements

### TR-01: Browser support

Support current versions of Chrome, Edge, Firefox, and Safari on desktop and mobile where WebGL is available. Detect unsupported WebGL and provide a graceful 2D presentation.

### TR-02: Responsive behavior

The application shall adapt camera framing, scene density, interaction targets, and layout for small screens. Mobile should not be a scaled-down desktop canvas.

### TR-03: Accessibility

- Maintain semantic DOM for all essential information.
- Provide keyboard-equivalent controls for scene interactions.
- Use ARIA only when native semantics are insufficient.
- Respect reduced-motion preferences.
- Keep contrast and focus behavior independent of 3D effects.

### TR-04: Performance

- Lazy-load route-specific scene assets.
- Reuse geometries and materials where possible.
- Avoid unnecessary React rerenders inside the render loop.
- Cap device pixel ratio on high-density displays.
- Use compressed textures and optimized glTF assets.
- Pause or reduce animation when the tab is hidden.
- Keep particle counts and post-processing adaptive to device capability.

### TR-05: Data safety

- Do not expose Supabase service-role keys in the browser.
- Enforce authorization in Supabase policies and trusted server-side functions.
- Validate user input at the client boundary and database boundary.
- Keep public views separate from private resident profile data.
- Use signed URLs or controlled access for private attachments.

### TR-06: Observability

Track product-level events without collecting unnecessary personal data, including:

- suggestion_started;
- suggestion_submitted;
- suggestion_viewed;
- suggestion_supported;
- suggestion_followed;
- official_response_viewed;
- moderation_reported; and
- reduced_motion_detected.

## 4. Route requirements

Planned routes include:

- `/` — civic entry point
- `/explore` — public suggestion discovery
- `/suggestions/:id` — suggestion detail and public history
- `/suggest` — create or resume a suggestion
- `/dashboard` — resident activity
- `/insights` — aggregate community insights
- `/about` — process, trust, and accessibility explanation
- `/auth/sign-in` — sign-in
- `/auth/sign-up` — account creation
- `/staff` — governance dashboard
- `/staff/suggestions` — staff suggestion management
- `/staff/suggestions/:id` — staff review and response
- `/staff/moderation` — moderation queue
- `/staff/settings` — configuration

Routes should be deep-linkable and should retain the artifact base path when deployed.

## 5. 3D system requirements

### Scene composition

Each page may use a shared civic world with route-specific focal points. The shared scene can include landmarks, connective paths, civic markers, and ambient elements. Route changes should move the camera or transition between focal areas rather than destroying and recreating the entire world unnecessarily.

### Interaction model

3D objects may be interactive only when they have a clear purpose. Every interactive object requires:

- a visible or discoverable affordance;
- a semantic DOM equivalent;
- hover, focus, active, and disabled states;
- a reduced-motion behavior; and
- a safe fallback for touch devices.

### Animation model

GSAP timelines should be named and scoped by route or component. Avoid multiple uncontrolled timelines targeting the same property. Clean up timelines and event handlers when components unmount.

### Asset model

Prefer glTF or GLB for 3D assets. Store source files and exported runtime files separately. Document licenses and provenance for any externally sourced asset. Avoid placeholder image services in the final application.

## 6. Supabase requirements

### Auth

Use Supabase Auth sessions and protect resident-owned and staff-only routes. The client should react to auth changes and clear user-scoped cached state on logout or account switch.

### Database

Use normalized relational tables for users, suggestions, categories, statuses, status history, comments, supports, follows, reports, official responses, notifications, and audit events. See `05-Backend-Schema.md`.

### RLS

Policies should make the default secure:

- public users can read only approved public suggestions and public responses;
- residents can read and edit their own drafts;
- residents can read their own private activity;
- staff can access assigned or permitted moderation and governance data;
- administrators can manage configuration;
- no browser client can bypass policies with a client-provided role claim.

### Realtime

Subscribe narrowly to records the current view needs. Reconcile realtime events with the local cache and refetch after reconnect. The author’s own action must update the local view immediately rather than waiting for a broadcast.

## 7. Error handling

- Show a meaningful inline error for form validation.
- Show a recovery action for network or session errors.
- Never silently discard a draft or failed submission.
- Provide an accessible error summary for complex forms.
- Log technical details only in protected observability channels.

## 8. Testing requirements

### Unit tests

- validation schemas;
- status transition rules;
- permission helpers;
- aggregation utilities;
- animation state decisions.

### Integration tests

- authenticated submission flow;
- draft save and resume;
- staff status update;
- official response publication;
- moderation action;
- RLS access boundaries.

### Browser tests

- public exploration;
- resident submission;
- responsive layouts;
- reduced-motion mode;
- WebGL fallback;
- keyboard navigation through the most important flows.

## 9. Deployment considerations

- Keep environment-specific Supabase URLs and public anon keys in environment configuration.
- Never commit secrets.
- Use separate Supabase projects or environments for academic development and production demonstrations.
- Apply migrations through a reviewed process.
- Configure storage policies with the same privacy model as database records.
- Monitor bundle size and first meaningful render after adding 3D assets.

## 10. Technical decisions to revisit

- Whether a dedicated server layer is needed for trusted moderation workflows.
- Whether realtime is required on every staff screen or only on detail and notification surfaces.
- Which post-processing effects are safe for the target device range.
- Whether a map provider is needed or a privacy-safe neighborhood visualization is sufficient.
