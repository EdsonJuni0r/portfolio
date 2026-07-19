import ProjectMedia from './components/project-media/ProjectMedia'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'
import { NAV_LINKS, PROJECTS, SERVICES, SKILLS_GROUPS, TIMELINE } from './data/portfolio'
import { assetPath } from './lib/assets'
import { useActiveSection } from './hooks/useActiveSection'
import './App.css'

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   CIRCUIT BACKGROUND
   ═══════════════════════════════════════════════════════════ */
function CircuitBg() {
  return (
    <svg className="circuit-bg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="rg1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#00c8d4" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#00c8d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#rg1)" />
      {[80,200,320,440,560,680].map((y,i)=><line key={`h${i}`} x1="0" y1={y} x2="1200" y2={y} stroke="#00c8d4" strokeWidth="0.4" strokeOpacity="0.13" strokeDasharray="8 16"/>)}
      {[100,250,400,550,700,850,1000,1150].map((x,i)=><line key={`v${i}`} x1={x} y1="0" x2={x} y2="800" stroke="#00c8d4" strokeWidth="0.4" strokeOpacity="0.13" strokeDasharray="8 24"/>)}
      {[[100,80],[250,200],[400,320],[550,80],[700,440],[850,200],[1000,560],[1150,320],[100,440],[400,560],[700,200]].map(([cx,cy],i)=>(
        <circle key={`n${i}`} cx={cx} cy={cy} r="3" fill="none" stroke="#00c8d4" strokeWidth="0.8" strokeOpacity="0.22"/>
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40)
    window.addEventListener('scroll',fn)
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  return (
    <nav className={`navbar${scrolled?' navbar--scrolled':''}`}>
      <a href="#hero" className="navbar__brand">
        <img src={assetPath('logo.png')} alt="Pedreno Tech & Infra" className="navbar__logo"/>
      </a>
      <ul className={`navbar__links${open?' navbar__links--open':''}`}>
        {NAV_LINKS.map(l=>(
          <li key={l}><a href={`#${l}`} className={active===l?'active':''} onClick={()=>setOpen(false)}>{l}</a></li>
        ))}
        <li><a href="mailto:vianaedsonjunior@gmail.com" className="navbar__cta" onClick={()=>setOpen(false)}>Contrate-me</a></li>
      </ul>
      <button className="navbar__burger" onClick={()=>setOpen(o=>!o)} aria-label="Menu">
        <span className={open?'open':''}/>
        <span className={open?'open':''}/>
        <span className={open?'open':''}/>
      </button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="hero">
      <CircuitBg />

      <div className="hero__content">

        <div className="hero__info">

          <span className="hero__tag">
            <span className="dot" />
            disponível para novos projetos
          </span>

          <h1 className="hero__name">
            Edson <span className="hero__accent">Junior</span>
          </h1>

          <p className="hero__title">
            Engenheiro de Software · Suporte T.I
          </p>

          <p className="hero__sub">
            Tecnico em Suporte de Informática · Experiência em soluções digitais
            robustas com Java, Spring Boot, React e TypeScript · Entusiasta em Qualidade de Software e Infraestrutura de Redes.
          </p>

          <div className="hero__actions">
            <a href="#projetos" className="btn btn--primary">
              Ver Projetos
            </a>

            <a href="#contato" className="btn btn--outline">
              Fale comigo
            </a>
          </div>

          <div className="hero__links">
            <a
              href="https://github.com/EdsonJuni0r"
              target="_blank"
              rel="noreferrer"
              className="hero__social"
            >
              <GitHubIcon />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/edson-junior-eng/"
              target="_blank"
              rel="noreferrer"
              className="hero__social"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>

        </div>

        <div className="hero__photo">

          <div className="hero__photo-card">

            <img
              src={assetPath('img/photo2.webp')}
              alt="Edson Junior"
            />

            <div className="hero__badge hero__badge--top">
              Suport IT
            </div>

            <div className="hero__badge hero__badge--bottom">
              Software Engineer
            </div>

          </div>

        </div>

      </div>

      <div className="hero__scroll-hint">
        <span />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <SectionLabel>sobre mim</SectionLabel>
        <div className="about__grid">
          <div className="about__text">
            <h2 className="section-title">Tecnologia na veia,<br/><span className="teal">qualidade como padrão.</span></h2>
            <p>Sou Engenheiro de Software formado pela UFAM, com experiência prática em suporte técnico em Unidades de Saúde e desenvolvimento de software. Atualmente curso Pós-Graduação em <strong>Engenharia da Qualidade de Software</strong>.</p>
            <p>Atuo unindo infraestrutura, suporte técnico e desenvolvimento de software para criar soluções para gestão de negócios, e na gestão de sistemas de informação.</p>
            <p>Criei a <span className="teal">Pedreno Tech &amp; Infra</span> para oferecer soluções digitais, manutenção de hardwares e softwares para a realidade de Barreirinha e região.</p>
            <div className="about__chips">
              {['Proativo','Comunicativo','Orientado a qualidade','Aprendizado contínuo','Trabalho em equipe'].map(t=>(
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="timeline">
            {TIMELINE.map((item,i)=>(
              <div key={i} className={`timeline__item timeline__item--${item.type}`}>
                <div className="timeline__dot"/>
                <div className="timeline__content">
                  <span className="timeline__period">{item.period}</span>
                  <strong className="timeline__role">{item.role}</strong>
                  <span className="timeline__org">{item.org}</span>
                  {item.items && <ul className="timeline__list">{item.items.map((it,j)=><li key={j}>{it}</li>)}</ul>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════ */
function Services() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SERVICES.length)
  }

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? SERVICES.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    const timer = setTimeout(nextSlide, 6000)
    return () => clearTimeout(timer)
  }, [current])

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number } }
  ) => {
    const swipe = info.offset.x

    if (swipe < -80) {
      nextSlide()
    }

    if (swipe > 80) {
      prevSlide()
    }
  }

  return (
    <section id="serviços" className="section services">
      <div className="container">

        <SectionLabel>o que eu faço</SectionLabel>

        <h2 className="section-title">
          Serviços & <span className="teal">Especialidades</span>
        </h2>

        <div className="services-carousel">

          <button
            className="carousel-btn carousel-btn--left"
            onClick={prevSlide}
          >
            ❮
          </button>

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              className="service-slide"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 120, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -120, scale: 0.96 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut'
              }}
            >

              <div className="service-slide__image">
                <img
                  src={SERVICES[current].image}
                  alt={SERVICES[current].title}
                />
              </div>

              <div className="service-slide__content">
                <span className="service-slide__counter">
                  0{current + 1} / 0{SERVICES.length}
                </span>

                <h3>{SERVICES[current].title}</h3>

                <p>{SERVICES[current].desc}</p>
              </div>

            </motion.div>

          </AnimatePresence>

          <button
            className="carousel-btn carousel-btn--right"
            onClick={nextSlide}
          >
            ❯
          </button>

        </div>

        <div className="carousel-dots">
          {SERVICES.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === current ? 'active' : ''
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <SectionLabel>trabalhos recentes</SectionLabel>
        <h2 className="section-title">Projetos em <span className="teal">Destaque</span></h2>
        <div className="projects__list">
          {PROJECTS.map((p,i)=>(
            <div key={i} className={`project-item${p.highlight?' project-item--highlight':''}`}>
              {/* Media (esquerda em desktop, topo em mobile) */}
              <div className="project-item__media object-cover aspect-video">
                <ProjectMedia media={p.media} title={p.subtitle || p.title} />
              </div>
              {/* Info (direita em desktop) */}
              <div className="project-item__info">
                <div className="project-item__meta">
                  <span className="project-card__tag">{p.tag}</span>
                  {p.highlight && <span className="project-card__badge">Principal</span>}
                </div>
                <h3 className="project-item__title">{p.title}</h3>
                {p.subtitle && <p className="project-item__subtitle">{p.subtitle}</p>}
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__stack">
                  {p.stack.map(s=><span key={s} className="stack-pill">{s}</span>)}
                  {p.stackfront && p.stackfront.map(s=><span key={s} className="stack-pill">{s}</span>)}
                </div>
                {p.link && (
                  <div className="project-item__actions">
                    <a href={p.link} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">
                      <GitHubIcon /> Ver no GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SKILLS
   ═══════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="habilidades" className="section skills">
      <div className="container">
        <SectionLabel>ferramentas & tecnologias</SectionLabel>
        <h2 className="section-title">Stack <span className="teal">Técnico</span></h2>
        <div className="skills__grid">
          {SKILLS_GROUPS.map((g,i)=>(
            <div key={i} className="skills__group">
              <h4 className="skills__group-label">{g.label}</h4>
              <div className="skills__pills">
                {g.skills.map(s=><span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════ */
function Contact() {
  const cards = [
    { href: 'mailto:vianaedsonjunior@gmail.com', icon: <FaEnvelope />, label: 'E-mail',    value: 'vianaedsonjunior@gmail.com' },
    { href: 'https://wa.me/5592993270197',       icon: <FaWhatsapp />, label: 'WhatsApp',  value: '+55 92 99327-0197' },
    { href: 'https://www.linkedin.com/in/edson-junior-eng/', icon: <FaLinkedin />, label: 'LinkedIn', value: 'edson-junior-eng' },
    { href: 'https://github.com/EdsonJuni0r',    icon: <FaGithub />,   label: 'GitHub',    value: 'EdsonJuni0r' },
  ]

  return (
    <section id="contato" className="section contact">
      <div className="container">
        <SectionLabel>vamos conversar</SectionLabel>
        <h2 className="section-title">Entre em <span className="teal">Contato</span></h2>
        <p className="contact__sub">Aberto a freelas, projetos e oportunidades. Respondo rápido!</p>
        <div className="contact__cards">
          {cards.map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-card">
              <span className="contact-card__icon">{c.icon}</span>
              <span className="contact-card__label">{c.label}</span>
              <span className="contact-card__value">{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <img src={assetPath('logo.png')} alt="Pedreno Tech & Infra" className="footer__logo"/>
      <p>© {new Date().getFullYear()} Edson Carlos Viana Junior · Pedreno Tech &amp; Infra</p>
      <p className="footer__sub">Barreirinha – AM · Soluções Digitais · Sistemas e Hardwares</p>
    </footer>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span>//</span> {children}</p>
}

/* ═══════════════════════════════════════════════════════════
   SHARED ICONS
   ═══════════════════════════════════════════════════════════ */
function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
}

function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const activeSection = useActiveSection()
  return (
    <>
      <Navbar active={activeSection}/>
      <main>
        <Hero/><About/><Services/><Projects/><Skills/><Contact/>
      </main>
      <Footer/>
    </>
  )
}
