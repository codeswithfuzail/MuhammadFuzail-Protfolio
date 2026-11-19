"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useState } from "react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Journey", "journey"],
  ["Contact", "contact"],
];

const skills = [
  { group: "Frontend Development", items: ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js", "Next.js", "Tailwind CSS"] },
  { group: "Backend Development", items: ["Node.js", "Express.js", "MongoDB"] },
];

const projects = [
  {
    name: "HCM Lite",
    number: "01",
    description: "A people-operations workspace with an at-a-glance view of attendance, time off, and payroll.",
    image: "/images/scm-lite.png",
    imageAlt: "SCM Lite application preview",
    href: "https://frontend-ys5b.vercel.app",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "Social App",
    number: "02",
    description: "A social app with a welcoming sign-in experience and a shared feed for keeping up with people.",
    image: "/images/social-app.png",
    imageAlt: "Social App login screen preview",
    href: "https://my-social-five-pi.vercel.app",
    tags: ["HTML", "CSS", "JavaScript", "Supabase"],
  },
];

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    arrow: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    down: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    play: <><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.7 9.7a16 16 0 0 0 6.6 6.6l1.3-1.3a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2Z" /></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7m0-10v.01M12 17v-7h3a3 3 0 0 1 3 3v4m-6 0v-4a3 3 0 0 1 3-3" /></>,
  };

  return <svg {...common}>{paths[name] || paths.sparkle}</svg>;
}

