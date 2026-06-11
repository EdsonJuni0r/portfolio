import ProjectMedia, { type MediaItem } from './ProjectMedia'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'

const NAV_LINKS = ['sobre', 'serviços', 'projetos', 'habilidades', 'contato']

const SERVICES = [
  { image: '/portfolio/img/services/suporte.webp', title: 'Suporte Técnico', desc: 'Atendimento remoto e presencial, manutenção de hardware/software, suporte a ERPs e sistemas de saúde (e-SUS APS, SIH).' },
  { image: '/portfolio/img/services/infra.webp', title: 'Infraestrutura de TI', desc: 'Configuração de redes, servidores, estações de trabalho e cabeamento estruturado para ambientes corporativos.' },
  { image: '/portfolio/img/services/api.webp', title: 'Desenvolvimento de APIs', desc: 'APIs REST robustas com Java, Spring Boot, PostgreSQL e Docker. Boas práticas de arquitetura em camadas e versionamento.' },
  { image: '/portfolio/img/services/testes.webp', title: 'Qualidade de Software', desc: 'Testes manuais, testes automatizados com JUnit e Mockito, documentação de bugs e revisão de critérios de aceitação.' },
  { image: '/portfolio/img/services/web.webp', title: 'Desenvolvimento Web', desc: 'Interfaces modernas com React, TypeScript e Tailwind CSS. Do protótipo ao deploy com foco em usabilidade.' },
  { image: '/portfolio/img/services/gestao.webp', title: 'Gestão e Documentação', desc: 'Registro de chamados via 1Doc, controle de patrimônio, documentação técnica e gestão ágil com Scrum.' },
]

const PROJECTS = [
  {
    tag: 'API REST', title: 'Pedreno Store', subtitle: 'Sistema de Gestão de Crediário', highlight: true,
    desc: 'Sistema de gestão de crediário (fiado) para pequenos comércios. API completa com autenticação JWT, controle de roles, suporte a compras multi-item e testes automatizados.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JUnit 5', 'Mockito'],
    stackfront: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/EdsonJuni0r/pedrenostore-api.git',
    media: [
      { type: 'video', src: '/portfolio/video/1128.mp4'},
    ] as MediaItem[],
  },
  {
    tag: 'IoT / Mobile', title: 'Sistema de detecção de gases e prevenção de incêndios baseado em IoT e  MQTT.', subtitle: 'Projeto SUPER Samsung – UFAM',
    desc: 'Sistema de monitoramento ambiental com sensores de gás, ESP32 e microcontroladores. Comunicação em tempo real via protocolo MQTT.',
    stack: ['Flutter', 'Arduino', 'ESP32', 'MQTT'],
    link: 'https://github.com/EdsonJuni0r/Detector_de_gas_temperature_esp32_mqtt.git',
    media: [
      { type: 'image', src: '/portfolio/img/projetos/image1mqtt.webp', alt: 'Arquitetura' },
      { type: 'image', src: '/portfolio/img/projetos/image1circuito.webp', alt: 'Circuito com sensores e ESP32', color: '#0a1628' },
      { type: 'image', src: '/portfolio/img/projetos/image1flutter.webp', alt: 'Código Flutter', color: '#0a1628' },
      { type: 'image', src: '/portfolio/img/projetos/image1app.webp', alt: 'App Mobile – Leituras', color: '#0a1628' },
    ] as MediaItem[],
  },
  {
    tag: 'Infraestrutura', title: 'Serviços de Cabeamento e Configuração de Redes de Computadores', subtitle: 'Serviços para SEMSA',
    desc: 'Projeto de infraestrutura de TI para a Secretaria Municipal de Saúde de Barreirinha. Configuração de redes, manutenção de hardware e suporte técnico para unidades básicas de saúde.',
    stack: ['Infraestrutura', 'Redes', 'Suporte Técnico'],
    media: [
      { type: 'image', src: '/portfolio/img/projetos/image2infra.webp', alt: 'Instalação de servidor', },
      { type: 'image', src: '/portfolio/img/projetos/image3.webp', alt: 'Serviços na semsa', color: '#0d1e38' },
      { type: 'image', src: '/portfolio/img/projetos/image2infra2.webp', alt: 'Infraestrutura em Unidade de Saúde', color: '#0a1628' },
      { type: 'image', src: '/portfolio/img/projetos/image2infra3.webp', alt: 'Infraestrutura em Unidade de Saúde', color: '#0a1628' },
    ] as MediaItem[],
  },
]

const SKILLS_GROUPS = [
  { label: 'Back-end', skills: ['Java', 'Spring Boot', 'APIs REST', 'JPA/Hibernate', 'SQL', 'PostgreSQL', 'Docker', 'Python', 'Node.js'] },
  { label: 'Front-end', skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'QA & Testes', skills: ['JUnit 5', 'Mockito', 'Cypress', 'Insomnia', 'Postman', 'Testes Manuais', 'Testes Exploratórios'] },
  { label: 'Ferramentas & Infra', skills: ['Git', 'GitHub', 'Scrum', 'Docker', 'Redes', 'Suporte Técnico', 'e-SUS APS', '1Doc'] },
]

