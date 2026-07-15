import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "rentonhead — Hasan Cemil Acar",
    short_name: "rentonhead",
    description: "Global portfolio of Hasan Cemil Acar — Art Director & Programmer.",
    start_url: "/en",
    display: "standalone",
    background_color: "#0d0d0b",
    theme_color: "#0d0d0b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
