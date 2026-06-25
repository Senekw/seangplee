import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import RevealText from "@/components/primitives/RevealText";
import TagCluster from "@/components/primitives/TagCluster";
import PipelineDiagram from "@/components/decor/PipelineDiagram";
import { sectionById } from "@/content/sections";
import { sutura } from "@/content/sutura";

export default function Sutura() {
  const meta = sectionById.sutura;

  return (
    <Section meta={meta} labelledBy="sutura-title">
      <Reveal>
        <p className="entry__stat" style={{ marginTop: 0, marginBottom: "1.4rem" }}>
          {sutura.badge}
        </p>
      </Reveal>

      <RevealText as="h2" id="sutura-title" className="section__title" lines={[sutura.title]} />
      <Reveal className="pullquote">{sutura.pullquote}</Reveal>

      <Reveal className="prose">
        <p>{sutura.intro}</p>
      </Reveal>

      <Reveal>
        <p className="subhead">{sutura.blocks[0].heading}</p>
      </Reveal>
      <Reveal className="prose">
        <p>{sutura.blocks[0].body}</p>
      </Reveal>

      <div className="feature-split feature-split--media-right">
        <div className="feature-split__media">
          <PipelineDiagram caption="A tear becomes a break in the graph — not a region the math must smooth over." />
        </div>
        <div>
          <Reveal>
            <p className="subhead" style={{ marginTop: 0 }}>
              {sutura.blocks[1].heading}
            </p>
          </Reveal>
          <Reveal className="prose">
            <p>{sutura.blocks[1].body}</p>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <p className="subhead">{sutura.proven.heading}</p>
        <p className="claimline">
          {/* split the "7× lower" emphasis onto the accent */}
          Roughly <em>7× lower</em> registration error than PASTE2 under tissue
          tearing — measured head-to-head on matched warps.
        </p>
      </Reveal>
      <Reveal className="prose">
        <p>{sutura.proven.body}</p>
      </Reveal>

      <Reveal>
        <div className="statstrip statstrip--4" role="group" aria-label="Result at a glance">
          {sutura.stats.map((s) => (
            <div className="statstrip__cell" key={s.label}>
              <span className="statstrip__num">{s.num}</span>
              <span className="statstrip__label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="versus" role="table" aria-label="Sutura versus PASTE2">
          <div className="versus__head" role="row">
            {sutura.versus.head.map((h) => (
              <span role="columnheader" key={h}>
                {h}
              </span>
            ))}
          </div>
          {sutura.versus.rows.map((row) => (
            <div className="versus__row" role="row" key={row.metric}>
              <span className="versus__metric" role="cell">
                {row.metric}
              </span>
              <span className="versus__a" role="cell">
                <span className="versus__tag">Sutura</span>
                {row.a}
              </span>
              <span className="versus__b" role="cell">
                <span className="versus__tag">PASTE2</span>
                {row.b}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="caveats">
        <p className="caveats__cap">{sutura.caveats.cap}</p>
        <ul className="caveats__list">
          {sutura.caveats.items.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <p className="subhead">{sutura.why.heading}</p>
      </Reveal>
      <Reveal className="prose">
        <p>{sutura.why.body}</p>
      </Reveal>
      <Reveal>
        <ul className="keyfindings" aria-label="Where better alignment matters">
          {sutura.why.findings.map((f) => (
            <li className="keyfinding" key={f}>
              {f}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <p className="subhead">{sutura.roadmap.heading}</p>
        <ul className="phases">
          {sutura.roadmap.phases.map((p) => (
            <li className="phase" key={p.k}>
              <p className="phase__k">
                {p.k}
                <span>{p.when}</span>
              </p>
              <p className="phase__v">{p.v}</p>
            </li>
          ))}
        </ul>
        <p className="betline">{sutura.roadmap.bet}</p>
      </Reveal>

      <Reveal>
        <p className="subhead">Team</p>
        <ul className="credits" aria-label="Founders">
          {sutura.team.map((t) => (
            <li className="credit" key={t.name}>
              <span className="credit__name">{t.name}</span>
              <span className="credit__role">{t.role}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <p className="finehint">{sutura.finehint}</p>
      </Reveal>

      <TagCluster tags={sutura.tags} label="Focus areas" />
    </Section>
  );
}
