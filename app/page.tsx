 "use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Globe,
  MessageSquare,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Phone,
  Mail,
  User,
  FileText,
  CheckCircle,
  Loader2,
  Menu,
  X,
  ChevronDown,
  Shield,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT = {
  phone: "+50687308867",
  phoneDisplay: "+506 8730-8867",
  email: "macomu26@gmail.com",
  instagram: "https://www.instagram.com/pa_systems?igsh=MTVyY3ZqMW94dHpiNw==",
  instagramHandle: "@pa_systems",
  whatsapp: "https://wa.me/50687308867",
  // Replace this with your actual Formspree endpoint: https://formspree.io/f/YOUR_ID
  formspree: "https://formspree.io/f/xpwzgvnk",
};

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #060608;
      --bg-2:      #0a0b0f;
      --bg-3:      #0f1117;
      --surface:   rgba(255,255,255,0.035);
      --border:    rgba(255,255,255,0.07);
      --border-h:  rgba(255,255,255,0.14);
      --text:      #f0f2f7;
      --text-2:    rgba(240,242,247,0.55);
      --text-3:    rgba(240,242,247,0.30);
      --accent:    #3b82f6;
      --accent-2:  #60a5fa;
      --accent-g:  linear-gradient(135deg, #3b82f6, #0ea5e9);
      --font:      'Geist', system-ui, -apple-system, sans-serif;
      --mono:      'Geist Mono', ui-monospace, monospace;
      --radius:    14px;
      --radius-lg: 20px;
    }

    html { background: var(--bg); color: var(--text); font-family: var(--font); scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

    ::selection { background: rgba(59,130,246,0.25); color: var(--text); }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 99px; }

    /* ── Grid background ── */
    .grid-bg {
      background-image:
        linear-gradient(rgba(59,130,246,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.045) 1px, transparent 1px);
      background-size: 56px 56px;
    }

    /* ── Gradient text ── */
    .g-text {
      background: linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 24px; border-radius: var(--radius);
      font-family: var(--font); font-size: 14px; font-weight: 500;
      letter-spacing: -0.01em; cursor: pointer; text-decoration: none;
      transition: all 0.2s ease; white-space: nowrap; border: none;
    }
    .btn-primary {
      background: var(--accent); color: #fff;
    }
    .btn-primary:hover { background: var(--accent-2); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(59,130,246,0.35); }
    .btn-ghost {
      background: var(--surface); color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { border-color: var(--border-h); background: rgba(255,255,255,0.06); }

    /* ── Card ── */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .card:hover {
      border-color: var(--border-h);
      background: rgba(255,255,255,0.05);
      box-shadow: 0 0 0 1px rgba(59,130,246,0.12), 0 24px 48px rgba(0,0,0,0.4);
    }

    /* ── Input ── */
    .field-wrap { display: flex; flex-direction: column; gap: 6px; }
    .field-label { font-size: 13px; font-weight: 500; color: var(--text-2); display: flex; align-items: center; gap: 6px; }
    .field {
      width: 100%; padding: 12px 14px;
      background: rgba(255,255,255,0.04); color: var(--text);
      border: 1px solid var(--border); border-radius: var(--radius);
      font-family: var(--font); font-size: 14px; outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .field::placeholder { color: var(--text-3); }
    .field:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
    .field.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }

    /* ── Divider ── */
    .divider { width: 100%; height: 1px; background: var(--border); }

    /* ── Tag ── */
    .tag {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 99px;
      border: 1px solid var(--border); background: var(--surface);
      font-family: var(--mono); font-size: 11px;
      letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-3);
    }

    /* ── Section headings ── */
    .eyebrow { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-2); }

    /* ── Animations ── */
    @keyframes hero-in { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
    @keyframes float   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes pulse   { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
    @keyframes spin-slow { to { transform: rotate(360deg); } }

    .hero-line-1 { animation: hero-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
    .hero-line-2 { animation: hero-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
    .hero-line-3 { animation: hero-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
    .hero-line-4 { animation: hero-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
    .hero-line-5 { animation: hero-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.7s both; }

    .float { animation: float 4s ease-in-out infinite; }
    .pulse-dot { animation: pulse 2s ease-in-out infinite; }

    /* ── Glow orbs ── */
    .orb {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(80px);
    }

    /* ── Nav link ── */
    .nav-link {
      font-size: 13.5px; font-weight: 450; color: var(--text-2);
      text-decoration: none; transition: color 0.15s ease;
      letter-spacing: -0.01em;
    }
    .nav-link:hover { color: var(--text); }

    /* ── Mobile menu ── */
    @keyframes slide-down { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
    .mobile-menu { animation: slide-down 0.2s ease both; }

    /* ── Service icon ring ── */
    .icon-ring {
      width: 48px; height: 48px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.2);
      color: var(--accent-2);
      transition: transform 0.25s ease;
    }
    .card:hover .icon-ring { transform: scale(1.08); }

    /* ── Gradient border card ── */
    .g-border {
      position: relative;
    }
    .g-border::before {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, rgba(59,130,246,0.4), rgba(99,102,241,0.2), transparent 60%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      pointer-events: none;
    }

    /* ── Founder card ── */
    .founder-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #818cf8);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font); font-size: 28px; font-weight: 700; color: #fff;
      flex-shrink: 0;
      border: 2px solid rgba(59,130,246,0.3);
    }

    /* ── Stat box ── */
    .stat-box {
      display: flex; flex-direction: column; gap: 2px;
      padding: 16px 20px;
      background: var(--surface); border-radius: var(--radius);
      border: 1px solid var(--border);
    }
    .stat-num { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
    .stat-lbl { font-size: 12px; color: var(--text-3); line-height: 1.4; }

    /* ── Spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Form success state ── */
    @keyframes check-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: none; } }
    .success-anim { animation: check-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Servicios",  href: "#servicios" },
    { label: "Fundador",   href: "#fundador" },
    { label: "Contacto",   href: "#contacto" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(6,6,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "var(--accent-g)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(59,130,246,0.4)",
            }}>
              <Zap size={16} strokeWidth={2.5} color="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.03em", color: "var(--text)" }}>
              PA Systems
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          </nav>

          {/* Desktop CTA */}
          <a href="#contacto" className="btn btn-primary hide-mobile" style={{ padding: "9px 18px", fontSize: 13 }}>
            Hablar con Mayron <ArrowRight size={13} />
          </a>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: 9, padding: "7px 9px", color: "var(--text)", cursor: "pointer" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mobile-menu hide-desktop" style={{
            borderTop: "1px solid var(--border)",
            background: "rgba(6,6,8,0.97)",
            padding: "12px 24px 20px",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ padding: "12px 0", fontSize: 15, color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>
              Hablar con Mayron <ArrowRight size={14} />
            </a>
          </div>
        )}
      </header>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden" }} className="grid-bg">
      {/* Orbs */}
      <div className="orb" style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)", top: "50%", left: "50%", transform: "translate(-50%,-55%)" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", top: 0, right: 0 }} />

      {/* Floating badge */}
      <div className="hero-line-1" style={{ marginBottom: 28 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", borderRadius: 99,
          border: "1px solid rgba(59,130,246,0.3)",
          background: "rgba(59,130,246,0.08)",
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "block" }} />
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-2)" }}>
            Agencia Digital · Costa Rica
          </span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <h1 className="hero-line-2" style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)", letterSpacing: "-0.04em", lineHeight: 1.03, color: "var(--text)", marginBottom: 0 }}>
          Ecosistemas Digitales
        </h1>
        <h1 className="hero-line-3" style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)", letterSpacing: "-0.04em", lineHeight: 1.03 }}>
          <span className="g-text">y Automatización</span>
        </h1>
        <h1 className="hero-line-3" style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)", letterSpacing: "-0.04em", lineHeight: 1.03, color: "var(--text)" }}>
          Inteligente.
        </h1>
      </div>

      {/* Subtext */}
      <p className="hero-line-4" style={{ marginTop: 28, maxWidth: 560, textAlign: "center", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.75, color: "var(--text-2)", letterSpacing: "-0.01em" }}>
        Potenciamos el crecimiento de tu negocio con tecnología de vanguardia.
        Desde tiendas virtuales hasta flujos de trabajo automatizados{" "}
        <span style={{ color: "var(--text)", fontWeight: 500 }}>24/7.</span>
      </p>

      {/* CTAs */}
      <div className="hero-line-5" style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "center" }}>
        <a href="#contacto" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
          Empezar ahora <ArrowRight size={15} />
        </a>
        <a href="#servicios" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 28px" }}>
          Ver servicios <ChevronDown size={15} />
        </a>
      </div>

      {/* Trust bar */}
      <div className="hero-line-5" style={{ marginTop: 72, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { icon: <Shield size={13} />, text: "Tecnología enterprise" },
          { icon: <Clock size={13} />, text: "Operación 24/7" },
          { icon: <TrendingUp size={13} />, text: "ROI medible" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-3)", fontSize: 12 }}>
            <span style={{ color: "var(--accent-2)" }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="float" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "var(--text-3)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>scroll</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Globe size={22} />,
    tag: "01",
    title: "Desarrollo Web & Apps",
    description: "Websites de alto rendimiento y tiendas virtuales diseñadas para convertir. Construimos tu presencia digital con las mejores prácticas de UX, velocidad y SEO.",
    highlights: ["E-commerce a medida", "Web apps escalables", "SEO técnico avanzado"],
  },
  {
    icon: <MessageSquare size={22} />,
    tag: "02",
    title: "Automatización de Mensajería",
    description: "Servicio al cliente inteligente en WhatsApp y canales digitales. Tus clientes siempre atendidos con respuestas precisas y personalizadas, incluso mientras duermes.",
    highlights: ["Bots de WhatsApp", "Flujos inteligentes", "Integración CRM"],
  },
  {
    icon: <BarChart3 size={22} />,
    tag: "03",
    title: "Marketing & Ventas Automáticas",
    description: "Automatización de pauta publicitaria y embudos de conversión. Escalamos tu inversión con inteligencia: el presupuesto correcto al cliente correcto, en el momento exacto.",
    highlights: ["Embudos de conversión", "Pauta automatizada", "Analítica avanzada"],
  },
];

function Services() {
  return (
    <section id="servicios" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Servicios especializados</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "var(--font)", fontWeight: 750, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--text)", maxWidth: 640, marginBottom: 16 }}>
            Todo lo que necesitas,
            <br />
            <span style={{ color: "var(--text-3)" }}>en un solo ecosistema.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 480, lineHeight: 1.7, marginBottom: 56 }}>
            Combinamos diseño, tecnología y automatización para que tu negocio opere como una empresa del futuro — desde hoy.
          </p>
        </Reveal>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.tag} delay={i * 100}>
              <div className="card g-border" style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Icon + tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="icon-ring">{s.icon}</div>
                  <span className="tag">{s.tag}</span>
                </div>

                {/* Title & desc */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ fontFamily: "var(--font)", fontWeight: 650, fontSize: "1.15rem", letterSpacing: "-0.025em", color: "var(--text)" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>{s.description}</p>
                </div>

                {/* Highlights */}
                <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                  {s.highlights.map(h => (
                    <div key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VALUE PROPOSITION BAND
// ─────────────────────────────────────────────────────────────────────────────
function ValueBand() {
  const stats = [
    { n: "3×",  l: "Crecimiento promedio" },
    { n: "24/7", l: "Automatización activa" },
    { n: "PYME", l: "Nuestro enfoque principal" },
    { n: "0→∞",  l: "Escalabilidad real" },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-2)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 24 }}>
        {stats.map(({ n, l }) => (
          <Reveal key={l}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1 }} className="g-text">{n}</p>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4, letterSpacing: "0.02em" }}>{l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDER
// ─────────────────────────────────────────────────────────────────────────────
function Founder() {
  const traits = [
    { icon: <Zap size={15} />, title: "Estrategia Digital", desc: "Diseña ecosistemas completos, no soluciones aisladas." },
    { icon: <Globe size={15} />, title: "Visión PYME", desc: "Democratiza herramientas de nivel enterprise para negocios reales." },
    { icon: <TrendingUp size={15} />, title: "Resultados medibles", desc: "Cada proyecto tiene métricas claras de éxito desde el día uno." },
    { icon: <Shield size={15} />, title: "Confianza primero", desc: "Relaciones a largo plazo basadas en transparencia y entrega." },
  ];

  return (
    <section id="fundador" style={{ padding: "100px 24px", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Left — bio */}
          <div>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 16 }}>El fundador</p>
            </Reveal>
            <Reveal delay={80}>
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
                <div className="founder-avatar">M</div>
                <div>
                  <p style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.03em", color: "var(--text)" }}>Mayron Cordero</p>
                  <p style={{ fontSize: 13, color: "var(--accent-2)", marginTop: 2 }}>Fundador & Estratega Digital</p>
                  <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" style={{ color: "#f59e0b" }} />)}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
                Mayron Cordero es el estratega detrás de <strong style={{ color: "var(--text)", fontWeight: 600 }}>PA Systems</strong>, 
                una agencia nacida de una convicción clara: las PYMES merecen acceso a la misma tecnología que usan 
                las grandes corporaciones.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 28 }}>
                Con experiencia en desarrollo web, automatización y marketing digital, diseña ecosistemas 
                que trabajan de forma autónoma — liberando a los emprendedores para que se concentren en 
                lo que realmente importa: hacer crecer su negocio.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 13 }}>
                  <Phone size={13} /> Agendar llamada
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
          
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — traits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {traits.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div style={{ display: "flex", gap: 14, padding: "18px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-h)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-2)", flexShrink: 0, marginTop: 2 }}>
                    {t.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 3, letterSpacing: "-0.01em" }}>{t.title}</p>
                    <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM (Formspree-compatible)
