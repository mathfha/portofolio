import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path: detect device / browser system language
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language") || "";
    // If phone / browser preference starts with or prioritizes English
    const isEnglish =
      acceptLanguage.toLowerCase().startsWith("en") ||
      (acceptLanguage.includes("en") && !acceptLanguage.toLowerCase().startsWith("id"));

    const targetLocale = isEnglish ? "en" : "id";
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
