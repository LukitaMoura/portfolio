import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { perfil } from '../data/perfil';

export default function Contato() {
  const links = [
    perfil.email && { href: `mailto:${perfil.email}`, label: perfil.email, icon: Mail },
    perfil.linkedin && { href: perfil.linkedin, label: 'LinkedIn', icon: Linkedin },
    perfil.github && { href: perfil.github, label: 'GitHub', icon: Github },
    perfil.curriculoPdf && { href: perfil.curriculoPdf, label: 'Baixar currículo', icon: Download },
  ].filter(Boolean);

  return (
    <section id="contato" className="grid-bg scroll-mt-20 bg-ink px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contato</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Vamos conversar?</h2>
        <p className="mt-4 text-lg text-slate-300">{perfil.disponibilidade}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(({ href, label, icon: Icone }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              <Icone size={18} /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
