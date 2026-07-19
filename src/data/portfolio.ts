import type { MediaItem } from '../components/project-media/ProjectMedia'
import { assetPath } from '../lib/assets'

export const NAV_LINKS = ['sobre', 'serviços', 'projetos', 'habilidades', 'contato'] as const

export interface Service { image: string; title: string; desc: string }
export interface Project {
  tag: string; title: string; subtitle: string; desc: string; stack: string[]
  stackfront?: string[]; link?: string; highlight?: boolean; media: MediaItem[]
}
export interface TimelineItem {
  period: string; role: string; org: string; type: 'edu' | 'work'; items?: string[]
}

export const SERVICES: Service[] = [
  { image: assetPath('img/services/suporte.webp'), title: 'Suporte Técnico', desc: 'Atendimento remoto e presencial, manutenção de hardware/software, suporte a ERPs e sistemas de saúde (e-SUS APS, SIH).' },
  { image: assetPath('img/services/infra.webp'), title: 'Infraestrutura de TI', desc: 'Configuração de redes, servidores, estações de trabalho e cabeamento estruturado para ambientes corporativos.' },
  { image: assetPath('img/services/api.webp'), title: 'Desenvolvimento de APIs', desc: 'APIs REST robustas com Java, Spring Boot, PostgreSQL e Docker. Boas práticas de arquitetura em camadas e versionamento.' },
  { image: assetPath('img/services/testes.webp'), title: 'Qualidade de Software', desc: 'Testes manuais, testes automatizados com JUnit e Mockito, documentação de bugs e revisão de critérios de aceitação.' },
  { image: assetPath('img/services/web.webp'), title: 'Desenvolvimento Web', desc: 'Interfaces modernas com React, TypeScript e Tailwind CSS. Do protótipo ao deploy com foco em usabilidade.' },
  { image: assetPath('img/services/gestao.webp'), title: 'Gestão e Documentação', desc: 'Registro de chamados via 1Doc, controle de patrimônio, documentação técnica e gestão ágil com Scrum.' },
]

export const PROJECTS: Project[] = [
  { tag: 'API REST', title: 'Pedreno Store', subtitle: 'Sistema de Gestão de Crediário', highlight: true, desc: 'Sistema de gestão de crediário (fiado) para pequenos comércios. API completa com autenticação JWT, controle de roles, suporte a compras multi-item e testes automatizados.', stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JUnit 5', 'Mockito'], stackfront: ['React', 'TypeScript', 'Tailwind CSS'], link: 'https://github.com/EdsonJuni0r/pedrenostore-api', media: [{ type: 'video', src: assetPath('video/1128.mp4') }] },
  { tag: 'IoT / Mobile', title: 'Sistema de detecção de gases e prevenção de incêndios baseado em IoT e MQTT.', subtitle: 'Projeto SUPER Samsung – UFAM', desc: 'Sistema de monitoramento ambiental com sensores de gás, ESP32 e microcontroladores. Comunicação em tempo real via protocolo MQTT.', stack: ['Flutter', 'Arduino', 'ESP32', 'MQTT'], link: 'https://github.com/EdsonJuni0r/Detector_de_gas_temperature_esp32_mqtt', media: [
    { type: 'image', src: assetPath('img/projetos/image1mqtt.webp'), alt: 'Arquitetura' },
    { type: 'image', src: assetPath('img/projetos/image1circuito.webp'), alt: 'Circuito com sensores e ESP32' },
    { type: 'image', src: assetPath('img/projetos/image1flutter.webp'), alt: 'Código Flutter' },
    { type: 'image', src: assetPath('img/projetos/image1app.webp'), alt: 'App mobile – leituras' },
  ] },
  { tag: 'Infraestrutura', title: 'Serviços de Cabeamento e Configuração de Redes de Computadores', subtitle: 'Serviços para SEMSA', desc: 'Projeto de infraestrutura de TI para a Secretaria Municipal de Saúde de Barreirinha. Configuração de redes, manutenção de hardware e suporte técnico para unidades básicas de saúde.', stack: ['Infraestrutura', 'Redes', 'Suporte Técnico'], media: [
    { type: 'image', src: assetPath('img/projetos/image2infra.webp'), alt: 'Instalação de servidor' },
    { type: 'image', src: assetPath('img/projetos/image3.webp'), alt: 'Serviços na SEMSA' },
    { type: 'image', src: assetPath('img/projetos/image2infra2.webp'), alt: 'Infraestrutura em unidade de saúde' },
    { type: 'image', src: assetPath('img/projetos/image2infra3.webp'), alt: 'Infraestrutura em unidade de saúde' },
  ] },
]

export const SKILLS_GROUPS = [
  { label: 'Back-end', skills: ['Java', 'Spring Boot', 'APIs REST', 'JPA/Hibernate', 'SQL', 'PostgreSQL', 'Docker', 'Python', 'Node.js'] },
  { label: 'Front-end', skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'QA & Testes', skills: ['JUnit 5', 'Mockito', 'Cypress', 'Insomnia', 'Postman', 'Testes Manuais', 'Testes Exploratórios'] },
  { label: 'Ferramentas & Infra', skills: ['Git', 'GitHub', 'Scrum', 'Docker', 'Redes', 'Suporte Técnico', 'e-SUS APS', '1Doc'] },
]

export const TIMELINE: TimelineItem[] = [
  { period: 'jan/2026 – atual', role: 'Pós-Graduação em Engenharia da Qualidade de Software', org: 'Faculdade Bookplay', type: 'edu' },
  { period: 'jul/2024 – atual', role: 'Técnico em Suporte de T.I', org: 'Fundo Municipal de Saúde – Barreirinha/AM', type: 'work', items: ['Suporte técnico remoto e presencial em Unidades Básicas de Saúde', 'Testes exploratórios em sistemas ERPs internos', 'Manutenção de hardware/software para Sistema de Informação em Saúde'] },
  { period: 'nov/2023 – mar/2024', role: 'Estagiário em Desenvolvimento', org: 'Universidade Federal do Amazonas (UFAM)', type: 'work', items: ['Desenvolvimento de sistema web para biblioteca digital acadêmica', 'Stack: JavaScript, Node.js, React, PostgreSQL', 'Implementação de testes unitários básicos'] },
  { period: 'Concluído – abr/2024', role: 'Bacharelado em Engenharia de Software', org: 'ICET – UFAM, Itacoatiara – AM', type: 'edu' },
]
