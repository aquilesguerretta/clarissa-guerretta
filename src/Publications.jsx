import React, { useEffect, useId, useRef, useState } from 'react';
import { publications } from './content.js';
import { sitePath } from './sitePath.js';
import './publications.css';

const bookTypes = new Set(['Livro', 'Organização']);
const books = publications.filter(({ type }) => bookTypes.has(type));
const otherWorks = publications.filter(({ type }) => !bookTypes.has(type));
const featuredBook = books[0];
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const compactShelfQuery = '(max-width: 37.5rem)';
const scrollTolerance = 3;

function coverFor(href) {
  const filename = href.split('/').at(-1).replace(/\.pdf$/i, '.webp');
  return sitePath(`capas/${filename}`);
}

function useMediaQuery(media) {
  const [matches, setMatches] = useState(() => window.matchMedia(media).matches);

  useEffect(() => {
    const query = window.matchMedia(media);
    const update = () => setMatches(query.matches);
    query.addEventListener('change', update);
    update();
    return () => query.removeEventListener('change', update);
  }, [media]);

  return matches;
}

function moveShelf(list, direction, { repeat = false, reduced = false } = {}) {
  const first = list.firstElementChild;
  if (!first) return;

  const current = list.scrollLeft;
  const max = list.scrollWidth - list.clientWidth;
  const positions = Array.from(list.children, (card) => card.offsetLeft - first.offsetLeft);
  const next = direction > 0
    ? positions.find((position) => position > current + scrollTolerance)
    : positions.findLast((position) => position < current - scrollTolerance);
  const atEnd = max - current <= scrollTolerance;
  const destination = repeat && atEnd ? 0 : (next ?? (direction > 0 ? max : 0));

  list.scrollTo({
    left: Math.max(0, Math.min(destination, max)),
    behavior: reduced ? 'auto' : 'smooth',
  });
}

function Arrow({ direction }) {
  return <span aria-hidden="true">{direction === 'left' ? '←' : direction === 'right' ? '→' : '↗'}</span>;
}

function PublicationCard({ item, kind }) {
  return (
    <li className="library-card">
      <a className="library-card-link" href={item.href}>
        <span className={`library-cover library-cover--${kind}`}>
          <img src={coverFor(item.href)} alt="" width="400" height="560" loading="lazy" decoding="async" />
        </span>
        <span className="library-card-body">
          <span className="library-card-type">{item.type}</span>
          <span className="library-card-title">{item.title}</span>
          <span className="library-card-source">{item.source}</span>
          <span className="library-card-action">Abrir PDF <Arrow /></span>
        </span>
      </a>
    </li>
  );
}

