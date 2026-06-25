import type { CSSProperties } from "react";
import Reveal from "@/components/primitives/Reveal";
import BlurImage from "@/components/primitives/BlurImage";
import MagneticLink from "@/components/primitives/MagneticLink";
import GrainField from "@/components/decor/GrainField";
import PixelGlyph from "@/components/decor/PixelGlyph";
import { sectionById } from "@/content/sections";
import { site } from "@/content/site";
import { getImage } from "@/content/images";

export default function Contact() {
  const meta = sectionById.contact;
  const style = { "--accent": meta.accent } as CSSProperties;

  return (
    <section
      className="panel panel--dark contact"
      id="contact"
      aria-labelledby="contact-title"
      style={style}
    >
      <div className="contact__bg">
        <GrainField />
      </div>
      <div className="contact__veil" aria-hidden="true" />

      <div className="section">
        <div className="shell">
          <div className="rail" aria-hidden="true">
            <span>{meta.index}</span>
          </div>
          <div className="section__content">
            <p className="kicker">
              <span className="kicker__num">{meta.index}</span>
              <span>{meta.kicker}</span>
              <PixelGlyph className="kicker__glyph" variant="square" size={12} />
            </p>
            <h2 className="sr-only" id="contact-title">
              Contact
            </h2>

            <div style={{ maxWidth: 440 }}>
              <BlurImage
                img={getImage("contactPersimmon")}
                alt="A single ripe persimmon hanging from a bare branch against an open sky."
                caption="One fruit, open sky — restraint, on purpose."
                ratio="4 / 5"
                sizes="(max-width: 700px) 100vw, 440px"
              />
            </div>

            <Reveal>
              <p className="contact__lede">{site.contact.lede}</p>
              <MagneticLink className="contact__email" href={`mailto:${site.email}`}>
                {site.email}
              </MagneticLink>

              <ul className="contact__links" aria-label="Elsewhere">
                {site.contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener">
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="colophon">
                <span className="colophon__mono" aria-hidden="true">
                  SL
                </span>
                <p className="colophon__line">
                  {site.fullName} · {site.location} · 2026
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
