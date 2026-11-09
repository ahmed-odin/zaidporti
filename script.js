(() => {
  "use strict";
  const data = window.PORTFOLIO_CONTENT || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Populate editable content from content.js.
  $$("[data-site-name]").forEach(el => el.textContent = data.siteName || "Zaid Ali");
  $$("[data-tagline]").forEach(el => el.textContent = data.tagline || "");
  $$("[data-bio-short]").forEach(el => el.textContent = data.bioShort || "");
  $$("[data-bio]").forEach(el => el.textContent = data.bio || "");
  $("#year").textContent = new Date().getFullYear();

  const heroVideo = $(".hero-video");
  if (data.heroVideo) {
    heroVideo.innerHTML = `<source src="${escapeAttr(data.heroVideo)}" type="${data.heroVideo.toLowerCase().includes('.webm') ? 'video/webm' : 'video/mp4'}">`;
    heroVideo.poster = data.heroPoster || "assets/hero-poster.svg";
    heroVideo.load();
  }
  const aboutImg = $(".portrait-frame img");
  if (data.aboutPhoto) aboutImg.src = data.aboutPhoto;

  // Mobile navigation.
  const menuToggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  $$("#primary-nav a").forEach(link => link.addEventListener("click", closeMenu));
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  // Build portfolio cards and filters from the videos array.
  const grid = $("#video-grid");
  const emptyState = $("#empty-state");
  const filters = $$(".filter-button");
  const videos = Array.isArray(data.videos) ? data.videos : [];
  const categories = ["All", "Reels", "Edits", "Other"];
  categories.forEach(category => {
    const count = category === "All" ? videos.length : videos.filter(v => v.category === category).length;
    const countEl = $(`[data-count="${category}"]`);
    if (countEl) countEl.textContent = String(count).padStart(2, "0");
  });

  let activeFilter = "All";
  function renderVideos() {
    const visible = videos.map((video, index) => ({ ...video, index }))
      .filter(video => activeFilter === "All" || video.category === activeFilter);
    grid.innerHTML = "";
    emptyState.hidden = visible.length > 0;
    visible.forEach(video => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "video-card reveal is-visible";
      card.setAttribute("aria-label", `Play ${video.title || "portfolio video"}`);
      card.innerHTML = `
        <span class="thumbnail-wrap">
          <img src="${escapeAttr(video.thumbnail || "assets/hero-poster.svg")}" alt="${escapeAttr(video.alt || video.title || "Video thumbnail")}" loading="lazy">
          <span class="play-button" aria-hidden="true"><span>▶</span></span>
          <span class="card-index">${String(video.index + 1).padStart(2, "0")}</span>
        </span>
        <span class="video-card-info"><span class="video-card-title">${escapeHTML(video.title || "Untitled project")}</span><span class="video-card-meta"><span class="category-tag">${escapeHTML(video.category || "Other")}</span><span class="card-arrow" aria-hidden="true">↗</span></span></span>`;
      card.addEventListener("click", () => openVideo(video));
      grid.appendChild(card);
    });
  }
  filters.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderVideos();
  }));
  renderVideos();

  // Accessible video modal. Native dialog supports ESC and focus management.
  const modal = $("#video-modal");
  const player = $("#modal-player");
  const modalTitle = $("#modal-title");
  function openVideo(video) {
    modalTitle.textContent = video.title || "Now playing";
    player.innerHTML = "";
    const embed = getEmbed(video.video || "");
    if (embed.type === "iframe") {
      const iframe = document.createElement("iframe");
      iframe.src = embed.src;
      iframe.title = video.title || "Portfolio video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      player.appendChild(iframe);
    } else {
      const media = document.createElement("video");
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
      media.preload = "metadata";
      media.src = embed.src;
      player.appendChild(media);
      media.play().catch(() => {});
    }
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    $(".modal-close").focus();
  }
  function closeVideo() {
    const media = $("video, iframe", player);
    if (media && media.tagName === "VIDEO") { media.pause(); media.removeAttribute("src"); media.load(); }
    player.innerHTML = "";
    if (modal.open) modal.close();
    else modal.removeAttribute("open");
  }
  $(".modal-close").addEventListener("click", closeVideo);
  modal.addEventListener("click", event => { if (event.target === modal) closeVideo(); });
  modal.addEventListener("close", () => { player.innerHTML = ""; });

  function getEmbed(url) {
    try {
      const parsed = new URL(url, window.location.href);
      const host = parsed.hostname.replace(/^www\./, "");
      if (host === "youtu.be") return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(parsed.pathname.slice(1))}?autoplay=1&rel=0` };
      if (host.endsWith("youtube.com")) {
        const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
        if (id && id !== "embed") return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0` };
        if (parsed.pathname.includes("/embed/")) return { type: "iframe", src: url };
      }
      if (host === "vimeo.com" || host === "player.vimeo.com") {
        const id = parsed.pathname.split("/").filter(Boolean).pop();
        if (id) return { type: "iframe", src: `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1` };
      }
      return { type: "video", src: url };
    } catch {
      return { type: "video", src: url };
    }
  }

  // About skills and stat tiles.
  const skillsList = $("#skills-list");
  (data.skills || []).forEach(skill => {
    const chip = document.createElement("span");
    chip.className = "skill-chip";
    chip.textContent = skill;
    skillsList.appendChild(chip);
  });
  const statsGrid = $("#stats-grid");
  (data.stats || []).forEach(stat => {
    const item = document.createElement("div");
    item.className = "stat-card";
    item.innerHTML = `<strong>${escapeHTML(stat.value)}</strong><span>${escapeHTML(stat.label)}</span>`;
    statsGrid.appendChild(item);
  });

  // Social links.
  const directLinks = $("#direct-links");
  (data.socials || []).forEach(social => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = social.url.startsWith("mailto:") ? "_self" : "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = `<span>${escapeHTML(social.label)}</span><span>${escapeHTML(social.handle || "Visit")} ↗</span>`;
    directLinks.appendChild(link);
  });
  $$("[data-instagram]").forEach(link => link.href = data.instagram || "https://www.instagram.com/zaidali.x/");

  // Contact form: validates locally, then posts to Formspree if endpoint is configured.
  const form = $("#contact-form");
  const feedback = $("#form-feedback");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "";
    feedback.className = "form-feedback";
    if (!form.reportValidity()) return;
    const submit = $(".submit-button", form);
    submit.disabled = true;
    submit.innerHTML = "Sending…";
    try {
      if (!data.formEndpoint || !/^https:\/\/formspree\.io\/f\//.test(data.formEndpoint)) {
        feedback.textContent = "The form is ready, but it isn't connected yet. Add your Formspree endpoint in content.js to receive messages.";
        feedback.classList.add("is-note");
        return;
      }
      const response = await fetch(data.formEndpoint, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      feedback.textContent = "Message sent — thanks for reaching out. I'll be in touch soon!";
      feedback.classList.add("is-success");
    } catch {
      feedback.textContent = "Something went wrong. Please try again or email me directly.";
      feedback.classList.add("is-error");
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    }
  });

  // Subtle entrance effects; content remains visible if reduced motion is requested.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function escapeAttr(value) { return escapeHTML(value); }
})();
