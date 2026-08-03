import {
  useState,
  //  useEffect
} from "react";
import { Sun, Moon, Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * PERSONAL PORTFOLIO — React + Tailwind
 *
 * Setup notes:
 * 1. In tailwind.config.js set:  darkMode: 'class'
 * 2. Add a monospace font (JetBrains Mono / ui-monospace works out of the box
 *    with the `font-mono` utility, no extra install needed).
 * 3. Everything you should personalize is marked  // TODO
 */

// ---------------------------------------------------------------------------
// TODO: your info
// ---------------------------------------------------------------------------
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

const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "REST APIs",
]; // TODO: edit to match your stack

// TODO: replace with your real projects
const PROJECTS = [
  {
    title: "Movie App",
    description:
      " A React app using The Movie Database (TMDB) API to display movies trailers, and details",
    tags: ["React", "Tailwind", "Supabases"],
    live: "https://yourmovieapp-link.vercel.app",
    repo: "https://github.com/Martinssx1/movie-app",
    featured: true,
  },
  {
    title: "Quiz App",
    description: "Test your knowledge on different categories ",
    tags: ["React", "TypeScript", "Tailwind"],
    live: "https://quiz-app-dun-chi-36.vercel.app/",
    repo: "https://github.com/Martinssx1/quiz-app",
    featured: true,
  },
  {
    title: "TaskManagerApp",
    description: "Save,Edit and Delete task with due dates and Email reminders",
    tags: ["React", "Tailwind", "MySQL", "Nodejs"],
    live: "https://example.com",
    repo: "https://github.com/Martinssx1/taskManager",
    featured: false,
  },
  {
    title: "Ip addressFinder",
    description: "Using the ip you enter to give a pinpoint address",
    tags: ["React", "Typescript", "Tailwind"],
    live: "https://react-ip-address-finder.vercel.app/",
    repo: "https://github.com/Martinssx1/react-ip-address-finder",
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// small pieces
// ---------------------------------------------------------------------------

function SectionLabel({ children }) {
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
      {children}
    </p>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {children}
    </span>
  );
}

function BlinkingCursor() {
  return (
    <span
      className="ml-0.5 inline-block w-0.5 animate-pulse bg-emerald-500 align-middle"
      style={{ height: "0.85em" }}
    />
  );
}

function IconLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
    >
      <Icon size={16} />
    </a>
  );
}

// ---------------------------------------------------------------------------
// nav
// ---------------------------------------------------------------------------

function Nav({ theme, onToggleTheme }) {
  const links = [
    ["Projects", "#projects"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          {PROFILE.name.split(" ")[0].toLowerCase()}
          <span className="text-emerald-500">.dev</span>
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-3xl px-5 pb-16 pt-16 sm:pt-24">
      <p className="mb-4 font-mono text-sm text-zinc-400 dark:text-zinc-500">
        $ whoami
      </p>
      <h1 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {PROFILE.name}
        <BlinkingCursor />
      </h1>
      <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
        {PROFILE.role}
      </p>
      <p className="mt-5 max-w-xl text-zinc-600 dark:text-zinc-300">
        {PROFILE.tagline}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
        >
          View projects <ArrowUpRight size={15} />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
        >
          Get in touch
        </a>

        <div className="ml-auto flex gap-2">
          <IconLink href={PROFILE.github} icon={FaGithub} label="GitHub" />
          <IconLink
            href={PROFILE.linkedin}
            icon={FaLinkedin}
            label="LinkedIn"
          />
          <IconLink
            href={`mailto:${PROFILE.email}`}
            icon={Mail}
            label="Email"
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// projects
// ---------------------------------------------------------------------------

function ProjectCard({ project }) {
  return (
    <div className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-emerald-500/60 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-400/50">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-emerald-600 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
            aria-label={`${project.title} live site`}
          >
            <ExternalLink size={14} />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-emerald-600 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
            aria-label={`${project.title} repository`}
          >
            <FaGithub size={14} />
          </a>
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-3xl px-5 py-16">
      <SectionLabel>$ projects</SectionLabel>
      <h2 className="mb-8 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Selected work
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <p className="mb-4 mt-10 font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            more
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// about
// ---------------------------------------------------------------------------

function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-5 py-16">
      <SectionLabel>$ about</SectionLabel>
      <h2 className="mb-5 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        A bit about me
      </h2>
      <p className="max-w-xl text-zinc-600 dark:text-zinc-300">
        {/* TODO: replace with your real bio */}
        I'm a developer based in {PROFILE.location} who enjoys turning rough
        ideas into products people actually use. I care about clean interfaces,
        fast load times, and code that's easy for the next person (often future
        me) to pick up.
      </p>

      <p className="mt-5 mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Stack I reach for
      </p>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// contact
// ---------------------------------------------------------------------------

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-16">
      <SectionLabel>$ contact</SectionLabel>
      <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Let's work together
      </h2>
      <p className="mb-6 max-w-xl text-zinc-600 dark:text-zinc-300">
        Have a project in mind, or just want to say hi? My inbox is open.
      </p>
      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
      >
        <Mail size={15} /> {PROFILE.email}
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-5 text-sm text-zinc-400 dark:text-zinc-600 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Built with React &amp;
          Tailwind.
        </p>
        <div className="flex gap-2">
          <IconLink href={PROFILE.github} icon={FaGithub} label="GitHub" />
          <IconLink
            href={PROFILE.linkedin}
            icon={FaLinkedin}
            label="LinkedIn"
          />
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// app root
// ---------------------------------------------------------------------------

export default function App() {
  const [theme, setTheme] = useState("light");
  /*
  // Respect system preference on first load
  useEffect(() => {
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) setTheme("dark");
  }, []);
*/
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <Nav
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
