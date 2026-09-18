import { useState } from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { ExternalLink, Mail, Phone, Sun, Moon } from "lucide-react";

// ---------------------------------------------------------------------------
// Profile data
// ---------------------------------------------------------------------------
const PROFILE = {
  name: "Ekeh Chima Martins",
  role: "Web Developer",
  tagline:
    "I design and build clean, fast websites and web apps — from first sketch to shipped product.",
  location: "Abuja, Nigeria",
  email: "chimamartins55@gmail.com",
  whatsapp: "+2347055767707",
  phone: "+2349120427219",
  github: "https://github.com/Martinssx1",
  linkedin: "https://linkedin.com/in/yourhandle", // TODO: your real LinkedIn URL
  status: "Open to work",
};

const SKILLS = [
  { name: "React", note: "Component architecture" },
  { name: "TypeScript", note: "Type-safe apps" },
  { name: "Node.js", note: "API & tooling" },
  { name: "Tailwind CSS", note: "Design systems" },
  { name: "PostgreSQL", note: "Data modeling" },
  { name: "REST APIs", note: "Service integration" },
];

const PROJECTS = [
  {
    title: "Movie App",
    description:
      "A React app using The Movie Database (TMDB) API to display movies, trailers, and details.",
    tags: ["React", "Tailwind", "Supabase"],
    image: "media/movieapp.png",
    live: "https://yourmovieapp-link.vercel.app",
    repo: "https://github.com/Martinssx1/movie-app",
  },
  {
    title: "Quiz App",
    description: "Test your knowledge on different categories.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "media/quizapp.png",
    live: "https://quiz-app-dun-chi-36.vercel.app/",
    repo: "https://github.com/Martinssx1/quiz-app",
  },
  {
    title: "Task Manager App",
    description:
      "Save, edit, and delete tasks with due dates and email reminders.",
    tags: ["React", "Tailwind", "MySQL", "Node.js"],
    image: "media/taskapp.png",
    live: "https://task-managerfrontend-bice.vercel.app/",
    repo: "https://github.com/Martinssx1/taskManager",
  },
  {
    title: "IP Address Finder",
    description: "Uses the IP you enter to give a pinpoint address.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "media/ipaddress.png",
    live: "https://react-ip-address-finder.vercel.app/",
    repo: "https://github.com/Martinssx1/react-ip-address-finder",
  },
];

