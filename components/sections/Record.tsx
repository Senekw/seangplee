import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import BlurImage from "@/components/primitives/BlurImage";
import PosterToggle from "@/components/sections/PosterToggle";
import { sectionById } from "@/content/sections";
import { record } from "@/content/record";
import { getImage } from "@/content/images";

export default function Record() {
  const meta = sectionById.record;

  return (
    <Section meta={meta} labelledBy="record-claim">
      <Reveal as="p" className="record__claim">
        <span id="record-claim">
          The youngest presenter — and the{" "}
          <em>only high schooler</em> — in the documented history of the
          Cholangiocarcinoma Foundation Annual Conference.
        </span>
      </Reveal>

      <Reveal>
        <p className="record__body">{record.body}</p>
        <p className="record__caption">{record.caption}</p>
      </Reveal>

      <Reveal>
        <div className="shotrow">
          {record.shots.map((s) => (
            <BlurImage
              key={s.key}
              img={getImage(s.key)}
              alt={s.alt}
              caption={s.caption}
              ratio="4 / 3"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          ))}
        </div>
      </Reveal>

      <ol className="entries" aria-label="Roles and recognitions">
        {record.entries.map((e) => (
          <Reveal as="li" key={e.title} className="entry">
            <div className="entry__top">
              <h3 className="entry__title">{e.title}</h3>
              <span className="entry__period">{e.period}</span>
            </div>
            <p className="entry__role">{e.role}</p>
            <p className="entry__body">{e.body}</p>
            {e.hasPoster && (
              <PosterToggle
                img={getImage(record.poster.key)}
                href={record.poster.href}
                alt={record.poster.alt}
                caption={record.poster.caption}
                labelClosed={record.poster.labelClosed}
                labelOpen={record.poster.labelOpen}
              />
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
