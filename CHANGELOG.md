# Changelog

## [1.1.0] - 2026-03-07

### ✨ New Features
* **Repeating 10-Minute Break Alerts**: Replaced the single-alert system with a persistent modulo-based loop (`sessionSeconds % 600`), ensuring users are reminded to take a break every 10 minutes throughout their entire browsing session.
* **Modern Glassmorphism UI**: Introduced a custom-styled, semi-transparent "Glass" alert card with `backdrop-filter: blur(16px)` instead of the standard browser alert for a more professional look.
* **Interactive Alert Controls**: Added a "Got it, thanks!" dismissal button to the new alert cards, allowing users to manually close reminders.
* **Manual Session Reset**: Added a "Reset" button in the popup interface, giving users full control to clear their tracked time whenever they choose without restarting the browser.

### 🎨 Design & UI
* **Entry Animation**: Implemented a CSS `@keyframes slideIn` animation so that new alerts smoothly slide into the viewport from the right side.
* **Live Status Indicator**: Added an animated, pulsing "live-dot" to the timer pill to provide immediate visual feedback that the tracking session is active.
* **Responsive Styling**: Refined the popup button layout to be more user-friendly and visually balanced.

### 🛠️ Technical Improvements
* **Logic Optimization**: Optimized the `setInterval` loop to handle both time tracking and the new repeating alert condition efficiently.
* **State Persistence**: Ensured the theme (Light/Dark) persists correctly across sessions by updating the `popup.js` initialization logic.
