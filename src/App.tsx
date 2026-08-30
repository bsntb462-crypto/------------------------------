import { useState, useEffect, useRef } from "react";

/* ─── Data ─────────────────────────────────────────────── */
const NAV_LINKS = ["About", "Experience", "Projects", "Certifications", "Resume", "Contact"];

const SKILLS_TECHNICAL = [
  "Python", "Machine Learning", "Deep Learning", "Data Analysis",
  "Data Visualization", "HTML", "CSS", "JavaScript", "C#",
  "Flask", "Streamlit", "Firebase", "OpenCV", "Git & GitHub", "Microsoft Office",
];

const SKILLS_SOFT = [
  "Problem Solving", "Communication", "Teamwork", "Leadership",
  "Time Management", "Analytical Thinking", "Critical Thinking",
  "Presentation Skills", "Fast Learning",
];

const EXPERIENCES = [
  {
    role: "Innovation Ambassador",
    org: "TIEC — Technology Innovation and Entrepreneurship Center",
    desc: "Representing and promoting innovation culture, supporting entrepreneurship programs and connecting students with TIEC's ecosystem of startups, mentors, and resources.",
    icon: "🚀",
    color: "#f72585",
  },
  {
    role: "Frontend Development Intern",
    org: "CodeAlpha",
    desc: "Built responsive, modern web interfaces using HTML, CSS, and JavaScript. Delivered multiple frontend projects under real-world timelines, strengthening proficiency in component-based design.",
    icon: "💻",
    color: "#a855f7",
  },
  {
    role: "Machine Learning Trainee",
    org: "NTI — National Telecom Institute",
    desc: "Developed deep learning models for real-time sign language recognition, achieving high accuracy using CNNs and MediaPipe hand landmark detection.",
    icon: "🧠",
    color: "#f72585",
  },
  {
    role: "Summer Intern",
    org: "CIB — Commercial International Bank",
    desc: "Contributed to internal software tools and API integration workflows, gaining hands-on experience in enterprise-level systems and banking technology.",
    icon: "🏦",
    color: "#7b2ff7",
  },
  {
    role: "Public Relations",
    org: "GDG Minia — Google Developer Group",
    desc: "Managing community communications, coordinating events, and building partnerships with local tech organizations. Helping grow a 500+ member developer community.",
    icon: "🌐",
    color: "#a855f7",
  },
  {
    role: "PR Team Member",
    org: "Tech Mastery",
    desc: "Supporting outreach campaigns, event promotions, and content coordination for tech education initiatives, expanding the organization's digital presence.",
    icon: "📣",
    color: "#ff6eb4",
  },
  {
    role: "Marketing & Moderator",
    org: "Freelance",
    desc: "Managing digital marketing campaigns, moderating online communities, and delivering content strategy for clients across social media platforms.",
    icon: "📱",
    color: "#7b2ff7",
  },
];

