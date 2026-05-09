import { NextResponse, type NextRequest } from "next/server";

const DATA_REVIEW_PATH = "/data-review";

const REVIEW_PREFIXES = [
  "/mleague",
  "/news",
  "/organizations",
  "/players",
  "/rankings",
  "/rules",
  "/schedule",
  "/teams",
  "/titles",
];

function shouldShowDataReview(pathname: string): boolean {
  if (pathname === DATA_REVIEW_PATH) return false;
  return REVIEW_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!shouldShowDataReview(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = DATA_REVIEW_PATH;
  url.search = "";

  const response = NextResponse.rewrite(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    "/mleague/:path*",
    "/news/:path*",
    "/organizations/:path*",
    "/players/:path*",
    "/rankings/:path*",
    "/rules/:path*",
    "/schedule/:path*",
    "/teams/:path*",
    "/titles/:path*",
  ],
};
