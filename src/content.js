import { images } from './images.js';
import { sitePath as fromPublic } from './sitePath.js';

const photo = (id) => images.find((image) => image.id === id);

export const email = 'clarissaguerretta@letras.ufrj.br';
export const profile = 'https://sopa-lab.wixsite.com/sopa-lab/perfil/clarissa';

export const ted = {
  href: 'https://www.ted.com/talks/clarissa_guerretta_minha_maior_virtude_e_ser_surda',
  poster: fromPublic('acervo/imagens/tedxufrj.webp'),
};

const hero = photo('original-0');
const bio = photo('original-1');

export const visuals = {
  hero: { ...hero, src: fromPublic(hero.src), caption: 'Em uma das minhas reportagens para a TV INES.' },
  bio: { ...bio, src: fromPublic(bio.src), caption: 'Durante a minha cobertura da Copa do Mundo de 2014 para a TV INES.' },
};

export const work = [
  { title: 'Docência e formação', description: 'Ensino Libras na UFRJ e atuo na formação de profissionais para a educação bilíngue de pessoas Surdas.' },
  { title: 'Pesquisa e direitos linguísticos', description: 'Pesquiso o protagonismo de mulheres Surdas, a identidade, as políticas linguísticas e a educação.' },
  { title: 'Televisão e tradução', description: 'Na TV INES, trabalhei com apresentação, reportagem e tradução em Libras, em produções de estúdio e coberturas de cultura e esporte.' },
];

const videos = [
  {
    file: 'festival-mulheres-do-mundo', group: 'eventos', category: 'Palestras e eventos',
    title: 'Festival Mulheres do Mundo',
    description: 'Em Libras, convido você para o festival WOW no Rio de Janeiro. O vídeo tem legendas em português.',
  },
  {
    file: 'tv-ines-trechos', group: 'tv', category: 'TV INES',
    title: 'Trechos da programação da TV INES',
    description: 'Reuni no meu acervo trechos de estúdio e reportagens em Libras da TV INES.',
  },
  {
    file: 'conversa-em-libras-camiseta', group: 'entrevistas', category: 'Entrevistas',
    title: 'Conversa em Libras · camiseta com arco-íris',
    description: 'Do meu acervo, uma entrevista em Libras com uma pessoa de camiseta preta com uma faixa nas cores do arco-íris.',
  },
  {
    file: 'conversa-em-libras-blusa-cinza', group: 'entrevistas', category: 'Entrevistas',
    title: 'Conversa em Libras · convidada de cinza',
    description: 'Do meu acervo, uma entrevista em Libras com uma convidada de blusa cinza em um espaço interno.',
  },
  {
    file: 'conversa-em-libras-poltronas', group: 'entrevistas', category: 'Entrevistas',
    title: 'Conversa em Libras · entrevista nas poltronas',
    description: 'Do meu acervo, uma entrevista em Libras com duas pessoas sentadas em poltronas de vime.',
  },
].map(({ file, ...details }) => ({
  ...details,
  kind: 'video',
  src: fromPublic(`acervo/videos/${file}.mp4`),
  poster: fromPublic(`acervo/imagens/${file}.webp`),
}));

const rioContentMarket = {
  kind: 'video',
  group: 'eventos',
  category: 'Palestras e eventos',
  title: 'RioContentMarket · TV INES',
  href: 'https://drive.google.com/file/d/1q6nRFhxnmhx2VZ_FlrcHMXVrR-b2oz_y/view',
  poster: fromPublic(photo('photo-27').src),
};

export const media = [
  videos[0],
  ...images.slice(0, 2),
  videos[1],
  ...images.slice(2, 5),
  ...videos.slice(2),
  rioContentMarket,
  ...images.slice(5),
].map((item) => item.kind === 'image' ? { ...item, src: fromPublic(item.src) } : item);

export const publications = [
  ['Conhecer para ensinar: diagnóstico inicial dos cursistas sobre Libras no PARFOR', 'Capítulo', 'Estudos Surdos · Pimenta Cultural · 2026', 'conhecer-para-ensinar'],
  ['Política Surda', 'Livro', 'Editora Ilustração · 2026', 'politica-surda'],
  ['Comunidades Surdas: práticas e propostas, vol. 2', 'Organização', 'Programa RENAFOR · Eloar Comunicação · 2025', 'comunidades-surdas-vol-2'],
  ['Comunidades Surdas: práticas e propostas, vol. 1', 'Organização', 'Programa RENAFOR · GM Editorial · 2025', 'comunidades-surdas-vol-1'],
  ['Intersinalês: a nova forma de comunicação da Libras no ambiente digital', 'Capítulo', 'Com Heloise Gripp Diniz', 'intersinales'],
  ['A educação bilíngue como políticas linguísticas: perspectivas e desafios no Brasil', 'Capítulo', 'Comunidades Surdas, vol. 1 · 2025', 'educacao-bilingue-politicas-linguisticas'],
  ['10 anos de Letras-Libras na UFRJ: desafios e conquistas', 'Organização', 'Pimenta Cultural · 2024', '10-anos-letras-libras-ufrj'],
  ['Disciplinas de Libras nos cursos Letras-Libras da UFRJ', 'Capítulo', '10 anos de Letras-Libras na UFRJ · 2024', 'disciplinas-libras-ufrj'],
  ['Desafios da educação de surdos e seus reflexos no acesso aos cursos de graduação em Letras-Libras da UFRJ', 'Capítulo', '10 anos de Letras-Libras na UFRJ · 2024', 'desafios-educacao-surdos'],
  ['A (in)visibilidade das mulheres surdas: protagonismo na sociedade contemporânea', 'Resumo', 'Revista Espaço · 2024', 'invisibilidade-revista-espaco'],
  ['A (in)visibilidade das mulheres surdas: protagonismo na sociedade contemporânea', 'Dissertação', 'UFRJ · 2023', 'invisibilidade-mulheres-surdas'],
].map(([title, type, source, filename]) => ({ title, type, source, href: fromPublic(`publicacoes/${filename}.pdf`) }));
