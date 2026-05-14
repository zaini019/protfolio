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
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ padding: "24px" }}
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
            className="relative w-full rounded-2xl bg-[#0f172a] border border-white/10 overflow-y-auto"
            style={{ maxWidth: "672px", maxHeight: "80vh", padding: "36px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute text-gray-400 hover:text-white transition-colors"
              style={{ top: "16px", right: "16px" }}
            >
              <HiX size={24} />
            </button>

            {/* Category badge */}
            <span
              className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
              style={{ padding: "4px 14px", fontSize: "0.75rem", marginBottom: "20px" }}
            >
              {project.category}
            </span>

            <h3 className="text-white font-bold" style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
              {project.title}
            </h3>

            <p className="text-gray-400" style={{ lineHeight: "1.75", marginBottom: "28px", fontSize: "0.9375rem" }}>
              {project.longDescription}
            </p>

            {/* Stack */}
            <div style={{ marginBottom: "28px" }}>
              <p className="text-gray-500 uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.05em", marginBottom: "14px" }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap" style={{ gap: "8px" }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/5 border border-white/10 text-gray-300"
                    style={{ padding: "6px 14px", fontSize: "0.875rem" }}
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
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                style={{ gap: "8px", padding: "10px 20px" }}
              >
                <FiExternalLink />
                Visit Live Site
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
