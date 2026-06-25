import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import TagCluster from "@/components/primitives/TagCluster";
import { sectionById } from "@/content/sections";
import { research } from "@/content/research";

export default function Research() {
  const meta = sectionById.research;

  return (
    <Section meta={meta} labelledBy="research-title">
      <h2 className="sr-only" id="research-title">
        Research
      </h2>

      <Reveal className="pullquote">{research.pullquote}</Reveal>
      <Reveal className="prose">
        <p>{research.intro}</p>
      </Reveal>

      <Reveal>
        <div className="statstrip statstrip--4" role="group" aria-label="Research at a glance">
          {research.stats.map((s) => (
            <div className="statstrip__cell" key={s.label}>
              <span className="statstrip__num">{s.num}</span>
              <span className="statstrip__label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <ol className="papers">
        {research.papers.map((p) => (
          <Reveal as="li" key={p.title} className={`paper ${p.lead ? "paper--lead" : ""}`}>
            <p className="paper__status">{p.status}</p>
            <h3 className={`paper__title ${p.titleSmall ? "paper__title--sm" : ""}`}>
              {p.title}
            </h3>
            <p className="venue">{p.venue}</p>
            {p.authors.length > 0 && (
              <p className="authors">
                {p.authors.map((a, i) => (
                  <span key={a.name}>
                    {i > 0 && " · "}
                    {a.lead ? <strong>{a.name}</strong> : a.name}{" "}
                    <span className="authors__aff">({a.aff})</span>
                  </span>
                ))}
              </p>
            )}
            <p className="paper__body">{p.body}</p>
            {p.findings.length > 0 && (
              <ul className="keyfindings" aria-label="Key findings">
                {p.findings.map((f) => (
                  <li className="keyfinding" key={f}>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <p className="methods-foot">{research.methodsFoot}</p>
      </Reveal>

      <TagCluster tags={research.tags} label="Focus areas" />
    </Section>
  );
}