export function BookShelf({ items = books, title = 'Livros', kind = 'book', sectionId } = {}) {
  const id = useId();
  const listRef = useRef(null);
  const reduced = useMediaQuery(reducedMotionQuery);
  const compact = useMediaQuery(compactShelfQuery);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [limits, setLimits] = useState({ atStart: true, atEnd: true, overflow: false, position: 1 });
  const playing = !reduced && (autoplay ?? !compact);

  useEffect(() => {
    const list = listRef.current;
    const updateLimits = () => {
      const max = list.scrollWidth - list.clientWidth;
      const atStart = list.scrollLeft <= scrollTolerance;
      const atEnd = max - list.scrollLeft <= scrollTolerance;
      const overflow = max > scrollTolerance;
      let position = 1;
      if (compact && overflow && list.childElementCount > 1) {
        const step = list.children[1].offsetLeft - list.children[0].offsetLeft;
        position = Math.min(list.childElementCount, Math.round(list.scrollLeft / step) + 1);
      }
      setLimits((previous) => previous.atStart === atStart && previous.atEnd === atEnd
        && previous.overflow === overflow && previous.position === position
        ? previous : { atStart, atEnd, overflow, position });
    };

    const sizeObserver = new ResizeObserver(updateLimits);
    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    sizeObserver.observe(list);
    viewObserver.observe(list);
    list.addEventListener('scroll', updateLimits, { passive: true });
    updateLimits();

    return () => {
      sizeObserver.disconnect();
      viewObserver.disconnect();
      list.removeEventListener('scroll', updateLimits);
    };
  }, [compact]);

  useEffect(() => {
    if (!playing || hovered || !inView || !limits.overflow) return undefined;

    const timer = window.setInterval(() => {
      if (!document.hidden) moveShelf(listRef.current, 1, { repeat: true });
    }, 4600);

    return () => window.clearInterval(timer);
  }, [playing, hovered, inView, limits.overflow]);

  function navigate(direction) {
    setAutoplay(false);
    moveShelf(listRef.current, direction, { reduced });
  }

  function handleRailKeyDown(event) {
    if (event.target !== event.currentTarget || !limits.overflow) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setAutoplay(false);
      const list = event.currentTarget;
      list.scrollTo({
        left: event.key === 'Home' ? 0 : list.scrollWidth - list.clientWidth,
        behavior: reduced ? 'auto' : 'smooth',
      });
    }
  }

  return (
    <section
      className="library-shelf"
      id={sectionId}
      aria-labelledby={`title-${id}`}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => { if (event.target.matches(':focus-visible')) setAutoplay(false); }}
    >
      <div className="library-shelf-head">
        <div className="library-shelf-label">
          <h2 id={`title-${id}`} className="library-shelf-title">{title}</h2>
          {(!compact || !limits.overflow) && (
            <span className="library-shelf-count">{items.length} {items.length === 1 ? 'publicação' : 'publicações'}</span>
          )}
        </div>
        {limits.overflow && (
          <div className="library-shelf-controls" role="group" aria-label={`Controles de ${title.toLowerCase()}`}>
            {compact && (
              <span className="library-shelf-position" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
                <span className="library-sr-only">Publicação </span>{limits.position} de {items.length}
              </span>
            )}
            {!reduced && (
              <button className="library-auto-button" type="button" aria-controls={`shelf-${id}`} onClick={() => setAutoplay(!playing)}>
                <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
                {playing ? 'Pausar' : compact ? 'Reproduzir' : 'Retomar'}
                <span className="library-sr-only"> rolagem automática de {title.toLowerCase()}</span>
              </button>
            )}
            <button className="library-arrow-button" type="button" aria-label={`Anterior em ${title.toLowerCase()}`} aria-controls={`shelf-${id}`} aria-disabled={limits.atStart} onClick={() => { if (!limits.atStart) navigate(-1); }}>
              <Arrow direction="left" />
            </button>
            <button className="library-arrow-button" type="button" aria-label={`Próximo em ${title.toLowerCase()}`} aria-controls={`shelf-${id}`} aria-disabled={limits.atEnd} onClick={() => { if (!limits.atEnd) navigate(1); }}>
              <Arrow direction="right" />
            </button>
          </div>
        )}
      </div>
      <ul
        ref={listRef}
        id={`shelf-${id}`}
        className="library-rail"
        role="list"
        aria-labelledby={`title-${id}`}
        tabIndex={limits.overflow ? 0 : undefined}
        onKeyDown={handleRailKeyDown}
        onPointerDown={() => setAutoplay(false)}
        onWheel={(event) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) setAutoplay(false); }}
      >
        {items.map((item) => <PublicationCard key={item.href} item={item} kind={kind} />)}
      </ul>
    </section>
  );
}

export function PublicationPreview({ href = sitePath('publicacoes/') }) {
  return (
    <section className="library-preview" aria-label="Pesquisa e escrita">
      <div className="library-inner shell">
        <div className="library-preview-head">
          <p className="library-kicker">Minha pesquisa</p>
          <a className="library-index-link" href={href}>Veja minhas publicações <Arrow direction="right" /></a>
        </div>
        <BookShelf />
      </div>
    </section>
  );
}

export default function Publications() {
  return (
    <section className="library-page" aria-labelledby="publications-title">
      <header className="library-intro">
        <div className="library-inner shell">
          <div className="library-intro-copy">
            <p className="library-kicker">Minha pesquisa</p>
            <h1 id="publications-title"><span>Minhas</span> publicações</h1>
            <p className="library-deck">Reuni aqui livros, capítulos e trabalhos em que pesquiso Libras, educação bilíngue e protagonismo Surdo.</p>
            <nav className="library-jumps" aria-label="Nesta página">
              <a href="#livros">Livros <span aria-hidden="true">↓</span></a>
              <a href="#artigos-e-capitulos">Artigos e capítulos <span aria-hidden="true">↓</span></a>
            </nav>
          </div>
          {featuredBook && (
            <a className="library-feature" href={featuredBook.href}>
              <span className="library-feature-mat">
                <span className="library-feature-object">
                  <img src={coverFor(featuredBook.href)} alt="" width="530" height="768" fetchPriority="high" />
                </span>
              </span>
              <span className="library-feature-caption">
                <span>
                  <span className="library-feature-title">{featuredBook.title}</span>
                  <span className="library-feature-source">{featuredBook.source}</span>
                </span>
                <span className="library-feature-action">PDF <Arrow /></span>
              </span>
            </a>
          )}
        </div>
      </header>
      <div className="library-band library-band--books">
        <div className="library-inner shell"><BookShelf sectionId="livros" /></div>
      </div>
      <div className="library-band library-band--research">
        <div className="library-inner shell"><BookShelf items={otherWorks} title="Artigos e capítulos" kind="page" sectionId="artigos-e-capitulos" /></div>
      </div>
    </section>
  );
}
