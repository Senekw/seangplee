import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import TagCluster from "@/components/primitives/TagCluster";
import BlurImage from "@/components/primitives/BlurImage";
import { sectionById } from "@/content/sections";
import { about } from "@/content/about";
import { getImage } from "@/content/images";

export default function About() {
  const meta = sectionById.approach;
  const [feature, secondary] = about.photos;

  return (
    <Section meta={meta} labelledBy="about-title">
      <RevealText as="h2" id="about-title" className="section__title" lines={[about.title]} />

      <Reveal className="prose">
        {about.prose.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>

      <BlurImage
        img={getImage(feature.key)}
        alt={feature.alt}
        caption={feature.caption}
        ratio="3 / 2"
        parallax
        sizes="(max-width: 1100px) 100vw, 1100px"
      />

      <BlurImage
        img={getImage(secondary.key)}
        alt={secondary.alt}
        caption={secondary.caption}
        sizes="(max-width: 1100px) 100vw, 1100px"
      />

      <TagCluster tags={about.tags} label="Focus areas" />
    </Section>
  );
}
