"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <motion.h2
        className="font-bold text-center"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", marginBottom: "12px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Let&apos;s Build{" "}
        <span className="gradient-text">Something Together</span>
      </motion.h2>
      <motion.p
        className="text-gray-500 text-center"
        style={{ maxWidth: "448px", margin: "0 auto 56px", fontSize: "0.9375rem" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Have a project in mind? Let&apos;s talk about how we can work together.
      </motion.p>

      <div
        className="grid md:grid-cols-2 items-start"
        style={{ gap: "64px", maxWidth: "896px", margin: "0 auto" }}
      >
        {/* Left — Contact info */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { icon: <FiMail size={20} />, label: "Email", value: "zainabidin090@gmail.com", href: "mailto:zainabidin090@gmail.com" },
            { icon: <FiPhone size={20} />, label: "Phone", value: "+92 316 4610422", href: "tel:+923164610422" },
            { icon: <FiMapPin size={20} />, label: "Location", value: "Lahore, Punjab, Pakistan", href: undefined },
          ].map((item) => (
            <div key={item.label} className="flex items-center" style={{ gap: "16px" }}>
              <div
                className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400"
                style={{ width: "48px", height: "48px", flexShrink: 0 }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-gray-500" style={{ fontSize: "0.75rem", marginBottom: "2px" }}>{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-gray-300 hover:text-cyan-400 transition-colors" style={{ fontSize: "0.9375rem" }}>
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-300" style={{ fontSize: "0.9375rem" }}>{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social links */}
          <div className="flex" style={{ gap: "16px", paddingTop: "8px" }}>
            {[
              { icon: <FiGithub size={20} />, href: "https://github.com/zaini019" },
              { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/zain-ul-abidin-06a783219" },
              { icon: <FiMail size={20} />, href: "mailto:zainabidin090@gmail.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                style={{ width: "44px", height: "44px" }}
                whileHover={{ scale: 1.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
            style={{ padding: "14px 18px", fontSize: "0.9375rem" }}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
            style={{ padding: "14px 18px", fontSize: "0.9375rem" }}
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 resize-none"
            style={{ padding: "14px 18px", fontSize: "0.9375rem" }}
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            style={{ padding: "14px", fontSize: "0.9375rem" }}
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <div className="text-center border-t border-white/5" style={{ marginTop: "96px", paddingTop: "32px" }}>
        <p className="text-gray-600" style={{ fontSize: "0.875rem" }} suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Zain Ul Abidin. All rights reserved.
        </p>
      </div>
    </SectionWrapper>
  );
}
