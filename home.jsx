// Home page
const D = window.SITE_DATA;

function Hero() {
  return (
    <section className="hero">
      <div className="hero-portrait">
        <img src="assets/portrait.png" alt="Eleanor Lansner" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}} />
      </div>
      <span className="eyebrow"><span className="pulse"></span>Available summer 2026</span>
      <h1>
        Stories that<br />
        <em>move</em> product,<br />
        numbers that<br />
        prove it.
      </h1>
      <div className="hero-grid">
        <p className="lede">
          Product marketer with <strong>4+ years</strong> translating consumer insight and brand strategy into go-to-market plans that ship. Now deepening the analytical foundation underneath the storytelling at <strong>CU Boulder</strong>.
        </p>
        <div className="hero-card" data-reveal>
          {D.meta.map((m, i) =>
          <div className="row" key={i}>
              <span className="k">{m.k}</span>
              <span className="v">{m.v}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function AboutPreview() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <span className="num">01 / About</span>
        <h2>Brand instincts.<br /><em>Data spine.</em></h2>
      </div>
      <div className="about-grid">
        <div className="body" data-reveal>
          <p>{D.about[0]}</p>
          <p>{D.about[2]}</p>
          <p style={{ marginTop: 32 }}><a href="about.html" className="btn outline">Read the longer version →</a></p>
        </div>
        <div className="about-tiles" data-reveal>
          <div className="tile t-run">
            <span className="label">Runner</span>
            <span className="big">Chicago Marathon<br />training</span>
            <span className="ico">↗ Road</span>
          </div>
          <div className="tile t-data">
            <span className="label">Analytics</span>
            <span className="big">MSc '26<br />CU Boulder</span>
            <span className="ico">↗ ML</span>
          </div>
          <div className="tile t-travel">
            <span className="label">Adventure</span>
            <span className="big">Dolomites<br />March '27</span>
            <span className="ico">↗ next</span>
          </div>
          <div className="tile t-climb">
            <span className="label">RUN CLUB LEADER</span>
            <span className="big">4 The Girls<br />NYC </span>
            <span className="ico">↗ Community Builder </span>
          </div>
        </div>
      </div>
    </section>);

}

function WorkPreview() {
  const top = D.projects.slice(0, 4);
  return (
    <section className="section" id="work">
      <div className="section-head">
        <span className="num">02 / Selected work</span>
        <h2>Launches, segments,<br /><em>seasons.</em></h2>
      </div>
      <div className="work-list">
        {top.map((p, i) =>
        <a href="projects.html" key={i} className="work-card" data-reveal>
            <div className="arrow">↗</div>
            <div className="pviz">
              <ProjViz kind={p.viz} brand={p.brand} />
            </div>
            <div className="body">
              <div className="ptag">
                <span>{p.tag}</span>
                <span className="live">{p.status}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
            </div>
          </a>
        )}
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <a href="projects.html" className="btn">See all projects →</a>
      </div>
    </section>);

}

function NowSection() {
  return (
    <section className="section" id="now">
      <div className="section-head">
        <span className="num">03 / Now</span>
        <h2>What I'm into<br /><em>right now.</em></h2>
      </div>
      <div className="now-head">
        <h3>Just landed <span className="ampersand">&</span> based in NYC</h3>
        <span className="stamp">Updated this week</span>
      </div>
      <div className="now-strip" data-reveal>
        {D.now.items.map((it, i) =>
        <div className="now-item" key={i}>
            <span className="k">{it.k}</span>
            <span className="v">{it.v}</span>
          </div>
        )}
      </div>
      <div style={{ marginTop: 36, textAlign: "center" }}>
        <a href="/now" className="btn">See full Now page →</a>
      </div>
    </section>);

}

function FullBleed() {
  return (
    <section className="fullbleed" data-reveal>
      <h2><em>Own the launch.</em></h2>
    </section>);

}

function CTA() {
  return (
    <section className="section" style={{ borderBottom: "0" }}>
      <div className="cta-block">
        <h3>Building something <em>worth telling</em> a story about?</h3>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:eleanor.lansner@gmail.com" className="btn">Get in touch →</a>
          <a href="resume.html" className="btn outline">Download resume</a>
        </div>
      </div>
    </section>);

}

function App() {
  useReveal();
  // Apply tweaks
  useEffect(() => {
    const t = window.TWEAKS || {};
    document.body.classList.toggle("dark", !!t.dark);
    document.body.classList.remove("theme-citrus", "theme-violet", "theme-rose", "theme-warm", "theme-mono");
    if (t.theme && t.theme !== "default") document.body.classList.add("theme-" + t.theme);
  }, []);

  return (
    <>
      <Nav current="home" />
      <main className="page">
        <Hero />
      </main>
      <Marquee items={D.marquee} />
      <main className="page">
        <AboutPreview />
        <WorkPreview />
        <NowSection />
        <CTA />
      </main>
      <Footer />
      <TweaksHost />
    </>);

}

function TweaksHost() {
  const [tw, setTweak] = useTweaks(window.TWEAKS);
  useEffect(() => {
    document.body.classList.toggle("dark", !!tw.dark);
    document.body.classList.remove("theme-citrus", "theme-violet", "theme-rose", "theme-warm", "theme-mono");
    if (tw.theme && tw.theme !== "default") document.body.classList.add("theme-" + tw.theme);
  }, [tw.dark, tw.theme]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakSelect label="Accent color" value={tw.theme} onChange={(v) => setTweak("theme", v)}
        options={[
        { value: "default", label: "Electric blue (default)" },
        { value: "citrus", label: "Citrus green" },
        { value: "violet", label: "Violet" },
        { value: "rose", label: "Rose" },
        { value: "warm", label: "Warm cream" },
        { value: "mono", label: "Monochrome" }]
        } />
        <TweakToggle label="Dark mode" value={tw.dark} onChange={(v) => setTweak("dark", v)} />
      </TweakSection>
    </TweaksPanel>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);