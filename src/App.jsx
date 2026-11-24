import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AcademicTrajectory, { academicProfiles } from './AcademicTrajectory.jsx';
import Archive, { FeaturedTalk } from './Archive.jsx';
import ContactNotes from './ContactNotes.jsx';
import PortfolioOpening from './PortfolioOpening.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import Publications, { PublicationPreview } from './Publications.jsx';
import { email, profile, ted, visuals, work } from './content.js';
import { sitePath } from './sitePath.js';

const sections = [
  ['trajetoria', 'Minha trajetória'],
  ['acervo', 'Meu acervo'],
  ['publicacoes', 'Minhas publicações'],
  ['contato', 'Fale comigo'],
];

const milestones = [
  { year: '2014', title: 'Copa do Mundo', description: 'Cobri em Libras a preparação e as coletivas da seleção brasileira pela TV INES.', href: 'https://copadomundo.uol.com.br/noticias/redacao/2014/05/08/afilhada-de-bebeto-reporter-surda-rouba-cena-e-cai-nas-gracas-de-felipao.htm', source: 'Reportagem do UOL' },
  { year: '2016', title: 'Primeira Mão', description: 'Apresentei o telejornal bilíngue da TV INES ao lado de Áulio Nóbrega.', href: 'https://www.meioemensagem.com.br/ultimas-noticias/primeira-mao-telejornal-para-surdos-e-ouvintes-entra-no-ar', source: 'Lançamento do telejornal' },
  { year: '2018', title: 'TEDxUFRJ', description: 'Apresentei a palestra “Minha maior virtude é ser Surda”.', href: ted.href, source: 'Assista à minha palestra' },
];

function Arrow({ direction = 'external' }) {
  return <span className="arrow" aria-hidden="true">{{ down: '↓', up: '↑', right: '→', external: '↗' }[direction]}</span>;
}

function Header({ page }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);

  return (
    <header className="header"
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          toggle.current.focus();
        }
      }}>
      <div className="shell header-inner">
        <a className="signature" href={sitePath()} aria-label="Clarissa Guerretta — início">Clarissa Guerretta</a>
        <button ref={toggle} className="menu-toggle" type="button" aria-controls="navigation" aria-expanded={open} onClick={() => setOpen((expanded) => !expanded)}>
          {open ? 'Fechar' : 'Menu'} <span aria-hidden="true">{open ? '×' : '+'}</span>
        </button>
        <nav className="nav" id="navigation" aria-label="Navegação principal" data-open={open}>
          {sections.map(([id, label]) => <a key={id} href={sitePath(`${id}/`)} aria-current={page === id ? 'page' : undefined}>{label}</a>)}
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <>
      <PortfolioOpening />

      <section className="home-trajectory" id="trajetoria" aria-labelledby="home-trajectory-title">
        <div className="shell section home-spread" data-reveal>
          <div>
            <p className="eyebrow">Minha trajetória</p>
            <h2 id="home-trajectory-title">Da sala de aula<br />às telas.</h2>
            <p>Me formei em Letras-Libras na UFSC e pesquiso Literatura Comparada na UFRJ. Trabalho em Libras na universidade e na televisão.</p>
            <div className="trajectory-actions">
              <a className="text-link" href={sitePath('trajetoria/#formacao')}>Minha formação acadêmica <Arrow direction="right" /></a>
              <a className="text-link" href={sitePath('trajetoria/#projetos')}>Meus projetos <Arrow direction="right" /></a>
              <a className="text-link" href={sitePath('trajetoria/#midia')}>Minha carreira na TV <Arrow direction="right" /></a>
            </div>
          </div>
          <figure className="home-spread-image">
            <img src={visuals.bio.src} alt={visuals.bio.alt} width={visuals.bio.width} height={visuals.bio.height} loading="lazy" />
            <figcaption>{visuals.bio.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="archive home-archive" id="acervo" aria-labelledby="home-archive-title">
        <div className="shell section" data-reveal>
          <div className="section-heading paired-heading">
            <div><p className="eyebrow">Meu acervo</p><h2 id="home-archive-title">Libras<br />em cena.</h2></div>
            <a className="text-link" href={sitePath('acervo/')}>Explore meu acervo <Arrow direction="right" /></a>
          </div>
          <FeaturedTalk />
        </div>
      </section>

      <div id="publicacoes"><PublicationPreview /></div>
    </>
  );
}

