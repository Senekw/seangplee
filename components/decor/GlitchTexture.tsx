/**
 * Fixed, harsh black-and-white glitch/datamosh field that the rounded panels
 * float over — distinct from the soft hero grain. Visible in the gutters at the
 * panels' rounded corners as they recede. Static (no animation) for perf; the
 * texture itself is defined in globals.css (.glitch-bg).
 */
export default function GlitchTexture() {
  return <div className="glitch-bg" aria-hidden="true" />;
}