function Reveal({ children, className = "", delay = 0, id, direction = "up" }) {
  const reduceMotion = useReducedMotion();
  const hiddenState = direction === "left"
    ? { opacity: 0, x: -16 }
    : direction === "right"
      ? { opacity: 0, x: 16 }
      : { opacity: 0, y: 12 };

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduceMotion ? false : hiddenState}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const ContactForm = memo(function ContactForm() {
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submission = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setIsSubmitting(true);
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setFormMessage(result?.error || "We couldn’t send your message. Please try again.");
        return;
      }

      form.reset();
      setFormMessage("Thanks for reaching out. Your message has been sent successfully.");
    } catch {
      setFormMessage("We couldn’t send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Reveal className="contact-form-card" delay={0.12} direction="right">
      <div className="form-heading"><div><p className="eyebrow">SEND A NOTE</p><h3>Tell me about it.</h3></div><span className="form-sparkle"><Icon name="sparkle" size={20} /></span></div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" placeholder="Jane Smith" autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="jane@example.com" autoComplete="email" required /></div>
        <div className="form-field"><label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" rows="4" placeholder="A little about your idea, project, or question…" required /></div>
        <div className="form-submit-row"><p>Usually reply within a couple of days.</p><button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"} <Icon name="arrow" size={15} /></button></div>
        <p className="form-status" aria-live="polite">{formMessage}</p>
      </form>
    </Reveal>
  );
});

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  return (
    <div className="site-shell" data-theme={theme}>
      <div className="ambient-background" aria-hidden="true"><span className="ambient-blob ambient-blob-one" /><span className="ambient-blob ambient-blob-two" /><span className="ambient-blob ambient-blob-three" /><span className="ambient-shimmer" /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#home" aria-label="Muhammad Fuzail home">
            <span className="brand-mark">F<span>.</span></span>
            <span className="brand-name">Fuzail<span className="brand-dot">.</span></span>
          </a>
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            {links.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Icon name="arrow" size={15} /></a>
          </nav>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} type="button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>
            <a className="nav-contact" href="#contact">Let’s talk <Icon name="arrow" size={15} /></a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="availability" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="availability-dot" /> Available for opportunities
            </motion.div>
            <motion.p className="eyebrow hero-eyebrow" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>HELLO, I’M MUHAMMAD FUZAIL</motion.p>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
              I build things<br />for the <span className="text-gradient">web.</span>
            </motion.h1>
            <motion.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}>
              Developer with a love for thoughtful interfaces, clean code, and turning good ideas into useful digital experiences.
            </motion.p>
            <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}>
              <a className="button button-primary" href="#contact">Hiring? Let’s talk <Icon name="arrow" size={16} /></a>
              <a className="button button-secondary" href="/resume/Muhammad-Fuzail-Resume.pdf" download>Download resume <Icon name="down" size={15} /></a>
            </motion.div>
            <div className="hero-footnote"><span className="hero-line" /> Open to thoughtful collaborations <span className="footnote-divider">·</span> Working worldwide</div>
          </div>

          <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotateY: -8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-glow" />
            <div className="hero-profile-card">
            <div className="profile-topline"><span className="tiny-window-dots"><i /><i /><i /></span><span>fuzail.png</span><span className="profile-card-menu">···</span></div>
              <div className="profile-image-wrap">
                <Image src="/images/fuzail.png" alt="Muhammad Fuzail in his workspace" fill priority sizes="(max-width: 760px) 58vw, 310px" className="profile-image" />
                <div className="profile-badge"><span className="availability-dot" /> Open to work</div>
              </div>
              <div className="profile-caption"><div><span className="caption-label">CURRENT FOCUS</span><strong>Building for the web</strong></div><span className="caption-sparkle"><Icon name="sparkle" size={19} /></span></div>
            </div>
            <button className="hero-video-teaser" type="button" onClick={() => setVideoOpen(true)}><span className="hero-video-play"><Icon name="play" size={14} /></span><span><small>A QUICK HELLO</small>Play introduction</span><Icon name="arrow" size={14} /></button>
            <div className="floating-chip chip-code"><span className="code-bracket">&lt;/&gt;</span><span>Clean code<br /><b>thoughtful design</b></span></div>
            <div className="floating-chip chip-stack"><span className="stack-icon"><Icon name="sparkle" size={16} /></span><span>Always<br /><b>learning</b></span></div>
            <div className="hero-orbit-label">DESIGN <span>×</span> DEVELOPMENT</div>
          </motion.div>
          <div className="hero-socials" aria-label="Developer profiles"><a href="https://github.com/codeswithfuzail" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Icon name="github" size={17} /></a><a href="https://www.linkedin.com/in/muhammad-fuzail-73221a439/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Icon name="linkedin" size={17} /></a></div>
          <a className="scroll-cue" href="#about"><span className="scroll-cue-line" /> Scroll to explore <Icon name="down" size={14} /></a>
        </section>

        <section className="about-section section-wrap section-pad" id="about">
          <Reveal className="section-heading"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Curious by nature.<br /><span className="muted-heading">Developer by choice.</span></h2></Reveal>
          <div className="about-grid">
            <Reveal className="about-copy" delay={0.08} direction="left">
              <p className="about-lead">I’m a developer who enjoys making the internet a little more useful—and a lot more delightful.</p>
              <p>I care about the details people feel: a layout that makes sense, an interaction that feels natural, and code that stays approachable as a project grows. I’m always exploring new ways to turn a blank canvas into something people enjoy using.</p>
              <p>Right now, I’m sharpening my frontend craft and building projects that help me learn by doing.</p>
              <a className="text-link" href="#contact">A little more about my journey <Icon name="arrow" size={15} /></a>
            </Reveal>
            <Reveal className="about-aside" delay={0.16} direction="right">
              <div className="about-note-card"><div className="note-icon"><Icon name="sparkle" size={19} /></div><p>“Good design is invisible. Great code makes it possible.”</p><span>MY APPROACH</span></div>
              <div className="about-stat-row"><div><strong>2</strong><span>Projects<br />and growing</span></div><div className="stat-divider" /><div><strong>∞</strong><span>Things left<br />to learn</span></div></div>
            </Reveal>
          </div>
          <Reveal className="video-card about-video-card" delay={0.12}><div className="video-art"><Image src="/images/fuzail.png" alt="" fill sizes="(max-width: 760px) 90vw, 36vw" className="video-thumbnail" /><div className="video-grid-lines" /><button className="video-play" type="button" onClick={() => setVideoOpen(true)} aria-label="Play Muhammad Fuzail’s introduction video"><Icon name="play" size={22} /></button><span className="video-duration">INTRODUCTION · 00:00</span></div><div className="video-copy"><p className="eyebrow">A QUICK HELLO</p><h3>A little more about me.</h3><p>Press play for a short introduction. The video opens with controls and only plays when you choose.</p><button type="button" className="text-link video-open-button" onClick={() => setVideoOpen(true)}>Watch introduction <Icon name="arrow" size={15} /></button></div></Reveal>
        </section>

        <section className="skills-section section-wrap section-pad" id="skills">
          <Reveal className="section-heading section-heading-row"><div><p className="eyebrow">WHAT I WORK WITH</p><h2>My <span className="text-gradient">toolkit.</span></h2></div><p className="section-intro">A growing set of tools and skills for building thoughtful, reliable experiences on the web.</p></Reveal>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <Reveal className="skill-card" key={skill.group} delay={index * 0.08} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`skill-icon skill-icon-${index}`}><Icon name={index === 0 ? "globe" : index === 1 ? "sparkle" : "arrow"} size={19} /></div>
                <h3>{skill.group}</h3>
                <ul>{skill.items.map((item) => <li key={item}><span className="skill-check"><Icon name="check" size={12} /></span>{item}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="projects-section section-wrap section-pad" id="projects">
          <Reveal className="section-heading section-heading-row"><div><p className="eyebrow">A FEW THINGS I’VE MADE</p><h2>Selected <span className="text-gradient">work.</span></h2></div><p className="section-intro">Two projects, each a chance to explore ideas, solve problems, and make something with care.</p></Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal className="project-card" key={project.name} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`project-art project-art-${index}`}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 90vw, 45vw" className="project-image" />
                  <span className="project-number">{project.number} / 02</span>
                </div>
                <div className="project-content"><div className="project-title-row"><h3>{project.name}</h3><a className="project-demo" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live demo in a new tab`}>Live Demo <Icon name="arrow" size={15} /></a></div>
                  <p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="journey-section section-wrap section-pad" id="journey">
          <Reveal className="section-heading"><p className="eyebrow">ALWAYS IN PROGRESS</p><h2>The learning <span className="text-gradient">journey.</span></h2><p className="section-intro journey-intro">A path shaped by curiosity, practice, and the people I learn alongside.</p></Reveal>
          <div className="journey-layout">
            <Reveal className="journey-feature" delay={0.08} direction="left"><div className="journey-feature-top"><span className="journey-icon"><Icon name="sparkle" size={21} /></span><span className="journey-status"><i /> CURRENTLY LEARNING</span></div><h3>Building a strong foundation in web development.</h3><p>From the building blocks of the web to modern React workflows, I’m growing one project and one new idea at a time.</p><div className="journey-pills"><span>Frontend development</span><span>UI craft</span><span>Problem solving</span></div></Reveal>
            <Reveal className="journey-list" delay={0.16} direction="right"><div className="timeline-item"><span className="timeline-marker"><Icon name="check" size={13} /></span><div><span className="timeline-label">THE FOUNDATION</span><h3>Learning the fundamentals</h3><p>HTML, CSS, JavaScript, and how the web fits together.</p></div></div><div className="timeline-item"><span className="timeline-marker timeline-marker-current"><span /></span><div><span className="timeline-label">RIGHT NOW</span><h3>Creating with React & Next.js</h3><p>Practicing component thinking through hands-on projects.</p></div></div><div className="timeline-item"><span className="timeline-marker timeline-marker-future"><span /></span><div><span className="timeline-label">WHAT’S NEXT</span><h3>Going deeper, every day</h3><p>Better accessibility, stronger UI patterns, and thoughtful engineering.</p></div></div></Reveal>
          </div>
        </section>

        <section className="contact-section section-wrap section-pad" id="contact">
          <Reveal className="contact-heading" direction="left">
            <p className="eyebrow">HAVE A GOOD ONE IN MIND?</p>
            <h2>Let’s make<br />something <span className="text-gradient">matter.</span></h2>
            <p className="contact-intro">I’d love to hear what you’re working on. Tell me a little about it and let’s start a conversation.</p>
            <div className="contact-links">
              <a href="mailto:muhammadfuzailfurqan@gmail.com">
                <span className="contact-link-icon"><Icon name="mail" size={17} /></span>
                <span className="contact-link-copy"><small>DROP ME AN EMAIL</small><span>muhammadfuzailfurqan@gmail.com</span></span>
                <Icon name="arrow" size={15} />
              </a>
              <a href="https://wa.me/923313883153" target="_blank" rel="noreferrer">
                <span className="contact-link-icon"><Icon name="phone" size={17} /></span>
                <span className="contact-link-copy"><small>FIND ME ON WHATSAPP</small><span>03313883153</span></span>
                <Icon name="arrow" size={15} />
              </a>
              <div className="contact-social-links">
                <a href="https://github.com/codeswithfuzail" target="_blank" rel="noreferrer"><Icon name="github" size={17} /><span>GitHub</span><Icon name="arrow" size={13} /></a>
                <a href="https://www.linkedin.com/in/muhammad-fuzail-73221a439/" target="_blank" rel="noreferrer"><Icon name="linkedin" size={17} /><span>LinkedIn</span><Icon name="arrow" size={13} /></a>
              </div>
            </div>
          </Reveal>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner section-wrap">
          <div className="footer-intro"><a className="brand footer-brand" href="#home"><span className="brand-mark">F<span>.</span></span><span className="brand-name">Muhammad Fuzail<span className="brand-dot">.</span></span></a><p>Developer building thoughtful, useful digital experiences for the web. Always learning, always creating.</p></div>
          <div className="footer-column"><h3>Explore</h3><nav aria-label="Footer navigation">{links.map(([label, id]) => <a href={`#${id}`} key={id}>{label === "Journey" ? "Education / Journey" : label}</a>)}</nav></div>
          <div className="footer-column footer-contact"><h3>Get in touch</h3><a href="mailto:muhammadfuzailfurqan@gmail.com">muhammadfuzailfurqan@gmail.com</a><a href="https://wa.me/923313883153" target="_blank" rel="noreferrer">WhatsApp · 03313883153</a></div>
          <div className="footer-column footer-social-column"><h3>Social links</h3><a className="footer-social-link" href="https://github.com/codeswithfuzail" target="_blank" rel="noreferrer"><span className="footer-social-icon"><Icon name="github" size={17} /></span><span>GitHub</span><Icon name="arrow" size={14} /></a><a className="footer-social-link" href="https://www.linkedin.com/in/muhammad-fuzail-73221a439/" target="_blank" rel="noreferrer"><span className="footer-social-icon"><Icon name="linkedin" size={17} /></span><span>LinkedIn</span><Icon name="arrow" size={14} /></a></div>
          <div className="footer-bottom"><span>© Muhammad Fuzail. All rights reserved.</span><a className="back-top" href="#home">Back to top <Icon name="arrow" size={14} /></a></div>
        </div>
      </footer>

      <AnimatePresence>
        {videoOpen && <motion.div className="modal-backdrop" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }} onClick={() => setVideoOpen(false)}><motion.div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setVideoOpen(false)} aria-label="Close video"><Icon name="close" size={20} /></button><video className="intro-video" controls playsInline preload="metadata" poster="/images/fuzail.png"><source src="/videos/about-intro.mp4" type="video/mp4" />Your browser does not support the video element.</video><div className="modal-caption"><h2 id="video-modal-title">A quick introduction</h2><p>My personal introduction video. Use the player controls to watch.</p></div></motion.div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
