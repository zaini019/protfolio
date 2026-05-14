export interface Certificate {
  title: string;
  issuer: string;
  type: "certification" | "award";
}

export const certificates: Certificate[] = [
  {
    title: "Certification of Completion — MEVN Stack",
    issuer: "Training Program, Lahore",
    type: "certification",
  },
  {
    title: "Google Developer Student Club (IEEE Chapter)",
    issuer: "Certification of Appreciation",
    type: "certification",
  },
  {
    title: "Certification of Achievement",
    issuer: "Mindstorm Studios",
    type: "certification",
  },
  {
    title: "Award for Best External Advisor",
    issuer: "Forman Christian College University, Lahore",
    type: "award",
  },
];
