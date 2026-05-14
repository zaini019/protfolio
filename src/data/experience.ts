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
