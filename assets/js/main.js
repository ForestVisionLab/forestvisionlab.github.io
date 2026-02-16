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
  paper: {
    title: "Paper",
    pdf: "",
    arxiv: "https://arxiv.org/abs/2601.22861",
    arxivStatus: "arXiv: 2601.22861"
  },
  comparisons: [
    {
      id: "ex1",
      tabLabel: "Example 1 — AOS Dataset",
      title: "Dense canopy",
      caption: "Original vs. peeled ground-only rendering.",
      before: "assets/img/comparisons/ex1_before.jpg",
      after: "assets/img/comparisons/ex1_after.jpg"
    },
    {
      id: "before1",
      tabLabel: "Example 2 — Pine forest example",
      title: "Pinecone peeling",
      caption: "Before and after peeling comparison.",
      before: "assets/img/comparisons/befor1.png",
      after: "assets/img/comparisons/after1.png",
      zoom: 1.45,
      focalPoint: "50% 50%",
      offsetY: -22
    }
  ],
  quickLinks: [{ label: "Method Overview", href: "#pipeline", external: false }],
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

  const affiliationMap = new Map();
  const authorEntries = authors.map((author) => {
    const cleanedAffiliation = removeAffiliation(author.affiliation);
    if (cleanedAffiliation) {
      if (!affiliationMap.has(cleanedAffiliation)) {
        affiliationMap.set(cleanedAffiliation, affiliationMap.size + 1);
      }
    }
    return {
      name: author.name || "Author",
      affiliation: cleanedAffiliation
    };
  });

  authorEntries.forEach((author, index) => {
    const name = document.createElement("span");
    name.className = "author-chip";
    name.textContent = author.name;

    const affiliationIndex = author.affiliation ? affiliationMap.get(author.affiliation) : null;
    if (affiliationIndex) {
      const sup = document.createElement("sup");
      sup.textContent = `${affiliationIndex}`;
      name.appendChild(sup);
    }

    container.appendChild(name);

    if (index < authorEntries.length - 1) {
      const separator = document.createElement("span");
      separator.textContent = "•";
      separator.className = "muted";
      container.appendChild(separator);
    }
  });

  const affiliationsNote = select("#affiliations-note");
  if (!affiliationsNote) return;

  if (affiliationMap.size === 0) {
    affiliationsNote.textContent = "";
    return;
  }

  const affiliationsLine = Array.from(affiliationMap.entries())
    .map(([affiliation, index]) => `${index} ${affiliation}`)
    .join(" · ");
  affiliationsNote.textContent = affiliationsLine;
};

