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
  const [posterReady, setPosterReady] = useState(false);
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

  function shiftLight(event) {
    if (!artworkMoving || event.pointerType !== 'mouse') return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--opening-x', (((event.clientX - bounds.left) / bounds.width) - 0.5) * 18 + 'px');
    element.style.setProperty('--opening-y', (((event.clientY - bounds.top) / bounds.height) - 0.5) * 12 + 'px');
  }

  function centerLight(event) {
    event.currentTarget.style.removeProperty('--opening-x');
    event.currentTarget.style.removeProperty('--opening-y');
  }

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
          <p className="opening-kicker">Libras <span aria-hidden="true">/</span> Cultura Surda</p>
          <h1 id="opening-name"><span>Clarissa</span>{' '}<span>Guerretta<span aria-hidden="true">.</span></span></h1>
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

        <figure className="opening-artwork" ref={artwork} data-moving={artworkMoving}
          onPointerMove={shiftLight} onPointerLeave={centerLight}>
          <div className="opening-art-frame">
            <div className="opening-art-panel" aria-hidden="true">
              <div className="opening-photographs">
                <img className="opening-contact-print" src={photographs + 'clarissa-copa.webp'} alt="" />
                <img className="opening-portrait-print" src={photographs + 'clarissa-tv-ines.webp'} alt="" />
              </div>
              <img className="opening-art-poster" src={highlights + 'abertura-motion.webp'} alt=""
                data-ready={posterReady} onLoad={() => setPosterReady(true)} />
              <video ref={motionFilm} className="opening-art-film" src={highlights + 'abertura-motion.mp4'}
                aria-hidden="true" muted playsInline loop preload="none" data-ready={filmReady}
                onLoadedData={() => setFilmReady(true)} onError={() => setFilmReady(false)} />
              <div className="opening-art-light" />
              <div className="opening-art-guide" />
            </div>
          </div>
          <figcaption className="opening-art-caption">
            <span>Fotografias do meu acervo</span>
            <button className="opening-motion" type="button" onClick={() => setMotionEnabled(!motionEnabled)}>
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
