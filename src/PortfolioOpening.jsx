import React, { useEffect, useRef, useState } from 'react';
import { sitePath } from './sitePath.js';
import './opening.css';

const highlights = sitePath('acervo/destaque/');
const photographs = sitePath('acervo/imagens/');
const motionQuery = '(prefers-reduced-motion: reduce)';
const mobileQuery = '(max-width: 37.5rem), (max-width: 57rem) and (max-height: 32rem) and (orientation: landscape) and (pointer: coarse)';
const motionSource = highlights + 'abertura-motion.mp4';

function canAutoplayMotion() {
  return !window.matchMedia(mobileQuery).matches && !window.matchMedia(motionQuery).matches && !navigator.connection?.saveData;
}

function playMotion(film) {
  if (!film.getAttribute('src')) film.src = motionSource;
  return film.play();
}

export default function PortfolioOpening() {
  const artwork = useRef(null);
  const motionFilm = useRef(null);
  const motionProgress = useRef(null);
  const librasDialog = useRef(null);
  const librasTrigger = useRef(null);
  const [autoplayMotion] = useState(canAutoplayMotion);
  const [motionEnabled, setMotionEnabled] = useState(autoplayMotion);
  const [inView, setInView] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const [motionStatus, setMotionStatus] = useState('');
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
    if (!artworkMoving) {
      film.pause();
      return;
    }
    if (!film.paused) return;

    let active = true;
    playMotion(film).catch((error) => {
      if (active && error.name !== 'AbortError') setMotionEnabled(false);
    });
    return () => { active = false; };
  }, [artworkMoving]);

  function toggleMotion() {
    setMotionStatus('');
    setMotionEnabled(!motionEnabled);
    if (!motionEnabled && inView) {
      playMotion(motionFilm.current).catch((error) => {
        if (error.name === 'AbortError') return;
        setMotionEnabled(false);
        setMotionStatus('A animação está indisponível no momento.');
      });
    }
  }

  function reportMotionError() {
    setFilmReady(false);
    setMotionEnabled(false);
    setMotionStatus('A animação está indisponível no momento.');
  }

  function updateMotionProgress({ currentTarget: film }) {
    if (Number.isFinite(film.duration) && film.duration > 0) {
      motionProgress.current.value = film.currentTime / film.duration;
    }
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
          <p className="opening-kicker">Libras e cultura Surda</p>
          <h1 id="opening-name"><span>Clarissa</span>{' '}<em>Guerretta</em></h1>
          <p className="opening-description">Sou professora de Libras na UFRJ, pesquisadora e apresentadora.</p>
          <div className="opening-links">
            <button ref={librasTrigger} type="button" className="opening-libras" aria-haspopup="dialog" aria-controls="opening-libras-player" onClick={showLibras}>
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
            <video ref={motionFilm} className="opening-art-film" id="opening-motion-film" src={autoplayMotion ? motionSource : undefined}
              muted playsInline loop preload="none" data-ready={filmReady}
              onLoadedData={() => setFilmReady(true)} onTimeUpdate={updateMotionProgress} onError={reportMotionError} />
          </div>
          <figcaption className="opening-art-caption">
            <progress ref={motionProgress} className="opening-progress" max="1" value="0" aria-hidden="true" />
            <span className="opening-film-credit">Imagens do meu acervo <span>· 30 s</span></span>
            <button className="opening-motion" type="button" aria-controls="opening-motion-film" onClick={toggleMotion}>
              <span className={motionEnabled ? 'opening-pause-icon' : 'opening-play-icon'} aria-hidden="true" />
              {motionEnabled ? 'Pausar abertura' : 'Reproduzir abertura'}
            </button>
            <span className="opening-motion-status" role="status">{motionStatus}</span>
          </figcaption>
        </figure>
      </div>

      <dialog ref={librasDialog} className="opening-libras-dialog" id="opening-libras-player" aria-labelledby="opening-libras-title"
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
