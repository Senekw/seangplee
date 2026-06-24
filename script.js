/* =========================================================================
   Sean Lee — site behavior
   Vanilla, no dependencies. Mobile nav, theme toggle, scroll-reveal,
   scroll-spy nav, copyright year. All progressive enhancement.
   ========================================================================= */

(function () {
  "use strict";

  /* Mark JS as available so CSS .no-js fallbacks deactivate. */
  document.documentElement.classList.remove("no-js");

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----- 1. Theme toggle (persisted, respects prefers-color-scheme) ----- */

  var STORAGE_KEY = "sl-theme";
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var themeLabel = document.querySelector("[data-theme-label]");

  function systemPrefersLight() {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  /* Resolve the effective theme: explicit attr wins, else system. */
  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return systemPrefersLight() ? "light" : "dark";
  }

  /* The toggle offers the *opposite* of what's showing. */
  function syncThemeLabel() {
    if (!themeLabel) return;
    themeLabel.textContent = currentTheme() === "dark" ? "Light" : "Dark";
  }

  function applyStoredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage may be unavailable (private mode); fail silent. */
    }
    if (stored === "light" || stored === "dark") {
      root.setAttribute("data-theme", stored);
    }
    syncThemeLabel();
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
    syncThemeLabel();
  }

  applyStoredTheme();
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  /* If the OS theme changes and the user hasn't chosen, keep label honest. */
  var sysMql = window.matchMedia("(prefers-color-scheme: light)");
  var onSysChange = function () {
    if (!root.getAttribute("data-theme")) syncThemeLabel();
  };
  if (sysMql.addEventListener) sysMql.addEventListener("change", onSysChange);
  else if (sysMql.addListener) sysMql.addListener(onSysChange);

  /* ----- 2. Mobile nav -------------------------------------------------- */

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) closeNav();
      else openNav();
    });

    /* Close after picking a destination. */
    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a.nav__link");
      if (link) closeNav();
    });

    /* Escape closes the panel and returns focus to the toggle. */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    /* Reset state if the viewport grows back to desktop. */
    window.matchMedia("(min-width: 721px)").addEventListener
      ? window
          .matchMedia("(min-width: 721px)")
          .addEventListener("change", function (e) {
            if (e.matches) closeNav();
          })
      : null;
  }

  /* ----- 3. Scroll-reveal (IntersectionObserver, motion-gated) ---------- */

  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );
  var fadeStats = Array.prototype.slice.call(
    document.querySelectorAll(".stat-accent[data-fade-stat]")
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    /* Show everything immediately. */
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    fadeStats.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    /* The validation stat fades in once on entry. */
    var statObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    fadeStats.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* ----- 4. Scroll-spy: active nav underline tracks the section --------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__link")
  );

  /* Map each section id to its nav link (sections share ids with hrefs). */
  var linkById = {};
  navLinks.forEach(function (link) {
    var id = (link.getAttribute("href") || "").replace(/^#/, "");
    if (id) linkById[id] = link;
  });

  /* Watch the sections that have a corresponding nav link. */
  var spyTargets = Object.keys(linkById)
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var match = (link.getAttribute("href") || "") === "#" + id;
      link.classList.toggle("is-active", match);
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && spyTargets.length) {
    var visible = {};
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });
        /* Pick the most-visible tracked section. */
        var best = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) {
            bestRatio = visible[id];
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );
    spyTargets.forEach(function (sec) {
      spyObserver.observe(sec);
    });
  }

  /* ----- 5. Poster toggle (expand/collapse, progressive enhancement) ---- */

  var posterToggles = Array.prototype.slice.call(
    document.querySelectorAll("[data-poster-toggle]")
  );
  posterToggles.forEach(function (btn) {
    var panelId = btn.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    var labelEl = btn.querySelector("[data-poster-label]");

    /* JS is available: reveal the button and start the panel collapsed.
       Without JS the button stays hidden and the poster shows inline. */
    btn.hidden = false;
    panel.classList.add("is-collapsed");
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", function () {
      var willOpen = panel.classList.contains("is-collapsed");
      panel.classList.toggle("is-collapsed", !willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (labelEl) {
        labelEl.textContent = willOpen ? "Hide the poster" : "View the poster";
      }
    });
  });

  /* ----- 6. Photo blur-up: fade each photo in once it has decoded ------- */

  var photoImgs = Array.prototype.slice.call(
    document.querySelectorAll(".photo__img")
  );
  photoImgs.forEach(function (img) {
    if (prefersReducedMotion) {
      img.classList.add("is-loaded");
      return;
    }
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("is-loaded");
    } else {
      var done = function () { img.classList.add("is-loaded"); };
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    }
  });

  /* ----- 7. Light parallax on feature photos (transform-only, rAF) ------ */

  var parallaxEls = Array.prototype.slice.call(
    document.querySelectorAll("[data-parallax]")
  );
  var canParallax =
    parallaxEls.length &&
    !prefersReducedMotion &&
    window.matchMedia("(min-width: 721px)").matches;
  var parallaxTicking = false;

  function applyParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var frame = el.parentElement; /* .photo__frame */
      var rect = frame.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return; /* offscreen */
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.8;
      /* progress: ~-1 entering from below, 0 centered, ~1 leaving up top */
      var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      var t = -progress * speed;
      if (t > 1) t = 1;
      else if (t < -1) t = -1;
      var maxShift = rect.height * 0.07; /* stays inside the 8% overscan */
      el.style.transform = "translate3d(0," + (t * maxShift).toFixed(1) + "px,0)";
    });
    parallaxTicking = false;
  }
  function requestParallax() {
    if (!parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(applyParallax);
    }
  }
  if (canParallax) {
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    applyParallax();
  }

  /* ----- 8. Hero intro: sequence the hero in once styles are applied ---- */

  function markPageLoaded() {
    document.body.classList.add("is-loaded");
  }
  if (prefersReducedMotion) {
    markPageLoaded();
  } else {
    /* Double rAF so the initial hidden state paints before the transition. */
    requestAnimationFrame(function () {
      requestAnimationFrame(markPageLoaded);
    });
    /* Safety net: never leave the hero stuck hidden. */
    setTimeout(markPageLoaded, 1000);
  }

  /* ----- 9. Lenis smooth scroll (optional, progressive enhancement) ----- */

  var lenis = null;
  if (!prefersReducedMotion && typeof window.Lenis === "function") {
    lenis = new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false
    });
    var lenisRaf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    };
    requestAnimationFrame(lenisRaf);

    /* Route in-page anchor clicks through Lenis, offset for the fixed bar. */
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute("href");
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -(parseInt(var_barH(), 10) || 56) });
      if (history.pushState) history.pushState(null, "", hash);
    });
  }

  function var_barH() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--bar-h")
      .trim()
      .replace("px", "");
  }

  /* ----- 10. Copyright year -------------------------------------------- */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
