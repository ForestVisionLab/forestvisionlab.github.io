# Assets Guide

Use the folders below to keep project media organized.

## Videos
- Place MP4 files in `assets/videos/`.
- Recommended naming: `video1.mp4`, `video2.mp4`, `video3.mp4`.
- Optional poster thumbnails (JPEG/PNG) should live alongside the videos (e.g., `video1.jpg`).
- Update `site.json` under `media.videos` to point to each file.

## Logos
- Place workshop and lab logos in `assets/img/`.
- Update the `logos` array in `site.json` with each logo path and alt text.

## PDFs
- Poster: upload to `assets/pdfs/poster.pdf`.
- Paper: upload to `assets/pdfs/paper.pdf`.
- Update `site.json` if you change filenames or add links.

## Links & Text
- Edit `site.json` to update the title, subtitle, abstract, author list, and citation.
- Use the `paper.arxiv` and `paper.arxivStatus` fields for arXiv updates.
