const DEFAULT_SITE = {
  title: "Seeing Beneath Dense Forest Canopies",
  subtitle: "Under-Canopy Terrain Reconstruction in Dense Forests Using RGB Imaging and Neural 3D Reconstruction",
  venue: "WACV 2026 Workshop (CV4EO)",
  lab: "Forest Vision Lab",
  description:
    "CV4EO workshop paper from the Forest Vision Lab presenting under-canopy terrain reconstruction in dense forests.",
  authors: [],
  abstract: "",
  contributions: [],
  media: { videos: [] },
  poster: { pdf: "assets/pdfs/poster.pdf", note: "Upload poster.pdf to assets/pdfs/." },
  paper: { pdf: "assets/pdfs/paper.pdf", arxiv: "https://arxiv.org/abs/COMING_SOON", arxivStatus: "arXiv: coming this week" },
  citation: { bibtex: "" },
  acknowledgements: "",
  contact: { email: "contact@forestvisionlab.org", note: "" },
  logos: []
};

const select = (selector) => document.querySelector(selector);

const setText = (selector, value, fallback = "") => {
  const el = select(selector);
  if (el) {
    el.textContent = value ?? fallback;
  }
};

const setHref = (selector, href) => {
  const el = select(selector);
  if (el && href) {
    el.setAttribute("href", href);
  }
};

const updateMeta = (data) => {
  const title = data.title || DEFAULT_SITE.title;
  const description = data.description || DEFAULT_SITE.description;

  document.title = title;
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute("content", description);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", description);
  }
};

const renderAuthors = (authors) => {
  const container = select("#authors-list");
  if (!container) return;
  container.innerHTML = "";

  if (!authors || authors.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Author list coming soon.";
    container.appendChild(empty);
    return;
  }

  authors.forEach((author) => {
    const card = document.createElement("div");
    card.className = "author-card";

    const name = document.createElement("strong");
    name.textContent = author.name || "Author";

    const affiliation = document.createElement("span");
    affiliation.textContent = author.affiliation || "";

    card.appendChild(name);
    card.appendChild(affiliation);
    container.appendChild(card);
  });
};

const renderContributions = (items) => {
  const list = select("#contributions-list");
  if (!list) return;
  list.innerHTML = "";

  if (!items || items.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Key contributions coming soon.";
    list.appendChild(item);
    return;
  }

  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
};

const renderVideos = (videos) => {
  const grid = select("#media-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (!videos || videos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Videos will be added soon.";
    grid.appendChild(empty);
    return;
  }

  videos.slice(0, 3).forEach((video) => {
    const card = document.createElement("div");
    card.className = "media-card";

    const title = document.createElement("h3");
    title.textContent = video.title || "Video";

    const caption = document.createElement("p");
    caption.className = "muted";
    caption.textContent = video.caption || "";

    if (video.src) {
      const videoEl = document.createElement("video");
      videoEl.setAttribute("controls", "controls");
      videoEl.setAttribute("playsinline", "playsinline");
      if (video.poster) {
        videoEl.setAttribute("poster", video.poster);
      }

      const source = document.createElement("source");
      source.src = video.src;
      source.type = "video/mp4";
      videoEl.appendChild(source);

      videoEl.addEventListener("error", () => {
        videoEl.replaceWith(createMediaPlaceholder("Video coming soon."));
      });

      card.appendChild(title);
      card.appendChild(videoEl);
      card.appendChild(caption);
    } else {
      card.appendChild(title);
      card.appendChild(createMediaPlaceholder("Video coming soon."));
      card.appendChild(caption);
    }

    grid.appendChild(card);
  });
};

const createMediaPlaceholder = (text) => {
  const placeholder = document.createElement("div");
  placeholder.className = "muted";
  placeholder.textContent = text;
  return placeholder;
};

const renderLogos = (logos) => {
  const container = select("#logos");
  if (!container) return;
  container.innerHTML = "";

  if (!logos || logos.length === 0) {
    container.textContent = "";
    return;
  }

  logos.forEach((logo) => {
    if (!logo.src) return;
    const img = document.createElement("img");
    img.src = logo.src;
    img.alt = logo.alt || "Logo";
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
    });
    container.appendChild(img);
  });
};

const renderSite = (data) => {
  const site = { ...DEFAULT_SITE, ...data };

  setText("#title", site.title, DEFAULT_SITE.title);
  setText("#subtitle", site.subtitle, DEFAULT_SITE.subtitle);
  setText("#venue", site.venue, DEFAULT_SITE.venue);
  setText("#lab", site.lab, DEFAULT_SITE.lab);
  setText("#abstract-text", site.abstract, "Abstract coming soon.");
  setText("#acknowledgements-text", site.acknowledgements, "Acknowledgements coming soon.");
  setText("#contact-note", site.contact?.note || "", "");
  setText("#bibtex", site.citation?.bibtex || "BibTeX will be available soon.");

  const year = new Date().getFullYear();
  setText("#year", year.toString());

  setHref("#poster-link", site.poster?.pdf || DEFAULT_SITE.poster.pdf);
  setText("#poster-note", site.poster?.note || DEFAULT_SITE.poster.note);

  setHref("#paper-link", site.paper?.pdf || DEFAULT_SITE.paper.pdf);
  setHref("#arxiv-link", site.paper?.arxiv || DEFAULT_SITE.paper.arxiv);
  setText("#arxiv-link", site.paper?.arxivStatus || DEFAULT_SITE.paper.arxivStatus);

  setHref("#contact-email", `mailto:${site.contact?.email || DEFAULT_SITE.contact.email}`);
  setText("#contact-email", site.contact?.email || DEFAULT_SITE.contact.email);

  renderAuthors(site.authors);
  renderContributions(site.contributions);
  renderVideos(site.media?.videos);
  renderLogos(site.logos);
  updateMeta(site);
};

fetch("site.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load site.json");
    }
    return response.json();
  })
  .then((data) => {
    renderSite(data);
  })
  .catch(() => {
    renderSite(DEFAULT_SITE);
  });