function Biography() {
  return (
    <>
      <section className="trajectory-intro" aria-labelledby="trajectory-title">
        <div className="shell section trajectory-grid">
          <div className="page-enter">
            <p className="eyebrow">Minha trajetória</p>
            <h1 className="page-title" id="trajectory-title">Da sala de aula<br />às telas.</h1>
            <p>Sou Clarissa Luna Borges Fonseca Guerretta, professora do Departamento de Letras-Libras da UFRJ e mestre em Literatura Comparada. Pesquiso o protagonismo das mulheres Surdas, os feminismos e as questões de raça e identidade na comunidade Surda.</p>
            <p>Na TV INES, trabalhei com apresentação e jornalismo em Libras nos programas <em>Primeira Mão</em> e <em>Panorama Visual</em>.</p>
            <a className="text-link" href={profile}>Meu perfil no SOPA-Lab <Arrow /></a>
          </div>
          <figure className="trajectory-image page-enter">
            <img src={visuals.bio.src} alt={visuals.bio.alt} width={visuals.bio.width} height={visuals.bio.height} fetchPriority="high" />
            <figcaption>{visuals.bio.caption}</figcaption>
          </figure>
        </div>
      </section>
      <nav className="trajectory-index" aria-label="Nesta página">
        <div className="shell">
          <a href="#formacao">Minha formação <Arrow direction="down" /></a>
          <a href="#projetos">Meus projetos <Arrow direction="down" /></a>
          <a href="#atuacao">Minhas áreas de atuação <Arrow direction="down" /></a>
          <a href="#midia">Minha carreira na TV e no palco <Arrow direction="down" /></a>
        </div>
      </nav>
      <AcademicTrajectory />
      <section className="shell section" id="atuacao" aria-labelledby="work-title" data-reveal>
        <div className="section-heading"><h2 id="work-title">Minhas áreas de atuação</h2></div>
        <dl className="work-list">
          {work.map(({ title, description }) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
        </dl>
      </section>
      <section className="timeline" id="midia" aria-labelledby="timeline-title">
        <div className="shell section" data-reveal>
          <div className="section-heading"><h2 id="timeline-title">Na TV e no palco.</h2></div>
          <ol className="milestones">
            {milestones.map(({ year, title, description, href, source }) => <li key={title}>
              <p className="milestone-year">{year}</p><h3>{title}</h3><p>{description}</p>
              <a className="text-link" href={href}>{source} <Arrow /></a>
            </li>)}
          </ol>
          <a className="text-link" href={sitePath('acervo/')}>Explore meu acervo <Arrow direction="right" /></a>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [status, setStatus] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('E-mail copiado.');
    } catch {
      setStatus('Selecione o endereço acima para copiá-lo.');
    }
  }

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="shell section contact-spread">
        <div className="page-enter">
          <p className="eyebrow">Fale comigo</p>
          <h1 className="page-title" id="contact-title">Vamos<br />conversar?</h1>
          <p>Me escreva para convites, entrevistas e conversas sobre ensino, pesquisa ou cultura Surda.</p>
          <div className="contact-links">
            <a className="contact-email" href={`mailto:${email}`}>{email} <Arrow /></a>
            <button className="text-link" type="button" onClick={copyEmail}>Copiar e-mail</button>
            <p className="copy-status" role="status">{status}</p>
          </div>
          <ContactNotes />
        </div>
        <div className="contact-dossier page-enter">
          <figure className="contact-figure">
            <img src={visuals.hero.src} alt={visuals.hero.alt} width={visuals.hero.width} height={visuals.hero.height} fetchPriority="high" />
            <figcaption>{visuals.hero.caption}</figcaption>
          </figure>
          <div className="contact-profiles">
            <h2>Meus perfis acadêmicos e profissionais</h2>
            <ul>
              {academicProfiles.map(({ label, href }) => <li key={href}><a className="text-link" href={href}>{label} <Arrow /></a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ page }) {
  return (
    <footer className="site-footer" id={page === 'inicio' ? 'contato' : undefined}>
      <div className="shell">
        <div className="footer-main">
          <p className="footer-name">Clarissa Guerretta</p>
          <div className="footer-contact">
            <p className="eyebrow">Fale comigo</p>
            <a className="text-link" href={`mailto:${email}`}>{email} <Arrow /></a>
            {page !== 'contato' && <a className="text-link footer-more" href={sitePath('contato/')}>Meus contatos <Arrow direction="right" /></a>}
          </div>
          <nav className="footer-index" aria-label="Páginas do portfólio">
            {sections.filter(([id]) => id !== 'contato').map(([id, label]) => (
              <a key={id} href={sitePath(`${id}/`)} aria-current={page === id ? 'page' : undefined}>
                {label} <Arrow direction="right" />
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Rio de Janeiro, Brasil</span>
          <nav className="footer-policies" aria-label="Privacidade e cookies">
            <a href={sitePath('privacidade/')} aria-current={page === 'privacidade' ? 'page' : undefined}>Privacidade</a>
            <a href={sitePath('privacidade/#cookies')}>Política de cookies</a>
          </nav>
          <a href="#inicio">Voltar ao topo <Arrow direction="up" /></a>
        </div>
      </div>
    </footer>
  );
}

const pages = { inicio: Home, trajetoria: Biography, acervo: Archive, publicacoes: Publications, contato: Contact, privacidade: PrivacyPolicy };

export default function App() {
  const page = document.body.dataset.page ?? 'inicio';
  const Page = pages[page] ?? Home;

  useLayoutEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1));
    section?.scrollIntoView({ behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header page={page} />
      <main id="conteudo" tabIndex={-1}><Page /></main>
      <Footer page={page} />
    </div>
  );
}
