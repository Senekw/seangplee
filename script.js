/* =========================================================================
   Sean Lee — melaniedaveid-style rebuild · behavior
   Vanilla, one small dependency (Lenis). Progressive enhancement throughout.
   ========================================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  if (!root.classList.contains("js")) root.classList.add("js");

  var prm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- 1. Mobile nav ------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeNav(); navToggle.focus(); }
    });
  }

  /* ----- 2. Reveal on scroll ------------------------------------------- */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));
  if (prm || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ----- 3. Scroll-spy: highlight the nav link for the section in view -- */
  var navLinks = [].slice.call(document.querySelectorAll(".nav__link"));
  var byId = {};
  navLinks.forEach(function (l) {
    var id = (l.getAttribute("href") || "").replace(/^#/, "");
    if (id) byId[id] = l;
  });
  var spied = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ("IntersectionObserver" in window && spied.length) {
    var vis = {};
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { vis[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestR = 0;
      Object.keys(vis).forEach(function (id) { if (vis[id] > bestR) { bestR = vis[id]; best = id; } });
      navLinks.forEach(function (l) {
        var on = best && (l.getAttribute("href") === "#" + best);
        l.classList.toggle("is-active", !!on);
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.3, 0.6, 1] });
    spied.forEach(function (s) { so.observe(s); });
  }

  /* ----- 4. Photo blur-up ---------------------------------------------- */
  var photoImgs = [].slice.call(document.querySelectorAll(".photo__img"));
  photoImgs.forEach(function (img) {
    if (prm) { img.classList.add("is-loaded"); return; }
    if (img.complete && img.naturalWidth > 0) { img.classList.add("is-loaded"); }
    else {
      var done = function () { img.classList.add("is-loaded"); };
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    }
  });

  /* ----- 5. Light parallax on feature photos --------------------------- */
  var pEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
  var canP = pEls.length && !prm && window.matchMedia("(min-width: 721px)").matches;
  var pTick = false;
  function applyP() {
    var vh = window.innerHeight;
    pEls.forEach(function (el) {
      var f = el.parentElement, r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.8;
      var prog = (r.top + r.height / 2 - vh / 2) / vh;
      var t = -prog * speed; t = t > 1 ? 1 : t < -1 ? -1 : t;
      el.style.transform = "translate3d(0," + (t * r.height * 0.07).toFixed(1) + "px,0)";
    });
    pTick = false;
  }
  function reqP() { if (!pTick) { pTick = true; requestAnimationFrame(applyP); } }
  if (canP) {
    window.addEventListener("scroll", reqP, { passive: true });
    window.addEventListener("resize", reqP);
    applyP();
  }

  /* ----- 6. Animated smoky hero canvas --------------------------------- */
  var canvas = document.querySelector(".hero__canvas");
  var hero = document.getElementById("hero");
  if (canvas && hero && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var buf = document.createElement("canvas");
    var bw = 130, bh = 74;
    buf.width = bw; buf.height = bh;
    var bctx = buf.getContext("2d");
    var imgData = bctx.createImageData(bw, bh);
    var data = imgData.data;

    function sizeCanvas() {
      var r = hero.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width / 2));
      canvas.height = Math.max(1, Math.floor(r.height / 2));
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    function renderField(t) {
      var i = 0;
      for (var y = 0; y < bh; y++) {
        for (var x = 0; x < bw; x++) {
          var n =
            Math.sin(x * 0.055 + t * 0.6) +
            Math.sin(y * 0.085 - t * 0.42) +
            Math.sin((x + y) * 0.045 + t * 0.8) +
            Math.sin(Math.sqrt((x - 65) * (x - 65) + (y - 37) * (y - 37)) * 0.07 - t);
          var v = (n / 4) * 0.5 + 0.5;       // 0..1
          var g = (v * v * 64) | 0;          // dark, gamma-ish smoke
          data[i] = g; data[i + 1] = g; data[i + 2] = g + 2; data[i + 3] = 255;
          i += 4;
        }
      }
      bctx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);
    }

    if (prm) {
      renderField(0);
    } else {
      var heroVisible = true;
      window.addEventListener("scroll", function () {
        heroVisible = window.scrollY < hero.offsetHeight + 80;
      }, { passive: true });
      var t0 = 0;
      var loop = function (ts) {
        if (!t0) t0 = ts;
        if (heroVisible) renderField((ts - t0) / 1000 * 0.5);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  /* ----- 7. Lenis smooth scroll ---------------------------------------- */
  var lenis = null;
  if (!prm && typeof window.Lenis === "function") {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false });
    var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
      if (history.pushState) history.pushState(null, "", hash);
    });
  }

  /* ----- 8. Year ------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
