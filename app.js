/* ============================================================================
 *  MOHAMMED SULTAN THE SERIES — app logic
 *  Reads ALL content from the PORTFOLIO object in data.js.
 *  Animations use GSAP when available and degrade gracefully when offline.
 * ========================================================================== */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const hasGsap = typeof window.gsap !== "undefined";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTODO = (v) => typeof v === "string" && v.trim().toUpperCase().startsWith("TODO");

  const escapeHtml = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  if (typeof PORTFOLIO === "undefined") {
    document.body.innerHTML =
      '<p style="padding:40px;font-family:sans-serif">Missing <code>data.js</code> — PORTFOLIO object not found.</p>';
    return;
  }
  const D = PORTFOLIO;
  let activeProfile = D.profiles[0];

  /* Dark, cinematic gradient art per tile (pure CSS, no images) */
  const ART_GRADIENTS = [
    "linear-gradient(135deg,#5c0a0e 0%,#1a1a1a 70%)",
    "linear-gradient(135deg,#0a2a5c 0%,#101418 70%)",
    "linear-gradient(135deg,#0e4d2a 0%,#101410 70%)",
    "linear-gradient(135deg,#3d0a5c 0%,#14101a 70%)",
    "linear-gradient(135deg,#5c3a0a 0%,#181410 70%)",
    "linear-gradient(135deg,#0a4d5c 0%,#10181a 70%)",
    "linear-gradient(135deg,#4d0a2e 0%,#181014 70%)",
    "linear-gradient(135deg,#2e2e2e 0%,#0c0c0c 70%)",
  ];
  const artFor = (i) => ART_GRADIENTS[i % ART_GRADIENTS.length];
  const initialOf = (s) => (String(s || "?").replace(/^TODO:\s*/i, "").trim().charAt(0) || "?").toUpperCase();

  const levelLabel = (id) => {
    const found = (D.skillLevels || []).find((l) => l.id === id);
    return found ? found.label : id;
  };

  /* ---------- screen flow ---------- */
  const screens = ["loader", "titlecard", "profiles", "app"];
  function showScreen(id) {
    screens.forEach((s) => {
      const el = document.getElementById(s);
      if (!el) return;
      if (s === id) {
        el.hidden = false;
        el.classList.add("active");
      } else {
        el.classList.remove("active");
        if (s === "app") el.hidden = true;
      }
    });
    window.scrollTo(0, 0);
  }

  function runLoader(done) {
    const fill = $("#loaderBarFill");
    const n = $("#loaderN");
    if (!hasGsap || reduceMotion) {
      setTimeout(done, reduceMotion ? 200 : 1600);
      return;
    }
    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo(n, { scale: 0.55, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
      .to(fill, { width: "100%", duration: 1.5, ease: "power2.inOut" }, "-=0.3")
      .to("#loader", { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.15");
  }

  function runTitleCard(done) {
    const title = $("#titleMain");
    const raw = title.textContent;
    title.innerHTML = raw
      .split("")
      .map((ch) => `<span class="tc-char" style="display:inline-block">${ch === " " ? "&nbsp;" : escapeHtml(ch)}</span>`)
      .join("");
    // paint the first word ("MOHAMMED") red
    const firstSpace = raw.indexOf(" ");
    $$(".tc-char", title).forEach((sp, i) => {
      if (firstSpace === -1 || i < firstSpace) sp.classList.add("red");
    });
    if (!hasGsap || reduceMotion) {
      setTimeout(done, reduceMotion ? 200 : 1800);
      return;
    }
    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo("#titleKicker", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".tc-char", { opacity: 0, y: 46, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.045, ease: "power3.out" }, "-=0.2")
      .fromTo(".titlecard-sub", { opacity: 0, letterSpacing: "20px" }, { opacity: 1, letterSpacing: "10px", duration: 0.8 }, "-=0.3")
      .to("#titlecard", { opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.9");
  }

  /* ---------- profiles ---------- */
  function renderProfiles() {
    const grid = $("#profileGrid");
    grid.innerHTML = "";
    D.profiles.forEach((p) => {
      const btn = document.createElement("button");
      btn.className = "profile-card";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-label", "Watch as " + p.label);
      btn.innerHTML =
        `<div class="profile-avatar" style="background:linear-gradient(135deg, ${p.accent}, #1a1a1a)">${escapeHtml(p.initial)}</div>` +
        `<div class="profile-name">${escapeHtml(p.label)}</div>` +
        `<div class="profile-blurb">${escapeHtml(p.blurb)}</div>`;
      btn.addEventListener("click", () => selectProfile(p));
      grid.appendChild(btn);
    });
    grid.addEventListener("keydown", (e) => {
      const cards = $$(".profile-card", grid);
      const idx = cards.indexOf(document.activeElement);
      if (e.key === "ArrowRight") { e.preventDefault(); cards[(idx + 1) % cards.length].focus(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); cards[(idx - 1 + cards.length) % cards.length].focus(); }
    });
    const first = $(".profile-card", grid);
    if (first) first.focus();
  }

  function selectProfile(p) {
    activeProfile = p;
    $("#profileBadgeInitial").textContent = p.initial;
    $("#profileBadge").style.background = `linear-gradient(135deg, ${p.accent}, #1a1a1a)`;
    enterApp();
  }

  /* ---------- hero ---------- */
  function renderHero() {
    const prof = D.profile;
    $("#heroKicker").textContent = prof.heroKicker;
    $("#heroTitle").textContent = prof.heroTitle;
    $("#heroAvatarInitial").textContent = prof.avatarInitial;
    const desc =
      activeProfile.heroEmphasis && !isTODO(activeProfile.heroEmphasis)
        ? activeProfile.heroEmphasis
        : prof.heroDescription;
    $("#heroDesc").textContent = desc;
    $("#heroMeta").innerHTML =
      `<span>${escapeHtml(prof.heroMetaYear)}</span>` +
      prof.heroMetaTags.map((t) => `<span class="meta-tag">${escapeHtml(t)}</span>`).join("") +
      `<span class="meta-tag">HD</span>`;
    if (hasGsap && !reduceMotion) {
      gsap.fromTo(".hero-content > *", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.15 });
      gsap.fromTo(".hero-avatar", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.4)", delay: 0.4 });
    }
  }

  /* ---------- tiles & rails ---------- */
  function tileHTML(kind, item, i) {
    let title = "", tagline = "", meta = "", extraAttr = "";
    if (kind === "story") {
      title = item.title; tagline = item.tagline;
      meta = `<span class="match">New</span><span>${escapeHtml(item.meta[0] || "")}</span><span>${escapeHtml(item.meta[1] || "")}</span>`;
    } else if (kind === "skillcat") {
      title = item.label; tagline = item.count + " skills";
      meta = `<span class="match">${escapeHtml(item.top)}</span>`;
    } else if (kind === "services") {
      title = item.title; tagline = item.tagline;
      meta = `<span class="match">Service</span>`;
    } else if (kind === "project") {
      title = item.title; tagline = item.tagline;
      meta = `<span class="match">${escapeHtml(item.status)}</span>`;
      extraAttr = ` data-status="${escapeHtml(item.status)}"`;
    } else if (kind === "journey") {
      title = item.area; tagline = item.detail;
      meta = `<span class="match">Experience</span>`;
    }
    return (
      `<button class="tile" data-kind="${kind}" data-index="${i}"${extraAttr} aria-label="${escapeHtml(title)} — open details">` +
      `<div class="tile-art" style="background:${artFor(i)}">` +
      (kind === "project" ? `<span class="tile-badge">ORIGINAL</span>` : "") +
      `<span>${escapeHtml(initialOf(title))}</span></div>` +
      `<div class="tile-info"><div class="tile-title">${escapeHtml(title)}</div>` +
      `<div class="tile-tagline">${escapeHtml(tagline)}</div>` +
      `<div class="tile-meta">${meta}</div></div></button>`
    );
  }

  function railData(kind) {
    if (kind === "story") return D.fullStory.map((s, i) => ({ kind, i }));
    if (kind === "skillcat") {
      const cats = D.skills;
      return Object.keys(cats).map((key) => ({
        kind,
        label: D.skillCategoryLabels[key] || key,
        count: cats[key].length,
        top: cats[key].slice(0, 3).map((s) => s.name).join(" · "),
        key,
      }));
    }
    if (kind === "services") return D.services.map((s, i) => ({ kind, i }));
    if (kind === "project") return D.projects.map((p, i) => ({ kind, i }));
    if (kind === "journey") return D.experienceAreas.map((t, i) => ({ kind, i }));
    return [];
  }

  function tileItem(kind, i, extra) {
    if (kind === "story") return D.fullStory[i];
    if (kind === "skillcat") return extra;
    if (kind === "services") return D.services[i];
    if (kind === "project") return D.projects[i];
    if (kind === "journey") return D.experienceAreas[i];
    return null;
  }

  function buildRails() {
    const host = $("#rails");
    host.innerHTML = "";
    const kinds = ["story", "skillcat", "services", "project", "journey"];
    D.rails.forEach((rail) => {
      const kind = kinds[D.rails.indexOf(rail)];
      const items = railData(kind);
      const section = document.createElement("section");
      section.className = "rail";
      section.id = "rail-" + rail.id;
      section.setAttribute("aria-label", rail.title);
      section.innerHTML =
        `<div class="rail-head"><div><h2 class="rail-title">${escapeHtml(rail.title)}</h2>` +
        `<p class="rail-sub">${escapeHtml(rail.subtitle)}</p></div>` +
        (kind === "project" ? `<div class="filters" role="group" aria-label="Filter projects"></div>` : "") +
        `</div>` +
        `<div class="rail-wrap"><button class="rail-btn left" aria-label="Scroll left">‹</button>` +
        `<div class="rail-track" tabindex="0" aria-label="${escapeHtml(rail.title)} — scrollable row"></div>` +
        `<button class="rail-btn right" aria-label="Scroll right">›</button></div>`;
      const track = $(".rail-track", section);
      items.forEach((it, i) => {
        const data = tileItem(kind, it.i, it);
        const wrap = document.createElement("div");
        wrap.innerHTML = tileHTML(kind, data, i);
        const tile = wrap.firstChild;
        tile.addEventListener("click", () => openModal(kind, data, i));
        track.appendChild(tile);
      });
      // project status filters
      if (kind === "project") {
        const filterHost = $(".filters", section);
        D.projectFilters.forEach((f, fi) => {
          const b = document.createElement("button");
          b.className = "filter-btn" + (fi === 0 ? " active" : "");
          b.textContent = f;
          b.setAttribute("aria-pressed", fi === 0 ? "true" : "false");
          b.addEventListener("click", () => {
            $$(".filter-btn", filterHost).forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
            b.classList.add("active");
            b.setAttribute("aria-pressed", "true");
            $$(".tile", track).forEach((t) => {
              const show = f === "All" || t.getAttribute("data-status") === f;
              t.style.display = show ? "" : "none";
            });
          });
          filterHost.appendChild(b);
        });
        const note = document.createElement("p");
        note.className = "rail-note";
        note.textContent = D.projectStatusNote;
        section.appendChild(note);
      }
      const step = () => Math.max(track.clientWidth * 0.8, 300);
      $(".rail-btn.left", section).addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      $(".rail-btn.right", section).addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" && e.target === track) { e.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
        if (e.key === "ArrowLeft" && e.target === track) { e.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
      });
      host.appendChild(section);
    });
  }

  /* ---------- modal ---------- */
  const overlay = $("#modalOverlay");
  let lastFocused = null;

  function openModal(kind, item, i) {
    lastFocused = document.activeElement;
    const kickerMap = {
      story: "THE FULL STORY",
      skillcat: "MY SKILL UNIVERSE",
      services: "SERVICE SPOTLIGHT",
      project: "SULTANFLIX ORIGINAL",
      journey: "MY JOURNEY",
    };
    $("#modalKicker").textContent = kickerMap[kind] || "";
    $("#modalArt").style.background = artFor(i);
    const extra = $("#modalExtra");
    extra.innerHTML = "";
    let title = "", metaHTML = "", desc = "";

    if (kind === "story") {
      title = item.title;
      metaHTML = item.meta.map((m) => `<span class="meta-tag">${escapeHtml(m)}</span>`).join("");
      desc = item.description;
      extra.innerHTML =
        `<h4>FULL BIOGRAPHY</h4>` +
        D.profile.aboutLong.map((p) => `<p class="bio-para">${escapeHtml(p)}</p>`).join("") +
        `<p class="bio-note">${escapeHtml(D.profile.learningNote)}</p>`;
    } else if (kind === "skillcat") {
      const skills = D.skills[item.key] || [];
      title = item.label;
      metaHTML = `<span class="meta-tag">${skills.length} skills</span>`;
      desc = "Honestly labelled — " + (D.skillLevels || []).map((l) => `${l.label}: ${l.meaning}`).join(" ");
      extra.innerHTML = skills.map((s) =>
        `<div class="skill-pill-row"><span class="skill-name">${escapeHtml(s.name)}</span>` +
        `<span class="level-pill level-${s.level}">${escapeHtml(levelLabel(s.level))}</span></div>`
      ).join("");
    } else if (kind === "services") {
      title = item.title;
      metaHTML = `<span class="meta-tag">Service</span>`;
      desc = item.tagline + "\n\n" + item.description;
      extra.innerHTML =
        `<button class="modal-link" data-scrollto="#finale">Discuss a Project →</button>` +
        `<p class="honest-note">Services are offered according to real capabilities — not presented as certified or fully developed offerings.</p>`;
    } else if (kind === "project") {
      title = item.title;
      metaHTML = `<span class="meta-match">${escapeHtml(item.status)}</span><span class="meta-tag">HD</span>`;
      desc = item.tagline + "\n\n" + item.overview;
      extra.innerHTML =
        `<h4>PROBLEM / OBJECTIVE</h4><p class="bio-para">${escapeHtml(item.problem)}</p>` +
        `<h4>MY ROLE</h4><p class="bio-para">${escapeHtml(item.role)}</p>` +
        `<h4>TOOLS USED / EXPLORED</h4><div class="chip-row">` +
        item.tools.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("") + `</div>` +
        `<h4>SCREENSHOTS</h4><div class="screenshot-placeholder">Add screenshot <span>(edit data.js)</span></div>` +
        `<p class="honest-note">${escapeHtml(D.projectStatusNote)}</p>`;
    } else if (kind === "journey") {
      title = item.area;
      metaHTML = `<span class="meta-tag">Experience</span>`;
      desc = item.detail;
    }

    $("#modalTitle").textContent = title.replace(/^TODO:\s*/i, "");
    $("#modalArtInitial").textContent = initialOf(title);
    $("#modalMeta").innerHTML = metaHTML;
    $("#modalDesc").textContent = desc;

    overlay.hidden = false;
    document.body.classList.add("locked");
    const discuss = $("[data-scrollto]", extra);
    if (discuss) {
      discuss.addEventListener("click", () => {
        closeModal();
        setTimeout(() => {
          const target = $(discuss.getAttribute("data-scrollto"));
          if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }, 60);
      });
    }
    if (hasGsap && !reduceMotion) {
      gsap.fromTo("#modal", { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
    $("#modalClose").focus();
  }

  function closeModal() {
    const done = () => {
      overlay.hidden = true;
      document.body.classList.remove("locked");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };
    if (hasGsap && !reduceMotion) {
      gsap.to("#modal", { opacity: 0, y: 40, scale: 0.97, duration: 0.25, ease: "power2.in", onComplete: done });
    } else done();
  }

  /* ---------- full sections ---------- */
  function buildSkillUniverse() {
    $("#skillUniverseSub").textContent = D.rails.find((r) => r.id === "skills").subtitle;
    $("#skillLegend").innerHTML = (D.skillLevels || []).map((l) =>
      `<span class="level-pill level-${l.id}" title="${escapeHtml(l.meaning)}">${escapeHtml(l.label)}</span>`
    ).join("");
    $("#learningNote").textContent = D.profile.learningNote;
    const host = $("#skillCategories");
    host.innerHTML = "";
    Object.keys(D.skills).forEach((key) => {
      const label = D.skillCategoryLabels[key] || key;
      const icon = (D.skillCategoryIcons || {})[key] || "✦";
      const card = document.createElement("div");
      card.className = "skill-cat";
      card.innerHTML = `<h3><span class="cat-icon" aria-hidden="true">${escapeHtml(icon)}</span>${escapeHtml(label)}</h3>` +
        D.skills[key].map((s) =>
          `<div class="skill-pill-row"><span class="skill-name">${escapeHtml(s.name)}</span>` +
          `<span class="level-pill level-${s.level}">${escapeHtml(levelLabel(s.level))}</span></div>`
        ).join("");
      host.appendChild(card);
    });
  }

  function buildServices() {
    const host = $("#serviceCards");
    host.innerHTML = "";
    D.services.forEach((s, i) => {
      const card = document.createElement("article");
      card.className = "service-card";
      card.innerHTML =
        `<div class="service-icon" aria-hidden="true">${escapeHtml(s.icon)}</div>` +
        `<h3>${escapeHtml(s.title)}</h3>` +
        `<p class="service-tagline">${escapeHtml(s.tagline)}</p>` +
        `<p class="service-desc">${escapeHtml(s.description)}</p>` +
        `<button class="service-link" data-i="${i}">Discuss a Project →</button>`;
      $(".service-link", card).addEventListener("click", () => openModal("services", s, i));
      host.appendChild(card);
    });
  }

  function buildExperience() {
    const grid = $("#experienceGrid");
    grid.innerHTML = D.experienceAreas.map((e) =>
      `<div class="exp-card"><h3>${escapeHtml(e.area)}</h3><p>${escapeHtml(e.detail)}</p></div>`
    ).join("");
    $("#employerList").innerHTML = D.employers.map((e) => {
      const todo = isTODO(e.role) || isTODO(e.org);
      return `<div class="employer-card${todo ? " is-todo" : ""}">` +
        `<strong>${escapeHtml(e.role)}${todo ? "" : " — " + escapeHtml(e.org)}</strong>` +
        (todo
          ? `<span>${escapeHtml(e.org)} · ${escapeHtml(e.years)}<br>${escapeHtml(e.detail)}</span>`
          : `<span>${escapeHtml(e.years)}<br>${escapeHtml(e.detail)}</span>`) +
        `</div>`;
    }).join("");
  }

  function buildApproach() {
    $("#approachDesc").textContent = D.approach.description;
    $("#approachCards").innerHTML = D.approach.principles.map((p) =>
      `<div class="approach-card"><div class="approach-icon" aria-hidden="true">${escapeHtml(p.icon)}</div>` +
      `<h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.detail)}</p></div>`
    ).join("");
  }

  function buildFinale() {
    $("#finaleHeading").textContent = D.contact.heading;
    $("#finaleSub").textContent = D.contact.subheading;
    const select = $("#cfType");
    select.innerHTML = `<option value="" disabled selected>Select an enquiry type</option>` +
      D.contact.enquiryTypes.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
    $("#contactPlaceholders").innerHTML =
      `<p class="ph-label">Contact details — add yours in <code>data.js</code>:</p>` +
      D.contact.placeholders.map((p) =>
        `<span class="ph-chip" aria-disabled="true" title="Placeholder — add real details in data.js">${escapeHtml(p.label)}: ${escapeHtml(p.value)}</span>`
      ).join("");
  }

  /* ---------- scroll animations ---------- */
  function initScrollFX() {
    if (!hasGsap || reduceMotion || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        if (el.classList.contains("rail")) {
          gsap.fromTo($$(".tile", el), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" });
        } else if (el.classList.contains("skill-cat") || el.classList.contains("service-card") ||
                   el.classList.contains("approach-card") || el.classList.contains("exp-card")) {
          gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        } else if (["journey", "services", "approach", "skill-universe", "finale"].includes(el.id)) {
          gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
        }
      });
    }, { threshold: 0.12 });
    $$(".rail").forEach((r) => io.observe(r));
    $$(".skill-cat, .service-card, .approach-card, .exp-card").forEach((c) => io.observe(c));
    ["journey", "services", "approach", "skill-universe", "finale"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- nav / forms / global events ---------- */
  function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function initChrome() {
    const nav = $("#topnav");
    window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 40), { passive: true });

    $$("[data-scroll]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = $(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
          closeNavMenu();
        }
      });
    });
    $("#navBrand").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
    $("#navBrand").addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }
    });

    // mobile menu
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    function closeNavMenu() {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNavMenu(); });

    // hero buttons → scroll to sections
    $("#btnPortfolio").addEventListener("click", () => scrollToId("rail-originals"));
    $("#btnSkills").addEventListener("click", () => scrollToId("skill-universe"));
    $("#btnContact").addEventListener("click", () => scrollToId("finale"));

    $("#profileBadge").addEventListener("click", () => {
      renderProfiles();
      showScreen("profiles");
    });

    // contact form — FRONTEND DEMO ONLY: never claims delivery
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const notice = $("#formNotice");
      const name = $("#cfName").value.trim();
      const email = $("#cfEmail").value.trim();
      const type = $("#cfType").value;
      const msg = $("#cfMsg").value.trim();
      if (!name || !email || !type || !msg) {
        notice.hidden = false;
        notice.className = "form-notice is-error";
        notice.textContent = "Please fill in your name, email, enquiry type, and message before submitting.";
        return;
      }
      notice.hidden = false;
      notice.className = "form-notice is-demo";
      notice.textContent = D.contact.formDemoNotice;
    });

    $("#modalClose").addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) closeModal();
    });
    overlay.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = $$("#modal button, #modal a[href]", overlay).filter((el) => !el.disabled);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- boot ---------- */
  function enterApp() {
    renderHero();
    showScreen("app");
    initScrollFX();
  }

  function boot() {
    $("#docTitle").textContent = D.meta.siteTitle;
    $("#navBrand").textContent = D.meta.brandWord;
    $("#footerNote").textContent = D.meta.footerNote;
    const titleEl = $("#titleMain");
    titleEl.textContent = D.meta.seriesTitle;
    if (D.meta.seriesTitle.length > 18) titleEl.classList.add("long-title");

    buildRails();
    buildSkillUniverse();
    buildServices();
    buildExperience();
    buildApproach();
    buildFinale();
    initChrome();

    showScreen("loader");
    runLoader(() => {
      showScreen("titlecard");
      runTitleCard(() => {
        renderProfiles();
        showScreen("profiles");
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
