# Portfolio Website — Design Spec

**Author:** Zain Ul Abidin
**Date:** 2026-05-13
**Status:** Approved

---

## Overview

A single-page portfolio website for Zain Ul Abidin — Full-Stack Software Engineer with 5+ years experience across Fintech, Healthcare, CRM & AI domains. The site showcases projects, skills, work experience, and contact information with smooth animations, hover effects, and a premium dark aesthetic.

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** TBD (Vercel recommended)

## Design Principles

- **Theme:** Clean minimal dark — dark background (#0a0a0a / #0f172a range), subtle gradients, soft glows
- **Accent Color:** Blue/Cyan (#06b6d4, #0ea5e9 range)
- **Typography:** Modern sans-serif (Inter or similar)
- **Layout:** Single Page App (SPA) with smooth scroll between sections
- **Responsive:** Mobile-first, fully responsive
- **No photo** in current version (easy to add later)

## Sections

### 1. Hero (Full Viewport)

- Full viewport height dark background
- Animated gradient mesh background (blue/cyan tones, slow movement)
- Floating particles for depth
- **Name:** "Zain Ul Abidin" — large bold heading with typing animation
- **Subtitle:** "Full-Stack Software Engineer" — fades in after name types
- **Tagline:** "Building production-grade products across Fintech, Healthcare, CRM & AI"
- **CTA Buttons:** "View Projects" (scrolls to projects) + "Download CV" (PDF download)
- **Social icons:** GitHub, LinkedIn, Email — floating on the side with hover glow
- **Scroll indicator:** Animated bouncing arrow at bottom

### 2. About Me

- **Split layout:** Left — text bio, Right — decorative animated terminal/code snippet
- **Bio:** 2-3 lines from CV summary
- **Quick stats** — floating cards with count-up animation on scroll:
  - "5+" Years Experience
  - "60+" Integrations Built
  - "250+" Bank Integrations
  - "8" Major Projects
- **Current role:** "Software Engineer @ Developers Studio" with subtle badge
- Faint grid pattern background for depth

### 3. Skills

- **Grouped by category** with animated tab/pill switcher:
  - **Frontend:** React.js, Vue.js, Nuxt.js, Vuetify, Quasar, Tailwind CSS, SCSS
  - **Backend:** Node.js, Laravel, Python, FastAPI, Django, PHP
  - **Databases:** PostgreSQL, MySQL, MongoDB, Redis
  - **AI/ML:** LLM Integration, LangChain, OpenAI Whisper, YOLO, STT/TTS/VAD
  - **DevOps:** AWS, GCP, Docker, PM2, CI/CD, GitHub Actions
  - **Integrations:** Zoho, HubSpot, Salesforce, Zapier, Google Calendar, Calendly, Mail Parser
  - **State Management:** Pinia, VueX, Redux
- Each skill has an **icon** with hover effect (scale up + glow)
- **Floating animation** — icons slowly bob up/down (staggered timing)
- Category switch with smooth fade transition

### 4. Work Experience

- **Vertical timeline layout** — line in center, entries alternate left/right
- Scroll-triggered **slide-in animations** (left entry from left, right from right)

**Entry 1: Software Engineer — Developers Studio** (Jun 2023 - Present)
- Glowing "Current" badge
- Key highlights:
  - End-to-end full-stack solutions across AML, open banking, Binance trading, B2B platforms
  - Scalable RESTful & GraphQL APIs with Node.js, Laravel, FastAPI
  - Redis-backed async task queues (Bull & Kue) for high-volume data pipelines
  - Real-time communication via Socket.IO with GPT-driven interactions
  - LLM-powered agentic workflows with LangChain, Whisper, YOLO
  - 60+ CRM integrations (Zoho, HubSpot, Salesforce, Zapier, etc.)

**Entry 2: Associate Software Engineer — Mindstorm Studios** (Jul 2021 - May 2023)
- Key highlights:
  - System optimization — 20% frame rate improvement
  - Engaging gameplay systems — 10% engagement uplift
  - Monetization features — 15% revenue increase in first quarter
  - Automated testing pipelines with Jenkins & Selenium — 30% QA reduction

- Timeline dots have **pulse animation** on scroll
- Entries **lift up** with shadow on hover

### 5. Projects

- **Grid layout** — 2 columns on desktop, 1 on mobile
- Cards with **hover effect** — lift up + cyan border glow
- Click opens **modal/overlay** with full project details
- Each card shows: thumbnail, title, short description, tech stack badges

**8 Projects:**

1. **AML Watcher** — [amlwatcher.com](https://amlwatcher.com/)
   - AML compliance monitoring, rule-based alerts, risk scoring, real-time transaction monitoring
   - Stack: Node.js, React.js, MongoDB, REST APIs
   - Live screenshot from website

2. **Arrivy** — [arrivy.com](https://www.arrivy.com/)
   - Field service management platform
   - Stack: Vue.js, Node.js, Laravel, PostgreSQL
   - Live screenshot from website

3. **BlixtPay** — [dev.blixtpay.com](https://dev.blixtpay.com/)
   - Crypto payments, FIAT to crypto conversion, NFT payments, KYC compliance
   - Stack: React.js, Node.js, MongoDB, REST APIs
   - Live screenshot from website

4. **Arrivy CRM Integrations**
   - 60+ integrations — Zoho, Zapier, HubSpot, Salesforce, Mail Parser, GCP, Google Calendar, Calendly
   - Stack: Node.js, REST APIs, GraphQL, Third-party APIs, GCP
   - Placeholder image (no public URL)

5. **ScribeMedix AI Medical Scribing**
   - AI-powered medical scribing, WebRTC, OpenAI Whisper (~95% accuracy), auto-fill EHR forms, structured clinical summaries
   - Stack: Python, FastAPI, OpenAI Whisper, WebRTC, LangChain
   - Placeholder image (no public URL)

6. **Open Banking Platform**
   - 250+ EEA banks integration, financial services for merchants, scalable backend
   - Stack: Node.js, Laravel, PostgreSQL, Microservices
   - Placeholder image (no public URL)

7. **SaaS-Based CRM Platform**
   - Lead management, task delegation, analytics, multi-tenant architecture, Docker deployment
   - Stack: Vue.js, Node.js, Docker, PM2, MongoDB
   - Placeholder image (no public URL)

8. **Cryptocurrency Integration for Merchants**
   - FIAT to crypto, NFT payments, KYC compliance, merchant dashboard
   - Stack: React.js, Node.js, MongoDB, REST APIs
   - Placeholder image (no public URL)

### 6. Certificates & Awards

- **Horizontal scrolling cards** with hover lift effect
- Subtle shine animation on hover
- 4 items:
  1. Certification of Completion — MEVN Stack (Training Program, Lahore)
  2. Certification of Appreciation — Google Developer Student Club (IEEE Chapter)
  3. Certification of Achievement — Mindstorm Studios
  4. Award for Best External Advisor — Forman Christian College University, Lahore

### 7. Contact

- **Split layout:** Left — contact info + social links, Right — contact form
- **Form fields:** Name, Email, Message — with animated focus borders (cyan glow)
- **Contact info:**
  - Email: zainabidin090@gmail.com
  - Phone: +92 316 4610422
  - Location: Lahore, Punjab, Pakistan
- **Social links:** GitHub (zaini019), LinkedIn, Email — hover scale + glow
- **Heading:** "Let's Build Something Together" with fade-in
- Background: subtle gradient mesh matching hero

## Global Animations & Effects

- **Smooth scroll** between sections via navbar anchor links
- **Scroll-triggered animations** — fade/slide-in for every section (Framer Motion `whileInView`)
- **Floating particles** in hero background (lightweight canvas or CSS)
- **Navbar:** Glassmorphism (backdrop blur + transparency), sticky, hides on scroll down, shows on scroll up
- **Custom cursor:** Optional subtle glow trailing effect
- **Page loader:** Animated name/initials on initial load
- **Hover effects:** All interactive elements have smooth scale/glow transitions
- **Floating elements:** Decorative elements bob up/down with staggered timing

## Education

Displayed in About section or as a subtle mention:
- **BS Computer Science** — Information Technology University (ITU), 2019-2023

## Personal Info

- **Name:** Zain Ul Abidin
- **Email:** zainabidin090@gmail.com
- **Phone:** +92 316 4610422
- **Location:** Lahore, Punjab, Pakistan
- **LinkedIn:** https://www.linkedin.com/in/zain-ul-abidin-06a783219
- **GitHub:** https://github.com/zaini019

## Assets Needed

- CV PDF file for download button
- Live screenshots from: amlwatcher.com, arrivy.com, dev.blixtpay.com
- Placeholder images for projects without public URLs (5 projects)
- Skill icons (can use devicon or simple-icons library)

## Out of Scope (for now)

- Blog section
- Dark/Light theme toggle
- CMS integration
- Backend for contact form (can use Formspree or similar service)
- Multi-language support
