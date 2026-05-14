# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-themed single-page portfolio website for Zain Ul Abidin with smooth animations, hover effects, and floating elements.

**Architecture:** Next.js App Router with TypeScript. Each section is a standalone component in `src/components/sections/`. Shared UI primitives (animated wrappers, icons) live in `src/components/ui/`. All data (projects, skills, experience) is centralized in `src/data/`. Framer Motion handles all animations via reusable motion wrappers.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, react-icons, next/font (Inter)

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout: font, metadata, global styles
│   ├── page.tsx            — Home page: assembles all sections
│   └── globals.css         — Tailwind directives + custom CSS (particles, glow, grid)
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx      — Glassmorphism sticky navbar, hide/show on scroll
│   │   ├── Loader.tsx      — Page load animation (initials)
│   │   ├── ParticlesBackground.tsx — Canvas floating particles
│   │   ├── SectionWrapper.tsx      — Framer Motion scroll-triggered fade-in wrapper
│   │   ├── ProjectModal.tsx        — Full-screen modal overlay for project details
│   │   └── ScrollIndicator.tsx     — Bouncing arrow component
│   └── sections/
│       ├── Hero.tsx        — Hero section with typing animation, CTAs, socials
│       ├── About.tsx       — Bio, stats cards, terminal decoration
│       ├── Skills.tsx      — Tabbed skill categories with floating icons
│       ├── Experience.tsx  — Vertical timeline with alternating entries
│       ├── Projects.tsx    — Project grid cards + modal trigger
│       ├── Certificates.tsx — Horizontal scroll cards
│       └── Contact.tsx     — Contact form + info split layout
├── data/
│   ├── projects.ts         — All 8 projects with full details
│   ├── skills.ts           — Skills grouped by category
│   ├── experience.ts       — Work experience entries
│   └── certificates.ts     — Certificates and awards
├── hooks/
│   └── useScrollDirection.ts — Hook for navbar hide/show logic
└── public/
    ├── cv.pdf              — Downloadable CV
    └── projects/           — Project screenshots/placeholders
```

---

## Task 1: Project Scaffolding & Base Config

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/zaheer/Projects/portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

Choose defaults: Yes to all prompts. If directory not empty, it will merge.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/zaheer/Projects/portfolio
npm install framer-motion react-icons
```

- [ ] **Step 3: Configure globals.css with dark theme base**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #0a0a0a;
  --foreground: #e2e8f0;
  --accent: #06b6d4;
  --accent-light: #22d3ee;
  --accent-glow: rgba(6, 182, 212, 0.15);
  --card-bg: rgba(15, 23, 42, 0.6);
  --card-border: rgba(6, 182, 212, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-inter);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 3px;
}