const CONTACT_METHODS = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: PROFILE.whatsapp,
    href: `https://wa.me/${PROFILE.whatsapp.replace(/[^\d]/g, "")}`,
    icon: FaWhatsapp,
  },
  {
    label: "Phone",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone}`,
    icon: Phone,
  },
  {
    label: "GitHub",
    value: PROFILE.github.replace("https://", ""),
    href: PROFILE.github,
    icon: FaGithub,
  },
];

// ---------------------------------------------------------------------------
// Styles — carries over the tokens/effects from the original design
// ---------------------------------------------------------------------------
const STYLES = `
  .pf-root {
    --radius: 3px;
    --radius-card: 14px;
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--ink);
    transition: background 0.4s ease, color 0.4s ease;
  }
  .pf-root[data-theme="light"] {
    --bg: #FFFFFF; --surface: #FFFFFF; --ink: #1E1214; --muted: #756459;
    --accent: #7A1B2C; --accent-soft: #F4E3DB; --trim: #B08A4E;
    --line: rgba(30,18,20,0.10); --card-line: rgba(30,18,20,0.16);
    --shirt-shadow: rgba(122,27,44,0.08); --nav-shadow: rgba(30,18,20,0.10);
  }
  .pf-root[data-theme="dark"] {
    --bg: #0A0A0B; --surface: #1B1C1E; --ink: #EDEDED; --muted: #97989B;
    --accent: #D6D8DB; --accent-soft: #2A2B2D; --trim: #E11B3C;
    --line: rgba(255,255,255,0.10); --card-line: rgba(255,255,255,0.18);
    --shirt-shadow: rgba(0,0,0,0.55); --nav-shadow: rgba(0,0,0,0.45);
  }
  .pf-root h1, .pf-root h2, .pf-root h3, .pf-root .pf-display {
    font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; margin: 0;
  }

  /* Nav — fixed, clean solid line in the brand colors, soft shadow beneath */
  .pf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    background: var(--bg);
    box-shadow: 0 4px 16px -6px var(--nav-shadow);
  }
  .pf-nav::after {
    content: ""; display: block; height: 2px;
    background: linear-gradient(to right, var(--trim), var(--accent));
  }
  .pf-ball-mark {
    width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--ink); flex-shrink: 0;
    background: conic-gradient(from 90deg, transparent 0 90deg, var(--ink) 90deg 100deg, transparent 100deg 180deg,
      var(--ink) 180deg 190deg, transparent 190deg 270deg, var(--ink) 270deg 280deg, transparent 280deg 360deg);
  }

  /* Nav links — bigger, weightier, underline-on-hover instead of a flat muted list */
  .pf-nav-links a {
    position: relative;
    color: var(--muted);
    font-weight: 600;
    font-size: 14.5px;
    letter-spacing: 0.01em;
    padding-bottom: 3px;
    transition: color 0.2s ease;
  }
  .pf-nav-links a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 2px;
    background: var(--accent);
    transition: width 0.25s ease;
  }
  .pf-nav-links a:hover { color: var(--ink); }
  .pf-nav-links a:hover::after { width: 100%; }

  /* Theme toggle — Home (sun) / Away (dark, moon) pill switch */
  .pf-toggle {
    display: flex; align-items: center; gap: 2px;
    border: 1px solid var(--card-line); background: var(--surface);
    border-radius: 999px; padding: 4px; transition: border-color 0.3s ease;
  }
  .pf-toggle:hover { border-color: var(--accent); }
  .pf-toggle-option {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em;
    padding: 7px 13px; border-radius: 999px; color: var(--muted);
    transition: background 0.25s ease, color 0.25s ease;
  }
  .pf-toggle-option svg { flex-shrink: 0; }
  .pf-toggle-option.active { background: var(--accent); color: var(--bg); }
  .pf-root[data-theme="dark"] .pf-toggle-option.active {
    color: #0B0B0C;
    box-shadow: 0 0 12px -2px var(--trim);
  }

  .pf-hero { position: relative; }
  .pf-root[data-theme="dark"] .pf-hero::before {
    content: ""; position: absolute; top: -60px; right: -80px; width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(225,27,60,0.10) 0%, transparent 70%); pointer-events: none; z-index: 0;
  }
  .pf-hero::after {
    content: ""; position: absolute; top: 50%; right: -60px; width: 320px; height: 320px;
    border: 1px solid var(--card-line); border-radius: 50%; transform: translateY(-50%); pointer-events: none; z-index: 0;
  }
  .pf-hero > * { position: relative; z-index: 1; }
  .pf-kit-tag { color: var(--muted); }
  .pf-kit-tag::before { content: ""; width: 18px; height: 2px; background: var(--trim); display: inline-block; }
  .pf-hero h1 { color: var(--ink); font-weight: 700; }
  .pf-hero h1 em { font-style: normal; color: var(--accent); }

  .pf-btn { border-radius: var(--radius); transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease; }
  .pf-btn:hover { transform: translateY(-1px); opacity: 0.92; }
  .pf-btn-primary { background: var(--accent); color: var(--bg); border: 1px solid var(--accent); }
  .pf-root[data-theme="dark"] .pf-btn-primary { color: #0A0A0B; }
  .pf-btn-primary:hover { box-shadow: 0 10px 24px -10px var(--shirt-shadow); }
  .pf-btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--card-line); }

  .pf-card {
    background: var(--surface); border: 1px solid var(--card-line); border-radius: var(--radius);
    box-shadow: 0 18px 40px -24px var(--shirt-shadow);
  }
  .pf-card .pf-num {
    font-family: 'Oswald', sans-serif; font-weight: 700; -webkit-text-stroke: 1.5px var(--accent);
    color: transparent; line-height: 1;
  }
  .pf-card dt { color: var(--muted); }

  .pf-section { border-top: 1px dashed var(--card-line); }
  .pf-section-note { color: var(--muted); font-family: 'Inter'; text-transform: none; }

  .pf-skills-grid { background: var(--card-line); border: 1px solid var(--card-line); }
  .pf-skill { background: var(--bg); }
  .pf-skill small { color: var(--muted); }

  /* Project cards — whole card is a link, radius bumped up, shadow-only hover (no border color change) */
  .pf-project-card {
    display: block;
    background: var(--surface); border: 1px solid var(--card-line); border-radius: var(--radius-card);
    overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }
  .pf-project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 54px -22px var(--shirt-shadow), 0 10px 22px -10px var(--shirt-shadow);
  }
  .pf-project-media {
    position: relative; aspect-ratio: 16 / 9; background: var(--accent-soft);
    border-bottom: 1px solid var(--card-line); overflow: hidden;
  }
  .pf-project-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pf-project-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--accent-soft), var(--surface));
  }
  .pf-project-placeholder span {
    font-family: 'Oswald', sans-serif; font-size: 56px; font-weight: 700;
    -webkit-text-stroke: 1.5px var(--accent); color: transparent;
  }
  .pf-project-num {
    position: absolute; top: 10px; left: 10px; font-family: 'Oswald', sans-serif;
    font-size: 12px; font-weight: 600; color: var(--bg); background: var(--accent);
    padding: 3px 8px; border-radius: 6px; letter-spacing: 0.04em;
  }
  .pf-project-repo {
    position: absolute; top: 10px; right: 10px; width: 30px; height: 30px;
    display: flex; align-items: center; justify-content: center; border-radius: 50%;
    background: var(--bg); color: var(--ink); border: none; cursor: pointer;
    box-shadow: 0 6px 16px -6px rgba(0,0,0,0.4);
    transition: transform 0.2s ease, color 0.2s ease;
  }
  .pf-project-repo:hover { transform: scale(1.08); color: var(--accent); }
  .pf-project-body h3 { text-transform: none; font-weight: 600; }
  .pf-project-arrow { color: var(--muted); transition: transform 0.25s ease, color 0.25s ease; flex-shrink: 0; }
  .pf-project-card:hover .pf-project-arrow { transform: translate(2px, -2px); color: var(--accent); }
  .pf-project-body p { color: var(--muted); font-family: 'Inter'; text-transform: none; }
  .pf-project-tags { color: var(--accent); }

  /* Contact list */
  .pf-contact-row {
    border-bottom: 1px solid var(--card-line); border-left: 3px solid transparent;
    transition: border-left-color 0.2s ease, background 0.2s ease;
  }
  .pf-contact-row:hover { border-left-color: var(--accent); background: var(--accent-soft); }
  .pf-contact-row:first-child { border-top: 1px solid var(--card-line); }
  .pf-contact-icon {
    width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--card-line); color: var(--ink); flex-shrink: 0;
  }
  .pf-contact-label { color: var(--muted); }
  .pf-contact-value { font-family: 'Oswald', sans-serif; text-transform: none; font-weight: 500; }

  /* Footer */
  .pf-footer { margin-top: 24px; }
  .pf-footer-line {
    height: 2px;
    background: linear-gradient(to right, var(--trim), var(--accent));
  }
  .pf-footer-heading {
    font-family: 'Oswald', sans-serif; text-transform: uppercase;
    letter-spacing: 0.09em; font-size: 12px; color: var(--muted);
  }
  .pf-footer a { color: var(--ink); text-decoration: none; transition: color 0.2s ease; }
  .pf-footer-links a { color: var(--muted); font-size: 14px; }
  .pf-footer-links a:hover { color: var(--accent); }
  .pf-footer-social {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--card-line); color: var(--ink);
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }
  .pf-footer-social:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
  .pf-footer-bottom { border-top: 1px solid var(--line); color: var(--muted); }
  .pf-footer-top { color: var(--muted); font-weight: 500; font-size: 12.5px; }
  .pf-footer-top:hover { color: var(--accent); }
