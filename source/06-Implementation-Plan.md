# Digital Suggestion Box for Local Governance

## Implementation Plan

## 1. Delivery approach

Build the project in vertical slices so that every milestone produces a coherent, testable civic experience. The 3D scene and semantic application layer should be developed together, but neither should block the other from remaining usable.

The initial implementation should preserve the product documentation and establish the visual and technical foundation before adding every workflow.

## 2. Workstreams

### Workstream A: Project foundation

- Confirm application structure and route conventions.
- Define TypeScript domain types and shared validation.
- Establish Supabase environment configuration.
- Add app shell, error boundaries, loading states, and route handling.
- Add baseline accessibility and reduced-motion infrastructure.

### Workstream B: Design system

- Define civic visual tokens.
- Establish typography, color, spacing, elevation, and interaction tokens.
- Build core buttons, inputs, panels, badges, alerts, dialogs, timeline elements, and status indicators.
- Establish light and dark or scene-aware presentation rules if both modes are required.

### Workstream C: 3D foundation

- Create a reusable R3F canvas wrapper.
- Define camera, lighting, environment, and scene lifecycle.
- Add adaptive pixel ratio and performance profile.
- Add route-aware scene state.
- Add WebGL unavailable and reduced-motion fallbacks.
- Document asset loading, disposal, and provenance.

### Workstream D: Identity and access

- Configure Supabase Auth.
- Implement sign-in, sign-up, session restore, sign-out, and protected routes.
- Add profile creation and role-aware route guards.
- Test that user-scoped state clears on account changes.

### Workstream E: Public civic experience

- Build landing route.
- Build process and trust explanation.
- Build public exploration with search and filters.
- Build suggestion detail with public status history and official responses.
- Add public empty, loading, and error states.

### Workstream F: Resident participation

- Build multi-step suggestion form.
- Add draft persistence and resume flow.
- Add visibility and privacy explanations.
- Add optional locality and attachment handling.
- Add support, follow, comment, and report interactions.
- Add resident dashboard and notifications.

### Workstream G: Governance operations

- Build staff dashboard.
- Build triage queue with filters and sorting.
- Build staff suggestion detail and status transitions.
- Build official response editor.
- Build moderation queue and resolution actions.
- Add audit events and permission tests.

### Workstream H: Community insights

- Add status and category summaries.
- Add privacy-safe neighborhood aggregation.
- Add recent activity and high-support themes.
- Ensure visualizations have text and table equivalents.

## 3. Suggested milestones

### Milestone 0: Documentation and decisions

Deliverables:

- approved PRD;
- approved technical direction;
- confirmed roles and status vocabulary;
- confirmed public/private data rules;
- initial 3D mood and scene direction.

Exit criteria:

- no unresolved decision blocks foundation work;
- academic stakeholders agree on the scope of the first demonstration.

### Milestone 1: Foundation and visual prototype

Deliverables:

- working React and TypeScript shell;
- shared layout and tokens;
- initial R3F scene;
- route transitions;
- reduced-motion and WebGL fallback;
- static prototype of landing and explore experiences.

Exit criteria:

- the site feels like one connected civic world;
- semantic content remains usable with the 3D scene disabled;
- mobile and desktop compositions are established.

### Milestone 2: Public suggestion discovery

Deliverables:

- Supabase schema baseline;
- public suggestion query;
- explore route;
- filters and search;
- suggestion detail;
- visible lifecycle timeline.

Exit criteria:

- fictional seed suggestions load;
- filters and deep links work;
- public privacy rules are verified.

### Milestone 3: Resident submission

Deliverables:

- authentication;
- multi-step create flow;
- draft save and resume;
- visibility controls;
- submission confirmation;
- resident dashboard.

Exit criteria:

- a new resident can create an account and submit;
- interrupted form state is not lost;
- submission appears in the correct resident and public views.

### Milestone 4: Participation and notifications

