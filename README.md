# Portfólio · Lucas Moura

Site de portfólio com estudos de caso de sistemas em produção e projetos de código aberto.

**Stack:** React 19 · Vite · Tailwind CSS 4 · React Router 7 · deploy na Vercel

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

O conteúdo fica em `src/data/` (`perfil.js` e `projetos.js`), separado dos componentes. Para adicionar um projeto, basta incluir um objeto em `projetos.js`, e a página de estudo de caso é gerada automaticamente em `/projetos/<slug>`.
