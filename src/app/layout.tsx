import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={`dark ${inter.className}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
