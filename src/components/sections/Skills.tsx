"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTailwindcss, SiVuetify, SiSass,
  SiNodedotjs, SiLaravel, SiPython, SiFastapi, SiDjango, SiPhp,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiOpenai,
  SiDocker, SiGithubactions, SiSalesforce, SiZapier, SiNuxt,
} from "react-icons/si";
import { FaAws, FaGoogle } from "react-icons/fa";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  "React.js": <SiReact />, "Vue.js": <SiVuedotjs />, "Next.js": <SiNextdotjs />,
  "Nuxt.js": <SiNuxt />, "Tailwind CSS": <SiTailwindcss />, Vuetify: <SiVuetify />,
  SCSS: <SiSass />, "Node.js": <SiNodedotjs />, Laravel: <SiLaravel />,
  Python: <SiPython />, FastAPI: <SiFastapi />, Django: <SiDjango />,
  PHP: <SiPhp />, PostgreSQL: <SiPostgresql />, MySQL: <SiMysql />,
  MongoDB: <SiMongodb />, Redis: <SiRedis />, LangChain: <SiPython />,
  OpenAI: <SiOpenai />, AWS: <FaAws />, GCP: <FaGoogle />,
  Docker: <SiDocker />, "GitHub Actions": <SiGithubactions />,
  Salesforce: <SiSalesforce />, Zapier: <SiZapier />,
};

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <SectionWrapper id="skills">
      <motion.h2
        className="font-bold text-center"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "48px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Tech <span className="gradient-text">Stack</span>
      </motion.h2>

      {/* Category tabs */}
      <div
        className="flex flex-wrap justify-center"
        style={{ gap: "12px", maxWidth: "768px", margin: "0 auto 48px" }}
      >
        {skillCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? "bg-cyan-500 text-black font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
            style={{ padding: "10px 20px", fontSize: "0.875rem" }}
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          style={{ gap: "20px", maxWidth: "900px", margin: "0 auto" }}
        >
          {skillCategories[active].skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="flex flex-col items-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300 group cursor-default"
              style={{ padding: "28px 16px", gap: "14px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div
                className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                style={{ fontSize: "2rem" }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              >
                {iconMap[skill] || <span style={{ fontSize: "1.125rem" }}>{skill[0]}</span>}
              </motion.div>
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors" style={{ fontSize: "0.8125rem" }}>
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
