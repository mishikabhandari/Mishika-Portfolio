import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-data.jpg";
import projectAmazon from "@/assets/project-amazon.jpg";
import projectCoffee from "@/assets/project-coffee.jpg";
import avatarImg from "@/assets/avatar.jpg";
import resumeAsset from "@/assets/Mishika Bhandari.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mishika — Aspiring Data Analyst" },
      { name: "description", content: "Portfolio of Mishika — aspiring Data Analyst & CS student. SQL, Python, Power BI, Business Intelligence." },
      { property: "og:title", content: "Mishika — Aspiring Data Analyst" },
      { property: "og:description", content: "Transforming Data into Actionable Insights." },
    ],
  }),
  component: Portfolio,
});

/* ---------------- Typing effect ---------------- */
function useTyping(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => p + 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

/* ---------------- Counter ---------------- */
function Counter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.floor(end * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ---------------- Reveal on scroll ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("opacity-100", "translate-y-0");
          e.target.classList.remove("opacity-0", "translate-y-6");
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700", "ease-out");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/* ---------------- Theme ---------------- */
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

/* ---------------- Data ---------------- */
const SKILLS = {
  "Data Analytics": [
    { name: "SQL", level: 90 }, { name: "Advanced SQL", level: 85 }, { name: "MySQL", level: 88 },
    { name: "Python", level: 85 }, { name: "Pandas", level: 88 }, { name: "NumPy", level: 82 },
    { name: "Data Cleaning", level: 90 }, { name: "EDA", level: 88 }, { name: "Data Visualization", level: 90 },
    { name: "Statistics", level: 80 }, { name: "Excel", level: 92 }, { name: "Power BI", level: 90 },
    { name: "Dashboard Development", level: 88 }, { name: "Business Intelligence", level: 85 },
  ],
  "Web Development": [
    { name: "HTML5", level: 90 }, { name: "CSS3", level: 88 }, { name: "JavaScript", level: 82 },
  ],
  "Version Control": [
    { name: "Git", level: 85 }, { name: "GitHub", level: 88 },
  ],
  "Soft Skills": [
    { name: "Problem Solving", level: 92 }, { name: "Analytical Thinking", level: 95 },
    { name: "Communication", level: 88 }, { name: "Attention to Detail", level: 90 },
  ],
};

const CATEGORY_ICONS: Record<string, string> = {
  "Data Analytics": "fa-solid fa-chart-line",
  "Web Development": "fa-solid fa-code",
  "Version Control": "fa-brands fa-git-alt",
  "Soft Skills": "fa-solid fa-lightbulb",
};

const PROJECTS = [
  {
    title: "Amazon Sales Analytics Dashboard",
    image: projectAmazon,
    desc: "Analyzed sales trends, top-performing products, regional performance, and profitability metrics across 1 Lakh+ customers.",
    tech: ["SQL", "Python", "Power BI"],
    insights: [
      "1 Lakh+ customer records analyzed",
      "Top product categories & regional hotspots identified",
      "Profitability breakdown by category & geography",
    ],
    github: "https://github.com/mishikabhandari/Amazon-Sales-Analysis-Dashboard",
    category: "Dashboard",
  },
  {
    title: "Coffee Taste Test Analytics",
    image: projectCoffee,
    desc: "Performed coffee segmentation and behavioral analysis to identify coffee demand and taste preferences across consumer cohorts.",
    tech: ["Python", "SQL", "Power BI"],
    insights: [
      "Consumer segmentation by taste profile",
      "Behavioral patterns in coffee preference",
      "Demand drivers across cohorts surfaced",
    ],
    github: "https://github.com/mishikabhandari/Great-American-Coffee-Taste-Test-Analysis-",
    category: "Analytics",
  },
];

const TIMELINE = [
  { step: "Excel", desc: "Foundations: formulas, pivot tables, data modeling.", icon: "fa-solid fa-table" },
  { step: "SQL", desc: "Querying, joins, aggregations, window functions.", icon: "fa-solid fa-database" },
  { step: "Python", desc: "Pandas, NumPy, data cleaning & EDA.", icon: "fa-brands fa-python" },
  { step: "Power BI", desc: "Dashboards, DAX, interactive reporting.", icon: "fa-solid fa-chart-pie" },
  { step: "Projects", desc: "End-to-end analytics on real datasets.", icon: "fa-solid fa-rocket" },
];

/* ---------------- Page ---------------- */
function Portfolio() {
  const { dark, toggle } = useTheme();
  const typed = useTyping(["Aspiring Data Analyst", "BI Enthusiast", "Insights Storyteller"]);
  useReveal();

  const [filter, setFilter] = useState<string>("All");
  const [modal, setModal] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setLoading(false), 700);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  const filtered = PROJECTS.filter((p) => filter === "All" || p.category === filter);
  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const navLinks = [
    ["home", "Home"], ["about", "About"], ["skills", "Skills"],
    ["projects", "Projects"], ["journey", "Journey"], ["resume", "Resume"], ["contact", "Contact"],
  ] as const;

  if (loading) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-background z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          </div>
          <p className="text-sm font-mono text-muted-foreground">Loading insights…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${scrolled ? "glass rounded-2xl mx-3 sm:mx-6" : ""}`}>
          <nav className="flex items-center justify-between py-3">
            <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg text-primary-foreground shadow-glow">M</span>
              <span className="hidden sm:inline">Mishika<span className="text-primary">.</span></span>
            </a>
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/60">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button onClick={toggle} aria-label="Toggle theme" className="h-9 w-9 grid place-items-center rounded-xl glass hover:scale-105 transition-transform">
                <i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"} text-sm`} />
              </button>
              <button onClick={() => setNavOpen((o) => !o)} aria-label="Menu" className="md:hidden h-9 w-9 grid place-items-center rounded-xl glass">
                <i className={`fa-solid ${navOpen ? "fa-xmark" : "fa-bars"} text-sm`} />
              </button>
            </div>
          </nav>
          {navOpen && (
            <ul className="md:hidden glass-card rounded-2xl p-3 mb-3 flex flex-col gap-1">
              {navLinks.map(([id, label]) => (
                <li key={id}>
                  <a onClick={() => setNavOpen(false)} href={`#${id}`} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted/60">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-mono mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Open to Data Analyst roles & internships
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm <span className="gradient-text">Mishika</span>
              <br />
              <span className="inline-flex items-baseline">
                {typed}
                <span className="ml-1 inline-block h-[0.9em] w-[3px] bg-primary caret-blink" />
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl">
              Transforming Data into Actionable Insights — SQL, Python, Power BI & Business Intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition-transform">
                <i className="fa-solid fa-chart-column" /> View Projects
              </a>
              <a href={resumeAsset.url} download="Mishika Bhandari.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass font-semibold hover:scale-[1.03] transition-transform">
                <i className="fa-solid fa-download" /> Download Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border font-semibold hover:bg-muted/60 transition-colors">
                <i className="fa-solid fa-paper-plane" /> Contact Me
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              {[
                { v: 100000, s: "+", label: "Rows analyzed" },
                { v: 14, s: "+", label: "Tools & skills" },
                { v: 2, s: "", label: "Showcase projects" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-4">
                  <div className="text-2xl font-bold gradient-text font-display">
                    <Counter end={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 gradient-bg opacity-20 blur-3xl rounded-3xl" />
            <div className="relative glass-card rounded-3xl p-3 elegant-shadow animate-float">
              <img
                src={heroImg}
                alt="Analytics dashboard visualization"
                width={1536}
                height={1024}
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground"><i className="fa-solid fa-database" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Latest analysis</div>
                  <div className="text-sm font-semibold">1 Lakh+ records</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/20 grid place-items-center text-accent-foreground"><i className="fa-solid fa-chart-pie" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Tooling</div>
                  <div className="text-sm font-semibold">Power BI · SQL · Python</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="A CS student obsessed with data">
        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start" data-reveal>
          <div className="relative mx-auto md:mx-0">
            <div className="absolute -inset-3 gradient-bg opacity-30 blur-2xl rounded-3xl" />
            <img src={avatarImg} alt="Mishika" width={800} height={800} loading="lazy" className="relative h-56 w-56 object-cover rounded-3xl glass-card p-2" />
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              I'm <strong>Mishika</strong> — a Computer Science student and aspiring Data Analyst. I love
              breaking down messy datasets into clear, business-ready insights using SQL, Python and
              Power BI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My focus areas are <strong>Business Intelligence, Data Visualization, SQL, Python</strong> and
              end-to-end analytics. I enjoy framing a business problem, exploring the data, and shipping
              a dashboard that anyone in the room can read.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                ["fa-graduation-cap", "Computer Science Student"],
                ["fa-chart-line", "Aspiring Data Analyst"],
                ["fa-lightbulb", "Business-problem solver"],
                ["fa-layer-group", "BI · Viz · SQL · Python"],
              ].map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3 glass rounded-xl px-3 py-2.5">
                  <span className="h-8 w-8 grid place-items-center rounded-lg gradient-bg text-primary-foreground text-sm"><i className={`fa-solid ${icon}`} /></span>
                  <span className="text-sm font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="Tools I work with">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} data-reveal className="glass-card rounded-3xl p-6 hover-lift">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 grid place-items-center rounded-xl gradient-bg text-primary-foreground">
                  <i className={CATEGORY_ICONS[cat]} />
                </div>
                <h3 className="text-xl font-semibold">{cat}</h3>
              </div>
              <div className="space-y-3">
                {items.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Projects" title="Selected work">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-reveal>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c ? "gradient-bg text-primary-foreground shadow-glow" : "glass hover:scale-105"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <a
            href="https://github.com/mishikabhandari"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium hover:scale-105 transition"
          >
            <i className="fa-brands fa-github" /> github.com/mishikabhandari
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, idx) => {
            const originalIdx = PROJECTS.indexOf(p);
            return (
              <article key={p.title} data-reveal className="group glass-card rounded-3xl overflow-hidden hover-lift">
                <div className="relative overflow-hidden">
                  <img src={p.image} alt={p.title} width={1280} height={800} loading="lazy" className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-mono">{p.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-bg text-primary-foreground text-sm font-medium hover:scale-105 transition">
                      <i className="fa-brands fa-github" /> GitHub Project
                    </a>
                    <button onClick={() => setModal(originalIdx)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted/60 transition">
                      <i className="fa-solid fa-chart-pie" /> Dashboard Preview
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* JOURNEY */}
      <Section id="journey" eyebrow="Journey" title="My learning path">
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
          <ol className="space-y-8">
            {TIMELINE.map((t, i) => (
              <li key={t.step} data-reveal className={`relative sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center ${i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}>
                <div className={`pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8"}`}>
                  <div className="glass-card rounded-2xl p-5 inline-block">
                    <div className="text-xs font-mono text-primary mb-1">Step {i + 1}</div>
                    <h4 className="text-lg font-semibold mb-1">{t.step}</h4>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-0 sm:left-1/2 top-2 sm:-translate-x-1/2">
                  <div className="h-9 w-9 rounded-full gradient-bg grid place-items-center text-primary-foreground shadow-glow">
                    <i className={t.icon} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* RESUME */}
      <Section id="resume" eyebrow="Resume" title="One page, zero fluff">
        <div data-reveal className="glass-card rounded-3xl p-8 sm:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Mishika — Data Analyst Resume</h3>
            <p className="text-muted-foreground mb-4">A snapshot of education, tooling, projects and soft skills — formatted for recruiters.</p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["SQL", "Python", "Power BI", "Pandas", "Excel", "BI"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
              ))}
            </div>
          </div>
          <a href={resumeAsset.url} download="Mishika Bhandari.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition-transform">
            <i className="fa-solid fa-file-arrow-down" /> Download Resume
          </a>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's build something with data">
        <div className="grid md:grid-cols-2 gap-6">
          <div data-reveal className="glass-card rounded-3xl p-7 space-y-4">
            {[
              { icon: "fa-envelope", label: "Email", value: "mishikabhandaris@gmail.com", href: "mailto:mishikabhandaris@gmail.com" },
              { icon: "fa-brands fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/mishikabhandari", href: "https://www.linkedin.com/in/mishikabhandari" },
              { icon: "fa-brands fa-github", label: "GitHub", value: "github.com/mishikabhandari", href: "https://github.com/mishikabhandari" },
              { icon: "fa-phone", label: "Phone", value: "+91 817881610", href: "tel:+91817881610" },
              { icon: "fa-location-dot", label: "Location", value: "India", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/60 transition-colors">
                <div className="h-11 w-11 grid place-items-center rounded-xl gradient-bg text-primary-foreground">
                  <i className={c.icon.startsWith("fa-brands") ? c.icon : `fa-solid ${c.icon}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-semibold truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            data-reveal
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll reply within 24 hours."); (e.target as HTMLFormElement).reset(); }}
            className="glass-card rounded-3xl p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="What's it about?" />
            <div>
              <label className="text-xs font-medium text-muted-foreground">Message</label>
              <textarea required rows={5} name="message" placeholder="Tell me about the role or project…" className="mt-1.5 w-full rounded-xl bg-background/50 border border-border px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-paper-plane" /> Send message
            </button>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid sm:grid-cols-[1fr_auto_auto] gap-6 items-center">
          <div>
            <div className="font-display text-lg font-bold">Mishika<span className="text-primary">.</span></div>
            <p className="text-sm text-muted-foreground mt-1">© {new Date().getFullYear()} Mishika. Built with data & care.</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              ["fa-brands fa-github", "https://github.com/mishikabhandari"],
              ["fa-brands fa-linkedin", "https://www.linkedin.com/in/mishikabhandari"],
              ["fa-solid fa-envelope", "mailto:mishikabhandaris@gmail.com"],
            ].map(([icon, href]) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-xl glass hover:scale-110 transition-transform">
                <i className={icon} />
              </a>
            ))}
          </div>
          <a href="#home" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform">
            <i className="fa-solid fa-arrow-up" /> Back to top
          </a>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setModal(null)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-card max-w-3xl w-full rounded-3xl overflow-hidden animate-scale-in">
            <div className="relative">
              <img src={PROJECTS[modal].image} alt={PROJECTS[modal].title} className="w-full h-72 object-cover" />
              <button onClick={() => setModal(null)} aria-label="Close" className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{PROJECTS[modal].title}</h3>
              <p className="text-muted-foreground mb-4">{PROJECTS[modal].desc}</p>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Key insights</h4>
              <ul className="space-y-2 mb-5">
                {PROJECTS[modal].insights.map((it) => (
                  <li key={it} className="flex gap-2 text-sm"><i className="fa-solid fa-circle-check text-accent mt-1" /> {it}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <a href={PROJECTS[modal].github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold">
                  <i className="fa-brands fa-github" /> Open on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10" data-reveal>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-2">{eyebrow}</div>
          <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-background/50 border border-border px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
    </div>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setW(level); });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full gradient-bg transition-all duration-1000 ease-out" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}
