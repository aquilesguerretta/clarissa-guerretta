# Portfólio de Clarissa Guerretta

O portfólio tem cinco páginas em português. Na abertura, a composição animada reúne fotografias do acervo e capas de publicações. O botão **Me veja em Libras** abre a apresentação original da 100ª edição do telejornal Primeira Mão, da TV INES.

## Rodar localmente

Use Node.js 22.12 ou mais recente. Na pasta do projeto, rode:

```sh
npm ci
npm run dev
```

`npm run build` gera o site estático em `dist/`. `npm run preview` serve essa versão para conferência.

## Publicar

O workflow em `.github/workflows/pages.yml` publica o site no GitHub Pages a cada push na branch `main`. O caminho de publicação vem da configuração do Pages e o ambiente local usa `/`.

## Atualizar o conteúdo

- Edite `src/content.js` para atualizar os vídeos, as publicações, o contato e os textos de atuação.
- Edite `src/AcademicTrajectory.jsx` para atualizar a formação, a pesquisa, a atuação institucional e os perfis externos.
- Edite `src/images.js` para ajustar os títulos, as descrições acessíveis e os temas das imagens.
- Coloque os arquivos de mídia em `public/acervo/` e os PDFs em `public/publicacoes/`. Cada publicação usa uma imagem WebP em `public/capas/` com o mesmo nome-base do PDF.
- A animação da abertura usa `public/acervo/destaque/abertura-motion.mp4` e `abertura-motion.webp`. A gravação em Libras usa `clarissa-em-libras.mp4` e `clarissa-em-libras.webp` na mesma pasta.

O vídeo do RioContentMarket abre no Google Drive, com as permissões do arquivo original.
