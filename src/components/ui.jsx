export function Secao({ id, eyebrow, titulo, descricao, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-dark">{eyebrow}</p>}
        {titulo && <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">{titulo}</h2>}
        {descricao && <p className="mt-4 max-w-2xl text-lg text-slate-600">{descricao}</p>}
        <div className={titulo ? 'mt-12' : ''}>{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children, escuro = false }) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ${
        escuro ? 'bg-white/10 text-slate-200' : 'bg-slate-100 text-slate-700'
      }`}
    >
      {children}
    </span>
  );
}

const STATUS_COR = {
  'Em produção': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Código aberto': 'bg-sky-50 text-sky-700 ring-sky-200',
};

export function Status({ valor }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${STATUS_COR[valor] || 'bg-slate-50 text-slate-600 ring-slate-200'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${valor === 'Em produção' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
      {valor}
    </span>
  );
}

/** Barras horizontais em SVG/HTML puro: acessível, sem biblioteca de gráfico. */
export function Barras({ dados, formatar = (v) => v.toLocaleString('pt-BR'), max }) {
  const topo = max ?? Math.max(...dados.map(([, v]) => v));
  return (
    <ul className="space-y-2" role="list">
      {dados.map(([rotulo, valor]) => (
        <li key={rotulo} className="grid grid-cols-[4.5rem_1fr_5.5rem] items-center gap-3 text-sm sm:grid-cols-[7rem_1fr_6rem]">
          <span className="truncate font-mono text-xs text-slate-600">{rotulo}</span>
          <span className="h-2.5 rounded-full bg-slate-100" aria-hidden>
            <span className="block h-2.5 rounded-full bg-accent-dark" style={{ width: `${(valor / topo) * 100}%` }} />
          </span>
          <span className="text-right font-mono text-xs tabular-nums text-slate-700">{formatar(valor)}</span>
        </li>
      ))}
    </ul>
  );
}
