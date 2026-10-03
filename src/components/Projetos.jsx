import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import { AREAS, projetos } from '../data/projetos';
import { Secao, Status, Tag } from './ui';

export default function Projetos() {
  const [filtro, setFiltro] = useState('Todos');
  const lista = filtro === 'Todos' ? projetos : projetos.filter((p) => p.areas.includes(filtro));

  return (
    <Secao
      id="projetos"
      eyebrow="Projetos"
      titulo="Problemas reais, sistemas em uso"
      descricao="Cada card abre um estudo de caso com o problema, o que construí, as decisões técnicas e o resultado. Os projetos marcados como código aberto têm repositório público."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por área">
        {['Todos', ...AREAS].map((a) => (
          <button
            key={a}
            role="tab"
            aria-selected={filtro === a}
            onClick={() => setFiltro(a)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filtro === a ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </Secao>
  );
}

function Card({ p }) {
  return (
    <Link
      to={`/projetos/${p.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-dark">{p.codinome}</span>
        <div className="flex items-center gap-2">
          {p.repo && <Github size={15} className="text-slate-400" aria-label="Repositório público" />}
          <Status valor={p.status} />
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{p.titulo}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.resumo}</p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="font-mono text-xl font-bold text-ink">{p.metricas[0].valor}</p>
        <p className="text-xs text-slate-500">{p.metricas[0].rotulo}</p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => <Tag key={s}>{s}</Tag>)}
          {p.stack.length > 4 && <Tag>+{p.stack.length - 4}</Tag>}
        </div>
        <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition group-hover:text-ink" />
      </div>
    </Link>
  );
}
