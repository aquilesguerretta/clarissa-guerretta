import { images } from './images.js';
import { sitePath as fromPublic } from './sitePath.js';

const photo = (id) => images.find((image) => image.id === id);

export const email = 'clarissaguerretta@letras.ufrj.br';
export const profile = 'https://sopa-lab.wixsite.com/sopa/perfil/clarissa';

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
  poster: fromPublic(photo('photo-74').src),
  linkLabel: 'Assistir no Google Drive',
};

const linkedVideos = [
  {
    videoId: 'UP49XbBczik', file: 'entrevista-librascast-11', group: 'entrevistas', category: 'Entrevistas',
    title: 'LibrasCast #11 Clarissa Guerretta', source: 'LibrasCast',
    description: 'Conversei com Alicy Queiroz e Guilherme Andrade no LibrasCast.',
  },
  {
    videoId: '2BUze8U1WGY', file: 'entrevista-cafe-com-pimenta', group: 'entrevistas', category: 'Entrevistas',
    title: 'Clarissa Guerretta – Café com Pimenta (TV INES / Libras)', source: 'TV INES', topics: ['tv', 'bastidores'],
    description: 'Contei sobre minha trajetória e os bastidores da minha cobertura da Copa do Mundo.',
  },
  {
    videoId: '32bWcEEchLw', file: 'entrevista-desafio-profissao', group: 'entrevistas', category: 'Entrevistas',
    title: 'Desafio Profissão – Bacharel/Licenciado em Letras-Libras', source: 'TVPUC',
    description: 'Participei de uma conversa sobre a formação em Letras-Libras.',
  },
  {
    videoId: 'aeSsqounDwI', file: 'palestra-saberes-surdos-2018', group: 'eventos', category: 'Palestras e eventos',
    title: 'Saberes surdos e conhecimentos humanos', source: 'Fórum do INES · 2018',
    description: 'Apresentei esta palestra na 3ª edição do Fórum de 2018.',
  },
  {
    videoId: 'uwDbDNUd0O8', file: 'palestra-didatica-libras-2017', group: 'eventos', category: 'Palestras e eventos',
    title: 'Didática de Ensino de Libras como L2', source: 'Fórum do INES · 2017',
    description: 'Participei da 6ª edição do Fórum de 2017 com uma palestra sobre o ensino de Libras como segunda língua.',
  },
  {
    videoId: 'dLFXzBFsewc', file: 'entrevista-andre-isac', group: 'entrevistas', category: 'Entrevistas',
    title: 'André Isac entrevista com Clarissa Guerretta da TV INES', source: 'André Isac', topics: ['tv', 'esporte'],
  },
].map(({ videoId, file, ...item }) => ({
  ...item,
  kind: 'video',
  href: `https://www.youtube.com/watch?v=${videoId}`,
  poster: fromPublic(`acervo/imagens/${file}.webp`),
  linkLabel: 'Assistir no YouTube',
}));

const press = [
  {
    title: 'O primeiro telejornal para surdos no Brasil está no ar', source: 'ABI', group: 'tv',
    href: 'https://www.abi.org.br/primeiro-telejornal-para-surdos-ja-esta-no-ar/',
    description: 'A ABI registrou a estreia do Primeira Mão, que apresentei na TV INES.',
  },
  {
    title: 'Programa 100% bilíngue ajuda universitários com deficiência auditiva', source: 'Extra', group: 'tv',
    href: 'https://extra.globo.com/noticias/educacao/vida-de-calouro/programa-100-bilingue-ajuda-universitarios-com-deficiencia-auditiva-20707038.html',
  },
  {
    title: 'Telejornal apresenta notícias em Libras e na língua portuguesa', source: 'Estadão', group: 'tv',
    href: 'https://www.estadao.com.br/brasil/vencer-limites/telejornal-apresenta-noticias-em-libras-e-na-lingua-portuguesa/',
    description: 'O Estadão apresentou o Primeira Mão, telejornal bilíngue que apresentei na TV INES.',
  },
  {
    title: 'Em clima de Natal', source: 'TV Brasil', group: 'entrevistas', file: 'midia-tv-brasil-natal',
    href: 'https://tvbrasil.ebc.com.br/programaespecial/episodio/em-clima-de-natal',
    description: 'Recebi o Programa Especial para mostrar sinais de Natal em Libras.',
  },
  {
    title: 'Uma vitória silenciosa', source: '#Colabora', group: 'esporte', file: 'midia-colabora-vitoria-silenciosa', topics: ['bastidores'],
    href: 'https://projetocolabora.com.br/ods1/uma-vitoria-silenciosa/',
    description: 'A reportagem acompanha minha trajetória e os bastidores da cobertura da Rio 2016.',
  },
  {
    title: 'Como cada jogador da Seleção é retratado na língua de sinais', source: 'Época', group: 'esporte',
    href: 'https://epoca.globo.com/vida/copa-do-mundo-2014/noticia/2014/06/como-cada-bjogador-da-selecaob-e-retratado-na-blingua-de-sinaisb.html',
    description: 'A reportagem acompanha meu trabalho na cobertura da Seleção pela TV INES na Copa de 2014.',
  },
].map(({ file, ...item }) => ({
  ...item,
  kind: 'press',
  category: 'Na mídia',
  poster: file ? fromPublic(`acervo/imagens/${file}.webp`) : undefined,
  linkLabel: 'Abrir no site',
}));

export const media = [
  ...linkedVideos,
  ...press,
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
