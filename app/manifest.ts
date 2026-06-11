import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NicoX — Ingeniero de Sistemas Fullstack",
    short_name: "NicoX",
    description:
      "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#05070d",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
