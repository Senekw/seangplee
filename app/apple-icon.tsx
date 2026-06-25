import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (iOS home-screen): the SL monogram on the brand frame.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 150,
            height: 150,
            border: "5px solid #2f6bff",
            borderRadius: 36,
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: -3,
            fontFamily: "sans-serif",
          }}
        >
          SL
        </div>
      </div>
    ),
    { ...size },
  );
}
