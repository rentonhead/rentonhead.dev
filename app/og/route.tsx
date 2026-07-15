import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Keep the generated image on the Node.js runtime. The Edge bundle exceeds
// the 1 MB function limit on the current Vercel plan by a small margin.
export const runtime = "nodejs";

export function GET(request: NextRequest) {
  const requestedLocale = request.nextUrl.searchParams.get("locale");
  const locale = requestedLocale === "tr" || requestedLocale === "ru" ? requestedLocale : "en";
  const fallbackTitle = locale === "tr"
    ? "Sanat Yönetmeni ve Yazılımcı"
    : locale === "ru"
      ? "Арт-директор и программист"
      : "Art Director & Programmer";
  const title = request.nextUrl.searchParams.get("title") || fallbackTitle;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#0d0d0b", color: "#f3efe4", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
        <span style={{ color: "#f4d86b", fontSize: 40 }}>rentonhead</span>
        <span style={{ color: "#aaa69b" }}>Hasan Cemil Acar · {locale.toUpperCase()}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1010 }}>
        <div style={{ color: "#65d6aa", fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>{locale === "tr" ? "Sanat yönetimi × yazılım" : locale === "ru" ? "Арт-дирекшн × разработка" : "Art direction × engineering"}</div>
        <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.045em", fontWeight: 700 }}>{title}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 26, borderTop: "1px solid #34342f", color: "#aaa69b", fontSize: 23 }}>
        <span>{locale === "tr" ? "Native iOS · Dijital ürünler · Modern web" : locale === "ru" ? "Нативный iOS · Цифровые продукты · Современный веб" : "Native iOS · Digital products · Modern web"}</span>
        <span>rentonhead.dev</span>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