/* Grid background pattern */
.bg-grid {
  background-image:
    linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Glow effect */
.glow {
  box-shadow: 0 0 20px var(--accent-glow), 0 0 60px var(--accent-glow);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--accent) 0%, #0ea5e9 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 4: Configure layout.tsx with Inter font and metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zain Ul Abidin | Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer with 5+ years of experience building production-grade products across Fintech, Healthcare, CRM & AI domains.",
  keywords: [
    "Zain Ul Abidin",
    "Software Engineer",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Node.js",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create minimal page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold gradient-text">Zain Ul Abidin</h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server runs**

```bash
cd /Users/zaheer/Projects/portfolio
npm run dev
```

Expected: Server starts on http://localhost:3000, shows "Zain Ul Abidin" centered with gradient text on dark background.

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts`, `src/data/certificates.ts`

- [ ] **Step 1: Create projects data**

Create `src/data/projects.ts`:

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  liveUrl?: string;
  image: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "aml-watcher",
    title: "AML Watcher",
    description:
      "AML compliance monitoring with rule-based alerts and real-time transaction monitoring.",
    longDescription:
      "Built an AML (Anti-Money Laundering) watcher to monitor transactions for suspicious activity and ensure compliance with regulatory standards. Integrated rule-based alerts and risk scoring to identify high-risk users or patterns in real time, helping prevent fraud and financial crimes.",
    stack: ["Node.js", "React.js", "MongoDB", "REST APIs"],
    liveUrl: "https://amlwatcher.com/",
    image: "/projects/aml-watcher.png",
    category: "Fintech",
  },
  {
    id: "arrivy",
    title: "Arrivy",
    description:
      "Field service management platform for scheduling, dispatching, and tracking.",
    longDescription:
      "A comprehensive field service management platform that streamlines scheduling, dispatching, and real-time tracking of field crews. Built with a robust backend and responsive frontend to handle complex operational workflows.",
    stack: ["Vue.js", "Node.js", "Laravel", "PostgreSQL"],
    liveUrl: "https://www.arrivy.com/",
    image: "/projects/arrivy.png",
    category: "SaaS",
  },
  {
    id: "blixtpay",
    title: "BlixtPay",
    description:
      "Crypto payment platform with FIAT to crypto conversion and NFT payments.",
    longDescription:
      "A platform enabling merchants to accept cryptocurrency transactions, including NFT payments. Enabled users to convert FIAT currency to crypto for purchases or deposits. Designed and developed an intuitive interface for managing crypto transactions, enhancing user experience in tracking, reporting, and ensuring KYC compliance.",
    stack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    liveUrl: "https://dev.blixtpay.com/",
    image: "/projects/blixtpay.png",
    category: "Fintech",
  },
  {
    id: "arrivy-crm",
    title: "Arrivy CRM Integrations",
    description:
      "60+ third-party CRM integrations including Zoho, HubSpot, Salesforce, and Zapier.",
    longDescription:
      "Led the integration of 60+ third-party CRMs and services with the Arrivy platform. Connected popular tools including Zoho, Zapier, HubSpot, Salesforce, Mail Parser, GCP, Google Calendar, Calendly, and many more. Built robust API connectors handling authentication, data sync, webhooks, and error recovery across all integrations.",
    stack: ["Node.js", "REST APIs", "GraphQL", "GCP", "Third-party APIs"],
    image: "/projects/arrivy-crm.png",
    category: "Integrations",
  },
  {
    id: "scribemedix",
    title: "ScribeMedix AI Medical Scribing",
    description:
      "AI-powered medical scribing tool with ~95% accuracy using OpenAI Whisper.",
    longDescription:
      "An AI-powered medical scribing tool integrated with Athenahealth that automatically records doctor-patient appointments via WebRTC, transcribes conversations using OpenAI Whisper at ~95% accuracy, and auto-fills EHR forms through intelligent API automation reducing physician interaction with the system by up to 70% while generating a structured clinical summary for every patient record.",
    stack: ["Python", "FastAPI", "OpenAI Whisper", "WebRTC", "LangChain"],
    image: "/projects/scribemedix.png",
    category: "AI / Healthcare",
  },
  {
    id: "open-banking",
    title: "Open Banking Platform",
    description:
      "Open banking solution integrated with 250+ EEA banks for merchant financial services.",
    longDescription:
      "Played a key role in creating an open banking solution offering a wide range of financial services to merchants. Integrated with 250+ EEA banks to ensure seamless compatibility and system integration. Built scalable backend infrastructure capable of handling high-volume requests efficiently.",
    stack: ["Node.js", "Laravel", "PostgreSQL", "Microservices"],
    image: "/projects/open-banking.png",
    category: "Fintech",
  },
  {
    id: "saas-crm",
    title: "SaaS-Based CRM Platform",
    description:
      "Multi-tenant CRM with lead management, task delegation, and analytics dashboards.",
    longDescription:
      "Developed a modern CRM frontend with modules for lead management, task delegation, and analytics. Built a secure multi-tenant architecture to handle organizational data across different clients. Integrated functionalities such as lead tracking, sales pipeline management, task assignment, and performance dashboards. Deployed using Docker containers with PM2 for process management.",
    stack: ["Vue.js", "Node.js", "Docker", "PM2", "MongoDB"],
    image: "/projects/saas-crm.png",
    category: "SaaS",
  },
  {
    id: "crypto-merchants",
    title: "Cryptocurrency Integration for Merchants",
    description:
      "FIAT to crypto conversion platform with NFT payments and KYC compliance.",
    longDescription:
      "Contributed to the development of a platform enabling merchants to accept cryptocurrency transactions, including NFT payments. Enabled users to convert FIAT currency to crypto for purchases or deposits. Designed and developed an intuitive interface for managing crypto transactions, enhancing user experience in tracking, reporting, and ensuring KYC compliance.",
    stack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    image: "/projects/crypto-merchants.png",
    category: "Fintech",
  },
];
```

- [ ] **Step 2: Create skills data**

Create `src/data/skills.ts`:

```ts
export interface SkillCategory {
  name: string;
  skills: { name: string; icon: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js", icon: "SiReact" },
      { name: "Vue.js", icon: "SiVuedotjs" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Nuxt.js", icon: "SiNuxtdotjs" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "Vuetify", icon: "SiVuetify" },
      { name: "SCSS", icon: "SiSass" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Laravel", icon: "SiLaravel" },
      { name: "Python", icon: "SiPython" },
      { name: "FastAPI", icon: "SiFastapi" },
      { name: "Django", icon: "SiDjango" },
      { name: "PHP", icon: "SiPhp" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Redis", icon: "SiRedis" },
    ],
  },
  {
    name: "AI / ML",
    skills: [
      { name: "LangChain", icon: "SiLangchain" },
      { name: "OpenAI", icon: "SiOpenai" },
      { name: "Python", icon: "SiPython" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "AWS", icon: "SiAmazonwebservices" },
      { name: "GCP", icon: "SiGooglecloud" },
      { name: "Docker", icon: "SiDocker" },
      { name: "GitHub Actions", icon: "SiGithubactions" },
    ],
  },
  {
    name: "Integrations",
    skills: [
      { name: "Zoho", icon: "SiZoho" },
      { name: "HubSpot", icon: "SiHubspot" },
      { name: "Salesforce", icon: "SiSalesforce" },
      { name: "Zapier", icon: "SiZapier" },
      { name: "Google Calendar", icon: "SiGooglecalendar" },
    ],
  },
];
```

- [ ] **Step 3: Create experience data**

Create `src/data/experience.ts`:

```ts
export interface Experience {
  title: string;
  company: string;
  period: string;
  isCurrent: boolean;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Developers Studio",
    period: "Jun 2023 - Present",
    isCurrent: true,
    highlights: [
      "End-to-end full-stack solutions across AML, open banking, Binance trading, and B2B platforms",
      "Scalable RESTful & GraphQL APIs with Node.js, Laravel, and FastAPI",
      "Redis-backed async task queues (Bull & Kue) for high-volume data pipelines",
      "Real-time communication via Socket.IO with GPT-driven interactions",
      "LLM-powered agentic workflows with LangChain, Whisper, and YOLO",
      "60+ CRM integrations including Zoho, HubSpot, Salesforce, and Zapier",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Mindstorm Studios",
    period: "Jul 2021 - May 2023",
    isCurrent: false,
    highlights: [
      "System optimization — improved frame rates by 20% across platforms",
      "Crafted engaging gameplay systems — drove 10% engagement uplift",
      "Monetization features — increased revenue by 15% in first quarter",
      "Automated testing with Jenkins & Selenium — reduced QA cycles by 30%",
    ],
  },
];
```

- [ ] **Step 4: Create certificates data**

Create `src/data/certificates.ts`:

```ts
export interface Certificate {
  title: string;
  issuer: string;
  type: "certification" | "award";
}

export const certificates: Certificate[] = [
  {
    title: "Certification of Completion — MEVN Stack",
    issuer: "Training Program, Lahore",
    type: "certification",
  },
  {
    title: "Google Developer Student Club (IEEE Chapter)",
    issuer: "Certification of Appreciation",
    type: "certification",
  },
  {
    title: "Certification of Achievement",
    issuer: "Mindstorm Studios",
    type: "certification",
  },
  {
    title: "Award for Best External Advisor",
    issuer: "Forman Christian College University, Lahore",
    type: "award",
  },
];
```

---

## Task 3: Shared UI Components

**Files:**
- Create: `src/components/ui/SectionWrapper.tsx`, `src/components/ui/ParticlesBackground.tsx`, `src/components/ui/ScrollIndicator.tsx`, `src/hooks/useScrollDirection.ts`

- [ ] **Step 1: Create SectionWrapper (scroll-triggered animations)**

Create `src/components/ui/SectionWrapper.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Create ParticlesBackground**

Create `src/components/ui/ParticlesBackground.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 3: Create ScrollIndicator**

Create `src/components/ui/ScrollIndicator.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-xs text-gray-500 uppercase tracking-widest">
        Scroll
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-cyan-500"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </motion.div>
  );
}
```

- [ ] **Step 4: Create useScrollDirection hook**

Create `src/hooks/useScrollDirection.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      setIsAtTop(scrollY < 50);
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return { scrollDirection, isAtTop };
}
```

---

## Task 4: Navbar

**Files:**
- Create: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/ui/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "down" && !isAtTop ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAtTop
          ? "bg-transparent"
          : "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <a
          href="#"
          className="text-lg font-bold gradient-text"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ZA
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleClick(link.href)}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleClick(link.href)}
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
```

---

## Task 5: Loader Component

**Files:**
- Create: `src/components/ui/Loader.tsx`

- [ ] **Step 1: Create Loader component**

Create `src/components/ui/Loader.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-5xl font-bold gradient-text">ZA</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const name = "Zain Ul Abidin";

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#0a0a0a]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <ParticlesBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Typing name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              className="gradient-text inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Full-Stack Software Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base text-gray-500 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          Building production-grade products across Fintech, Healthcare, CRM &
          AI
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            View Projects
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Floating social icons — left side */}
      <motion.div
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-5 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        {[
          {
            icon: <FiGithub size={20} />,
            href: "https://github.com/zaini019",
          },
          {
            icon: <FiLinkedin size={20} />,
            href: "https://www.linkedin.com/in/zain-ul-abidin-06a783219",
          },
          {
            icon: <FiMail size={20} />,
            href: "mailto:zainabidin090@gmail.com",
          },
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          >
            {social.icon}
          </a>
        ))}
        <div className="w-px h-20 bg-gray-700 mx-auto" />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
