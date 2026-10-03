import { Activity, FileCheck2, KeyRound, ScrollText, ServerCog, ShieldCheck } from 'lucide-react';
import { Secao } from './ui';

const CAMADAS = [
  ['Navegador', 'SPA React 19 · Vite · Tailwind', 'sessão em sessionStorage · logout por inatividade'],
  ['Apache', 'HTTPS · arquivos estáticos · proxy /api', 'rewrite de SPA · cache controlado'],
  ['FastAPI', 'uvicorn em 127.0.0.1 (nunca exposto)', 'require_permission("chave") em cada rota'],
  ['SQLAlchemy 2', 'MySQL remoto · pool com timeouts', 'migrations aditivas · nunca DROP'],
];

const PRATICAS = [
  [KeyRound, 'RBAC por permissão', 'Usuário ⇄ Perfil ⇄ Permissão. O código checa chaves, nunca nomes de perfil, e a interface usa a mesma chave do endpoint.'],
  [ScrollText, 'Auditoria', 'Quem fez o quê, em qual registro e quando. Edições sensíveis são registradas campo a campo.'],
  [FileCheck2, 'Import tudo-ou-nada', 'Planilhas são validadas inteiras em memória. Com qualquer erro, nada entra e o usuário recebe o relatório linha a linha.'],
  [Activity, 'Jobs com progresso', 'Processamentos longos rodam fora da requisição, com barra de progresso, sem timeout nem clique duplo.'],
  [ShieldCheck, 'Segurança antes do deploy', 'Anexos servidos por endpoint autenticado, nenhum segredo no código e varredura estática antes de publicar.'],
  [ServerCog, 'Deploy reproduzível', 'Linux, systemd e Apache, com checklist de deploy, plano de retorno e uma lista de armadilhas já resolvidas.'],
];

export default function Arquitetura() {
  return (
    <Secao
      id="arquitetura"
      eyebrow="Como eu construo"
      titulo="Um padrão, cinco sistemas"
      descricao="Escrevi um blueprint de arquitetura que define como toda ferramenta interna é construída. Sistema novo já nasce com login, permissões, layout, auditoria e deploy resolvidos, e erro corrigido num sistema não se repete no próximo."
      className="bg-slate-50"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <ol className="space-y-3" aria-label="Camadas da arquitetura">
          {CAMADAS.map(([nome, linha1, linha2], i) => (
            <li key={nome} className="relative">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-mono text-sm font-bold text-ink">{nome}</p>
                <p className="mt-1 text-sm text-slate-600">{linha1}</p>
                <p className="font-mono text-xs text-slate-500">{linha2}</p>
              </div>
              {i < CAMADAS.length - 1 && <div className="mx-auto h-3 w-px bg-slate-300" aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRATICAS.map(([Icone, titulo, texto]) => (
            <div key={titulo} className="rounded-xl border border-slate-200 bg-white p-5">
              <Icone size={20} className="text-accent-dark" />
              <h3 className="mt-3 font-semibold text-ink">{titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </Secao>
  );
}
