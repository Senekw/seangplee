import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import TagCluster from "@/components/primitives/TagCluster";
import BlurImage from "@/components/primitives/BlurImage";
import { sectionById } from "@/content/sections";
import { brain } from "@/content/brain";
import { getImage } from "@/content/images";

export default function Brain() {
  const meta = sectionById.brain;

  return (
    <Section meta={meta} labelledBy="brain-title">
      <RevealText as="h2" id="brain-title" className="section__title" lines={[brain.title]} />
      <Reveal className="lede">{brain.pullquote}</Reveal>

      <Reveal>
        <div className="statstrip statstrip--4" role="group" aria-label="Knowledge base at a glance">
          {brain.stats.map((s) => (
            <div className="statstrip__cell" key={s.label}>
              <span className="statstrip__num">{s.num}</span>
              <span className="statstrip__label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <BlurImage
        img={getImage(brain.graph.key)}
        alt={brain.graph.alt}
        caption={brain.graph.caption}
        sizes="(max-width: 1100px) 100vw, 1100px"
      />

      <Reveal>
        <blockquote className="thesis">{brain.thesis}</blockquote>
      </Reveal>
      <Reveal className="prose">
        <p>{brain.prose}</p>
      </Reveal>

      <div className="feature-split">
        <div className="feature-split__media">
          <BlurImage
            img={getImage(brain.splitPhoto.key)}
            alt={brain.splitPhoto.alt}
            caption={brain.splitPhoto.caption}
            ratio="3 / 4"
            parallax
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <Reveal as="ol" className="principles">
          {brain.principles.map((p) => (
            <li className="principle" key={p.k}>
              <p className="principle__k">{p.k}</p>
              <p className="principle__v">{p.v}</p>
            </li>
          ))}
        </Reveal>
      </div>

      <Reveal>
        <p className="brain-close">{brain.close}</p>
      </Reveal>

      <TagCluster tags={brain.tags} label="Built with" />
    </Section>
  );
}
