# Digital Suggestion Box for Local Governance

## UI/UX Design Brief

## 1. Design intent

Create a memorable civic web experience that feels like entering a living model of a community. It should combine the clarity and trust expected from a public service with the wonder of an interactive 3D world. The design must make participation feel approachable, consequential, and respectful.

All pages should use beautiful 3D animation and carefully choreographed components. Motion should create a sense of continuity between civic stories, suggestion states, and user actions, while every essential task remains clear in semantic interface elements.

## 2. Audience

### Primary

- Residents with varying levels of digital confidence.
- People who want to suggest practical improvements to their locality.
- Residents browsing on mobile devices.

### Secondary

- Local government staff and moderators.
- Academic reviewers evaluating civic participation and interaction design.

## 3. Emotional goals

The experience should feel:

- welcoming rather than bureaucratic;
- optimistic without making promises;
- transparent rather than surveillant;
- active rather than noisy;
- civic without becoming institutional or cold;
- polished enough to invite exploration; and
- calm enough for people to read, reflect, and submit thoughtfully.

## 4. Visual language

The visual system should derive its palette, forms, and materials from civic life: public spaces, neighborhoods, maps, wayfinding, shared infrastructure, sunlight, community notices, and local landmarks. Avoid generic startup-dashboard styling.

Use a deliberate, memorable color direction. Calm should mean restful color and confident contrast, not a gray or white interface with no personality.

### Spatial qualities

- Layered depth should separate context, content, and action.
- Civic landmarks can act as visual anchors.
- Paths, lines, and markers can communicate relationships and progress.
- Materials should feel intentional and coherent across scenes.
- Decorative complexity must never obscure text or controls.

## 5. 3D experience direction

### Shared world

Consider a shared abstract civic landscape that can hold public places, suggestion markers, progress signals, and community activity. The world should be recognizable enough to create orientation but abstract enough to avoid claiming to represent a real municipality without consent.

### Page transitions

Transitions should feel like moving through one connected civic environment. Prefer:

- camera easing between focal points;
- objects assembling or separating to reveal context;
- markers responding to selection;
- gentle depth and parallax;
- timeline-driven status changes; and
- restrained ambient movement.

Avoid:

- motion that delays form entry;
- forced camera movement that causes discomfort;
- objects that look clickable but are not;
- visual noise behind long-form content; and
- animation that continues indefinitely after the user has moved on.

### Reduced motion

When reduced motion is enabled:

- remove camera travel and continuous rotations;
- use opacity and small positional changes only where safe;
- keep scene composition static;
- preserve all content and interaction affordances;
- avoid flashing, rapid scaling, or depth-dependent cues.

## 6. Layout and hierarchy

The page composition should make the current civic task obvious. Use strong hierarchy for:

1. the page’s purpose;
2. the primary action;
3. important state or status;
4. supporting context; and
5. secondary actions.

Content containers should maintain readable line length over the 3D background. Dense information, such as status history or staff queues, should have a clear reading mode that can minimize or quiet the scene.

## 7. Component guidance

### Navigation

Navigation should expose the major resident routes without requiring the user to understand the 3D world. Active route state must be visible in text and not only through animation.

### Buttons

Primary buttons should feel inviting and substantial. Hover, focus, pressed, and disabled states should be distinct. Do not use animation as the only indication that an action occurred.

### Cards and panels

Panels should feel anchored in the scene and remain highly legible. Use depth, lighting, or subtle material changes to establish hierarchy, but preserve sufficient contrast.

### Suggestion markers

Markers can represent public suggestions, categories, or status. They need a legend or text equivalent and should not rely on small targets for core actions.

### Forms

Forms should be broken into digestible steps when content is long. Show progress, preserve input, describe privacy decisions in plain language, and provide an accessible summary of errors.

### Status timeline

Use a clear chronological representation for suggestion progress. Every status should include a text label, date or relative time where appropriate, and an explanation when the transition requires context.

### Notifications

Notifications should be calm and actionable. Distinguish unread state from urgency and avoid interrupting the user for non-essential information.

## 8. Content direction

Use plain, direct language:

- “Share an idea”
- “Explore suggestions”
- “Under review”
- “A response from the council”
- “Choose what becomes public”

Explain civic process terms the first time they appear. Avoid legalistic or institutional language unless required, and provide a short explanation alongside it.

## 9. Accessibility requirements

- Use a semantic DOM structure for page content.
- Provide visible focus indicators.
- Keep text readable against the scene at all times.
- Ensure touch targets are large enough for mobile use.
- Provide labels and instructions before inputs.
- Announce validation and submission results appropriately.
- Support keyboard access to all functional controls.
- Provide a 2D or static equivalent for 3D-only visualizations.
- Test with reduced motion and high zoom.

## 10. Responsive behavior

### Mobile

- Treat the 3D scene as a controlled backdrop or focused viewport.
- Prioritize content and actions over decorative depth.
- Avoid requiring drag gestures for navigation.
- Use concise panels and progressive disclosure.

### Tablet

- Allow scene and content to share the frame while preserving readable widths.
- Support touch-friendly exploration and filters.

### Desktop

- Use depth and spatial composition more fully.
- Provide richer scene transitions and side-by-side context where appropriate.
- Keep primary actions within comfortable reach and keyboard order.

## 11. Motion and interaction details

Invest in:

- staggered entrances for meaningful groups;
- satisfying completion feedback;
- intentional hover and focus responses;
- scene markers that gently acknowledge selection;
- smooth filter changes;
- thoughtful empty states; and
- transitions that preserve orientation.

Animation timing should be consistent, interruptible, and cleaned up when a component leaves the screen.

## 12. Design deliverables for implementation

- Tokenized color, spacing, type, radius, and elevation system.
- Route-level wireframes and high-fidelity screens.
- Shared 3D scene and landmark inventory.
- Motion map for route transitions and action feedback.
- Responsive behavior notes for all primary routes.
- Reduced-motion and WebGL fallback states.
- Accessibility annotations for forms, status, maps, and interactive markers.
- Asset provenance and optimization notes.

## 13. Evaluation questions

- Can a new visitor explain what the site does within a few seconds?
- Can a resident tell what will happen after submitting?
- Does 3D improve orientation or merely decorate the page?
- Can users complete the core flow with reduced motion?
- Are staff views efficient enough for repeated use?
- Does the visual language communicate public trust without feeling sterile?