const PROJECTS = [
  {
    title: "Sign Language Translation & Air Drawing",
    description: "Real-time hand gesture recognition system for Arabic sign language translation and mid-air drawing using CNN + MediaPipe landmark detection.",
    tags: ["Python", "OpenCV", "MediaPipe", "CNN"],
    emoji: "🤟",
    accent: "#f72585",
    link: "https://bsntb462-crypto.github.io/dgff/",
  },
  {
    title: "House Price Prediction",
    description: "ML regression model predicting residential property prices from structural and location features. Deployed as an interactive web app.",
    tags: ["Python", "Scikit-learn", "Regression", "GitHub Pages"],
    emoji: "🏠",
    accent: "#7b2ff7",
    link: "https://bsntb462-crypto.github.io/house-price/",
  },
  {
    title: "Predictive Analytics App",
    description: "Streamlit-powered analytics dashboard that surfaces actionable predictions from structured datasets with dynamic visualizations.",
    tags: ["Python", "Streamlit", "Pandas", "ML"],
    emoji: "📊",
    accent: "#a855f7",
    link: "https://mo5fkdtimudpurfmsuji32.streamlit.app/",
  },
  {
    title: "Model Performance Dashboard",
    description: "Interactive Streamlit dashboard for evaluating and comparing ML model metrics — accuracy, precision, recall, ROC curves, and confusion matrices.",
    tags: ["Python", "Streamlit", "Matplotlib", "Scikit-learn"],
    emoji: "📈",
    accent: "#ff6eb4",
    link: "https://prigect2-3eqrcg3e2gslahza7fcsc8.streamlit.app/Model%20Performance",
  },
  {
    title: "Sorouh — Financial Solutions",
    description: "Full-stack financial solutions platform with a professional UI, built for real clients and deployed to production.",
    tags: ["React", "Node.js", "Firebase", "Tailwind"],
    emoji: "💼",
    accent: "#f72585",
    link: "https://sorouhfinancial.com",
  },
  {
    title: "ToyNova Store",
    description: "E-commerce storefront for a toy brand. Features product catalog, cart, and responsive design optimized for mobile shoppers.",
    tags: ["React", "Vercel", "JavaScript", "CSS"],
    emoji: "🧸",
    accent: "#7b2ff7",
    link: "https://toynova-store.vercel.app",
  },
  {
    title: "DomainC Website",
    description: "Modern corporate landing page deployed on Vercel with polished UI, smooth animations, and clear brand communication.",
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
    emoji: "🌐",
    accent: "#a855f7",
    link: "https://domainc.vercel.app/",
  },
  {
    title: "Coffee Time Website",
    description: "A beautifully crafted café website with warm visuals, menu display, and responsive layout. A frontend design showcase.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    emoji: "☕",
    accent: "#ff6eb4",
    link: "https://bsntb462-crypto.github.io/Coffe-time/",
  },
];

const CERTIFICATIONS = [
  { title: "Machine Learning", issuer: "Saylor University", badge: "🎓", year: "2024", color: "#f72585" },
  { title: "AI Fundamentals with Capstone Project", issuer: "IBM SkillsBuild", badge: "🔵", year: "2024", color: "#0f62fe" },
  { title: "Enterprise Design Thinking Practitioner", issuer: "IBM SkillsBuild", badge: "🔵", year: "2024", color: "#0f62fe" },
  { title: "AI for All: From Basics to GenAI Practice", issuer: "NVIDIA Academy", badge: "🟢", year: "2024", color: "#76b900" },
  { title: "Frontend Development Internship", issuer: "Code Alpha", badge: "💻", year: "2024", color: "#a855f7" },
  { title: "Digital Marketing Certified", issuer: "HubSpot Academy", badge: "🟠", year: "2024", color: "#ff7a59" },
  { title: "Python Programming Basics", issuer: "Mahara-Tech", badge: "🐍", year: "2023", color: "#f72585" },
  { title: "AI for Digital Marketing", issuer: "Mahara-Tech", badge: "🤖", year: "2024", color: "#7b2ff7" },
  { title: "Start Your Career in Digital Marketing", issuer: "Mahara-Tech", badge: "📈", year: "2023", color: "#ff6eb4" },
  { title: "Public Relations — GDG Minia", issuer: "GDG Minia", badge: "🌐", year: "2024", color: "#4285f4" },
  { title: "Specialist Machine Learning", issuer: "Simplilearn", badge: "⚡", year: "2024", color: "#f72585" },
  { title: "Practical ML for Data Scientists", issuer: "Mahara-Tech", badge: "🔬", year: "2024", color: "#a855f7" },
];

const SOCIALS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/basant-bassam-1b3a12399",
    color: "#0a66c2",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    label: "GitHub",
    href: "https://github.com/bsntb462-crypto",
    color: "#f0e6ff",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: "Facebook",
    href: "https://www.facebook.com/share/19MhLp7b3F/",
    color: "#1877f2",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: "WhatsApp",
    href: "https://wa.me/201126681362",
    color: "#25d366",
  },
];

