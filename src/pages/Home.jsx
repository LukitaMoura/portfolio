import Hero from '../components/Hero';
import Projetos from '../components/Projetos';
import Arquitetura from '../components/Arquitetura';
import Habilidades from '../components/Habilidades';
import Sobre from '../components/Sobre';
import Contato from '../components/Contato';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projetos />
      <Arquitetura />
      <Habilidades />
      <Sobre />
      <Contato />
    </main>
  );
}
