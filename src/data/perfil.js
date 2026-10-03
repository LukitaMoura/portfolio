// ─────────────────────────────────────────────────────────────────────────
// EDITE AQUI: seus dados pessoais e links. Campos vazios ('') somem do site.
// ─────────────────────────────────────────────────────────────────────────
export const perfil = {
  nome: 'Lucas Moura',
  cargo: 'Analista de Dados · Desenvolvedor Full Stack',
  stackResumo: 'Python · FastAPI · React · SQL',
  localizacao: 'Brasil',

  pitch:
    'Transformo planilhas, formulários e processos manuais em sistemas web rastreáveis. ' +
    'Venho da análise de dados e, desde abril de 2026, projeto, desenvolvo e coloco em produção ' +
    'as ferramentas internas da empresa onde trabalho, do banco de dados à interface.',

  email: 'lucasmoura.dev98@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucasmoura98',
  github: 'https://github.com/LukitaMoura',
  curriculoPdf: '/curriculo-lucas-moura.pdf',  // arquivo em public/ (versão sem telefone)

  disponibilidade: 'Aberto a oportunidades em Dados, Backend Python e Full Stack.',
};

// Usuário do GitHub, usado para montar os links dos repositórios públicos
export const githubUser = perfil.github ? perfil.github.replace(/\/+$/, '').split('/').pop() : '';
export const repoUrl = (repo) => (githubUser ? `https://github.com/${githubUser}/${repo}` : '');
