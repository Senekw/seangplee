import type { CSSProperties } from "react";

type Variant = "square" | "arrow" | "plus" | "mark" | "bars";

interface PixelGlyphProps {
  variant?: Variant;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Original pixel/bitmap glyph motifs as inline SVG — crisp, themeable
 * (currentColor), animatable. Purely decorative (aria-hidden).
 */
export default function PixelGlyph({
  variant = "square",
  size = 16,
  className,
  style,
}: PixelGlyphProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 12 12",
    fill: "currentColor",
    className: `glyph ${className ?? ""}`,
    style,
    "aria-hidden": true as const,
    shapeRendering: "crispEdges" as const,
  };

  switch (variant) {
    case "arrow":
      return (
        <svg {...common}>
          <rect x="1" y="5" width="6" height="2" />
          <rect x="6" y="3" width="2" height="2" />
          <rect x="8" y="5" width="2" height="2" />
          <rect x="6" y="7" width="2" height="2" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <rect x="5" y="1" width="2" height="10" />
          <rect x="1" y="5" width="10" height="2" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <rect x="1" y="7" width="2" height="4" />
          <rect x="5" y="4" width="2" height="7" />
          <rect x="9" y="1" width="2" height="10" />
        </svg>
      );
    case "mark":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="3" height="3" />
          <rect x="7" y="2" width="3" height="3" />
          <rect x="2" y="7" width="3" height="3" />
          <rect x="7" y="7" width="3" height="3" />
        </svg>
      );
    case "square":
    default:
      return (
        <svg {...common}>
          <rect x="2" y="2" width="8" height="8" opacity="0.35" />
          <rect x="2" y="2" width="4" height="4" />
          <rect x="6" y="6" width="4" height="4" />
        </svg>
      );
  }
}
