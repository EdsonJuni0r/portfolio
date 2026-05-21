import ProjectMedia, { type MediaItem } from './ProjectMedia'
import { useState, useEffect, useRef } from 'react'
import './App.css'

const NAV_LINKS = ['sobre', 'serviços', 'projetos', 'habilidades', 'contato']

const SERVICES = [
  { icon: '⚙️', title: 'Suporte Técnico', desc: 'Atendimento remoto e presencial, manutenção de hardware/software, suporte a ERPs e sistemas de saúde (e-SUS APS, SIH).' },
  { icon: '🔌', title: 'Infraestrutura de TI', desc: 'Configuração de redes, servidores, estações de trabalho e cabeamento estruturado para ambientes corporativos.' },
  { icon: '🚀', title: 'Desenvolvimento de APIs', desc: 'APIs REST robustas com Java, Spring Boot, PostgreSQL e Docker. Boas práticas de arquitetura em camadas e versionamento.' },
  { icon: '🧪', title: 'Qualidade de Software', desc: 'Testes manuais, testes automatizados com JUnit e Mockito, documentação de bugs e revisão de critérios de aceitação.' },
  { icon: '🌐', title: 'Desenvolvimento Web', desc: 'Interfaces modernas com React, TypeScript e Tailwind CSS. Do protótipo ao deploy com foco em usabilidade.' },
  { icon: '📋', title: 'Gestão e Documentação', desc: 'Registro de chamados via 1Doc, controle de patrimônio, documentação técnica e gestão ágil com Scrum.' },
]

// ── Projects Data ──────────────────────────────────────────────────
// Para adicionar mídia real substitua os placeholders:
//   { type: 'image', src: '/portfolio/img/nome.png', alt: 'Descrição' }
//   { type: 'video', src: '/portfolio/video/demo.mp4' }
//   { type: 'placeholder', label: 'Em breve', color: '#0d1830' }

