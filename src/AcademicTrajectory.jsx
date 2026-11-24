import React from 'react';
import { sitePath } from './sitePath.js';
import './academic.css';

const sources = {
  sopa: 'https://sopa-lab.wixsite.com/sopa/perfil/clarissa',
  sopaHistory: 'https://sopa-lab.wixsite.com/sopa/sobre',
  farmaLibras: 'https://www.farmalibras.com.br/saibaMais',
  department: 'https://www.portal.letras.ufrj.br/institucional/departamentos/letras-libras.html',
  thesis: 'https://posciencialit.letras.ufrj.br/dissertacoes-2021-2024/',
  coordination: 'https://siarq.ufrj.br/wp-content/uploads/2024/07/Compilado-semanal-27-2024.pdf',
  gallaudet: 'https://siarq.ufrj.br/wp-content/uploads/2025/08/Compilado-semanal-33-2025.pdf',
};

export const academicProfiles = [
  { label: 'Meu currículo Lattes', href: 'https://lattes.cnpq.br/6751084869398569' },
  { label: 'Academia.edu', href: 'https://ufrj.academia.edu/ClarissaGuerretta' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/clarissa-guerretta-904303117' },
  { label: 'SOPA-Lab', href: sources.sopa },
];

const education = [
  { period: '2011', title: 'Graduação em Letras-Libras', institution: 'Universidade Federal de Santa Catarina' },
  { period: '2013', title: 'Especialização em Ensino, Tradução e Interpretação da Libras', institution: 'Universidade Federal do Rio de Janeiro' },
  { period: '2023', title: 'Mestrado em Literatura Comparada', institution: 'Programa de Pós-Graduação em Ciência da Literatura · UFRJ' },
  { period: 'Em andamento', title: 'Doutorado em Ciência da Literatura', institution: 'Área de Literatura Comparada · UFRJ' },
];

const appointments = [
  {
    period: 'UFRJ',
    title: 'Departamento de Letras-Libras',
    description: 'Sou docente do departamento e supervisiono o Setor de Estudos da Tradução.',
    source: { label: 'Faculdade de Letras', href: sources.department },
  },
  {
    period: '2019–2024',
    title: 'Coordenação de Letras-Libras',
    description: 'Coordenei a licenciatura e o bacharelado presenciais de Letras-Libras na UFRJ.',
    source: { label: 'Perfil no SOPA-Lab', href: sources.sopa },
  },
  {
    period: '2022–2024',
    title: 'Conselho de Ensino de Graduação',
    description: 'Fui a primeira pessoa Surda a representar a Faculdade de Letras da UFRJ no CEG.',
    source: { label: 'Perfil no SOPA-Lab', href: sources.sopa },
  },
  {
    period: '2024',
    title: 'Formação docente bilíngue',
    description: 'Fui designada para coordenar o curso de formação de professores mediadores na educação de pessoas surdas e surdocegas.',
    source: { label: 'Portaria da UFRJ (PDF)', href: sources.coordination },
  },
];

function ExternalLink({ href, children }) {
  return <a className="text-link" href={href}>{children}<span className="arrow" aria-hidden="true">↗</span></a>;
}

export default function AcademicTrajectory() {
  return (
    <section className="academic" id="formacao" aria-labelledby="academic-title">
      <div className="shell section" data-reveal>
        <div className="academic-heading">
          <h2 id="academic-title">Minha trajetória<br />acadêmica.</h2>
          <p>Minha formação é em Letras-Libras e Literatura Comparada. Sou professora na UFRJ e pesquiso o protagonismo de mulheres Surdas.</p>
        </div>

        <div className="academic-grid">
          <div className="academic-training">
            <h3>Minha formação</h3>
            <ol className="academic-education">
              {education.map(({ period, title, institution }) => (
                <li key={title}>
                  <span className="academic-period">{period}</span>
                  <div><h4>{title}</h4><p>{institution}</p></div>
                </li>
              ))}
            </ol>
            <ExternalLink href={sources.sopa}>Meu perfil no SOPA-Lab</ExternalLink>
          </div>

          <article className="academic-research" aria-labelledby="academic-research-title">
            <p className="eyebrow">Minha dissertação · 2023</p>
            <h3 id="academic-research-title">A (in)visibilidade das mulheres surdas <span>Protagonismo na sociedade contemporânea</span></h3>
            <p>Na minha dissertação, investiguei como raça e surdez atravessam as experiências e a atuação política de mulheres surdas sinalizantes. Tive a orientação de Beatriz Vieira de Resende na UFRJ.</p>
            <div className="academic-research-links">
              <ExternalLink href={sitePath('publicacoes/invisibilidade-mulheres-surdas.pdf')}>Ler minha dissertação em PDF</ExternalLink>
              <ExternalLink href={sources.thesis}>Registro na UFRJ</ExternalLink>
            </div>
            <div className="academic-international">
              <h4>Minha pesquisa internacional</h4>
              <p>Em 2025, recebi autorização da UFRJ para pesquisar para minha tese na Gallaudet University, em Washington, até março de 2026.</p>
              <ExternalLink href={sources.gallaudet}>Registro da autorização (PDF)</ExternalLink>
            </div>
          </article>
        </div>

        <div className="academic-appointments">
          <h3>Minha atuação na UFRJ</h3>
          <ul>
            {appointments.map(({ period, title, description, source }) => (
              <li key={title}>
                <p className="academic-period">{period}</p>
                <h4>{title}</h4>
                <p>{description}</p>
                <ExternalLink href={source.href}>{source.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <section className="academic-projects" id="projetos" aria-labelledby="academic-projects-title">
          <h3 id="academic-projects-title">Meus projetos</h3>

          <article className="academic-project" aria-labelledby="sopa-lab-title">
            <div className="academic-project-copy">
              <h4 id="sopa-lab-title">SOPA-Lab</h4>
              <p>Participo do Laboratório de Línguas de Sinais e Orais em Psicolinguística e Aquisição da UFRJ. Em julho de 2022, criei o sinal do laboratório em Libras.</p>
              <div className="academic-project-links">
                <ExternalLink href={sources.sopa}>Meu perfil no SOPA-Lab</ExternalLink>
                <ExternalLink href={sources.sopaHistory}>Histórico do laboratório</ExternalLink>
              </div>
            </div>

            <figure className="academic-project-film">
              <video controls playsInline preload="none" width="576" height="480"
                src={sitePath('acervo/videos/sopa-lab-sinal.mp4')}
                poster={sitePath('acervo/imagens/sopa-lab-sinal.webp')}
                aria-labelledby="sopa-lab-film-caption" />
              <figcaption id="sopa-lab-film-caption">A professora Marília Lott apresenta o sinal que criei para o SOPA-Lab.</figcaption>
            </figure>
          </article>

          <article className="academic-project" aria-labelledby="farmalibras-title">
            <div className="academic-project-copy">
              <h4 id="farmalibras-title">FarmaLibras</h4>
              <p>Colaboro com o FarmaLibras pelo Rio de Janeiro, na equipe da região Sudeste. O Conselho Federal de Farmácia e a Universidade Federal do Vale do São Francisco desenvolvem o programa para facilitar a comunicação em Libras no atendimento farmacêutico.</p>
              <div className="academic-project-links">
                <ExternalLink href={sources.farmaLibras}>Conhecer o FarmaLibras</ExternalLink>
              </div>
            </div>

            <div className="academic-project-gallery">
              <figure>
                <img src={sitePath('acervo/imagens/farmalibras-gravacao.webp')} width="528" height="302" loading="lazy" decoding="async" alt="Sinalizo em Libras em uma gravação sobre o Centro de Informação sobre Medicamentos." />
                <figcaption>Minha participação em vídeo no FarmaLibras.</figcaption>
              </figure>
              <figure>
                <img src={sitePath('acervo/imagens/farmalibras-dia-nacional-surdo.webp')} width="278" height="348" loading="lazy" decoding="async" alt="Arte do FarmaLibras com retratos da equipe e uma mensagem sobre a língua, a cultura e a identidade da comunidade surda." />
                <figcaption>Campanha do Dia Nacional do Surdo.</figcaption>
              </figure>
            </div>
          </article>
        </section>

        <nav className="academic-profiles" aria-labelledby="academic-profiles-title">
          <h3 id="academic-profiles-title">Meu currículo e meus perfis</h3>
          <ul>
            {academicProfiles.map(({ label, href }) => <li key={label}><ExternalLink href={href}>{label}</ExternalLink></li>)}
          </ul>
          <a className="text-link academic-publications" href={sitePath('publicacoes/')}>Explorar minhas publicações<span className="arrow" aria-hidden="true">→</span></a>
        </nav>
      </div>
    </section>
  );
}
