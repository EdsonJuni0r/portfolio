# Portfólio — Edson Junior | Pedreno Tech & Infra

Site pessoal desenvolvido com React, TypeScript e Vite e publicado no GitHub Pages.

**Produção:** https://edsonjuni0r.github.io/portfolio/

## Como executar

Requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

O Vite informa no terminal a URL local. A aplicação usa `/portfolio/` como base para reproduzir o ambiente do GitHub Pages.

## Comandos

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run lint`: verifica qualidade e padrões do código.
- `npm run build`: valida o TypeScript e gera `dist/`.
- `npm run preview`: serve localmente o build de produção.
- `npm run deploy`: publica `dist/` no GitHub Pages.

## Organização

```text
src/
├── components/     componentes reutilizáveis e seus estilos
├── data/           conteúdo e modelos do portfólio
├── hooks/          comportamento React reutilizável
├── lib/            funções utilitárias sem interface
├── App.tsx         composição das seções da página
├── App.css         estilos das seções
├── index.css       tokens visuais e estilos globais
└── main.tsx        ponto de entrada da aplicação
```

As imagens e vídeos ficam em `public/`. Para referenciá-los no código, use `assetPath()`; assim os links continuam funcionando caso a base de publicação seja alterada.