const PROJECTS = [
  {
    tag: 'API REST', title: 'Pedreno Store', subtitle: 'Sistema de Gestão de Crediário', highlight: true,
    desc: 'Sistema de gestão de crediário (fiado) para pequenos comércios. API completa com autenticação JWT, controle de roles, suporte a compras multi-item e testes automatizados.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JUnit 5', 'Mockito'],
    stackfront: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/EdsonJuni0r/pedrenostore-api.git',
    media: [
      // Substitua pelos caminhos reais após adicionar as imagens em public/img/
      // { type: 'image', src: '/portfolio/img/pedreno-auth.png', alt: 'Autenticação JWT' },
      // { type: 'video', src: '/portfolio/video/pedreno-demo.mp4' },
      { type: 'video', src: '/portfolio/video/1128.mp4'},
    ] as MediaItem[],
  },
  {
    tag: 'IoT / Mobile', title: 'Monitor de Gases', subtitle: 'Projeto SUPER Samsung – UFAM',
    desc: 'Sistema de monitoramento ambiental com sensores de gás, ESP32 e microcontroladores. Comunicação em tempo real via protocolo MQTT.',
    stack: ['Flutter', 'Arduino', 'ESP32', 'MQTT'],
    link: 'https://github.com/EdsonJuni0r',
    media: [
      { type: 'image', src: '/portfolio/img/Captura de tela 2025-12-07 133938.png', alt: 'App Mobile – Leituras', color: '#0a1628' },
      { type: 'placeholder', label: 'Dashboard Sensores',    color: '#0d1e38' },
    ] as MediaItem[],
  },
  {
    tag: 'Web App', title: 'Biblioteca Digital', subtitle: 'Acervo Acadêmico – UFAM',
    desc: 'Plataforma web para acervo digital da UFAM. Testes unitários, manutenção evolutiva e colaboração em equipe de desenvolvimento.',
    stack: ['JavaScript', 'Node.js', 'React', 'PostgreSQL'],
    link: 'https://github.com/EdsonJuni0r',
    media: [
      { type: 'placeholder', label: 'Listagem de Publicações', color: '#0a1628' },
      { type: 'placeholder', label: 'Busca e Filtros',         color: '#0d1e38' },
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
        <img src="logo.png" alt="Pedreno Tech & Infra" className="navbar__logo"/>
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
      <CircuitBg/>
      <div className="hero__inner">
        <span className="hero__tag"><span className="dot"/>disponível para novos projetos</span>
        <h1 className="hero__name">Edson <span className="hero__accent">Junior</span></h1>
        <p className="hero__title">Engenheiro de Software&nbsp;·&nbsp;QA&nbsp;·&nbsp;Suporte T.I</p>
        <p className="hero__sub">Baseado em Barreirinha, AM — construindo soluções digitais robustas com Java, Spring Boot, React e TypeScript.</p>
        <div className="hero__actions">
          <a href="#projetos" className="btn btn--primary">Ver Projetos</a>
          <a href="#contato" className="btn btn--outline">Fale comigo</a>
        </div>
        <div className="hero__links">
          <a href="https://github.com/EdsonJuni0r" target="_blank" rel="noreferrer" className="hero__social">
            <GitHubIcon/> GitHub
          </a>
          <a href="https://www.linkedin.com/in/edson-junior-eng/" target="_blank" rel="noreferrer" className="hero__social">
            <LinkedInIcon/> LinkedIn
          </a>
        </div>
      </div>
      <div className="hero__scroll-hint"><span/></div>
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
            <p>Minha rotina mistura atendimento técnico no campo — com sistemas como e-SUS APS e ERPs de saúde — e desenvolvimento de projetos pessoais focados em <strong>APIs REST</strong>, testes automatizados e boas práticas de engenharia.</p>
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
  return (
    <section id="serviços" className="section services">
      <div className="container">
        <SectionLabel>o que eu faço</SectionLabel>
        <h2 className="section-title">Serviços &amp; <span className="teal">Especialidades</span></h2>
        <div className="services__grid">
          {SERVICES.map((s,i)=>(
            <div key={i} className="service-card">
              <span className="service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
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
              <div className="project-item__media">
                <ProjectMedia media={p.media} title={p.subtitle || p.title} />
              </div>
              {/* Info (direita em desktop) */}
              <div className="project-item__info">
                <div className="project-item__meta">
                  <span className="project-card__tag">{p.tag}</span>
                  {p.highlight && <span className="project-card__badge">⭐ Principal</span>}
                </div>
                <h3 className="project-item__title">{p.title}</h3>
                {p.subtitle && <p className="project-item__subtitle">{p.subtitle}</p>}
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__stack">
                  {p.stack.map(s=><span key={s} className="stack-pill">{s}</span>)}
                  {p.stackfront && p.stackfront.map(s=><span key={s} className="stack-pill">{s}</span>)}
                </div>
                <div className="project-item__actions">
                  <a href={p.link} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">
                    <GitHubIcon /> Ver no GitHub
                  </a>
                </div>
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
            <span className="contact-card__icon">✉️</span>
            <span className="contact-card__label">E-mail</span>
            <span className="contact-card__value">vianaedsonjunior@gmail.com</span>
          </a>
          <a href="https://wa.me/5592993270197" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-card__icon">💬</span>
            <span className="contact-card__label">WhatsApp</span>
            <span className="contact-card__value">+55 92 99327-0197</span>
          </a>
          <a href="https://www.linkedin.com/in/edson-junior-eng/" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-card__icon">💼</span>
            <span className="contact-card__label">LinkedIn</span>
            <span className="contact-card__value">edson-junior-eng</span>
          </a>
          <a href="https://github.com/EdsonJuni0r" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-card__icon">🐙</span>
            <span className="contact-card__label">GitHub</span>
            <span className="contact-card__value">EdsonJuni0r</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <img src="logo.png" alt="Pedreno Tech & Infra" className="footer__logo"/>
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