`;

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";
  return (
    <div
      className="pf-toggle cursor-pointer"
      onClick={onToggle}
      role="button"
      aria-label="Toggle light/dark theme"
    >
      <span className={`pf-toggle-option ${isLight ? "active" : ""}`}>
        <Sun size={13} /> Home
      </span>
      <span className={`pf-toggle-option ${!isLight ? "active" : ""}`}>
        <Moon size={13} /> Away
      </span>
    </div>
  );
}

function Nav({ theme, onToggle }) {
  return (
    <nav className="pf-nav">
      <div className="max-w-260 mx-auto flex items-center justify-between px-7 h-16">
        <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-wide">
          <span className="pf-ball-mark"></span>
          {PROFILE.name}
        </div>
        <div className="pf-nav-links hidden sm:flex gap-9">
          <a href="#work" className="no-underline">
            Work
          </a>
          <a href="#skills" className="no-underline">
            Stack
          </a>
          <a href="#contact" className="no-underline">
            Contact
          </a>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </nav>
  );
}

function Hero() {
  const [first, ...rest] = PROFILE.name.split(" ");
  const last = rest.join(" ");
  return (
    <section className="pf-hero grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-end pt-14 pb-16">
      <div>
        <div className="pf-kit-tag inline-flex items-center gap-2 text-xs mb-4">
          {PROFILE.role}
        </div>
        <h1 className="text-[48px] sm:text-[72px] md:text-[92px] leading-[0.94]">
          {first}
          <br />
          <em>{last}</em>
        </h1>
        <p
          className="mt-4 max-w-[46ch] text-lg normal-case"
          style={{ color: "var(--muted)", fontFamily: "'Inter', sans-serif" }}
        >
          {PROFILE.tagline}
        </p>
        <div className="mt-8 flex gap-3.5">
          <a
            href="#work"
            className="pf-btn pf-btn-primary text-sm font-semibold px-6 py-3 no-underline"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="pf-btn pf-btn-ghost text-sm font-semibold px-6 py-3 no-underline"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="pf-card p-6">
        <div className="pf-num text-5xl">01</div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-2 text-[13px]">
          <dt>Based</dt>
          <dd className="font-medium">{PROFILE.location}</dd>
          <dt>Focus</dt>
          <dd className="font-medium">React · Node · TypeScript</dd>
          <dt>Status</dt>
          <dd className="font-medium">{PROFILE.status}</dd>
        </dl>
      </div>
    </section>
  );
}

function SectionHead({ title, note }) {
  return (
    <div className="flex justify-between items-baseline mb-9">
      <h2 className="text-[28px]">{title}</h2>
      <span className="pf-section-note text-[13px]">{note}</span>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="pf-section py-16">
      <SectionHead title="Stack" note="tools I reach for" />
      <div className="pf-skills-grid grid grid-cols-2 sm:grid-cols-3 gap-px">
        {SKILLS.map((s) => (
          <div
            key={s.name}
            className="pf-skill px-4.5 py-5 text-sm font-medium"
          >
            {s.name}
            <small className="block mt-1">{s.note}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  const openRepo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(project.repo, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      className="pf-project-card no-underline"
    >
      <div className="pf-project-media">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="pf-project-placeholder">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="pf-project-num">
          {String(index + 1).padStart(2, "0")}
        </div>
        <button
          type="button"
          onClick={openRepo}
          className="pf-project-repo"
          aria-label={`${project.title} repository`}
        >
          <FaGithub size={14} />
        </button>
      </div>
      <div className="pf-project-body p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg">{project.title}</h3>
          <ExternalLink size={16} className="pf-project-arrow" />
        </div>
        <p className="mt-1.5 text-sm">{project.description}</p>
        <div className="pf-project-tags mt-3 text-[11px]">
          {project.tags.join(" · ")}
        </div>
      </div>
    </a>
  );
}

function Work() {
  return (
    <section id="work" className="pf-section py-16">
      <SectionHead
        title="Selected work"
        note={`0${PROJECTS.length} projects`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="pf-section py-16">
      <SectionHead title="Get in touch" note="pick your channel" />
      <div>
        {CONTACT_METHODS.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "GitHub" ? "_blank" : undefined}
              rel={c.label === "GitHub" ? "noreferrer" : undefined}
              className="pf-contact-row flex items-center gap-4 px-2 py-4 no-underline"
            >
              <span className="pf-contact-icon">
                <Icon size={16} />
              </span>
              <span className="flex-1">
                <span className="pf-contact-label block text-[11px] uppercase tracking-widest">
                  {c.label}
                </span>
                <span className="pf-contact-value block text-base mt-0.5">
                  {c.value}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-footer-line" />
      <div className="max-w-260 mx-auto px-7 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-wide mb-3">
            <span className="pf-ball-mark"></span>
            {PROFILE.name}
          </div>
          <p className="text-sm max-w-[30ch]" style={{ color: "var(--muted)" }}>
            {PROFILE.tagline}
          </p>
        </div>

        <div>
          <div className="pf-footer-heading mb-4">Navigate</div>
          <div className="pf-footer-links flex flex-col gap-2.5">
            <a href="#work">Work</a>
            <a href="#skills">Stack</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div>
          <div className="pf-footer-heading mb-4">Reach me</div>
          <div className="flex gap-2.5">
            {CONTACT_METHODS.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.label === "GitHub" ? "_blank" : undefined}
                  rel={c.label === "GitHub" ? "noreferrer" : undefined}
                  className="pf-footer-social"
                  aria-label={c.label}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pf-footer-bottom">
        <div className="max-w-260 mx-auto px-7 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12.5px]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <a href="#top" className="pf-footer-top no-underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App root
// ---------------------------------------------------------------------------
export default function Portfolio() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="pf-root" data-theme={theme} id="top">
      <style>{STYLES}</style>
      <Nav
        theme={theme}
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <div className="max-w-260 mx-auto px-7 pt-16">
        <Hero />
        <Skills />
        <Work />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
