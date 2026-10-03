import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { perfil } from '../data/perfil';

const NUMEROS = [
  ['5', 'sistemas web em produção'],
  ['171s → 5s', 'na análise de variação de faturamento'],
  ['7,6 mi', 'registros num único pipeline'],
  ['143', 'tarefas entregues e rastreadas'],
];

export default function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden bg-ink px-4 pb-20 pt-32 text-white sm:px-6 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-sm text-accent">
          <span className="text-slate-500">$</span> whoami
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{perfil.nome}</h1>
        <p className="mt-3 text-xl font-medium text-slate-300 md:text-2xl">{perfil.cargo}</p>
        <p className="mt-2 font-mono text-sm text-slate-400">{perfil.stackResumo}</p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">{perfil.pitch}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/#projetos" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:bg-emerald-300">
            Ver projetos <ArrowRight size={16} />
          </Link>
          {perfil.curriculoPdf && (
            <a href={perfil.curriculoPdf} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              <Download size={16} /> Currículo
            </a>
          )}
          <div className="flex items-center gap-1 pl-1">
            {perfil.github && <IconLink href={perfil.github} label="GitHub"><Github size={20} /></IconLink>}
            {perfil.linkedin && <IconLink href={perfil.linkedin} label="LinkedIn"><Linkedin size={20} /></IconLink>}
            {perfil.email && <IconLink href={`mailto:${perfil.email}`} label="E-mail"><Mail size={20} /></IconLink>}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {NUMEROS.map(([valor, rotulo]) => (
            <div key={rotulo} className="bg-ink-2 p-5 md:p-6">
              <dt className="sr-only">{rotulo}</dt>
              <dd className="font-mono text-2xl font-bold text-white md:text-3xl">{valor}</dd>
              <p className="mt-1 text-xs text-slate-400 md:text-sm">{rotulo}</p>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-slate-500">Abril a setembro de 2026, em ferramentas internas usadas todos os dias pelas áreas de negócio.</p>
      </div>
    </section>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="rounded-lg p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white">
      {children}
    </a>
  );
}