/* ─── Floating Stars ────────────────────────────────────── */
const STAR_DATA = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

function Stars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {STAR_DATA.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Particle Trail ─────────────────────────────────────── */
function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; alpha: number; size: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          alpha: 0.7,
          size: Math.random() * 4 + 1,
        });
      }
      if (particles.current.length > 120) particles.current.splice(0, 20);
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.alpha > 0.02);
      particles.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, "#f72585");
        grd.addColorStop(1, "rgba(123,47,247,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.alpha -= 0.025;
        p.size *= 0.97;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2 }}
    />
  );
}

/* ─── Typewriter ─────────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.substring(0, sub + 1));
        setSub(sub + 1);
        if (sub + 1 === current.length) setTimeout(() => setDeleting(true), 2000);
      } else {
        setText(current.substring(0, sub - 1));
        setSub(sub - 1);
        if (sub - 1 === 0) {
          setDeleting(false);
          setIndex((index + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [sub, deleting, index, words]);

  return (
    <span className="gradient-text-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
      {text}
      <span
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.85em",
          background: "#f72585",
          marginLeft: "3px",
          verticalAlign: "text-bottom",
          borderRadius: "2px",
          animation: "twinkle 0.75s ease-in-out infinite",
        }}
      />
    </span>
  );
}

/* ─── Scroll-animated Section ────────────────────────────── */
function Section({
  id,
  children,
  style = {},
}: {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = "fade-up 0.7s ease forwards";
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{ opacity: 0, position: "relative", zIndex: 1, ...style }}>
      {children}
    </section>
  );
}

