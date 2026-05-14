export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  liveUrl?: string;
  image: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "aml-watcher",
    title: "AML Watcher",
    description:
      "AML compliance monitoring with rule-based alerts and real-time transaction monitoring.",
    longDescription:
      "Built an AML (Anti-Money Laundering) watcher to monitor transactions for suspicious activity and ensure compliance with regulatory standards. Integrated rule-based alerts and risk scoring to identify high-risk users or patterns in real time, helping prevent fraud and financial crimes.",
    stack: ["Node.js", "React.js", "MongoDB", "REST APIs"],
    liveUrl: "https://amlwatcher.com/",
    image: "/projects/aml-watcher.png",
    category: "Fintech",
  },
  {
    id: "arrivy",
    title: "Arrivy",
    description:
      "Field service management platform for scheduling, dispatching, and tracking.",
    longDescription:
      "A comprehensive field service management platform that streamlines scheduling, dispatching, and real-time tracking of field crews. Built with a robust backend and responsive frontend to handle complex operational workflows.",
    stack: ["Vue.js", "Node.js", "Laravel", "PostgreSQL"],
    liveUrl: "https://www.arrivy.com/",
    image: "/projects/arrivy.png",
    category: "SaaS",
  },
  {
    id: "blixtpay",
    title: "BlixtPay",
    description:
      "Crypto payment platform with FIAT to crypto conversion and NFT payments.",
    longDescription:
      "A platform enabling merchants to accept cryptocurrency transactions, including NFT payments. Enabled users to convert FIAT currency to crypto for purchases or deposits. Designed and developed an intuitive interface for managing crypto transactions, enhancing user experience in tracking, reporting, and ensuring KYC compliance.",
    stack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    liveUrl: "https://dev.blixtpay.com/",
    image: "/projects/blixtpay.png",
    category: "Fintech",
  },
  {
    id: "arrivy-crm",
    title: "Arrivy CRM Integrations",
    description:
      "60+ third-party CRM integrations including Zoho, HubSpot, Salesforce, and Zapier.",
    longDescription:
      "Led the integration of 60+ third-party CRMs and services with the Arrivy platform. Connected popular tools including Zoho, Zapier, HubSpot, Salesforce, Mail Parser, GCP, Google Calendar, Calendly, and many more. Built robust API connectors handling authentication, data sync, webhooks, and error recovery across all integrations.",
    stack: ["Node.js", "REST APIs", "GraphQL", "GCP", "Third-party APIs"],
    image: "/projects/arrivy-crm.png",
    category: "Integrations",
  },
  {
    id: "scribemedix",
    title: "ScribeMedix AI Medical Scribing",
    description:
      "AI-powered medical scribing tool with ~95% accuracy using OpenAI Whisper.",
    longDescription:
      "An AI-powered medical scribing tool integrated with Athenahealth that automatically records doctor-patient appointments via WebRTC, transcribes conversations using OpenAI Whisper at ~95% accuracy, and auto-fills EHR forms through intelligent API automation reducing physician interaction with the system by up to 70% while generating a structured clinical summary for every patient record.",
    stack: ["Python", "FastAPI", "OpenAI Whisper", "WebRTC", "LangChain"],
    image: "/projects/scribemedix.png",
    category: "AI / Healthcare",
  },
  {
    id: "open-banking",
    title: "Open Banking Platform",
    description:
      "Open banking solution integrated with 250+ EEA banks for merchant financial services.",
    longDescription:
      "Played a key role in creating an open banking solution offering a wide range of financial services to merchants. Integrated with 250+ EEA banks to ensure seamless compatibility and system integration. Built scalable backend infrastructure capable of handling high-volume requests efficiently.",
    stack: ["Node.js", "Laravel", "PostgreSQL", "Microservices"],
    image: "/projects/open-banking.png",
    category: "Fintech",
  },
  {
    id: "saas-crm",
    title: "SaaS-Based CRM Platform",
    description:
      "Multi-tenant CRM with lead management, task delegation, and analytics dashboards.",
    longDescription:
      "Developed a modern CRM frontend with modules for lead management, task delegation, and analytics. Built a secure multi-tenant architecture to handle organizational data across different clients. Integrated functionalities such as lead tracking, sales pipeline management, task assignment, and performance dashboards. Deployed using Docker containers with PM2 for process management.",
    stack: ["Vue.js", "Node.js", "Docker", "PM2", "MongoDB"],
    image: "/projects/saas-crm.png",
    category: "SaaS",
  },
  {
    id: "crypto-merchants",
    title: "Cryptocurrency Integration for Merchants",
    description:
      "FIAT to crypto conversion platform with NFT payments and KYC compliance.",
    longDescription:
      "Contributed to the development of a platform enabling merchants to accept cryptocurrency transactions, including NFT payments. Enabled users to convert FIAT currency to crypto for purchases or deposits. Designed and developed an intuitive interface for managing crypto transactions, enhancing user experience in tracking, reporting, and ensuring KYC compliance.",
    stack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    image: "/projects/crypto-merchants.png",
    category: "Fintech",
  },
];
