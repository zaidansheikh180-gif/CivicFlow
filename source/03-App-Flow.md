# Digital Suggestion Box for Local Governance

## Application Flow

## 1. Experience principles

1. **Welcome before asking** — explain the civic purpose before presenting a form.
2. **One clear next step** — each view should make the next action obvious.
3. **Visible progress** — show where a suggestion is in its lifecycle.
4. **Public by design, private by default** — make visibility choices understandable.
5. **Motion supports meaning** — 3D animation should guide attention, not compete with content.
6. **No dead ends** — every empty, loading, error, and unsupported state offers a recovery path.

## 2. Primary resident flow

```text
Landing
  -> Learn how it works
  -> Explore community suggestions
  -> Start a suggestion
       -> Choose category
       -> Describe the idea
       -> Add place / neighborhood
       -> Review privacy and visibility
       -> Sign in or create an account
       -> Submit
       -> Confirmation and status timeline
  -> Follow suggestions
  -> View resident dashboard
```

## 3. Landing flow

### Entry

The landing experience introduces Digital Suggestion Box as a civic participation space. The main calls to action are to share an idea and explore what the community is discussing.

### Motion behavior

- The scene establishes a recognizable civic environment.
- Ambient motion communicates that the community is active.
- The primary action receives a purposeful, not distracting, spatial emphasis.
- Scroll or pointer movement may shift perspective subtly.
- Reduced-motion mode replaces camera choreography with gentle fades and static scene landmarks.

### Exit paths

- Start a suggestion.
- Explore suggestions.
- Read the process and privacy explanation.
- Sign in.

## 4. Explore flow

```text
Explore
  -> Search or select a filter
  -> Browse results
  -> Switch list / spatial view
  -> Open suggestion detail
       -> Read description and status
       -> View official responses
       -> Support or follow
       -> Comment or report
       -> Return to results
```

### Empty state

Explain that no suggestions match the current filters and offer to clear filters or start a new suggestion.

### Loading state

Preserve the scene and show content placeholders that maintain layout stability.

### Error state

Keep the query visible and offer a retry without resetting the user’s filters.

## 5. Suggestion creation flow

```text
Start a suggestion
  -> Intro / guidance
  -> Step 1: Idea
  -> Step 2: Place
  -> Step 3: Visibility
  -> Step 4: Review
  -> Sign in / create account if required
  -> Submit
  -> Success
```

### Step 1: Idea

Collect title, description, category, and optional supporting context. Offer examples without steering the resident toward a particular political outcome.

### Step 2: Place

Allow the resident to choose a neighborhood or locality and optionally identify a map location. The interface should explain whether the exact location will be public.

### Step 3: Visibility

Explain the difference between:

- public suggestion;
- public suggestion with private contact information; and
- private submission visible only to authorized staff.

### Step 4: Review

Show a readable summary, validation messages, attachment list, and visibility choice. Allow the resident to go back without losing input.

### Save draft

Authenticated residents can save at any step. The system should confirm the saved state and make the draft available from the resident dashboard.

### Submission success

Show:

- confirmation;
- reference identifier;
- initial status;
- expected next step;
- link to the suggestion detail, if public; and
- option to follow updates.

## 6. Authentication flow

```text
Protected action
  -> Sign in
       -> Success -> return to interrupted action
       -> Failure -> explain and retry
  -> Create account
       -> Verify email if enabled
       -> Return to interrupted action
```

The app should preserve a pending suggestion draft or intended action across authentication. Do not require a resident to re-enter a long description.

## 7. Resident dashboard flow

```text
Dashboard
  -> View submissions
       -> Filter drafts / active / completed
       -> Open detail
  -> Continue draft
  -> View followed suggestions
  -> Manage notifications
  -> Manage profile and privacy
```

The dashboard should distinguish resident-owned content from followed public content.

## 8. Suggestion detail flow

```text
Suggestion detail
  -> Read summary
  -> View lifecycle timeline
  -> View community support
  -> View official responses
  -> Follow
  -> Support
  -> Comment
  -> Report
```

Official responses and status changes should be visually distinct from resident comments. The page should communicate when data was last updated.

## 9. Staff flow

```text
Staff dashboard
  -> Review metrics and recent activity
  -> Open suggestion queue
       -> Filter and sort
       -> Open suggestion
            -> Review content and reports
            -> Assign category / owner
            -> Change status
            -> Request more information
            -> Publish official response
            -> Return to queue
```

### Staff transition safeguards

- Explain the consequence of changing a public status.
- Require confirmation for destructive moderation actions.
- Keep a reason for hidden, rejected, or closed content.
- Record the actor and timestamp for every staff action.

## 10. Moderation flow

```text
Report submitted
  -> Queue item created
  -> Moderator reviews content and report
       -> Dismiss report
       -> Hide content
       -> Request edit
       -> Escalate
  -> Action recorded
  -> Reporter receives appropriate outcome message
```

Moderation outcomes must not expose private reporter information.

## 11. Notification flow

```text
Meaningful change
  -> Notification created
  -> Resident notification center
  -> Open linked suggestion
  -> Mark read
```

If delivery fails, the in-app notification remains the source of truth. Residents should be able to mute non-essential notifications.

## 12. 3D navigation model

The 3D environment should reinforce orientation:

- the landing state acts as the civic gateway;
- exploration focuses on a community view;
- a suggestion detail focuses on one civic marker or location;
- staff views shift toward an organized operations context;
- transitions retain a sense of place where possible.

The DOM must remain the authoritative navigation structure. The scene is a visual companion, not the only route map.

## 13. System states

Every primary route must define:

- first-load state;
- loading state;
- partial-data state;
- empty state;
- validation state;
- permission-denied state;
- session-expired state;
- network failure state;
- reduced-motion state; and
- WebGL unavailable state.
