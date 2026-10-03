import { GraduationCap } from 'lucide-react';
import { Secao } from './ui';

// Trajetória resumida (mais recente primeiro). Fonte: currículo.
const TRAJETORIA = [
  ['abr/2026 – atual', 'Analista de RPA', 'IoT Tecnologia', 'Projeto, desenvolvo e mantenho os 5 sistemas web internos deste portfólio, sozinho, do banco ao deploy.'],
  ['mai/2025 – abr/2026', 'Supervisor de Equipe Técnica', 'Minuta Comunicação', 'Supervisão das equipes técnicas de infraestrutura de eventos e produções.'],
  ['ago/2024 – mai/2025', 'Analista de Planejamento', 'Pronex do Brasil', 'Relatórios de vendas automatizados com Power BI, Python e SQL; funil comercial, previsão de receita e apoio à implantação do Oracle NetSuite.'],
  ['mai/2023 – ago/2024', 'Supervisor de Operações', 'Pessoalize', 'KPIs e dashboards no Zendesk, dimensionamento de equipe e análise de qualidade.'],
  ['out/2021 – abr/2023', 'Técnico Audiovisual', 'CCBB', 'Produção técnica audiovisual de eventos: registro em foto e vídeo, edição e operação de áudio.'],
];

export default function Sobre() {
  return (
    <Secao
      id="sobre"
      eyebrow="Sobre"
      titulo="Da operação ao código"
      descricao="Passei por produção audiovisual, operações e planejamento antes de programar. Por isso começo pelo problema do usuário, e não pela tecnologia: os sistemas que construo substituem planilhas e processos que eu mesmo já precisei operar."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ol className="relative space-y-8 border-l-2 border-slate-200 pl-6">
          {TRAJETORIA.map(([periodo, cargo, empresa, texto]) => (
            <li key={periodo} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent-dark ring-2 ring-slate-200" />
              <p className="font-mono text-xs text-slate-500">{periodo}</p>
              <h3 className="mt-1 font-semibold text-ink">
                {cargo} <span className="font-normal text-slate-500">· {empresa}</span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{texto}</p>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={20} className="text-accent-dark" />
              <h3 className="font-semibold text-ink">Formação</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <p className="font-medium text-slate-800">Análise e Desenvolvimento de Sistemas</p>
                <p className="text-slate-500">Centro Universitário FAM · em andamento</p>
              </li>
              <li>
                <p className="font-medium text-slate-800">Tecnologia em Produção Audiovisual</p>
                <p className="text-slate-500">Centro Universitário FAM · 2016–2018</p>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-ink">Certificações</h3>
            <p className="mt-2 text-sm text-slate-600">Data Science, Power BI e SQL (Alura)</p>
            <h3 className="mt-5 font-semibold text-ink">Idiomas</h3>
            <p className="mt-2 text-sm text-slate-600">Português nativo · Inglês intermediário</p>
          </div>
        </div>
      </div>
    </Secao>
  );
}
