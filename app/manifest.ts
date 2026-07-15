import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "rentonhead — Hasan Cemil Acar",
    short_name: "rentonhead",
    description: "Hasan Cemil Acar'ın (rentonhead) Türkçe ve uluslararası portföyü.",
    start_url: "/tr",
    display: "standalone",
    background_color: "#0d0d0b",
    theme_color: "#0d0d0b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
