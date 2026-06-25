"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

interface PosterToggleProps {
  img: StaticImageData;
  href: string;
  alt: string;
  caption: string;
  labelClosed: string;
  labelOpen: string;
}

/**
 * Opt-in reveal for the conference poster. The poster is sensitive (it prints
 * detailed results), so it stays collapsed until the visitor chooses to open it.
 */
export default function PosterToggle({
  img,
  href,
  alt,
  caption,
  labelClosed,
  labelOpen,
}: PosterToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="poster-toggle"
        aria-controls="ccf-poster-panel"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="poster-toggle__icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
        <span>{open ? labelOpen : labelClosed}</span>
      </button>

      <div id="ccf-poster-panel" hidden={!open} style={{ marginTop: "1rem" }}>
        <figure className="figure" style={{ margin: 0 }}>
          <a className="figure__frame" href={href} target="_blank" rel="noopener" style={{ display: "block" }}>
            <Image
              src={img}
              alt={alt}
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 700px"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
          <figcaption className="figure__cap">{caption}</figcaption>
        </figure>
      </div>
    </>
  );
}
