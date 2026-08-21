# AYAAN.KHAN // PORTFOLIO v2.0

**Cyber-Stealth CS & AI Engineering Showcase**

> A production-grade, scroll-driven portfolio web application architected for **Ayaan Ahmed Khan**—Computer Science undergraduate at COMSATS University Islamabad, Wah Campus (BCS '27) and Full-Stack / AI Engineer.
> 
> 

---

##  Overview & Architectural DNA

This repository houses the second-generation (**v2.0**) personal portfolio and systems archive for Ayaan Ahmed Khan. Moving away from traditional static HTML/CSS/JS, this build leverages a type-safe single-page architecture with GPU-accelerated rendering, exclusion-blended HUD overlays, and zero-backend client-side interactivity.

### Core Design Philosophy: *"Gotham Tech Stealth"*

* **Deep Obsidian & Midnight Slate (`#050608` / `#0B0E14`):** High-contrast dark-mode foundation.
* **Electric Cyan & Neon Blue (`#00E5FF` / `#1A8CFF`):** Focused cybernetic accents, edge glows, and active states.
* **Exclusion Blending (`mix-blend-mode: exclusion`):** All fixed headers, floating navigation menus, and system readout badges remain sharp and legible across both deep slate backgrounds and illuminated cyan highlights.
* **Zero Cookie-Cutter Grids:** Replaces uniform card layouts with asymmetric editorial features, connected multi-column timelines, and custom CSS/SVG wireframe UI clusters.

---

##  Tech Stack

| Component | Technology | Version / Specification | Architectural Purpose |
| --- | --- | --- | --- |
| **Core Framework** | React + TypeScript | `19.0.0` / `5.7.0` | Reusable, type-safe component architecture |
| **Build & Tooling** | Vite | `6.x` | Sub-millisecond HMR and optimized bundler |
| **Styling Engine** | Tailwind CSS | `v4.0.0` | Modern utility-first styling with custom CSS variables |
| **Scroll Animation** | GSAP + ScrollTrigger | `3.15.0` | Pinned panel animations, line-drawing, and scroll math |
| **UI Transitions** | Framer Motion | `12.0.0` | Smooth modal drawers and HUD component entrances |
| **Typography** | Inter & Inter Tight | `-0.03em` to `-0.04em` | Crisp editorial headings and monospace terminal readouts |

---

##  Key Features & Layout Architecture

### 01 // The Hero Section (`#hero`)

* **Staggered Cybernetic Splash:** 10-panel vertical slide-out animation with electric-cyan border highlights.
* **Dual-Layer X-Ray Scanner:** Uses a native, GPU-rendered CSS `radial-gradient` mask driven by LERP-smoothed CSS variables (`--mx`, `--my`, `--fx`, `--fy`). As the mouse moves across the base stealth suit/grid, it dynamically reveals an illuminated neon-cyan AI network layer underneath.
* **Word-Reveal Typography:** Automated word tokenization with staggered blur-to-focus entry physics.
* **Live Readouts:** Real-time snapshot metrics (`12 Projects shipped`, `03 Years building`, `40+ Tools & frameworks`).

### 02 // Academic Standing & Education (`#education`)

* **Editorial Numbered Badges:** Oversized index styling (`02 //`) paired with two-tone headings (`"Education // Background"`).
* **Vertical Interactive Timeline:** Glowing cyan timeline bar with pulsing circular nodes that illuminate (`opacity: 0 -> 1`, `scale: 0.8 -> 1`) on scroll, highlighting a **3.94 / 4.00 SGPA** and **1st Position Merit Certificate**.



### 03 // Engineering & Industry Experience (`#experience`)

* **3-Column Connected Horizontal Timeline:** A glowing neon-blue line connecting milestone nodes across the screen (collapsing to a clean vertical timeline on mobile `<1024px`).
* **Featured Roles:** Highlights industry work including **Data Science Intern at 10Pearls (Shine Program)**, **Frontend Lead Intern at ACM CUI Wah Chapter**, and **Graphics Lead at COMSATS Literary Society (CLS)**.



### 04 // Systems & AI Projects Showcase (`#projects`)

* **Asymmetric Alternating Feature Rows:** Replaces repeating boxes with an editorial showcase where odd and even rows alternate typography columns and preview frames.
* **Pure CSS/SVG UI Clusters:** Instead of static screenshots, projects are visualized through multi-layered glassmorphic mockups (e.g., RAG vector embedding charts, TreeSHAP explainability bars, and compiling terminal consoles).
* **Featured Systems:** Showcases **Prof GPT** (96% Precision@3), **Pearl AQI Engine** (72-Hour MLOps Pipeline), **BroBroke** (MERN Expense Tracker), **EduGate Pakistan**, and **Auth2X** (OpenCV Biometrics).



### 05 // Honors & Credentials Archive (`#awards` / `/credentials`)

* **Trophy Room Showcase:** Glowing achievement cards for **CODEZAAR Programming Champion (YOTA '25)**, **GDG Intra-University Hackathon Winner**, and **COMBITS '25 Speed Coding Runner-Up**.


* **Interactive Split-Screen Preview:** Hovering over horizontal-ruled list items dynamically renders their corresponding certificate or trophy image in a sticky glassmorphism frame on the right.

### 06 // Terminal Dispatch Hub (`#contact` / `/contact`)

* **Zero-Backend Communication:** Completely eliminates web forms in favor of an interactive, dark-mode terminal emulator (`bash - ayaan@nightwing-os:~`).
* **Live Commands:** Type `help`, `contact`, `resume`, `email`, or `clear` to interact with system records and download credentials.
* **Click-to-Copy & Mailto Protocols:** Instant clipboard copying for `aayan.shazim@gmail.com` and direct anchor routing to **GitHub (`[github.com/Ersatz-xD](https://github.com/Ersatz-xD)`)** and **LinkedIn**.



---

##  Getting Started

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

The application will spin up locally at `http://localhost:3000` (or `[http://127.0.0.1:5173](http://127.0.0.1:5173)`).

---

##  Accessibility & Performance

* **`prefers-reduced-motion` Support:** All GSAP ScrollTrigger animations, Framer Motion transitions, and canvas LERP loops automatically disable or simplify when reduced motion is requested by the OS.
* **60 FPS Guarantee:** Layout animations strictly utilize GPU-composited properties (`will-change: transform`, `translateY`, `scale`) and `requestAnimationFrame` to prevent DOM layout thrashing.

---

##  License & Contact

* **Email:** [aayan.shazim@gmail.com](https://www.google.com/search?q=mailto%3Aaayan.shazim%40gmail.com)

* **GitHub:** [github.com/Ersatz-xD](https://www.google.com/search?q=https://github.com/Ersatz-xD)

* **LinkedIn:** [linkedin.com/in/ayaan-ahmed-khan-448600351](https://www.google.com/search?q=https://linkedin.com/in/ayaan-ahmed-khan-448600351)
