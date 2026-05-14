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
      <div
        className="grid md:grid-cols-2 items-center"
        style={{ maxWidth: "1024px", margin: "0 auto", gap: "64px" }}
      >
        {/* Left — Text */}
        <div>
          <motion.h2
            className="font-bold"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "24px" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <motion.p
            className="text-gray-400"
            style={{ lineHeight: "1.75", marginBottom: "16px", fontSize: "0.9375rem" }}
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
            className="text-gray-500"
            style={{ fontSize: "0.875rem", marginBottom: "8px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            BS Computer Science — Information Technology University (ITU)
          </motion.p>

          <motion.div
            className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
            style={{ padding: "6px 16px", marginTop: "12px", fontSize: "0.875rem" }}
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
          <div
            className="flex items-center bg-white/5"
            style={{ gap: "8px", padding: "12px 16px" }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(239,68,68,0.8)" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(234,179,8,0.8)" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(34,197,94,0.8)" }} />
            <span className="text-gray-500" style={{ marginLeft: "8px", fontSize: "0.75rem" }}>terminal</span>
          </div>
          <div className="font-mono" style={{ padding: "20px", fontSize: "0.875rem" }}>
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                className={line.startsWith("$") ? "text-cyan-400" : "text-gray-400"}
                style={{ marginBottom: i < terminalLines.length - 1 ? "4px" : 0 }}
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
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: "24px", maxWidth: "1024px", margin: "80px auto 0" }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300"
            style={{ padding: "28px 20px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <p className="font-bold gradient-text" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-gray-500" style={{ fontSize: "0.875rem", marginTop: "8px" }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
