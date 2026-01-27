# Assets Guide

Use the folders below to keep project media organized.

## Videos
- Place MP4 files in `assets/videos/`.
- Use the filenames from `site.json` (e.g., `demo1.mp4`, `demo2.mp4`, `demo3.mp4`).
- Keep files compressed and under ~200MB for GitHub Pages.
- Update `site.json` under `media.videos` to set titles, captions, and filenames.

## Logos
- Place workshop and lab logos in `assets/img/`.
- Supported formats: PNG or SVG.
- Recommended names:
  - `wacv-logo.png`
  - `cv4eo-logo.png` (optional)
  - `forestvisionlab-logo.png`
- If a logo is missing, the page hides the broken element automatically.

## PDFs
- Poster: upload to `assets/pdfs/poster.pdf`.
- Paper: upload to `assets/pdfs/paper.pdf`.
- Update `site.json` if you change filenames or add links.

## Links & Text
- Edit `site.json` to update the title, subtitle, abstract, author list, and citation.
- Use the `paper.arxiv` and `paper.arxivStatus` fields for arXiv updates.
- Quick links in the hero section are managed via the `quickLinks` array.
