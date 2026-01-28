const DEFAULT_SITE = {
  title: "Seeing Beneath Dense Forest Canopies",
  subtitle: "Under-Canopy Terrain Reconstruction in Dense Forests Using RGB Imaging and Neural 3D Reconstruction",
  venue: "WACV 2026 Workshop (CV4EO)",
  description:
    "WACV 2026 Workshop (CV4EO) paper on under-canopy terrain reconstruction in dense forests using RGB imaging and neural 3D reconstruction.",
  authors: [],
  affiliationsNote: "",
  abstract: "",
  contributions: [],
  captureGuidelines: [],
  results: [],
  media: { videos: [] },
  poster: { title: "Poster", pdf: "", note: "Poster coming soon." },
  paper: {
    title: "Paper",
    pdf: "",
    arxiv: "https://arxiv.org/abs/COMING_SOON",
    arxivStatus: "arXiv: coming this week"
  },
  comparisons: [
    {
      id: "ex1",
      title: "Example 1 – Dense canopy",
      caption: "Original vs. peeled ground-only rendering.",
      before: "assets/img/comparisons/ex1_before.jpg",
      after: "assets/img/comparisons/ex1_after.jpg"
    }
  ],
  quickLinks: [],
  citation: { bibtex: "" },
  acknowledgements: "",
  contact: { email: "contact@forestvisionlab.org", note: "" },
  logos: [
    {
      src: "assets/img/WACV.png",
      alt: "WACV logo"
    }
  ]
};

const select = (selector) => document.querySelector(selector);

const setText = (selector, value, fallback = "") => {
  const el = select(selector);
  if (el) {
    el.textContent = value ?? fallback;
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

  const removeAffiliation = (affiliation) => {
    if (!affiliation) return "";
    return affiliation
      .replace(/Rafael Advanced Defense Systems inc\., Israel/gi, "")
      .replace(/^[,\s]+|[,\s]+$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  authors.forEach((author) => {
    const card = document.createElement("div");
    card.className = "author-card";

    const name = document.createElement("strong");
    name.textContent = author.name || "Author";

    card.appendChild(name);

    const cleanedAffiliation = removeAffiliation(author.affiliation);
    if (cleanedAffiliation) {
      const affiliation = document.createElement("span");
      affiliation.textContent = cleanedAffiliation;
      card.appendChild(affiliation);
    }
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


const renderGuidelines = (items) => {
  const list = select("#capture-guidelines");
  if (!list) return;
  list.innerHTML = "";

  if (!items || items.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Capture guidance coming soon.";
    list.appendChild(item);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    const icon = document.createElement("span");
    icon.textContent = item.icon || "✅";
    const text = document.createElement("p");
    text.textContent = item.text || "";
    li.appendChild(icon);
    li.appendChild(text);
    list.appendChild(li);
  });
};

const renderResults = (items) => {
  const container = select("#results-list");
  if (!container) return;
  container.innerHTML = "";

  if (!items || items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Results coming soon.";
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const label = document.createElement("strong");
    label.textContent = item.label || "Result";

    const value = document.createElement("span");
    value.textContent = item.value || "";

    const note = document.createElement("span");
    note.className = "muted";
    note.textContent = item.note || "";

    card.appendChild(label);
    card.appendChild(value);
    if (item.note) {
      card.appendChild(note);
    }

    container.appendChild(card);
  });
};

const createMediaPlaceholder = (text) => {
  const placeholder = document.createElement("div");
  placeholder.className = "muted";
  placeholder.textContent = text;
  return placeholder;
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

    card.appendChild(title);

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

      card.appendChild(videoEl);
    } else {
      card.appendChild(createMediaPlaceholder("Video coming soon."));
    }

    card.appendChild(caption);
    grid.appendChild(card);
  });
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

const renderQuickLinks = (links) => {
  const container = select("#quick-links");
  if (!container) return;
  container.innerHTML = "";

  if (!links || links.length === 0) {
    return;
  }

  links.forEach((link) => {
    if (!link.href || !link.label) return;
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.target = link.external ? "_blank" : "_self";
    if (link.external) {
      anchor.rel = "noopener noreferrer";
    }
    container.appendChild(anchor);
  });
};

const renderResourceCard = (containerId, resource, fallbackText) => {
  const container = select(containerId);
  if (!container) return;
  container.innerHTML = "";

  const title = document.createElement("strong");
  title.textContent = resource.title || "Resource";
  container.appendChild(title);

  if (resource.pdf) {
    const link = document.createElement("a");
    link.href = resource.pdf;
    link.textContent = resource.linkText || `Download ${resource.title || "file"}`;
    container.appendChild(link);
  } else {
    container.appendChild(createMediaPlaceholder("Coming soon."));
  }

  if (resource.note) {
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = resource.note;
    container.appendChild(note);
  }

  if (resource.arxivStatus) {
    const arxiv = document.createElement("a");
    if (resource.arxiv) {
      arxiv.href = resource.arxiv;
      arxiv.textContent = resource.arxivStatus;
      arxiv.target = "_blank";
      arxiv.rel = "noopener noreferrer";
      container.appendChild(arxiv);
    } else {
      const status = document.createElement("p");
      status.className = "muted";
      status.textContent = resource.arxivStatus;
      container.appendChild(status);
    }
  }
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("Missing image src"));
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => resolve(src))
          .catch(() => resolve(src));
        return;
      }
      resolve(src);
    };
    img.onerror = () => reject(new Error("Image failed"));
    img.src = src;
  });