/* ─── Section Heading ─────────────────────────────────────── */
function SectionHeading({ tag, title, highlight }: { tag: string; title: string; highlight: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <p style={{ color: "#f72585", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>
        ✦ {tag}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f0e6ff", lineHeight: 1.15 }}>
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", "about", "experience", "projects", "certifications", "resume", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.35s ease",
        background: scrolled ? "rgba(6, 4, 15, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(247,37,133,0.12)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, cursor: "pointer", userSelect: "none" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="gradient-text">✦ Basant</span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: activeSection === l.toLowerCase() ? "#f72585" : "rgba(240,230,255,0.65)",
                transition: "color 0.2s",
                position: "relative",
              }}
            >
              {l}
              {activeSection === l.toLowerCase() && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, #f72585, #7b2ff7)",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="btn-glow"
          style={{ padding: "9px 22px", fontSize: "0.87rem" }}
          onClick={() => scrollTo("Contact")}
        >
          <span>Hire Me ✨</span>
        </button>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <div
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(247,37,133,0.13) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(123,47,247,0.12) 0%, transparent 60%)",
      }}
    >
      {/* Blobs */}
      <div className="blob-1" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,37,133,0.14) 0%, transparent 70%)", top: "5%", left: "-15%", filter: "blur(50px)" }} />
      <div className="blob-2" style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,47,247,0.16) 0%, transparent 70%)", bottom: "0%", right: "-8%", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,110,180,0.1) 0%, transparent 70%)", top: "55%", left: "65%", filter: "blur(40px)", animation: "blob-drift 14s ease-in-out infinite" }} />

      <div style={{ textAlign: "center", maxWidth: 900, padding: "130px 24px 90px", position: "relative", zIndex: 1 }}>
        {/* Name */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.2rem, 8.5vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            marginBottom: 18,
            color: "#f0e6ff",
            letterSpacing: "-0.01em",
          }}
        >
          Hi, I'm{" "}
          <span className="gradient-text" style={{ display: "inline-block" }}>Basant</span>
        </h1>

        {/* Typewriter */}
        <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.3rem)", fontWeight: 400, marginBottom: 12, color: "rgba(240,230,255,0.75)", minHeight: "2.8rem" }}>
          <Typewriter words={["Machine Learning Developer", "AI Enthusiast", "Data Analyst", "Frontend Developer", "Innovation Ambassador"]} />
        </h2>

        {/* University */}
        <p style={{ color: "rgba(240,230,255,0.45)", fontSize: "0.95rem", marginBottom: 32, fontWeight: 400, letterSpacing: "0.03em" }}>
          🎓 Lotus University · Faculty of Computers & Artificial Intelligence
        </p>

        {/* Tagline */}
        <p style={{ fontSize: "1.08rem", color: "rgba(240,230,255,0.55)", maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.8 }}>
          Turning data into insights and ideas into intelligent applications —{" "}
          <em style={{ color: "rgba(255,110,180,0.8)" }}>where curiosity meets code.</em>
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-glow"
            style={{ padding: "14px 38px", fontSize: "1rem" }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>View My Work ✦</span>
          </button>
          <button
            className="btn-outline"
            style={{ padding: "14px 38px", fontSize: "1rem" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get in Touch
          </button>
        </div>

        <div className="float-anim" style={{ marginTop: 72, color: "rgba(247,37,133,0.45)", fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          ↓ scroll to explore
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll-triggered Typewriter ───────────────────────── */
const BIO_SEGMENTS = [
  { text: "I'm ", plain: true },
  { text: "Basant Bassam", highlight: "pink" },
  { text: ", a Computer Science student at ", plain: true },
  { text: "Lotus University, Faculty of Computers and Artificial Intelligence", highlight: "violet" },
  { text: ", with a deep passion for ", plain: true },
  { text: "Machine Learning, AI, and Data Analysis", highlight: "pink" },
  { text: ".", plain: true },
];
const BIO_FULL = BIO_SEGMENTS.map((s) => s.text).join("");

function BioTypewriter() {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed >= BIO_FULL.length) return;
    const t = setTimeout(() => setDisplayed((d) => d + 1), 28);
    return () => clearTimeout(t);
  }, [started, displayed]);

  // Render with inline highlights based on how many chars are shown
  let cursor = 0;
  const nodes: React.ReactNode[] = [];
  for (let si = 0; si < BIO_SEGMENTS.length; si++) {
    const seg = BIO_SEGMENTS[si];
    const start = cursor;
    const end = cursor + seg.text.length;
    const visible = Math.max(0, Math.min(displayed - start, seg.text.length));
    const slice = seg.text.slice(0, visible);
    if (slice.length > 0) {
      if (seg.highlight === "pink") {
        nodes.push(<strong key={si} style={{ color: "#ff6eb4" }}>{slice}</strong>);
      } else if (seg.highlight === "violet") {
        nodes.push(<strong key={si} style={{ color: "#a855f7" }}>{slice}</strong>);
      } else {
        nodes.push(<span key={si}>{slice}</span>);
      }
    }
    cursor = end;
  }

  const showCursor = displayed < BIO_FULL.length && started;

  return (
    <p ref={ref} style={{ color: "rgba(240,230,255,0.82)", lineHeight: 1.85, marginBottom: 18, fontSize: "1rem", minHeight: "4.5rem" }}>
      {nodes}
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "#f72585",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            borderRadius: "2px",
            animation: "twinkle 0.7s ease-in-out infinite",
          }}
        />
      )}
    </p>
  );
}

