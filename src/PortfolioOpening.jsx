import React, { useEffect, useRef, useState } from 'react';
import { sitePath } from './sitePath.js';
import './opening.css';

const highlights = sitePath('acervo/destaque/');
const photographs = sitePath('acervo/imagens/');
const motionQuery = '(prefers-reduced-motion: reduce)';

function prefersMotion() {
  return !window.matchMedia(motionQuery).matches && !navigator.connection?.saveData;
}

export default function PortfolioOpening() {
  const artwork = useRef(null);
  const motionFilm = useRef(null);
  const librasDialog = useRef(null);
  const librasTrigger = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(prefersMotion);
  const [inView, setInView] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const artworkMoving = motionEnabled && inView && !dialogOpen;

  useEffect(() => {
    const preference = window.matchMedia(motionQuery);
    const art = artwork.current;
    const visibility = new IntersectionObserver(([record]) => {
      setInView(record.intersectionRatio >= 0.2 && !document.hidden);
    }, { threshold: 0.2 });

    const observe = () => {
      visibility.unobserve(art);
      if (document.hidden) setInView(false);
      else visibility.observe(art);
    };
    const changePreference = ({ matches }) => {
      if (matches) setMotionEnabled(false);
    };

    observe();
    document.addEventListener('visibilitychange', observe);
    preference.addEventListener('change', changePreference);
    return () => {
      visibility.disconnect();
      document.removeEventListener('visibilitychange', observe);
      preference.removeEventListener('change', changePreference);
    };
  }, []);

  useEffect(() => {
    const film = motionFilm.current;
    if (artworkMoving) film.play().catch(() => {});
    else film.pause();
  }, [artworkMoving]);

  function showLibras() {
    librasDialog.current.showModal();
    setDialogOpen(true);
  }

  function closeLibras() {
    librasDialog.current.close();
  }

  function restoreOpening() {
    setDialogOpen(false);
    librasTrigger.current.focus({ preventScroll: true });
  }

  return (
    <section className="portfolio-opening" aria-labelledby="opening-name">
      <div className="shell opening-grid">
        <div className="opening-copy">
          <p className="opening-kicker">Libras e cultura Surda</p>
          <h1 id="opening-name"><span>Clarissa</span>{' '}<span>Guerretta</span></h1>
          <p className="opening-description">Sou professora de Libras na UFRJ, pesquisadora e apresentadora.</p>
          <div className="opening-links">
            <button ref={librasTrigger} type="button" className="opening-libras" aria-haspopup="dialog" onClick={showLibras}>
              <span className="opening-play-icon" aria-hidden="true" /> Me veja em Libras
            </button>
            <div className="opening-page-links">
              <a href={sitePath('trajetoria/')}>Minha trajetória <span aria-hidden="true">→</span></a>
              <a href={sitePath('acervo/')}>Meu acervo <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>

        <figure className="opening-artwork" ref={artwork}>
          <div className="opening-art-panel" aria-hidden="true">
            <img className="opening-art-poster"
              src={posterFailed ? photographs + 'clarissa-tv-ines.webp' : highlights + 'abertura-motion.webp'}
              alt="" width="1152" height="648" fetchPriority="high" onError={() => setPosterFailed(true)} />
            <video ref={motionFilm} className="opening-art-film" src={highlights + 'abertura-motion.mp4'}
              muted playsInline loop preload="none" data-ready={filmReady}
              onLoadedData={() => setFilmReady(true)} onError={() => setFilmReady(false)} />
          </div>
          <figcaption className="opening-art-caption">
            <span>Imagens do meu acervo</span>
            <button className="opening-motion" type="button" onClick={() => setMotionEnabled((enabled) => !enabled)}>
              <span className={motionEnabled ? 'opening-pause-icon' : 'opening-play-icon'} aria-hidden="true" />
              {motionEnabled ? 'Pausar movimento' : 'Ativar movimento'}
            </button>
          </figcaption>
        </figure>
      </div>

      <dialog ref={librasDialog} className="opening-libras-dialog" aria-labelledby="opening-libras-title"
        onClose={restoreOpening}>
        <div className="opening-dialog-header">
          <div>
            <h2 id="opening-libras-title">Eu em Libras</h2>
            <p>Primeira Mão · TV INES · 100ª edição</p>
          </div>
          <button type="button" className="opening-dialog-close" autoFocus onClick={closeLibras}>Fechar</button>
        </div>
        {dialogOpen && (
          <video className="opening-libras-video" controls playsInline preload="metadata"
            src={highlights + 'clarissa-em-libras.mp4'}
            poster={highlights + 'clarissa-em-libras.webp'}
            aria-label="Eu sinalizo em Libras no telejornal Primeira Mão, com legendas em português." />
        )}
      </dialog>
    </section>
  );
}