const renderComparisons = (comparisons) => {
  const tabs = select("#comparison-tabs");
  const frame = select("#comparison-frame");
  const placeholder = select("#comparison-placeholder");
  const beforeImg = select("#comparison-before");
  const afterImg = select("#comparison-after");
  const handle = select("#comparison-handle");
  const knob = select("#comparison-handle .comparison-handle-knob");
  const caption = select("#comparison-caption");
  const title = select("#comparison-title");

  if (!tabs || !frame || !placeholder || !beforeImg || !afterImg) return;

  const data = comparisons && comparisons.length ? comparisons : DEFAULT_SITE.comparisons;
  tabs.innerHTML = "";
  if (!data || data.length === 0) {
    placeholder.textContent = "Comparison images coming soon.";
    frame.classList.remove("is-ready");
    return;
  }

  const setReveal = (value) => {
    const clamped = Math.min(100, Math.max(0, Number(value)));
    frame.style.setProperty("--reveal", `${clamped}%`);
    if (handle) {
      handle.style.left = `${clamped}%`;
    }
  };

  const setPlaceholder = (item) => {
    const id = item?.id || "exN";
    placeholder.textContent =
      `Comparison images coming soon. Upload ${id}_before.{jpg|png|tif|tiff} and ${id}_after.{jpg|png|tif|tiff} to /assets/img/comparisons/`;
  };

  const setActiveTab = (id) => {
    tabs.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-selected", button.dataset.id === id ? "true" : "false");
    });
  };

  const updateImages = (item) => {
    frame.classList.remove("is-ready");
    beforeImg.removeAttribute("src");
    afterImg.removeAttribute("src");
    beforeImg.setAttribute("aria-hidden", "true");
    afterImg.setAttribute("aria-hidden", "true");
    setPlaceholder(item);

    const beforeSrc = item?.before;
    const afterSrc = item?.after;
    Promise.all([loadImage(beforeSrc), loadImage(afterSrc)])
      .then(([beforeLoaded, afterLoaded]) => {
        beforeImg.src = beforeLoaded;
        afterImg.src = afterLoaded;
        beforeImg.decoding = "async";
        afterImg.decoding = "async";
        beforeImg.setAttribute("aria-hidden", "false");
        afterImg.setAttribute("aria-hidden", "false");
        frame.classList.add("is-ready");
      })
      .catch(() => {
        frame.classList.remove("is-ready");
      });
  };

  data.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.title || `Example ${index + 1}`;
    button.dataset.id = item.id || `example-${index + 1}`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.id);
      if (title) {
        title.textContent = item.title || `Example ${index + 1}`;
      }
      if (caption) {
        caption.textContent = item.caption || "";
      }
      updateImages(item);
      setReveal(50);
    });
    tabs.appendChild(button);
  });

  let isDragging = false;
  let rafId = null;
  let pendingClientX = null;
  const updateFromPointer = (clientX) => {
    pendingClientX = clientX;
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      if (pendingClientX === null) {
        rafId = null;
        return;
      }
      const rect = frame.getBoundingClientRect();
      const percent = ((pendingClientX - rect.left) / rect.width) * 100;
      setReveal(percent);
      rafId = null;
      pendingClientX = null;
    });
  };

  const dragTarget = knob || handle || frame;

  dragTarget.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    isDragging = true;
    dragTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  });

  dragTarget.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    updateFromPointer(event.clientX);
  });

  const stopDragging = (event) => {
    if (!isDragging) return;
    isDragging = false;
    if (dragTarget.hasPointerCapture(event.pointerId)) {
      dragTarget.releasePointerCapture(event.pointerId);
    }
  };

  dragTarget.addEventListener("pointerup", stopDragging);
  dragTarget.addEventListener("pointerleave", stopDragging);
  dragTarget.addEventListener("pointercancel", stopDragging);

  const initial = data[0];
  if (title) {
    title.textContent = initial.title || "Example 1";
  }
  if (caption) {
    caption.textContent = initial.caption || "";
  }
  setActiveTab(initial.id || "ex1");
  updateImages(initial);
  setReveal(50);
};

const renderSite = (data) => {
  const site = { ...DEFAULT_SITE, ...data };

  setText("#title", site.title, DEFAULT_SITE.title);
  setText("#subtitle", site.subtitle, DEFAULT_SITE.subtitle);
  setText("#venue", site.venue, DEFAULT_SITE.venue);
  setText("#abstract-text", site.abstract, "Abstract coming soon.");
  setText("#acknowledgements-text", site.acknowledgements, "Acknowledgements coming soon.");
  setText("#contact-note", site.contact?.note || "", "");
  setText("#bibtex", site.citation?.bibtex || "BibTeX will be available soon.");
  setText("#affiliations-note", site.affiliationsNote || "", "");

  const emailEl = select("#contact-email");
  if (emailEl && site.contact?.email) {
    emailEl.textContent = site.contact.email;
    emailEl.setAttribute("href", `mailto:${site.contact.email}`);
  }

  const year = new Date().getFullYear();
  setText("#year", year.toString());

  renderAuthors(site.authors);
  renderContributions(site.contributions);
  renderGuidelines(site.captureGuidelines);
  renderResults(site.results);
  renderVideos(site.media?.videos || []);
  renderLogos(site.logos);
  renderQuickLinks(site.quickLinks);
  renderResourceCard("#poster-card", site.poster || DEFAULT_SITE.poster, "Poster coming soon.");
  renderResourceCard("#paper-card", site.paper || DEFAULT_SITE.paper, "Paper coming soon.");
  renderComparisons(site.comparisons);
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
  .catch((error) => {
    console.error(error);
    renderSite(DEFAULT_SITE);
  });
