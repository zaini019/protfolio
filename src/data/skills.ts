export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React.js", "Vue.js", "Next.js", "Nuxt.js", "Tailwind CSS", "Vuetify", "SCSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Laravel", "Python", "FastAPI", "Django", "PHP"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    name: "AI / ML",
    skills: ["LangChain", "OpenAI", "Python"],
  },
  {
    name: "DevOps",
    skills: ["AWS", "GCP", "Docker", "GitHub Actions"],
  },
  {
    name: "Integrations",
    skills: ["Salesforce", "Zapier"],
  },
];
