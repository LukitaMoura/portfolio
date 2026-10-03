// Estudos de caso. Os sistemas internos são descritos sem nome da empresa,
// de clientes ou de pessoas; os códigos de projeto (OMNI, Hunter…) são internos.
// `repo` preenchido = repositório público no GitHub.

export const AREAS = ['Dados', 'Backend', 'Frontend'];

export const projetos = [
  {
    slug: 'omni-plataforma-financeira',
    codinome: 'OMNI',
    titulo: 'Plataforma de Automação Financeira',
    resumo:
      'Reúne num só sistema as rotinas do time financeiro que viviam em planilhas soltas: conciliação, reajuste de contratos, rateio, faturamento e fechamento mensal.',
    areas: ['Dados', 'Backend', 'Frontend'],
    status: 'Em produção',
    destaque: true,
    metricas: [
      { valor: '171s → 5s', rotulo: 'análise de variação de faturamento' },
      { valor: '372', rotulo: 'contratos em PDF lidos em lote na entrega' },
      { valor: '16 mil', rotulo: 'vínculos contrato × ativo na base' },
    ],
    problema:
      'Cada rotina do financeiro tinha a própria planilha, com PROCV de milhares de linhas, cópia e colagem entre arquivos e conhecimento concentrado em poucas pessoas. Conciliar o extrato contábil com a composição enviada pelas operadoras de telecom levava dias por mês.',
    entregas: [
      'Motor de conciliação entre o extrato do ERP e a composição das operadoras, que devolve ao analista apenas o que ficou em dúvida',
      'Leitura automática de contratos em PDF (com OCR nas páginas escaneadas), transformando o documento em dado estruturado',
      'Calculadora de reajuste por índices econômicos, com carência de primeiro ano, tratamento de imposto e busca automática do índice na fonte',
      'Rateio de aluguel por vigência de contrato: quem sai do ativo deixa de dividir o valor, e a soma das partes fecha com o total ao centavo',
      'Relatórios de fechamento mensal com variação mês a mês, aging de contas a receber e comparação de contas contábeis',
      'Base de dados única com filtros, colunas escolhidas pelo usuário e visões salvas',
    ],
    decisoes: [
      {
        titulo: 'Conciliação em cascata, sem adivinhação',
        texto:
          'Primeiro casa pela chave mais restritiva (referência + tipo + data + valor). O que sobra tenta de novo sem o valor e compara a diferença dentro de uma tolerância. O que ainda sobra vai para revisão humana. O sistema nunca "resolve" um caso ambíguo por conta própria.',
      },
      {
        titulo: 'Extração de PDF com score de confiança',
        texto:
          'Decide entre leitura direta e OCR página a página, porque muitos contratos são híbridos. Usa âncoras textuais com lista de contextos proibidos (multa, caução, IPTU) para achar o valor certo, e cada documento recebe uma nota de 0 a 100 que define a fila de revisão.',
      },
      {
        titulo: 'Processamento longo fora da requisição',
        texto:
          'Conciliações e lotes de PDF rodam como job assíncrono, com barra de progresso em tempo real. Isso evita timeout do proxy, servidor travado e clique duplo do usuário disparando dois processamentos.',
      },
      {
        titulo: 'Centavo que não some',
        texto:
          'Dinheiro em Decimal, nunca em float (1/3 de um aluguel é dízima). As linhas são agregadas por (ativo, contrato) antes do cruzamento, o que evita multiplicar o valor pelo número de condições. Contrato fora da vigência sai do divisor, então a soma das partes fecha com o total ao centavo.',
      },
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'pandas', 'pdfplumber', 'OCR', 'React 19', 'Recharts', 'Tailwind'],
  },
  {
    slug: 'hunter-solicitacao-de-verba',
    codinome: 'Hunter',
    titulo: 'Fluxo de Solicitação de Verba (CapEx/OpEx)',
    resumo:
      'Substituiu um formulário do Microsoft Forms por um fluxo completo de solicitação, análise e aprovação de verba de infraestrutura, com dashboards operacionais.',
    areas: ['Backend', 'Frontend', 'Dados'],
    status: 'Em produção',
    destaque: true,
    metricas: [
      { valor: '20 · 7', rotulo: 'permissões de acesso · status no workflow' },
      { valor: 'Forms → sistema', rotulo: 'com fila, aprovação e histórico' },
      { valor: '~28 mil', rotulo: 'linhas de código' },
    ],
    problema:
      'As solicitações chegavam por formulário e eram controladas em planilha: sem fila, sem rastreio de quem aprovou, com o mesmo pedido aberto duas vezes e o campo "site" digitado de formas diferentes, o que quebrava todos os relatórios.',
    entregas: [
      'Fila de análise com perfis, aprovadores e transições de status controladas',
      'Anexo de evidências e aviso automático de pedido duplicado',
      'Dashboards de prazo, tempo de fila, forecast e planejado × realizado de OpEx',
      'Notificações in-app avisando o responsável a cada movimentação',
      'Portal de fornecedores: o fornecedor envia a proposta no modelo oficial, o sistema lê a planilha e a área pode devolvê-la com comentário',
      'Importação e exportação em Excel e padronização do cadastro de sites',
    ],
    decisoes: [
      {
        titulo: 'Workflow como dado, não como código',
        texto:
          'Estados, transições e quem pode executar cada uma ficam em tabelas. Mudar o processo da área não exige deploy.',
      },
      {
        titulo: 'Notificação resolvida por permissão',
        texto:
          'O aviso vai para "quem pode tratar este caso", e não para uma lista fixa. Quem ganha o perfil passa a receber automaticamente. A notificação é best-effort: se falhar, nunca derruba a ação principal.',
      },
      {
        titulo: 'Dashboard genérico dimensão × métrica',
        texto:
          'Um único endpoint atende qualquer gráfico, escolhendo dimensão, métrica e filtros. Gráfico novo não exige rota nova.',
      },
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'pandas', 'openpyxl', 'React 19', 'Recharts', 'Tailwind'],
  },
  {
    slug: 'horus-facilities-e-rh',
    codinome: 'Hórus',
    titulo: 'Chamados de Facilities e RH com Construtor de Formulários',
    resumo:
      'Qualquer colaborador abre um chamado escaneando um QR Code. A equipe trata pelo painel e cria os próprios formulários, sem depender de desenvolvimento.',
    areas: ['Backend', 'Frontend', 'Dados'],
    status: 'Em produção',
    destaque: true,
    metricas: [
      { valor: '7', rotulo: 'trilhas de RH migradas dos formulários antigos' },
      { valor: 'Excel → PPT', rotulo: 'apresentação mensal gerada sozinha' },
      { valor: '~30 mil', rotulo: 'linhas de código' },
    ],
    problema:
      'Pedidos de manutenção e de RH chegavam por e-mail, WhatsApp e formulários espalhados. Não havia custo por chamado, histórico nem indicador, e a apresentação mensal de RH era montada slide a slide.',
    entregas: [
      'Abertura de chamado por QR Code e fila de tratativa com visão completa de cada caso',
      'Construtor de formulários no-code: perguntas, regras de exibição condicional, colunas da fila e controle de acesso definidos pela própria equipe',
      'As 7 trilhas de movimentação de pessoas foram geradas automaticamente a partir dos formulários antigos, preservando perguntas e ramificações',
      'Custo por chamado e dashboard de indicadores com exportação',
      'Geração automática da apresentação de RH: sobe o Excel e recebe um PowerPoint com gráficos nativos e editáveis',
      'Endurecimento de segurança: anexos privados, abertura de chamado autenticada e quatro correções aplicadas',
    ],
    decisoes: [
      {
        titulo: 'Formulário como dado',
        texto:
          'A estrutura de cada formulário (perguntas, tipos, condições) é guardada como dado e renderizada pelo frontend. A equipe cria fluxos novos sem deploy.',
      },
      {
        titulo: 'Migração automatizada de formulários',
        texto:
          'Um extrator leu os formulários externos já em uso e gerou o mapa de perguntas e caminhos, que virou as trilhas no sistema. Nada foi redigitado à mão.',
      },
      {
        titulo: 'Automação de PPT sem guardar dados',
        texto:
          'O Excel enviado é processado em memória e descartado. Dado de RH não fica salvo só para gerar uma apresentação.',
      },
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'python-pptx', 'openpyxl', 'React 19', 'Tailwind'],
  },
  {
    slug: 'astral-gestao-de-ativos-criticos',
    codinome: 'Astral',
    titulo: 'Gestão de Ativos Críticos',
    resumo:
      'Controle dos ativos (torres) sem contrato vigente que precisam ser retirados ou remanejados para evitar perda de receita. Substituiu o trabalho manual do analista numa planilha grande.',
    areas: ['Dados', 'Backend', 'Frontend'],
    status: 'Em produção',
    metricas: [
      { valor: '317', rotulo: 'ativos monitorados' },
      { valor: 'campo a campo', rotulo: 'edição auditada' },
      { valor: '~17 mil', rotulo: 'linhas de código' },
    ],
    problema:
      'A base vivia numa planilha atualizada por carga mensal. Toda nova carga apagava as correções que o analista tinha feito à mão, e cada área mantinha a própria cópia.',
    entregas: [
      'Importação que atualiza a base sem apagar nada e sem sobrescrever o que foi corrigido à mão',
      'Dashboard de risco com filtros combinados e exportação do recorte para Excel',
      'Tabela no estilo planilha: funil de filtro por coluna, escolha de colunas e visões salvas',
      'Ficha por ativo com edição auditada campo a campo (quem, o quê, quando)',
      'Bandeiras por área (crítico, em atenção, validado), com comentário obrigatório e histórico',
      'Módulo de dashboards livres que monta indicadores sobre qualquer planilha enviada',
    ],
    decisoes: [
      {
        titulo: 'Correção manual protegida da próxima carga',
        texto:
          'Cada campo editado na tela é marcado. A importação seguinte atualiza só o que não foi tocado por uma pessoa.',
      },
      {
        titulo: 'Mapa de colunas como fonte única',
        texto:
          'Um único arquivo declara as colunas da entidade, e modelo ORM, DDL, planilha-modelo, parser de upload, filtros e dashboard são derivados dele. Adicionar um campo é uma linha.',
      },
      {
        titulo: 'Import tudo-ou-nada',
        texto:
          'Nenhuma linha entra enquanto houver erro em qualquer linha. O usuário recebe o relatório de erros linha a linha. Import parcial é pior que import falhado.',
      },
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'pandas', 'React 19', 'Recharts', 'Tailwind'],
  },
  {
    slug: 'insite-portal-de-dados',
    codinome: 'InSite',
    titulo: 'Portal de Dados e Ferramentas',
    resumo:
      'A porta de entrada única para os dados e sistemas da empresa: acesso às ferramentas, relatórios, extrações, documentação, gestão de projetos e monitoramento do servidor.',
    areas: ['Backend', 'Frontend'],
    status: 'Em produção',
    metricas: [
      { valor: '10', rotulo: 'módulos' },
      { valor: '143', rotulo: 'tarefas registradas no módulo de Projetos' },
      { valor: '~14 mil', rotulo: 'linhas de código' },
    ],
    problema:
      'Cada ferramenta tinha um endereço, cada relatório um link perdido em e-mail, e não havia visão do que o time de dados estava entregando nem do tempo que cada automação economizava.',
    entregas: [
      'Painel único que mostra a cada pessoa só as ferramentas que ela tem permissão de ver',
      'Gestão de projetos com tarefas, cronograma, responsáveis, carga por analista e o indicador de tempo economizado por tarefa (antes × depois × frequência)',
      'Módulo de processos com o passo a passo desenhado em fluxo, ramificações e importação por planilha',
      'Monitoramento somente leitura da saúde do servidor e dos serviços, com histórico e alertas por limite',
      'Trilha de auditoria de todas as ações administrativas, presença online e tempo de uso',
      'Documentação de cada ferramenta lida dentro do portal e recuperação de senha por e-mail',
    ],
    decisoes: [
      {
        titulo: 'Monitor de servidor estritamente somente leitura',
        texto:
          'O portal roda no mesmo servidor que monitora, então o módulo só lê métricas (psutil) e status de serviço. Nenhuma ação destrutiva é exposta.',
      },
      {
        titulo: 'Valor medido em horas',
        texto:
          'Cada tarefa registra o tempo antes, o tempo depois e a frequência. A economia anual de cada automação aparece em número, não em impressão.',
      },
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'psutil', 'React 19', 'Framer Motion', 'Tailwind'],
  },
  {
    slug: 'pipeline-licenciamento-anatel',
    codinome: 'Anatel',
    titulo: 'Pipeline de Licenciamento Anatel',
    resumo:
      'ETL que extrai a base de estações de telecom licenciadas das 27 UFs do portal da Anatel e consolida 7,6 milhões de registros num banco único.',
    areas: ['Dados'],
    status: 'Código aberto',
    destaque: true,
    repo: 'anatel-licenciamento-pipeline',
    grafico: 'anatel',
    metricas: [
      { valor: '7,68 mi', rotulo: 'registros consolidados' },
      { valor: '2h38', rotulo: 'de execução (vs. 12–16h manual)' },
      { valor: '11', rotulo: 'testes automatizados' },
    ],
    problema:
      'Projeto pessoal com dados públicos. O portal não permite baixar a base nacional: exige filtrar estado por estado e esperar até 15 minutos para cada arquivo. O CSV de SP tem 2,28 milhões de linhas, mais que o dobro do limite do Excel, e cada UF traz colunas diferentes.',
    entregas: [
      'Robô Playwright headless que aplica o filtro de UF e captura o download',
      'Limpeza com pandas: colunas que quebram SQL, nulos em texto, tipagem de coordenadas e potências',
      'Upsert idempotente em lotes no SQLite ou MySQL',
      'Análise de KPIs: concentração por UF, operadoras e redes privadas, tecnologia (2G a 5G) e faixas de frequência',
    ],
    decisoes: [
      { titulo: 'Schema evolutivo', texto: 'Se uma UF traz uma coluna nova, o loader roda ALTER TABLE ADD COLUMN em vez de falhar no meio da carga.' },
      { titulo: 'Checkpoint por UF', texto: 'Se a execução cair em SP depois de 3 horas, a próxima pula as 26 UFs já concluídas.' },
      { titulo: 'Lote dimensionado pelo banco', texto: 'Tamanho do lote = limite de parâmetros do banco ÷ número de colunas. Assim o driver nunca estoura.' },
      { titulo: 'Encoding verificado por teste', texto: 'Ao reescrever o projeto encontrei acentos corrompidos (UTF-8 lido como latin1). Corrigi e deixei um teste para impedir a regressão.' },
    ],
    stack: ['Python', 'Playwright', 'pandas', 'SQLAlchemy', 'MySQL', 'SQLite', 'pytest'],
  },
  {
    slug: 'fastapi-react-rbac-starter',
    codinome: 'Blueprint',
    titulo: 'Padrão de Arquitetura + Starter RBAC',
    resumo:
      'O padrão que define como toda ferramenta interna é construída, em versão aberta: auth JWT, RBAC por permissão, workflow, auditoria e sessão segura.',
    areas: ['Backend', 'Frontend'],
    status: 'Código aberto',
    destaque: true,
    repo: 'fastapi-react-rbac-starter',
    metricas: [
      { valor: '5', rotulo: 'sistemas em produção seguem este padrão' },
      { valor: '16', rotulo: 'documentos de arquitetura internos' },
      { valor: '25', rotulo: 'testes de API' },
    ],
    problema:
      'Cada sistema novo reinventava login, permissões, layout e deploy, e repetia os mesmos erros. Corrigir uma falha num sistema não protegia os outros.',
    entregas: [
      'Blueprint interno com 16 documentos: arquitetura, auth/RBAC, UI, sessão, segurança, deploy e uma lista de armadilhas já resolvidas',
      'Playbooks para sistema novo e para migração de legado em outra linguagem',
      'Starter público: FastAPI + React com fila de chamados de exemplo, 4 perfis de demonstração e CI',
    ],
    decisoes: [
      { titulo: 'Permissão por chave, nunca por nome de perfil', texto: 'require_permission("chamados.tratar") no backend e a mesma chave no gate da UI. Perfis são só agrupamentos.' },
      { titulo: 'Sessão em três camadas', texto: 'sessionStorage (fechar a aba encerra), logout por inatividade em 30 min e expiração do JWT no servidor.' },
      { titulo: 'Lições que viraram regra', texto: 'Timeout no pool do MySQL remoto, rotas literais antes de /{id}, nenhum segredo fixo no código.' },
    ],
    stack: ['FastAPI', 'SQLAlchemy 2', 'Pydantic v2', 'PyJWT', 'bcrypt', 'React 19', 'React Router 7', 'Tailwind 4', 'GitHub Actions'],
  },
  {
    slug: 'excel-to-pptx-engine',
    codinome: 'Deck',
    titulo: 'Gerador de Apresentações Excel → PowerPoint',
    resumo:
      'Dados brutos de uma planilha viram uma apresentação pronta, com KPIs calculados e gráficos nativos editáveis. Layout declarativo e marca configurável.',
    areas: ['Dados'],
    status: 'Código aberto',
    repo: 'excel-to-pptx-engine',
    imagens: ['/img/slide1.png', '/img/slide3.png', '/img/slide5.png', '/img/slide7.png'],
    metricas: [
      { valor: '15', rotulo: 'slides de indicadores calculados' },
      { valor: '100%', rotulo: 'gráficos nativos (editáveis)' },
    ],
    problema:
      'Projeto pessoal inspirado num problema comum: a apresentação mensal de indicadores de RH montada à mão, com turnover, headcount e custos calculados em planilhas paralelas e gráficos copiados e colados. Recriei a solução com dados fictícios e identidade visual configurável.',
    entregas: [
      'Motor de cálculo: headcount, pirâmide, tempo de casa, turnover, span de controle, custos',
      'Layout spec-driven: cada slide é uma lista de blocos {título, tipo, posição}',
      'Planilha-modelo gerada por código, com validação e dados fictícios',
    ],
    decisoes: [
      { titulo: 'Cálculo separado do desenho', texto: 'dados.py só devolve números e o renderizador só desenha. Trocar um gráfico é uma linha no spec.' },
      { titulo: 'Gráficos nativos, não imagens', texto: 'Quem recebe a apresentação pode editar dados, cores e rótulos no próprio PowerPoint.' },
    ],
    stack: ['Python', 'python-pptx', 'openpyxl', 'pytest'],
  },
  {
    slug: 'pacifista-auditor-de-seguranca',
    codinome: 'Pacifista',
    titulo: 'Auditor de Segurança para Código Python',
    resumo:
      'Análise estática via AST que aponta SQL injection, segredos expostos, injeção de comando e outras falhas, com nota de saúde do código. Uso para revisar os sistemas antes de cada deploy.',
    areas: ['Backend'],
    status: 'Código aberto',
    repo: 'pacifista',
    metricas: [
      { valor: '9', rotulo: 'regras de segurança e qualidade' },
      { valor: '0–100', rotulo: 'nota de saúde do código' },
    ],
    problema:
      'Com vários sistemas indo para produção em ritmo rápido, eu precisava de uma checagem automática de segurança antes de cada publicação.',
    entregas: [
      'Regras via AST: SQL injection (resolvendo variáveis locais), eval/exec, shell=True, pickle/yaml, random em tokens, hash fraco, except: pass, complexidade',
      'Detecção de segredos por regex que funciona até em arquivo com erro de sintaxe',
      'CLI sem dependências e painel web em FastAPI; relatório em Markdown com correção e roteiro de teste',
    ],
    decisoes: [
      { titulo: 'AST em vez de regex', texto: 'Evita falso positivo em comentários e strings, e permite olhar o contexto (nome da função, variáveis locais).' },
      { titulo: 'Testado contra si mesmo', texto: 'O CI roda o Pacifista sobre o próprio código a cada push.' },
    ],
    stack: ['Python', 'ast', 'FastAPI', 'Jinja2', 'unittest'],
  },
  {
    slug: 'automacao-formularios-excel',
    codinome: 'VBA',
    titulo: 'Automação de Formulários Oficiais no Excel',
    resumo:
      'Uma linha da base vira um formulário oficial preenchido, em Excel ou PDF, sem digitação, rodando dentro do Excel do próprio analista.',
    areas: ['Dados'],
    status: 'Em produção',
    metricas: [
      { valor: '2', rotulo: 'fluxos (baixa de ativos e análise de investimento)' },
      { valor: '~2,7 mil', rotulo: 'linhas de VBA' },
    ],
    problema:
      'Cada baixa de ativo exigia preencher à mão um formulário oficial, copiando dados da base. Era trabalho lento e propenso a erro de cópia.',
    entregas: [
      'Geração em lote: vários sites selecionados viram vários formulários de uma vez',
      'Mapeamento de campos numa aba da planilha, não no código: mudar o formulário não exige programador',
      'Campos condicionais conforme o motivo, limpando o lado que não se aplica para o dado de um site não vazar no formulário do seguinte',
      'Conversão de moeda com cotação buscada automaticamente',
    ],
    decisoes: [
      { titulo: 'Configuração fora do código', texto: 'A aba de mapeamento é a fonte da verdade. O código só a interpreta.' },
    ],
    stack: ['VBA', 'Excel', 'PDF'],
  },
];

export const projetoPorSlug = (slug) => projetos.find((p) => p.slug === slug);
