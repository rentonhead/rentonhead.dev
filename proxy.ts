import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isPublicLocale } from "./lib/site";

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/og" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url), 308);
  }

  const firstSegment = pathname.split("/")[1];
  if (!isPublicLocale(firstSegment)) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
