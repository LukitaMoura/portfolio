import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { perfil } from '../data/perfil';

const LINKS = [
  ['Projetos', '/#projetos'],
  ['Como construo', '/#arquitetura'],
  ['Habilidades', '/#habilidades'],
  ['Sobre', '/#sobre'],
  ['Contato', '/#contato'],
];

export default function Nav() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setAberto(false), [pathname]);

  const escuro = !rolou && pathname === '/';
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        escuro ? 'bg-transparent' : 'border-b border-slate-200 bg-white/90 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className={`font-mono text-sm font-bold ${escuro ? 'text-white' : 'text-ink'}`}>
          <span className="text-accent">~/</span>
          {perfil.nome.toLowerCase().replace(/\s+/g, '-')}
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <Link to={href} className={`text-sm font-medium transition ${escuro ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-ink'}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`md:hidden ${escuro ? 'text-white' : 'text-ink'}`}
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {aberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {aberto && (
        <ul className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <Link to={href} className="block py-2 text-sm font-medium text-slate-700">{label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
