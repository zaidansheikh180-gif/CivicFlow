# Digital Suggestion Box for Local Governance

## Product Requirements Document

## 1. Product overview

Digital Suggestion Box is an academic civic-technology project that gives residents a clear, approachable way to share ideas, concerns, and local improvement proposals with their municipality. It turns an otherwise static feedback form into a living civic space where people can submit suggestions, understand what happens next, and see community priorities represented visually.

The experience is intended to feel public, trustworthy, and human. Every page should be a 3D-animated web experience with beautiful motion, spatial components, and meaningful interaction rather than a collection of flat administrative screens.

## 2. Problem statement

Residents often do not know:

- where to send local suggestions;
- whether their feedback was received;
- how a suggestion is reviewed;
- what issues matter most to the wider community; or
- whether public input leads to action.

Local governance teams also need a structured, transparent channel for collecting and organizing resident input without losing the context or sentiment behind each submission.

## 3. Goals

### Resident goals

- Submit a local suggestion without unnecessary friction.
- Understand the status and lifecycle of a submission.
- Discover existing suggestions and avoid duplicate ideas.
- Support, discuss, or follow issues that matter to them.
- See aggregate community priorities in an understandable form.
- Feel that participation is safe, respectful, and worthwhile.

### Governance goals

- Receive structured, searchable suggestions.
- Categorize, triage, and update suggestion statuses.
- Communicate progress publicly.
- Identify recurring themes and high-support proposals.
- Maintain a transparent record of responses and decisions.

### Academic goals

- Demonstrate how interaction design can improve civic participation.
- Explore 3D storytelling as an interface for public-service technology.
- Model a realistic end-to-end civic feedback workflow.
- Keep the system modular enough for future research and iteration.

## 4. Non-goals

- Replacing formal public consultation, elections, or legally required notices.
- Guaranteeing that every suggestion will be implemented.
- Providing emergency services or urgent incident response.
- Making private resident data publicly visible.
- Building a fully deployed municipal case-management system in the first release.

## 5. Users and roles

### Guest resident

Can browse public suggestions, view statuses, explore community insights, and begin submitting an idea.

### Registered resident

Can submit suggestions, edit drafts, follow suggestions, vote or support where enabled, comment, and view their own activity.

### Moderator

Can review reported or pending submissions, manage categories, hide abusive content, and communicate moderation decisions.

### Local governance staff

Can triage suggestions, change status, add official responses, assign internal ownership, and review aggregate insights.

### Administrator

Can manage users, roles, categories, configurable statuses, site settings, and audit information.

## 6. Core user stories

- As a resident, I want to submit an idea in a few clear steps so that sharing feedback does not feel like paperwork.
- As a resident, I want to attach a location or neighborhood so that the issue can be understood in context.
- As a resident, I want to see whether my suggestion is received, under review, planned, or completed.
- As a resident, I want to find similar suggestions so that I can support an existing proposal instead of duplicating it.
- As a resident, I want to follow a suggestion so that I can receive updates without repeatedly checking the site.
- As a staff member, I want to filter suggestions by category, status, location, and support so that I can prioritize work.
- As a staff member, I want to publish a response and status update so that residents can see what the municipality is doing.
- As a moderator, I want a review queue so that harmful or inappropriate content does not become public automatically.
- As an administrator, I want an audit trail so that important changes remain accountable.

## 7. Product surface

### Public experience

- Landing / civic gateway
- Explore suggestions
- Suggestion detail
- Community insights
- About and process explanation
- Public status and response views

### Resident experience

- Sign in / account creation
- Resident profile
- Create suggestion
- Drafts and submissions
- Followed suggestions
- Notifications

### Governance experience

- Staff dashboard
- Suggestion review queue
- Suggestion management
- Official response editor
- Category and status management
- Analytics and insights
- Moderation queue

## 8. Functional requirements

### FR-01: Suggestion submission

The system shall allow a resident to submit:

- title;
- detailed description;
- category;
- neighborhood or locality;
- optional map location;
- optional attachments;
- optional contact preference; and
- consent and visibility choice.

The system shall validate required fields and display a clear confirmation after successful submission.

### FR-02: Drafts

Authenticated residents shall be able to save a partially completed suggestion and return to it later.

### FR-03: Suggestion lifecycle

Each suggestion shall have a visible public status, such as:

1. Draft
2. Submitted
3. Under review
4. Needs more information
5. Planned
6. In progress
7. Completed
8. Closed

Status changes shall be timestamped and attributable to an authorized staff member or system action.

### FR-04: Discovery

Residents shall be able to search and filter public suggestions by text, category, status, locality, and recency. Results should support both an accessible list representation and a spatial or visual representation.

### FR-05: Community participation

Where enabled by the municipality, authenticated residents shall be able to support suggestions, comment on them, and follow their updates. Rate limits and moderation controls are required.

### FR-06: Official responses

Authorized staff shall be able to publish a response, attach references, and connect the response to a status update.

### FR-07: Moderation

The system shall support reports, review queues, content visibility controls, and an audit trail for moderation actions.

### FR-08: Insights

The system shall present aggregate, non-identifying insights such as:

- suggestions by category;
- suggestions by status;
- recent activity;
- most-supported themes;
- geographic distribution at a privacy-safe level; and
- completion or response rates.

### FR-09: Notifications

Residents who follow a suggestion shall be able to receive notifications for meaningful status changes and official responses. Notification preferences shall be configurable.

### FR-10: Responsive 3D experience

All user-facing pages shall use a consistent animated 3D visual language. The experience must remain usable on mobile devices, respect reduced-motion preferences, and provide accessible fallbacks for interactions that rely on depth or movement.

## 9. Trust, privacy, and accessibility

- Explain how submissions are reviewed and what public visibility means.
- Never expose private contact details in public views.
- Provide keyboard navigation and visible focus states.
- Provide semantic labels for controls and form fields.
- Provide reduced-motion behavior through `prefers-reduced-motion`.
- Do not rely on color, animation, or spatial position alone to communicate state.
- Use privacy-safe aggregation for maps and insights.
- Provide clear reporting and moderation routes.
- Make errors actionable and preserve user-entered form data where possible.

## 10. Success criteria

### Experience success

- A first-time resident can understand the product and begin a suggestion quickly.
- A resident can complete a valid submission without confusion.
- A resident can find the status and history of a public suggestion.
- Staff can triage and update a suggestion efficiently.
- 3D motion adds orientation and delight without blocking task completion.

### Academic success

- The project demonstrates a coherent civic workflow from submission to resolution.
- The 3D layer is meaningful, consistent, and technically maintainable.
- Data, roles, and statuses are explicit enough to support evaluation.
- The design supports future usability research and iteration.

## 11. Release phases

### Phase 1: Foundation

- Project setup and design system
- Authentication and roles
- Public landing experience
- Suggestion creation and browsing
- Core status lifecycle

### Phase 2: Participation

- Support / vote behavior
- Comments and reports
- Following and notifications
- Similar-suggestion discovery

### Phase 3: Governance

- Staff dashboard
- Moderation queue
- Official responses
- Category and status administration
- Audit trail

### Phase 4: Insights and refinement

- Community insights
- Privacy-safe geographic views
- Performance optimization
- Accessibility audit
- Usability evaluation

## 12. Open questions

- Which municipality or locality will be used for the academic case study?
- Are support counts intended to be binding, advisory, or purely illustrative?
- Which suggestion fields are public by default?
- Which notification channels are in scope for the first implemented release?
- Should the 3D scene represent a real location or an abstract civic landscape?
- What moderation and retention policies should be applied to attachments?
