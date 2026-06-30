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

  /* ----- 1. Dark-only theme --------------------------------------------
     The site is dark-only with no toggle. Clear any theme a previous version
     may have persisted so returning visitors always get the dark design. */

  var root = document.documentElement;
  root.removeAttribute("data-theme");
  try {
    localStorage.removeItem("sl-theme");
  } catch (e) {
    /* localStorage may be unavailable (private mode); fail silent. */
  }

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

  /* ----- 6. Copyright year --------------------------------------------- */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