// ─────────────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const name  = (data.get("name")  as string).trim();
    const email = (data.get("email") as string).trim();
    const phone = (data.get("phone") as string).trim();
    const msg   = (data.get("message") as string).trim();
    if (!name)                           errs.name    = "El nombre es obligatorio.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "Email inválido.";
    if (!phone)                          errs.phone   = "El teléfono es obligatorio.";
    if (!msg || msg.length < 10)         errs.message = "Describe brevemente tu necesidad (mínimo 10 caracteres).";
    return errs;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setState("loading");
    try {
      const res = await fetch(CONTACT.formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }, [validate]);

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%", padding: "12px 14px",
    background: errors[name] ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.04)",
    color: "var(--text)", borderRadius: "var(--radius)",
    border: `1px solid ${errors[name] ? "#ef4444" : "var(--border)"}`,
    fontFamily: "var(--font)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <section id="contacto" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>
        {/* Left — info */}
        <div style={{ paddingTop: 8 }}>
          <Reveal><p className="eyebrow" style={{ marginBottom: 14 }}>Conversemos</p></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily: "var(--font)", fontWeight: 750, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--text)", marginBottom: 18 }}>
              ¿Listo para
              <br />
              <span className="g-text">transformar tu negocio?</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 36 }}>
              Cuéntanos tu proyecto.  En menos de 24 horas Mayron te responde con una propuesta personalizada — sin compromisos, sin letras pequeñas.
            </p>
          </Reveal>

          {/* Contact links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: <Phone size={15} />, label: "WhatsApp directo", value: CONTACT.phoneDisplay, href: CONTACT.whatsapp },
              { icon: <Mail size={15} />,  label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
{ icon: "IG", label: "Instagram", value: "@pa_systems", href: CONTACT.instagram },            ].map(({ icon, label, value, href }) => (
              <Reveal key={label} delay={180}>
                <a href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", textDecoration: "none", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-h)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-2)", flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                    <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{value}</p>
                  </div>
                  <ArrowUpRight size={14} style={{ marginLeft: "auto", color: "var(--text-3)" }} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <Reveal delay={120}>
          <div className="card g-border" style={{ padding: "36px 32px" }}>
            {state === "success" ? (
              <div className="success-anim" style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#22c55e" }}>
                  <CheckCircle size={28} />
                </div>
                <h3 style={{ fontFamily: "var(--font)", fontWeight: 650, fontSize: "1.25rem", letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 10 }}>¡Mensaje enviado!</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
                  Mayron revisará tu solicitud y te responderá en menos de 24 horas.
                </p>
                <button onClick={() => setState("idle")} className="btn btn-ghost" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <p style={{ fontFamily: "var(--font)", fontWeight: 650, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 4 }}>Cuéntanos tu proyecto</p>
                  <p style={{ fontSize: 13, color: "var(--text-3)" }}>Todos los campos son obligatorios.</p>
                </div>

                {/* Name */}
                <div className="field-wrap">
                  <label className="field-label"><User size={13} /> Nombre completo</label>
                  <input name="name" type="text" placeholder="Juan Pérez" style={fieldStyle("name")}
                    onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                    onBlur={e => { if (!errors.name) { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; } }}
                  />
                  {errors.name && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 2 }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="field-wrap">
                  <label className="field-label"><Mail size={13} /> Correo electrónico</label>
                  <input name="email" type="email" placeholder="correo@ejemplo.com" style={fieldStyle("email")}
                    onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                    onBlur={e => { if (!errors.email) { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; } }}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 2 }}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="field-wrap">
                  <label className="field-label"><Phone size={13} /> Teléfono / WhatsApp</label>
                  <input name="phone" type="tel" placeholder="+506 8888-8888" style={fieldStyle("phone")}
                    onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                    onBlur={e => { if (!errors.phone) { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; } }}
                  />
                  {errors.phone && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 2 }}>{errors.phone}</p>}
                </div>

                {/* Message */}
                <div className="field-wrap">
                  <label className="field-label"><FileText size={13} /> Descripción de la necesidad</label>
                  <textarea name="message" rows={4} placeholder="Cuéntanos en qué consiste tu proyecto, qué problemas quieres resolver y tu visión a futuro..." style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 110 }}
                    onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
                    onBlur={e => { if (!errors.message) { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; } }}
                  />
                  {errors.message && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 2 }}>{errors.message}</p>}
                </div>

                {/* Submit */}
                {state === "error" && (
                  <div style={{ padding: "10px 14px", borderRadius: "var(--radius)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", fontSize: 13, color: "#f87171" }}>
                    Error al enviar. Por favor intenta de nuevo o escríbenos directamente a WhatsApp.
                  </div>
                )}
                <button type="submit" disabled={state === "loading"} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15, opacity: state === "loading" ? 0.7 : 1 }}>
                  {state === "loading" ? (
                    <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Enviando...</>
                  ) : (
                    <>Enviar solicitud <ArrowRight size={15} /></>
                  )}
                </button>
                <p style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", lineHeight: 1.6 }}>
                  Tu información es confidencial. Mayron te responde en &lt;24 horas.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Top row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 32 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--accent-g)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={13} strokeWidth={2.5} color="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.03em", color: "var(--text)" }}>PA Systems</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 13, color: "var(--text-2)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border-h)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <Phone size={13} /> {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 13, color: "var(--text-2)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border-h)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
            Instagram {CONTACT.instagramHandle}
            </a>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 24, fontSize: 12, color: "var(--text-3)" }}>
          <p>© {new Date().getFullYear()} PA .Systems. Todos los derechos reservados.</p>
          <p>Diseñado y desarrollado con ❤️ en Costa Rica.</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ValueBand />
        <Founder />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
