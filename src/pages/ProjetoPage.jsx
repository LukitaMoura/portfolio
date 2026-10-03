import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Github } from 'lucide-react';
import { projetoPorSlug, projetos } from '../data/projetos';
import { repoUrl } from '../data/perfil';
import { execucaoPorUF, tecnologias } from '../data/anatel';
import { Barras, Status, Tag } from '../components/ui';

export default function ProjetoPage() {
  const { slug } = useParams();
  const p = projetoPorSlug(slug);

  useEffect(() => {
    if (p) document.title = `${p.titulo} · Lucas Moura`;
    return () => { document.title = 'Lucas Moura · Dados, Backend Python e React'; };
  }, [p]);

  if (!p) return <Navigate to="/" replace />;

  const idx = projetos.indexOf(p);
  const proximo = projetos[(idx + 1) % projetos.length];
  const url = p.repo ? repoUrl(p.repo) : '';

  return (
    <main>
      <header className="grid-bg bg-ink px-4 pb-14 pt-28 text-white sm:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Link to="/#projetos" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white">
            <ArrowLeft size={16} /> Todos os projetos
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-accent">{p.codinome}</span>
            <Status valor={p.status} />
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{p.titulo}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{p.resumo}</p>
          {p.repo && (
            url ? (
              <a href={url} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-100">
                <Github size={16} /> Ver código no GitHub
              </a>
            ) : (
              <p className="mt-7 font-mono text-xs text-slate-500">Repositório: {p.repo}</p>
            )
          )}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {p.metricas.map((m) => (
              <div key={m.rotulo} className="bg-ink-2 p-5">
                <dd className="font-mono text-2xl font-bold">{m.valor}</dd>
                <dt className="mt-1 text-sm text-slate-400">{m.rotulo}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <article className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-14">
          <Bloco titulo="O problema">
            <p className="text-lg leading-relaxed text-slate-700">{p.problema}</p>
          </Bloco>

          <Bloco titulo="O que construí">
            <ul className="space-y-3">
              {p.entregas.map((e) => (
                <li key={e} className="flex gap-3 text-slate-700">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent-dark" />
                  <span className="leading-relaxed">{e}</span>
                </li>
              ))}
            </ul>
          </Bloco>

          {p.imagens && (
            <Bloco titulo="Resultado (dados fictícios)">
              <div className="grid gap-4 sm:grid-cols-2">
                {p.imagens.map((src) => (
                  <img key={src} src={src} alt="Slide gerado automaticamente" loading="lazy" className="w-full rounded-lg border border-slate-200 shadow-sm" />
                ))}
              </div>
            </Bloco>
          )}

          {p.grafico === 'anatel' && <GraficosAnatel />}

          <Bloco titulo="Decisões técnicas">
            <div className="grid gap-4 md:grid-cols-2">
              {p.decisoes.map((d) => (
                <div key={d.titulo} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-ink">{d.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.texto}</p>
                </div>
              ))}
            </div>
          </Bloco>

          <Bloco titulo="Stack">
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </Bloco>

          {!p.repo && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Sistema interno e proprietário: o código não é público. O padrão de arquitetura que ele segue está aberto no{' '}
              <Link to="/projetos/fastapi-react-rbac-starter" className="font-semibold underline">RBAC Starter</Link>.
            </p>
          )}

          <Link to={`/projetos/${proximo.slug}`} className="group flex items-center justify-between rounded-2xl border border-slate-200 p-6 transition hover:border-slate-300 hover:shadow-md">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Próximo projeto</p>
              <p className="mt-1 font-semibold text-ink">{proximo.titulo}</p>
            </div>
            <ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-ink" />
          </Link>
        </div>
      </article>
    </main>
  );
}

function Bloco({ titulo, children }) {
  return (
    <section>
      <h2 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">{titulo}</h2>
      {children}
    </section>
  );
}

function GraficosAnatel() {
  const porUF = Object.entries(execucaoPorUF)
    .map(([uf, [linhas]]) => [uf, linhas])
    .sort((a, b) => b[1] - a[1]);
  const top = porUF.slice(0, 10);
  const total = porUF.reduce((s, [, v]) => s + v, 0);
  const segundos = Object.values(execucaoPorUF).reduce((s, [, t]) => s + t, 0);

  return (
    <Bloco titulo="Dados da execução real">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-1 font-semibold text-ink">Registros por UF (top 10)</h3>
          <p className="mb-4 text-sm text-slate-500">
            {total.toLocaleString('pt-BR')} registros em {Math.floor(segundos / 3600)}h{String(Math.round((segundos % 3600) / 60)).padStart(2, '0')}. SP sozinho tem 29,7%.
          </p>
          <Barras dados={top} />
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-ink">Licenças por tecnologia</h3>
          <p className="mb-4 text-sm text-slate-500">O 4G lidera, e o 5G já passa de 214 mil licenças.</p>
          <Barras dados={tecnologias} />
        </div>
      </div>
    </Bloco>
  );
}
