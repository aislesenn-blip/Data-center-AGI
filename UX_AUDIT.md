# Deep UX Audit: First Four Screens

This audit evaluates the Home, Route Selection, Fare Selection, and Finding screens against world-class mobility standards (Uber, Bolt, Apple).

## 1. Home Screen
- **Transitions:** Fade transitions currently used for sub-elements are slightly robotic. Needs subtle spring physics.
- **Layout Review:**
  - *Critique:* The "Anything on campus, delivered faster." badge was changed to a plain gray/white box. It lost its visual hierarchy and premium feel.
  - *Fix:* Restore the Indigo/Blue premium gradient/accent styling similar to Bolt's promotional badges.
- **Responsiveness:** Tap targets for the large CTA cards (I Need Something / Send Something) are good, but the Framer Motion tap scale (0.95) might feel a bit sluggish if damping isn't tuned.

## 2. Screen 2 (Route Selection / "I Need Something")
- **Transitions:** Currently uses a `y: 50` slide up. It feels a bit detached. Should use a standard modal slide-in from the right or a full vertical cover with faster spring physics.
- **Keyboard Behavior:**
  - *Critique:* The input fields use auto-focus, meaning the keyboard pops up immediately. If the container isn't mapped to `h-[100dvh]`, the keyboard can push the bottom "Continue" CTA off-screen or cover it.
  - *Fix:* Enforce strict `h-[100dvh]` flex wrappers with `pb-[env(safe-area-inset-bottom)]`. Ensure the CTA sticks to the top of the keyboard naturally.
- **Layout Review:** The helper text spacing was fixed, but the overall spacing between "Where from" and "Deliver to" could use tighter visual grouping.

## 3. Screen 3 (Fare Selection)
- **Bottom Sheet Elasticity:**
  - *Critique:* The bottom sheet is implemented with `h-[115%]` and `drag="y"`. While this allows for dragging, it feels overly complex for a selection screen where the user just needs to tap and confirm. Furthermore, without exact snap points (`onDragEnd` logic can feel floaty), it doesn't match Uber's rigid but elastic snap physics.
  - *Fix:* Refine `dragConstraints`, adjust `stiffness: 400, damping: 30` to make it feel instantly attached to the finger. Or, remove dragging entirely if it's meant to be a fixed state, relying instead on map framing above it.
- **Layout Review:** The "Confirm Delivery" CTA needs to be absolutely rock-solid at the bottom, unaffected by the drag state unless the sheet is dismissed.
- **Screen Transitions:** Cross-fading into Fare Selection is jarring. It should either slide in from the bottom or map UI should seamlessly animate while the sheet rises.

## 4. Screen 4 (Finding Runner)
- **Transitions:** Uses basic opacity fade. Should feel like an immersive state change. The map needs to take focus.
- **Layout Review:** The finding state has a mock cancel button that sits at the bottom. The visual weight is too low compared to the gravity of requesting a ride/delivery.
- **Responsiveness:** Needs a pulsing/radar animation to indicate active system work (network request simulation).

## Summary of Actionable Fixes
1. **Restore Indigo Badge:** Bring back the `#EEF2FF` / `#4F46E5` premium styling to the Home banner.
2. **Refine Framer Motion Physics:** Update all transitions to use `type: "spring", damping: 25, stiffness: 300, mass: 0.8` uniformly to match iOS/Uber fluidity.
3. **Keyboard/Viewport Lock:** Apply strict `100dvh` flex-column layouts for form screens to ensure CTAs ride the keyboard.
4. **Bottom Sheet Snapping:** Tune the drag mechanics on the Fare Selection sheet to feel tactile and snappy.
