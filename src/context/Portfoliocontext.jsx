import { context } from "./usePortfolio";
export default function Portfoliocontext({ children }) {
  const PROFILE = {
    name: "Ekeh Chima Martins", // TODO
    role: "Web & App Developer",
    tagline:
      "I design and build clean, fast websites and web apps — from first sketch to shipped product.",
    location: "Abuja, Nigeria", // TODO
    email: "chimamartins55@gmail.com", // TODO
    github: "https://github.com/yourhandle", // TODO
    linkedin: "https://linkedin.com/in/yourhandle", // TODO
  };
  const PROJECTS = [
    {
      title: "Taskflow",
      description:
        "A lightweight task manager with auth, filtering, and a keyboard-first workflow. Built for small teams who don't want Jira.",
      tags: ["React", "Tailwind", "Node.js", "PostgreSQL"],
      live: "https://example.com",
      repo: "https://github.com/yourhandle/taskflow",
      featured: true,
    },
    {
      title: "Ledger POS",
      description:
        "Point-of-sale web app for independent shops — offline-first, receipt printing, and daily sales reports.",
      tags: ["Next.js", "TypeScript", "SQLite"],
      live: "https://example.com",
      repo: "https://github.com/yourhandle/ledger-pos",
      featured: true,
    },
    {
      title: "Weathervane",
      description:
        "A minimal weather dashboard with 7-day forecasts and saved locations.",
      tags: ["React", "Tailwind", "OpenWeather API"],
      live: "https://example.com",
      repo: "https://github.com/yourhandle/weathervane",
      featured: false,
    },
    {
      title: "Notely",
      description:
        "Markdown notes app with tagging, full-text search, and local-first sync.",
      tags: ["React", "IndexedDB"],
      live: "https://example.com",
      repo: "https://github.com/yourhandle/notely",
      featured: false,
    },
  ];

  return (
    <context.Provider value={{ PROFILE, PROJECTS }}>
      {children}
    </context.Provider>
  );
}
