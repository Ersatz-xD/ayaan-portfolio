# AYAAN.KHAN // PORTFOLIO v2.0

**Cyber-Stealth CS & AI Engineering Showcase**

> A production-grade, scroll-driven portfolio web application architected for **Ayaan Ahmed Khan** (Myself). Computer Science undergraduate at COMSATS University Islamabad, Wah Campus (BCS '27) and Full-Stack / AI Engineer.
>
>

---

## Overview & Architectural DNA

This repository houses the second-generation (**v2.0**) personal portfolio and systems archive for Ayaan Ahmed Khan. Moving away from traditional static HTML/CSS/JS, this build leverages a type-safe single-page architecture with GPU-accelerated rendering, blend-mode HUD overlays, zero-backend client-side interactivity, and a fully theme-aware light/dark rendering pipeline.

### Core Design Philosophy: *"Cyber-Stealth"*

* **Light-First, Dark-Capable:** Ships in **light mode by default** — a soft off-white/warm-grey foundation (`#F3F1EE` / `#E8E6E2`) — with a one-click switch to a charcoal dark mode (`#1E1E1E` / `#262626`). Every surface, border, and glass panel is driven by CSS custom properties (`--bg`, `--panel`, `--overlay-rgb`, `--panel-rgb`, `--bg-rgb`) rather than hardcoded colors, so nothing is theme-locked.
* **Signature Red Accent (`#FF3B4E` / `#C81E3A`):** Focused cybernetic accents, edge glows, and active states — consistent across both themes.
* **Animated Theme Toggle:** A sun-icon control in the navbar morphs into a quarter-moon on click (rotate/scale/fade cross-morph), while the whole page cross-fades every color-bearing surface in ~500ms via a temporary global transition class.
* **Theme-Aware HUD Overlays:** Fixed headers, floating navigation menus, and system readout badges use blend modes and glass-panel transparency tuned per theme so contrast holds up on both the dark and light backgrounds.
* **Zero Cookie-Cutter Grids:** Replaces uniform card layouts with asymmetric editorial features, connected multi-column timelines, and custom CSS/SVG wireframe UI clusters.

---

## Tech Stack

| Component | Technology | Version / Specification | Architectural Purpose |
| --- | --- | --- | --- |
| **Core Framework** | React + TypeScript | `19.0.0` / `5.7.0` | Reusable, type-safe component architecture |
| **Build & Tooling** | Vite | `6.x` | Sub-millisecond HMR and optimized bundler |
| **Styling Engine** | Plain CSS + CSS Custom Properties | — | Per-component stylesheets driven by a shared theme-variable system (no Tailwind) |
| **Scroll Animation** | GSAP + ScrollTrigger | `3.15.0` | Pinned panel animations, line-drawing, and scroll math |
| **UI Transitions** | Framer Motion | `12.0.0` | Smooth modal drawers and HUD component entrances |
| **Typography** | Inter & Inter Tight | `-0.03em` to `-0.04em` | Crisp editorial headings and monospace terminal readouts |

---

## Light / Dark Theme System

* **Default:** Light mode on first visit; the user's choice is persisted to `localStorage` and restored on return.
* **Toggle:** A circular button in the navbar (visible at every breakpoint, including collapsed mobile nav) swaps a sun icon for a quarter-moon icon with a rotate/scale/opacity cross-morph.
* **Site-Wide Transition:** Switching themes briefly applies a global `.theme-transitioning` class that forces `background-color`, `color`, `border-color`, `box-shadow`, `fill`, and `stroke` transitions on every element, then removes itself — giving a smooth cross-fade instead of an abrupt flip, without permanently altering any component's own hover transitions.
* **Theme-Aware Assets:** The Hero section's character illustration swaps source images per theme (`nightwing.png` / `nightwing-reveal.png` for dark, `nightwing-light.png` / `nightwing-reveal-light.png` for light), and drop-shadows / text-shadows are tuned separately per theme so dark-mode glows don't render as a muddy halo on the light background.
* **Cursor-Reactive Reticle:** The canvas-drawn crosshair reticle that follows the pointer on the Hero and Education sections switches `mix-blend-mode` from `screen` (dark mode, for a glow effect) to `normal` (light mode, so it stays visible instead of washing out to white).

---

## Key Features & Layout Architecture

### 01 // The Hero Section (`#hero`)

* **Staggered Cybernetic Splash:** 10-panel vertical slide-out animation with accent-red border highlights.
* **Dual-Layer X-Ray Scanner:** Uses a native, GPU-rendered CSS `radial-gradient` mask driven by LERP-smoothed CSS variables (`--mx`, `--my`, `--fx`, `--fy`). As the mouse moves across the base stealth suit/grid, it dynamically reveals an illuminated AI network layer underneath, with theme-matched character art.
* **Word-Reveal Typography:** Automated word tokenization with staggered blur-to-focus entry physics.
* **Live Readouts:** Real-time snapshot metrics (`15 Projects shipped`, `03 Years building`, `40+ Tools & frameworks`).

### 02 // Academic Standing & Education (`#education`)

* **Editorial Numbered Badges:** Oversized index styling (`02 //`) paired with two-tone headings (`"Education // Background"`).
* **Vertical Interactive Timeline:** Glowing accent-red timeline bar with pulsing circular nodes that illuminate (`opacity: 0 -> 1`, `scale: 0.8 -> 1`) on scroll, highlighting a **3.94 / 4.00 SGPA** and **1st Position Merit Certificate**.

### 03 // Engineering & Industry Experience (`#experience`)

* **3-Column Connected Horizontal Timeline:** A glowing accent-red line connecting milestone nodes across the screen (collapsing to a clean vertical timeline on mobile `<1024px`).
* **Featured Roles:** Highlights industry work including **Data Science Intern at 10Pearls (Shine Program)**, **Frontend Lead Intern at ACM CUI Wah Chapter**, and **Graphics Lead at COMSATS Literary Society (CLS)**.

### 04 // Systems & AI Projects Showcase (`#projects`)

* **Asymmetric Alternating Feature Rows:** Replaces repeating boxes with an editorial showcase where odd and even rows alternate typography columns and preview frames.
* **Real Screenshot Galleries:** Projects with captured screenshots render through a swipeable, dot-indicator gallery component; projects without screenshots fall back to multi-layered glassmorphic CSS/SVG mockups (e.g., RAG vector embedding charts, TreeSHAP explainability bars, and compiling terminal consoles).
* **Featured Systems:** Showcases **Prof GPT** (96% Precision@3), **Pearl AQI Engine** (72-Hour MLOps Pipeline), **BroBroke** (MERN Expense Tracker), **EduGate Pakistan**, and **Auth2X** (OpenCV Biometrics).

### 05 // Honors & Credentials Archive (`#awards` / `/credentials`)

* **Trophy Room Showcase:** Glowing achievement cards for **CODEZAAR Programming Champion (YOTA '25)**, **GDG Intra-University Hackathon Winner**, and **COMBITS '25 Speed Coding Runner-Up**.
* **Interactive Split-Screen Preview:** Hovering over horizontal-ruled list items dynamically renders their corresponding certificate or trophy image in a sticky glassmorphism frame on the right.

### 06 // Terminal Dispatch Hub (`#contact` / `/contact`)

* **Zero-Backend Communication:** Completely eliminates web forms in favor of an interactive "Dispatch Hub" — mailto/tel links with click-to-copy, no server round-trip.
* **Click-to-Copy & Mailto Protocols:** Instant clipboard copying for `aayan.shazim@gmail.com` and direct anchor routing to **GitHub ([github.com/Ersatz-xD](https://github.com/Ersatz-xD))** and **LinkedIn**.

---

## Getting Started

### Prerequisites

* **Node.js**: `v18.0.0` or higher
* **npm** or **pnpm**

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/Ersatz-xD/ayaan-portfolio.git
cd ayaan-portfolio

# 2. Install dependencies
npm install

# 3. Launch the local development server
npm run dev
```

The application will spin up locally at `http://localhost:3000` (or `http://127.0.0.1:5173`).

---

## Accessibility & Performance

* **`prefers-reduced-motion` Support:** All GSAP ScrollTrigger animations, Framer Motion transitions, and canvas LERP loops automatically disable or simplify when reduced motion is requested by the OS.
* **60 FPS Guarantee:** Layout animations strictly utilize GPU-composited properties (`will-change: transform`, `translateY`, `scale`) and `requestAnimationFrame` to prevent DOM layout thrashing.
* **Theme Persistence Without Flash-Blocking:** Theme state is read from `localStorage` and applied on hook initialization, ahead of first paint in the common case.

---

## License & Contact

* **Email:** [aayan.shazim@gmail.com](mailto:aayan.shazim@gmail.com)
* **GitHub:** [github.com/Ersatz-xD](https://github.com/Ersatz-xD)
* **LinkedIn:** [linkedin.com/in/ayaan-ahmed-khan-448600351](https://linkedin.com/in/ayaan-ahmed-khan-448600351)
