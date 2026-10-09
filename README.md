# Gira Menu

Menu digital com vídeo real dos pratos. Protótipo do menu público (Next.js na Vercel).

- Menu de demonstração: `/r/tasca-do-mar`
- Detalhe do prato: `/r/tasca-do-mar/prato/<id>`
- Conteúdo (pratos, preços, traduções): `lib/menu.ts`
- Vídeos: colocar os MP4 (4:5, 5 a 6 s, sem áudio) em `public/videos/` e apontar `videoUrl` do prato para `/videos/<arquivo>.mp4`
- Cor de destaque e tokens visuais: `app/globals.css`

As imagens atuais são provisórias, geradas no Google Stitch.

```bash
npm install
npm run dev
```
