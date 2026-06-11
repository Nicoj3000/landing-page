import { ImageResponse } from "next/og";

// Edge runtime required: the node runtime of @vercel/og mangles its bundled
// font path on Windows ("Invalid URL" at dev time).
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05070d",
          color: "#eef2ff",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        N<span style={{ color: "#3f5cff" }}>X</span>
      </div>
    ),
    { ...size }
  );
}
