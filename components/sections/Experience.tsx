import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import BlurImage from "@/components/primitives/BlurImage";
import { sectionById } from "@/content/sections";
import { experience } from "@/content/experience";
import { getImage } from "@/content/images";

export default function Experience() {
  const meta = sectionById.experience;

  return (
    <Section meta={meta} labelledBy="experience-title">
      <RevealText
        as="h2"
        id="experience-title"
        className="section__title"
        lines={[experience.title]}
      />
      <Reveal className="lede">{experience.pullquote}</Reveal>

      <BlurImage
        img={getImage(experience.photo.key)}
        alt={experience.photo.alt}
        caption={experience.photo.caption}
        ratio="21 / 9"
        objectPosition="center 55%"
        parallax
        sizes="(max-width: 1440px) 100vw, 1440px"
      />

      <ol className="entries" aria-label="Work experience">
        {experience.entries.map((e) => (
          <Reveal as="li" key={e.title} className="entry">
            <div className="entry__top">
              <h3 className="entry__title">
                {e.titleHref ? (
                  <a href={e.titleHref} target="_blank" rel="noopener">
                    {e.title} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              <span className="entry__period">{e.period}</span>
            </div>
            <p className="entry__role">{e.role}</p>
            {e.body && <p className="entry__body">{e.body}</p>}
            <div>
              {e.stat && <span className="entry__stat">{e.stat}</span>}
              {e.link && (
                <a className="entry__link" href={e.link.href} target="_blank" rel="noopener">
                  {e.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