const renderHeroAuthors = (authors) => {
  const container = select("#hero-authors");
  if (!container) return;
  container.innerHTML = "";

  if (!authors || authors.length === 0) {
    return;
  }

  authors.forEach((author, index) => {
    const name = document.createElement("span");
    name.className = "author-link";
    name.textContent = author.name || "Author";
    name.dataset.author = author.name || "Author";
    container.appendChild(name);

    if (index < authors.length - 1) {
      const separator = document.createElement("span");
      separator.textContent = "•";
      separator.className = "muted";
      container.appendChild(separator);
    }
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

    card.appendChild(title);

    if (video.src) {
      const videoWrap = document.createElement("div");
      videoWrap.className = "video-wrap";

      const videoFrame = document.createElement("div");
      videoFrame.className = "video-frame";

      if (video.overlayLabels) {
        const overlay = document.createElement("div");
        overlay.className = "video-overlay";

        const left = document.createElement("span");
        left.className = "tag left";
        left.textContent = video.overlayLabels.left || "";

        const center = document.createElement("span");
        center.className = "tag center";
        center.textContent = video.overlayLabels.center || "";

        const right = document.createElement("span");
        right.className = "tag right";
        right.textContent = video.overlayLabels.right || "";

        overlay.appendChild(left);
        overlay.appendChild(center);
        overlay.appendChild(right);
        videoFrame.appendChild(overlay);
      }

      const videoEl = document.createElement("video");
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.preload = "metadata";
      if (video.poster) {
        videoEl.setAttribute("poster", video.poster);
      }

      const source = document.createElement("source");
      source.src = video.src;
      source.type = "video/mp4";
      videoEl.appendChild(source);

      videoEl.addEventListener("error", () => {
        videoWrap.replaceWith(createMediaPlaceholder("Video coming soon."));
      });

      const tryAutoPlay = () => {
        const playAttempt = videoEl.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => {
            videoEl.controls = true;
          });
        }
      };

      videoEl.addEventListener("loadedmetadata", tryAutoPlay, { once: true });
      videoEl.addEventListener("canplay", tryAutoPlay, { once: true });

      videoFrame.appendChild(videoEl);
      videoWrap.appendChild(videoFrame);
      card.appendChild(videoWrap);
    } else {
      card.appendChild(createMediaPlaceholder("Video coming soon."));
    }

    if (video.caption) {
      const caption = document.createElement("p");
      caption.className = "muted";
      caption.textContent = video.caption;
      card.appendChild(caption);
    }

    if (video.description) {
      const description = document.createElement("p");
      description.className = "media-description";
      description.textContent = video.description;
      card.appendChild(description);
    }
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

const imageLoadCache = new Map();

const loadImage = (src, priority = "auto") => {
  if (!src) {
    return Promise.reject(new Error("Missing image src"));
  }

  if (imageLoadCache.has(src)) {
    return imageLoadCache.get(src);
  }

  const loadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    if ("fetchPriority" in img) {
      img.fetchPriority = priority;
    }
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
    img.onerror = () => {
      imageLoadCache.delete(src);
      reject(new Error("Image failed"));
    };
    img.src = src;
  });

  imageLoadCache.set(src, loadPromise);
  return loadPromise;
};

const renderComparisons = (comparisons) => {
  const tabs = select("#comparison-tabs");
  const frame = select("#comparison-frame");
  const placeholder = select("#comparison-placeholder");
  const beforeImg = select("#comparison-before");
  const afterImg = select("#comparison-after");
  const slider = select("#comparison-slider");
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

  const [initialComparison, ...remainingComparisons] = data;
  if (initialComparison?.before) {
    loadImage(initialComparison.before, "high").catch(() => {});
  }
  if (initialComparison?.after) {
    loadImage(initialComparison.after, "high").catch(() => {});
  }
  remainingComparisons.forEach((comparison) => {
    if (comparison.before) {
      loadImage(comparison.before).catch(() => {});
    }
    if (comparison.after) {
      loadImage(comparison.after).catch(() => {});
    }
  });

  const setReveal = (value) => {
    const clamped = Math.min(100, Math.max(0, Number(value)));
    frame.style.setProperty("--reveal", `${clamped}%`);
    if (slider) {
      slider.value = `${clamped}`;
    }
  };

  const setPlaceholder = (item) => {
    const id = item?.id || "exN";
    placeholder.textContent =
      `Comparison images coming soon. Upload ${id}_before.{jpg|png|tif|tiff} and ${id}_after.{jpg|png|tif|tiff} to /assets/img/comparisons/`;
  };

  const applyImageView = (item) => {
    const zoom = Number(item?.zoom) > 1 ? Number(item.zoom) : 1;
    const focalPoint = item?.focalPoint || "50% 15%";
    const offsetY = Number(item?.offsetY) || 0;
    [beforeImg, afterImg].forEach((img) => {
      img.style.objectPosition = focalPoint;
      img.style.transformOrigin = "center center";
      img.style.transform = `translate3d(0, ${offsetY}%, 0) scale(${zoom})`;
    });
  };

  const setActiveTab = (id) => {
    tabs.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-selected", button.dataset.id === id ? "true" : "false");
    });
  };

  const updateImages = (item) => {
    applyImageView(item);
    frame.classList.remove("is-ready");
    beforeImg.removeAttribute("src");
    afterImg.removeAttribute("src");
    beforeImg.setAttribute("aria-hidden", "true");
    afterImg.setAttribute("aria-hidden", "true");
    setPlaceholder(item);

    const beforeSrc = item?.before;
    const afterSrc = item?.after;
    Promise.all([loadImage(beforeSrc, "high"), loadImage(afterSrc, "high")])
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
    button.textContent = item.tabLabel || item.title || `Example ${index + 1}`;
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
      setReveal(100);
    });
    tabs.appendChild(button);
  });

  if (slider) {
    slider.addEventListener("input", (event) => {
      setReveal(event.target.value);
    });
  }

  const initial = data[0];
  if (title) {
    title.textContent = initial.title || "Example 1 — AOS Dataset";
  }
  if (caption) {
    caption.textContent = initial.caption || "";
  }
  setActiveTab(initial.id || "ex1");
  updateImages(initial);
  setReveal(100);
};