/* ─── About ──────────────────────────────────────────────── */
function About() {
  const [activeTab, setActiveTab] = useState<"technical" | "soft">("technical");

  return (
    <Section id="about" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading tag="About Me" title="The mind behind the" highlight="magic" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Bio */}
          <div>
            <div className="glass-card" style={{ padding: 34, marginBottom: 22 }}>
              <BioTypewriter />
              <p style={{ color: "rgba(240,230,255,0.58)", lineHeight: 1.85, fontSize: "0.93rem" }}>
                I love building intelligent systems that learn, adapt, and solve real problems — from training neural networks to crafting pixel-perfect interfaces. As an Innovation Ambassador at TIEC and a core member of GDG Minia, I'm committed to growing the tech community around me.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { num: "8+", label: "Projects Built" },
                { num: "7+", label: "Roles & Internships" },
                { num: "12+", label: "Certifications" },
                { num: "500+", label: "Community Members" },
              ].map((s) => (
                <div key={s.label} className="glass-card" style={{ padding: "20px 22px", textAlign: "center" }}>
                  <div className="gradient-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.1rem", fontWeight: 800 }}>{s.num}</div>
                  <div style={{ color: "rgba(240,230,255,0.45)", fontSize: "0.8rem", marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills with tab switcher */}
          <div>
            {/* Tab toggle */}
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(247,37,133,0.15)",
                borderRadius: 50,
                padding: 4,
                marginBottom: 28,
                gap: 4,
              }}
            >
              {(["technical", "soft"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    transition: "all 0.3s ease",
                    background: activeTab === tab ? "linear-gradient(135deg, #f72585, #7b2ff7)" : "transparent",
                    color: activeTab === tab ? "white" : "rgba(240,230,255,0.5)",
                    boxShadow: activeTab === tab ? "0 4px 16px rgba(247,37,133,0.3)" : "none",
                  }}
                >
                  {tab === "technical" ? "🛠 Technical" : "🌟 Soft Skills"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(activeTab === "technical" ? SKILLS_TECHNICAL : SKILLS_SOFT).map((s) => (
                <span key={s} className="skill-pill">{s}</span>
              ))}
            </div>

            {/* Progress bars */}
            <div style={{ marginTop: 36 }}>
              <p style={{ color: "rgba(240,230,255,0.4)", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 22 }}>
                Core Focus Areas
              </p>
              {[
                { icon: "🤖", label: "Machine Learning & Deep Learning", pct: 90 },
                { icon: "📊", label: "Data Analysis & Visualization", pct: 85 },
                { icon: "🌐", label: "Frontend Web Development", pct: 82 },
                { icon: "👁️", label: "Computer Vision", pct: 78 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ color: "rgba(240,230,255,0.75)", fontSize: "0.88rem" }}>{item.icon} {item.label}</span>
                    <span style={{ color: "#f72585", fontSize: "0.83rem", fontWeight: 600 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, background: "linear-gradient(90deg, #f72585, #7b2ff7)", borderRadius: 10, boxShadow: "0 0 10px rgba(247,37,133,0.4)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Experience ─────────────────────────────────────────── */
function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section id="experience" style={{ padding: "110px 24px", background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,47,247,0.07) 0%, transparent 70%)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionHeading tag="Experience & Leadership" title="Where I've" highlight="made an impact" />

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, rgba(247,37,133,0.5), rgba(123,47,247,0.5), transparent)" }} />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover"
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ marginLeft: 52, marginBottom: 22, padding: "26px 30px", cursor: "pointer", position: "relative" }}
            >
              <div className="timeline-dot" style={{ position: "absolute", left: -38, top: 30 }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>{exp.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0e6ff", marginBottom: 3 }}>{exp.role}</h3>
                    <p style={{ color: exp.color, fontWeight: 600, fontSize: "0.87rem" }}>{exp.org}</p>
                  </div>
                </div>
                <span style={{ color: "rgba(240,230,255,0.3)", fontSize: "1rem", transition: "transform 0.3s", display: "inline-block", transform: expanded === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
              </div>

              {expanded === i && (
                <p style={{ color: "rgba(240,230,255,0.62)", lineHeight: 1.78, fontSize: "0.91rem", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(247,37,133,0.12)" }}>
                  {exp.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Projects ───────────────────────────────────────────── */
function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "ml" | "web">("all");

  const filtered = PROJECTS.filter((p) => {
    if (filter === "ml") return p.tags.some((t) => ["Python", "ML", "Machine Learning", "Scikit-learn", "CNN", "MediaPipe", "Pandas", "Streamlit", "TensorFlow"].includes(t));
    if (filter === "web") return p.tags.some((t) => ["HTML", "CSS", "JavaScript", "React", "Vercel", "GitHub Pages", "Firebase"].includes(t));
    return true;
  });

  return (
    <Section id="projects" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SectionHeading tag="Featured Projects" title="Things I've" highlight="built" />

        {/* Filter tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 48, flexWrap: "wrap" }}>
          {(["all", "ml", "web"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 22px",
                borderRadius: 50,
                border: filter === f ? "none" : "1px solid rgba(247,37,133,0.25)",
                background: filter === f ? "linear-gradient(135deg, #f72585, #7b2ff7)" : "transparent",
                color: filter === f ? "white" : "rgba(240,230,255,0.55)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: filter === f ? "0 4px 16px rgba(247,37,133,0.3)" : "none",
              }}
            >
              {f === "all" ? "✦ All" : f === "ml" ? "🤖 ML & AI" : "🌐 Web"}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))", gap: 22 }}>
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="glass-card glass-card-hover"
              style={{ padding: "30px 26px", cursor: "pointer", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover glow */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top left, ${p.accent}1a, transparent 65%)`, opacity: hovered === i ? 1 : 0, transition: "opacity 0.35s ease", borderRadius: "inherit" }} />

              {/* Icon */}
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}08)`,
                border: `1px solid ${p.accent}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", marginBottom: 18,
                transition: "transform 0.3s ease",
                transform: hovered === i ? "scale(1.1) rotate(-4deg)" : "none",
              }}>
                {p.emoji}
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0e6ff", marginBottom: 10, position: "relative" }}>
                {p.title}
              </h3>
              <p style={{ color: "rgba(240,230,255,0.58)", lineHeight: 1.72, fontSize: "0.87rem", marginBottom: 18, position: "relative", flex: 1 }}>
                {p.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20, position: "relative" }}>
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: p.accent,
                  fontWeight: 600,
                  fontSize: "0.86rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  position: "relative",
                  transition: "gap 0.2s",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                View Live Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Certifications ─────────────────────────────────────── */
function Certifications() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  return (
    <Section id="certifications" style={{ padding: "110px 24px", background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(247,37,133,0.06) 0%, transparent 70%)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SectionHeading tag="Certifications" title="Knowledge" highlight="verified" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              className="glass-card"
              onMouseEnter={() => setHoveredCert(i)}
              onMouseLeave={() => setHoveredCert(null)}
              style={{
                padding: "22px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "all 0.3s ease",
                transform: hoveredCert === i ? "translateY(-5px)" : "none",
                borderColor: hoveredCert === i ? `${cert.color}55` : "rgba(247,37,133,0.18)",
                boxShadow: hoveredCert === i ? `0 16px 40px ${cert.color}18` : "none",
              }}
            >
              <div
                style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: `${cert.color}18`,
                  border: `1px solid ${cert.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", flexShrink: 0,
                }}
              >
                {cert.badge}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ color: "#f0e6ff", fontWeight: 600, fontSize: "0.9rem", marginBottom: 5, lineHeight: 1.3 }}>{cert.title}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: cert.color, fontSize: "0.8rem", fontWeight: 600 }}>{cert.issuer}</span>
                  <span style={{ color: "rgba(240,230,255,0.28)", fontSize: "0.78rem" }}>· {cert.year}</span>
                </div>
              </div>
              <div style={{ color: hoveredCert === i ? "#f72585" : "rgba(247,37,133,0.3)", fontSize: "1rem", transition: "color 0.3s", flexShrink: 0 }}>✓</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Resume ─────────────────────────────────────────────── */
function Resume() {
  return (
    <Section id="resume" style={{ padding: "110px 24px", background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(123,47,247,0.07) 0%, transparent 70%)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeading tag="Resume" title="Grab my" highlight="CV" />

        <div
          className="glass-card"
          style={{
            padding: "44px 40px",
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(247,37,133,0.06), rgba(123,47,247,0.06))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: "1 1 320px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "linear-gradient(135deg, rgba(247,37,133,0.18), rgba(123,47,247,0.18))",
                border: "1px solid rgba(247,37,133,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.7rem",
                flexShrink: 0,
              }}
            >
              📄
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#f0e6ff", marginBottom: 6 }}>
                Basant Bassam — CV
              </h3>
              <p style={{ color: "rgba(240,230,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Full resume with experience, projects & certifications — PDF, ready to download.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/Basant-Bassam-CV.pdf"
              download="Basant-Bassam-CV.pdf"
              className="btn-glow"
              style={{ padding: "13px 28px", fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>Download CV ⬇</span>
            </a>
            <a
              href="/Basant-Bassam-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                padding: "13px 28px",
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>View Online</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact ─────────────────────────────────────────────── */
function Contact() {
  return (
    <Section id="contact" style={{ padding: "110px 24px 70px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeading tag="Contact" title="Let's" highlight="connect" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {/* Social Links Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ color: "rgba(240,230,255,0.4)", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>Find me on</p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 22px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(247,37,133,0.15)",
                  borderRadius: 16,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: "rgba(240,230,255,0.75)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `${s.color}12`;
                  el.style.borderColor = `${s.color}55`;
                  el.style.transform = "translateX(6px)";
                  el.style.boxShadow = `0 8px 28px ${s.color}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(247,37,133,0.15)";
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ color: s.color, display: "flex", alignItems: "center", width: 22, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f0e6ff" }}>{s.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(240,230,255,0.38)", marginTop: 2 }}>
                    {s.label === "WhatsApp" ? "+20 1126681362" :
                      s.label === "GitHub" ? "github.com/bsntb462-crypto" :
                      s.label === "LinkedIn" ? "linkedin.com/in/basant-bassam" :
                      "facebook.com/basant.bassam"}
                  </div>
                </div>
                <span style={{ marginLeft: "auto", color: "rgba(240,230,255,0.2)", fontSize: "0.9rem" }}>→</span>
              </a>
            ))}
          </div>

          {/* Info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>💌</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#f0e6ff", marginBottom: 10 }}>
                Let's build something amazing
              </h3>
              <p style={{ color: "rgba(240,230,255,0.55)", lineHeight: 1.75, fontSize: "0.92rem" }}>
                Whether it's an exciting ML project, a web collaboration, a research opportunity, or just a friendly chat about AI — I'd love to hear from you.
              </p>
            </div>

            <div className="glass-card" style={{ padding: 26 }}>
              <p style={{ color: "rgba(240,230,255,0.4)", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>Open to</p>
              {["Full-time & Part-time Roles", "Freelance Projects", "ML & AI Collaboration", "Mentoring & Community Talks", "Innovation & Startup Projects"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg, #f72585, #7b2ff7)", flexShrink: 0 }} />
                  <span style={{ color: "rgba(240,230,255,0.68)", fontSize: "0.9rem" }}>{item}</span>
                </div>
              ))}
            </div>

            <div
              className="glass-card"
              style={{ padding: 24, textAlign: "center", background: "linear-gradient(135deg, rgba(247,37,133,0.08), rgba(123,47,247,0.08))", borderColor: "rgba(247,37,133,0.22)" }}
            >
              <p style={{ color: "rgba(240,230,255,0.7)", fontSize: "0.92rem", marginBottom: 6 }}>
                📍 Minia, Egypt 🇪🇬
              </p>
              <p style={{ color: "rgba(240,230,255,0.35)", fontSize: "0.8rem" }}>
                Lotus University · Faculty of Computers & AI
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="section-divider" style={{ margin: "64px 0 30px" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            <span className="gradient-text">Basant Bassam</span>
          </p>
          <p style={{ color: "rgba(240,230,255,0.28)", fontSize: "0.8rem" }}>
            Crafted with <span style={{ color: "#f72585" }}>♥</span> · CS & AI Student · Lotus University · 2026
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── App ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#06040f", position: "relative" }}>
      <Stars />
      <ParticleTrail />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Resume />
        <div className="section-divider" />
        <Contact />
      </main>
    </div>
  );
}
