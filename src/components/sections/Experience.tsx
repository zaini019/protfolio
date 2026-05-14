"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <motion.h2
        className="font-bold text-center"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "64px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Work <span className="gradient-text">Experience</span>
      </motion.h2>

      <div className="relative" style={{ maxWidth: "896px", margin: "0 auto" }}>
        {/* Timeline line */}
        <div
          className="absolute hidden md:block"
          style={{
            left: "50%", transform: "translateX(-50%)",
            width: "1px", height: "100%",
            background: "linear-gradient(to bottom, rgba(6,182,212,0.5), rgba(6,182,212,0.2), transparent)",
          }}
        />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className={`relative flex flex-col md:flex-row ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            style={{ marginBottom: "64px", alignItems: "stretch" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Timeline dot */}
            <div
              className="absolute hidden md:block z-10"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <motion.div
                className="rounded-full bg-cyan-500"
                style={{ width: "16px", height: "16px", border: "4px solid #0a0a0a" }}
                animate={
                  exp.isCurrent
                    ? { boxShadow: ["0 0 0 0 rgba(6,182,212,0.4)", "0 0 0 10px rgba(6,182,212,0)"] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Content card */}
            <motion.div
              className="rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300"
              style={{
                width: "100%",
                maxWidth: "calc(50% - 2rem)",
                padding: "28px",
                ...(i % 2 === 0
                  ? { marginRight: "auto", marginLeft: 0 }
                  : { marginLeft: "auto", marginRight: 0 }),
              }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center flex-wrap" style={{ gap: "12px", marginBottom: "12px" }}>
                <h3 className="text-white font-semibold" style={{ fontSize: "1.125rem" }}>
                  {exp.title}
                </h3>
                {exp.isCurrent && (
                  <span
                    className="rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse"
                    style={{ padding: "2px 10px", fontSize: "0.75rem" }}
                  >
                    Current
                  </span>
                )}
              </div>
              <p className="text-cyan-400" style={{ fontSize: "0.875rem", marginBottom: "4px" }}>{exp.company}</p>
              <p className="text-gray-500" style={{ fontSize: "0.75rem", marginBottom: "20px" }}>{exp.period}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-gray-400 flex items-start"
                    style={{ fontSize: "0.875rem", gap: "10px" }}
                  >
                    <span className="text-cyan-500" style={{ marginTop: "6px", flexShrink: 0 }}>&#9656;</span>
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
