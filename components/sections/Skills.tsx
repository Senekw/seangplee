import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import Marquee from "@/components/primitives/Marquee";
import { sectionById } from "@/content/sections";
import { skills } from "@/content/skills";

export default function Skills() {
  const meta = sectionById.skills;

  return (
    <Section meta={meta} labelledBy="skills-title">
      <RevealText as="h2" id="skills-title" className="section__title" lines={[skills.title]} />
      <Reveal className="lede">{skills.pullquote}</Reveal>

      <Reveal>
        <div className="skillgrid">
          {skills.groups.map((g) => (
            <div className="skillgroup" key={g.label}>
              <p className="skillgroup__label">{g.label}</p>
              <ul className="skillgroup__items">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Marquee items={skills.affiliations} label="Affiliations, datasets, and tools" />
    </Section>
  );
}
