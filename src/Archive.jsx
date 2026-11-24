import React, { useEffect, useRef, useState } from 'react';
import { media, ted } from './content.js';
import './archive.css';

const filters = [['all', 'Tudo'], ['video', 'Vídeos'], ['image', 'Imagens'], ['press', 'Na mídia']];
const topics = [
  ['all', 'Todos os temas'],
  ['esporte', 'Cobertura esportiva'],
  ['tv', 'TV INES'],
  ['entrevistas', 'Entrevistas'],
  ['eventos', 'Palestras e eventos'],
  ['bastidores', 'Bastidores'],
];
const pageSize = 9;

function normalizeSearch(text) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

const indexedMedia = media.map((item) => ({
  item,
  searchable: normalizeSearch([item.title, item.category, item.source, item.description, item.alt, ...(item.topics ?? [])].join(' ')),
}));

export function FeaturedTalk() {
  return (
    <a className="featured" href={ted.href}>
      <span className="featured-visual"><img src={ted.poster} width="1280" height="720" alt="" loading="lazy" /></span>
      <span className="featured-copy">
        <span className="eyebrow">TEDxUFRJ · 2018</span>
        <span className="featured-quote">“Minha maior virtude é ser Surda”</span>
        <span className="featured-link"><span className="media-action play" aria-hidden="true"></span> Assista à minha palestra no TED</span>
      </span>
    </a>
  );
}

function MediaDialog({ item, trigger, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      trigger?.focus();
    };
  }, [trigger]);

  return (
    <dialog className="viewer" ref={dialogRef} aria-labelledby="viewer-title" onClose={onClose}>
      <div className="viewer-bar">
        <h3 id="viewer-title">{item.title}</h3>
        <button type="button" onClick={() => dialogRef.current.close()} autoFocus>Fechar <span aria-hidden="true">×</span></button>
      </div>
      {item.kind === 'video'
        ? <video controls playsInline preload="metadata" poster={item.poster} src={item.src} aria-label={item.title} />
        : <img src={item.src} alt={item.alt} />}
      {item.description && <p>{item.description}</p>}
    </dialog>
  );
}

function MediaCard({ item, onOpen }) {
  const video = item.kind === 'video';
  const preview = item.poster ?? item.src;
  const content = (
    <>
      <span className={`media-image${item.href ? ' media-image--link' : ''}${preview ? '' : ' media-image--source'}`}>
        {preview ? <img src={preview} alt="" loading="lazy" /> : <span aria-hidden="true">{item.source}</span>}
        <span className={`media-action${video && !item.href ? ' play' : ''}`} aria-hidden="true">{item.href ? '↗' : !video && '+'}</span>
      </span>
      <span className="media-meta eyebrow">{item.category}{item.source ? ` · ${item.source}` : ''}</span>
      <span className="media-title">{item.title}</span>
      {item.linkLabel && <span className="archive-origin">{item.linkLabel}</span>}
    </>
  );

  return <li>{item.href
    ? <a className="archive-card" href={item.href}>{content}</a>
    : <button className="archive-card" type="button" onClick={(event) => onOpen({ item, trigger: event.currentTarget })} aria-haspopup="dialog">{content}</button>
  }</li>;
}

export default function Archive() {
  const [filter, setFilter] = useState('all');
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(pageSize);
  const [selected, setSelected] = useState(null);
  const searchInput = useRef(null);
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  const filtered = indexedMedia.filter(({ item, searchable }) => (
    (filter === 'all' || item.kind === filter)
    && (topic === 'all' || item.group === topic || item.topics?.includes(topic))
    && terms.every((term) => searchable.includes(term))
  ));
  const filterIsActive = filter !== 'all' || topic !== 'all' || query.length > 0;

  function resetFilters() {
    setFilter('all');
    setTopic('all');
    setQuery('');
    setLimit(pageSize);
    searchInput.current?.focus();
  }

  return (
    <section className="archive archive-page" id="acervo" aria-labelledby="archive-title">
      <div className="shell section">
        <div className="archive-intro page-enter">
          <div>
            <p className="eyebrow">Meu acervo</p>
            <h1 className="page-title" id="archive-title">Libras em cena<span>.</span></h1>
          </div>
          <div className="archive-intro-copy">
            <p>Reuni aqui minhas reportagens, entrevistas e palestras, além de registros dos bastidores e matérias sobre minha trajetória.</p>
            <a href="#catalogo-acervo">Explore meu acervo <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <FeaturedTalk />
        <section className="archive-catalog" id="catalogo-acervo" aria-labelledby="archive-catalog-title">
          <h2 id="archive-catalog-title">Fotos, vídeos e matérias</h2>
          <div className="archive-controls">
            <label className="archive-search">
              <span>Buscar no acervo</span>
              <input ref={searchInput} type="search" value={query} placeholder="Copa, TV INES, entrevistas"
                onChange={(event) => { setQuery(event.target.value); setLimit(pageSize); }} />
            </label>
            <label className="archive-topics">
              <span id="archive-topic-label">Tema</span>
              <select aria-labelledby="archive-topic-label" value={topic} onChange={(event) => { setTopic(event.target.value); setLimit(pageSize); }}>
                {topics.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          </div>
          <div className="archive-tools">
            <div className="filters" role="group" aria-label="Tipo de mídia">
              {filters.map(([value, label]) => (
                <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(pageSize); }}>
                  {label}
                </button>
              ))}
            </div>
            <div className="archive-summary">
              <span className="archive-count" role="status">{filtered.length} {filtered.length === 1 ? 'registro' : 'registros'}</span>
              {filterIsActive && <button className="archive-reset" type="button" onClick={resetFilters}>Limpar filtros</button>}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="archive-empty">
              <h3>Nenhum registro encontrado</h3>
              <p>Experimente outro termo ou limpe os filtros.</p>
            </div>
          ) : (
            <ul className="archive-grid">
              {filtered.slice(0, limit).map(({ item }) => <MediaCard key={item.src ?? item.href} item={item} onOpen={setSelected} />)}
            </ul>
          )}
          {filtered.length > pageSize && (
            <button className="load-more" type="button" disabled={filtered.length <= limit} onClick={() => setLimit(limit + pageSize)}>
              {filtered.length <= limit ? 'Todos os registros exibidos' : 'Mostrar mais registros'}
            </button>
          )}
        </section>
      </div>
      {selected && <MediaDialog {...selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
