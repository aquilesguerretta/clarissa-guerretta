import React from 'react';
import { email } from './content.js';
import './privacy-policy.css';

export default function PrivacyPolicy() {
  return (
    <article className="privacy-policy shell section" aria-labelledby="privacy-title">
      <header className="privacy-policy-header">
        <h1 id="privacy-title" className="page-title">Privacidade e cookies</h1>
        <p>Sou Clarissa Guerretta. Nesta página explico como os dados pessoais podem ser usados em clarissaguerretta.com e como falar comigo sobre seus direitos.</p>
        <p className="privacy-policy-date">Atualizada em <time dateTime="2026-11-24">24 de novembro de 2026</time></p>
        <nav className="privacy-policy-nav" aria-label="Nesta política">
          <a className="text-link" href="#dados-pessoais">Dados pessoais e LGPD</a>
          <a className="text-link" href="#cookies">Política de cookies</a>
        </nav>
      </header>

      <section className="privacy-policy-section" aria-labelledby="dados-pessoais">
        <h2 id="dados-pessoais">Dados pessoais e LGPD</h2>
        <p><strong>Contatos por e-mail.</strong> Quando você me escreve, recebo seu endereço de e-mail e os dados que você decide incluir na mensagem. Uso essas informações para responder e acompanhar o assunto. As mensagens podem ficar guardadas enquanto forem necessárias para esses fins ou quando houver uma obrigação de guarda.</p>
        <p><strong>Registros técnicos.</strong> A Vercel, que hospeda este portfólio, pode processar dados como endereço IP, página solicitada, data e hora do acesso. Esses registros ajudam a entregar as páginas, diagnosticar falhas e proteger o site. O prazo de guarda varia conforme a configuração da hospedagem.</p>
        <p><strong>Serviços usados.</strong> A plataforma de hospedagem e os serviços de e-mail podem receber os dados necessários para prestar esses serviços. Em sites externos, como o YouTube e o Google Drive, aplicam-se as práticas de privacidade de cada serviço.</p>
        <h3>Seus direitos</h3>
        <p>Pela LGPD, você pode pedir confirmação do tratamento, acesso aos seus dados, correção e informações sobre o compartilhamento. Quando cabível, você também pode pedir bloqueio, anonimização ou eliminação de dados, solicitar portabilidade e revogar consentimento.</p>
        <p>Escreva para <a href={`mailto:${email}`}>{email}</a> para exercer seus direitos ou pedir a revisão de um conteúdo do acervo que envolva seus dados. Se a questão persistir, consulte os <a href="https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd">canais de atendimento da ANPD</a>.</p>
        <a className="text-link" href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm">Consulte o texto da LGPD</a>
      </section>

      <section className="privacy-policy-section" aria-labelledby="cookies">
        <h2 id="cookies">Política de cookies</h2>
        <p>Cookies são pequenos arquivos que um site pode salvar no seu navegador. O código deste portfólio funciona sem definir cookies e sem ferramentas de análise de audiência, publicidade ou rastreamento.</p>
        <p>Ao abrir um link externo, o site de destino pode usar cookies conforme a política dele. Você pode consultar, bloquear ou apagar cookies nas configurações do seu navegador.</p>
        <a className="text-link" href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais">Consulte o guia de cookies da ANPD</a>
      </section>
    </article>
  );
}
