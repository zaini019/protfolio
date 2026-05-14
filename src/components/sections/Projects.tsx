"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiShield, FiTruck, FiLink, FiActivity, FiBarChart2 } from "react-icons/fi";
import { HiOutlineCurrencyDollar, HiOutlineLibrary, HiOutlineCube } from "react-icons/hi";
import { projects, Project } from "@/data/projects";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectModal from "@/components/ui/ProjectModal";

const projectStyles: Record<string, { icon: React.ReactNode; gradient: string; iconColor: string }> = {
  "aml-watcher": {
    icon: <FiShield size={72} />,
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.08) 100%)",
    iconColor: "#06b6d4",
  },
  // arrivy: {
  //   icon: <FiTruck size={72} />,
  //   gradient: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(6,182,212,0.08) 100%)",
  //   iconColor: "#22c55e",
  // },
  blixtpay: {
    icon: <HiOutlineCurrencyDollar size={72} />,
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.12) 0%, rgba(249,115,22,0.08) 100%)",
    iconColor: "#eab308",
  },
  // "arrivy-crm": {
  //   icon: <FiLink size={72} />,
  //   gradient: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 100%)",
  //   iconColor: "#8b5cf6",
  // },
  scribemedix: {
    icon: <FiActivity size={72} />,
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(139,92,246,0.08) 100%)",
    iconColor: "#ec4899",
  },
  "open-banking": {
    icon: <HiOutlineLibrary size={72} />,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.08) 100%)",
    iconColor: "#3b82f6",
  },
  "saas-crm": {
    icon: <FiBarChart2 size={72} />,
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,179,8,0.08) 100%)",
    iconColor: "#f97316",
  },
  "crypto-merchants": {
    icon: <HiOutlineCube size={72} />,
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.12) 0%, rgba(34,197,94,0.08) 100%)",
    iconColor: "#eab308",
  },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects">
        <motion.h2
          className="font-bold text-center"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "12px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          className="text-gray-500 text-center"
          style={{ maxWidth: "512px", margin: "0 auto 56px", fontSize: "0.9375rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A selection of projects I&apos;ve built across different domains.
        </motion.p>

        <div
          className="grid md:grid-cols-2"
          style={{ gap: "32px", maxWidth: "1024px", margin: "0 auto" }}
        >
          {projects.map((project, i) => {
            const style = projectStyles[project.id] || projectStyles["aml-watcher"];
            return (
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
                {/* Thumbnail area with gradient + icon */}
                <div
                  className="flex items-center justify-center relative overflow-hidden"
                  style={{ height: "200px", background: style.gradient }}
                >
                  {/* Background pattern dots */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Icon */}
                  <motion.div
                    style={{ color: style.iconColor, opacity: 0.6 }}
                    className="group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {style.icon}
                  </motion.div>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-colors duration-300"
                    style={{ background: "transparent" }}
                  >
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400 font-medium"
                      style={{
                        fontSize: "0.875rem",
                        background: "rgba(0,0,0,0.6)",
                        padding: "6px 16px",
                        borderRadius: "9999px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Click for details
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "24px" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
                    <h3 className="text-white group-hover:text-cyan-400 transition-colors font-semibold" style={{ fontSize: "1.125rem" }}>
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
                  <p className="text-gray-400 line-clamp-2" style={{ fontSize: "0.875rem", marginBottom: "20px", lineHeight: "1.6" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: "8px" }}>
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 text-gray-400 border border-white/5"
                        style={{ padding: "4px 12px", fontSize: "0.75rem" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
