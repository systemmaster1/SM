
/* =====================================================================
   SYSTEMMASTER MASTER DESIGN SYSTEM — PHASE 10A
   Append this file at the END of app/globals.css.
   No existing selectors are removed; this normalizes typography,
   spacing, radii, buttons, inputs, cards, focus and responsive rhythm.
   ===================================================================== */

:root {
  /* Brand */
  --sm-navy-950: #06101f;
  --sm-navy-900: #071326;
  --sm-navy-850: #0a1830;
  --sm-blue-600: #2f74e8;
  --sm-blue-500: #4f91ff;
  --sm-gold-500: #e5a93c;
  --sm-gold-400: #f2c45f;
  --sm-green-500: #10d99a;

  /* Typography */
  --font-display: "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Inter", "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: clamp(1.45rem, 2vw, 1.75rem);
  --text-3xl: clamp(1.85rem, 3vw, 2.35rem);
  --text-4xl: clamp(2.25rem, 4vw, 3.15rem);
  --text-5xl: clamp(2.8rem, 5.7vw, 4.55rem);
  --text-hero: clamp(3.05rem, 6.4vw, 5.8rem);

  /* Spacing rhythm */
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-28: 7rem;
  --space-32: 8rem;

  /* Radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 22px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  /* Elevation */
  --shadow-sm: 0 6px 20px rgba(0,0,0,.14);
  --shadow-md: 0 16px 44px rgba(0,0,0,.22);
  --shadow-lg: 0 28px 90px rgba(0,0,0,.34);
  --shadow-blue: 0 12px 34px rgba(47,116,232,.20);
  --shadow-gold: 0 12px 34px rgba(229,169,60,.20);

  /* Motion */
  --ease-premium: cubic-bezier(.2,.8,.2,1);
  --ease-snappy: cubic-bezier(.22,1,.36,1);
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 480ms;
}

/* ---------------------------------------------------------------------
   GLOBAL TYPOGRAPHY
   --------------------------------------------------------------------- */

html {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
  letter-spacing: -.008em;
}

.display,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  text-wrap: balance;
}

h1 {
  font-size: var(--text-5xl);
  line-height: 1.04;
  letter-spacing: -.045em;
  font-weight: 850;
}

h2 {
  font-size: var(--text-4xl);
  line-height: 1.09;
  letter-spacing: -.035em;
  font-weight: 820;
}

h3 {
  font-size: var(--text-2xl);
  line-height: 1.18;
  letter-spacing: -.025em;
  font-weight: 780;
}

p {
  text-wrap: pretty;
}

.muted {
  line-height: 1.72;
}

/* Existing very large utility headings should remain responsive but
   no longer dominate smaller laptop screens. */
.text-\[clamp\(2\.8rem\,6vw\,5\.4rem\)\],
.text-\[clamp\(2\.8rem\,6vw\,5\.3rem\)\],
.text-\[clamp\(2\.8rem\,6vw\,5\.2rem\)\] {
  line-height: 1.03 !important;
  letter-spacing: -.045em !important;
}

/* ---------------------------------------------------------------------
   CONTAINERS + SECTION RHYTHM
   --------------------------------------------------------------------- */

.container {
  width: min(1280px, calc(100% - 40px));
  margin-inline: auto;
}

.section {
  padding-block: clamp(4.75rem, 7.5vw, 7.5rem);
}

.section + .section {
  position: relative;
}

.section-heading {
  max-width: 800px;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.eyebrow {
  min-height: 30px;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--line));
  border-radius: var(--radius-pill);
  padding: .42rem .78rem;
  background: color-mix(in srgb, var(--primary) 7%, transparent);
  font-size: .72rem;
  line-height: 1;
  font-weight: 850;
  letter-spacing: .13em;
  text-transform: uppercase;
}

/* ---------------------------------------------------------------------
   CARDS / GLASS
   --------------------------------------------------------------------- */

.card {
  border-radius: var(--radius-lg);
  border-color: color-mix(in srgb, var(--line) 88%, transparent);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--duration-base) var(--ease-premium),
    border-color var(--duration-base) ease,
    box-shadow var(--duration-base) ease,
    background-color var(--duration-base) ease;
}

@media (hover:hover) {
  .card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--primary) 22%, var(--line));
    box-shadow: var(--shadow-md);
  }
}

.sm-glass {
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px) saturate(130%);
  -webkit-backdrop-filter: blur(20px) saturate(130%);
}

/* ---------------------------------------------------------------------
   BUTTON SYSTEM
   --------------------------------------------------------------------- */

.btn {
  min-height: 46px;
  border-radius: var(--radius-pill);
  padding-inline: 1.15rem;
  gap: .5rem;
  font-family: var(--font-display);
  font-size: .88rem;
  line-height: 1;
  font-weight: 780;
  letter-spacing: -.015em;
  transition:
    transform var(--duration-fast) var(--ease-premium),
    box-shadow var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    background-color var(--duration-fast) ease,
    color var(--duration-fast) ease;
}

.btn-primary {
  box-shadow: var(--shadow-blue);
}

.btn-gold {
  box-shadow: var(--shadow-gold);
}

@media (hover:hover) {
  .btn:hover {
    transform: translateY(-2px);
  }
}

.btn:active {
  transform: translateY(0) scale(.985);
}

/* ---------------------------------------------------------------------
   FORM SYSTEM
   --------------------------------------------------------------------- */

.form-control,
input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
  font-family: var(--font-body);
}

.form-control {
  min-height: 50px;
  border-radius: var(--radius-md);
  font-size: .94rem;
}

textarea.form-control {
  line-height: 1.6;
}

/* ---------------------------------------------------------------------
   FOCUS / ACCESSIBILITY
   --------------------------------------------------------------------- */

:where(a,button,input,select,textarea,summary):focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary) 48%, transparent);
  outline-offset: 3px;
}

summary {
  border-radius: var(--radius-md);
}

/* ---------------------------------------------------------------------
   PROFESSIONAL CONTENT WIDTH
   --------------------------------------------------------------------- */

.sm-copy {
  max-width: 720px;
}

.sm-copy-lg {
  max-width: 860px;
}

.sm-kicker {
  color: var(--gold);
  font-size: var(--text-xs);
  font-weight: 850;
  letter-spacing: .13em;
  text-transform: uppercase;
}

/* ---------------------------------------------------------------------
   RESPONSIVE NORMALIZATION
   --------------------------------------------------------------------- */

@media (max-width: 1024px) {
  .container {
    width: min(100% - 32px, 960px);
  }

  .section {
    padding-block: clamp(4rem, 7vw, 6rem);
  }
}

@media (max-width: 640px) {
  .container {
    width: calc(100% - 24px);
  }

  .section {
    padding-block: 4rem;
  }

  h1 {
    font-size: clamp(2.45rem, 13vw, 3.65rem);
  }

  h2 {
    font-size: clamp(2rem, 10vw, 2.85rem);
  }

  h3 {
    font-size: clamp(1.35rem, 7vw, 1.75rem);
  }

  .btn {
    min-height: 46px;
  }

  .card {
    border-radius: 19px;
  }

  .eyebrow {
    font-size: .66rem;
    letter-spacing: .105em;
  }
}

/* ---------------------------------------------------------------------
   REDUCED MOTION
   --------------------------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }

  .card:hover,
  .btn:hover {
    transform: none !important;
  }
}
