"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = site.nav.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header className="topbar" data-scrolled={scrolled} id="top">
      <div className="topbar__inner">
        <a className="monogram" href="#top" aria-label={`${site.name} — home`}>
          <span className="monogram__mark">SL</span>
          {site.name}
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav
          className="nav"
          id="primary-nav"
          aria-label="Primary"
          data-open={open}
        >
          <ul className="nav__list">
            {site.nav.map((n) => (
              <li key={n.id}>
                <a
                  className="nav__link"
                  href={`#${n.id}`}
                  data-active={active === n.id}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav__cta" href="#contact" onClick={() => setOpen(false)}>
            Let&apos;s talk <span className="nav__cta-dot" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
