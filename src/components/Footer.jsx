import { perfil } from '../data/perfil';

export default function Footer() {
  return (
    <footer className="bg-ink py-8 text-center text-xs text-slate-500">
      <p>
        {perfil.nome} · {new Date().getFullYear()} · Feito com React, Vite e Tailwind
      </p>
      <p className="mt-1">
        Os sistemas internos são descritos sem dados reais e sem nomes de clientes ou de pessoas; o código deles não é público.
      </p>
    </footer>
  );
}
