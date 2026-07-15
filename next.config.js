const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/:locale(tr|en|ru)/projects/mobile", destination: "/:locale/work/brewclock", permanent: true },
      { source: "/:locale(tr|en|ru)/projects", destination: "/:locale/work", permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' mailto:; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; upgrade-insecure-requests" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];
    if (isPreview) securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" });
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
