import React from 'react';
import { sitePath } from './sitePath.js';
import './contact-notes.css';

const fontLicenses = [
  ['Barlow Condensed', 'barlow-condensed'],
  ['DM Sans', 'dm-sans'],
  ['Instrument Serif', 'instrument-serif'],
];

export default function ContactNotes() {
  return (
    <details className="contact-notes">
      <summary>Privacidade, cookies e licenças das fontes</summary>
      <ul aria-label="Políticas do portfólio">
        <li><a href={sitePath('privacidade/')}>Política de privacidade</a></li>
        <li><a href={sitePath('privacidade/#cookies')}>Política de cookies</a></li>
      </ul>
      <p>Uso estas fontes sob a SIL Open Font License 1.1.</p>
      <ul aria-label="Licenças das fontes">
        {fontLicenses.map(([name, filename]) => (
          <li key={filename}><a href={sitePath(`licencas/${filename}.txt`)}>{name}</a></li>
        ))}
      </ul>
    </details>
  );
}
