import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import BlurImage from "@/components/primitives/BlurImage";
import { sectionById } from "@/content/sections";
import { community } from "@/content/community";
import { getImage } from "@/content/images";

export default function Community() {
  const meta = sectionById.community;

  return (
    <Section meta={meta} labelledBy="community-title">
      <RevealText as="h2" id="community-title" className="section__title" lines={[community.title]} />
      <Reveal className="lede">{community.pullquote}</Reveal>

      <BlurImage
        img={getImage(community.photo.key)}
        alt={community.photo.alt}
        caption={community.photo.caption}
        ratio="16 / 9"
        objectPosition="center 45%"
        parallax
        sizes="(max-width: 1440px) 100vw, 1440px"
      />

      <ol className="entries" aria-label="Community and volunteering">
        {community.entries.map((e) => (
          <Reveal as="li" key={e.title} className="entry">
            <div className="entry__top">
              <h3 className="entry__title">{e.title}</h3>
              <span className="entry__period">{e.period}</span>
            </div>
            <p className="entry__role">{e.role}</p>
            {e.body && <p className="entry__body">{e.body}</p>}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
