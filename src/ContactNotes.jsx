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
      <summary>Privacidade e licenças das fontes</summary>
      <p>
        O contato é feito pelo seu aplicativo de e-mail. Os links externos levam a serviços com suas
        próprias práticas de privacidade. A hospedagem pode registrar dados técnicos de acesso.
      </p>
      <p>Para pedir a correção ou a retirada de um conteúdo, escreva para mim pelo e-mail acima.</p>
      <p>Uso estas fontes sob a SIL Open Font License 1.1.</p>
      <ul aria-label="Licenças das fontes">
        {fontLicenses.map(([name, filename]) => (
          <li key={filename}><a href={sitePath(`licencas/${filename}.txt`)}>{name}</a></li>
        ))}
      </ul>
    </details>
  );
}
