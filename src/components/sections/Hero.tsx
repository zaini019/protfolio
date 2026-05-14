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
      <div
        className="absolute rounded-full animate-pulse"
        style={{ top: "25%", left: "-128px", width: "384px", height: "384px", background: "rgba(6,182,212,0.1)", filter: "blur(120px)" }}
      />
      <div
        className="absolute rounded-full animate-pulse"
        style={{ bottom: "25%", right: "-128px", width: "384px", height: "384px", background: "rgba(59,130,246,0.1)", filter: "blur(120px)" }}
      />

      <ParticlesBackground />

      {/* Content */}
      <div className="relative z-10 text-center" style={{ padding: "0 24px" }}>
        {/* Typing name */}
        <motion.h1
          className="font-bold"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", marginBottom: "16px" }}
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
          className="text-gray-400"
          style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", marginBottom: "12px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Full-Stack Software Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-gray-500"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", maxWidth: "576px", margin: "0 auto 40px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          Building production-grade products across Fintech, Healthcare, CRM &
          AI
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: "16px", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <button
            onClick={() =>
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            style={{ padding: "14px 28px", fontSize: "0.9375rem" }}
          >
            View Projects
          </button>
          <a
            href="/cv.pdf"
            download
            className="border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
            style={{ padding: "14px 28px", fontSize: "0.9375rem" }}
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Floating social icons — left side */}
      <motion.div
        className="hidden md:flex absolute flex-col z-20"
        style={{ left: "24px", top: "50%", transform: "translateY(-50%)", gap: "20px" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        {[
          { icon: <FiGithub size={20} />, href: "https://github.com/zaini019" },
          { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/zain-ul-abidin-06a783219" },
          { icon: <FiMail size={20} />, href: "mailto:zainabidin090@gmail.com" },
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
        <div style={{ width: "1px", height: "80px", background: "#374151", margin: "0 auto" }} />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
