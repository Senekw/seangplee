import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Original OG card generated from name + tagline (no copied assets).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f4f2ec",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 2, color: "#a7a39a" }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#2f6bff" }} />
          COMPUTATIONAL CANCER BIOLOGY — KATY, TEXAS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            I build computational models
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            of cancer from genomic data<span style={{ color: "#2f6bff" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <div style={{ fontWeight: 700 }}>{site.fullName}</div>
          <div style={{ color: "#a7a39a", fontSize: 24 }}>
            Sutura Genomics · MD Anderson · YC Startup School 2026
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