let citationText = "";

const setupCitationCopy = () => {
  const copyButton = select("#copy-bibtex");
  const bibtex = select("#bibtex");
  if (!copyButton || !bibtex) {
    return;
  }

  const defaultLabel = "Copy citation";
  const copiedLabel = "Copied!";
  let resetTimer;

  const setCopiedState = () => {
    copyButton.classList.add("is-success");
    copyButton.setAttribute("aria-label", copiedLabel);
    copyButton.setAttribute("title", copiedLabel);
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copyButton.classList.remove("is-success");
      copyButton.setAttribute("aria-label", defaultLabel);
      copyButton.setAttribute("title", defaultLabel);
    }, 1200);
  };

  const fallbackCopyText = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) {
      throw new Error("Fallback copy failed");
    }
  };

  const manualSelectFallback = () => {
    const selection = window.getSelection();
    if (!selection) {
      throw new Error("Selection API unavailable");
    }

    const range = document.createRange();
    range.selectNodeContents(bibtex);
    selection.removeAllRanges();
    selection.addRange(range);

    const copied = document.execCommand("copy");
    selection.removeAllRanges();
    if (!copied) {
      throw new Error("Manual selection copy failed");
    }
  };

  copyButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const text = citationText || bibtex.textContent || "";
    if (!text.trim()) {
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        try {
          fallbackCopyText(text);
        } catch (fallbackError) {
          manualSelectFallback();
        }
      }
      setCopiedState();
    } catch (error) {
      console.error("Failed to copy citation", error);
    }
  });
};

const renderSite = (data) => {
  const site = { ...DEFAULT_SITE, ...data };

  setText("#title", site.title, DEFAULT_SITE.title);
  setText("#subtitle", site.subtitle, DEFAULT_SITE.subtitle);
  setText("#venue", site.venue, DEFAULT_SITE.venue);
  setText("#abstract-text", site.abstract, "Abstract coming soon.");
  setText("#acknowledgements-text", site.acknowledgements, "Acknowledgements coming soon.");
  setText("#contact-note", site.contact?.note || "", "");
  citationText = site.citation?.bibtex || "BibTeX will be available soon.";
  setText("#bibtex", citationText);

  const emailEl = select("#contact-email");
  if (emailEl && site.contact?.email) {
    emailEl.textContent = site.contact.email;
    emailEl.setAttribute("href", `mailto:${site.contact.email}`);
  }

  const year = new Date().getFullYear();
  setText("#year", year.toString());

  renderAuthors(site.authors);
  renderHeroAuthors(site.authors);
  const affiliationsNote = select("#affiliations-note");
  if (affiliationsNote && site.affiliationsNote && !affiliationsNote.textContent) {
    affiliationsNote.textContent = site.affiliationsNote;
  }
  renderContributions(site.contributions);
  renderGuidelines(site.captureGuidelines);
  renderResults(site.results);
  renderVideos(site.media?.videos || []);
  renderLogos(site.logos);
  renderQuickLinks(site.quickLinks);
  renderResourceCard("#paper-card", site.paper || DEFAULT_SITE.paper, "Paper coming soon.");
  renderComparisons(site.comparisons);
  updateMeta(site);
  setupCitationCopy();
};

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    return;
  }

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  });
});

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