```

---

## Task 7: About Section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/sections/About.tsx`:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Integrations Built", value: 60, suffix: "+" },
  { label: "Bank Integrations", value: 250, suffix: "+" },
  { label: "Major Projects", value: 8, suffix: "" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const terminalLines = [
  "$ whoami",
  "zain-ul-abidin",
  "$ cat role.txt",
  "Full-Stack Software Engineer",
  "$ ls skills/",
  "node.js  react  vue  laravel  python  fastapi",
  "$ uptime",
  "5+ years and counting...",
];

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-grid">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left — Text */}
        <div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Full-Stack Software Engineer with 5+ years of experience building
            production-grade products across Fintech, Healthcare, CRM & AI
            domains. Adept at architecting end-to-end solutions from scalable
            backend APIs to pixel-perfect frontends.
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            BS Computer Science — Information Technology University (ITU)
          </motion.p>

          <motion.div
            className="inline-block px-3 py-1 mt-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Currently @ Developers Studio
          </motion.div>
        </div>

        {/* Right — Terminal */}
        <motion.div
          className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-gray-500">terminal</span>
          </div>
          <div className="p-4 font-mono text-sm">
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                className={
                  line.startsWith("$") ? "text-cyan-400" : "text-gray-400"
                }
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <p className="text-3xl md:text-4xl font-bold gradient-text">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

---

## Task 8: Skills Section

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills component**

Create `src/components/sections/Skills.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiVuetify,
  SiSass,
  SiNodedotjs,
  SiLaravel,
  SiPython,
  SiFastapi,
  SiDjango,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiOpenai,
  SiDocker,
  SiGithubactions,
  SiSalesforce,
  SiZapier,
} from "react-icons/si";
import { FaAws, FaGoogle } from "react-icons/fa";
import { TbBrandLangchain } from "react-icons/tb";
import SectionWrapper from "@/components/ui/SectionWrapper";

const iconMap: Record<string, React.ReactNode> = {
  "React.js": <SiReact />,
  "Vue.js": <SiVuedotjs />,
  "Next.js": <SiNextdotjs />,
  "Nuxt.js": <SiNuxtdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  Vuetify: <SiVuetify />,
  SCSS: <SiSass />,
  "Node.js": <SiNodedotjs />,
  Laravel: <SiLaravel />,
  Python: <SiPython />,
  FastAPI: <SiFastapi />,
  Django: <SiDjango />,
  PHP: <SiPhp />,
  PostgreSQL: <SiPostgresql />,
  MySQL: <SiMysql />,
  MongoDB: <SiMongodb />,
  Redis: <SiRedis />,
  LangChain: <TbBrandLangchain />,
  OpenAI: <SiOpenai />,
  AWS: <FaAws />,
  GCP: <FaGoogle />,
  Docker: <SiDocker />,
  "GitHub Actions": <SiGithubactions />,
  Salesforce: <SiSalesforce />,
  Zapier: <SiZapier />,
};

const categories = [
  {
    name: "Frontend",
    skills: ["React.js", "Vue.js", "Next.js", "Nuxt.js", "Tailwind CSS", "Vuetify", "SCSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Laravel", "Python", "FastAPI", "Django", "PHP"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    name: "AI / ML",
    skills: ["LangChain", "OpenAI", "Python"],
  },
  {
    name: "DevOps",
    skills: ["AWS", "GCP", "Docker", "GitHub Actions"],
  },
  {
    name: "Integrations",
    skills: ["Salesforce", "Zapier"],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <SectionWrapper id="skills">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Tech <span className="gradient-text">Stack</span>
      </motion.h2>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              active === i
                ? "bg-cyan-500 text-black font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {categories[active].skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300 group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div
                className="text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                {iconMap[skill] || <span className="text-lg">{skill[0]}</span>}
              </motion.div>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
```

---

## Task 9: Experience Section

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Create Experience component**

Create `src/components/sections/Experience.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Work <span className="gradient-text">Experience</span>
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent hidden md:block" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className={`relative flex flex-col md:flex-row items-center mb-16 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block z-10">
              <motion.div
                className="w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0a0a0a]"
                animate={
                  exp.isCurrent
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(6,182,212,0.4)",
                          "0 0 0 10px rgba(6,182,212,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Content card */}
            <motion.div
              className={`w-full md:w-[calc(50%-2rem)] p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300 ${
                i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {exp.title}
                </h3>
                {exp.isCurrent && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse">
                    Current
                  </span>
                )}
              </div>
              <p className="text-cyan-400 text-sm mb-1">{exp.company}</p>
              <p className="text-gray-500 text-xs mb-4">{exp.period}</p>
              <ul className="space-y-2">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-gray-400 text-sm flex items-start gap-2"
                  >
                    <span className="text-cyan-500 mt-1.5 flex-shrink-0">
                      &#9656;
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

---

## Task 10: Projects Section & Modal

**Files:**
- Create: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectModal.tsx`

- [ ] **Step 1: Create ProjectModal component**

Create `src/components/ui/ProjectModal.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-white/10 p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <HiX size={24} />
          </button>

          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
            {project.category}
          </span>

          <h3 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6">
            {project.longDescription}
          </p>

          {/* Stack */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <FiExternalLink />
              Visit Live Site
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create Projects component**

Create `src/components/sections/Projects.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "@/data/projects";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/data/projects";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="group relative rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden cursor-pointer hover:border-cyan-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(project)}
            >
              {/* Thumbnail area */}
              <div className="h-48 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl font-bold text-white/5 group-hover:text-cyan-500/10 transition-colors duration-500">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400 text-sm font-medium">
                    Click for details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      <FiExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
```

---

## Task 11: Certificates Section

**Files:**
- Create: `src/components/sections/Certificates.tsx`

- [ ] **Step 1: Create Certificates component**

Create `src/components/sections/Certificates.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { certificates } from "@/data/certificates";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Certificates() {
  return (
    <SectionWrapper id="certificates">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Certificates & <span className="gradient-text">Awards</span>
      </motion.h2>

      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            className="flex-shrink-0 w-72 p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300 snap-center relative overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-full transition-transform duration-700" />
            </div>

            <div className="text-cyan-400 mb-4">
              <FiAward size={28} />
            </div>
            <h3 className="text-white font-medium mb-2 text-sm leading-snug">
              {cert.title}
            </h3>
            <p className="text-gray-500 text-xs">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

---

## Task 12: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact component**

Create `src/components/sections/Contact.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Let&apos;s Build <span className="gradient-text">Something Together</span>
      </motion.h2>
      <motion.p
        className="text-gray-500 text-center mb-12 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Have a project in mind? Let&apos;s talk about how we can work together.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Left — Contact info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              icon: <FiMail size={20} />,
              label: "Email",
              value: "zainabidin090@gmail.com",
              href: "mailto:zainabidin090@gmail.com",
            },
            {
              icon: <FiPhone size={20} />,
              label: "Phone",
              value: "+92 316 4610422",
              href: "tel:+923164610422",
            },
            {
              icon: <FiMapPin size={20} />,
              label: "Location",
              value: "Lahore, Punjab, Pakistan",
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-300">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social links */}
          <div className="flex gap-4 pt-4">
            {[
              {
                icon: <FiGithub size={20} />,
                href: "https://github.com/zaini019",
              },
              {
                icon: <FiLinkedin size={20} />,
                href: "https://www.linkedin.com/in/zain-ul-abidin-06a783219",
              },
              {
                icon: <FiMail size={20} />,
                href: "mailto:zainabidin090@gmail.com",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          className="space-y-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
            />
          </div>
          <div>
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pt-8 border-t border-white/5">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Zain Ul Abidin. All rights reserved.
        </p>
      </div>
    </SectionWrapper>
  );
}
```

---

## Task 13: Assemble Page & Final Integration

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections in page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import Navbar from "@/components/ui/Navbar";
import Loader from "@/components/ui/Loader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Copy CV to public folder**

```bash
cp /Users/zaheer/Downloads/zain-ul-abidin_cv.pdf /Users/zaheer/Projects/portfolio/public/cv.pdf
```

- [ ] **Step 3: Create placeholder project images directory**

```bash
mkdir -p /Users/zaheer/Projects/portfolio/public/projects
```

- [ ] **Step 4: Run dev server and verify**

```bash
cd /Users/zaheer/Projects/portfolio
npm run dev
```

Expected: Full portfolio loads at http://localhost:3000 with all 7 sections, animations, and interactions working.

- [ ] **Step 5: Fix any TypeScript or build errors**

```bash
cd /Users/zaheer/Projects/portfolio
npm run build
```

Expected: Build succeeds with no errors.

---

## Task 14: Screenshot Capture for Live Projects

**Files:**
- Create screenshots in `public/projects/`

- [ ] **Step 1: Take screenshots of live project websites**

Open each URL in a browser and take full-width screenshots (1280x720 recommended), save to `public/projects/`:

- `aml-watcher.png` from https://amlwatcher.com/
- `arrivy.png` from https://www.arrivy.com/
- `blixtpay.png` from https://dev.blixtpay.com/

- [ ] **Step 2: Update Projects component to show images**

In `src/components/sections/Projects.tsx`, replace the thumbnail area placeholder with actual `<img>` tags for projects that have screenshots. Use `next/image` for optimization.
