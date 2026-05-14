"use client";

import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { certificates } from "@/data/certificates";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Certificates() {
  return (
    <SectionWrapper id="certificates">
      <motion.h2
        className="font-bold text-center"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "56px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Certificates & <span className="gradient-text">Awards</span>
      </motion.h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "24px", maxWidth: "1024px", margin: "0 auto" }}
      >
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            className="rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
            style={{ padding: "28px 24px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-full transition-transform duration-700" />
            </div>

            <div className="text-cyan-400" style={{ marginBottom: "16px" }}>
              <FiAward size={28} />
            </div>
            <h3 className="text-white font-medium" style={{ marginBottom: "8px", fontSize: "0.9375rem", lineHeight: "1.5" }}>
              {cert.title}
            </h3>
            <p className="text-gray-500" style={{ fontSize: "0.8125rem" }}>{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
