import { ImageResponse } from "next/og";

export const alt = "NicoX — Ingeniero de Sistemas Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(900px 500px at 18% 6%, rgba(63, 92, 255, 0.28), transparent 55%), radial-gradient(800px 480px at 88% 90%, rgba(25, 35, 75, 0.5), transparent 58%)",
          color: "#eef2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 130, fontWeight: 700 }}>
          Nico
          <span style={{ color: "#3f5cff" }}>X</span>
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 44,
            color: "#cbd5e1",
          }}
        >
          Ingeniero de Sistemas Fullstack
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 26,
            color: "#8ca3ff",
          }}
        >
          nicoj3000.netlify.app
        </div>
      </div>
    ),
    { ...size }
  );
}