Deliverables:

- support;
- follow;
- comments;
- report flow;
- in-app notifications;
- realtime updates where beneficial.

Exit criteria:

- mutations update the initiating view immediately;
- another session receives valid updates;
- moderation and rate-limiting boundaries are tested.

### Milestone 5: Governance operations

Deliverables:

- staff dashboard;
- triage filters;
- status transitions;
- official responses;
- moderation queue;
- audit trail.

Exit criteria:

- unauthorized roles cannot access staff actions;
- every status transition has a visible history entry;
- public responses and moderation outcomes follow the visibility model.

### Milestone 6: Insights and quality

Deliverables:

- aggregate insights;
- privacy-safe geographic views;
- performance pass;
- accessibility pass;
- browser and responsive testing;
- academic demonstration data and presentation notes.

Exit criteria:

- essential flows work on target browsers and devices;
- reduced-motion and fallback experiences are complete;
- no critical privacy or permission issue remains.

## 4. Build order for the 3D layer

1. Establish semantic layout without visual dependency on WebGL.
2. Add a shared canvas with fixed camera and accessible fallback.
3. Add one landmark and one purposeful interaction.
4. Add route state and transition orchestration.
5. Add suggestion markers and status visual language.
6. Add adaptive performance behavior.
7. Add polish only after core flows remain readable and responsive.

## 5. API and data implementation order

Even when Supabase is the primary backend, define the data contract before wiring screens:

1. profile and role access;
2. categories and neighborhoods;
3. suggestions and drafts;
4. status history;
5. public read models;
6. supports and follows;
7. comments and reports;
8. official responses;
9. notifications;
10. audit events and insights.

Every mutation should define:

- input validation;
- authorization rule;
- database write;
- related count or history update;
- local UI cache update or invalidation;
- realtime behavior, if applicable;
- error and recovery state.

## 6. Quality gates

### Before merging a feature

- TypeScript checks pass.
- Core interaction works with keyboard.
- Reduced-motion mode remains understandable.
- Loading, empty, error, and permission states are present.
- Supabase policies are tested for allowed and denied roles.
- Any 3D asset is optimized and its license is recorded.
- No private data appears in public queries.

### Before academic demonstration

- Seed data is fictional and coherent.
- Full resident flow can be demonstrated from landing to status update.
- Staff flow can be demonstrated without exposing secrets.
- Mobile layout is usable.
- 3D fallback is available.
- Performance is acceptable on a representative mid-range device.
- Documentation reflects the implemented scope and known limitations.

## 7. Risks and mitigations

### 3D performance risk

Mitigation: adaptive quality settings, lazy loading, compressed assets, capped pixel ratio, and a useful DOM-first fallback.

### Motion accessibility risk

Mitigation: reduced-motion mode from the beginning, not as a final patch; no essential meaning encoded only in animation.

### Scope risk

Mitigation: build the resident submission and staff status workflow first. Defer advanced analytics and complex 3D interactions until the core civic loop is stable.

### Privacy risk

Mitigation: public read models, generalized locations, explicit visibility choices, RLS tests, and private attachment policies.

### Realtime consistency risk

Mitigation: local optimistic updates for the writer, cache invalidation after mutations, reconnect handling, and focused subscriptions.

### Institutional trust risk

Mitigation: explain statuses, response expectations, moderation rules, and limitations in the product itself.

## 8. Definition of done

The first complete release is done when:

- a resident can discover the purpose of the site;
- a resident can authenticate and submit a suggestion;
- drafts and privacy choices work as described;
- public users can explore suggestions and status history;
- staff can review, update status, and publish an official response;
- moderation and audit behavior exists for user-generated content;
- core community interactions and notifications are functional;
- all primary routes have 3D animation plus accessible fallback;
- reduced-motion and mobile experiences are intentionally designed;
- Supabase access policies prevent unauthorized data access;
- project documentation is kept aligned with implementation.
