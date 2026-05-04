// Shared UI components
const { useState, useEffect, useRef } = React;

// Format inline tokens like {em:word}, {stat:7%}
function fmtInline(text) {
  if (!text) return null;
  const parts = String(text).split(/(\{(?:em|stat):[^}]+\})/g);
  return parts.map((p, i) => {
    const m = p.match(/^\{(em|stat):([^}]+)\}$/);
    if (!m) return p;
    if (m[1] === "em") return <em key={i}>{m[2]}</em>;
    if (m[1] === "stat") return <span key={i} className="stat">{m[2]}</span>;
    return p;
  });
}

function Nav({ current }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="nav" style={scrolled ? { boxShadow: "0 4px 20px -8px rgba(20,17,13,.08)" } : {}}>
      <a href="/eleanor-portfolio/" className="mark">
        <span className="glyph"></span>
        <span>Eleanor L.</span>
      </a>
      <div className="links">
        <a href="/eleanor-portfolio/about/" className={current === "about" ? "active" : ""}>About</a>
        <a href="/eleanor-portfolio/career/" className={current === "career" ? "active" : ""}>Career</a>
        <a href="/eleanor-portfolio/projects/" className={current === "projects" ? "active" : ""}>Projects</a>
        <a href="/eleanor-portfolio/now/" className={current === "now" ? "active" : ""}>Now</a>
        <a href="/eleanor-portfolio/resume/" className="cta">Resume</a>
      </div>
    </nav>
  );
}

function Marquee({ items }) {
  const chunk = (
    <span className="chunk">
      {items.map((s, i) => (
        <React.Fragment key={i}>
          <span>{s}</span>
          <span className="star">✺</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {chunk}{chunk}{chunk}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div>
          <h4>Open to</h4>
          <p className="big">Product marketing & analytics roles, <em>summer 2026 →</em></p>
        </div>
        <div>
          <h4>Reach me</h4>
          <ul>
            <li><a href="mailto:eleanor.lansner@gmail.com"><span>eleanor.lansner@gmail.com</span><span className="ar">→</span></a></li>
            <li><a href="https://linkedin.com/in/eleanor-lansner" target="_blank"><span>LinkedIn</span><span className="ar">↗</span></a></li>
            <li><a href="tel:+19174989731"><span>(917) 498-9731</span><span className="ar">→</span></a></li>
          </ul>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <ul>
            <li><a href="/eleanor-portfolio/resume/"><span>One-page resume</span><span className="ar">→</span></a></li>
            <li><a href="/eleanor-portfolio/projects/"><span>Project archive</span><span className="ar">→</span></a></li>
            <li><a href="/eleanor-portfolio/about/"><span>About</span><span className="ar">→</span></a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Eleanor Lansner</span>
        <span>Boulder, CO · 39.99°N 105.27°W</span>
      </div>
    </footer>
  );
}

// Reveal-on-scroll
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Brand logo tile (typographic wordmark)
function BrandLogo({ brand }) {
  const styles = {
    "Vail Resorts": {
      bg: "linear-gradient(160deg, #e8f0f7 0%, #c4d4e3 100%)",
      ink: "#1a3a5c",
      label: "Vail Resorts",
      family: "var(--display)",
      style: "italic",
      weight: 400,
    },
    "EverCommerce": {
      bg: "linear-gradient(160deg, #f3eee6 0%, #e3d7c3 100%)",
      ink: "#2a2520",
      label: "EverCommerce",
      family: "var(--sans)",
      style: "normal",
      weight: 600,
    },
    "Trustpilot": {
      bg: "linear-gradient(160deg, #e8f0e8 0%, #c8d8c4 100%)",
      ink: "#1d3a1d",
      label: "Trustpilot",
      family: "var(--sans)",
      style: "normal",
      weight: 700,
    },
    "Amazon": {
      bg: "linear-gradient(160deg, #fff4e0 0%, #ffd99a 100%)",
      ink: "#2a1f10",
      label: "amazon",
      family: "var(--sans)",
      style: "normal",
      weight: 700,
    },
    "Sleep Study": {
      bg: "linear-gradient(160deg, #1a1f3a 0%, #2d3561 100%)",
      ink: "#e8e4ff",
      label: "sleep × health",
      family: "var(--display)",
      style: "italic",
      weight: 400,
    },
    "Brock USA": {
      bg: "linear-gradient(160deg, #f5e8e0 0%, #d4a98c 100%)",
      ink: "#3a1f10",
      label: "Brock USA",
      family: "var(--sans)",
      style: "normal",
      weight: 700,
    },
  };
  const s = styles[brand] || styles["Trustpilot"];
  return (
    <div className="viz" style={{ background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{
        fontFamily: s.family,
        fontWeight: s.weight,
        fontStyle: s.style,
        fontSize: "clamp(28px, 4.2vw, 44px)",
        color: s.ink,
        letterSpacing: s.style === "italic" ? "-0.02em" : "-0.01em",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}>{s.label}</div>
    </div>
  );
}

// Project visualizations
function ProjViz({ kind, brand }) {
  if (brand) return <BrandLogo brand={brand} />;
  if (kind === "segments") {
    const cells = Array.from({ length: 50 });
    return (
      <div className="viz">
        <div className="viz-segments">
          {cells.map((_, i) => {
            const cls = [3,7,12,16,23,27,31,36,42,46].includes(i) ? "hi" :
                        [4,8,13,17,24,28,32,37,43,47].includes(i) ? "med" : "";
            return <div key={i} className={cls}></div>;
          })}
        </div>
      </div>
    );
  }
  if (kind === "bars") {
    const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.7, 0.55, 0.95, 0.6, 0.75];
    return (
      <div className="viz">
        <div className="viz-bars">
          {bars.map((h, i) => (
            <div key={i} className={i === 3 || i === 9 ? "hi" : i === 5 ? "med" : ""}
                 style={{ height: `${h * 100}%` }}></div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "calendar") {
    const cells = Array.from({ length: 24 });
    const launches = [3, 7, 11, 15, 19, 23];
    const preps = [2, 6, 10, 14, 18, 22];
    return (
      <div className="viz">
        <div className="viz-calendar">
          {cells.map((_, i) => {
            const cls = launches.includes(i) ? "launch" : preps.includes(i) ? "prep" : "";
            return <div key={i} className={cls}></div>;
          })}
        </div>
      </div>
    );
  }
  if (kind === "wave") {
    return (
      <div className="viz">
        <div className="viz-wave">
          <svg viewBox="0 0 200 80" preserveAspectRatio="none">
            <path d="M0,50 C20,20 40,70 60,40 C80,15 100,55 120,35 C140,18 160,45 180,25 L200,30"
                  fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <path d="M0,55 C20,35 40,60 60,45 C80,30 100,50 120,40 C140,28 160,42 180,32 L200,35"
                  fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <circle cx="60" cy="45" r="3" fill="var(--accent)" />
            <circle cx="120" cy="40" r="3" fill="var(--accent)" />
            <circle cx="180" cy="32" r="3" fill="var(--accent)" />
          </svg>
        </div>
      </div>
    );
  }
  return null;
}

Object.assign(window, { Nav, Marquee, Footer, ProjViz, BrandLogo, fmtInline, useReveal });