const TIMELINE = [
  { period: 'jan/2026 – atual', role: 'Pós-Graduação em Engenharia da Qualidade de Software', org: 'Faculdade Bookplay', type: 'edu' },
  {
    period: 'jul/2024 – atual', role: 'Técnico em Suporte de T.I', org: 'Fundo Municipal de Saúde – Barreirinha/AM', type: 'work',
    items: ['Suporte técnico remoto e presencial em Unidades Básicas de Saúde', 'Testes exploratórios em sistemas ERPs internos', 'Manutenção de hardware/software para Sistema de Informação em Saúde'],
  },
  {
    period: 'nov/2023 – mar/2024', role: 'Estagiário em Desenvolvimento', org: 'Universidade Federal do Amazonas (UFAM)', type: 'work',
    items: ['Desenvolvimento de sistema web para biblioteca digital acadêmica', 'Stack: JavaScript, Node.js, React, PostgreSQL', 'Implementação de testes unitários básicos'],
  },
  { period: 'Concluído – abr/2024', role: 'Bacharelado em Engenharia de Software', org: 'ICET – UFAM, Itacoatiara – AM', type: 'edu' },
]

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
        <img src="/portfolio/logo.png" alt="Pedreno Tech & Infra" className="navbar__logo"/>
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
              src="/portfolio/img/services/prof.png"
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

function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <SectionLabel>sobre mim</SectionLabel>
        <div className="about__grid">
          <div className="about__text">
            <h2 className="section-title">Tecnologia na veia,<br/><span className="teal">qualidade como padrão.</span></h2>
            <p>Sou Engenheiro de Software formado pela UFAM, com experiência prática em suporte técnico em Unidades de Saúde e desenvolvimento de software. Atualmente curso Pós-Graduação em <strong>Engenharia da Qualidade de Software</strong>.</p>
            <p>Atuo unindo infraestrutura, suporte técnico e desenvolvimento de software para criar soluções robustas para ambientes críticos, especialmente na área da saúde pública e na gestão de sistemas de informação.</p>
            <p>Fundei a <span className="teal">Pedreno Tech &amp; Infra</span> para oferecer soluções digitais e de infraestrutura pensadas para a realidade de Barreirinha e região.</p>
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

function Services() {
  const [current, setCurrent] = useState(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SERVICES.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }

  // Auto-play
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SERVICES.length)
    }, 6000)

    return () => clearTimeout(timer)
  }, [current])

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current

    // sensibilidade mínima
    if (distance > 50) {
      nextSlide() // deslizou para esquerda
    }

    if (distance < -50) {
      prevSlide() // deslizou para direita
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

          <div 
            className="service-slide" 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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

              <h2>{SERVICES[current].title}</h2>

              <p>{SERVICES[current].desc}</p>
            </div>

          </div>

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
              className={`carousel-dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

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

function Contact() {
  return (
    <section id="contato" className="section contact">
      <div className="container">
        <SectionLabel>vamos conversar</SectionLabel>
        <h2 className="section-title">Entre em <span className="teal">Contato</span></h2>
        <p className="contact__sub">Aberto a freelas, projetos e oportunidades. Respondo rápido!</p>
        <div className="contact__cards">
          <a href="mailto:vianaedsonjunior@gmail.com" className="contact-card">
            <span className="contact-card__icon">
              <FaEnvelope />
            </span>
            <span className="contact-card__label">E-mail</span>
            <span className="contact-card__value">
              vianaedsonjunior@gmail.com
            </span>
          </a>

          <a
            href="https://wa.me/5592993270197"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <span className="contact-card__icon">
              <FaWhatsapp />
            </span>
            <span className="contact-card__label">WhatsApp</span>
            <span className="contact-card__value">
              +55 92 99327-0197
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/edson-junior-eng/"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <span className="contact-card__icon">
              <FaLinkedin />
            </span>
            <span className="contact-card__label">LinkedIn</span>
            <span className="contact-card__value">
              edson-junior-eng
            </span>
          </a>

          <a
            href="https://github.com/EdsonJuni0r"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <span className="contact-card__icon">
              <FaGithub />
            </span>
            <span className="contact-card__label">GitHub</span>
            <span className="contact-card__value">
              EdsonJuni0r
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <img src="/portfolio/logo.png" alt="Pedreno Tech & Infra" className="footer__logo"/>
      <p>© {new Date().getFullYear()} Edson Carlos Viana Junior · Pedreno Tech &amp; Infra</p>
      <p className="footer__sub">Barreirinha – AM · Soluções Digitais · Sistemas e Hardwares</p>
    </footer>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span>//</span> {children}</p>
}

function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
}

function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}

export default function App() {
  const [activeSection, setActiveSection] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(()=>{
    observerRef.current = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActiveSection(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(s=>observerRef.current?.observe(s))
    return ()=>observerRef.current?.disconnect()
  },[])
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
