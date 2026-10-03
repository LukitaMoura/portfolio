import { BarChart3, Bot, Database, Layout, Server } from 'lucide-react';
import { Secao, Tag } from './ui';

const GRUPOS = [
  [Database, 'Dados', ['Python', 'pandas', 'SQL', 'MySQL', 'SQLite', 'ETL', 'Web scraping (Playwright)', 'Conciliação', 'Extração de PDF / OCR', 'Excel avançado / VBA']],
  [Server, 'Backend', ['FastAPI', 'SQLAlchemy 2', 'Pydantic v2', 'APIs REST', 'JWT', 'RBAC', 'Jobs assíncronos', 'pytest']],
  [Layout, 'Frontend', ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Formulários dinâmicos', 'Tabelas estilo planilha']],
  [BarChart3, 'Entrega de valor', ['Dashboards', 'KPIs', 'Automação de relatórios (PPTX/XLSX)', 'Mapeamento de processos', 'Documentação']],
  [Bot, 'Infra & IA', ['Linux', 'Apache', 'systemd', 'Git', 'GitHub Actions', 'Desenvolvimento assistido por IA (Claude)']],
];

export default function Habilidades() {
  return (
    <Secao id="habilidades" eyebrow="Habilidades" titulo="Do dado bruto à tela em produção">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {GRUPOS.map(([Icone, titulo, itens]) => (
          <div key={titulo} className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2.5">
              <Icone size={20} className="text-accent-dark" />
              <h3 className="font-semibold text-ink">{titulo}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {itens.map((i) => <Tag key={i}>{i}</Tag>)}
            </div>
          </div>
        ))}
        <div className="rounded-2xl bg-ink p-6 text-white">
          <h3 className="font-semibold">IA como ferramenta de engenharia</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Montei fluxos em que a IA lê o código de um sistema e escreve, ou atualiza, a documentação dele, e outro que mapeia
            os processos de uma ferramenta e gera a planilha pronta para importação. A revisão final continua humana, de propósito.
          </p>
        </div>
      </div>
    </Secao>
  );
}
